"""Graph router — returns nodes and edges for the memory graph view."""

from fastapi import APIRouter, HTTPException
import json

from database import get_db

router = APIRouter(prefix="/graph", tags=["graph"])


@router.get("")
def get_full_graph():
    """Return the entire graph (for small datasets in MVP)."""
    conn = get_db()
    nodes = []
    edges_out = []

    # Decision nodes
    for row in conn.execute("SELECT * FROM decisions").fetchall():
        nodes.append({
            "id": row["id"],
            "type": "decision",
            "label": row["question"][:80],
            "metadata": {
                "confidence": row["confidence"],
                "owner": row["owner"],
                "status": row["status"],
                "domain": row["domain"],
                "decided_on": row["decided_on"],
            }
        })

    # Assumption nodes
    for row in conn.execute("SELECT * FROM assumptions").fetchall():
        nodes.append({
            "id": f"A-{row['id']}",
            "type": "assumption",
            "label": row["statement"][:80],
            "metadata": {
                "status": row["status"],
                "valid_until": row["valid_until"],
                "risk_if_false": row["risk_if_false"],
                "decision_id": row["decision_id"],
            }
        })

    # Evidence nodes
    for row in conn.execute("SELECT * FROM evidence").fetchall():
        nodes.append({
            "id": f"E-{row['id']}",
            "type": "evidence",
            "label": row["ref"][:80],
            "metadata": {
                "evidence_type": row["type"],
                "reliability": row["reliability"],
                "decision_id": row["decision_id"],
            }
        })

    # Signal nodes
    for row in conn.execute("SELECT * FROM signals").fetchall():
        nodes.append({
            "id": f"S-{row['id']}",
            "type": "signal",
            "label": row["description"][:80],
            "metadata": {
                "source": row["source"],
                "detected_on": row["detected_on"],
            }
        })

    # Edges
    for row in conn.execute("SELECT * FROM edges").fetchall():
        source_id = row["source_id"]
        target_id = row["target_id"]
        # Normalize IDs to match node IDs
        if row["target_type"] == "assumption" and not target_id.startswith("A-"):
            target_id = f"A-{target_id}"
        if row["target_type"] == "evidence" and not target_id.startswith("E-"):
            target_id = f"E-{target_id}"
        if row["target_type"] == "signal" and not target_id.startswith("S-"):
            target_id = f"S-{target_id}"
        if row["source_type"] == "assumption" and not source_id.startswith("A-"):
            source_id = f"A-{source_id}"

        edges_out.append({
            "source": source_id,
            "target": target_id,
            "type": row["edge_type"],
        })

    conn.close()
    return {"nodes": nodes, "edges": edges_out}


@router.get("/{node_type}/{node_id}")
def get_graph_neighborhood(node_type: str, node_id: str):
    """Return the local neighborhood of a node (1-hop)."""
    conn = get_db()

    # Find edges involving this node
    edges = conn.execute(
        "SELECT * FROM edges WHERE (source_type = ? AND source_id = ?) OR (target_type = ? AND target_id = ?)",
        (node_type, node_id, node_type, node_id)
    ).fetchall()

    if not edges:
        conn.close()
        raise HTTPException(status_code=404, detail="Node not found or has no connections")

    node_ids = set()
    edges_out = []
    for e in edges:
        s_id = e["source_id"]
        t_id = e["target_id"]
        if e["target_type"] == "assumption" and not t_id.startswith("A-"):
            t_id = f"A-{t_id}"
        if e["target_type"] == "evidence" and not t_id.startswith("E-"):
            t_id = f"E-{t_id}"
        if e["source_type"] == "assumption" and not s_id.startswith("A-"):
            s_id = f"A-{s_id}"
        edges_out.append({"source": s_id, "target": t_id, "type": e["edge_type"]})
        node_ids.add((e["source_type"], e["source_id"]))
        node_ids.add((e["target_type"], e["target_id"]))

    nodes = []
    for ntype, nid in node_ids:
        if ntype == "decision":
            row = conn.execute("SELECT * FROM decisions WHERE id = ?", (nid,)).fetchone()
            if row:
                nodes.append({"id": row["id"], "type": "decision", "label": row["question"][:80], "metadata": {"confidence": row["confidence"], "owner": row["owner"]}})
        elif ntype == "assumption":
            row = conn.execute("SELECT * FROM assumptions WHERE id = ?", (nid,)).fetchone()
            if row:
                nodes.append({"id": f"A-{row['id']}", "type": "assumption", "label": row["statement"][:80], "metadata": {"status": row["status"]}})
        elif ntype == "evidence":
            row = conn.execute("SELECT * FROM evidence WHERE id = ?", (nid,)).fetchone()
            if row:
                nodes.append({"id": f"E-{row['id']}", "type": "evidence", "label": row["ref"][:80], "metadata": {"reliability": row["reliability"]}})

    conn.close()
    return {"nodes": nodes, "edges": edges_out}
