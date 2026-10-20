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
                    }, index * 30);
                }
            },
            { threshold: 0.05, rootMargin: '40px' }
        );
        const currentEl = badgeRef.current;
        if (currentEl) observer.observe(currentEl);
        return () => {
            if (currentEl) observer.unobserve(currentEl);
        };
    }, [index]);

    return (
        <div ref={badgeRef} className="fade-in card-hover" style={{
            background: 'var(--bg-card)',
            borderRadius: '14px',
            padding: '1.75rem 1.25rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: '1.25rem',
            height: '100%'
        }}>
            <div style={{
                width: '110px',
                height: '140px',
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
                        borderRadius: '10px',
                        border: '1px solid var(--border-color)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        position: 'relative'
                    }}>
                        <Trophy size={42} color="var(--accent-color)" style={{ opacity: 0.85, zIndex: 1 }} />
                    </div>
                )}
            </div>

            <div>
                <h4 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
                    {badge.title}
                </h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.825rem', lineHeight: 1.4 }}>
                    {badge.description}
                </p>
            </div>
        </div>
    );
};

const Achievements = () => {
    const leetcodeBadges = [
        { title: '100 Days Badge 2025', description: 'Solving Problems 100+ Days in 2025', image: '/leetcode/100-days.png', imageStyle: { objectFit: 'cover', transform: 'scale(1.3)' } },
        { title: '50 Days Badge 2025', description: 'Solving Problems 50+ Days in 2025', image: '/leetcode/50-days.png', imageStyle: { objectFit: 'cover', transform: 'scale(1.3)' } },
        { title: 'DCC August 2025', description: 'Daily Coding Challenge August', image: '/leetcode/dcc-aug.png', imageStyle: { objectFit: 'cover', transform: 'scale(1.3)' } },
        { title: 'DCC September 2025', description: 'Daily Coding Challenge September', image: '/leetcode/dcc-sep.png', imageStyle: { objectFit: 'cover', transform: 'scale(1.3)' } },
        { title: 'SQL 50', description: 'Completed SQL 50 Problems', image: '/leetcode/sql-50.png', imageStyle: { objectFit: 'cover', transform: 'scale(1.3)' } }
    ];

    const hackerrankBadges = [
        { title: 'SQL', description: 'Certified in SQL', image: '/hackerrank/sql.png' },
        { title: 'Java', description: 'Certified in Java', image: '/hackerrank/java.png' },
        { title: 'C++', description: 'Certified in C++', image: '/hackerrank/cpp.png' },
        { title: 'Problem Solving', description: 'Certified in Problem Solving', image: '/hackerrank/problem-solving.png' }
    ];

    return (
        <section id="achievements" className="section" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div className="container">
                <div className="section-header" style={{ marginBottom: '2.5rem' }}>
                    <h2 className="section-title">Achievements</h2>
                    <div className="teal-divider" />
                </div>

                {/* LeetCode Section */}
                <div style={{ marginBottom: '4.5rem' }}>
                    <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                        <div className="ref-pill" style={{
                            padding: '0.55rem 1.4rem',
                            fontSize: '1rem',
                            fontWeight: 600,
                            gap: '8px',
                            marginBottom: '0.65rem'
                        }}>
                            <SiLeetcode size={18} color="#FFA116" /> LeetCode Achievements
                        </div>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.925rem' }}>
                            Coding challenges and problem-solving badges
                        </p>
                    </div>

                    <div className="badges-grid-5" style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(5, 1fr)',
                        gap: '1.25rem',
                        maxWidth: '1160px',
                        margin: '0 auto'
                    }}>
                        {leetcodeBadges.map((badge, index) => (
                            <Badge key={badge.title} badge={badge} index={index} />
                        ))}
                    </div>
                </div>

                {/* HackerRank Section */}
                <div>
                    <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                        <div className="ref-pill" style={{
                            padding: '0.55rem 1.4rem',
                            fontSize: '1rem',
                            fontWeight: 600,
                            gap: '8px',
                            marginBottom: '0.65rem'
                        }}>
                            <SiHackerrank size={18} color="#2EC866" /> HackerRank Achievements
                        </div>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.925rem' }}>
                            Skill certifications and problem-solving badges
                        </p>
                    </div>

                    <div className="badges-grid-4" style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(4, 1fr)',
                        gap: '1.25rem',
                        maxWidth: '960px',
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
                    .badges-grid-5 { grid-template-columns: repeat(2, 1fr) !important; gap: 0.85rem !important; }
                    .badges-grid-4 { grid-template-columns: repeat(2, 1fr) !important; gap: 0.85rem !important; }
                }
            ` }} />
        </section>
    );
};

export default Achievements;
