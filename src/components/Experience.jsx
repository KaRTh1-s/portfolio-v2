import React, { useEffect, useRef, useState } from 'react';
import { Briefcase, Calendar, MapPin, Award, X } from 'lucide-react';

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
            { threshold: 0.01, rootMargin: '100px' }
        );
        if (containerRef.current) {
            observer.observe(containerRef.current);
        }
        return () => {
            if (containerRef.current) observer.unobserve(containerRef.current);
        };
    }, []);

    return (
        <section id="experience" className="section" style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: 700, display: 'inline-block' }} className="gradient-text">Experience</h2>
                    <div style={{ width: '60px', height: '4px', background: 'var(--accent-gradient)', margin: '0.5rem auto 0', borderRadius: '2px' }}></div>
                </div>

                <div ref={containerRef} className="fade-in" style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <div className="card-hover" style={{
                        background: 'var(--bg-card)',
                        borderRadius: '16px',
                        border: '1px solid var(--border-color)',
                        overflow: 'hidden'
                    }}>
                        {/* Top Area with Gradient */}
                        <div style={{
                            background: 'linear-gradient(135deg, #a855f7, #3b82f6)', // Purple to Blue
                            padding: '2rem',
                            color: 'white',
                            display: 'flex',
                            gap: '1.5rem',
                            alignItems: 'flex-start'
                        }}>
                            <div style={{
                                background: 'rgba(255, 255, 255, 0.2)',
                                padding: '1rem',
                                borderRadius: '12px',
                                backdropFilter: 'blur(5px)'
                            }}>
                                <Briefcase size={32} color="white" />
                            </div>
                            <div style={{ flex: 1 }}>
                                <h3 style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0, color: 'white' }}>Java Developer Intern</h3>
                                <h4 style={{ fontSize: '1.2rem', fontWeight: 500, opacity: 0.9, marginTop: '4px' }}>Infosys</h4>
                                <p style={{ marginTop: '0.5rem', opacity: 0.8, fontSize: '0.95rem' }}>Infosys Springboard - Internship</p>

                                <div style={{ display: 'flex', gap: '1.5rem', marginTop: '1rem', flexWrap: 'wrap' }}>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.9rem', opacity: 0.8 }}>
                                        <Calendar size={16} /> Mar 2025 - Apr 2025 · 2 months
                                    </span>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.9rem', opacity: 0.8 }}>
                                        <MapPin size={16} /> Coimbatore, Tamil Nadu, India · Remote
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Bottom Actions Area */}
                        <div style={{
                            padding: '1.5rem 2rem',
                            background: 'var(--bg-secondary)',
                            display: 'flex',
                            justifyContent: 'center'
                        }}>
                            <button onClick={() => setSelectedCert("/certs/internship.jpg")} style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                padding: '0.8rem 1.5rem',
                                borderRadius: '8px',
                                color: 'white',
                                fontWeight: 600,
                                transition: 'transform 0.2s ease, opacity 0.2s ease',
                                border: 'none',
                                cursor: 'pointer'
                            }} className="gradient-bg btn-hover">
                                <Award size={18} /> View Certificate
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
                    background: 'rgba(0, 0, 0, 0.85)',
                    backdropFilter: 'blur(4px)',
                    zIndex: 9999,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '1rem',
                    boxSizing: 'border-box'
                }} onClick={() => setSelectedCert(null)}>
                    <div style={{
                        background: 'var(--bg-card)',
                        width: '100%',
                        maxWidth: '900px',
                        maxHeight: '90vh',
                        borderRadius: '16px',
                        overflow: 'hidden',
                        display: 'flex',
                        flexDirection: 'column',
                        position: 'relative',
                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                        border: '1px solid var(--border-color)'
                    }} onClick={e => e.stopPropagation()}>

                        {/* Modal Header */}
                        <div style={{
                            padding: '1rem 1.5rem',
                            borderBottom: '1px solid var(--border-color)',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            background: 'var(--bg-secondary)'
                        }}>
                            <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 600 }}>Certificate Viewer</h3>
                            <button onClick={() => setSelectedCert(null)} style={{
                                background: 'rgba(239, 68, 68, 0.1)',
                                color: '#ef4444',
                                border: 'none',
                                borderRadius: '50%',
                                width: '36px',
                                height: '36px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease'
                            }} className="btn-hover" aria-label="Close modal">
                                <X size={20} />
                            </button>
                        </div>

                        {/* Modal Body - local image viewer */}
                        <div style={{ flex: 1, background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', padding: '0.75rem', minHeight: 0 }}>
                            <img
                                src={selectedCert}
                                alt="Certificate Document"
                                style={{ maxWidth: '100%', maxHeight: '100%', width: 'auto', height: 'auto', objectFit: 'contain', borderRadius: '4px', display: 'block' }}
                            />
                        </div>
                    </div>
                </div>
            )}

            <style dangerouslySetInnerHTML={{
                __html: `
        .btn-hover:hover {
          transform: translateY(-2px);
          opacity: 0.9;
        }
      `}} />
        </section>
    );
};

export default Experience;
