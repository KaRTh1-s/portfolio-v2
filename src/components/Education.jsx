import React, { useEffect, useRef } from 'react';
import { GraduationCap, MapPin, Calendar, Check } from 'lucide-react';

const EducationItem = ({ index, data }) => {
    const itemRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, index * 50); // Stagger animation
                }
            },
            { threshold: 0.01, rootMargin: '100px' }
        );
        if (itemRef.current) observer.observe(itemRef.current);
        return () => {
            if (itemRef.current) observer.unobserve(itemRef.current);
        };
    }, [index]);

    return (
        <div ref={itemRef} className="fade-in card-hover" style={{
            background: 'var(--bg-card)',
            borderRadius: '16px',
            border: '1px solid var(--border-color)',
            overflow: 'hidden',
            marginBottom: '2rem'
        }}>
            {/* Top Banner section */}
            <div style={{
                background: data.gradient,
                padding: '2rem',
                color: 'white',
                position: 'relative'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                        <div style={{
                            background: 'rgba(255, 255, 255, 0.2)',
                            padding: '1rem',
                            borderRadius: '12px',
                            backdropFilter: 'blur(5px)'
                        }}>
                            <GraduationCap size={32} color="white" />
                        </div>
                        <div>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0, color: 'white' }}>{data.title}</h3>
                            <p style={{ fontSize: '1.1rem', opacity: 0.9, marginTop: '4px' }}>{data.subtitle}</p>

                            <div style={{ display: 'flex', gap: '1.5rem', marginTop: '1rem', flexWrap: 'wrap' }}>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.9rem', opacity: 0.8 }}>
                                    <MapPin size={16} /> {data.location}
                                </span>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.9rem', opacity: 0.8 }}>
                                    <Calendar size={16} /> {data.period}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div style={{
                        background: 'rgba(255, 255, 255, 0.2)',
                        padding: '1rem',
                        borderRadius: '12px',
                        textAlign: 'center',
                        backdropFilter: 'blur(5px)',
                        minWidth: '100px'
                    }}>
                        <div style={{ fontSize: '0.8rem', opacity: 0.8, textTransform: 'uppercase', letterSpacing: '1px' }}>{data.scoreLabel}</div>
                        <div style={{ fontSize: '1.5rem', fontWeight: 800 }}>{data.score}</div>
                    </div>
                </div>
            </div>

            {/* Details section */}
            <div className="edu-details" style={{
                padding: '2rem',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '2rem'
            }}>
                <div>
                    <h4 style={{
                        fontSize: '1.1rem',
                        fontWeight: 600,
                        marginBottom: '1rem',
                        display: 'flex', alignItems: 'center', gap: '8px'
                    }}>
                        <TrophyIcon /> Achievements
                    </h4>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        {data.achievements.map((ach, i) => (
                            <li key={i} style={{
                                display: 'flex',
                                alignItems: 'flex-start',
                                gap: '8px',
                                marginBottom: '0.8rem',
                                color: 'var(--text-secondary)'
                            }}>
                                <Check size={18} style={{ color: 'var(--accent-color)', flexShrink: 0, marginTop: '2px' }} />
                                {ach}
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1rem' }}>{data.resultsLabel}</h4>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        {data.results.map((res, i) => (
                            <div key={i} style={{
                                background: 'rgba(0, 0, 0, 0.1)',
                                border: '1px solid var(--border-color)',
                                padding: '1rem',
                                borderRadius: '8px'
                            }}>
                                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{res.label}</div>
                                <div style={{ fontSize: '1.2rem', fontWeight: 700 }}>{res.value}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

const TrophyIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
        <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
        <path d="M4 22h16"></path>
        <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>
        <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path>
        <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path>
    </svg>
);

const Education = () => {
    const educationData = [
        {
            title: 'Bachelor of Technology',
            subtitle: 'Artificial Intelligence and Data Science',
            location: 'Sri Krishna College of Engineering and Technology\nCoimbatore, Tamil Nadu, India',
            period: 'Sep 2023 - Sep 2027',
            scoreLabel: 'CGPA',
            score: '8.57/10',
            gradient: 'linear-gradient(135deg, #3b82f6, #9333ea)', // Blue to Purple
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
            gradient: 'linear-gradient(135deg, #a855f7, #ec4899)', // Purple to Pink
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
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: 700, display: 'inline-block' }} className="gradient-text">Education</h2>
                    <div style={{ width: '60px', height: '4px', background: 'var(--accent-gradient)', margin: '0.5rem auto 0', borderRadius: '2px' }}></div>
                </div>

                <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                    {educationData.map((data, index) => (
                        <EducationItem key={index} index={index} data={data} />
                    ))}
                </div>
            </div>
            <style dangerouslySetInnerHTML={{
                __html: `
        @media (max-width: 768px) {
          .edu-details { grid-template-columns: 1fr !important; }
        }
      `}} />
        </section>
    );
};

export default Education;
