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

    const cards = [
        {
            icon: <Code size={22} />,
            title: 'Full Stack Development',
            desc: 'Java, Spring Boot & React',
            accent: 'var(--accent-color)'
        },
        {
            icon: <Database size={22} />,
            title: 'Database Management',
            desc: 'MySQL & Spring Data JPA',
            accent: 'var(--accent-secondary)'
        },
        {
            icon: <Server size={22} />,
            title: 'DevOps',
            desc: 'Docker & AWS',
            accent: 'var(--accent-color)'
        },
        {
            icon: <Trophy size={22} />,
            title: 'Problem Solving',
            desc: 'LeetCode & HackerRank',
            accent: 'var(--accent-secondary)'
        }
    ];

    return (
        <section id="about" className="section" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div className="container">
                {/* Centered Heading with short teal underline */}
                <div className="section-header">
                    <h2 className="section-title">About Me</h2>
                    <div className="teal-divider" />
                </div>

                <div ref={containerRef} className="fade-in about-grid" style={{
                    display: 'grid',
                    gridTemplateColumns: 'minmax(0, 1.25fr) minmax(0, 1fr)',
                    gap: '2.5rem',
                    alignItems: 'start'
                }}>
                    {/* Text Content Card */}
                    <div className="ref-card" style={{
                        padding: '2.5rem',
                        borderRadius: '16px',
                    }}>
                        <h3 style={{
                            fontSize: '1.4rem',
                            fontWeight: 700,
                            marginBottom: '1.5rem',
                            color: 'var(--text-primary)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                        }}>
                            Hi! <span role="img" aria-label="wave">👋</span>
                        </h3>

                        <div style={{
                            color: 'var(--text-secondary)',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1.25rem',
                            lineHeight: '1.75',
                            fontSize: '1rem'
                        }}>
                            <p>
                                I am a passionate <strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>Full Stack Developer</strong> with hands-on experience in building scalable, responsive, and user-focused web applications using <strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>Java, Spring Boot, React, and MySQL</strong>. I enjoy designing end-to-end solutions that address real-world problems while following clean architecture and best development practices.
                            </p>
                            <p>
                                Currently, I am working on <strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>RedClu</strong>, a full-stack blood donation assistance platform aimed at improving donor-patient coordination in real hospital scenarios. The system is built with a React frontend and Spring Boot backend, leveraging REST APIs and WebSockets to enable real-time features such as donor-request matching, live chat, and notifications.
                            </p>
                            <p>
                                I have also developed <strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>ByteInsight</strong>, a smart nutrition tracking application that provides real-time nutritional information for food items. ByteInsight integrates React, Spring Boot, and MySQL, along with an external nutrition API, to deliver accurate and secure nutrition insights.
                            </p>
                            <p>
                                I use <strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>Docker</strong> to containerize backend and frontend services, ensuring environment consistency, simplified deployment, and smoother integration across development stages. Containerization has helped me improve portability, reduce configuration issues, and follow modern DevOps-friendly workflows.
                            </p>
                            <p>
                                Alongside development, I actively strengthen my problem-solving skills through daily practice on <strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>LeetCode, HackerRank, and Codeforces</strong>. Consistent problem-solving in Java has improved my understanding of data structures, algorithms, and optimization techniques.
                            </p>
                            <p>
                                Beyond coding, I enjoy learning new tools, exploring system design concepts, and understanding how technology can simplify complex workflows. My goal is to grow as a software engineer, contribute to meaningful projects, and build solutions that create real impact through reliable and well-engineered software.
                            </p>
                        </div>
                    </div>

                    {/* Capability Cards Grid */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, 1fr)',
                        gap: '1.25rem'
                    }} className="capability-grid">
                        {cards.map((card, index) => (
                            <div key={index} className="card-hover" style={{
                                padding: '1.75rem',
                                borderRadius: '14px',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '1rem',
                                height: '100%',
                                justifyContent: 'center'
                            }}>
                                <div style={{
                                    width: '44px',
                                    height: '44px',
                                    borderRadius: '10px',
                                    background: 'var(--hover-primary)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: card.accent,
                                    border: '1px solid var(--border-color)'
                                }}>
                                    {card.icon}
                                </div>
                                <div>
                                    <h4 style={{
                                        fontSize: '1.05rem',
                                        fontWeight: 600,
                                        color: 'var(--text-primary)',
                                        marginBottom: '0.35rem'
                                    }}>
                                        {card.title}
                                    </h4>
                                    <p style={{
                                        color: 'var(--text-secondary)',
                                        fontSize: '0.875rem',
                                        lineHeight: 1.5
                                    }}>
                                        {card.desc}
                                    </p>
                                </div>
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
                @media (max-width: 580px) {
                    .capability-grid { grid-template-columns: 1fr !important; }
                }
            ` }} />
        </section>
    );
};

export default About;
