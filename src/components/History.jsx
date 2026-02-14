import { Clock, Trash2 } from 'lucide-react';

export default function History({ history, onItemClick, onClearHistory }) {
    const getToolName = (tool) => {
        switch (tool) {
            case 'rewrite-dm':
                return 'Rewrite DM';
            case 'cold-email':
                return 'Cold Email';
            case 'objection-handler':
                return 'Objection Handler';
            default:
                return tool;
        }
    };

    const truncateText = (text, maxLength = 100) => {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    };

    if (history.length === 0) {
        return (
            <div style={{
                padding: '40px',
                textAlign: 'center',
                color: 'var(--text-secondary)'
            }}>
                <Clock size={48} style={{ opacity: 0.5, marginBottom: '16px' }} />
                <h2 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>No History Yet</h2>
                <p>Your generated outputs will appear here.</p>
            </div>
        );
    }

    return (
        <div style={{
            padding: '24px',
            height: '100%',
            display: 'flex',
            flexDirection: 'column'
        }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '24px',
                paddingBottom: '16px',
                borderBottom: '1px solid var(--border-color)'
            }}>
                <h2 style={{
                    fontSize: '1.5rem',
                    fontWeight: '600',
                    color: 'var(--text-primary)'
                }}>
                    Generation History
                </h2>
                <button
                    onClick={onClearHistory}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '8px 16px',
                        fontSize: '0.875rem',
                        fontWeight: '500',
                        color: '#ef4444',
                        backgroundColor: 'rgba(239, 68, 68, 0.1)',
                        border: '1px solid rgba(239, 68, 68, 0.3)',
                        borderRadius: 'var(--radius)',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.2)';
                        e.currentTarget.style.borderColor = '#ef4444';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.1)';
                        e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.3)';
                    }}
                >
                    <Trash2 size={16} />
                    Clear History
                </button>
            </div>

            <div style={{
                flex: 1,
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
            }}>
                {history.map((item) => (
                    <div
                        key={item.id}
                        onClick={() => onItemClick(item)}
                        style={{
                            backgroundColor: 'var(--bg-card)',
                            border: '1px solid var(--border-color)',
                            borderRadius: 'var(--radius)',
                            padding: '16px',
                            cursor: 'pointer',
                            transition: 'all 0.2s'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = '#6366f1';
                            e.currentTarget.style.backgroundColor = 'var(--bg-input)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = 'var(--border-color)';
                            e.currentTarget.style.backgroundColor = 'var(--bg-card)';
                        }}
                    >
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '8px'
                        }}>
                            <span style={{
                                fontSize: '0.875rem',
                                fontWeight: '600',
                                color: '#6366f1',
                                backgroundColor: 'rgba(99, 102, 241, 0.1)',
                                padding: '4px 12px',
                                borderRadius: '12px'
                            }}>
                                {getToolName(item.tool)}
                            </span>
                            <span style={{
                                fontSize: '0.75rem',
                                color: 'var(--text-secondary)'
                            }}>
                                {item.date}
                            </span>
                        </div>
                        <p style={{
                            fontSize: '0.875rem',
                            color: 'var(--text-primary)',
                            lineHeight: '1.5',
                            margin: 0
                        }}>
                            {truncateText(item.output)}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
