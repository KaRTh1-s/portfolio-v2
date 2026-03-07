import React, { useEffect, useRef } from 'react';
import { FaGithub, FaLinkedin, FaCoffee } from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';

const Hero = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            },
            { threshold: 0.1 }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => {
            if (containerRef.current) observer.unobserve(containerRef.current);
        };
    }, []);

    return (
        <section id="home" className="section" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', paddingTop: '80px' }}>
            <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                <div ref={containerRef} className="fade-in" style={{ maxWidth: '800px' }}>
                    <h2 style={{ fontSize: '1.5rem', color: 'var(--accent-color)', marginBottom: '1rem', fontWeight: 600 }}>
                        Hello, I am
                    </h2>
                    <h1 style={{ fontSize: '4rem', fontWeight: 800, marginBottom: '1rem', lineHeight: 1.2 }}>
                        Karthikeyan S<br />
                        <span className="gradient-text">Full Stack Developer</span>
                    </h1>
                    <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
                        Passionate about creating amazing web experiences, solving complex problems, and building scalable applications.
                    </p>

                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '3rem' }}>
                        <a href="#contact" style={{
                            padding: '0.8rem 2rem',
                            borderRadius: '8px',
                            fontWeight: 600,
                            display: 'inline-block',
                            transition: 'transform 0.2s ease, opacity 0.2s ease'
                        }} className="gradient-bg btn-hover">
                            Let's Connect
                        </a>
                        <a href="#projects" style={{
                            padding: '0.8rem 2rem',
                            borderRadius: '8px',
                            fontWeight: 600,
                            display: 'inline-block',
                            backgroundColor: 'var(--bg-card)',
                            border: '1px solid var(--border-color)',
                            transition: 'transform 0.2s ease'
                        }} className="btn-hover">
                            View Work
                        </a>
                    </div>

                    <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
                        <a href="https://github.com/KaRTh1-s" target="_blank" rel="noopener noreferrer" className="social-icon">
                            <FaGithub size={28} />
                        </a>
                        <a href="https://www.linkedin.com/in/karthikeyan-s-86457b290" target="_blank" rel="noopener noreferrer" className="social-icon">
                            <FaLinkedin size={28} />
                        </a>
                        <a href="https://leetcode.com/u/K_a_R_T_h_I/" target="_blank" rel="noopener noreferrer" className="social-icon">
                            <SiLeetcode size={28} />
                        </a>
                    </div>
                </div>
            </div>
            <style dangerouslySetInnerHTML={{
                __html: `
        .social-icon {
          color: var(--text-secondary);
          transition: color 0.3s ease, transform 0.3s ease;
        }
        .social-icon:hover {
          color: var(--accent-color);
          transform: translateY(-3px);
        }
        .btn-hover:hover {
          transform: translateY(-2px);
          opacity: 0.9;
        }
        @media (max-width: 768px) {
          h1 { font-size: 2.5rem !important; }
        }
      `}} />
        </section>
    );
};

export default Hero;
