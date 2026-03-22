import React, { useEffect, useRef } from 'react';
import { FaHtml5, FaCss3Alt, FaBootstrap, FaReact, FaJava, FaDocker, FaGitAlt, FaDatabase, FaAws, FaLeaf, FaLinux, FaNetworkWired, FaBrain } from 'react-icons/fa';
import { FiCode } from 'react-icons/fi';

const SkillCard = ({ skill, index }) => {
    const cardRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, index * 30);
                }
            },
            { threshold: 0.01, rootMargin: '50px' }
        );
        if (cardRef.current) observer.observe(cardRef.current);
        return () => {
            if (cardRef.current) observer.unobserve(cardRef.current);
        };
    }, [index]);

    return (
        <div ref={cardRef} className="fade-in card-hover" style={{
            background: 'var(--bg-card)',
            borderRadius: '16px',
            border: '2px solid var(--border-color)',
            padding: '2rem 1.5rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
            cursor: 'default'
        }}>
            <div style={{
                color: skill.color,
                fontSize: '3rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'transform 0.3s ease'
            }} className="skill-icon">
                {skill.icon}
            </div>
            <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{skill.name}</span>
        </div>
    );
};

const Skills = () => {
    const skills = [
        { name: 'HTML', icon: <FaHtml5 />, color: '#E34F26' },
        { name: 'CSS', icon: <FaCss3Alt />, color: '#1572B6' },
        { name: 'Bootstrap', icon: <FaBootstrap />, color: '#7952B3' },
        { name: 'React', icon: <FaReact />, color: '#61DAFB' },
        { name: 'Java', icon: <FaJava />, color: '#007396' },
        { name: 'Spring Boot', icon: <FaLeaf />, color: '#6DB33F' },
        { name: 'DSA', icon: <FiCode />, color: '#3b82f6' },
        { name: 'Docker', icon: <FaDocker />, color: '#2496ED' },
        { name: 'Git', icon: <FaGitAlt />, color: '#F05032' },
        { name: 'REST API', icon: <FaDatabase />, color: '#10b981' },
        { name: 'MySQL', icon: <FaDatabase />, color: '#4479A1' },
        { name: 'DBMS', icon: <FaDatabase />, color: '#78350f' },
        { name: 'AWS', icon: <FaAws />, color: '#FF9900' },
        { name: 'Linux Admin', icon: <FaLinux />, color: '#FCC624' },
        { name: 'Networking', icon: <FaNetworkWired />, color: '#3b82f6' },
        { name: 'Prompt Eng', icon: <FaBrain />, color: '#ec4899' }
    ];

    return (
        <section id="skills" className="section" style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: 700, display: 'inline-block' }} className="gradient-text">Skills</h2>
                    <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>Technologies and tools I work with</p>
                    <div style={{ width: '60px', height: '4px', background: 'var(--accent-gradient)', margin: '1rem auto 0', borderRadius: '2px' }}></div>
                </div>

                <div className="skills-grid" style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, 1fr)',
                    gap: '1.5rem',
                    maxWidth: '1000px',
                    margin: '0 auto'
                }}>
                    {skills.map((skill, index) => (
                        <SkillCard key={skill.name} skill={skill} index={index} />
                    ))}
                </div>
            </div>
            <style dangerouslySetInnerHTML={{
                __html: `
        .skill-icon:hover {
          transform: scale(1.1);
        }
        @media (max-width: 900px) {
          .skills-grid { grid-template-columns: repeat(3, 1fr) !important; }
        }
        @media (max-width: 640px) {
          .skills-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}} />
        </section>
    );
};

export default Skills;
