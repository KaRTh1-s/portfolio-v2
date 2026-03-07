import React, { useEffect, useRef } from 'react';
import { Trophy } from 'lucide-react';
import { SiLeetcode, SiHackerrank } from 'react-icons/si';

const Badge = ({ badge, index }) => {
    const badgeRef = useRef(null);
    const [imgError, setImgError] = React.useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, index * 40);
                }
            },
            { threshold: 0.01, rootMargin: '100px' }
        );
        if (badgeRef.current) observer.observe(badgeRef.current);
        return () => {
            if (badgeRef.current) observer.unobserve(badgeRef.current);
        };
    }, [index]);

    return (
        <div ref={badgeRef} className="fade-in card-hover" style={{
            background: 'var(--bg-card)',
            borderRadius: '16px',
            border: '1px solid var(--border-color)',
            padding: '2rem 1.5rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: '1.5rem',
            height: '100%'
        }}>
            <div style={{
                width: '120px',
                height: '160px',
                background: 'transparent',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden'
            }}>
                {badge.image && !imgError ? (
                    <img
                        src={badge.image}
                        alt={badge.title}
                        onError={() => setImgError(true)}
                        style={{ width: '100%', height: '100%', objectFit: 'contain', zIndex: 1, ...(badge.imageStyle || {}) }}
                    />
                ) : (
                    <div style={{
                        width: '100%', height: '100%',
                        background: 'var(--bg-secondary)',
                        borderRadius: '12px',
                        border: `2px solid ${badge.color || 'var(--border-color)'}`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        position: 'relative'
                    }}>
                        <div style={{
                            position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                            background: `radial-gradient(circle at center, ${badge.color}20 0%, transparent 70%)`
                        }}></div>
                        <Trophy size={48} color={badge.color} style={{ opacity: 0.8, zIndex: 1 }} />
                    </div>
                )}
            </div>

            <div>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 600, color: badge.color, marginBottom: '0.5rem' }}>{badge.title}</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{badge.description}</p>
            </div>
        </div>
    );
};

const Achievements = () => {
    const leetcodeBadges = [
        { title: '100 Days Badge 2025', description: 'Solving Problems 100+ Days in 2025', color: '#fbbf24', image: '/leetcode/100-days.png', imageStyle: { objectFit: 'cover', transform: 'scale(1.4)' } }, // Yellow
        { title: '50 Days Badge 2025', description: 'Solving Problems 50+ Days in 2025', color: '#4ade80', image: '/leetcode/50-days.png', imageStyle: { objectFit: 'cover', transform: 'scale(1.4)' } }, // Green
        { title: 'DCC August 2025', description: 'Daily Coding Challenge August', color: '#fb923c', image: '/leetcode/dcc-aug.png', imageStyle: { objectFit: 'cover', transform: 'scale(1.4)' } }, // Orange
        { title: 'DCC September 2025', description: 'Daily Coding Challenge September', color: '#f472b6', image: '/leetcode/dcc-sep.png', imageStyle: { objectFit: 'cover', transform: 'scale(1.4)' } }, // Pink
        { title: 'SQL 50', description: 'Completed SQL 50 Problems', color: '#38bdf8', image: '/leetcode/sql-50.png', imageStyle: { objectFit: 'cover', transform: 'scale(1.4)' } } // Light Blue
    ];

    const hackerrankBadges = [
        { title: 'SQL', description: 'Certified in SQL', color: '#64748b', image: '/hackerrank/sql.png' }, // Slate
        { title: 'Java', description: 'Certified in Java', color: '#fbbf24', image: '/hackerrank/java.png' }, // Yellow
        { title: 'C++', description: 'Certified in C++', color: '#3b82f6', image: '/hackerrank/cpp.png' }, // Blue
        { title: 'Problem Solving', description: 'Certified in Problem Solving', color: '#2dd4bf', image: '/hackerrank/problem-solving.png' } // Teal
    ];

    return (
        <section id="achievements" className="section" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div className="container">

                {/* LeetCode Section */}
                <div style={{ marginBottom: '6rem' }}>
                    <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                        <div style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '10px',
                            padding: '0.8rem 2rem',
                            background: '#fbbf24',
                            color: '#000',
                            borderRadius: '30px',
                            fontWeight: 700,
                            fontSize: '1.2rem',
                            marginBottom: '1rem'
                        }}>
                            <SiLeetcode size={24} /> LeetCode Achievements
                        </div>
                        <p style={{ color: 'var(--text-secondary)' }}>Coding challenges and problem-solving badges</p>
                    </div>

                    <div className="badges-grid-5" style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(5, 1fr)',
                        gap: '1.5rem',
                        maxWidth: '1200px',
                        margin: '0 auto'
                    }}>
                        {leetcodeBadges.map((badge, index) => (
                            <Badge key={badge.title} badge={badge} index={index} />
                        ))}
                    </div>
                </div>

                {/* HackerRank Section */}
                <div>
                    <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                        <div style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '10px',
                            padding: '0.8rem 2rem',
                            background: '#2dd4bf', // Teal for HackerRank
                            color: '#000',
                            borderRadius: '30px',
                            fontWeight: 700,
                            fontSize: '1.2rem',
                            marginBottom: '1rem'
                        }}>
                            <SiHackerrank size={24} /> HackerRank Achievements
                        </div>
                        <p style={{ color: 'var(--text-secondary)' }}>Skill certifications and problem-solving badges</p>
                    </div>

                    <div className="badges-grid-4" style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(4, 1fr)',
                        gap: '1.5rem',
                        maxWidth: '1000px',
                        margin: '0 auto'
                    }}>
                        {hackerrankBadges.map((badge, index) => (
                            <Badge key={badge.title} badge={badge} index={index} />
                        ))}
                    </div>
                </div>

            </div>
            <style dangerouslySetInnerHTML={{
                __html: `
        @media (max-width: 1024px) {
          .badges-grid-5 { grid-template-columns: repeat(3, 1fr) !important; }
          .badges-grid-4 { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 640px) {
          .badges-grid-5 { grid-template-columns: repeat(2, 1fr) !important; }
          .badges-grid-4 { grid-template-columns: 1fr !important; }
        }
      `}} />
        </section>
    );
};

export default Achievements;
