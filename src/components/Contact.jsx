import React, { useEffect, useRef, useState } from 'react';
import { MapPin, Phone, Mail, Github, Linkedin, Facebook, Instagram, Download, CheckCircle, Send } from 'lucide-react';

const Contact = () => {
    const leftRef = useRef(null);
    const rightRef = useRef(null);
    const [result, setResult] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const onSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);
        setResult("Sending....");
        const formData = new FormData(event.target);
        formData.append("access_key", "eb86d257-69a1-4140-a63a-ac6cd9ce7c47");

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData
            });

            const data = await response.json();

            if (data.success) {
                setResult("");
                setShowSuccess(true);
                event.target.reset();
                setTimeout(() => {
                    setShowSuccess(false);
                }, 5000);
            } else {
                console.log("Error", data);
                setResult(data.message);
            }
        } catch (error) {
            console.error("Submission Error", error);
            setResult("An error occurred during submission.");
        } finally {
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            },
            { threshold: 0.05, rootMargin: '40px' }
        );
        const leftEl = leftRef.current;
        const rightEl = rightRef.current;
        if (leftEl) observer.observe(leftEl);
        if (rightEl) observer.observe(rightEl);
        return () => {
            if (leftEl) observer.unobserve(leftEl);
            if (rightEl) observer.unobserve(rightEl);
        };
    }, []);

    return (
        <>
            {/* Success Notification */}
            <div style={{
                position: 'fixed',
                top: showSuccess ? '85px' : '-120px',
                left: '50%',
                transform: 'translateX(-50%)',
                background: 'var(--bg-card)',
                border: '1px solid var(--accent-color)',
                padding: '0.85rem 1.4rem',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                boxShadow: '0 10px 25px rgba(0, 127, 120, 0.2)',
                zIndex: 9999,
                transition: 'top 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                maxWidth: 'calc(100vw - 2rem)',
                boxSizing: 'border-box',
                whiteSpace: 'nowrap',
            }}>
                <CheckCircle color="var(--accent-color)" size={20} />
                <span style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.9rem' }}>Message sent successfully!</span>
            </div>

            <section id="contact" className="section" style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingBottom: '3rem' }}>
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">Let's Connect</h2>
                        <div className="teal-divider" />
                        <p className="section-subtitle">Get in touch for internships, projects, or collaborations</p>
                    </div>

                    <div className="contact-grid" style={{
                        display: 'grid',
                        gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.4fr)',
                        gap: '2.5rem',
                        alignItems: 'start',
                        maxWidth: '1000px',
                        margin: '0 auto'
                    }}>
                        {/* Contact Information Card (Left) */}
                        <div ref={leftRef} className="fade-in ref-card" style={{
                            padding: '2.25rem',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1.75rem',
                            minWidth: 0
                        }}>
                            <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                                Contact Information
                            </h3>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                    <div style={{
                                        background: 'var(--hover-primary)',
                                        color: 'var(--accent-color)',
                                        padding: '0.75rem',
                                        borderRadius: '10px',
                                        border: '1px solid var(--border-color)',
                                        flexShrink: 0
                                    }}>
                                        <MapPin size={20} />
                                    </div>
                                    <div>
                                        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Address</p>
                                        <p style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.95rem' }}>Coimbatore, Tamil Nadu, India</p>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                    <div style={{
                                        background: 'var(--hover-primary)',
                                        color: 'var(--accent-color)',
                                        padding: '0.75rem',
                                        borderRadius: '10px',
                                        border: '1px solid var(--border-color)',
                                        flexShrink: 0
                                    }}>
                                        <Phone size={20} />
                                    </div>
                                    <div>
                                        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Mobile</p>
                                        <p style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.95rem' }}>+91 9344667748</p>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                    <div style={{
                                        background: 'var(--hover-primary)',
                                        color: 'var(--accent-color)',
                                        padding: '0.75rem',
                                        borderRadius: '10px',
                                        border: '1px solid var(--border-color)',
                                        flexShrink: 0
                                    }}>
                                        <Mail size={20} />
                                    </div>
                                    <div style={{ minWidth: 0 }}>
                                        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Email</p>
                                        <p style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.95rem', wordBreak: 'break-all' }}>karthiselvaraj.dec13@gmail.com</p>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.85rem', fontWeight: 600 }}>Social Profiles</p>
                                <div style={{ display: 'flex', gap: '0.75rem' }}>
                                    <a href="https://github.com/KaRTh1-s" target="_blank" rel="noopener noreferrer" className="contact-social-btn" aria-label="GitHub">
                                        <Github size={18} />
                                    </a>
                                    <a href="https://www.linkedin.com/in/karthikeyan-s-86457b290" target="_blank" rel="noopener noreferrer" className="contact-social-btn" aria-label="LinkedIn">
                                        <Linkedin size={18} />
                                    </a>
                                    <a href="https://www.facebook.com/profile.php?id=100077635540839" target="_blank" rel="noopener noreferrer" className="contact-social-btn" aria-label="Facebook">
                                        <Facebook size={18} />
                                    </a>
                                    <a href="https://www.instagram.com/s._k_a_r_t_h_i_/" target="_blank" rel="noopener noreferrer" className="contact-social-btn" aria-label="Instagram">
                                        <Instagram size={18} />
                                    </a>
                                </div>
                            </div>

                            <a
                                href="/resume.pdf"
                                download="Karthikeyan_S_Resume.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-outline"
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '8px',
                                    marginTop: '0.5rem',
                                    padding: '0.75rem 1rem'
                                }}
                            >
                                <Download size={18} /> Download Resume
                            </a>
                        </div>

                        {/* Send Message Form Card (Right) */}
                        <div ref={rightRef} className="fade-in ref-card" style={{
                            padding: '2.25rem',
                            minWidth: 0
                        }}>
                            <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
                                Send me a message
                            </h3>

                            <form className="contact-form" onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                                    <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Your Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        placeholder="John Doe"
                                        className="ref-input"
                                        style={{
                                            padding: '0.85rem 1rem',
                                            borderRadius: '8px',
                                            border: '1px solid var(--border-color)',
                                            background: 'var(--bg-secondary)',
                                            color: 'var(--text-primary)',
                                            fontSize: '0.95rem',
                                            fontFamily: 'inherit',
                                            transition: 'border-color 0.2s ease, box-shadow 0.2s ease'
                                        }}
                                    />
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                                    <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Your Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        placeholder="john@example.com"
                                        className="ref-input"
                                        style={{
                                            padding: '0.85rem 1rem',
                                            borderRadius: '8px',
                                            border: '1px solid var(--border-color)',
                                            background: 'var(--bg-secondary)',
                                            color: 'var(--text-primary)',
                                            fontSize: '0.95rem',
                                            fontFamily: 'inherit',
                                            transition: 'border-color 0.2s ease, box-shadow 0.2s ease'
                                        }}
                                    />
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                                    <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Your Message</label>
                                    <textarea
                                        name="message"
                                        required
                                        placeholder="Tell me about your project or how we can collaborate..."
                                        rows="4"
                                        className="ref-input"
                                        style={{
                                            padding: '0.85rem 1rem',
                                            borderRadius: '8px',
                                            border: '1px solid var(--border-color)',
                                            background: 'var(--bg-secondary)',
                                            color: 'var(--text-primary)',
                                            fontSize: '0.95rem',
                                            fontFamily: 'inherit',
                                            resize: 'vertical',
                                            transition: 'border-color 0.2s ease, box-shadow 0.2s ease'
                                        }}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="btn-primary"
                                    style={{
                                        marginTop: '0.5rem',
                                        padding: '0.85rem 1.5rem',
                                        opacity: isSubmitting ? 0.7 : 1,
                                        cursor: isSubmitting ? 'not-allowed' : 'pointer'
                                    }}
                                >
                                    <Send size={16} />
                                    {isSubmitting ? 'Sending...' : 'Send Message'}
                                </button>

                                {result && (
                                    <span style={{ color: 'var(--text-secondary)', textAlign: 'center', marginTop: '0.25rem', fontSize: '0.85rem' }}>
                                        {result}
                                    </span>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* Clean Minimal Footer */}
            <footer style={{
                background: 'var(--bg-secondary)',
                borderTop: '1px solid var(--border-color)',
                padding: '3.5rem 0 2rem',
                overflow: 'hidden',
                width: '100%'
            }}>
                <div className="container">
                    <div className="footer-grid" style={{
                        display: 'grid',
                        gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr) minmax(0, 1.5fr)',
                        gap: '2.5rem',
                        marginBottom: '2.5rem'
                    }}>
                        <div style={{ minWidth: 0 }}>
                            <h2 style={{
                                fontSize: '1.4rem',
                                fontWeight: 800,
                                marginBottom: '0.75rem',
                                color: 'var(--text-primary)',
                                letterSpacing: '-0.02em'
                            }}>
                                KARTHIKEYAN S
                            </h2>
                            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, fontSize: '0.925rem', maxWidth: '340px' }}>
                                Full Stack Developer passionate about creating amazing web experiences and building scalable applications.
                            </p>
                        </div>

                        <div>
                            <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--text-primary)' }}>
                                Quick Links
                            </h3>
                            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                                {['Home', 'About', 'Education', 'Experience', 'Projects', 'Skills', 'Contact'].map(link => (
                                    <li key={link}>
                                        <a
                                            href={`#${link.toLowerCase()}`}
                                            className="footer-nav-link"
                                            style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', transition: 'color 0.2s ease' }}
                                        >
                                            {link}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--text-primary)' }}>
                                Get in Touch
                            </h3>
                            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                                <li>+91 9344667748</li>
                                <li>Coimbatore, Tamil Nadu, India</li>
                                <li style={{ marginTop: '0.5rem' }}>
                                    <a
                                        href="/resume.pdf"
                                        download="Karthikeyan_S_Resume.pdf"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn-primary"
                                        style={{
                                            display: 'inline-flex',
                                            padding: '0.5rem 1rem',
                                            fontSize: '0.825rem'
                                        }}
                                    >
                                        <Download size={14} /> Download Resume
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div style={{
                        borderTop: '1px solid var(--border-color)',
                        paddingTop: '1.75rem',
                        textAlign: 'center',
                        color: 'var(--text-secondary)',
                        fontSize: '0.85rem'
                    }}>
                        <p>&copy; {new Date().getFullYear()} Karthikeyan S. All rights reserved.</p>
                    </div>
                </div>
            </footer>

            <style dangerouslySetInnerHTML={{
                __html: `
                .contact-social-btn {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 38px;
                    height: 38px;
                    border-radius: 8px;
                    border: 1px solid var(--border-color);
                    background: var(--bg-card);
                    color: var(--text-secondary);
                    transition: all 0.2s ease;
                }
                .contact-social-btn:hover {
                    color: var(--accent-color);
                    border-color: var(--accent-color);
                    transform: translateY(-2px);
                    box-shadow: 0 4px 10px rgba(0, 127, 120, 0.15);
                }
                .ref-input:focus {
                    outline: none;
                    border-color: var(--accent-color) !important;
                    box-shadow: 0 0 0 3px rgba(0, 127, 120, 0.12) !important;
                }
                .footer-nav-link:hover {
                    color: var(--accent-color) !important;
                }
                @media (max-width: 900px) {
                    .contact-grid { grid-template-columns: 1fr !important; }
                    .footer-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
                }
            ` }} />
        </>
    );
};

export default Contact;
