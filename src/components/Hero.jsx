import React, { useEffect, useRef } from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';
import { Sparkles, MapPin, Briefcase } from 'lucide-react';

const Hero = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            },
            { threshold: 0.05 }
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
        <section id="home" className="section" style={{
            minHeight: '92vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: '110px',
            paddingBottom: '4rem',
            position: 'relative',
            overflow: 'hidden'
        }}>
            <div className="container">
                <div
                    ref={containerRef}
                    className="fade-in hero-container"
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textAlign: 'center',
                        maxWidth: '820px',
                        margin: '0 auto',
                        position: 'relative',
                        zIndex: 2,
                    }}
                >
                    {/* Reference-style subtle status badge */}
                    <div className="ref-pill" style={{ marginBottom: '1.5rem', gap: '8px' }}>
                        <span style={{
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',
                            backgroundColor: 'var(--accent-color)',
                            display: 'inline-block'
                        }} />
                        <span style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Hello, I am</span>
                    </div>

                    {/* Name and Professional Title */}
                    <h1 style={{
                        fontSize: 'clamp(2.75rem, 6vw, 4.25rem)',
                        fontWeight: 800,
                        lineHeight: 1.15,
                        color: 'var(--text-primary)',
                        letterSpacing: '-0.03em',
                        marginBottom: '0.65rem'
                    }}>
                        Karthikeyan S
                    </h1>

                    <h2 style={{
                        fontSize: 'clamp(1.35rem, 3vw, 2rem)',
                        fontWeight: 600,
                        color: 'var(--accent-color)',
                        marginBottom: '1rem',
                        letterSpacing: '-0.015em'
                    }}>
                        Full Stack Developer
                    </h2>

                    {/* Short teal accent line beneath the principal heading */}
                    <div style={{
                        width: '52px',
                        height: '3px',
                        backgroundColor: 'var(--accent-color)',
                        borderRadius: '2px',
                        marginBottom: '1.75rem'
                    }} />

                    {/* Description */}
                    <p style={{
                        fontSize: '1.15rem',
                        color: 'var(--text-secondary)',
                        lineHeight: 1.7,
                        maxWidth: '620px',
                        marginBottom: '2rem'
                    }}>
                        Passionate about creating amazing web experiences, solving complex problems, and building scalable applications.
                    </p>

                    {/* Role Tags inspired by reference pills */}
                    <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        gap: '0.65rem',
                        marginBottom: '2.5rem'
                    }}>
                        <span className="ref-pill">
                            <Briefcase size={14} color="var(--accent-color)" /> Full Stack & Backend
                        </span>
                        <span className="ref-pill">
                            <MapPin size={14} color="var(--accent-color)" /> Coimbatore, India
                        </span>
                        <span className="ref-pill">
                            <Sparkles size={14} color="var(--accent-color)" /> Java · Spring Boot · React
                        </span>
                    </div>

                    {/* Action Buttons */}
                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '2.5rem' }}>
                        <a href="#contact" className="btn-primary">
                            Let's Connect
                        </a>
                        <a href="#projects" className="btn-outline">
                            View Work
                        </a>
                    </div>

                    {/* Social Icons */}
                    <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center', justifyContent: 'center' }}>
                        <a
                            href="https://github.com/KaRTh1-s"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hero-social-link"
                            aria-label="GitHub"
                        >
                            <FaGithub size={22} />
                        </a>
                        <a
                            href="https://www.linkedin.com/in/karthikeyan-s-86457b290"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hero-social-link"
                            aria-label="LinkedIn"
                        >
                            <FaLinkedin size={22} />
                        </a>
                        <a
                            href="https://leetcode.com/u/K_a_R_T_h_I/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hero-social-link"
                            aria-label="LeetCode"
                        >
                            <SiLeetcode size={22} />
                        </a>
                    </div>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                .hero-social-link {
                    color: var(--text-secondary);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 42px;
                    height: 42px;
                    border-radius: 10px;
                    border: 1px solid var(--border-color);
                    background: var(--bg-card);
                    transition: all 0.2s ease;
                }
                .hero-social-link:hover {
                    color: var(--accent-color);
                    border-color: var(--accent-color);
                    transform: translateY(-2px);
                    box-shadow: 0 4px 12px rgba(0, 127, 120, 0.18);
                }
            ` }} />
        </section>
    );
};

export default Hero;
