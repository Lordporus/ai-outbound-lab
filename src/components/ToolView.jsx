import { Send, Sparkles, Loader2 } from 'lucide-react';
import { useState } from 'react';

export default function ToolView({ activeTab, onGenerate, isGenerating }) {
    const [inputText, setInputText] = useState('');
    const [tone, setTone] = useState('Professional');

    // Cold Email structured fields
    const [targetAudience, setTargetAudience] = useState('');
    const [offer, setOffer] = useState('');
    const [painPoint, setPainPoint] = useState('');
    const [proof, setProof] = useState('');
    const [ctaGoal, setCtaGoal] = useState('');

    const getToolInfo = () => {
        switch (activeTab) {
            case 'rewrite-dm':
                return { title: 'Rewrite DM', desc: 'Refine your direct messages for better engagement.' };
            case 'cold-email':
                return { title: 'Cold Email Generator', desc: 'Create high-converting cold outreach emails.' };
            case 'objection-handler':
                return { title: 'Objection Handler', desc: 'Overcome sales objections with persuasive responses.' };
            default:
                return { title: 'Tool', desc: 'Select a tool from the sidebar.' };
        }
    };

    const { title, desc } = getToolInfo();

    const handleGenerate = () => {
        let textToSend = '';

        if (activeTab === 'cold-email') {
            // Validate all fields are filled
            if (!targetAudience.trim() || !offer.trim() || !painPoint.trim() || !proof.trim() || !ctaGoal.trim()) {
                return;
            }
            // Format structured data
            textToSend = `Target: ${targetAudience}
Offer: ${offer}
Pain: ${painPoint}
Proof: ${proof}
Goal: ${ctaGoal}`;
        } else {
            // For other tools, use the regular textarea
            if (!inputText.trim()) return;
            textToSend = inputText;
        }

        onGenerate(textToSend, tone);
    };

    return (
        <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto', width: '100%' }}>
            <header style={{ marginBottom: '32px' }}>
                <h1 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '8px' }}>{title}</h1>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>{desc}</p>
            </header>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {activeTab === 'cold-email' ? (
                    // Structured fields for Cold Email Generator
                    <>
                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: 'var(--text-secondary)' }}>
                                Target Audience
                            </label>
                            <input
                                type="text"
                                value={targetAudience}
                                onChange={(e) => setTargetAudience(e.target.value)}
                                placeholder="e.g., SaaS founders, Marketing directors at B2B companies"
                                style={{
                                    width: '100%',
                                    backgroundColor: 'var(--bg-input)',
                                    border: '1px solid var(--border-color)',
                                    borderRadius: 'var(--radius)',
                                    color: 'var(--text-primary)',
                                    padding: '12px 16px',
                                    outline: 'none',
                                    transition: 'border-color 0.2s'
                                }}
                                onFocus={(e) => e.target.style.borderColor = '#6366f1'}
                                onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
                            />
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: 'var(--text-secondary)' }}>
                                Offer / What you do
                            </label>
                            <input
                                type="text"
                                value={offer}
                                onChange={(e) => setOffer(e.target.value)}
                                placeholder="e.g., AI-powered email automation that books meetings"
                                style={{
                                    width: '100%',
                                    backgroundColor: 'var(--bg-input)',
                                    border: '1px solid var(--border-color)',
                                    borderRadius: 'var(--radius)',
                                    color: 'var(--text-primary)',
                                    padding: '12px 16px',
                                    outline: 'none',
                                    transition: 'border-color 0.2s'
                                }}
                                onFocus={(e) => e.target.style.borderColor = '#6366f1'}
                                onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
                            />
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: 'var(--text-secondary)' }}>
                                Pain Point
                            </label>
                            <input
                                type="text"
                                value={painPoint}
                                onChange={(e) => setPainPoint(e.target.value)}
                                placeholder="e.g., Spending 10+ hours/week on manual outreach"
                                style={{
                                    width: '100%',
                                    backgroundColor: 'var(--bg-input)',
                                    border: '1px solid var(--border-color)',
                                    borderRadius: 'var(--radius)',
                                    color: 'var(--text-primary)',
                                    padding: '12px 16px',
                                    outline: 'none',
                                    transition: 'border-color 0.2s'
                                }}
                                onFocus={(e) => e.target.style.borderColor = '#6366f1'}
                                onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
                            />
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: 'var(--text-secondary)' }}>
                                Proof / Metric
                            </label>
                            <input
                                type="text"
                                value={proof}
                                onChange={(e) => setProof(e.target.value)}
                                placeholder="e.g., Helped 50+ companies book 200+ meetings in 90 days"
                                style={{
                                    width: '100%',
                                    backgroundColor: 'var(--bg-input)',
                                    border: '1px solid var(--border-color)',
                                    borderRadius: 'var(--radius)',
                                    color: 'var(--text-primary)',
                                    padding: '12px 16px',
                                    outline: 'none',
                                    transition: 'border-color 0.2s'
                                }}
                                onFocus={(e) => e.target.style.borderColor = '#6366f1'}
                                onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
                            />
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: 'var(--text-secondary)' }}>
                                CTA Goal
                            </label>
                            <input
                                type="text"
                                value={ctaGoal}
                                onChange={(e) => setCtaGoal(e.target.value)}
                                placeholder="e.g., Book a 15-min demo call"
                                style={{
                                    width: '100%',
                                    backgroundColor: 'var(--bg-input)',
                                    border: '1px solid var(--border-color)',
                                    borderRadius: 'var(--radius)',
                                    color: 'var(--text-primary)',
                                    padding: '12px 16px',
                                    outline: 'none',
                                    transition: 'border-color 0.2s'
                                }}
                                onFocus={(e) => e.target.style.borderColor = '#6366f1'}
                                onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
                            />
                        </div>
                    </>
                ) : (
                    // Single textarea for other tools
                    <div>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: 'var(--text-secondary)' }}>
                            Input Context
                        </label>
                        <textarea
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            placeholder="Paste your message, prospect details, or objection here..."
                            style={{
                                width: '100%',
                                minHeight: '200px',
                                backgroundColor: 'var(--bg-input)',
                                border: '1px solid var(--border-color)',
                                borderRadius: 'var(--radius)',
                                color: 'var(--text-primary)',
                                padding: '16px',
                                resize: 'vertical',
                                outline: 'none',
                                transition: 'border-color 0.2s'
                            }}
                            onFocus={(e) => e.target.style.borderColor = '#6366f1'}
                            onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
                        />
                    </div>
                )}

                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                    <div style={{ flex: 1 }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: 'var(--text-secondary)' }}>
                            Tone
                        </label>
                        <select
                            value={tone}
                            onChange={(e) => setTone(e.target.value)}
                            style={{
                                width: '100%',
                                backgroundColor: 'var(--bg-input)',
                                border: '1px solid var(--border-color)',
                                borderRadius: 'var(--radius)',
                                color: 'var(--text-primary)',
                                padding: '12px',
                                outline: 'none',
                                cursor: 'pointer'
                            }}
                        >
                            <option>Friendly</option>
                            <option>Direct</option>
                            <option>Professional</option>
                            <option>Persuasive</option>
                            <option>Witty</option>
                        </select>
                    </div>

                    <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end' }}>
                        {/* Spacer */}
                    </div>
                </div>

                <button
                    onClick={handleGenerate}
                    disabled={(() => {
                        if (isGenerating) return true;
                        if (activeTab === 'cold-email') {
                            return !targetAudience.trim() || !offer.trim() || !painPoint.trim() || !proof.trim() || !ctaGoal.trim();
                        }
                        return !inputText.trim();
                    })()}
                    className={`generate-btn ${isGenerating ? 'loading' : ''}`}
                    style={{
                        background: isGenerating ? 'var(--bg-input)' : 'var(--primary-gradient)',
                        color: '#fff',
                        padding: '14px 24px',
                        borderRadius: 'var(--radius)',
                        fontWeight: '600',
                        fontSize: '1.05rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '10px',
                        marginTop: '16px',
                        opacity: (() => {
                            if (isGenerating) return 1;
                            if (activeTab === 'cold-email') {
                                return (!targetAudience.trim() || !offer.trim() || !painPoint.trim() || !proof.trim() || !ctaGoal.trim()) ? 0.6 : 1;
                            }
                            return !inputText.trim() ? 0.6 : 1;
                        })(),
                        cursor: (() => {
                            if (isGenerating) return 'not-allowed';
                            if (activeTab === 'cold-email') {
                                return (!targetAudience.trim() || !offer.trim() || !painPoint.trim() || !proof.trim() || !ctaGoal.trim()) ? 'not-allowed' : 'pointer';
                            }
                            return !inputText.trim() ? 'not-allowed' : 'pointer';
                        })(),
                        transition: 'opacity 0.2s, transform 0.1s',
                        position: 'relative',
                        overflow: 'hidden'
                    }}
                    onMouseDown={(e) => !isGenerating && (e.currentTarget.style.transform = 'scale(0.98)')}
                    onMouseUp={(e) => !isGenerating && (e.currentTarget.style.transform = 'scale(1)')}
                >
                    {isGenerating ? (
                        <>
                            <Loader2 className="spinner" size={20} style={{ animation: 'spin 1s linear infinite' }} />
                            Generating...
                        </>
                    ) : (
                        <>
                            <Sparkles size={20} />
                            Generate
                        </>
                    )}
                </button>
            </div>


        </div>
    );
}
