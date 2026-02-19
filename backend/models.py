"""Pydantic models for GraphNous deliberative data primitives."""

from __future__ import annotations
from pydantic import BaseModel, Field
from typing import Optional
from datetime import date


# ── Assumption ──────────────────────────────────────────────────────────────

class AssumptionBase(BaseModel):
    statement: str
    valid_until: Optional[str] = None
    risk_if_false: Optional[str] = None
    status: str = "valid"  # valid | aging | broken


class AssumptionCreate(AssumptionBase):
    pass


class Assumption(AssumptionBase):
    id: int
    decision_id: str


# ── Evidence ────────────────────────────────────────────────────────────────

class EvidenceBase(BaseModel):
    type: str  # BI | Document | Ticket | Link
    ref: str
    reliability: str = "medium"  # low | medium | high
    url: Optional[str] = None


class EvidenceCreate(EvidenceBase):
    pass


class Evidence(EvidenceBase):
    id: int
    decision_id: str


# ── Alternative ─────────────────────────────────────────────────────────────

class Alternative(BaseModel):
    option: str
    status: str = "considered"  # chosen | rejected | considered
    reason: Optional[str] = None


# ── Review Trigger ──────────────────────────────────────────────────────────

class ReviewTrigger(BaseModel):
    trigger: str


# ── Decision ────────────────────────────────────────────────────────────────

class DecisionBase(BaseModel):
    question: str
    context_tags: list[str] = Field(default_factory=list)
    alternatives: list[Alternative] = Field(default_factory=list)
    rationale: list[str] = Field(default_factory=list)
    constraints: list[str] = Field(default_factory=list)
    confidence: float = 0.5
    owner: str = ""
    decided_on: str = ""
    review_triggers: list[str] = Field(default_factory=list)
    status: str = "active"  # active | superseded | archived
    domain: str = ""


class DecisionCreate(DecisionBase):
    assumptions: list[AssumptionCreate] = Field(default_factory=list)
    evidence: list[EvidenceCreate] = Field(default_factory=list)


class DecisionUpdate(BaseModel):
    question: Optional[str] = None
    context_tags: Optional[list[str]] = None
    alternatives: Optional[list[Alternative]] = None
    rationale: Optional[list[str]] = None
    constraints: Optional[list[str]] = None
    confidence: Optional[float] = None
    owner: Optional[str] = None
    decided_on: Optional[str] = None
    review_triggers: Optional[list[str]] = None
    status: Optional[str] = None
    domain: Optional[str] = None
    assumptions: Optional[list[AssumptionCreate]] = None
    evidence: Optional[list[EvidenceCreate]] = None


class Decision(DecisionBase):
    id: str
    assumptions: list[Assumption] = Field(default_factory=list)
    evidence: list[Evidence] = Field(default_factory=list)


# ── Signal ──────────────────────────────────────────────────────────────────

class SignalBase(BaseModel):
    description: str
    source: str = ""
    detected_on: str = ""
    related_assumption_ids: list[int] = Field(default_factory=list)


class Signal(SignalBase):
    id: int


# ── Edge (graph relationship) ──────────────────────────────────────────────

class Edge(BaseModel):
    id: int
    source_type: str
    source_id: str
    target_type: str
    target_id: str
    edge_type: str  # justified_by | depends_on | derived_into | invalidated_by | related_to


# ── Graph response ─────────────────────────────────────────────────────────

class GraphNode(BaseModel):
    id: str
    type: str  # decision | assumption | evidence | policy | signal
    label: str
    metadata: dict = Field(default_factory=dict)


class GraphEdge(BaseModel):
    source: str
    target: str
    type: str


class GraphResponse(BaseModel):
    nodes: list[GraphNode]
    edges: list[GraphEdge]


# ── Search ──────────────────────────────────────────────────────────────────

class SearchResult(BaseModel):
    id: str
    type: str
    title: str
    excerpt: str
    owner: str = ""
    date: str = ""
    top_rationale: str = ""
    top_assumption: str = ""


# ── Drift / Review ─────────────────────────────────────────────────────────

class ReviewItem(BaseModel):
    decision_id: str
    decision_question: str
    severity: str  # critical | warning | info
    reason: str
    assumption_id: Optional[int] = None
    assumption_statement: Optional[str] = None
    evidence_changed: Optional[str] = None
    impacted_policies: list[str] = Field(default_factory=list)


# ── Dashboard stats ────────────────────────────────────────────────────────

class DashboardStats(BaseModel):
    total_decisions: int
    valid_assumptions: int
    aging_assumptions: int
    broken_assumptions: int
    review_queue_count: int
    recent_decisions: list[Decision] = Field(default_factory=list)
