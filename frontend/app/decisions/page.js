'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function DecisionsListPage() {
    const [decisions, setDecisions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/decisions')
            .then(r => r.json())
            .then(data => { setDecisions(data); setLoading(false); })
            .catch(() => setLoading(false));
    }, []);

    if (loading) {
        return <div className="empty-state"><div className="empty-state-icon" style={{ animation: 'pulse 1.5s infinite' }}>◈</div><h3>Loading decisions…</h3></div>;
    }

    return (
        <div className="animate-fade-in">
            <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                    <h2>Decisions</h2>
                    <p>{decisions.length} decisions captured</p>
                </div>
                <Link href="/decisions/new" className="btn btn-primary">+ New Decision</Link>
            </div>

            <div className="decision-list stagger">
                {decisions.map((dec) => (
                    <div key={dec.id} className="card decision-card animate-fade-in" style={{ position: 'relative' }}>
                        <Link href={`/decisions/${dec.id}`} style={{ textDecoration: 'none', color: 'inherit', display: 'flex', gap: 'var(--space-md)', flex: 1, alignItems: 'flex-start' }}>
                            <div style={{
                                width: 40, height: 40, borderRadius: 'var(--radius-md)',
                                background: 'var(--accent-primary-soft)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: '14px', fontWeight: 700, color: 'var(--accent-primary)',
                                flexShrink: 0
                            }}>
                                {dec.confidence >= 0.7 ? '●' : dec.confidence >= 0.4 ? '◐' : '○'}
                            </div>
                            <div className="decision-card-content">
                                <div className="decision-card-question">{dec.question}</div>
                                <div className="decision-card-meta">
                                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: 'var(--accent-primary)' }}>{dec.id}</span>
                                    <span>·</span>
                                    <span>{dec.owner}</span>
                                    <span>·</span>
                                    <span>{dec.decided_on}</span>
                                    <span>·</span>
                                    <span className={`badge badge-active`}>{(dec.confidence * 100).toFixed(0)}%</span>
                                    <span className="badge badge-info">{dec.domain}</span>
                                </div>
                                <div className="decision-card-tags" style={{ marginTop: 8 }}>
                                    {dec.context_tags?.map(t => <span key={t} className="tag">{t}</span>)}
                                </div>
                                {dec.assumptions?.length > 0 && (
                                    <div style={{ marginTop: 8, display: 'flex', gap: 8, fontSize: 11, color: 'var(--text-muted)' }}>
                                        <span style={{ color: 'var(--accent-emerald)' }}>
                                            {dec.assumptions.filter(a => a.status === 'valid').length} valid
                                        </span>
                                        <span style={{ color: 'var(--accent-amber)' }}>
                                            {dec.assumptions.filter(a => a.status === 'aging').length} aging
                                        </span>
                                        <span style={{ color: 'var(--accent-rose)' }}>
                                            {dec.assumptions.filter(a => a.status === 'broken').length} broken
                                        </span>
                                    </div>
                                )}
                            </div>
                        </Link>
                        <button
                            className="btn btn-ghost btn-danger btn-sm delete-btn"
                            style={{ position: 'absolute', top: 'var(--space-md)', right: 'var(--space-md)' }}
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                if (confirm('Are you sure you want to delete this decision?')) {
                                    fetch(`/api/decisions/${dec.id}`, { method: 'DELETE' })
                                        .then(() => setDecisions(prev => prev.filter(d => d.id !== dec.id)));
                                }
                            }}
                        >
                            🗑
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
