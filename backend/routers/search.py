"""Search router — full-text search over decisions, assumptions, and evidence."""

from fastapi import APIRouter
import json

from database import get_db

router = APIRouter(prefix="/search", tags=["search"])


@router.get("")
def search(q: str = ""):
    if not q.strip():
        return []

    conn = get_db()
    results = []

    # 1) FTS search over decisions
    try:
        fts_rows = conn.execute(
            "SELECT id FROM decisions_fts WHERE decisions_fts MATCH ? LIMIT 20",
            (q,)
        ).fetchall()
        fts_ids = {r["id"] for r in fts_rows}
    except Exception:
        fts_ids = set()

    # 2) Fallback LIKE search for partial matches
    like_q = f"%{q}%"
    like_rows = conn.execute(
        "SELECT id FROM decisions WHERE question LIKE ? OR owner LIKE ? OR domain LIKE ? OR rationale LIKE ? LIMIT 20",
        (like_q, like_q, like_q, like_q)
    ).fetchall()
    for r in like_rows:
        fts_ids.add(r["id"])

    # 3) Search assumptions
    assumption_rows = conn.execute(
        "SELECT decision_id FROM assumptions WHERE statement LIKE ? LIMIT 20",
        (like_q,)
    ).fetchall()
    for r in assumption_rows:
        fts_ids.add(r["decision_id"])

    # Build results
    for did in fts_ids:
        row = conn.execute("SELECT * FROM decisions WHERE id = ?", (did,)).fetchone()
        if not row:
            continue
        rationale_list = json.loads(row["rationale"]) if row["rationale"] else []
        assumptions = conn.execute(
            "SELECT statement FROM assumptions WHERE decision_id = ? LIMIT 1", (did,)
        ).fetchone()

        results.append({
            "id": row["id"],
            "type": "decision",
            "title": row["question"],
            "excerpt": row["question"][:200],
            "owner": row["owner"],
            "date": row["decided_on"],
            "top_rationale": rationale_list[0] if rationale_list else "",
            "top_assumption": assumptions["statement"] if assumptions else "",
        })

    conn.close()
    return results
