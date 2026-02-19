'use client';

import { useState, useEffect, use } from 'react';
import Link from 'next/link';

export default function DecisionDetailPage({ params }) {
    const { id } = use(params);
    const [decision, setDecision] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`/api/decisions/${id}`)
            .then(r => r.json())
            .then(data => { setDecision(data); setLoading(false); })
            .catch(() => setLoading(false));
    }, [id]);

    if (loading) {
        return <div className="empty-state"><div className="empty-state-icon" style={{ animation: 'pulse 1.5s infinite' }}>◈</div><h3>Loading…</h3></div>;
    }

    if (!decision) {
        return <div className="empty-state"><div className="empty-state-icon">⚠</div><h3>Decision not found</h3></div>;
    }

    const chosenAlt = decision.alternatives?.find(a => a.status === 'chosen');
    const rejectedAlts = decision.alternatives?.filter(a => a.status !== 'chosen') || [];

    return (
        <div className="animate-fade-in">
            <div style={{ marginBottom: 'var(--space-lg)' }}>
                <Link href="/decisions" className="btn btn-ghost btn-sm" style={{ marginBottom: 'var(--space-md)', display: 'inline-flex' }}>← Back to Decisions</Link>
            </div>

            <div className="three-rail">
                {/* ── Left Rail: Metadata ────────────────────────────────────── */}
                <div className="rail-left">
                    <div className="card" style={{ padding: 'var(--space-lg)' }}>
                        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: 'var(--accent-primary)', fontWeight: 600, marginBottom: 'var(--space-md)' }}>
                            {decision.id}
                        </div>

                        <div style={{ marginBottom: 'var(--space-lg)' }}>
                            <div style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 4 }}>Status</div>
                            <span className={`badge badge-${decision.status === 'active' ? 'active' : 'aging'}`}>
                                {decision.status}
                            </span>
                        </div>

                        <div style={{ marginBottom: 'var(--space-lg)' }}>
                            <div style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 4 }}>Owner</div>
                            <div style={{ fontSize: 14, fontWeight: 500 }}>{decision.owner || '—'}</div>
                        </div>

                        <div style={{ marginBottom: 'var(--space-lg)' }}>
                            <div style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 4 }}>Decided</div>
                            <div style={{ fontSize: 14 }}>{decision.decided_on || '—'}</div>
                        </div>

                        <div style={{ marginBottom: 'var(--space-lg)' }}>
                            <div style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 4 }}>Confidence</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                <div style={{
                                    width: '100%', height: 6, borderRadius: 3,
                                    background: 'var(--bg-surface)',
                                    overflow: 'hidden'
                                }}>
                                    <div style={{
                                        width: `${decision.confidence * 100}%`,
                                        height: '100%',
                                        borderRadius: 3,
                                        background: decision.confidence >= 0.7 ? 'var(--accent-emerald)' : decision.confidence >= 0.4 ? 'var(--accent-amber)' : 'var(--accent-rose)',
                                        transition: 'width 0.5s ease'
                                    }} />
                                </div>
                                <span style={{ fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap' }}>
                                    {(decision.confidence * 100).toFixed(0)}%
                                </span>
                            </div>
                        </div>

                        <div style={{ marginBottom: 'var(--space-lg)' }}>
                            <div style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 4 }}>Domain</div>
                            <span className="badge badge-info">{decision.domain || '—'}</span>
                        </div>

                        <div>
                            <div style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 8 }}>Tags</div>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                                {decision.context_tags?.map(t => <span key={t} className="tag">{t}</span>)}
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── Center: Narrative ──────────────────────────────────────── */}
                <div className="rail-center">
                    <div className="card" style={{ marginBottom: 'var(--space-lg)' }}>
                        <h2 style={{ fontSize: 20, fontWeight: 700, lineHeight: 1.4, marginBottom: 'var(--space-lg)' }}>
                            {decision.question}
                        </h2>

                        {/* Chosen option */}
                        {chosenAlt && (
                            <div style={{
                                padding: 'var(--space-md)',
                                background: 'var(--accent-emerald-soft)',
                                borderRadius: 'var(--radius-md)',
                                borderLeft: '3px solid var(--accent-emerald)',
                                marginBottom: 'var(--space-lg)',
                            }}>
                                <div style={{ fontSize: 11, color: 'var(--accent-emerald)', fontWeight: 600, textTransform: 'uppercase', marginBottom: 4 }}>
                                    Chosen Option
                                </div>
                                <div style={{ fontSize: 15, fontWeight: 600 }}>{chosenAlt.option}</div>
                            </div>
                        )}

                        {/* Rationale */}
                        {decision.rationale?.length > 0 && (
                            <div style={{ marginBottom: 'var(--space-lg)' }}>
                                <h3 style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 'var(--space-md)' }}>
                                    Rationale
                                </h3>
                                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
                                    {decision.rationale.map((r, i) => (
                                        <li key={i} style={{
                                            padding: 'var(--space-sm) var(--space-md)',
                                            background: 'var(--bg-surface)',
                                            borderRadius: 'var(--radius-sm)',
                                            fontSize: 14,
                                            display: 'flex', alignItems: 'flex-start', gap: 8,
                                            lineHeight: 1.5,
                                        }}>
                                            <span style={{ color: 'var(--accent-primary)', flexShrink: 0 }}>▸</span>
                                            {r}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Rejected Alternatives */}
                        {rejectedAlts.length > 0 && (
                            <div style={{ marginBottom: 'var(--space-lg)' }}>
                                <h3 style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 'var(--space-md)' }}>
                                    Alternatives Considered
                                </h3>
                                {rejectedAlts.map((alt, i) => (
                                    <div key={i} style={{
                                        padding: 'var(--space-md)',
                                        background: 'var(--bg-surface)',
                                        borderRadius: 'var(--radius-md)',
                                        marginBottom: 'var(--space-sm)',
                                        borderLeft: '3px solid var(--text-muted)',
                                    }}>
                                        <div style={{ fontWeight: 600, marginBottom: 4 }}>{alt.option}</div>
                                        <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                                            <span className={`badge badge-${alt.status === 'rejected' ? 'broken' : 'aging'}`}>
                                                {alt.status}
                                            </span>
                                            {alt.reason && <span style={{ marginLeft: 8 }}>— {alt.reason}</span>}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Constraints */}
                        {decision.constraints?.length > 0 && (
                            <div style={{ marginBottom: 'var(--space-lg)' }}>
                                <h3 style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 'var(--space-md)' }}>
                                    Constraints
                                </h3>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                                    {decision.constraints.map((c, i) => (
                                        <span key={i} className="tag" style={{ fontSize: 12, padding: '4px 12px' }}>{c}</span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Assumptions */}
                        {decision.assumptions?.length > 0 && (
                            <div>
                                <h3 style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 'var(--space-md)' }}>
                                    Assumptions ({decision.assumptions.length})
                                </h3>
                                {decision.assumptions.map((a) => (
                                    <div key={a.id} className={`assumption-row ${a.status}`}>
                                        <div style={{ flex: 1 }}>
                                            <div className="assumption-statement">{a.statement}</div>
                                            <div className="assumption-meta">
                                                {a.valid_until && <span>Valid until: {a.valid_until}</span>}
                                                {a.risk_if_false && <span style={{ marginLeft: 12 }}>Risk: {a.risk_if_false}</span>}
                                            </div>
                                        </div>
                                        <span className={`badge badge-${a.status}`}>{a.status}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* ── Right Rail: Provenance ─────────────────────────────────── */}
                <div className="rail-right">
                    {/* Evidence */}
                    <div className="card" style={{ marginBottom: 'var(--space-lg)' }}>
                        <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 'var(--space-md)' }}>
                            📎 Evidence ({decision.evidence?.length || 0})
                        </h3>
                        {decision.evidence?.map((ev) => (
                            <div key={ev.id} className="evidence-row">
                                <div className={`evidence-type-icon ${ev.type}`}>
                                    {ev.type === 'BI' ? '📊' : ev.type === 'Document' ? '📄' : ev.type === 'Ticket' ? '🎫' : '🔗'}
                                </div>
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <div className="evidence-ref">{ev.ref}</div>
                                    <div className="evidence-reliability">
                                        <span className={`badge badge-${ev.reliability === 'high' ? 'valid' : ev.reliability === 'medium' ? 'aging' : 'broken'}`} style={{ fontSize: 10 }}>
                                            {ev.reliability}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Review Triggers */}
                    {decision.review_triggers?.length > 0 && (
                        <div className="card" style={{ marginBottom: 'var(--space-lg)' }}>
                            <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 'var(--space-md)' }}>
                                🔔 Review Triggers
                            </h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                                {decision.review_triggers.map((t, i) => (
                                    <div key={i} className="tag" style={{ justifyContent: 'flex-start' }}>
                                        {t.replace(/_/g, ' ')}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Quick Actions */}
                    <div className="card">
                        <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 'var(--space-md)' }}>Actions</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
                            <Link href={`/graph?focus=${decision.id}`} className="btn btn-secondary btn-sm" style={{ justifyContent: 'center' }}>
                                View in Graph
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
