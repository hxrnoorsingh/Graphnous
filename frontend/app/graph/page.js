'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

const NODE_COLORS = {
    decision: '#6366f1',
    assumption: '#10b981',
    evidence: '#f59e0b',
    signal: '#f43f5e',
    policy: '#14b8a6',
};

const NODE_RADIUS = {
    decision: 28,
    assumption: 20,
    evidence: 18,
    signal: 22,
    policy: 22,
};

const EDGE_LABELS = {
    depends_on: 'depends on',
    justified_by: 'justified by',
    derived_into: 'derived into',
    invalidated_by: 'invalidated by',
    related_to: 'related to',
};

export default function GraphPage() {
    const canvasRef = useRef(null);
    // Use ref for mutable graph state to avoid React re-render cycles during animation
    const graphRef = useRef({ nodes: [], edges: [] });
    // Use state only for initial load detection and tooltips
    const [loaded, setLoaded] = useState(false);
    const [tooltip, setTooltip] = useState(null);

    const animFrameRef = useRef(null);
    const dragRef = useRef(null);
    const panRef = useRef({ x: 0, y: 0 });
    const scaleRef = useRef(1);

    useEffect(() => {
        fetch('/api/graph')
            .then(r => r.json())
            .then(data => {
                // Initialize positions
                const centerX = 600;
                const centerY = 400;
                const nodes = data.nodes.map((n, i) => ({
                    ...n,
                    x: centerX + Math.cos(i / data.nodes.length * Math.PI * 2) * (150 + Math.random() * 200),
                    y: centerY + Math.sin(i / data.nodes.length * Math.PI * 2) * (150 + Math.random() * 200),
                    vx: 0,
                    vy: 0,
                }));
                graphRef.current = { nodes, edges: data.edges };
                setLoaded(true);
            })
            .catch(() => { });
    }, []);

    const simulate = useCallback(() => {
        const { nodes, edges } = graphRef.current;
        if (nodes.length === 0) return;

        // Repulsion
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const dx = nodes[j].x - nodes[i].x;
                const dy = nodes[j].y - nodes[i].y;
                const dist = Math.sqrt(dx * dx + dy * dy) || 1;
                if (dist > 500) continue; // Optimization
                const force = 2000 / (dist * dist);
                const fx = (dx / dist) * force;
                const fy = (dy / dist) * force;
                nodes[i].vx -= fx;
                nodes[i].vy -= fy;
                nodes[j].vx += fx;
                nodes[j].vy += fy;
            }
        }

        // Edge springs
        const nodeMap = {};
        nodes.forEach(n => nodeMap[n.id] = n);
        edges.forEach(e => {
            const source = nodeMap[e.source];
            const target = nodeMap[e.target];
            if (!source || !target) return;
            const dx = target.x - source.x;
            const dy = target.y - source.y;
            const dist = Math.sqrt(dx * dx + dy * dy) || 1;
            const force = (dist - 150) * 0.02; // Stiffer spring
            const fx = (dx / dist) * force;
            const fy = (dy / dist) * force;
            source.vx += fx;
            source.vy += fy;
            target.vx -= fx;
            target.vy -= fy;
        });

        // Center gravity
        const cx = 600, cy = 400;
        nodes.forEach(n => {
            n.vx += (cx - n.x) * 0.005;
            n.vy += (cy - n.y) * 0.005;
        });

        // Update positions
        nodes.forEach(n => {
            if (dragRef.current?.id === n.id) return;
            n.vx *= 0.85; // Damping
            n.vy *= 0.85;
            n.x += n.vx;
            n.y += n.vy;
        });
    }, []);

    const draw = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        // Handle resizing
        const parent = canvas.parentElement;
        if (parent) {
            canvas.width = parent.clientWidth;
            canvas.height = parent.clientHeight;
        }

        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.save();
        ctx.translate(panRef.current.x, panRef.current.y);
        ctx.scale(scaleRef.current, scaleRef.current);

        const { nodes, edges } = graphRef.current;
        const nodeMap = {};
        nodes.forEach(n => nodeMap[n.id] = n);

        // Draw edges
        edges.forEach(e => {
            const src = nodeMap[e.source];
            const tgt = nodeMap[e.target];
            if (!src || !tgt) return;

            ctx.strokeStyle = 'rgba(255,255,255,0.08)';
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(src.x, src.y);
            ctx.lineTo(tgt.x, tgt.y);
            ctx.stroke();

            // Label
            const mx = (src.x + tgt.x) / 2;
            const my = (src.y + tgt.y) / 2;
            ctx.fillStyle = 'rgba(255,255,255,0.2)';
            ctx.font = '9px Inter';
            ctx.textAlign = 'center';
            ctx.fillText(EDGE_LABELS[e.type] || e.type, mx, my - 4);
        });

        // Draw nodes
        nodes.forEach(n => {
            const r = NODE_RADIUS[n.type] || 20;
            const color = NODE_COLORS[n.type] || '#6366f1';

            // Glow
            ctx.shadowColor = color;
            ctx.shadowBlur = 15;
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 0;

            // Header/Border
            ctx.strokeStyle = 'rgba(255,255,255,0.3)';
            ctx.lineWidth = 1;
            ctx.stroke();

            // Icon
            ctx.fillStyle = 'white';
            ctx.font = `bold ${r * 0.6}px Inter`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            const icon = n.type === 'decision' ? 'D' : n.type === 'assumption' ? 'A' : n.type === 'evidence' ? 'E' : n.type === 'signal' ? 'S' : 'P';
            ctx.fillText(icon, n.x, n.y);

            // Label
            ctx.fillStyle = 'rgba(255,255,255,0.8)';
            ctx.font = '10px Inter';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'top';
            const label = n.label?.length > 30 ? n.label.substring(0, 30) + '…' : n.label;
            ctx.fillText(label || '', n.x, n.y + r + 6);
        });

        ctx.restore();
    }, []);

    // Animation Loop
    useEffect(() => {
        if (!loaded) return;

        // Run simulation for a while then stop to save standard CPU, unless dragging
        let frame = 0;
        const loop = () => {
            // Simulate for 300 frames (5s) or if dragging
            if (frame < 300 || dragRef.current) {
                simulate();
            }
            draw();
            frame++;
            animFrameRef.current = requestAnimationFrame(loop);
        };
        animFrameRef.current = requestAnimationFrame(loop);
        return () => cancelAnimationFrame(animFrameRef.current);
    }, [loaded, simulate, draw]);

    const handleMouseDown = (e) => {
        const rect = canvasRef.current.getBoundingClientRect();
        const mx = (e.clientX - rect.left - panRef.current.x) / scaleRef.current;
        const my = (e.clientY - rect.top - panRef.current.y) / scaleRef.current;

        const node = graphRef.current.nodes.find(n => {
            const r = NODE_RADIUS[n.type] || 20;
            return Math.sqrt((n.x - mx) ** 2 + (n.y - my) ** 2) < r;
        });

        if (node) {
            dragRef.current = { id: node.id, offsetX: mx - node.x, offsetY: my - node.y };
        }
    };

    const handleMouseMove = (e) => {
        const rect = canvasRef.current.getBoundingClientRect();
        const mx = (e.clientX - rect.left - panRef.current.x) / scaleRef.current;
        const my = (e.clientY - rect.top - panRef.current.y) / scaleRef.current;

        if (dragRef.current) {
            const node = graphRef.current.nodes.find(n => n.id === dragRef.current.id);
            if (node) {
                node.x = mx - dragRef.current.offsetX;
                node.y = my - dragRef.current.offsetY;
                node.vx = 0;
                node.vy = 0;
            }
        } else {
            const node = graphRef.current.nodes.find(n => {
                const r = NODE_RADIUS[n.type] || 20;
                return Math.sqrt((n.x - mx) ** 2 + (n.y - my) ** 2) < r;
            });

            if (node) {
                setTooltip({
                    x: e.clientX - rect.left + 15,
                    y: e.clientY - rect.top + 15,
                    node,
                });
            } else {
                setTooltip(null);
            }
        }
    };

    const handleMouseUp = () => {
        dragRef.current = null;
    };

    const handleWheel = (e) => {
        e.preventDefault();
        const delta = e.deltaY > 0 ? 0.9 : 1.1;
        scaleRef.current = Math.max(0.3, Math.min(3, scaleRef.current * delta));
        // Simple re-draw after zoom
        requestAnimationFrame(draw);
    };

    return (
        <div className="animate-fade-in">
            <div className="page-header">
                <h2>Memory Graph</h2>
                <p>How we think — explore decisions, assumptions, and evidence as a connected graph</p>
            </div>

            <div className="graph-container">
                <canvas
                    ref={canvasRef}
                    className="graph-canvas"
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={() => { dragRef.current = null; setTooltip(null); }}
                    onWheel={handleWheel}
                    style={{ cursor: dragRef.current ? 'grabbing' : 'grab' }}
                />

                {/* Tooltip */}
                {tooltip && (
                    <div className="graph-tooltip" style={{ left: tooltip.x, top: tooltip.y }}>
                        <div style={{ fontWeight: 600, marginBottom: 4, color: NODE_COLORS[tooltip.node.type] }}>
                            {tooltip.node.type.toUpperCase()}
                        </div>
                        <div style={{ marginBottom: 4 }}>{tooltip.node.label}</div>
                        {tooltip.node.metadata && Object.entries(tooltip.node.metadata).map(([k, v]) => (
                            v ? <div key={k} style={{ color: 'var(--text-muted)', fontSize: 11 }}>{k}: {String(v)}</div> : null
                        ))}
                    </div>
                )}

                {/* Legend */}
                <div className="graph-legend">
                    {Object.entries(NODE_COLORS).map(([type, color]) => (
                        <span key={type} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                            <span className="graph-legend-dot" style={{ background: color }} />
                            {type}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}
