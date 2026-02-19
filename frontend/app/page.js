'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function HomePage() {
    const [stats, setStats] = useState(null);
    const [reviewQueue, setReviewQueue] = useState([]);
    const [activeDomain, setActiveDomain] = useState('All');

    useEffect(() => {
        fetch('/api/drift/stats')
            .then(r => r.json())
            .then(setStats)
            .catch(() => { });

        fetch('/api/drift/review-queue')
            .then(r => r.json())
            .then(setReviewQueue)
            .catch(() => { });
    }, []);

    const domains = ['All', 'IT Governance', 'Security', 'Compliance', 'Engineering', 'Operations'];

    const filteredRecent = stats?.recent_decisions?.filter(
        d => activeDomain === 'All' || d.domain === activeDomain
    ) || [];

    const filteredQueue = reviewQueue.filter(
        item => activeDomain === 'All' || item.decision_question?.toLowerCase().includes(activeDomain.toLowerCase())
    );

    return (
        <div className="animate-fade-in">
            <div className="page-header">
                <h2>Cognitive State</h2>
                <p>What should we be thinking about right now?</p>
            </div>

            {/* Domain Tabs */}
            <div className="domain-tabs">
                {domains.map(d => (
                    <button
                        key={d}
                        className={`domain-tab ${activeDomain === d ? 'active' : ''}`}
                        onClick={() => setActiveDomain(d)}
                    >
                        {d}
                    </button>
                ))}
            </div>

            {/* Stats Grid */}
            <div className="stat-grid stagger">
                <div className="card stat-card accent-primary animate-fade-in">
                    <div className="stat-label">Total Decisions</div>
                    <div className="stat-value">{stats?.total_decisions ?? '—'}</div>
                    <div className="stat-sub">Active decisions tracked</div>
                </div>
                <div className="card stat-card accent-emerald animate-fade-in">
                    <div className="stat-label">Valid Assumptions</div>
                    <div className="stat-value">{stats?.valid_assumptions ?? '—'}</div>
                    <div className="stat-sub">Within validity window</div>
                </div>
                <div className="card stat-card accent-amber animate-fade-in">
                    <div className="stat-label">Aging Assumptions</div>
                    <div className="stat-value">{stats?.aging_assumptions ?? '—'}</div>
                    <div className="stat-sub">Expiring within 30 days</div>
                </div>
                <div className="card stat-card accent-rose animate-fade-in">
                    <div className="stat-label">Broken / Expired</div>
                    <div className="stat-value">{stats?.broken_assumptions ?? '—'}</div>
                    <div className="stat-sub">Immediate attention needed</div>
                </div>
                <div className="card stat-card accent-teal animate-fade-in">
                    <div className="stat-label">Review Queue</div>
                    <div className="stat-value">{stats?.review_queue_count ?? '—'}</div>
                    <div className="stat-sub">Items needing review</div>
                </div>
            </div>

            {/* Two-column layout */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-lg)' }}>
                {/* Review Queue */}
                <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                    <div style={{
                        padding: 'var(--space-md) var(--space-lg)',
                        borderBottom: '1px solid var(--border-subtle)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <h3 style={{ fontSize: '15px', fontWeight: 600 }}>🔔 Review Queue</h3>
                        <Link href="/drift" className="btn btn-ghost btn-sm">View all →</Link>
                    </div>
                    <div className="stagger">
                        {filteredQueue.length === 0 ? (
                            <div className="empty-state" style={{ padding: 'var(--space-xl)' }}>
                                <div className="empty-state-icon">✓</div>
                                <h3>All clear</h3>
                                <p>No items need review right now</p>
                            </div>
                        ) : (
                            filteredQueue.slice(0, 5).map((item, i) => (
                                <div key={i} className="review-card animate-fade-in">
                                    <div className={`review-severity-bar ${item.severity}`} />
                                    <div className="review-content">
                                        <Link href={`/decisions/${item.decision_id}`} className="review-decision-link">
                                            {item.decision_id}
                                        </Link>
                                        <div className="review-reason">{item.reason}</div>
                                        <div className="review-actions">
                                            <span className={`badge badge-${item.severity === 'critical' ? 'broken' : item.severity === 'warning' ? 'aging' : 'info'}`}>
                                                {item.severity}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Recent Decisions */}
                <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                    <div style={{
                        padding: 'var(--space-md) var(--space-lg)',
                        borderBottom: '1px solid var(--border-subtle)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <h3 style={{ fontSize: '15px', fontWeight: 600 }}>📋 Recent Decisions</h3>
                        <Link href="/decisions" className="btn btn-ghost btn-sm">View all →</Link>
                    </div>
                    <div className="stagger">
                        {filteredRecent.length === 0 ? (
                            <div className="empty-state" style={{ padding: 'var(--space-xl)' }}>
                                <div className="empty-state-icon">📝</div>
                                <h3>No decisions yet</h3>
                                <p>Capture your first decision</p>
                            </div>
                        ) : (
                            filteredRecent.map((dec) => (
                                <Link
                                    key={dec.id}
                                    href={`/decisions/${dec.id}`}
                                    style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}
                                >
                                    <div className="feed-item animate-fade-in" style={{ padding: 'var(--space-md) var(--space-lg)' }}>
                                        <div className="feed-dot" style={{ background: 'var(--accent-primary)' }} />
                                        <div style={{ flex: 1, minWidth: 0 }}>
                                            <div style={{ fontSize: '13px', fontWeight: 600, marginBottom: '4px' }}>
                                                {dec.question}
                                            </div>
                                            <div className="decision-card-meta">
                                                <span>{dec.id}</span>
                                                <span>·</span>
                                                <span>{dec.owner}</span>
                                                <span>·</span>
                                                <span>{dec.decided_on}</span>
                                                <span className={`badge badge-active`}>{(dec.confidence * 100).toFixed(0)}% confidence</span>
                                            </div>
                                            <div className="decision-card-tags">
                                                {dec.context_tags?.slice(0, 3).map(tag => (
                                                    <span key={tag} className="tag">{tag}</span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
