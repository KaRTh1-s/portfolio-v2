import React, { useEffect, useRef } from 'react';
import { ExternalLink, Play, Cloud, Droplet, User, CloudRain, Github, Apple } from 'lucide-react';

const ProjectCard = ({ project, index }) => {
    const cardRef = useRef(null);

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
        if (cardRef.current) observer.observe(cardRef.current);
        return () => {
            if (cardRef.current) observer.unobserve(cardRef.current);
        };
    }, [index]);

    return (
        <div ref={cardRef} className="fade-in card-hover" style={{
            background: 'var(--bg-card)',
            borderRadius: '16px',
            border: '1px solid var(--border-color)',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            height: '100%'
        }}>
            <div style={{
                height: '220px',
                backgroundColor: project.imgPlaceholderBg || 'var(--bg-secondary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative'
            }}>
                {project.badge && (
                    <div style={{
                        position: 'absolute',
                        top: '1rem',
                        left: '1rem',
                        padding: '0.4rem 0.8rem',
                        background: project.badgeColor || 'var(--accent-gradient)',
                        color: 'white',
                        borderRadius: '20px',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        zIndex: 2
                    }}>
                        {project.badge}
                    </div>
                )}
                <div style={{
                    position: 'absolute',
                    top: 0, left: 0, right: 0, bottom: 0,
                    background: 'radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, transparent 60%)'
                }}></div>
                {project.placeholderIcon && (
                    <div style={{
                        color: 'rgba(255, 255, 255, 0.4)',
                        transform: 'scale(1.5)',
                        transition: 'transform 0.3s ease',
                        zIndex: 1
                    }} className="project-icon-hover">
                        {project.placeholderIcon}
                    </div>
                )}
            </div>

            <div style={{ padding: '2rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>{project.title}</h3>
                <h4 style={{ fontSize: '1.1rem', color: 'var(--accent-color)', fontWeight: 500, marginBottom: '1rem' }}>{project.subtitle}</h4>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '0.95rem', lineHeight: 1.6 }}>{project.description}</p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2rem' }}>
                    {project.tags.map(tag => (
                        <span key={tag} style={{
                            padding: '0.3rem 0.8rem',
                            background: 'var(--bg-secondary)',
                            border: '1px solid var(--border-color)',
                            borderRadius: '20px',
                            fontSize: '0.8rem',
                            color: 'var(--text-secondary)'
                        }}>
                            {tag}
                        </span>
                    ))}
                </div>

                <ul style={{ listStyle: 'none', padding: 0, marginBottom: '2rem', flex: 1 }}>
                    {project.features.map((feature, i) => (
                        <li key={i} style={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: '8px',
                            marginBottom: '0.6rem',
                            color: 'var(--text-secondary)',
                            fontSize: '0.9rem'
                        }}>
                            <span style={{ color: 'var(--accent-color)', marginTop: '2px' }}>▸</span>
                            {feature}
                        </li>
                    ))}
                </ul>

                <div style={{ display: 'flex', gap: '1rem', marginTop: 'auto' }}>
                    {project.buttons.map((btn, i) => (
                        <a key={i} href={btn.link} target="_blank" rel="noopener noreferrer" style={{
                            flex: 1,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px',
                            padding: '0.8rem',
                            borderRadius: '8px',
                            color: 'white',
                            fontWeight: 600,
                            transition: 'transform 0.2s ease, opacity 0.2s ease',
                            background: btn.gradient || 'var(--accent-color)',
                            border: btn.outline ? '1px solid var(--border-color)' : 'none'
                        }} className="btn-hover">
                            {btn.icon === 'doc' ? <ExternalLink size={18} /> : btn.icon === 'github' ? <Github size={18} /> : <Play size={18} />}
                            {btn.label}
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
};

const Projects = () => {
    const projectsData = [
        {
            title: 'ByteInsight',
            subtitle: 'Smart Nutrition Tracker',
            description: 'An intelligent full-stack nutrition tracking application providing real-time nutritional insights. Seamlessly integrates with Spoonacular API to deliver accurate data on calories and macronutrients.',
            tags: ['React.js', 'Spring Boot', 'MySQL', 'Spoonacular API', 'Axios', 'Spring Data JPA'],
            features: [
                'Real-time nutritional data fetching using Spoonacular API',
                'Secure user authentication with password encryption',
                'Interactive food search and detailed nutritional breakdown',
                'Scalable RESTful backend with Spring Boot and MySQL'
            ],
            badge: 'New',
            imgPlaceholderBg: '#065f46',
            placeholderIcon: <Apple size={64} color="#10b981" />,
            buttons: [
                { label: 'Source Code', icon: 'github', link: 'https://github.com/KaRTh1-s/ByteInsight', gradient: 'linear-gradient(135deg, #10b981, #059669)' }
            ]
        },
        {
            title: 'CloudSync',
            subtitle: 'Multi-cloud File Storage Application',
            description: 'Infosys Internship 5.0 - A web application integrating Google Drive & OneDrive to manage files seamlessly from a single interface, improving productivity, file organization, and storage management.',
            tags: ['React.js', 'Spring Boot', 'MySQL', 'Google Drive API', 'OneDrive API', 'Git'],
            features: [
                'Seamless integration with Google Drive & OneDrive using OAuth 2.0',
                'Unified file management: upload, download, delete, move, rename',
                'Cross-platform accessibility via web interface',
                'Backup & sync between cloud platforms'
            ],
            badge: 'Featured',
            imgPlaceholderBg: '#0b162c',
            placeholderIcon: <Cloud size={64} />,
            buttons: [
                { label: 'View Documentation', icon: 'doc', link: 'https://docs.google.com/document/d/1bkguwLhvV9q5JTXc_x65JWckywcctCPk/edit?usp=sharing&ouid=100395741747953207405&rtpof=true&sd=true', gradient: 'linear-gradient(135deg, #3b82f6, #2563eb)' }
            ]
        },
        {
            title: 'RedClu',
            subtitle: 'Blood Donation Assistance Platform',
            description: 'RedClu is a full-stack blood donation assistance platform designed to connect blood donors and patients through a structured, real-time workflow. It addresses practical challenges in hospital environments such as finding compatible donors quickly.',
            tags: ['React.js', 'Spring Boot', 'Java', 'MySQL', 'REST APIs', 'WebSockets'],
            features: [
                'Developed a full-stack application using React and Spring Boot',
                'Implemented donor-request matching based on blood group compatibility',
                'Integrated real-time chat functionality using WebSockets',
                'Built a notification system to track matches, messages, and updates'
            ],
            badge: 'Currently in Development',
            badgeColor: '#fbbf24', // Yellow
            imgPlaceholderBg: '#1e1b18',
            placeholderIcon: <Droplet size={64} color="#ef4444" />,
            buttons: [] // Removed Codebase button
        },
        {
            title: 'Portfolio',
            subtitle: 'Personal Portfolio Website',
            description: 'A responsive, modern portfolio website to showcase my entire skills and efficiency with optimized layout structure. Designed with clarity and professionalism, it serves as a comprehensive snapshot of my technical expertise.',
            tags: ['React.js', 'EmailJS', 'CSS3', 'HTML5', 'React Icons'],
            features: [
                'Built with React.js and custom CSS system',
                'Includes sections: Home, About, Education, Skills, Projects, Experience',
                'Responsive layout for mobile, desktop and all devices',
                'Integrated contact form with EmailJS for messages'
            ],
            imgPlaceholderBg: '#212529',
            placeholderIcon: <User size={64} color="#ec4899" />,
            buttons: [
                { label: 'Live Demo', icon: 'play', link: 'https://karthikeyan-portfolio-dev.netlify.app/', gradient: 'linear-gradient(135deg, #ec4899, #db2777)' }
            ]
        },
        {
            title: 'WeatherFinder',
            subtitle: 'Real-Time Weather Forecast Application',
            description: 'WeatherFinder is a modern, responsive React application that provides real-time weather information for any city worldwide. It is designed with a clean user interface and smooth user experience.',
            tags: ['React.js', 'OpenWeather API', 'JavaScript', 'CSS3', 'HTML5'],
            features: [
                'City-based weather search using OpenWeather API',
                'Displays temperature, humidity, wind speed, and weather conditions',
                'Dark and light mode toggle for enhanced user experience',
                'Responsive design optimized for mobile and desktop screens'
            ],
            imgPlaceholderBg: '#1a365d',
            placeholderIcon: <CloudRain size={64} color="#60a5fa" />,
            buttons: [
                { label: 'View Documentation', icon: 'doc', link: 'https://docs.google.com/document/d/1J6Ls1ERlBejpB0P-2k6cGYorChCXUI4g/edit?usp=sharing&ouid=100395741747953207405&rtpof=true&sd=true', gradient: 'linear-gradient(135deg, #3b82f6, #2563eb)' },
                { label: 'Live Demo', icon: 'play', link: 'https://weatherfinder-v1.netlify.app/', gradient: 'linear-gradient(135deg, #a855f7, #ec4899)' }
            ]
        }
    ];

    return (
        <section id="projects" className="section" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: 700, display: 'inline-block' }} className="gradient-text">Projects</h2>
                    <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>Building innovative solutions to real-world problems</p>
                    <div style={{ width: '60px', height: '4px', background: 'var(--accent-gradient)', margin: '1rem auto 0', borderRadius: '2px' }}></div>
                </div>

                <div className="projects-grid" style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: '2.5rem',
                    maxWidth: '1200px',
                    margin: '0 auto'
                }}>
                    {projectsData.map((project, index) => (
                        <ProjectCard key={index} project={project} index={index} />
                    ))}
                </div>
            </div>
            <style dangerouslySetInnerHTML={{
                __html: `
        .project-icon-hover {
            transform: scale(1);
        }
        .card-hover:hover .project-icon-hover {
            transform: scale(1.1);
        }
        @media (max-width: 992px) {
          .projects-grid { grid-template-columns: 1fr !important; }
        }
      `}} />
        </section>
    );
};

export default Projects;
