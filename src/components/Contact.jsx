import React, { useEffect, useRef, useState, useMemo } from 'react';
import { MapPin, Mail, Github, Linkedin, Send, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { SiLeetcode } from 'react-icons/si';
import emailjs from '@emailjs/browser';

const Contact = () => {
    const leftRef = useRef(null);
    const rightRef = useRef(null);

    // Dynamic anti-scraping email assembly
    const emailParts = useMemo(() => ({
        user: 'karthiselvaraj.dec13',
        domain: 'gmail.com'
    }), []);
    const emailAddress = `${emailParts.user}@${emailParts.domain}`;

    const [formValues, setFormValues] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [submissionState, setSubmissionState] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error' | 'unconfigured'
    const [feedbackMessage, setFeedbackMessage] = useState('');

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    const isConfigured = Boolean(serviceId && templateId && publicKey);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues(prev => ({ ...prev, [name]: value }));
        if (submissionState !== 'idle') {
            setSubmissionState('idle');
            setFeedbackMessage('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const trimmedName = formValues.name.trim();
        const trimmedEmail = formValues.email.trim();
        const trimmedMessage = formValues.message.trim();

        // Validation
        if (!trimmedName || !trimmedEmail || !trimmedMessage) {
            setSubmissionState('error');
            setFeedbackMessage('Please fill in all required fields.');
            return;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(trimmedEmail)) {
            setSubmissionState('error');
            setFeedbackMessage('Please enter a valid email address.');
            return;
        }

        // Check if EmailJS configuration is provided
        if (!isConfigured) {
            setSubmissionState('unconfigured');
            setFeedbackMessage('EmailJS is not yet configured with environment variables (VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, VITE_EMAILJS_PUBLIC_KEY). Please connect directly via email below.');
            return;
        }

        setSubmissionState('loading');
        setFeedbackMessage('');

        try {
            const templateParams = {
                from_name: trimmedName,
                name: trimmedName,
                reply_to: trimmedEmail,
                email: trimmedEmail,
                message: trimmedMessage
            };

            const response = await emailjs.send(
                serviceId,
                templateId,
                templateParams,
                publicKey
            );

            if (response.status === 200 || response.text === 'OK') {
                setSubmissionState('success');
                setFeedbackMessage('Thank you! Your message has been sent successfully.');
                setFormValues({ name: '', email: '', message: '' });
            } else {
                throw new Error(response.text || 'EmailJS submission rejected');
            }
        } catch (err) {
            setSubmissionState('error');
            setFeedbackMessage(
                err?.text || err?.message || 'Unable to deliver message through EmailJS. Please connect directly via email:'
            );
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

    const mailtoFallback = `mailto:${emailAddress}?subject=${encodeURIComponent(`Portfolio Message from ${formValues.name || 'Visitor'}`)}&body=${encodeURIComponent(formValues.message || '')}`;

    return (
        <>
            <section id="contact" className="section" style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingBottom: '4rem' }}>
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">Let's Connect</h2>
                        <div className="teal-divider" />
                        <p className="section-subtitle">Get in touch for internships, engineering roles, or collaborations</p>
                    </div>

                    <div className="contact-grid" style={{
                        display: 'grid',
                        gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.4fr)',
                        gap: '2.5rem',
                        alignItems: 'start',
                        maxWidth: '1000px',
                        margin: '0 auto'
                    }}>
                        {/* Contact Information Card */}
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
                                {/* Location */}
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

                                {/* Email - Displayed exactly once across site */}
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
                                        <a
                                            href={`mailto:${emailAddress}`}
                                            style={{
                                                fontWeight: 600,
                                                color: 'var(--text-primary)',
                                                fontSize: '0.95rem',
                                                wordBreak: 'break-all',
                                                textDecoration: 'none'
                                            }}
                                            className="contact-email-link"
                                        >
                                            {emailAddress}
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* Social Profiles: GitHub, LinkedIn, LeetCode only */}
                            <div>
                                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.85rem', fontWeight: 600 }}>
                                    Social Profiles
                                </p>
                                <div style={{ display: 'flex', gap: '0.75rem' }}>
                                    <a
                                        href="https://github.com/KaRTh1-s"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="contact-social-btn"
                                        aria-label="GitHub profile"
                                    >
                                        <Github size={18} />
                                    </a>
                                    <a
                                        href="https://www.linkedin.com/in/karthikeyan-s-86457b290/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="contact-social-btn"
                                        aria-label="LinkedIn profile"
                                    >
                                        <Linkedin size={18} />
                                    </a>
                                    <a
                                        href="https://leetcode.com/u/K_a_R_T_h_I/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="contact-social-btn"
                                        aria-label="LeetCode profile"
                                    >
                                        <SiLeetcode size={17} />
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Send Message Form Card */}
                        <div ref={rightRef} className="fade-in ref-card" style={{
                            padding: '2.25rem',
                            minWidth: 0
                        }}>
                            <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
                                Send me a message
                            </h3>

                            <form
                                onSubmit={handleSubmit}
                                noValidate
                                style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
                            >
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                                    <label htmlFor="contact-name" style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                                        Name
                                    </label>
                                    <input
                                        id="contact-name"
                                        type="text"
                                        name="name"
                                        required
                                        value={formValues.name}
                                        onChange={handleChange}
                                        placeholder="Your name"
                                        className="ref-input"
                                        style={{
                                            padding: '0.85rem 1rem',
                                            borderRadius: '8px',
                                            border: '1px solid var(--border-color)',
                                            background: 'var(--bg-secondary)',
                                            color: 'var(--text-primary)',
                                            fontSize: '0.95rem',
                                            fontFamily: 'inherit'
                                        }}
                                    />
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                                    <label htmlFor="contact-email" style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                                        Email address
                                    </label>
                                    <input
                                        id="contact-email"
                                        type="email"
                                        name="email"
                                        required
                                        value={formValues.email}
                                        onChange={handleChange}
                                        placeholder="Your email"
                                        className="ref-input"
                                        style={{
                                            padding: '0.85rem 1rem',
                                            borderRadius: '8px',
                                            border: '1px solid var(--border-color)',
                                            background: 'var(--bg-secondary)',
                                            color: 'var(--text-primary)',
                                            fontSize: '0.95rem',
                                            fontFamily: 'inherit'
                                        }}
                                    />
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                                    <label htmlFor="contact-message" style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                                        Message
                                    </label>
                                    <textarea
                                        id="contact-message"
                                        name="message"
                                        required
                                        rows="4"
                                        value={formValues.message}
                                        onChange={handleChange}
                                        placeholder="What would you like to talk about?"
                                        className="ref-input"
                                        style={{
                                            padding: '0.85rem 1rem',
                                            borderRadius: '8px',
                                            border: '1px solid var(--border-color)',
                                            background: 'var(--bg-secondary)',
                                            color: 'var(--text-primary)',
                                            fontSize: '0.95rem',
                                            fontFamily: 'inherit',
                                            resize: 'vertical'
                                        }}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={submissionState === 'loading'}
                                    className="btn-primary"
                                    style={{
                                        marginTop: '0.5rem',
                                        padding: '0.85rem 1.5rem',
                                        opacity: submissionState === 'loading' ? 0.7 : 1,
                                        cursor: submissionState === 'loading' ? 'not-allowed' : 'pointer',
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '8px'
                                    }}
                                >
                                    <Send size={16} />
                                    {submissionState === 'loading' ? 'Sending...' : 'Send Message'}
                                </button>

                                {/* Submission Alerts */}
                                {submissionState === 'success' && (
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                        padding: '0.75rem 1rem',
                                        borderRadius: '8px',
                                        background: 'var(--accent-subtle)',
                                        border: '1px solid var(--accent-color)',
                                        color: 'var(--accent-color)',
                                        fontSize: '0.875rem',
                                        fontWeight: 500
                                    }}>
                                        <CheckCircle size={18} />
                                        <span>{feedbackMessage}</span>
                                    </div>
                                )}

                                {submissionState === 'unconfigured' && (
                                    <div style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '6px',
                                        padding: '0.85rem 1rem',
                                        borderRadius: '8px',
                                        background: 'rgba(217, 119, 6, 0.1)',
                                        border: '1px solid rgba(217, 119, 6, 0.4)',
                                        color: 'var(--text-primary)',
                                        fontSize: '0.875rem'
                                    }}>
                                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', color: '#D97706' }}>
                                            <Info size={18} style={{ flexShrink: 0, marginTop: '2px' }} />
                                            <span>{feedbackMessage}</span>
                                        </div>
                                        <a
                                            href={mailtoFallback}
                                            style={{
                                                color: 'var(--accent-color)',
                                                fontWeight: 600,
                                                textDecoration: 'underline',
                                                marginLeft: '26px'
                                            }}
                                        >
                                            Send directly via {emailAddress}
                                        </a>
                                    </div>
                                )}

                                {submissionState === 'error' && (
                                    <div style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '6px',
                                        padding: '0.75rem 1rem',
                                        borderRadius: '8px',
                                        background: 'rgba(239, 68, 68, 0.1)',
                                        border: '1px solid rgba(239, 68, 68, 0.4)',
                                        color: '#EF4444',
                                        fontSize: '0.875rem',
                                        fontWeight: 500
                                    }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <AlertCircle size={18} />
                                            <span>{feedbackMessage}</span>
                                        </div>
                                        <a
                                            href={mailtoFallback}
                                            style={{
                                                color: 'var(--accent-color)',
                                                fontWeight: 600,
                                                textDecoration: 'underline',
                                                marginLeft: '26px'
                                            }}
                                        >
                                            Send directly via {emailAddress}
                                        </a>
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* Clean Minimal One-Line Footer */}
            <footer style={{
                background: 'var(--bg-secondary)',
                borderTop: '1px solid var(--border-color)',
                padding: '1.5rem 0',
                width: '100%'
            }}>
                <div className="container" style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '1rem'
                }}>
                    <p style={{
                        margin: 0,
                        fontSize: '0.9rem',
                        fontWeight: 500,
                        color: 'var(--text-secondary)'
                    }}>
                        &copy; 2026 Karthikeyan S
                    </p>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <a
                            href="https://github.com/KaRTh1-s"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="contact-social-btn"
                            aria-label="GitHub"
                        >
                            <Github size={16} />
                        </a>
                        <a
                            href="https://www.linkedin.com/in/karthikeyan-s-86457b290/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="contact-social-btn"
                            aria-label="LinkedIn"
                        >
                            <Linkedin size={16} />
                        </a>
                        <a
                            href="https://leetcode.com/u/K_a_R_T_h_I/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="contact-social-btn"
                            aria-label="LeetCode"
                        >
                            <SiLeetcode size={16} />
                        </a>
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
                .contact-social-btn:focus-visible, .contact-email-link:focus-visible {
                    outline: 2px solid var(--accent-color);
                    outline-offset: 2px;
                }
                .contact-email-link:hover {
                    color: var(--accent-color) !important;
                }
                .ref-input:focus {
                    outline: none;
                    border-color: var(--accent-color) !important;
                    box-shadow: 0 0 0 3px rgba(0, 127, 120, 0.12) !important;
                }
                @media (max-width: 900px) {
                    .contact-grid { grid-template-columns: 1fr !important; }
                }
            ` }} />
        </>
    );
};

export default Contact;
