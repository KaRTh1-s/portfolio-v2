import React, { useEffect, useRef } from 'react';
import { Code, Database, Server, Trophy } from 'lucide-react';

const About = () => {
    const containerRef = useRef(null);

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

    const cards = [
        {
            icon: <Code size={24} />,
            title: 'Full Stack Development',
            desc: 'Java, Spring Boot & React',
            color: 'var(--accent-color)',
            bg: 'rgba(59, 130, 246, 0.1)'
        },
        {
            icon: <Database size={24} />,
            title: 'Database Management',
            desc: 'MySQL & Spring Data JPA',
            color: '#a855f7',
            bg: 'rgba(168, 85, 247, 0.1)'
        },
        {
            icon: <Server size={24} />,
            title: 'DevOps',
            desc: 'Docker & AWS',
            color: '#3b82f6',
            bg: 'rgba(59, 130, 246, 0.1)'
        },
        {
            icon: <Trophy size={24} />,
            title: 'Problem Solving',
            desc: 'LeetCode & HackerRank',
            color: '#3b82f6',
            bg: 'rgba(59, 130, 246, 0.1)'
        }
    ];

    return (
        <section id="about" className="section" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: 700, display: 'inline-block' }} className="gradient-text">About Me</h2>
                    <div style={{ width: '60px', height: '4px', background: 'var(--accent-gradient)', margin: '0.5rem auto 0', borderRadius: '2px' }}></div>
                </div>

                <div ref={containerRef} className="fade-in about-grid" style={{
                    display: 'grid',
                    gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.2fr)',
                    gap: '3rem',
                    alignItems: 'start'
                }}>
                    {/* Text Content */}
                    <div style={{
                        background: 'var(--bg-card)',
                        padding: '2.5rem',
                        borderRadius: '16px',
                        border: '1px solid var(--border-color)'
                    }}>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            Hi! <span role="img" aria-label="wave">👋</span>
                        </h3>

                        <div style={{ color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '1.2rem', lineHeight: '1.8' }}>
                            <p>
                                I am a passionate <strong style={{ color: 'var(--text-primary)' }}>Full Stack Developer</strong> with hands-on experience in building scalable, responsive, and user-focused web applications using <strong style={{ color: 'var(--text-primary)' }}>Java, Spring Boot, React, and MySQL</strong>. I enjoy designing end-to-end solutions that address real-world problems while following clean architecture and best development practices.
                            </p>
                            <p>
                                Currently, I am working on <strong style={{ color: 'var(--text-primary)' }}>RedClu</strong>, a full-stack blood donation assistance platform aimed at improving donor-patient coordination in real hospital scenarios. The system is built with a React frontend and Spring Boot backend, leveraging REST APIs and WebSockets to enable real-time features such as donor-request matching, live chat, and notifications.
                            </p>
                            <p>
                                I have also developed <strong style={{ color: 'var(--text-primary)' }}>ByteInsight</strong>, a smart nutrition tracking application that provides real-time nutritional information for food items. ByteInsight integrates React, Spring Boot, and MySQL, along with an external nutrition API, to deliver accurate and secure nutrition insights.
                            </p>
                            <p>
                                I use <strong style={{ color: 'var(--text-primary)' }}>Docker</strong> to containerize backend and frontend services, ensuring environment consistency, simplified deployment, and smoother integration across development stages. Containerization has helped me improve portability, reduce configuration issues, and follow modern DevOps-friendly workflows.
                            </p>
                            <p>
                                Alongside development, I actively strengthen my problem-solving skills through daily practice on <strong style={{ color: 'var(--text-primary)' }}>LeetCode, HackerRank, and Codeforces</strong>. Consistent problem-solving in Java has improved my understanding of data structures, algorithms, and optimization techniques.
                            </p>
                            <p>
                                Beyond coding, I enjoy learning new tools, exploring system design concepts, and understanding how technology can simplify complex workflows. My goal is to grow as a software engineer, contribute to meaningful projects, and build solutions that create real impact through reliable and well-engineered software.
                            </p>
                        </div>
                    </div>

                    {/* Cards Grid */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, 1fr)',
                        gap: '1.5rem'
                    }}>
                        {cards.map((card, index) => (
                            <div key={index} className="card-hover" style={{
                                background: 'var(--bg-card)',
                                padding: '2rem',
                                borderRadius: '16px',
                                border: '1px solid var(--border-color)',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '1rem',
                                height: '100%',
                                justifyContent: 'center'
                            }}>
                                <div style={{
                                    width: '48px',
                                    height: '48px',
                                    borderRadius: '12px',
                                    background: card.bg,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: card.color,
                                    marginBottom: '0.5rem'
                                }}>
                                    {card.icon}
                                </div>
                                <h4 style={{ fontSize: '1.1rem', fontWeight: 600 }}>{card.title}</h4>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{card.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <style dangerouslySetInnerHTML={{
                __html: `
        @media (max-width: 992px) {
          .about-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 640px) {
          .about-grid > div:last-child { grid-template-columns: 1fr !important; }
        }
      `}} />
        </section>
    );
};

export default About;
