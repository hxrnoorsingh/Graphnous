'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function DriftPage() {
    const [queue, setQueue] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all'); // all | critical | warning | info

    useEffect(() => {
        fetch('/api/drift/review-queue')
            .then(r => r.json())
            .then(data => { setQueue(data); setLoading(false); })
            .catch(() => setLoading(false));
    }, []);

    const filteredQueue = filter === 'all' ? queue : queue.filter(i => i.severity === filter);

    const counts = {
        all: queue.length,
        critical: queue.filter(i => i.severity === 'critical').length,
        warning: queue.filter(i => i.severity === 'warning').length,
        info: queue.filter(i => i.severity === 'info').length,
    };

    if (loading) {
        return <div className="empty-state"><div className="empty-state-icon" style={{ animation: 'pulse 1.5s infinite' }}>⚡</div><h3>Loading review queue…</h3></div>;
    }

    return (
        <div className="animate-fade-in">
            <div className="page-header">
                <h2>Drift & Reviews</h2>
                <p>Organizational forgetting detector — what needs revisiting and why</p>
            </div>

            {/* Severity stats */}
            <div className="stat-grid stagger" style={{ marginBottom: 'var(--space-lg)' }}>
                <div className="card stat-card accent-rose animate-fade-in" style={{ cursor: 'pointer' }} onClick={() => setFilter('critical')}>
                    <div className="stat-label">Critical</div>
                    <div className="stat-value">{counts.critical}</div>
                    <div className="stat-sub">Broken or expired assumptions</div>
                </div>
                <div className="card stat-card accent-amber animate-fade-in" style={{ cursor: 'pointer' }} onClick={() => setFilter('warning')}>
                    <div className="stat-label">Warning</div>
                    <div className="stat-value">{counts.warning}</div>
                    <div className="stat-sub">Aging or expiring soon</div>
                </div>
                <div className="card stat-card accent-teal animate-fade-in" style={{ cursor: 'pointer' }} onClick={() => setFilter('info')}>
                    <div className="stat-label">Info</div>
                    <div className="stat-value">{counts.info}</div>
                    <div className="stat-sub">Low confidence decisions</div>
                </div>
            </div>

            {/* Filter Tabs */}
            <div className="domain-tabs" style={{ marginBottom: 'var(--space-lg)' }}>
                {['all', 'critical', 'warning', 'info'].map(f => (
                    <button
                        key={f}
                        className={`domain-tab ${filter === f ? 'active' : ''}`}
                        onClick={() => setFilter(f)}
                    >
                        {f === 'all' ? `All (${counts.all})` : `${f} (${counts[f]})`}
                    </button>
                ))}
            </div>

            {/* Queue */}
            <div className="decision-list stagger">
                {filteredQueue.length === 0 ? (
                    <div className="card">
                        <div className="empty-state">
                            <div className="empty-state-icon">✓</div>
                            <h3>All clear</h3>
                            <p>No {filter !== 'all' ? filter : ''} items need review</p>
                        </div>
                    </div>
                ) : (
                    filteredQueue.map((item, i) => (
                        <div key={i} className="card review-card animate-fade-in" style={{ padding: 0 }}>
                            <div className={`review-severity-bar ${item.severity}`} />
                            <div className="review-content" style={{ padding: 'var(--space-md) var(--space-lg) var(--space-md) 0' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-sm)' }}>
                                    <div>
                                        <Link href={`/decisions/${item.decision_id}`} className="review-decision-link">
                                            {item.decision_id}
                                        </Link>
                                        <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 4 }}>
                                            {item.decision_question}
                                        </div>
                                    </div>
                                    <span className={`badge badge-${item.severity === 'critical' ? 'broken' : item.severity === 'warning' ? 'aging' : 'info'}`}>
                                        {item.severity}
                                    </span>
                                </div>

                                <div className="review-reason">
                                    {item.reason}
                                </div>

                                <div className="review-actions" style={{ marginTop: 'var(--space-md)' }}>
                                    <Link href={`/decisions/${item.decision_id}`} className="btn btn-secondary btn-sm">
                                        Review Decision
                                    </Link>
                                    <Link href={`/graph?focus=${item.decision_id}`} className="btn btn-ghost btn-sm">
                                        View in Graph
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
