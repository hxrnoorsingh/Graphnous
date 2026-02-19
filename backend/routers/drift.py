"""Drift & review queue router — surfaces decisions needing attention."""

from fastapi import APIRouter
import json
from datetime import datetime, date

from database import get_db

router = APIRouter(prefix="/drift", tags=["drift"])


def _parse_date(s: str):
    """Try to parse a date string."""
    if not s:
        return None
    for fmt in ("%Y-%m-%d", "%Y-%m-%dT%H:%M:%S", "%Y/%m/%d"):
        try:
            return datetime.strptime(s, fmt).date()
        except ValueError:
            continue
    return None


@router.get("/review-queue")
def get_review_queue():
    """Return decisions with expired/aging assumptions, sorted by severity."""
    conn = get_db()
    today = date.today()
    items = []

    decisions = conn.execute("SELECT * FROM decisions WHERE status = 'active'").fetchall()

    for dec in decisions:
        assumptions = conn.execute(
            "SELECT * FROM assumptions WHERE decision_id = ?", (dec["id"],)
        ).fetchall()

        for a in assumptions:
            expiry = _parse_date(a["valid_until"])
            severity = None
            reason = ""

            if a["status"] == "broken":
                severity = "critical"
                reason = f"Assumption marked as broken: \"{a['statement']}\""
            elif expiry and expiry < today:
                severity = "critical"
                reason = f"Assumption expired on {a['valid_until']}: \"{a['statement']}\""
            elif expiry and (expiry - today).days <= 30:
                severity = "warning"
                reason = f"Assumption expiring in {(expiry - today).days} days: \"{a['statement']}\""
            elif a["status"] == "aging":
                severity = "warning"
                reason = f"Assumption marked as aging: \"{a['statement']}\""

            if severity:
                items.append({
                    "decision_id": dec["id"],
                    "decision_question": dec["question"],
                    "severity": severity,
                    "reason": reason,
                    "assumption_id": a["id"],
                    "assumption_statement": a["statement"],
                    "evidence_changed": None,
                    "impacted_policies": [],
                })

        # Low-confidence decisions
        if dec["confidence"] < 0.4:
            items.append({
                "decision_id": dec["id"],
                "decision_question": dec["question"],
                "severity": "info",
                "reason": f"Low confidence decision ({dec['confidence']:.0%})",
                "assumption_id": None,
                "assumption_statement": None,
                "evidence_changed": None,
                "impacted_policies": [],
            })

    # Sort: critical first, then warning, then info
    severity_order = {"critical": 0, "warning": 1, "info": 2}
    items.sort(key=lambda x: severity_order.get(x["severity"], 3))

    conn.close()
    return items


@router.get("/stats")
def get_dashboard_stats():
    """Return dashboard stats for the home screen."""
    conn = get_db()
    today = date.today()

    total_decisions = conn.execute("SELECT COUNT(*) as c FROM decisions").fetchone()["c"]

    assumptions = conn.execute("SELECT * FROM assumptions").fetchall()
    valid = 0
    aging = 0
    broken = 0
    for a in assumptions:
        if a["status"] == "broken":
            broken += 1
        elif a["status"] == "aging":
            aging += 1
        else:
            expiry = _parse_date(a["valid_until"])
            if expiry and expiry < today:
                broken += 1
            elif expiry and (expiry - today).days <= 30:
                aging += 1
            else:
                valid += 1

    review_count = len(get_review_queue.__wrapped__() if hasattr(get_review_queue, '__wrapped__') else [])
    # Just count the queue items inline
    queue_items = 0
    for dec in conn.execute("SELECT * FROM decisions WHERE status = 'active'").fetchall():
        for a in conn.execute("SELECT * FROM assumptions WHERE decision_id = ?", (dec["id"],)).fetchall():
            expiry = _parse_date(a["valid_until"])
            if a["status"] == "broken":
                queue_items += 1
            elif expiry and expiry < today:
                queue_items += 1
            elif expiry and (expiry - today).days <= 30:
                queue_items += 1
            elif a["status"] == "aging":
                queue_items += 1
        if dec["confidence"] < 0.4:
            queue_items += 1

    recent = conn.execute(
        "SELECT * FROM decisions ORDER BY created_at DESC LIMIT 5"
    ).fetchall()
    recent_list = []
    for r in recent:
        from database import get_decision_full
        d = get_decision_full(conn, r["id"])
        if d:
            recent_list.append(d)

    conn.close()
    return {
        "total_decisions": total_decisions,
        "valid_assumptions": valid,
        "aging_assumptions": aging,
        "broken_assumptions": broken,
        "review_queue_count": queue_items,
        "recent_decisions": recent_list,
    }
