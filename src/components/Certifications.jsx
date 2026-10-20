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
                    }, index * 25);
                }
            },
            { threshold: 0.05, rootMargin: '40px' }
        );
        const currentEl = cardRef.current;
        if (currentEl) observer.observe(currentEl);
        return () => {
            if (currentEl) observer.unobserve(currentEl);
        };
    }, [index]);

    return (
        <div ref={cardRef} className="fade-in card-hover" style={{
            background: 'var(--bg-card)',
            borderRadius: '14px',
            padding: '1.75rem',
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            height: '100%'
        }}>
            {/* Subtle top accent line */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '3px',
                background: 'var(--accent-color)'
            }} />

            <div style={{
                width: '38px',
                height: '38px',
                borderRadius: '8px',
                background: 'var(--hover-primary)',
                border: '1px solid var(--border-color)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.25rem',
                color: 'var(--accent-color)'
            }}>
                <Award size={18} />
            </div>

            <h3 style={{ fontSize: '1.15rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-primary)' }}>
                {cert.title || cert.name}
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '1.5rem', flex: 1 }}>
                {cert.issuer}
            </p>

            <div style={{
                borderTop: '1px solid var(--border-color)',
                paddingTop: '0.85rem',
                marginTop: 'auto'
            }}>
                <button
                    onClick={() => onViewClick(cert.link)}
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        color: 'var(--accent-color)',
                        fontWeight: 600,
                        fontSize: '0.875rem',
                        transition: 'opacity 0.2s ease',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        padding: 0
                    }}
                    className="view-cert-btn"
                >
                    View Certificate <ExternalLink size={14} />
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
        { title: 'AWS Essentials', issuer: 'Amazon', link: '/certs/aws.jpg' },
        { title: 'CSS Crash Course', issuer: 'Udemy', link: '/certs/css.png' },
        { title: 'Connecting with IoT', issuer: 'Infosys', link: '/certs/iot-connecting.png' },
        { title: 'Google Cloud Computing', issuer: 'Google', link: '/certs/google-cloud.jpg' },
        { title: 'IoT', issuer: 'Infosys', link: '/certs/iot.png' },
        { title: 'Java Foundation', issuer: 'Infosys', link: '/certs/java-foundation.jpg' },
        { title: 'Learnathon', issuer: 'ICT Academy', link: '/certs/learnathon.jpg' },
        { title: 'OOPs in Java', issuer: 'Great Learning', link: '/certs/oops-java.jpg' },
        { title: 'Spring Boot', issuer: 'Infosys', link: '/certs/spring-boot.jpg' },
        { title: 'WebServices Testing', issuer: 'Udemy', link: '/certs/webservices.png' },
        { title: 'ChatGPT for Everyone', issuer: 'Guvi', link: '/certs/chatgpt.png' },
        { title: 'Intro to Firewall', issuer: 'Great Learning', link: '/certs/firewall.jpg' },
        { title: 'Intro to Cybersecurity', issuer: 'Cisco', link: '/certs/cybersecurity.png' },
        { title: 'Mastering Prompt Eng', issuer: 'Udemy', link: '/certs/mastering-prompt.jpg' },
        { title: 'Intro to Prompt Eng', issuer: 'Simplilearn', link: '/certs/intro-prompt.jpg' }
    ];

    return (
        <section id="certifications" className="section" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Certifications</h2>
                    <div className="teal-divider" />
                    <p className="section-subtitle">Continuous learning and professional development</p>
                </div>

                <div className="certs-grid" style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '1.5rem',
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
                                    Certificate Viewer
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
                                alt="Certificate Document"
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

            <style dangerouslySetInnerHTML={{
                __html: `
                .view-cert-btn:hover {
                    opacity: 0.8;
                }
                @media (max-width: 960px) {
                    .certs-grid { grid-template-columns: repeat(2, 1fr) !important; }
                }
                @media (max-width: 600px) {
                    .certs-grid { grid-template-columns: 1fr !important; }
                }
            ` }} />
        </section>
    );
};

export default Certifications;
