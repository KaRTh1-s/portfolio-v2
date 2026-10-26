import React, { useState, useEffect, useRef, useCallback } from 'react';
import { HelpCircle, X, Compass, Keyboard, Home, User, GraduationCap, Briefcase, FolderOpen, Code2, Award, Mail } from 'lucide-react';

const sections = [
    { id: 'home', name: 'Home', icon: Home, keyHint: 'G then H' },
    { id: 'about', name: 'About', icon: User, keyHint: 'G then A' },
    { id: 'education', name: 'Education', icon: GraduationCap },
    { id: 'experience', name: 'Experience', icon: Briefcase },
    { id: 'projects', name: 'Projects', icon: FolderOpen, keyHint: 'G then P' },
    { id: 'skills', name: 'Skills', icon: Code2, keyHint: 'G then S' },
    { id: 'achievements', name: 'Achievements', icon: Award },
    { id: 'contact', name: 'Contact', icon: Mail, keyHint: 'G then C' }
];

const shortcuts = [
    { keys: ['G', 'H'], description: 'Jump to Home' },
    { keys: ['G', 'A'], description: 'Jump to About' },
    { keys: ['G', 'P'], description: 'Jump to Projects' },
    { keys: ['G', 'S'], description: 'Jump to Skills' },
    { keys: ['G', 'C'], description: 'Jump to Contact' },
    { keys: ['?'], description: 'Toggle this Help panel' },
    { keys: ['Esc'], description: 'Close dialog' }
];

const HelpModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);
    const triggerRef = useRef(null);
    const modalRef = useRef(null);
    const closeBtnRef = useRef(null);
    const pendingKeyRef = useRef(null);
    const keyTimeoutRef = useRef(null);

    const navigateTo = useCallback((sectionId) => {
        const target = document.getElementById(sectionId);
        if (target) {
            const prefersReduced = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
            target.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth', block: 'start' });
            window.history.pushState(null, '', `#${sectionId}`);
        }
        setIsOpen(false);
    }, []);

    // Global keyboard listener for sequences ('G' then 'H', etc.)
    useEffect(() => {
        const handleKeyDown = (e) => {
            // Do not fire shortcuts if the user is inside an editable field
            const targetTag = e.target.tagName?.toLowerCase();
            if (
                targetTag === 'input' ||
                targetTag === 'textarea' ||
                targetTag === 'select' ||
                e.target.isContentEditable
            ) {
                return;
            }

            if (e.key === 'Escape' && isOpen) {
                e.preventDefault();
                setIsOpen(false);
                return;
            }

            if (e.key === '?' && !e.ctrlKey && !e.metaKey) {
                e.preventDefault();
                setIsOpen(prev => !prev);
                return;
            }

            const key = e.key.toUpperCase();

            // First key of sequence: 'G'
            if (key === 'G' && !pendingKeyRef.current) {
                pendingKeyRef.current = 'G';
                clearTimeout(keyTimeoutRef.current);
                keyTimeoutRef.current = setTimeout(() => {
                    pendingKeyRef.current = null;
                }, 1000);
                return;
            }

            // Second key of sequence
            if (pendingKeyRef.current === 'G') {
                pendingKeyRef.current = null;
                clearTimeout(keyTimeoutRef.current);

                switch (key) {
                    case 'H':
                        e.preventDefault();
                        navigateTo('home');
                        break;
                    case 'A':
                        e.preventDefault();
                        navigateTo('about');
                        break;
                    case 'P':
                        e.preventDefault();
                        navigateTo('projects');
                        break;
                    case 'S':
                        e.preventDefault();
                        navigateTo('skills');
                        break;
                    case 'C':
                        e.preventDefault();
                        navigateTo('contact');
                        break;
                    default:
                        break;
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            clearTimeout(keyTimeoutRef.current);
        };
    }, [isOpen, navigateTo]);

    // Focus management when modal opens/closes
    useEffect(() => {
        if (isOpen) {
            closeBtnRef.current?.focus();
        } else {
            triggerRef.current?.focus();
        }
    }, [isOpen]);

    return (
        <>
            {/* Floating Question-Mark Help Button */}
            <div
                style={{
                    position: 'fixed',
                    bottom: '1.5rem',
                    left: '1.5rem',
                    zIndex: 990
                }}
            >
                <button
                    ref={triggerRef}
                    type="button"
                    onClick={() => setIsOpen(true)}
                    onMouseEnter={() => setShowTooltip(true)}
                    onMouseLeave={() => setShowTooltip(false)}
                    onFocus={() => setShowTooltip(true)}
                    onBlur={() => setShowTooltip(false)}
                    aria-label="Help & Keyboard Shortcuts"
                    className="floating-help-btn"
                    style={{
                        width: '46px',
                        height: '46px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--bg-card)',
                        color: 'var(--accent-color)',
                        border: '1.5px solid var(--border-color)',
                        boxShadow: 'var(--shadow-card-hover)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                        outline: 'none',
                        position: 'relative'
                    }}
                >
                    <HelpCircle size={22} />
                </button>

                {/* Floating Tooltip */}
                {showTooltip && !isOpen && (
                    <div
                        role="tooltip"
                        style={{
                            position: 'absolute',
                            left: '56px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            backgroundColor: 'var(--bg-card)',
                            color: 'var(--text-primary)',
                            border: '1px solid var(--border-color)',
                            boxShadow: '0 4px 14px rgba(0,0,0,0.15)',
                            padding: '0.4rem 0.75rem',
                            borderRadius: '8px',
                            fontSize: '0.8rem',
                            fontWeight: 600,
                            whiteSpace: 'nowrap',
                            pointerEvents: 'none',
                            zIndex: 991
                        }}
                    >
                        Help &amp; Shortcuts <kbd style={{ marginLeft: '4px', opacity: 0.75, fontSize: '0.7rem' }}>?</kbd>
                    </div>
                )}
            </div>

            {/* Help & Shortcuts Modal */}
            {isOpen && (
                <div
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="help-modal-title"
                    className="help-modal-backdrop"
                    onClick={() => setIsOpen(false)}
                    style={{
                        position: 'fixed',
                        inset: 0,
                        backgroundColor: 'rgba(15, 23, 22, 0.7)',
                        backdropFilter: 'blur(8px)',
                        WebkitBackdropFilter: 'blur(8px)',
                        zIndex: 99999,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '1.25rem'
                    }}
                >
                    <div
                        ref={modalRef}
                        className="help-modal-card ref-card"
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            width: '100%',
                            maxWidth: '560px',
                            maxHeight: '85vh',
                            backgroundColor: 'var(--bg-card)',
                            border: '1px solid var(--border-color)',
                            borderRadius: '16px',
                            boxShadow: '0 24px 48px rgba(0, 0, 0, 0.3)',
                            overflow: 'hidden',
                            display: 'flex',
                            flexDirection: 'column'
                        }}
                    >
                        {/* Modal Header */}
                        <div style={{
                            padding: '1.25rem 1.5rem',
                            borderBottom: '1px solid var(--border-color)',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            backgroundColor: 'var(--bg-secondary)'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <div style={{
                                    width: '32px',
                                    height: '32px',
                                    borderRadius: '8px',
                                    backgroundColor: 'var(--accent-subtle)',
                                    color: 'var(--accent-color)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    border: '1px solid var(--border-color)'
                                }}>
                                    <HelpCircle size={18} />
                                </div>
                                <div>
                                    <h3 id="help-modal-title" style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                                        Help &amp; Quick Navigation
                                    </h3>
                                    <p style={{ margin: 0, fontSize: '0.775rem', color: 'var(--text-secondary)' }}>
                                        Browse portfolio sections and keyboard shortcuts
                                    </p>
                                </div>
                            </div>

                            <button
                                ref={closeBtnRef}
                                type="button"
                                onClick={() => setIsOpen(false)}
                                aria-label="Close help modal"
                                style={{
                                    background: 'transparent',
                                    border: 'none',
                                    cursor: 'pointer',
                                    color: 'var(--text-secondary)',
                                    padding: '6px',
                                    borderRadius: '6px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div style={{ padding: '1.5rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            {/* Navigation Destinations */}
                            <div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--accent-color)', marginBottom: '0.75rem', fontSize: '0.825rem', fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                                    <Compass size={14} />
                                    <span>Sections</span>
                                </div>
                                <div style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
                                    gap: '0.65rem'
                                }}>
                                    {sections.map((sec) => {
                                        const Icon = sec.icon;
                                        return (
                                            <button
                                                key={sec.id}
                                                type="button"
                                                onClick={() => navigateTo(sec.id)}
                                                className="help-nav-item"
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '8px',
                                                    padding: '0.65rem 0.85rem',
                                                    borderRadius: '8px',
                                                    backgroundColor: 'var(--bg-secondary)',
                                                    border: '1px solid var(--border-color)',
                                                    color: 'var(--text-primary)',
                                                    fontSize: '0.85rem',
                                                    fontWeight: 500,
                                                    cursor: 'pointer',
                                                    transition: 'all 0.15s ease'
                                                }}
                                            >
                                                <Icon size={15} color="var(--accent-color)" />
                                                <span>{sec.name}</span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Keyboard Shortcuts List */}
                            <div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--accent-color)', marginBottom: '0.75rem', fontSize: '0.825rem', fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                                    <Keyboard size={14} />
                                    <span>Keyboard Shortcuts</span>
                                </div>
                                <div style={{
                                    borderRadius: '10px',
                                    border: '1px solid var(--border-color)',
                                    overflow: 'hidden',
                                    backgroundColor: 'var(--bg-secondary)'
                                }}>
                                    {shortcuts.map((sc, i) => (
                                        <div
                                            key={i}
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                padding: '0.65rem 1rem',
                                                borderBottom: i < shortcuts.length - 1 ? '1px solid var(--border-light)' : 'none',
                                                fontSize: '0.85rem'
                                            }}
                                        >
                                            <span style={{ color: 'var(--text-secondary)' }}>{sc.description}</span>
                                            <div style={{ display: 'flex', gap: '4px' }}>
                                                {sc.keys.map((k, kIdx) => (
                                                    <kbd
                                                        key={kIdx}
                                                        style={{
                                                            padding: '0.2rem 0.55rem',
                                                            borderRadius: '6px',
                                                            backgroundColor: 'var(--bg-card)',
                                                            border: '1px solid var(--border-color)',
                                                            color: 'var(--text-primary)',
                                                            fontSize: '0.75rem',
                                                            fontWeight: 600,
                                                            boxShadow: '0 1px 2px rgba(0,0,0,0.06)'
                                                        }}
                                                    >
                                                        {k}
                                                    </kbd>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div style={{
                            padding: '0.85rem 1.5rem',
                            borderTop: '1px solid var(--border-color)',
                            backgroundColor: 'var(--bg-secondary)',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            fontSize: '0.775rem',
                            color: 'var(--text-muted)'
                        }}>
                            <span>Shortcuts are disabled while typing in text inputs</span>
                            <kbd style={{ padding: '0.15rem 0.4rem', borderRadius: '4px', backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
                                ESC to close
                            </kbd>
                        </div>
                    </div>
                </div>
            )}

            <style dangerouslySetInnerHTML={{
                __html: `
                .floating-help-btn:hover, .floating-help-btn:focus-visible {
                    border-color: var(--accent-color) !important;
                    transform: translateY(-2px) scale(1.05);
                    box-shadow: 0 8px 24px rgba(0, 127, 120, 0.25) !important;
                }
                .help-nav-item:hover, .help-nav-item:focus-visible {
                    border-color: var(--accent-color) !important;
                    color: var(--accent-color) !important;
                    transform: translateY(-1px);
                }
                .help-modal-backdrop {
                    animation: helpFadeIn 0.15s ease-out;
                }
                .help-modal-card {
                    animation: helpSlideUp 0.2s cubic-bezier(0.16, 1, 0.3, 1);
                }
                @keyframes helpFadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes helpSlideUp {
                    from { transform: translateY(12px) scale(0.97); opacity: 0; }
                    to { transform: translateY(0) scale(1); opacity: 1; }
                }
                @media (prefers-reduced-motion: reduce) {
                    .help-modal-backdrop, .help-modal-card, .floating-help-btn {
                        animation: none !important;
                        transform: none !important;
                    }
                }
            ` }} />
        </>
    );
};

export default HelpModal;
