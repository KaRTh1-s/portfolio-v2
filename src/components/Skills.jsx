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
                    }, index * 25);
                }
            },
            { threshold: 0.05, rootMargin: '40px' }
        );
        const currentEl = cardRef.current;
        if (currentEl) observer.observe(currentEl);
        return () => {
            if (currentEl) observer.unobserve(currentEl);
        };
    }, [index]);

    return (
        <div ref={cardRef} className="fade-in card-hover" style={{
            background: 'var(--bg-card)',
            borderRadius: '14px',
            padding: '1.75rem 1.25rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.85rem',
            cursor: 'default',
            height: '100%'
        }}>
            <div style={{
                color: skill.color,
                fontSize: '2.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'transform 0.25s ease'
            }} className="skill-icon">
                {skill.icon}
            </div>
            <span style={{
                fontWeight: 600,
                color: 'var(--text-primary)',
                fontSize: '0.925rem',
                textAlign: 'center'
            }}>
                {skill.name}
            </span>
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
        { name: 'DSA', icon: <FiCode />, color: '#007F78' },
        { name: 'Docker', icon: <FaDocker />, color: '#2496ED' },
        { name: 'Git', icon: <FaGitAlt />, color: '#F05032' },
        { name: 'REST API', icon: <FaDatabase />, color: '#10b981' },
        { name: 'MySQL', icon: <FaDatabase />, color: '#4479A1' },
        { name: 'DBMS', icon: <FaDatabase />, color: '#007F78' },
        { name: 'AWS', icon: <FaAws />, color: '#FF9900' },
        { name: 'Linux Admin', icon: <FaLinux />, color: '#FCC624' },
        { name: 'Networking', icon: <FaNetworkWired />, color: '#008CA0' },
        { name: 'Prompt Eng', icon: <FaBrain />, color: '#8b5cf6' }
    ];

    return (
        <section id="skills" className="section" style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Skills</h2>
                    <div className="teal-divider" />
                    <p className="section-subtitle">Technologies and tools I work with</p>
                </div>

                <div className="skills-grid" style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, 1fr)',
                    gap: '1.25rem',
                    maxWidth: '960px',
                    margin: '0 auto'
                }}>
                    {skills.map((skill, index) => (
                        <SkillCard key={skill.name} skill={skill} index={index} />
                    ))}
                </div>
            </div>
            <style dangerouslySetInnerHTML={{
                __html: `
                .card-hover:hover .skill-icon {
                    transform: translateY(-2px);
                }
                @media (max-width: 900px) {
                    .skills-grid { grid-template-columns: repeat(3, 1fr) !important; }
                }
                @media (max-width: 600px) {
                    .skills-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 0.85rem !important; }
                }
            ` }} />
        </section>
    );
};

export default Skills;
