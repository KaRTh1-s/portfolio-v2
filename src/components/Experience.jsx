import React, { useEffect, useRef, useState } from 'react';
import { Briefcase, Calendar, MapPin, Award, X, Sparkles } from 'lucide-react';

const Experience = () => {
    const containerRef = useRef(null);
    const [selectedCert, setSelectedCert] = useState(null);

    // Lock body scroll when modal is open
    useEffect(() => {
        if (selectedCert) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [selectedCert]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            },
            { threshold: 0.05, rootMargin: '60px' }
        );
        const currentEl = containerRef.current;
        if (currentEl) {
            observer.observe(currentEl);
        }
        return () => {
            if (currentEl) observer.unobserve(currentEl);
        };
    }, []);

    return (
        <section id="experience" className="section" style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Experience</h2>
                    <div className="teal-divider" />
                </div>

                <div ref={containerRef} className="fade-in" style={{ maxWidth: '820px', margin: '0 auto' }}>
                    <div className="card-hover" style={{
                        borderRadius: '16px',
                        overflow: 'hidden',
                        padding: '2.5rem'
                    }}>
                        {/* Clean Xellara-inspired header layout (no purple-blue gradient banner) */}
                        <div style={{
                            display: 'flex',
                            gap: '1.5rem',
                            alignItems: 'flex-start',
                            flexWrap: 'wrap'
                        }}>
                            <div style={{
                                width: '52px',
                                height: '52px',
                                borderRadius: '12px',
                                background: 'var(--hover-primary)',
                                border: '1px solid var(--border-color)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'var(--accent-color)',
                                flexShrink: 0
                            }}>
                                <Briefcase size={26} />
                            </div>

                            <div style={{ flex: 1, minWidth: '260px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '0.4rem' }}>
                                    <h3 style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>
                                        Java Developer Intern
                                    </h3>
                                </div>

                                <h4 style={{ fontSize: '1.15rem', fontWeight: 600, color: 'var(--accent-color)', margin: '0 0 0.35rem' }}>
                                    Infosys
                                </h4>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', margin: 0 }}>
                                    Infosys Springboard - Internship
                                </p>

                                {/* Tag Badges inspired by Xellara reference */}
                                <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap', marginTop: '1.25rem', marginBottom: '1.25rem' }}>
                                    <span className="ref-pill">
                                        <Briefcase size={14} color="var(--accent-color)" /> Internship
                                    </span>
                                    <span className="ref-pill">
                                        <MapPin size={14} color="var(--accent-color)" /> Remote
                                    </span>
                                    <span className="ref-pill">
                                        <Calendar size={14} color="var(--accent-color)" /> Mar 2025 - Apr 2025 · 2 months
                                    </span>
                                </div>

                                <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                                    <MapPin size={15} style={{ verticalAlign: 'middle', marginRight: '6px', color: 'var(--accent-color)' }} />
                                    Coimbatore, Tamil Nadu, India · Remote
                                </div>
                            </div>
                        </div>

                        {/* Certificate Action Area */}
                        <div style={{
                            marginTop: '2rem',
                            paddingTop: '1.5rem',
                            borderTop: '1px solid var(--border-color)',
                            display: 'flex',
                            justifyContent: 'flex-start',
                            alignItems: 'center'
                        }}>
                            <button
                                onClick={() => setSelectedCert("/certs/internship.jpg")}
                                className="btn-primary"
                                style={{
                                    padding: '0.65rem 1.4rem',
                                    fontSize: '0.9rem'
                                }}
                            >
                                <Award size={17} /> View Certificate
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Certificate Modal */}
            {selectedCert && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    background: 'rgba(25, 44, 43, 0.75)',
                    backdropFilter: 'blur(6px)',
                    zIndex: 9999,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '1.5rem',
                    boxSizing: 'border-box'
                }} onClick={() => setSelectedCert(null)}>
                    <div style={{
                        background: 'var(--bg-card)',
                        width: '100%',
                        maxWidth: '920px',
                        maxHeight: '90vh',
                        borderRadius: '16px',
                        overflow: 'hidden',
                        display: 'flex',
                        flexDirection: 'column',
                        position: 'relative',
                        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.25)',
                        border: '1px solid var(--border-color)'
                    }} onClick={e => e.stopPropagation()}>

                        {/* Modal Header */}
                        <div style={{
                            padding: '1.1rem 1.5rem',
                            borderBottom: '1px solid var(--border-color)',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            background: 'var(--bg-secondary)'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <Award size={18} color="var(--accent-color)" />
                                <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                                    Certificate Viewer - Infosys Springboard
                                </h3>
                            </div>
                            <button
                                onClick={() => setSelectedCert(null)}
                                style={{
                                    background: 'var(--bg-card)',
                                    color: 'var(--text-secondary)',
                                    border: '1px solid var(--border-color)',
                                    borderRadius: '50%',
                                    width: '32px',
                                    height: '32px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease'
                                }}
                                aria-label="Close modal"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div style={{
                            flex: 1,
                            background: '#0D1615',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            overflow: 'auto',
                            padding: '1rem',
                            minHeight: 0
                        }}>
                            <img
                                src={selectedCert}
                                alt="Infosys Internship Certificate"
                                style={{
                                    maxWidth: '100%',
                                    maxHeight: '100%',
                                    width: 'auto',
                                    height: 'auto',
                                    objectFit: 'contain',
                                    borderRadius: '6px',
                                    boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
                                }}
                            />
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Experience;
