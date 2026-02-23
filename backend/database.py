"""SQLite database setup and helpers for GraphNous."""

import sqlite3
import json
import os
from datetime import date, datetime

try:
    from dotenv import load_dotenv
    load_dotenv()
except ImportError:
    pass

DB_PATH = os.path.join(os.path.dirname(__file__), "graphnous.db")

# Track whether we're using Turso so helpers know how to handle rows
_using_turso = False

# Column names for each table (must match CREATE TABLE order)
DECISIONS_COLS = ["id", "question", "context_tags", "alternatives", "rationale",
                  "constraints", "confidence", "owner", "decided_on", "review_triggers",
                  "status", "domain", "created_at", "embedding"]
ASSUMPTIONS_COLS = ["id", "decision_id", "statement", "valid_until", "risk_if_false", "status"]
EVIDENCE_COLS = ["id", "decision_id", "type", "ref", "reliability", "url"]


def _row_to_dict(row, columns):
    """Convert a row (tuple or sqlite3.Row) to a dict."""
    if row is None:
        return None
    # sqlite3.Row already supports dict()
    if isinstance(row, sqlite3.Row):
        return dict(row)
    # For libsql tuples, zip with column names
    if isinstance(row, (tuple, list)):
        return dict(zip(columns, row))
    # Fallback: try dict()
    try:
        return dict(row)
    except (TypeError, ValueError):
        return dict(zip(columns, row))


def get_db():
    """Get a database connection (call per-request)."""
    global _using_turso
    turso_url = os.environ.get("TURSO_DATABASE_URL")
    turso_auth_token = os.environ.get("TURSO_AUTH_TOKEN")

    if turso_url and turso_auth_token:
        import libsql_experimental as libsql
        conn = libsql.connect(database=turso_url, auth_token=turso_auth_token)
        _using_turso = True
    else:
        conn = sqlite3.connect(DB_PATH)
        conn.row_factory = sqlite3.Row
        conn.execute("PRAGMA journal_mode=WAL")
        conn.execute("PRAGMA foreign_keys=ON")
        _using_turso = False

    return conn


def init_db():
    """Create all tables if they don't exist."""
    conn = get_db()

    conn.execute("""
    CREATE TABLE IF NOT EXISTS decisions (
        id TEXT PRIMARY KEY,
        question TEXT NOT NULL,
        context_tags TEXT,
        alternatives TEXT,
        rationale TEXT,
        constraints TEXT,
        confidence REAL,
        owner TEXT,
        decided_on TEXT,
        review_triggers TEXT,
        status TEXT,
        domain TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        embedding BLOB
    )
    """)

    conn.execute("""
    CREATE TABLE IF NOT EXISTS assumptions (
        id            INTEGER PRIMARY KEY AUTOINCREMENT,
        decision_id   TEXT NOT NULL REFERENCES decisions(id) ON DELETE CASCADE,
        statement     TEXT NOT NULL,
        valid_until   TEXT DEFAULT '',
        risk_if_false TEXT DEFAULT '',
        status        TEXT DEFAULT 'valid'
    )
    """)

    conn.execute("""
    CREATE TABLE IF NOT EXISTS evidence (
        id          INTEGER PRIMARY KEY AUTOINCREMENT,
        decision_id TEXT NOT NULL REFERENCES decisions(id) ON DELETE CASCADE,
        type        TEXT NOT NULL,
        ref         TEXT NOT NULL,
        reliability TEXT DEFAULT 'medium',
        url         TEXT DEFAULT ''
    )
    """)

    conn.execute("""
    CREATE TABLE IF NOT EXISTS signals (
        id                     INTEGER PRIMARY KEY AUTOINCREMENT,
        description            TEXT NOT NULL,
        source                 TEXT DEFAULT '',
        detected_on            TEXT DEFAULT '',
        related_assumption_ids TEXT DEFAULT '[]'
    )
    """)

    conn.execute("""
    CREATE TABLE IF NOT EXISTS edges (
        id          INTEGER PRIMARY KEY AUTOINCREMENT,
        source_type TEXT NOT NULL,
        source_id   TEXT NOT NULL,
        target_type TEXT NOT NULL,
        target_id   TEXT NOT NULL,
        edge_type   TEXT NOT NULL
    )
    """)

    try:
        conn.execute("""
        CREATE VIRTUAL TABLE IF NOT EXISTS decisions_fts USING fts5(
            id, question, rationale, owner, domain, context_tags,
            content='decisions',
            content_rowid='rowid'
        )
        """)
    except Exception as e:
        print(f"Warning: FTS5 creation failed: {e}")

    conn.commit()

    # Simple migration to add embedding column if missing
    try:
        conn.execute("SELECT embedding FROM decisions LIMIT 1")
    except Exception:
        try:
            print("Migrating: Adding embedding column to decisions table...")
            conn.execute("ALTER TABLE decisions ADD COLUMN embedding BLOB")
            conn.commit()
        except Exception:
            pass

    conn.close()


def update_decision_embedding(conn, decision_id: str, embedding: list[float]):
    """Update decision embedding blob."""
    import array
    blob = array.array('f', embedding).tobytes()
    conn.execute(
        "UPDATE decisions SET embedding = ? WHERE id = ?",
        (blob, decision_id)
    )


# ── Helper converters ───────────────────────────────────────────────────────

def decision_row_to_dict(row, assumptions=None, evidence=None):
    """Convert a decision row into a dict."""
    d = _row_to_dict(row, DECISIONS_COLS)
    if d is None:
        return None
    d["context_tags"] = json.loads(d.get("context_tags") or "[]")
    d["alternatives"] = json.loads(d.get("alternatives") or "[]")
    d["rationale"] = json.loads(d.get("rationale") or "[]")
    d["constraints"] = json.loads(d.get("constraints") or "[]")
    d["review_triggers"] = json.loads(d.get("review_triggers") or "[]")
    d["assumptions"] = assumptions or []
    d["evidence"] = evidence or []
    # Don't return the raw embedding blob to frontend
    d.pop("embedding", None)
    d.pop("created_at", None)
    return d


def assumption_row_to_dict(row):
    return _row_to_dict(row, ASSUMPTIONS_COLS)


def evidence_row_to_dict(row):
    return _row_to_dict(row, EVIDENCE_COLS)


def get_decision_full(conn, decision_id: str):
    """Load a decision with its assumptions and evidence."""
    row = conn.execute("SELECT * FROM decisions WHERE id = ?", (decision_id,)).fetchone()
    if not row:
        return None
    assumptions = [
        assumption_row_to_dict(a)
        for a in conn.execute("SELECT * FROM assumptions WHERE decision_id = ?", (decision_id,)).fetchall()
    ]
    evidence = [
        evidence_row_to_dict(e)
        for e in conn.execute("SELECT * FROM evidence WHERE decision_id = ?", (decision_id,)).fetchall()
    ]
    return decision_row_to_dict(row, assumptions, evidence)


def generate_decision_id(conn) -> str:
    """Generate the next D-YYYY-NNN id."""
    year = datetime.now().year
    prefix = f"D-{year}-"
    row = conn.execute(
        "SELECT id FROM decisions WHERE id LIKE ? ORDER BY id DESC LIMIT 1",
        (f"{prefix}%",)
    ).fetchone()
    if row:
        d = _row_to_dict(row, ["id"])
        last_num = int(d["id"].split("-")[-1])
        return f"{prefix}{last_num + 1:03d}"
    return f"{prefix}001"
