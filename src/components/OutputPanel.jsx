import { Copy, XCircle, CheckCircle, Zap } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function OutputPanel({ output, onClear, onGenerate, tone, isGenerating }) {
    const [copied, setCopied] = useState(false);

    const [showAnimation, setShowAnimation] = useState(false);

    useEffect(() => {
        if (output) {
            setShowAnimation(true);
            const timer = setTimeout(() => setShowAnimation(false), 500);
            return () => clearTimeout(timer);
        }
    }, [output]);

    const handleCopy = () => {
        if (!output) return;
        navigator.clipboard.writeText(output);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleRefine = (refinementType) => {
        if (!output || !onGenerate) return;
        const refinementText = `Refine the following message to be ${refinementType.toUpperCase()}:\n\n${output}`;
        onGenerate(refinementText, tone);
    };

    return (
        <div style={{
            backgroundColor: 'var(--bg-card)',
            borderRadius: 'var(--radius)',
            border: '1px solid var(--border-color)',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            minHeight: '400px',
            position: 'relative'
        }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '16px',
                borderBottom: '1px solid var(--border-color)',
                paddingBottom: '12px'
            }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '600', color: 'var(--text-primary)' }}>
                    Generated Output
                </h3>
                <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                        onClick={onClear}
                        disabled={!output}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            padding: '6px 12px',
                            border: '1px solid var(--border-color)',
                            borderRadius: 'var(--radius)',
                            color: 'var(--text-secondary)',
                            opacity: output ? 1 : 0.5,
                            cursor: output ? 'pointer' : 'not-allowed'
                        }}
                    >
                        <XCircle size={16} />
                        <span style={{ fontSize: '0.875rem' }}>Clear</span>
                    </button>
                    <button
                        onClick={handleCopy}
                        disabled={!output}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            padding: '6px 12px',
                            border: '1px solid var(--border-color)',
                            borderRadius: 'var(--radius)',
                            backgroundColor: copied ? 'rgba(34, 197, 94, 0.1)' : 'var(--bg-input)',
                            color: copied ? '#22c55e' : 'var(--text-primary)',
                            opacity: output ? 1 : 0.5,
                            cursor: output ? 'pointer' : 'not-allowed',
                            transition: 'all 0.2s'
                        }}
                    >
                        {copied ? <CheckCircle size={16} /> : <Copy size={16} />}
                        <span style={{ fontSize: '0.875rem' }}>{copied ? 'Copied' : 'Copy'}</span>
                    </button>
                </div>
            </div>

            <div
                className={showAnimation ? 'fade-in-up' : ''}
                style={{
                    flex: 1,
                    backgroundColor: 'var(--bg-dark)',
                    borderRadius: 'var(--radius)',
                    padding: '16px',
                    color: output ? 'var(--text-primary)' : 'var(--text-secondary)',
                    fontFamily: 'inherit',
                    whiteSpace: 'pre-wrap',
                    overflowY: 'auto',
                    fontSize: '1rem',
                    lineHeight: '1.7'
                }}>
                {output || "Your generated content will appear here..."}
            </div>

            {/* Refine Output Section */}
            {output && (
                <div style={{
                    marginTop: '16px',
                    paddingTop: '16px',
                    borderTop: '1px solid var(--border-color)'
                }}>
                    <h4 style={{
                        fontSize: '0.875rem',
                        fontWeight: '600',
                        color: 'var(--text-secondary)',
                        marginBottom: '12px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px'
                    }}>
                        Refine Output
                    </h4>
                    <div style={{
                        display: 'flex',
                        gap: '8px',
                        flexWrap: 'wrap'
                    }}>
                        {['Shorter', 'More Persuasive', 'More Casual', 'More Direct'].map((refinement) => (
                            <button
                                key={refinement}
                                onClick={() => handleRefine(refinement)}
                                disabled={isGenerating}
                                style={{
                                    padding: '8px 16px',
                                    fontSize: '0.875rem',
                                    fontWeight: '500',
                                    color: 'var(--text-primary)',
                                    backgroundColor: 'var(--bg-input)',
                                    border: '1px solid var(--border-color)',
                                    borderRadius: 'var(--radius)',
                                    cursor: isGenerating ? 'not-allowed' : 'pointer',
                                    opacity: isGenerating ? 0.5 : 1,
                                    transition: 'all 0.2s ease'
                                }}
                                onMouseEnter={(e) => {
                                    if (!isGenerating) {
                                        e.currentTarget.style.backgroundColor = 'var(--bg-card)';
                                        e.currentTarget.style.borderColor = '#6366f1';
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = 'var(--bg-input)';
                                    e.currentTarget.style.borderColor = 'var(--border-color)';
                                }}
                            >
                                {refinement}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            <div style={{
                position: 'absolute',
                bottom: '8px',
                right: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                color: 'var(--text-secondary)',
                fontSize: '0.75rem',
                opacity: 0.7,
                pointerEvents: 'none'
            }}>
                <Zap size={10} fill="currentColor" />
                <span>Powered by Groq</span>
            </div>
        </div>
    );
}
