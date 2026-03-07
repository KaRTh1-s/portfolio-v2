import React, { useEffect, useRef, useState } from 'react';
import { MapPin, Phone, Mail, Github, Linkedin, Facebook, Instagram, Download, CheckCircle } from 'lucide-react';

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
                }, 5000); // hide success message after 5 seconds
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
            { threshold: 0.1 }
        );
        if (leftRef.current) observer.observe(leftRef.current);
        if (rightRef.current) observer.observe(rightRef.current);
        return () => {
            if (leftRef.current) observer.unobserve(leftRef.current);
            if (rightRef.current) observer.unobserve(rightRef.current);
        };
    }, []);

    return (
        <>
            {/* Success Popup */}
            <div style={{
                position: 'fixed',
                top: showSuccess ? '20px' : '-100px',
                left: '50%',
                transform: 'translateX(-50%)',
                background: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                padding: '1rem 2rem',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
                zIndex: 9999,
                transition: 'top 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
            }}>
                <CheckCircle color="var(--accent-color)" size={24} />
                <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Thank you for contacting me! Message sent successfully.</span>
            </div>
            <section id="contact" className="section" style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingBottom: '2rem' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: 700, display: 'inline-block' }} className="gradient-text">Let's Connect</h2>
                        <div style={{ width: '60px', height: '4px', background: 'var(--accent-gradient)', margin: '0.5rem auto 0', borderRadius: '2px' }}></div>
                    </div>

                    <div className="contact-grid" style={{
                        display: 'grid',
                        gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.5fr)',
                        gap: '2rem',
                        alignItems: 'start',
                        maxWidth: '1000px',
                        margin: '0 auto'
                    }}>
                        {/* Contact Info (Left) */}
                        <div ref={leftRef} className="fade-in" style={{
                            background: 'var(--bg-card)',
                            borderRadius: '16px',
                            border: '1px solid var(--border-color)',
                            padding: '2.5rem',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '2rem'
                        }}>
                            <h3 style={{ fontSize: '1.3rem', fontWeight: 600 }}>Contact Information</h3>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                    <div style={{ background: 'rgba(59, 130, 246, 0.1)', color: 'var(--accent-color)', padding: '0.8rem', borderRadius: '12px' }}>
                                        <MapPin size={24} />
                                    </div>
                                    <div>
                                        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Address</p>
                                        <p style={{ fontWeight: 600 }}>Coimbatore, Tamil Nadu, India</p>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                    <div style={{ background: 'rgba(59, 130, 246, 0.1)', color: 'var(--accent-color)', padding: '0.8rem', borderRadius: '12px' }}>
                                        <Phone size={24} />
                                    </div>
                                    <div>
                                        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Mobile</p>
                                        <p style={{ fontWeight: 600 }}>+91 9344667748</p>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                    <div style={{ background: 'rgba(59, 130, 246, 0.1)', color: 'var(--accent-color)', padding: '0.8rem', borderRadius: '12px' }}>
                                        <Mail size={24} />
                                    </div>
                                    <div>
                                        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Email</p>
                                        <p style={{ fontWeight: 600 }}>karthiselvaraj.dec13@gmail.com</p>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1rem', fontWeight: 600 }}>Social Media</p>
                                <div style={{ display: 'flex', gap: '1rem' }}>
                                    <a href="https://github.com/KaRTh1-s" target="_blank" rel="noopener noreferrer" className="social-box">
                                        <Github size={20} />
                                    </a>
                                    <a href="https://www.linkedin.com/in/karthikeyan-s-86457b290" target="_blank" rel="noopener noreferrer" className="social-box" style={{ background: '#0077b5', color: 'white', borderColor: '#0077b5' }}>
                                        <Linkedin size={20} />
                                    </a>
                                    <a href="https://www.facebook.com/profile.php?id=100077635540839" target="_blank" rel="noopener noreferrer" className="social-box" style={{ background: '#1877f2', color: 'white', borderColor: '#1877f2' }}>
                                        <Facebook size={20} />
                                    </a>
                                    <a href="https://www.instagram.com/s._k_a_r_t_h_i_/" target="_blank" rel="noopener noreferrer" className="social-box" style={{ background: '#e1306c', color: 'white', borderColor: '#e1306c' }}>
                                        <Instagram size={20} />
                                    </a>
                                </div>
                            </div>

                            <a href="https://drive.google.com/uc?export=download&id=1cjUqvc1relc5HkV0ZZ7OL13Ni-wH8KUc" target="_blank" rel="noopener noreferrer" style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '8px',
                                padding: '1rem',
                                borderRadius: '8px',
                                color: 'white',
                                fontWeight: 600,
                                transition: 'transform 0.2s ease, opacity 0.2s ease',
                                marginTop: '1rem'
                            }} className="gradient-bg btn-hover">
                                <Download size={20} /> Download Resume
                            </a>
                        </div>

                        {/* Form (Right) */}
                        <div ref={rightRef} className="fade-in" style={{
                            background: 'var(--bg-card)',
                            borderRadius: '16px',
                            border: '1px solid var(--border-color)',
                            padding: '2.5rem'
                        }}>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '2rem' }}>Send me a message</h3>

                            <form className="contact-form" onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    <label style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Your Name</label>
                                    <input type="text" name="name" required placeholder="John Doe" style={{
                                        padding: '1rem',
                                        borderRadius: '8px',
                                        border: '1px solid var(--border-color)',
                                        background: 'var(--bg-secondary)',
                                        color: 'var(--text-primary)',
                                        fontFamily: 'inherit'
                                    }} className="input-field" />
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    <label style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Your Email</label>
                                    <input type="email" name="email" required placeholder="john@example.com" style={{
                                        padding: '1rem',
                                        borderRadius: '8px',
                                        border: '1px solid var(--border-color)',
                                        background: 'var(--bg-secondary)',
                                        color: 'var(--text-primary)',
                                        fontFamily: 'inherit'
                                    }} className="input-field" />
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    <label style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Your Message</label>
                                    <textarea name="message" required placeholder="Tell me about your project or how we can collaborate..." rows="5" style={{
                                        padding: '1rem',
                                        borderRadius: '8px',
                                        border: '1px solid var(--border-color)',
                                        background: 'var(--bg-secondary)',
                                        color: 'var(--text-primary)',
                                        fontFamily: 'inherit',
                                        resize: 'vertical'
                                    }} className="input-field"></textarea>
                                </div>

                                <button type="submit" disabled={isSubmitting} style={{
                                    padding: '1rem',
                                    borderRadius: '8px',
                                    color: 'white',
                                    fontWeight: 600,
                                    fontSize: '1rem',
                                    transition: 'transform 0.2s ease, opacity 0.2s ease',
                                    marginTop: '1rem',
                                    opacity: isSubmitting ? 0.7 : 1,
                                    cursor: isSubmitting ? 'not-allowed' : 'pointer'
                                }} className="gradient-bg btn-hover">
                                    {isSubmitting ? 'Sending...' : 'Send Message'}
                                </button>

                                {result && <span style={{ color: 'var(--text-secondary)', textAlign: 'center', marginTop: '0.5rem', fontSize: '0.9rem' }}>{result}</span>}
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer embedded within Contact file to simplify App.jsx */}
            <footer style={{ background: 'var(--bg-card)', borderTop: '1px solid var(--border-color)', padding: '4rem 0 2rem' }}>
                <div className="container">
                    <div className="footer-grid" style={{
                        display: 'grid',
                        gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr) minmax(0, 1.5fr)',
                        gap: '3rem',
                        marginBottom: '3rem'
                    }}>
                        <div>
                            <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '1rem', color: 'var(--accent-color)' }}>
                                KARTHIKEYAN S
                            </h2>
                            <p style={{ color: 'var(--text-secondary)', maxWidth: '300px', lineHeight: 1.6 }}>
                                Full Stack Developer passionate about creating amazing web experiences.
                            </p>
                        </div>

                        <div>
                            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1.5rem' }}>Quick Links</h3>
                            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                                {['Home', 'About', 'Education', 'Skills', 'Projects', 'Contact'].map(link => (
                                    <li key={link}>
                                        <a href={`#${link.toLowerCase()}`} className="footer-link" style={{ color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.2s ease' }}>
                                            {link}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1.5rem' }}>Get in Touch</h3>
                            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem', color: 'var(--text-secondary)' }}>
                                <li>+91 9344667748</li>
                                <li>Coimbatore, Tamil Nadu, India</li>
                                <li style={{ marginTop: '0.5rem' }}>
                                    <a href="https://drive.google.com/uc?export=download&id=1cjUqvc1relc5HkV0ZZ7OL13Ni-wH8KUc" target="_blank" rel="noopener noreferrer" style={{
                                        display: 'inline-block',
                                        padding: '0.6rem 1.2rem',
                                        background: 'var(--accent-color)',
                                        color: 'white',
                                        borderRadius: '6px',
                                        fontWeight: 600,
                                        fontSize: '0.9rem',
                                        textDecoration: 'none'
                                    }}>Download Resume</a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div style={{
                        borderTop: '1px solid var(--border-color)',
                        paddingTop: '2rem',
                        textAlign: 'center',
                        color: 'var(--text-secondary)',
                        fontSize: '0.9rem'
                    }}>
                        <p>&copy; {new Date().getFullYear()} Karthikeyan S. All rights reserved.</p>
                    </div>
                </div>
            </footer>
            <style dangerouslySetInnerHTML={{
                __html: `
        .social-box {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 8px;
          border: 1px solid var(--border-color);
          color: var(--text-primary);
          transition: transform 0.2s ease, opacity 0.2s ease;
        }
        .social-box:hover {
          transform: translateY(-3px);
          opacity: 0.9;
        }
        .input-field:focus {
          outline: none;
          border-color: var(--accent-color);
        }
        .footer-link:hover {
          color: var(--accent-color) !important;
        }
        @media (max-width: 900px) {
          .contact-grid { grid-template-columns: 1fr !important; }
          .footer-grid { grid-template-columns: 1fr !important; gap: 2rem; }
        }
      `}} />
        </>
    );
};

export default Contact;
