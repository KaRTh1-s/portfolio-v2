import React, { useEffect, useRef } from 'react';

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

    const scrollToProject = (e, projectId) => {
        e.preventDefault();
        const targetEl = document.getElementById(projectId);
        if (targetEl) {
            const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            targetEl.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'center' });
            targetEl.classList.remove('card-target-highlight');
            void targetEl.offsetWidth;
            targetEl.classList.add('card-target-highlight');
            setTimeout(() => {
                targetEl.classList.remove('card-target-highlight');
            }, 2000);
            window.history.pushState(null, '', `#${projectId}`);
        }
    };

    return (
        <section id="about" className="section" style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">About Me</h2>
                    <div className="teal-divider" />
                </div>

                <div
                    ref={containerRef}
                    className="fade-in about-single-card"
                    style={{
                        maxWidth: '68ch',
                        margin: '0 auto',
                        width: '100%'
                    }}
                >
                    <div className="ref-card" style={{
                        padding: '2.5rem',
                        borderRadius: '16px',
                        background: 'var(--bg-card)',
                        border: '1px solid var(--border-color)',
                        boxShadow: 'var(--shadow-card)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1.25rem'
                    }}>
                        <p style={{
                            color: 'var(--text-secondary)',
                            fontSize: '1.05rem',
                            lineHeight: '1.8',
                            margin: 0
                        }}>
                            I am a final-year B.Tech student in <strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>Artificial Intelligence and Data Science</strong> at Sri Krishna College of Engineering and Technology (SKCET), Coimbatore. I am interested in backend engineering, full-stack development, and practical software development.
                        </p>

                        <p style={{
                            color: 'var(--text-secondary)',
                            fontSize: '1.05rem',
                            lineHeight: '1.8',
                            margin: 0
                        }}>
                            My main backend technologies include <strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>Java</strong> and <strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>Spring Boot</strong>. I work with REST APIs, relational databases, application authentication, and security. I also develop user interfaces using <strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>React</strong>, JavaScript, HTML, and CSS.
                        </p>

                        <p style={{
                            color: 'var(--text-secondary)',
                            fontSize: '1.05rem',
                            lineHeight: '1.8',
                            margin: 0
                        }}>
                            <a
                                href="#project-byteinsight"
                                onClick={(e) => scrollToProject(e, 'project-byteinsight')}
                                className="about-inline-link"
                                aria-label="Jump to ByteInsight project"
                            >
                                ByteInsight
                            </a>{' '}
                            is one of my full-stack projects, combining React, Spring Boot, and MySQL for nutrition tracking and meal management. I have also worked on{' '}
                            <a
                                href="#project-cloudsync"
                                onClick={(e) => scrollToProject(e, 'project-cloudsync')}
                                className="about-inline-link"
                                aria-label="Jump to CloudSync project"
                            >
                                CloudSync
                            </a>
                            , a multi-cloud file management project developed during my Infosys Springboard internship, and other projects involving machine learning and AI-based applications.
                        </p>

                        <p style={{
                            color: 'var(--text-secondary)',
                            fontSize: '1.05rem',
                            lineHeight: '1.8',
                            margin: 0
                        }}>
                            I regularly practise data structures and algorithms through <strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>LeetCode</strong> and <strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>HackerRank</strong>. I am continuing to improve my software engineering skills while exploring large language models and retrieval-augmented generation (RAG).
                        </p>
                    </div>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                .about-inline-link {
                    color: var(--accent-color);
                    font-weight: 600;
                    text-decoration: underline;
                    text-decoration-thickness: 1.5px;
                    text-underline-offset: 3px;
                    cursor: pointer;
                    transition: color 0.2s ease, opacity 0.2s ease;
                }
                .about-inline-link:hover, .about-inline-link:focus-visible {
                    color: var(--accent-hover);
                    opacity: 0.85;
                }
                @media (max-width: 640px) {
                    .about-single-card .ref-card {
                        padding: 1.75rem 1.25rem !important;
                    }
                    .about-single-card p {
                        font-size: 0.975rem !important;
                        line-height: 1.75 !important;
                    }
                }
            ` }} />
        </section>
    );
};

export default About;
