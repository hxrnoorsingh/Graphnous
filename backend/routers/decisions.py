"""Decision CRUD router."""

from fastapi import APIRouter, HTTPException
import json

from database import get_db, get_decision_full, generate_decision_id

router = APIRouter(prefix="/decisions", tags=["decisions"])


@router.get("")
def list_decisions(domain: str = "", status: str = ""):
    conn = get_db()
    query = "SELECT * FROM decisions WHERE 1=1"
    params = []
    if domain:
        query += " AND domain = ?"
        params.append(domain)
    if status:
        query += " AND status = ?"
        params.append(status)
    query += " ORDER BY created_at DESC"
    rows = conn.execute(query, params).fetchall()
    results = []
    for row in rows:
        d = get_decision_full(conn, row["id"])
        if d:
            results.append(d)
    conn.close()
    return results


@router.get("/{decision_id}")
def get_decision(decision_id: str):
    conn = get_db()
    d = get_decision_full(conn, decision_id)
    conn.close()
    if not d:
        raise HTTPException(status_code=404, detail="Decision not found")
    return d


@router.post("", status_code=201)
def create_decision(body: dict):
    conn = get_db()
    did = generate_decision_id(conn)
    assumptions = body.pop("assumptions", [])
    evidence = body.pop("evidence", [])

    conn.execute(
        """INSERT INTO decisions (id, question, context_tags, alternatives, rationale,
           constraints, confidence, owner, decided_on, review_triggers, status, domain)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)""",
        (
            did,
            body.get("question", ""),
            json.dumps(body.get("context_tags", [])),
            json.dumps(body.get("alternatives", [])),
            json.dumps(body.get("rationale", [])),
            json.dumps(body.get("constraints", [])),
            body.get("confidence", 0.5),
            body.get("owner", ""),
            body.get("decided_on", ""),
            json.dumps(body.get("review_triggers", [])),
            body.get("status", "active"),
            body.get("domain", ""),
        )
    )

    # Insert assumptions
    for a in assumptions:
        conn.execute(
            "INSERT INTO assumptions (decision_id, statement, valid_until, risk_if_false, status) VALUES (?, ?, ?, ?, ?)",
            (did, a.get("statement", ""), a.get("valid_until", ""), a.get("risk_if_false", ""), a.get("status", "valid"))
        )

    # Insert evidence
    for e in evidence:
        conn.execute(
            "INSERT INTO evidence (decision_id, type, ref, reliability, url) VALUES (?, ?, ?, ?, ?)",
            (did, e.get("type", ""), e.get("ref", ""), e.get("reliability", "medium"), e.get("url", ""))
        )

    # Create edges: decision -> assumptions (depends_on), decision -> evidence (justified_by)
    for a in conn.execute("SELECT id FROM assumptions WHERE decision_id = ?", (did,)).fetchall():
        conn.execute(
            "INSERT INTO edges (source_type, source_id, target_type, target_id, edge_type) VALUES (?, ?, ?, ?, ?)",
            ("decision", did, "assumption", str(a["id"]), "depends_on")
        )
    for e in conn.execute("SELECT id FROM evidence WHERE decision_id = ?", (did,)).fetchall():
        conn.execute(
            "INSERT INTO edges (source_type, source_id, target_type, target_id, edge_type) VALUES (?, ?, ?, ?, ?)",
            ("decision", did, "evidence", str(e["id"]), "justified_by")
        )

    # Update FTS
    conn.execute(
        "INSERT INTO decisions_fts (id, question, rationale, owner, domain, context_tags) VALUES (?, ?, ?, ?, ?, ?)",
        (
            did,
            body.get("question", ""),
            json.dumps(body.get("rationale", [])),
            body.get("owner", ""),
            body.get("domain", ""),
            json.dumps(body.get("context_tags", [])),
        )
    )

    conn.commit()
    d = get_decision_full(conn, did)
    
    # Embedding generation removed

    conn.close()
    return d


@router.put("/{decision_id}")
def update_decision(decision_id: str, body: dict):
    conn = get_db()
    existing = conn.execute("SELECT * FROM decisions WHERE id = ?", (decision_id,)).fetchone()
    if not existing:
        conn.close()
        raise HTTPException(status_code=404, detail="Decision not found")

    assumptions = body.pop("assumptions", None)
    evidence = body.pop("evidence", None)

    # Build SET clause dynamically
    set_parts = []
    params = []
    json_fields = {"context_tags", "alternatives", "rationale", "constraints", "review_triggers"}
    for key in ["question", "context_tags", "alternatives", "rationale", "constraints",
                 "confidence", "owner", "decided_on", "review_triggers", "status", "domain"]:
        if key in body:
            set_parts.append(f"{key} = ?")
            params.append(json.dumps(body[key]) if key in json_fields else body[key])

    if set_parts:
        params.append(decision_id)
        conn.execute(f"UPDATE decisions SET {', '.join(set_parts)} WHERE id = ?", params)

    # Replace assumptions if provided
    if assumptions is not None:
        conn.execute("DELETE FROM assumptions WHERE decision_id = ?", (decision_id,))
        conn.execute("DELETE FROM edges WHERE source_id = ? AND edge_type = 'depends_on'", (decision_id,))
        for a in assumptions:
            conn.execute(
                "INSERT INTO assumptions (decision_id, statement, valid_until, risk_if_false, status) VALUES (?, ?, ?, ?, ?)",
                (decision_id, a.get("statement", ""), a.get("valid_until", ""), a.get("risk_if_false", ""), a.get("status", "valid"))
            )
        for a in conn.execute("SELECT id FROM assumptions WHERE decision_id = ?", (decision_id,)).fetchall():
            conn.execute(
                "INSERT INTO edges (source_type, source_id, target_type, target_id, edge_type) VALUES (?, ?, ?, ?, ?)",
                ("decision", decision_id, "assumption", str(a["id"]), "depends_on")
            )

    # Replace evidence if provided
    if evidence is not None:
        conn.execute("DELETE FROM evidence WHERE decision_id = ?", (decision_id,))
        conn.execute("DELETE FROM edges WHERE source_id = ? AND edge_type = 'justified_by'", (decision_id,))
        for e in evidence:
            conn.execute(
                "INSERT INTO evidence (decision_id, type, ref, reliability, url) VALUES (?, ?, ?, ?, ?)",
                (decision_id, e.get("type", ""), e.get("ref", ""), e.get("reliability", "medium"), e.get("url", ""))
            )
        for e in conn.execute("SELECT id FROM evidence WHERE decision_id = ?", (decision_id,)).fetchall():
            conn.execute(
                "INSERT INTO edges (source_type, source_id, target_type, target_id, edge_type) VALUES (?, ?, ?, ?, ?)",
                ("decision", decision_id, "evidence", str(e["id"]), "justified_by")
            )

    conn.commit()
    d = get_decision_full(conn, decision_id)
    
    # Embedding update removed

    conn.close()
    return d


@router.delete("/{decision_id}", status_code=204)
def delete_decision(decision_id: str):
    conn = get_db()
    existing = conn.execute("SELECT id FROM decisions WHERE id = ?", (decision_id,)).fetchone()
    if not existing:
        conn.close()
        raise HTTPException(status_code=404, detail="Decision not found")
    conn.execute("DELETE FROM decisions WHERE id = ?", (decision_id,))
    conn.execute("DELETE FROM edges WHERE source_id = ? OR target_id = ?", (decision_id, decision_id))
    conn.execute("DELETE FROM decisions_fts WHERE id = ?", (decision_id,))
    conn.commit()
    conn.close()
