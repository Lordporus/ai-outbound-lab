import { MessageSquare, Mail, ShieldAlert, History } from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab, isOpen, onClose }) {
    const menuItems = [
        { id: 'rewrite-dm', label: 'Rewrite DM', icon: MessageSquare },
        { id: 'cold-email', label: 'Cold Email Generator', icon: Mail },
        { id: 'objection-handler', label: 'Objection Handler', icon: ShieldAlert },
        { id: 'history', label: 'History', icon: History },
    ];

    return (
        <>
            {/* Overlay for mobile */}
            {isOpen && (
                <div
                    onClick={onClose}
                    style={{
                        position: 'fixed',
                        inset: 0,
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        zIndex: 40,
                        backdropFilter: 'blur(2px)'
                    }}
                    className="mobile-overlay"
                />
            )}

            <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
                <div style={{ marginBottom: '40px', paddingLeft: '12px' }}>
                    <h2 style={{
                        fontSize: '1.25rem',
                        fontWeight: '700',
                        background: 'var(--primary-gradient)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                    }}>
                        AI Outbound Lab
                    </h2>
                </div>

                <nav style={{ flex: 1 }}>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {menuItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = activeTab === item.id;

                            return (
                                <li key={item.id}>
                                    <button
                                        onClick={() => {
                                            setActiveTab(item.id);
                                            onClose && onClose();
                                        }}
                                        style={{
                                            width: '100%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '12px',
                                            padding: '12px',
                                            borderRadius: 'var(--radius)',
                                            backgroundColor: isActive ? 'rgba(99, 102, 241, 0.1)' : 'transparent',
                                            color: isActive ? '#fff' : 'var(--text-secondary)',
                                            fontWeight: isActive ? '600' : '400',
                                            transition: 'all 0.2s ease',
                                            border: 'none',
                                            cursor: 'pointer',
                                            textAlign: 'left'
                                        }}
                                        onMouseEnter={(e) => {
                                            if (!isActive) {
                                                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.03)';
                                                e.currentTarget.style.color = '#e2e8f0';
                                            }
                                        }}
                                        onMouseLeave={(e) => {
                                            if (!isActive) {
                                                e.currentTarget.style.backgroundColor = 'transparent';
                                                e.currentTarget.style.color = 'var(--text-secondary)';
                                            }
                                        }}
                                    >
                                        <Icon size={18} strokeWidth={isActive ? 2.5 : 2} />
                                        <span>{item.label}</span>
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                <div style={{
                    paddingTop: '20px',
                    borderTop: '1px solid var(--border-color)',
                    color: 'var(--text-secondary)',
                    fontSize: '0.875rem'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', paddingLeft: '12px' }}>
                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e' }}></div>
                        System Operational
                    </div>
                </div>
            </aside>
        </>
    );
}
