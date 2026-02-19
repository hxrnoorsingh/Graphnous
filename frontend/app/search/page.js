'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

function SearchContent() {
    const searchParams = useSearchParams();
    const initialQ = searchParams.get('q') || '';
    const [query, setQuery] = useState(initialQ);
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searched, setSearched] = useState(false);

    const doSearch = async (q) => {
        if (!q.trim()) return;
        setLoading(true);
        setSearched(true);
        try {
            const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
            const data = await res.json();
            setResults(data);
        } catch {
            setResults([]);
        }
        setLoading(false);
    };

    useEffect(() => {
        if (initialQ) doSearch(initialQ);
    }, []);

    return (
        <div className="animate-fade-in" style={{ maxWidth: 800, margin: '0 auto' }}>
            <div className="page-header">
                <h2>Search</h2>
                <p>Ask the organization — find decisions, assumptions, and evidence</p>
            </div>

            {/* Search Input */}
            <div style={{ position: 'relative', marginBottom: 'var(--space-xl)' }}>
                <svg
                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2"
                    style={{ position: 'absolute', left: 18, top: '50%', transform: 'translateY(-50%)', width: 20, height: 20, color: 'var(--text-muted)' }}
                >
                    <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
                </svg>
                <input
                    className="form-input search-page-input"
                    placeholder="e.g., 'why vendor x', 'assumption headcount stable', 'policy data retention'"
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter') doSearch(query); }}
                    autoFocus
                />
            </div>

            {/* Example Queries */}
            {!searched && (
                <div className="card" style={{ marginBottom: 'var(--space-lg)' }}>
                    <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 'var(--space-md)' }}>Try asking</h3>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-sm)' }}>
                        {[
                            'why vendor',
                            'assumption headcount',
                            'policy data retention',
                            'compliance',
                            'zero trust',
                            'postmortem',
                        ].map(q => (
                            <button
                                key={q}
                                className="domain-tab"
                                onClick={() => { setQuery(q); doSearch(q); }}
                            >
                                "{q}"
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Loading */}
            {loading && (
                <div className="empty-state">
                    <div className="empty-state-icon" style={{ animation: 'pulse 1.5s infinite' }}>⌕</div>
                    <h3>Searching…</h3>
                </div>
            )}

            {/* Results */}
            {!loading && searched && (
                <div>
                    <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 'var(--space-md)' }}>
                        {results.length} result{results.length !== 1 ? 's' : ''} for "{query}"
                    </div>
                    <div className="decision-list stagger">
                        {results.length === 0 ? (
                            <div className="empty-state">
                                <div className="empty-state-icon">🔍</div>
                                <h3>No results found</h3>
                                <p>Try different keywords or browse decisions</p>
                            </div>
                        ) : (
                            results.map((r) => (
                                <Link key={r.id} href={`/decisions/${r.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <div className="card card-clickable search-result animate-fade-in">
                                        <div className="search-result-title">
                                            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: 'var(--accent-primary)', marginRight: 8 }}>{r.id}</span>
                                            {r.title}
                                        </div>
                                        <div className="decision-card-meta" style={{ marginBottom: 'var(--space-sm)' }}>
                                            <span>{r.owner}</span>
                                            <span>·</span>
                                            <span>{r.date}</span>
                                        </div>
                                        {(r.top_rationale || r.top_assumption) && (
                                            <div className="search-result-why">
                                                {r.top_rationale && <div><strong>Rationale:</strong> {r.top_rationale}</div>}
                                                {r.top_assumption && <div style={{ marginTop: r.top_rationale ? 4 : 0 }}><strong>Assumption:</strong> {r.top_assumption}</div>}
                                            </div>
                                        )}
                                    </div>
                                </Link>
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default function SearchPage() {
    return (
        <Suspense fallback={<div className="empty-state"><h3>Loading…</h3></div>}>
            <SearchContent />
        </Suspense>
    );
}
