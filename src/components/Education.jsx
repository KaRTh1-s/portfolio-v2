import React, { useEffect, useRef } from 'react';
import { GraduationCap, MapPin, Calendar, Check, Trophy } from 'lucide-react';

const EducationItem = ({ index, data }) => {
    const itemRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, index * 40);
                }
            },
            { threshold: 0.05, rootMargin: '60px' }
        );
        const currentEl = itemRef.current;
        if (currentEl) observer.observe(currentEl);
        return () => {
            if (currentEl) observer.unobserve(currentEl);
        };
    }, [index]);

    return (
        <div ref={itemRef} className="fade-in card-hover" style={{
            background: 'var(--bg-card)',
            borderRadius: '16px',
            overflow: 'hidden',
            marginBottom: '2rem',
            padding: '2rem 2.25rem'
        }}>
            {/* Header section (Replaces bright gradient with clean Xellara layout) */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                gap: '1.5rem',
                flexWrap: 'wrap',
                paddingBottom: '1.75rem',
                borderBottom: '1px solid var(--border-color)'
            }}>
                <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start', flex: 1, minWidth: 0 }}>
                    <div style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '12px',
                        background: 'var(--hover-primary)',
                        border: '1px solid var(--border-color)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--accent-color)',
                        flexShrink: 0
                    }}>
                        <GraduationCap size={26} />
                    </div>
                    <div style={{ minWidth: 0, flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '4px' }}>
                            <h3 style={{ fontSize: '1.4rem', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>
                                {data.title}
                            </h3>
                        </div>
                        <p style={{ fontSize: '1.05rem', color: 'var(--accent-color)', fontWeight: 500, margin: '2px 0 0.75rem' }}>
                            {data.subtitle}
                        </p>

                        <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <MapPin size={15} color="var(--accent-color)" /> {data.location.replace('\n', ', ')}
                            </span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <Calendar size={15} color="var(--accent-color)" /> {data.period}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Score Pill Badge */}
                <div className="ref-pill" style={{
                    padding: '0.6rem 1.25rem',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '12px',
                    minWidth: '120px',
                    textAlign: 'center',
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)'
                }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>
                        {data.scoreLabel}
                    </span>
                    <span style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--accent-color)', marginTop: '2px' }}>
                        {data.score}
                    </span>
                </div>
            </div>

            {/* Details section */}
            <div className="edu-details" style={{
                paddingTop: '1.75rem',
                display: 'grid',
                gridTemplateColumns: '1.1fr 1fr',
                gap: '2.5rem'
            }}>
                {/* Achievements */}
                <div>
                    <h4 style={{
                        fontSize: '1rem',
                        fontWeight: 600,
                        marginBottom: '1rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        color: 'var(--text-primary)'
                    }}>
                        <Trophy size={18} color="var(--accent-color)" /> Achievements
                    </h4>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        {data.achievements.map((ach, i) => (
                            <li key={i} style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                                marginBottom: '0.65rem',
                                color: 'var(--text-secondary)',
                                fontSize: '0.925rem'
                            }}>
                                <span style={{
                                    width: '20px',
                                    height: '20px',
                                    borderRadius: '50%',
                                    background: 'var(--hover-primary)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexShrink: 0
                                }}>
                                    <Check size={12} color="var(--accent-color)" strokeWidth={3} />
                                </span>
                                {ach}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Results Metrics */}
                <div>
                    <h4 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--text-primary)' }}>
                        {data.resultsLabel}
                    </h4>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(90px, 1fr))', gap: '0.85rem' }}>
                        {data.results.map((res, i) => (
                            <div key={i} style={{
                                background: 'var(--bg-secondary)',
                                border: '1px solid var(--border-color)',
                                padding: '0.75rem 0.85rem',
                                borderRadius: '10px',
                                textAlign: 'center'
                            }}>
                                <div style={{ fontSize: '0.775rem', color: 'var(--text-secondary)', fontWeight: 500, marginBottom: '2px' }}>
                                    {res.label}
                                </div>
                                <div style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                                    {res.value}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

const Education = () => {
    const educationData = [
        {
            title: 'Bachelor of Technology',
            subtitle: 'Artificial Intelligence and Data Science',
            location: 'Sri Krishna College of Engineering and Technology\nCoimbatore, Tamil Nadu, India',
            period: 'Sep 2023 - Sep 2027',
            scoreLabel: 'CGPA',
            score: '8.63/10',
            achievements: ['iamneo java Programmer', 'CIA top performer', 'Technical Awards'],
            resultsLabel: 'Semester Results (SGPA)',
            results: [
                { label: 'Sem 1', value: '8.33' },
                { label: 'Sem 2', value: '8.46' },
                { label: 'Sem 3', value: '8.56' },
                { label: 'Sem 4', value: '9.00' },
            ]
        },
        {
            title: 'Higher Secondary - 12th',
            subtitle: 'Bio-Maths',
            location: 'De Britto Hr Sec School\nDevakottai, Tamil Nadu, India',
            period: 'Jun 2022 - Apr 2023',
            scoreLabel: 'Score',
            score: '569/600 (94.8%)',
            achievements: ['Rank holder', 'Art & cultural awards', 'Science Fair Awards'],
            resultsLabel: 'Subject Reports',
            results: [
                { label: 'Physics', value: '100' },
                { label: 'Chemistry', value: '100' },
            ]
        }
    ];

    return (
        <section id="education" className="section" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Education</h2>
                    <div className="teal-divider" />
                </div>

                <div style={{ maxWidth: '960px', margin: '0 auto' }}>
                    {educationData.map((data, index) => (
                        <EducationItem key={index} index={index} data={data} />
                    ))}
                </div>
            </div>
            <style dangerouslySetInnerHTML={{
                __html: `
                @media (max-width: 768px) {
                    .edu-details { grid-template-columns: 1fr !important; gap: 1.5rem !important; }
                }
            ` }} />
        </section>
    );
};

export default Education;
