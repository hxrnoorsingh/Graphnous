'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const DOMAIN_SUGGESTIONS = ['IT Governance', 'Security', 'Compliance', 'Engineering', 'Operations', 'Finance', 'HR'];
const TAG_SUGGESTIONS = ['budget', 'compliance', 'infrastructure', 'security', 'vendor-management', 'data-governance', 'engineering', 'operations', 'culture', 'standards'];
const REASON_PRESETS = [
    'Lower total cost of ownership',
    'Better compliance posture',
    'Reduced operational risk',
    'Improved performance or reliability',
    'Team capacity or skill alignment',
    'Regulatory or legal requirement',
    'Executive mandate',
    'Industry best practice',
];

export default function NewDecisionPage() {
    const router = useRouter();
    const [saving, setSaving] = useState(false);
    const [showAdvanced, setShowAdvanced] = useState(false);

    const [form, setForm] = useState({
        question: '',
        domain: '',
        context_tags: [],
        alternatives: [{ option: '', status: 'chosen', reason: '' }],
        rationale: [],
        customRationale: '',
        assumptions: [{ statement: '', valid_until: '', risk_if_false: '', status: 'valid' }],
        constraints: [],
        customConstraint: '',
        evidence: [{ type: 'Document', ref: '', reliability: 'medium', url: '' }],
        confidence: 0.5,
        owner: '',
        decided_on: new Date().toISOString().split('T')[0],
        review_triggers: [],
    });

    const [tagInput, setTagInput] = useState('');

    const addTag = (tag) => {
        if (!form.context_tags.includes(tag)) {
            setForm({ ...form, context_tags: [...form.context_tags, tag] });
        }
    };
    const removeTag = (tag) => {
        setForm({ ...form, context_tags: form.context_tags.filter(t => t !== tag) });
    };

    const addAlternative = () => {
        setForm({ ...form, alternatives: [...form.alternatives, { option: '', status: 'considered', reason: '' }] });
    };

    const updateAlternative = (i, field, value) => {
        const alts = [...form.alternatives];
        alts[i] = { ...alts[i], [field]: value };
        setForm({ ...form, alternatives: alts });
    };

    const removeAlternative = (i) => {
        setForm({ ...form, alternatives: form.alternatives.filter((_, idx) => idx !== i) });
    };

    const toggleRationale = (r) => {
        setForm({
            ...form,
            rationale: form.rationale.includes(r)
                ? form.rationale.filter(x => x !== r)
                : [...form.rationale, r]
        });
    };

    const addAssumption = () => {
        setForm({ ...form, assumptions: [...form.assumptions, { statement: '', valid_until: '', risk_if_false: '', status: 'valid' }] });
    };

    const updateAssumption = (i, field, value) => {
        const list = [...form.assumptions];
        list[i] = { ...list[i], [field]: value };
        setForm({ ...form, assumptions: list });
    };

    const removeAssumption = (i) => {
        setForm({ ...form, assumptions: form.assumptions.filter((_, idx) => idx !== i) });
    };

    const addEvidence = () => {
        setForm({ ...form, evidence: [...form.evidence, { type: 'Document', ref: '', reliability: 'medium', url: '' }] });
    };

    const updateEvidence = (i, field, value) => {
        const list = [...form.evidence];
        list[i] = { ...list[i], [field]: value };
        setForm({ ...form, evidence: list });
    };

    const removeEvidence = (i) => {
        setForm({ ...form, evidence: form.evidence.filter((_, idx) => idx !== i) });
    };

    const handleSave = async () => {
        if (!form.question.trim()) return;
        setSaving(true);

        const rationale = [...form.rationale];
        if (form.customRationale.trim()) rationale.push(form.customRationale.trim());

        const constraints = [...form.constraints];
        if (form.customConstraint?.trim()) constraints.push(form.customConstraint.trim());

        const body = {
            question: form.question,
            domain: form.domain,
            context_tags: form.context_tags,
            alternatives: form.alternatives.filter(a => a.option.trim()),
            rationale,
            constraints,
            assumptions: form.assumptions.filter(a => a.statement.trim()),
            evidence: form.evidence.filter(e => e.ref.trim()),
            confidence: form.confidence,
            owner: form.owner,
            decided_on: form.decided_on,
            review_triggers: form.review_triggers,
        };

        try {
            const res = await fetch('/api/decisions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });
            const data = await res.json();
            router.push(`/decisions/${data.id}`);
        } catch {
            alert('Failed to save decision');
            setSaving(false);
        }
    };

    const confidenceLabel = form.confidence < 0.3 ? 'Low' : form.confidence < 0.6 ? 'Moderate' : form.confidence < 0.8 ? 'Good' : 'High';

    return (
        <div className="animate-fade-in" style={{ maxWidth: 800, margin: '0 auto' }}>
            <div className="page-header">
                <h2>Capture Decision</h2>
                <p>Structured reflection — record what was decided and why</p>
            </div>

            {/* Section 1: Decision Question */}
            <div className="card" style={{ marginBottom: 'var(--space-lg)' }}>
                <div className="form-group">
                    <label className="form-label">What decision are we making?</label>
                    <input
                        className="form-input"
                        placeholder="e.g., Should we migrate from Vendor X to Vendor Y?"
                        value={form.question}
                        onChange={e => setForm({ ...form, question: e.target.value })}
                        style={{ fontSize: 16, padding: '14px var(--space-md)' }}
                    />
                </div>

                {/* Domain + Owner + Date */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 'var(--space-md)' }}>
                    <div className="form-group">
                        <label className="form-label">Domain</label>
                        <select className="form-select" value={form.domain} onChange={e => setForm({ ...form, domain: e.target.value })}>
                            <option value="">Select domain</option>
                            {DOMAIN_SUGGESTIONS.map(d => <option key={d} value={d}>{d}</option>)}
                        </select>
                    </div>
                    <div className="form-group">
                        <label className="form-label">Owner</label>
                        <input className="form-input" placeholder="Name, Role" value={form.owner} onChange={e => setForm({ ...form, owner: e.target.value })} />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Decided on</label>
                        <input className="form-input" type="date" value={form.decided_on} onChange={e => setForm({ ...form, decided_on: e.target.value })} />
                    </div>
                </div>
            </div>

            {/* Section 2: Context Tags */}
            <div className="card" style={{ marginBottom: 'var(--space-lg)' }}>
                <label className="form-label">Context tags</label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 'var(--space-sm)' }}>
                    {form.context_tags.map(t => (
                        <span key={t} className="tag" style={{ cursor: 'pointer' }} onClick={() => removeTag(t)}>
                            {t} ×
                        </span>
                    ))}
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {TAG_SUGGESTIONS.filter(t => !form.context_tags.includes(t)).map(t => (
                        <button key={t} className="domain-tab" onClick={() => addTag(t)}>{t}</button>
                    ))}
                </div>
                <div style={{ marginTop: 'var(--space-sm)', display: 'flex', gap: 'var(--space-sm)' }}>
                    <input
                        className="form-input"
                        style={{ flex: 1 }}
                        placeholder="Add custom tag…"
                        value={tagInput}
                        onChange={e => setTagInput(e.target.value)}
                        onKeyDown={e => {
                            if (e.key === 'Enter' && tagInput.trim()) {
                                addTag(tagInput.trim());
                                setTagInput('');
                            }
                        }}
                    />
                </div>
            </div>

            {/* Section 3: Alternatives */}
            <div className="card" style={{ marginBottom: 'var(--space-lg)' }}>
                <label className="form-label">Alternatives considered</label>
                <p className="form-hint" style={{ marginBottom: 'var(--space-md)' }}>What other options were on the table?</p>
                {form.alternatives.map((alt, i) => (
                    <div key={i} style={{ display: 'flex', gap: 'var(--space-sm)', marginBottom: 'var(--space-sm)', alignItems: 'center' }}>
                        <input className="form-input" style={{ flex: 2 }} placeholder="Option name" value={alt.option} onChange={e => updateAlternative(i, 'option', e.target.value)} />
                        <select className="form-select" style={{ flex: 1 }} value={alt.status} onChange={e => updateAlternative(i, 'status', e.target.value)}>
                            <option value="chosen">Chosen</option>
                            <option value="rejected">Rejected</option>
                            <option value="considered">Considered</option>
                        </select>
                        <input className="form-input" style={{ flex: 2 }} placeholder="Reason (if rejected)" value={alt.reason || ''} onChange={e => updateAlternative(i, 'reason', e.target.value)} />
                        {form.alternatives.length > 1 && (
                            <button className="btn btn-ghost btn-sm" onClick={() => removeAlternative(i)}>×</button>
                        )}
                    </div>
                ))}
                <button className="btn btn-secondary btn-sm" onClick={addAlternative}>+ Add alternative</button>
            </div>

            {/* Section 4: Rationale */}
            <div className="card" style={{ marginBottom: 'var(--space-lg)' }}>
                <label className="form-label">Why this option?</label>
                <p className="form-hint" style={{ marginBottom: 'var(--space-md)' }}>Select reasons or add your own</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 'var(--space-md)' }}>
                    {REASON_PRESETS.map(r => (
                        <button
                            key={r}
                            className={`domain-tab ${form.rationale.includes(r) ? 'active' : ''}`}
                            onClick={() => toggleRationale(r)}
                        >
                            {r}
                        </button>
                    ))}
                </div>
                <input className="form-input" placeholder="Add custom rationale…" value={form.customRationale} onChange={e => setForm({ ...form, customRationale: e.target.value })} />
            </div>

            {/* Section 5: Assumptions */}
            <div className="card" style={{ marginBottom: 'var(--space-lg)' }}>
                <label className="form-label">What must be true for this to work?</label>
                <p className="form-hint" style={{ marginBottom: 'var(--space-md)' }}>Each assumption can have a validity date and risk</p>
                {form.assumptions.map((a, i) => (
                    <div key={i} className="assumption-row valid" style={{ flexDirection: 'column', gap: 8 }}>
                        <input className="form-input" placeholder="Assumption statement" value={a.statement} onChange={e => updateAssumption(i, 'statement', e.target.value)} />
                        {showAdvanced && (
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-sm)' }}>
                                <div>
                                    <label className="form-label" style={{ fontSize: 11 }}>Valid until</label>
                                    <input className="form-input" type="date" value={a.valid_until} onChange={e => updateAssumption(i, 'valid_until', e.target.value)} />
                                </div>
                                <div>
                                    <label className="form-label" style={{ fontSize: 11 }}>Risk if false</label>
                                    <input className="form-input" placeholder="What happens?" value={a.risk_if_false} onChange={e => updateAssumption(i, 'risk_if_false', e.target.value)} />
                                </div>
                            </div>
                        )}
                        {form.assumptions.length > 1 && (
                            <button className="btn btn-ghost btn-sm" style={{ alignSelf: 'flex-end' }} onClick={() => removeAssumption(i)}>Remove</button>
                        )}
                    </div>
                ))}
                <div style={{ display: 'flex', gap: 'var(--space-sm)', marginTop: 'var(--space-sm)' }}>
                    <button className="btn btn-secondary btn-sm" onClick={addAssumption}>+ Add assumption</button>
                    <button className="btn btn-ghost btn-sm" onClick={() => setShowAdvanced(!showAdvanced)}>
                        {showAdvanced ? 'Hide' : 'Show'} advanced fields
                    </button>
                </div>
            </div>

            {/* Section 6: Evidence */}
            <div className="card" style={{ marginBottom: 'var(--space-lg)' }}>
                <label className="form-label">Supporting evidence</label>
                <p className="form-hint" style={{ marginBottom: 'var(--space-md)' }}>Attach BI reports, documents, tickets, or links</p>
                {form.evidence.map((e, i) => (
                    <div key={i} style={{ display: 'flex', gap: 'var(--space-sm)', marginBottom: 'var(--space-sm)', alignItems: 'center' }}>
                        <select className="form-select" style={{ width: 120, flexShrink: 0 }} value={e.type} onChange={ev => updateEvidence(i, 'type', ev.target.value)}>
                            <option value="BI">BI</option>
                            <option value="Document">Document</option>
                            <option value="Ticket">Ticket</option>
                            <option value="Link">Link</option>
                        </select>
                        <input className="form-input" style={{ flex: 1 }} placeholder="Reference name" value={e.ref} onChange={ev => updateEvidence(i, 'ref', ev.target.value)} />
                        <select className="form-select" style={{ width: 100, flexShrink: 0 }} value={e.reliability} onChange={ev => updateEvidence(i, 'reliability', ev.target.value)}>
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                        {form.evidence.length > 1 && (
                            <button className="btn btn-ghost btn-sm" onClick={() => removeEvidence(i)}>×</button>
                        )}
                    </div>
                ))}
                <button className="btn btn-secondary btn-sm" onClick={addEvidence}>+ Add evidence</button>
            </div>

            {/* Section 7: Confidence */}
            <div className="card" style={{ marginBottom: 'var(--space-lg)' }}>
                <label className="form-label">How confident are we right now?</label>
                <div style={{ padding: '0 var(--space-sm)' }}>
                    <input
                        className="confidence-slider"
                        type="range"
                        min="0"
                        max="1"
                        step="0.05"
                        value={form.confidence}
                        onChange={e => setForm({ ...form, confidence: parseFloat(e.target.value) })}
                    />
                    <div className="confidence-label">
                        <span>Low</span>
                        <span style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: 14 }}>
                            {(form.confidence * 100).toFixed(0)}% — {confidenceLabel}
                        </span>
                        <span>High</span>
                    </div>
                </div>
            </div>

            {/* Section 8: Review Triggers */}
            <div className="card" style={{ marginBottom: 'var(--space-lg)' }}>
                <label className="form-label">When should we revisit this decision?</label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {['assumption_expiry', 'quarterly_review', 'annual_review', 'cost_change', 'regulation_change', 'incident', 'leadership_change'].map(t => (
                        <button
                            key={t}
                            className={`domain-tab ${form.review_triggers.includes(t) ? 'active' : ''}`}
                            onClick={() =>
                                setForm({
                                    ...form,
                                    review_triggers: form.review_triggers.includes(t)
                                        ? form.review_triggers.filter(x => x !== t)
                                        : [...form.review_triggers, t]
                                })
                            }
                        >
                            {t.replace(/_/g, ' ')}
                        </button>
                    ))}
                </div>
            </div>

            {/* Save */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-md)', marginBottom: 'var(--space-2xl)' }}>
                <button className="btn btn-secondary" onClick={() => router.back()}>Cancel</button>
                <button className="btn btn-primary" onClick={handleSave} disabled={saving || !form.question.trim()}>
                    {saving ? 'Saving…' : 'Save Decision'}
                </button>
            </div>
        </div>
    );
}
