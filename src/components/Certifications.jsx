import React, { useEffect, useRef, useState } from 'react';
import { Award, ExternalLink, X } from 'lucide-react';

const CertificationCard = ({ cert, index, onViewClick }) => {
    const cardRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, index * 40);
                }
            },
            { threshold: 0.01, rootMargin: '50px' }
        );
        if (cardRef.current) observer.observe(cardRef.current);
        return () => {
            if (cardRef.current) observer.unobserve(cardRef.current);
        };
    }, [index]);

    return (
        <div ref={cardRef} className="fade-in card-hover" style={{
            background: 'var(--bg-card)',
            borderRadius: '12px',
            border: '1px solid var(--border-color)',
            padding: '2rem',
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            height: '100%'
        }}>
            {/* Top Banner highlight */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '4px',
                background: cert.gradient || 'var(--accent-gradient)'
            }}></div>

            <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '8px',
                background: cert.gradient || 'var(--accent-gradient)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.5rem',
                color: 'white'
            }}>
                <Award size={20} />
            </div>

            <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '0.5rem' }}>{cert.title}</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', flex: 1 }}>{cert.issuer}</p>

            <div style={{
                borderTop: '1px solid var(--border-color)',
                paddingTop: '1rem',
                marginTop: 'auto',
                textAlign: 'center'
            }}>
                <button onClick={() => onViewClick(cert.link)} style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    color: 'var(--accent-color)',
                    fontWeight: 600,
                    fontSize: '0.95rem',
                    transition: 'opacity 0.2s ease',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer'
                }} className="btn-hover">
                    View Certificate <ExternalLink size={16} />
                </button>
            </div>
        </div>
    );
};

const Certifications = () => {
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

    const certs = [
        { title: 'AWS Essentials', issuer: 'Amazon', link: '/certs/aws.jpg', gradient: 'linear-gradient(135deg, #f97316, #ea580c)' },
        { title: 'CSS Crash Course', issuer: 'Udemy', link: '/certs/css.png', gradient: 'linear-gradient(135deg, #3b82f6, #2563eb)' },
        { title: 'Connecting with IoT', issuer: 'Infosys', link: '/certs/iot-connecting.png', gradient: 'linear-gradient(135deg, #22c55e, #16a34a)' },
        { title: 'Google Cloud Computing', issuer: 'Google', link: '/certs/google-cloud.jpg', gradient: 'linear-gradient(135deg, #06b6d4, #0891b2)' },
        { title: 'IoT', issuer: 'Infosys', link: '/certs/iot.png', gradient: 'linear-gradient(135deg, #a855f7, #9333ea)' },
        { title: 'Java Foundation', issuer: 'Infosys', link: '/certs/java-foundation.jpg', gradient: 'linear-gradient(135deg, #ef4444, #dc2626)' },
        { title: 'Learnathon', issuer: 'ICT Academy', link: '/certs/learnathon.jpg', gradient: 'linear-gradient(135deg, #8b5cf6, #7c3aed)' },
        { title: 'OOPs in Java', issuer: 'Great Learning', link: '/certs/oops-java.jpg', gradient: 'linear-gradient(135deg, #f59e0b, #d97706)' },
        { title: 'Spring Boot', issuer: 'Infosys', link: '/certs/spring-boot.jpg', gradient: 'linear-gradient(135deg, #10b981, #059669)' },
        { title: 'WebServices Testing', issuer: 'Udemy', link: '/certs/webservices.png', gradient: 'linear-gradient(135deg, #14b8a6, #0f766e)' },
        { title: 'ChatGPT for Everyone', issuer: 'Guvi', link: '/certs/chatgpt.png', gradient: 'linear-gradient(135deg, #ec4899, #be185d)' },
        { title: 'Intro to Firewall', issuer: 'Great Learning', link: '/certs/firewall.jpg', gradient: 'linear-gradient(135deg, #64748b, #475569)' },
        { title: 'Intro to Cybersecurity', issuer: 'Cisco', link: '/certs/cybersecurity.png', gradient: 'linear-gradient(135deg, #2dd4bf, #0f766e)' },
        { title: 'Mastering Prompt Eng', issuer: 'Udemy', link: '/certs/mastering-prompt.jpg', gradient: 'linear-gradient(135deg, #eab308, #a16207)' },
        { title: 'Intro to Prompt Eng', issuer: 'Simplilearn', link: '/certs/intro-prompt.jpg', gradient: 'linear-gradient(135deg, #f43f5e, #be123c)' }
    ];

    return (
        <section id="certifications" className="section" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: 700, display: 'inline-block' }} className="gradient-text">Certifications</h2>
                    <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>Continuous learning and professional development</p>
                    <div style={{ width: '60px', height: '4px', background: 'var(--accent-gradient)', margin: '1rem auto 0', borderRadius: '2px' }}></div>
                </div>

                <div className="certs-grid" style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '2rem',
                    maxWidth: '1100px',
                    margin: '0 auto'
                }}>
                    {certs.map((cert, index) => (
                        <CertificationCard key={cert.title} cert={cert} index={index} onViewClick={setSelectedCert} />
                    ))}
                </div>
            </div>

            {/* Certificate Modal */}
            {selectedCert && (
                <div className="cert-modal-overlay" style={{
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
        @media (max-width: 900px) {
          .certs-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 600px) {
          .certs-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 768px) {
          .cert-modal-overlay {
            padding: 0.75rem !important;
            align-items: flex-start !important;
            padding-top: 4rem !important;
          }
        }
      `}} />
        </section>
    );
};

export default Certifications;
