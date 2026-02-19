"""Seed the database with realistic sample decisions for GraphNous MVP."""

import json
import os
import sys

# Add parent dir to path
sys.path.insert(0, os.path.dirname(__file__))

from database import init_db, get_db


SEED_DECISIONS = [
    {
        "id": "D-2025-001",
        "question": "Should we migrate from Vendor X (CloudFirst) to Vendor Y (SkyScale) for our cloud infrastructure?",
        "context_tags": ["infrastructure", "budget", "compliance", "operations"],
        "alternatives": [
            {"option": "Stay with CloudFirst", "status": "rejected", "reason": "Rising costs and compliance gaps"},
            {"option": "Migrate to SkyScale", "status": "chosen", "reason": None},
            {"option": "Multi-cloud hybrid", "status": "rejected", "reason": "Operational complexity too high for current team size"}
        ],
        "rationale": [
            "SkyScale offers 22% lower TCO over 36 months",
            "Built-in compliance automation for SOC2 and GDPR",
            "Lower integration risk due to existing API compatibility"
        ],
        "constraints": ["Data residency requirements (EU)", "Migration must complete by Q3 2026", "Zero downtime requirement"],
        "confidence": 0.72,
        "owner": "Maria Torres, IT Director",
        "decided_on": "2025-11-15",
        "review_triggers": ["assumption_expiry", "supplier_price_increase_gt_10_percent", "compliance_regulation_change"],
        "status": "active",
        "domain": "IT Governance",
        "assumptions": [
            {"statement": "SkyScale pricing stable for 36 months per contract terms", "valid_until": "2028-11-15", "risk_if_false": "Budget overrun of $200K+", "status": "valid"},
            {"statement": "Engineering headcount remains at 45+ for migration capacity", "valid_until": "2026-06-01", "risk_if_false": "Delivery delay of 2-3 months", "status": "aging"},
            {"statement": "EU data residency regulations remain unchanged", "valid_until": "2026-12-31", "risk_if_false": "Compliance violation and potential fines", "status": "valid"},
        ],
        "evidence": [
            {"type": "BI", "ref": "Cloud Cost Comparison Report Q3-2025", "reliability": "high", "url": ""},
            {"type": "Document", "ref": "SkyScale Security Assessment v2.1", "reliability": "high", "url": ""},
            {"type": "Document", "ref": "Migration Risk Analysis - Engineering Team", "reliability": "medium", "url": ""},
        ]
    },
    {
        "id": "D-2025-002",
        "question": "Should we adopt a zero-trust security architecture for internal services?",
        "context_tags": ["security", "compliance", "infrastructure"],
        "alternatives": [
            {"option": "Full zero-trust implementation", "status": "chosen", "reason": None},
            {"option": "Perimeter-only security (status quo)", "status": "rejected", "reason": "Insufficient for remote workforce and cloud migration"},
            {"option": "Partial zero-trust for external-facing services only", "status": "rejected", "reason": "Inconsistent security posture creates new attack vectors"}
        ],
        "rationale": [
            "3 security incidents in past 12 months traced to lateral movement",
            "Remote workforce now 60% of headcount",
            "Required for upcoming SOC2 Type II certification"
        ],
        "constraints": ["Must not break existing CI/CD pipelines", "Phased rollout over 6 months", "Budget cap $150K"],
        "confidence": 0.85,
        "owner": "James Chen, CISO",
        "decided_on": "2025-09-20",
        "review_triggers": ["security_incident", "compliance_audit_finding", "quarterly_review"],
        "status": "active",
        "domain": "Security",
        "assumptions": [
            {"statement": "Identity provider (Okta) supports required OIDC flows", "valid_until": "2026-09-20", "risk_if_false": "Custom auth layer needed, 3-month delay", "status": "valid"},
            {"statement": "All internal services expose health-check endpoints", "valid_until": "2026-03-01", "risk_if_false": "Monitoring gaps during rollout", "status": "valid"},
            {"statement": "Security team has capacity for policy definition sprints", "valid_until": "2026-02-01", "risk_if_false": "Rollout stalls without defined policies", "status": "broken"},
        ],
        "evidence": [
            {"type": "Ticket", "ref": "INC-2025-0847: Lateral movement incident postmortem", "reliability": "high", "url": ""},
            {"type": "Document", "ref": "NIST Zero Trust Architecture SP 800-207", "reliability": "high", "url": ""},
            {"type": "BI", "ref": "Remote workforce growth trend 2023-2025", "reliability": "medium", "url": ""},
        ]
    },
    {
        "id": "D-2025-003",
        "question": "What data retention policy should we implement for customer PII?",
        "context_tags": ["compliance", "legal", "data-governance"],
        "alternatives": [
            {"option": "24-month retention with automated deletion", "status": "chosen", "reason": None},
            {"option": "Indefinite retention", "status": "rejected", "reason": "GDPR non-compliant and increases breach liability"},
            {"option": "12-month retention", "status": "rejected", "reason": "Insufficient for contractual obligations with enterprise clients"}
        ],
        "rationale": [
            "Balances GDPR right-to-erasure with enterprise contract minimums (18 months)",
            "Reduces data breach exposure surface by 40%",
            "Aligns with industry benchmarks from Gartner peer analysis"
        ],
        "constraints": ["Must comply with GDPR Article 17", "Enterprise contracts require minimum 18-month retention", "Must support customer-initiated deletion requests within 30 days"],
        "confidence": 0.68,
        "owner": "Sarah Williams, DPO",
        "decided_on": "2025-08-05",
        "review_triggers": ["regulation_change", "customer_complaint_threshold", "annual_review"],
        "status": "active",
        "domain": "Compliance",
        "assumptions": [
            {"statement": "GDPR enforcement posture remains consistent", "valid_until": "2026-08-05", "risk_if_false": "Policy may be too lenient or too strict", "status": "valid"},
            {"statement": "Engineering can implement automated deletion pipeline by Q1 2026", "valid_until": "2026-03-31", "risk_if_false": "Manual deletion process is error-prone and unscalable", "status": "aging"},
            {"statement": "No new US federal privacy law supersedes state patchwork", "valid_until": "2026-12-31", "risk_if_false": "Need to reconcile conflicting retention requirements", "status": "valid"},
        ],
        "evidence": [
            {"type": "Document", "ref": "GDPR Article 17 - Right to Erasure legal brief", "reliability": "high", "url": ""},
            {"type": "BI", "ref": "Data volume and PII distribution analysis Q2-2025", "reliability": "medium", "url": ""},
            {"type": "Document", "ref": "Gartner Peer Insights - Data Retention Benchmarks 2025", "reliability": "medium", "url": ""},
        ]
    },
    {
        "id": "D-2026-001",
        "question": "Should we standardize on Python 3.12+ for all new backend services?",
        "context_tags": ["engineering", "standards", "developer-experience"],
        "alternatives": [
            {"option": "Standardize on Python 3.12+", "status": "chosen", "reason": None},
            {"option": "Allow any Python 3.9+ version", "status": "rejected", "reason": "Version fragmentation increases maintenance burden"},
            {"option": "Migrate to Go for new services", "status": "rejected", "reason": "Team skill gap too large, retraining cost > $100K"}
        ],
        "rationale": [
            "Performance improvements (10-15% faster startup via PEP 684)",
            "Improved error messages reduce debugging time",
            "Standardization reduces CI/CD complexity and container image sizes"
        ],
        "constraints": ["Existing services are not required to upgrade immediately", "Must maintain Python 3.9 compatibility for legacy billing service until Q4 2026"],
        "confidence": 0.90,
        "owner": "Alex Kumar, VP Engineering",
        "decided_on": "2026-01-10",
        "review_triggers": ["python_eol_announcement", "major_dependency_incompatibility"],
        "status": "active",
        "domain": "Engineering",
        "assumptions": [
            {"statement": "All critical dependencies support Python 3.12+", "valid_until": "2026-07-01", "risk_if_false": "Blocked services need version pinning exceptions", "status": "valid"},
            {"statement": "Developer onboarding materials updated by Feb 2026", "valid_until": "2026-02-28", "risk_if_false": "New hires use inconsistent versions", "status": "aging"},
        ],
        "evidence": [
            {"type": "BI", "ref": "Python Version Usage Dashboard - Internal Services Jan 2026", "reliability": "high", "url": ""},
            {"type": "Document", "ref": "PEP 684 - Per-Interpreter GIL benchmark results", "reliability": "high", "url": ""},
        ]
    },
    {
        "id": "D-2026-002",
        "question": "Should we terminate the contract with DataVault for archival storage and move to in-house MinIO?",
        "context_tags": ["infrastructure", "budget", "vendor-management"],
        "alternatives": [
            {"option": "Terminate DataVault, migrate to MinIO", "status": "chosen", "reason": None},
            {"option": "Renew DataVault contract with renegotiated terms", "status": "rejected", "reason": "DataVault unwilling to reduce price below $8K/mo"},
            {"option": "Move to AWS S3 Glacier", "status": "rejected", "reason": "Egress costs unpredictable for our access patterns"}
        ],
        "rationale": [
            "MinIO eliminates $96K/year vendor spend",
            "Full control over data locality and encryption",
            "Team already has object storage operational experience"
        ],
        "constraints": ["Migration must preserve all audit logs (7-year retention)", "DataVault contract ends 2026-04-30", "No data loss tolerance"],
        "confidence": 0.35,
        "owner": "Maria Torres, IT Director",
        "decided_on": "2026-02-01",
        "review_triggers": ["minio_incident", "storage_cost_variance_gt_20_percent", "quarterly_review"],
        "status": "active",
        "domain": "IT Governance",
        "assumptions": [
            {"statement": "MinIO cluster hardware arrives by March 2026", "valid_until": "2026-03-15", "risk_if_false": "Migration timeline slips past DataVault contract end", "status": "valid"},
            {"statement": "No regulatory requirement mandates third-party archival custody", "valid_until": "2026-12-31", "risk_if_false": "Must re-engage external archival vendor", "status": "valid"},
            {"statement": "Current ops team can manage MinIO without additional hires", "valid_until": "2026-06-30", "risk_if_false": "Need 1 additional SRE ($120K), eroding cost savings", "status": "valid"},
        ],
        "evidence": [
            {"type": "BI", "ref": "DataVault Invoice Analysis 2024-2025", "reliability": "high", "url": ""},
            {"type": "Document", "ref": "MinIO Capacity Planning - Infrastructure Team", "reliability": "medium", "url": ""},
            {"type": "Ticket", "ref": "CHG-2026-0112: MinIO cluster procurement request", "reliability": "high", "url": ""},
        ]
    },
    {
        "id": "D-2025-004",
        "question": "Should we implement mandatory incident postmortem reviews for all Severity 1 and 2 incidents?",
        "context_tags": ["operations", "culture", "compliance"],
        "alternatives": [
            {"option": "Mandatory postmortems for Sev1 and Sev2", "status": "chosen", "reason": None},
            {"option": "Optional postmortems (status quo)", "status": "rejected", "reason": "Only 15% of incidents get postmortems; patterns are missed"},
            {"option": "Mandatory for Sev1 only", "status": "rejected", "reason": "Sev2 incidents are 4x more frequent and often precursors to Sev1"}
        ],
        "rationale": [
            "Recurring Sev2 incidents cost $200K+ in 2025",
            "Postmortem culture correlates with 40% reduction in repeat incidents (Google SRE data)",
            "Compliance auditors specifically flagged lack of systematic root cause analysis"
        ],
        "constraints": ["Postmortem must be completed within 5 business days", "Blameless format required", "Template must be under 1 page to maintain compliance"],
        "confidence": 0.88,
        "owner": "James Chen, CISO",
        "decided_on": "2025-10-12",
        "review_triggers": ["postmortem_completion_rate_below_80_percent", "quarterly_review"],
        "status": "active",
        "domain": "Operations",
        "assumptions": [
            {"statement": "Teams have capacity for postmortem meetings within sprint cycles", "valid_until": "2026-04-12", "risk_if_false": "Postmortems become rushed checkbox exercises", "status": "valid"},
            {"statement": "Management enforces blameless culture", "valid_until": "2026-10-12", "risk_if_false": "Engineers stop reporting honestly, defeating the purpose", "status": "valid"},
        ],
        "evidence": [
            {"type": "BI", "ref": "Incident Frequency and Cost Dashboard 2025", "reliability": "high", "url": ""},
            {"type": "Document", "ref": "Google SRE Book - Chapter 15: Postmortem Culture", "reliability": "high", "url": ""},
            {"type": "Ticket", "ref": "AUDIT-2025-Q3: Finding 4.2 - Insufficient root cause analysis", "reliability": "high", "url": ""},
        ]
    },
]


def seed():
    """Insert seed data into the database."""
    init_db()
    conn = get_db()

    # Check if already seeded
    count = conn.execute("SELECT COUNT(*) as c FROM decisions").fetchone()["c"]
    if count > 0:
        print(f"Database already has {count} decisions. Skipping seed.")
        conn.close()
        return

    for dec in SEED_DECISIONS:
        assumptions = dec.pop("assumptions", [])
        evidence = dec.pop("evidence", [])

        conn.execute(
            """INSERT INTO decisions (id, question, context_tags, alternatives, rationale,
               constraints, confidence, owner, decided_on, review_triggers, status, domain)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)""",
            (
                dec["id"],
                dec["question"],
                json.dumps(dec["context_tags"]),
                json.dumps(dec["alternatives"]),
                json.dumps(dec["rationale"]),
                json.dumps(dec["constraints"]),
                dec["confidence"],
                dec["owner"],
                dec["decided_on"],
                json.dumps(dec["review_triggers"]),
                dec["status"],
                dec["domain"],
            )
        )

        # FTS
        conn.execute(
            "INSERT INTO decisions_fts (id, question, rationale, owner, domain, context_tags) VALUES (?, ?, ?, ?, ?, ?)",
            (dec["id"], dec["question"], json.dumps(dec["rationale"]), dec["owner"], dec["domain"], json.dumps(dec["context_tags"]))
        )

        # Assumptions
        for a in assumptions:
            conn.execute(
                "INSERT INTO assumptions (decision_id, statement, valid_until, risk_if_false, status) VALUES (?, ?, ?, ?, ?)",
                (dec["id"], a["statement"], a.get("valid_until", ""), a.get("risk_if_false", ""), a.get("status", "valid"))
            )

        # Evidence
        for e in evidence:
            conn.execute(
                "INSERT INTO evidence (decision_id, type, ref, reliability, url) VALUES (?, ?, ?, ?, ?)",
                (dec["id"], e["type"], e["ref"], e.get("reliability", "medium"), e.get("url", ""))
            )

        # Edges
        for a in conn.execute("SELECT id FROM assumptions WHERE decision_id = ?", (dec["id"],)).fetchall():
            conn.execute(
                "INSERT INTO edges (source_type, source_id, target_type, target_id, edge_type) VALUES (?, ?, ?, ?, ?)",
                ("decision", dec["id"], "assumption", str(a["id"]), "depends_on")
            )
        for e in conn.execute("SELECT id FROM evidence WHERE decision_id = ?", (dec["id"],)).fetchall():
            conn.execute(
                "INSERT INTO edges (source_type, source_id, target_type, target_id, edge_type) VALUES (?, ?, ?, ?, ?)",
                ("decision", dec["id"], "evidence", str(e["id"]), "justified_by")
            )

    # Add some cross-decision edges
    conn.execute(
        "INSERT INTO edges (source_type, source_id, target_type, target_id, edge_type) VALUES (?, ?, ?, ?, ?)",
        ("decision", "D-2025-001", "decision", "D-2026-002", "related_to")
    )
    conn.execute(
        "INSERT INTO edges (source_type, source_id, target_type, target_id, edge_type) VALUES (?, ?, ?, ?, ?)",
        ("decision", "D-2025-002", "decision", "D-2025-004", "related_to")
    )

    # Add a signal
    conn.execute(
        "INSERT INTO signals (description, source, detected_on, related_assumption_ids) VALUES (?, ?, ?, ?)",
        ("Security team lead resigned — capacity assumption for zero-trust rollout may be invalid",
         "HR System", "2026-01-28", json.dumps([]))
    )

    conn.commit()
    print(f"Seeded {len(SEED_DECISIONS)} decisions with assumptions, evidence, and edges.")
    conn.close()


if __name__ == "__main__":
    seed()
