'use client';

import './globals.css';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

const NAV_ITEMS = [
    {
        section: 'Overview',
        items: [
            { label: 'Cognitive State', href: '/', icon: '◈' },
        ]
    },
    {
        section: 'Memory',
        items: [
            { label: 'Decisions', href: '/decisions', icon: '◇' },
            { label: 'Memory Graph', href: '/graph', icon: '◎' },
            { label: 'Search', href: '/search', icon: '⌕' },
        ]
    },
    {
        section: 'Intelligence',
        items: [
            { label: 'Drift & Reviews', href: '/drift', icon: '⚡', badge: true },
        ]
    },
];

export default function RootLayout({ children }) {
    const pathname = usePathname();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [reviewCount, setReviewCount] = useState(0);

    useEffect(() => {
        fetch('/api/drift/review-queue')
            .then(r => r.json())
            .then(data => setReviewCount(data.length))
            .catch(() => { });
    }, []);

    return (
        <html lang="en">
            <head>
                <title>GraphNous — Decision Memory</title>
                <meta name="description" content="Cognitive infrastructure for organizational decision memory" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </head>
            <body>
                <div className="app-layout">
                    {/* Sidebar */}
                    <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
                        <div className="sidebar-brand">
                            <div className="sidebar-brand-icon">G</div>
                            <div>
                                <h1>GraphNous</h1>
                                <span>Decision Memory</span>
                            </div>
                        </div>

                        <nav className="sidebar-nav">
                            {NAV_ITEMS.map((section) => (
                                <div key={section.section}>
                                    <div className="sidebar-section-label">{section.section}</div>
                                    {section.items.map((item) => (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            className={`sidebar-link ${pathname === item.href ? 'active' : ''}`}
                                            onClick={() => setSidebarOpen(false)}
                                        >
                                            <span className="nav-icon">{item.icon}</span>
                                            {item.label}
                                            {item.badge && reviewCount > 0 && (
                                                <span className="sidebar-badge">{reviewCount}</span>
                                            )}
                                        </Link>
                                    ))}
                                </div>
                            ))}
                        </nav>
                    </aside>

                    {/* Main Area */}
                    <div className="main-content">
                        <header className="topbar">
                            <button className="hamburger" onClick={() => setSidebarOpen(!sidebarOpen)}>
                                ☰
                            </button>

                            <div className="topbar-search">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
                                </svg>
                                <input
                                    type="text"
                                    placeholder="Search decisions, assumptions, evidence..."
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' && e.target.value.trim()) {
                                            window.location.href = `/search?q=${encodeURIComponent(e.target.value.trim())}`;
                                        }
                                    }}
                                />
                            </div>

                            <div className="topbar-actions">
                                <Link href="/decisions/new" className="btn btn-primary">
                                    + Decision
                                </Link>
                            </div>
                        </header>

                        <main className="page-content">
                            {children}
                        </main>
                    </div>
                </div>

                {/* Mobile overlay */}
                {sidebarOpen && (
                    <div
                        style={{
                            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)',
                            zIndex: 99, display: 'none',
                        }}
                        className="sidebar-overlay"
                        onClick={() => setSidebarOpen(false)}
                    />
                )}
            </body>
        </html>
    );
}
