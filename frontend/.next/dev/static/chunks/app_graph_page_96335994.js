(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/graph/page.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>GraphPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
const NODE_COLORS = {
    decision: '#6366f1',
    assumption: '#10b981',
    evidence: '#f59e0b',
    signal: '#f43f5e',
    policy: '#14b8a6'
};
const NODE_RADIUS = {
    decision: 28,
    assumption: 20,
    evidence: 18,
    signal: 22,
    policy: 22
};
const EDGE_LABELS = {
    depends_on: 'depends on',
    justified_by: 'justified by',
    derived_into: 'derived into',
    invalidated_by: 'invalidated by',
    related_to: 'related to'
};
function GraphPage() {
    _s();
    const canvasRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Use ref for mutable graph state to avoid React re-render cycles during animation
    const graphRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])({
        nodes: [],
        edges: []
    });
    // Use state only for initial load detection and tooltips
    const [loaded, setLoaded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [tooltip, setTooltip] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const animFrameRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const dragRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const panRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])({
        x: 0,
        y: 0
    });
    const scaleRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(1);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "GraphPage.useEffect": ()=>{
            fetch('/api/graph').then({
                "GraphPage.useEffect": (r)=>r.json()
            }["GraphPage.useEffect"]).then({
                "GraphPage.useEffect": (data)=>{
                    // Initialize positions
                    const centerX = 600;
                    const centerY = 400;
                    const nodes = data.nodes.map({
                        "GraphPage.useEffect.nodes": (n, i)=>({
                                ...n,
                                x: centerX + Math.cos(i / data.nodes.length * Math.PI * 2) * (150 + Math.random() * 200),
                                y: centerY + Math.sin(i / data.nodes.length * Math.PI * 2) * (150 + Math.random() * 200),
                                vx: 0,
                                vy: 0
                            })
                    }["GraphPage.useEffect.nodes"]);
                    graphRef.current = {
                        nodes,
                        edges: data.edges
                    };
                    setLoaded(true);
                }
            }["GraphPage.useEffect"]).catch({
                "GraphPage.useEffect": ()=>{}
            }["GraphPage.useEffect"]);
        }
    }["GraphPage.useEffect"], []);
    const simulate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "GraphPage.useCallback[simulate]": ()=>{
            const { nodes, edges } = graphRef.current;
            if (nodes.length === 0) return;
            // Repulsion
            for(let i = 0; i < nodes.length; i++){
                for(let j = i + 1; j < nodes.length; j++){
                    const dx = nodes[j].x - nodes[i].x;
                    const dy = nodes[j].y - nodes[i].y;
                    const dist = Math.sqrt(dx * dx + dy * dy) || 1;
                    if (dist > 500) continue; // Optimization
                    const force = 2000 / (dist * dist);
                    const fx = dx / dist * force;
                    const fy = dy / dist * force;
                    nodes[i].vx -= fx;
                    nodes[i].vy -= fy;
                    nodes[j].vx += fx;
                    nodes[j].vy += fy;
                }
            }
            // Edge springs
            const nodeMap = {};
            nodes.forEach({
                "GraphPage.useCallback[simulate]": (n)=>nodeMap[n.id] = n
            }["GraphPage.useCallback[simulate]"]);
            edges.forEach({
                "GraphPage.useCallback[simulate]": (e)=>{
                    const source = nodeMap[e.source];
                    const target = nodeMap[e.target];
                    if (!source || !target) return;
                    const dx = target.x - source.x;
                    const dy = target.y - source.y;
                    const dist = Math.sqrt(dx * dx + dy * dy) || 1;
                    const force = (dist - 150) * 0.02; // Stiffer spring
                    const fx = dx / dist * force;
                    const fy = dy / dist * force;
                    source.vx += fx;
                    source.vy += fy;
                    target.vx -= fx;
                    target.vy -= fy;
                }
            }["GraphPage.useCallback[simulate]"]);
            // Center gravity
            const cx = 600, cy = 400;
            nodes.forEach({
                "GraphPage.useCallback[simulate]": (n)=>{
                    n.vx += (cx - n.x) * 0.005;
                    n.vy += (cy - n.y) * 0.005;
                }
            }["GraphPage.useCallback[simulate]"]);
            // Update positions
            nodes.forEach({
                "GraphPage.useCallback[simulate]": (n)=>{
                    if (dragRef.current?.id === n.id) return;
                    n.vx *= 0.85; // Damping
                    n.vy *= 0.85;
                    n.x += n.vx;
                    n.y += n.vy;
                }
            }["GraphPage.useCallback[simulate]"]);
        }
    }["GraphPage.useCallback[simulate]"], []);
    const draw = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "GraphPage.useCallback[draw]": ()=>{
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
            nodes.forEach({
                "GraphPage.useCallback[draw]": (n)=>nodeMap[n.id] = n
            }["GraphPage.useCallback[draw]"]);
            // Draw edges
            edges.forEach({
                "GraphPage.useCallback[draw]": (e)=>{
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
                }
            }["GraphPage.useCallback[draw]"]);
            // Draw nodes
            nodes.forEach({
                "GraphPage.useCallback[draw]": (n)=>{
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
                }
            }["GraphPage.useCallback[draw]"]);
            ctx.restore();
        }
    }["GraphPage.useCallback[draw]"], []);
    // Animation Loop
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "GraphPage.useEffect": ()=>{
            if (!loaded) return;
            // Run simulation for a while then stop to save standard CPU, unless dragging
            let frame = 0;
            const loop = {
                "GraphPage.useEffect.loop": ()=>{
                    // Simulate for 300 frames (5s) or if dragging
                    if (frame < 300 || dragRef.current) {
                        simulate();
                    }
                    draw();
                    frame++;
                    animFrameRef.current = requestAnimationFrame(loop);
                }
            }["GraphPage.useEffect.loop"];
            animFrameRef.current = requestAnimationFrame(loop);
            return ({
                "GraphPage.useEffect": ()=>cancelAnimationFrame(animFrameRef.current)
            })["GraphPage.useEffect"];
        }
    }["GraphPage.useEffect"], [
        loaded,
        simulate,
        draw
    ]);
    const handleMouseDown = (e)=>{
        const rect = canvasRef.current.getBoundingClientRect();
        const mx = (e.clientX - rect.left - panRef.current.x) / scaleRef.current;
        const my = (e.clientY - rect.top - panRef.current.y) / scaleRef.current;
        const node = graphRef.current.nodes.find((n)=>{
            const r = NODE_RADIUS[n.type] || 20;
            return Math.sqrt((n.x - mx) ** 2 + (n.y - my) ** 2) < r;
        });
        if (node) {
            dragRef.current = {
                id: node.id,
                offsetX: mx - node.x,
                offsetY: my - node.y
            };
        }
    };
    const handleMouseMove = (e)=>{
        const rect = canvasRef.current.getBoundingClientRect();
        const mx = (e.clientX - rect.left - panRef.current.x) / scaleRef.current;
        const my = (e.clientY - rect.top - panRef.current.y) / scaleRef.current;
        if (dragRef.current) {
            const node = graphRef.current.nodes.find((n)=>n.id === dragRef.current.id);
            if (node) {
                node.x = mx - dragRef.current.offsetX;
                node.y = my - dragRef.current.offsetY;
                node.vx = 0;
                node.vy = 0;
            }
        } else {
            const node = graphRef.current.nodes.find((n)=>{
                const r = NODE_RADIUS[n.type] || 20;
                return Math.sqrt((n.x - mx) ** 2 + (n.y - my) ** 2) < r;
            });
            if (node) {
                setTooltip({
                    x: e.clientX - rect.left + 15,
                    y: e.clientY - rect.top + 15,
                    node
                });
            } else {
                setTooltip(null);
            }
        }
    };
    const handleMouseUp = ()=>{
        dragRef.current = null;
    };
    const handleWheel = (e)=>{
        e.preventDefault();
        const delta = e.deltaY > 0 ? 0.9 : 1.1;
        scaleRef.current = Math.max(0.3, Math.min(3, scaleRef.current * delta));
        // Simple re-draw after zoom
        requestAnimationFrame(draw);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "animate-fade-in",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "page-header",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        children: "Memory Graph"
                    }, void 0, false, {
                        fileName: "[project]/app/graph/page.js",
                        lineNumber: 281,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: "How we think — explore decisions, assumptions, and evidence as a connected graph"
                    }, void 0, false, {
                        fileName: "[project]/app/graph/page.js",
                        lineNumber: 282,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/graph/page.js",
                lineNumber: 280,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "graph-container",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("canvas", {
                        ref: canvasRef,
                        className: "graph-canvas",
                        onMouseDown: handleMouseDown,
                        onMouseMove: handleMouseMove,
                        onMouseUp: handleMouseUp,
                        onMouseLeave: ()=>{
                            dragRef.current = null;
                            setTooltip(null);
                        },
                        onWheel: handleWheel,
                        style: {
                            cursor: dragRef.current ? 'grabbing' : 'grab'
                        }
                    }, void 0, false, {
                        fileName: "[project]/app/graph/page.js",
                        lineNumber: 286,
                        columnNumber: 17
                    }, this),
                    tooltip && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "graph-tooltip",
                        style: {
                            left: tooltip.x,
                            top: tooltip.y
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    fontWeight: 600,
                                    marginBottom: 4,
                                    color: NODE_COLORS[tooltip.node.type]
                                },
                                children: tooltip.node.type.toUpperCase()
                            }, void 0, false, {
                                fileName: "[project]/app/graph/page.js",
                                lineNumber: 300,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    marginBottom: 4
                                },
                                children: tooltip.node.label
                            }, void 0, false, {
                                fileName: "[project]/app/graph/page.js",
                                lineNumber: 303,
                                columnNumber: 25
                            }, this),
                            tooltip.node.metadata && Object.entries(tooltip.node.metadata).map(([k, v])=>v ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        color: 'var(--text-muted)',
                                        fontSize: 11
                                    },
                                    children: [
                                        k,
                                        ": ",
                                        String(v)
                                    ]
                                }, k, true, {
                                    fileName: "[project]/app/graph/page.js",
                                    lineNumber: 305,
                                    columnNumber: 33
                                }, this) : null)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/graph/page.js",
                        lineNumber: 299,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "graph-legend",
                        children: Object.entries(NODE_COLORS).map(([type, color])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 4
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "graph-legend-dot",
                                        style: {
                                            background: color
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/app/graph/page.js",
                                        lineNumber: 314,
                                        columnNumber: 29
                                    }, this),
                                    type
                                ]
                            }, type, true, {
                                fileName: "[project]/app/graph/page.js",
                                lineNumber: 313,
                                columnNumber: 25
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/app/graph/page.js",
                        lineNumber: 311,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/graph/page.js",
                lineNumber: 285,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/graph/page.js",
        lineNumber: 279,
        columnNumber: 9
    }, this);
}
_s(GraphPage, "YkeeUQR2Pj6At2ZXtvJLu+fd09I=");
_c = GraphPage;
var _c;
__turbopack_context__.k.register(_c, "GraphPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=app_graph_page_96335994.js.map