"""Search router — full-text search over decisions, assumptions, and evidence."""

from fastapi import APIRouter
import json

from database import get_db, _row_to_dict, DECISIONS_COLS, ASSUMPTIONS_COLS

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
        fts_ids = set()
        for r in fts_rows:
            d = _row_to_dict(r, ["id"])
            fts_ids.add(d["id"])
    except Exception:
        fts_ids = set()

    # 2) Fallback LIKE search for partial matches
    like_q = f"%{q}%"
    like_rows = conn.execute(
        "SELECT id FROM decisions WHERE question LIKE ? OR owner LIKE ? OR domain LIKE ? OR rationale LIKE ? LIMIT 20",
        (like_q, like_q, like_q, like_q)
    ).fetchall()
    for r in like_rows:
        d = _row_to_dict(r, ["id"])
        fts_ids.add(d["id"])

    # 3) Search assumptions
    assumption_rows = conn.execute(
        "SELECT decision_id FROM assumptions WHERE statement LIKE ? LIMIT 20",
        (like_q,)
    ).fetchall()
    for r in assumption_rows:
        d = _row_to_dict(r, ["decision_id"])
        fts_ids.add(d["decision_id"])

    # Build results
    for did in fts_ids:
        raw_row = conn.execute("SELECT * FROM decisions WHERE id = ?", (did,)).fetchone()
        if not raw_row:
            continue
        row = _row_to_dict(raw_row, DECISIONS_COLS)
        rationale_list = json.loads(row["rationale"]) if row["rationale"] else []
        assumption_raw = conn.execute(
            "SELECT statement FROM assumptions WHERE decision_id = ? LIMIT 1", (did,)
        ).fetchone()
        top_assumption = ""
        if assumption_raw:
            ad = _row_to_dict(assumption_raw, ["statement"])
            top_assumption = ad["statement"]

        results.append({
            "id": row["id"],
            "type": "decision",
            "title": row["question"],
            "excerpt": row["question"][:200],
            "owner": row["owner"],
            "date": row["decided_on"],
            "top_rationale": rationale_list[0] if rationale_list else "",
            "top_assumption": top_assumption,
        })

    conn.close()
    return results
