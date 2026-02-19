(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/decisions/new/page.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>NewDecisionPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
const DOMAIN_SUGGESTIONS = [
    'IT Governance',
    'Security',
    'Compliance',
    'Engineering',
    'Operations',
    'Finance',
    'HR'
];
const TAG_SUGGESTIONS = [
    'budget',
    'compliance',
    'infrastructure',
    'security',
    'vendor-management',
    'data-governance',
    'engineering',
    'operations',
    'culture',
    'standards'
];
const REASON_PRESETS = [
    'Lower total cost of ownership',
    'Better compliance posture',
    'Reduced operational risk',
    'Improved performance or reliability',
    'Team capacity or skill alignment',
    'Regulatory or legal requirement',
    'Executive mandate',
    'Industry best practice'
];
function NewDecisionPage() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [saving, setSaving] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showAdvanced, setShowAdvanced] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [form, setForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        question: '',
        domain: '',
        context_tags: [],
        alternatives: [
            {
                option: '',
                status: 'chosen',
                reason: ''
            }
        ],
        rationale: [],
        customRationale: '',
        assumptions: [
            {
                statement: '',
                valid_until: '',
                risk_if_false: '',
                status: 'valid'
            }
        ],
        constraints: [],
        customConstraint: '',
        evidence: [
            {
                type: 'Document',
                ref: '',
                reliability: 'medium',
                url: ''
            }
        ],
        confidence: 0.5,
        owner: '',
        decided_on: new Date().toISOString().split('T')[0],
        review_triggers: []
    });
    const [tagInput, setTagInput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const addTag = (tag)=>{
        if (!form.context_tags.includes(tag)) {
            setForm({
                ...form,
                context_tags: [
                    ...form.context_tags,
                    tag
                ]
            });
        }
    };
    const removeTag = (tag)=>{
        setForm({
            ...form,
            context_tags: form.context_tags.filter((t)=>t !== tag)
        });
    };
    const addAlternative = ()=>{
        setForm({
            ...form,
            alternatives: [
                ...form.alternatives,
                {
                    option: '',
                    status: 'considered',
                    reason: ''
                }
            ]
        });
    };
    const updateAlternative = (i, field, value)=>{
        const alts = [
            ...form.alternatives
        ];
        alts[i] = {
            ...alts[i],
            [field]: value
        };
        setForm({
            ...form,
            alternatives: alts
        });
    };
    const removeAlternative = (i)=>{
        setForm({
            ...form,
            alternatives: form.alternatives.filter((_, idx)=>idx !== i)
        });
    };
    const toggleRationale = (r)=>{
        setForm({
            ...form,
            rationale: form.rationale.includes(r) ? form.rationale.filter((x)=>x !== r) : [
                ...form.rationale,
                r
            ]
        });
    };
    const addAssumption = ()=>{
        setForm({
            ...form,
            assumptions: [
                ...form.assumptions,
                {
                    statement: '',
                    valid_until: '',
                    risk_if_false: '',
                    status: 'valid'
                }
            ]
        });
    };
    const updateAssumption = (i, field, value)=>{
        const list = [
            ...form.assumptions
        ];
        list[i] = {
            ...list[i],
            [field]: value
        };
        setForm({
            ...form,
            assumptions: list
        });
    };
    const removeAssumption = (i)=>{
        setForm({
            ...form,
            assumptions: form.assumptions.filter((_, idx)=>idx !== i)
        });
    };
    const addEvidence = ()=>{
        setForm({
            ...form,
            evidence: [
                ...form.evidence,
                {
                    type: 'Document',
                    ref: '',
                    reliability: 'medium',
                    url: ''
                }
            ]
        });
    };
    const updateEvidence = (i, field, value)=>{
        const list = [
            ...form.evidence
        ];
        list[i] = {
            ...list[i],
            [field]: value
        };
        setForm({
            ...form,
            evidence: list
        });
    };
    const removeEvidence = (i)=>{
        setForm({
            ...form,
            evidence: form.evidence.filter((_, idx)=>idx !== i)
        });
    };
    const handleSave = async ()=>{
        if (!form.question.trim()) return;
        setSaving(true);
        const rationale = [
            ...form.rationale
        ];
        if (form.customRationale.trim()) rationale.push(form.customRationale.trim());
        const constraints = [
            ...form.constraints
        ];
        if (form.customConstraint?.trim()) constraints.push(form.customConstraint.trim());
        const body = {
            question: form.question,
            domain: form.domain,
            context_tags: form.context_tags,
            alternatives: form.alternatives.filter((a)=>a.option.trim()),
            rationale,
            constraints,
            assumptions: form.assumptions.filter((a)=>a.statement.trim()),
            evidence: form.evidence.filter((e)=>e.ref.trim()),
            confidence: form.confidence,
            owner: form.owner,
            decided_on: form.decided_on,
            review_triggers: form.review_triggers
        };
        try {
            const res = await fetch('/api/decisions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });
            const data = await res.json();
            router.push(`/decisions/${data.id}`);
        } catch  {
            alert('Failed to save decision');
            setSaving(false);
        }
    };
    const confidenceLabel = form.confidence < 0.3 ? 'Low' : form.confidence < 0.6 ? 'Moderate' : form.confidence < 0.8 ? 'Good' : 'High';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "animate-fade-in",
        style: {
            maxWidth: 800,
            margin: '0 auto'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "page-header",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        children: "Capture Decision"
                    }, void 0, false, {
                        fileName: "[project]/app/decisions/new/page.js",
                        lineNumber: 147,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: "Structured reflection — record what was decided and why"
                    }, void 0, false, {
                        fileName: "[project]/app/decisions/new/page.js",
                        lineNumber: 148,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/decisions/new/page.js",
                lineNumber: 146,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "card",
                style: {
                    marginBottom: 'var(--space-lg)'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "form-group",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "form-label",
                                children: "What decision are we making?"
                            }, void 0, false, {
                                fileName: "[project]/app/decisions/new/page.js",
                                lineNumber: 154,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                className: "form-input",
                                placeholder: "e.g., Should we migrate from Vendor X to Vendor Y?",
                                value: form.question,
                                onChange: (e)=>setForm({
                                        ...form,
                                        question: e.target.value
                                    }),
                                style: {
                                    fontSize: 16,
                                    padding: '14px var(--space-md)'
                                }
                            }, void 0, false, {
                                fileName: "[project]/app/decisions/new/page.js",
                                lineNumber: 155,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/decisions/new/page.js",
                        lineNumber: 153,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr 1fr',
                            gap: 'var(--space-md)'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "form-group",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "form-label",
                                        children: "Domain"
                                    }, void 0, false, {
                                        fileName: "[project]/app/decisions/new/page.js",
                                        lineNumber: 167,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        className: "form-select",
                                        value: form.domain,
                                        onChange: (e)=>setForm({
                                                ...form,
                                                domain: e.target.value
                                            }),
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "",
                                                children: "Select domain"
                                            }, void 0, false, {
                                                fileName: "[project]/app/decisions/new/page.js",
                                                lineNumber: 169,
                                                columnNumber: 29
                                            }, this),
                                            DOMAIN_SUGGESTIONS.map((d)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: d,
                                                    children: d
                                                }, d, false, {
                                                    fileName: "[project]/app/decisions/new/page.js",
                                                    lineNumber: 170,
                                                    columnNumber: 58
                                                }, this))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/decisions/new/page.js",
                                        lineNumber: 168,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/decisions/new/page.js",
                                lineNumber: 166,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "form-group",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "form-label",
                                        children: "Owner"
                                    }, void 0, false, {
                                        fileName: "[project]/app/decisions/new/page.js",
                                        lineNumber: 174,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        className: "form-input",
                                        placeholder: "Name, Role",
                                        value: form.owner,
                                        onChange: (e)=>setForm({
                                                ...form,
                                                owner: e.target.value
                                            })
                                    }, void 0, false, {
                                        fileName: "[project]/app/decisions/new/page.js",
                                        lineNumber: 175,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/decisions/new/page.js",
                                lineNumber: 173,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "form-group",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "form-label",
                                        children: "Decided on"
                                    }, void 0, false, {
                                        fileName: "[project]/app/decisions/new/page.js",
                                        lineNumber: 178,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        className: "form-input",
                                        type: "date",
                                        value: form.decided_on,
                                        onChange: (e)=>setForm({
                                                ...form,
                                                decided_on: e.target.value
                                            })
                                    }, void 0, false, {
                                        fileName: "[project]/app/decisions/new/page.js",
                                        lineNumber: 179,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/decisions/new/page.js",
                                lineNumber: 177,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/decisions/new/page.js",
                        lineNumber: 165,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/decisions/new/page.js",
                lineNumber: 152,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "card",
                style: {
                    marginBottom: 'var(--space-lg)'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "form-label",
                        children: "Context tags"
                    }, void 0, false, {
                        fileName: "[project]/app/decisions/new/page.js",
                        lineNumber: 186,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: 6,
                            marginBottom: 'var(--space-sm)'
                        },
                        children: form.context_tags.map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "tag",
                                style: {
                                    cursor: 'pointer'
                                },
                                onClick: ()=>removeTag(t),
                                children: [
                                    t,
                                    " ×"
                                ]
                            }, t, true, {
                                fileName: "[project]/app/decisions/new/page.js",
                                lineNumber: 189,
                                columnNumber: 25
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/app/decisions/new/page.js",
                        lineNumber: 187,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: 6
                        },
                        children: TAG_SUGGESTIONS.filter((t)=>!form.context_tags.includes(t)).map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "domain-tab",
                                onClick: ()=>addTag(t),
                                children: t
                            }, t, false, {
                                fileName: "[project]/app/decisions/new/page.js",
                                lineNumber: 196,
                                columnNumber: 25
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/app/decisions/new/page.js",
                        lineNumber: 194,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            marginTop: 'var(--space-sm)',
                            display: 'flex',
                            gap: 'var(--space-sm)'
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            className: "form-input",
                            style: {
                                flex: 1
                            },
                            placeholder: "Add custom tag…",
                            value: tagInput,
                            onChange: (e)=>setTagInput(e.target.value),
                            onKeyDown: (e)=>{
                                if (e.key === 'Enter' && tagInput.trim()) {
                                    addTag(tagInput.trim());
                                    setTagInput('');
                                }
                            }
                        }, void 0, false, {
                            fileName: "[project]/app/decisions/new/page.js",
                            lineNumber: 200,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/decisions/new/page.js",
                        lineNumber: 199,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/decisions/new/page.js",
                lineNumber: 185,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "card",
                style: {
                    marginBottom: 'var(--space-lg)'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "form-label",
                        children: "Alternatives considered"
                    }, void 0, false, {
                        fileName: "[project]/app/decisions/new/page.js",
                        lineNumber: 218,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "form-hint",
                        style: {
                            marginBottom: 'var(--space-md)'
                        },
                        children: "What other options were on the table?"
                    }, void 0, false, {
                        fileName: "[project]/app/decisions/new/page.js",
                        lineNumber: 219,
                        columnNumber: 17
                    }, this),
                    form.alternatives.map((alt, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: 'flex',
                                gap: 'var(--space-sm)',
                                marginBottom: 'var(--space-sm)',
                                alignItems: 'center'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    className: "form-input",
                                    style: {
                                        flex: 2
                                    },
                                    placeholder: "Option name",
                                    value: alt.option,
                                    onChange: (e)=>updateAlternative(i, 'option', e.target.value)
                                }, void 0, false, {
                                    fileName: "[project]/app/decisions/new/page.js",
                                    lineNumber: 222,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                    className: "form-select",
                                    style: {
                                        flex: 1
                                    },
                                    value: alt.status,
                                    onChange: (e)=>updateAlternative(i, 'status', e.target.value),
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            value: "chosen",
                                            children: "Chosen"
                                        }, void 0, false, {
                                            fileName: "[project]/app/decisions/new/page.js",
                                            lineNumber: 224,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            value: "rejected",
                                            children: "Rejected"
                                        }, void 0, false, {
                                            fileName: "[project]/app/decisions/new/page.js",
                                            lineNumber: 225,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            value: "considered",
                                            children: "Considered"
                                        }, void 0, false, {
                                            fileName: "[project]/app/decisions/new/page.js",
                                            lineNumber: 226,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/decisions/new/page.js",
                                    lineNumber: 223,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    className: "form-input",
                                    style: {
                                        flex: 2
                                    },
                                    placeholder: "Reason (if rejected)",
                                    value: alt.reason || '',
                                    onChange: (e)=>updateAlternative(i, 'reason', e.target.value)
                                }, void 0, false, {
                                    fileName: "[project]/app/decisions/new/page.js",
                                    lineNumber: 228,
                                    columnNumber: 25
                                }, this),
                                form.alternatives.length > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: "btn btn-ghost btn-sm",
                                    onClick: ()=>removeAlternative(i),
                                    children: "×"
                                }, void 0, false, {
                                    fileName: "[project]/app/decisions/new/page.js",
                                    lineNumber: 230,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, i, true, {
                            fileName: "[project]/app/decisions/new/page.js",
                            lineNumber: 221,
                            columnNumber: 21
                        }, this)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "btn btn-secondary btn-sm",
                        onClick: addAlternative,
                        children: "+ Add alternative"
                    }, void 0, false, {
                        fileName: "[project]/app/decisions/new/page.js",
                        lineNumber: 234,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/decisions/new/page.js",
                lineNumber: 217,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "card",
                style: {
                    marginBottom: 'var(--space-lg)'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "form-label",
                        children: "Why this option?"
                    }, void 0, false, {
                        fileName: "[project]/app/decisions/new/page.js",
                        lineNumber: 239,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "form-hint",
                        style: {
                            marginBottom: 'var(--space-md)'
                        },
                        children: "Select reasons or add your own"
                    }, void 0, false, {
                        fileName: "[project]/app/decisions/new/page.js",
                        lineNumber: 240,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: 6,
                            marginBottom: 'var(--space-md)'
                        },
                        children: REASON_PRESETS.map((r)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: `domain-tab ${form.rationale.includes(r) ? 'active' : ''}`,
                                onClick: ()=>toggleRationale(r),
                                children: r
                            }, r, false, {
                                fileName: "[project]/app/decisions/new/page.js",
                                lineNumber: 243,
                                columnNumber: 25
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/app/decisions/new/page.js",
                        lineNumber: 241,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        className: "form-input",
                        placeholder: "Add custom rationale…",
                        value: form.customRationale,
                        onChange: (e)=>setForm({
                                ...form,
                                customRationale: e.target.value
                            })
                    }, void 0, false, {
                        fileName: "[project]/app/decisions/new/page.js",
                        lineNumber: 252,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/decisions/new/page.js",
                lineNumber: 238,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "card",
                style: {
                    marginBottom: 'var(--space-lg)'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "form-label",
                        children: "What must be true for this to work?"
                    }, void 0, false, {
                        fileName: "[project]/app/decisions/new/page.js",
                        lineNumber: 257,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "form-hint",
                        style: {
                            marginBottom: 'var(--space-md)'
                        },
                        children: "Each assumption can have a validity date and risk"
                    }, void 0, false, {
                        fileName: "[project]/app/decisions/new/page.js",
                        lineNumber: 258,
                        columnNumber: 17
                    }, this),
                    form.assumptions.map((a, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "assumption-row valid",
                            style: {
                                flexDirection: 'column',
                                gap: 8
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    className: "form-input",
                                    placeholder: "Assumption statement",
                                    value: a.statement,
                                    onChange: (e)=>updateAssumption(i, 'statement', e.target.value)
                                }, void 0, false, {
                                    fileName: "[project]/app/decisions/new/page.js",
                                    lineNumber: 261,
                                    columnNumber: 25
                                }, this),
                                showAdvanced && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: 'grid',
                                        gridTemplateColumns: '1fr 1fr',
                                        gap: 'var(--space-sm)'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "form-label",
                                                    style: {
                                                        fontSize: 11
                                                    },
                                                    children: "Valid until"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/decisions/new/page.js",
                                                    lineNumber: 265,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    className: "form-input",
                                                    type: "date",
                                                    value: a.valid_until,
                                                    onChange: (e)=>updateAssumption(i, 'valid_until', e.target.value)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/decisions/new/page.js",
                                                    lineNumber: 266,
                                                    columnNumber: 37
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/decisions/new/page.js",
                                            lineNumber: 264,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "form-label",
                                                    style: {
                                                        fontSize: 11
                                                    },
                                                    children: "Risk if false"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/decisions/new/page.js",
                                                    lineNumber: 269,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    className: "form-input",
                                                    placeholder: "What happens?",
                                                    value: a.risk_if_false,
                                                    onChange: (e)=>updateAssumption(i, 'risk_if_false', e.target.value)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/decisions/new/page.js",
                                                    lineNumber: 270,
                                                    columnNumber: 37
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/decisions/new/page.js",
                                            lineNumber: 268,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/decisions/new/page.js",
                                    lineNumber: 263,
                                    columnNumber: 29
                                }, this),
                                form.assumptions.length > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: "btn btn-ghost btn-sm",
                                    style: {
                                        alignSelf: 'flex-end'
                                    },
                                    onClick: ()=>removeAssumption(i),
                                    children: "Remove"
                                }, void 0, false, {
                                    fileName: "[project]/app/decisions/new/page.js",
                                    lineNumber: 275,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, i, true, {
                            fileName: "[project]/app/decisions/new/page.js",
                            lineNumber: 260,
                            columnNumber: 21
                        }, this)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'flex',
                            gap: 'var(--space-sm)',
                            marginTop: 'var(--space-sm)'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "btn btn-secondary btn-sm",
                                onClick: addAssumption,
                                children: "+ Add assumption"
                            }, void 0, false, {
                                fileName: "[project]/app/decisions/new/page.js",
                                lineNumber: 280,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "btn btn-ghost btn-sm",
                                onClick: ()=>setShowAdvanced(!showAdvanced),
                                children: [
                                    showAdvanced ? 'Hide' : 'Show',
                                    " advanced fields"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/decisions/new/page.js",
                                lineNumber: 281,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/decisions/new/page.js",
                        lineNumber: 279,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/decisions/new/page.js",
                lineNumber: 256,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "card",
                style: {
                    marginBottom: 'var(--space-lg)'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "form-label",
                        children: "Supporting evidence"
                    }, void 0, false, {
                        fileName: "[project]/app/decisions/new/page.js",
                        lineNumber: 289,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "form-hint",
                        style: {
                            marginBottom: 'var(--space-md)'
                        },
                        children: "Attach BI reports, documents, tickets, or links"
                    }, void 0, false, {
                        fileName: "[project]/app/decisions/new/page.js",
                        lineNumber: 290,
                        columnNumber: 17
                    }, this),
                    form.evidence.map((e, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: 'flex',
                                gap: 'var(--space-sm)',
                                marginBottom: 'var(--space-sm)',
                                alignItems: 'center'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                    className: "form-select",
                                    style: {
                                        width: 120,
                                        flexShrink: 0
                                    },
                                    value: e.type,
                                    onChange: (ev)=>updateEvidence(i, 'type', ev.target.value),
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            value: "BI",
                                            children: "BI"
                                        }, void 0, false, {
                                            fileName: "[project]/app/decisions/new/page.js",
                                            lineNumber: 294,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            value: "Document",
                                            children: "Document"
                                        }, void 0, false, {
                                            fileName: "[project]/app/decisions/new/page.js",
                                            lineNumber: 295,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            value: "Ticket",
                                            children: "Ticket"
                                        }, void 0, false, {
                                            fileName: "[project]/app/decisions/new/page.js",
                                            lineNumber: 296,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            value: "Link",
                                            children: "Link"
                                        }, void 0, false, {
                                            fileName: "[project]/app/decisions/new/page.js",
                                            lineNumber: 297,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/decisions/new/page.js",
                                    lineNumber: 293,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    className: "form-input",
                                    style: {
                                        flex: 1
                                    },
                                    placeholder: "Reference name",
                                    value: e.ref,
                                    onChange: (ev)=>updateEvidence(i, 'ref', ev.target.value)
                                }, void 0, false, {
                                    fileName: "[project]/app/decisions/new/page.js",
                                    lineNumber: 299,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                    className: "form-select",
                                    style: {
                                        width: 100,
                                        flexShrink: 0
                                    },
                                    value: e.reliability,
                                    onChange: (ev)=>updateEvidence(i, 'reliability', ev.target.value),
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            value: "low",
                                            children: "Low"
                                        }, void 0, false, {
                                            fileName: "[project]/app/decisions/new/page.js",
                                            lineNumber: 301,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            value: "medium",
                                            children: "Medium"
                                        }, void 0, false, {
                                            fileName: "[project]/app/decisions/new/page.js",
                                            lineNumber: 302,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            value: "high",
                                            children: "High"
                                        }, void 0, false, {
                                            fileName: "[project]/app/decisions/new/page.js",
                                            lineNumber: 303,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/decisions/new/page.js",
                                    lineNumber: 300,
                                    columnNumber: 25
                                }, this),
                                form.evidence.length > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: "btn btn-ghost btn-sm",
                                    onClick: ()=>removeEvidence(i),
                                    children: "×"
                                }, void 0, false, {
                                    fileName: "[project]/app/decisions/new/page.js",
                                    lineNumber: 306,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, i, true, {
                            fileName: "[project]/app/decisions/new/page.js",
                            lineNumber: 292,
                            columnNumber: 21
                        }, this)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "btn btn-secondary btn-sm",
                        onClick: addEvidence,
                        children: "+ Add evidence"
                    }, void 0, false, {
                        fileName: "[project]/app/decisions/new/page.js",
                        lineNumber: 310,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/decisions/new/page.js",
                lineNumber: 288,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "card",
                style: {
                    marginBottom: 'var(--space-lg)'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "form-label",
                        children: "How confident are we right now?"
                    }, void 0, false, {
                        fileName: "[project]/app/decisions/new/page.js",
                        lineNumber: 315,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            padding: '0 var(--space-sm)'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                className: "confidence-slider",
                                type: "range",
                                min: "0",
                                max: "1",
                                step: "0.05",
                                value: form.confidence,
                                onChange: (e)=>setForm({
                                        ...form,
                                        confidence: parseFloat(e.target.value)
                                    })
                            }, void 0, false, {
                                fileName: "[project]/app/decisions/new/page.js",
                                lineNumber: 317,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "confidence-label",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Low"
                                    }, void 0, false, {
                                        fileName: "[project]/app/decisions/new/page.js",
                                        lineNumber: 327,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            fontWeight: 600,
                                            color: 'var(--text-primary)',
                                            fontSize: 14
                                        },
                                        children: [
                                            (form.confidence * 100).toFixed(0),
                                            "% — ",
                                            confidenceLabel
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/decisions/new/page.js",
                                        lineNumber: 328,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "High"
                                    }, void 0, false, {
                                        fileName: "[project]/app/decisions/new/page.js",
                                        lineNumber: 331,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/decisions/new/page.js",
                                lineNumber: 326,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/decisions/new/page.js",
                        lineNumber: 316,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/decisions/new/page.js",
                lineNumber: 314,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "card",
                style: {
                    marginBottom: 'var(--space-lg)'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "form-label",
                        children: "When should we revisit this decision?"
                    }, void 0, false, {
                        fileName: "[project]/app/decisions/new/page.js",
                        lineNumber: 338,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: 6
                        },
                        children: [
                            'assumption_expiry',
                            'quarterly_review',
                            'annual_review',
                            'cost_change',
                            'regulation_change',
                            'incident',
                            'leadership_change'
                        ].map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: `domain-tab ${form.review_triggers.includes(t) ? 'active' : ''}`,
                                onClick: ()=>setForm({
                                        ...form,
                                        review_triggers: form.review_triggers.includes(t) ? form.review_triggers.filter((x)=>x !== t) : [
                                            ...form.review_triggers,
                                            t
                                        ]
                                    }),
                                children: t.replace(/_/g, ' ')
                            }, t, false, {
                                fileName: "[project]/app/decisions/new/page.js",
                                lineNumber: 341,
                                columnNumber: 25
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/app/decisions/new/page.js",
                        lineNumber: 339,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/decisions/new/page.js",
                lineNumber: 337,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: 'flex',
                    justifyContent: 'flex-end',
                    gap: 'var(--space-md)',
                    marginBottom: 'var(--space-2xl)'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "btn btn-secondary",
                        onClick: ()=>router.back(),
                        children: "Cancel"
                    }, void 0, false, {
                        fileName: "[project]/app/decisions/new/page.js",
                        lineNumber: 361,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "btn btn-primary",
                        onClick: handleSave,
                        disabled: saving || !form.question.trim(),
                        children: saving ? 'Saving…' : 'Save Decision'
                    }, void 0, false, {
                        fileName: "[project]/app/decisions/new/page.js",
                        lineNumber: 362,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/decisions/new/page.js",
                lineNumber: 360,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/decisions/new/page.js",
        lineNumber: 145,
        columnNumber: 9
    }, this);
}
_s(NewDecisionPage, "0oJFiC8S154gIpwS1z8maFYCJhE=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = NewDecisionPage;
var _c;
__turbopack_context__.k.register(_c, "NewDecisionPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=app_decisions_new_page_c9dc68cd.js.map