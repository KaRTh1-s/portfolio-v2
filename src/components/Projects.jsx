import React, { useEffect, useRef, useState } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { featuredProjects, moreProjects } from '../data/projects';

// Glob all prospective project screenshot images from src/assets/projects
const projectImages = import.meta.glob('../assets/projects/*.{webp,png,jpg,jpeg}', {
    eager: true,
    import: 'default'
});

const ScreenshotSlot = ({ slug, title }) => {
    const [imgFailed, setImgFailed] = useState(false);
    
    // Look up dynamically imported image if present in src/assets/projects
    const imagePath = `../assets/projects/${slug}.webp`;
    const imageSrc = projectImages[imagePath];

    return (
        <div
            style={{
                width: '100%',
                aspectRatio: '16 / 10',
                backgroundColor: 'var(--bg-secondary)',
                borderBottom: '1px solid var(--border-color)',
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            {imageSrc && !imgFailed ? (
                <img
                    src={imageSrc}
                    alt={`${title} project preview`}
                    loading="lazy"
                    width="800"
                    height="500"
                    onError={() => setImgFailed(true)}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block'
                    }}
                />
            ) : (
                /* Neutral placeholder - no icons, clean architectural blueprint lines */
                <div
                    style={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.4rem',
                        backgroundColor: 'var(--bg-secondary)',
                        position: 'relative'
                    }}
                >
                    <div
                        style={{
                            position: 'absolute',
                            inset: 0,
                            opacity: 0.04,
                            backgroundImage: 'linear-gradient(var(--text-primary) 1px, transparent 1px), linear-gradient(90deg, var(--text-primary) 1px, transparent 1px)',
                            backgroundSize: '24px 24px'
                        }}
                    />
                    <span
                        style={{
                            fontSize: '0.8rem',
                            fontWeight: 500,
                            letterSpacing: '0.04em',
                            textTransform: 'uppercase',
                            color: 'var(--text-muted)',
                            zIndex: 1
                        }}
                    >
                        Screenshot preview (16:10)
                    </span>
                    <span
                        style={{
                            fontSize: '0.72rem',
                            color: 'var(--text-muted)',
                            opacity: 0.75,
                            zIndex: 1
                        }}
                    >
                        src/assets/projects/{slug}.webp
                    </span>
                </div>
            )}
        </div>
    );
};

const FeaturedCard = ({ project, index }) => {
    const cardRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, index * 50);
                }
            },
            { threshold: 0.05, rootMargin: '60px' }
        );
        const currentEl = cardRef.current;
        if (currentEl) observer.observe(currentEl);
        return () => {
            if (currentEl) observer.unobserve(currentEl);
        };
    }, [index]);

    const hasLive = Boolean(project.liveUrl && project.liveUrl.trim().length > 0);
    const hasCode = Boolean(project.codeUrl && project.codeUrl.trim().length > 0);

    return (
        <div
            id={project.id}
            ref={cardRef}
            className="fade-in card-hover project-featured-card"
            style={{
                background: 'var(--bg-card)',
                borderRadius: '16px',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                height: '100%',
                border: '1px solid var(--border-color)',
                boxShadow: 'var(--shadow-card)'
            }}
        >
            <ScreenshotSlot slug={project.slug} title={project.title} />

            <div style={{ padding: '2rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                {/* Header: Title, Subtitle, and Status */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', marginBottom: '0.65rem' }}>
                    <div>
                        <h3 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                            {project.title}
                        </h3>
                        {project.subtitle && (
                            <h4 style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--accent-color)', margin: '0.2rem 0 0 0' }}>
                                {project.subtitle}
                            </h4>
                        )}
                    </div>
                    <span
                        style={{
                            padding: '0.2rem 0.65rem',
                            borderRadius: '9999px',
                            fontSize: '0.725rem',
                            fontWeight: 600,
                            letterSpacing: '0.02em',
                            textTransform: 'uppercase',
                            background: project.status === 'In progress' ? 'rgba(217, 119, 6, 0.12)' : 'var(--accent-subtle)',
                            color: project.status === 'In progress' ? '#D97706' : 'var(--accent-color)',
                            border: `1px solid ${project.status === 'In progress' ? 'rgba(217, 119, 6, 0.3)' : 'var(--accent-color)'}`,
                            whiteSpace: 'nowrap'
                        }}
                    >
                        {project.status || 'Shipped'}
                    </span>
                </div>

                {/* One-line summary */}
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.925rem', lineHeight: 1.5, marginBottom: '1.5rem' }}>
                    {project.summary}
                </p>

                {/* Four Labeled Sections */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem', marginBottom: '1.75rem', flex: 1 }}>
                    {/* Problem */}
                    <div>
                        <span style={{ fontSize: '0.775rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--accent-color)', display: 'block', marginBottom: '0.25rem' }}>
                            Problem
                        </span>
                        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                            {project.problem}
                        </p>
                    </div>

                    {/* What I built */}
                    <div>
                        <span style={{ fontSize: '0.775rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--accent-color)', display: 'block', marginBottom: '0.25rem' }}>
                            What I Built
                        </span>
                        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                            {project.whatIBuilt}
                        </p>
                    </div>

                    {/* Stack (tags) */}
                    <div>
                        <span style={{ fontSize: '0.775rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--accent-color)', display: 'block', marginBottom: '0.4rem' }}>
                            Stack
                        </span>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                            {project.stack.map(tag => (
                                <span
                                    key={tag}
                                    style={{
                                        padding: '0.2rem 0.65rem',
                                        background: 'var(--bg-secondary)',
                                        border: '1px solid var(--border-color)',
                                        borderRadius: '9999px',
                                        fontSize: '0.775rem',
                                        fontWeight: 500,
                                        color: 'var(--text-secondary)'
                                    }}
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Result */}
                    <div>
                        <span style={{ fontSize: '0.775rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--accent-color)', display: 'block', marginBottom: '0.25rem' }}>
                            Result
                        </span>
                        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                            {project.result}
                        </p>
                    </div>
                </div>

                {/* Buttons: GitHub Code and Live Demo */}
                {(hasLive || hasCode) && (
                    <div style={{ display: 'flex', gap: '0.75rem', marginTop: 'auto', paddingTop: '0.75rem', borderTop: '1px solid var(--border-light)' }}>
                        {hasCode && (
                            <a
                                href={project.codeUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-outline"
                                style={{
                                    flex: 1,
                                    padding: '0.65rem 1rem',
                                    fontSize: '0.85rem',
                                    textAlign: 'center',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '6px'
                                }}
                            >
                                <Github size={15} /> GitHub Code
                            </a>
                        )}
                        {hasLive && (
                            <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-primary"
                                style={{
                                    flex: 1,
                                    padding: '0.65rem 1rem',
                                    fontSize: '0.85rem',
                                    textAlign: 'center',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '6px'
                                }}
                            >
                                <ExternalLink size={15} /> Live Demo
                            </a>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

const Projects = () => {
    return (
        <section id="projects" className="section" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Projects</h2>
                    <div className="teal-divider" />
                    <p className="section-subtitle">Selected engineering projects and full-stack systems</p>
                </div>

                {/* Featured Projects Grid */}
                <div
                    className="projects-featured-grid"
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                        gap: '2rem',
                        maxWidth: '1160px',
                        margin: '0 auto 4rem'
                    }}
                >
                    {featuredProjects.map((project, index) => (
                        <FeaturedCard key={project.id} project={project} index={index} />
                    ))}
                </div>

                {/* More Projects Index */}
                {moreProjects.length > 0 && (
                    <div style={{ maxWidth: '1160px', margin: '0 auto', width: '100%' }}>
                        <div style={{ marginBottom: '1.25rem' }}>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
                                More Projects
                            </h3>
                            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', margin: 0 }}>
                                Compact archive of additional web tools and applications.
                            </p>
                        </div>

                        <div
                            className="ref-card"
                            style={{
                                overflow: 'hidden',
                                borderRadius: '12px',
                                border: '1px solid var(--border-color)',
                                background: 'var(--bg-card)'
                            }}
                        >
                            <div className="more-projects-table-wrap" style={{ overflowX: 'auto' }}>
                                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '600px' }}>
                                    <thead>
                                        <tr style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)' }}>
                                            <th style={{ padding: '0.85rem 1.25rem', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                                                Project
                                            </th>
                                            <th style={{ padding: '0.85rem 1.25rem', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                                                Description
                                            </th>
                                            <th style={{ padding: '0.85rem 1.25rem', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                                                Stack
                                            </th>
                                            <th style={{ padding: '0.85rem 1.25rem', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em', textAlign: 'right' }}>
                                                Link
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {moreProjects.map((item) => (
                                            <tr
                                                key={item.id}
                                                id={item.id}
                                                style={{ borderBottom: '1px solid var(--border-light)' }}
                                            >
                                                <td style={{ padding: '1rem 1.25rem', fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.925rem', whiteSpace: 'nowrap' }}>
                                                    {item.name}
                                                </td>
                                                <td style={{ padding: '1rem 1.25rem', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                                                    {item.description}
                                                </td>
                                                <td style={{ padding: '1rem 1.25rem' }}>
                                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                                                        {item.stack.map(tech => (
                                                            <span
                                                                key={tech}
                                                                style={{
                                                                    fontSize: '0.725rem',
                                                                    padding: '0.15rem 0.5rem',
                                                                    background: 'var(--bg-secondary)',
                                                                    border: '1px solid var(--border-color)',
                                                                    borderRadius: '9999px',
                                                                    color: 'var(--text-secondary)'
                                                                }}
                                                            >
                                                                {tech}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </td>
                                                <td style={{ padding: '1rem 1.25rem', textAlign: 'right', whiteSpace: 'nowrap' }}>
                                                    {item.codeUrl ? (
                                                        <a
                                                            href={item.codeUrl}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            style={{
                                                                display: 'inline-flex',
                                                                alignItems: 'center',
                                                                gap: '6px',
                                                                color: 'var(--accent-color)',
                                                                fontWeight: 600,
                                                                fontSize: '0.85rem'
                                                            }}
                                                        >
                                                            <Github size={14} /> GitHub Code
                                                        </a>
                                                    ) : (
                                                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>—</span>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                @media (max-width: 880px) {
                    .projects-featured-grid {
                        grid-template-columns: 1fr !important;
                    }
                }
            ` }} />
        </section>
    );
};

export default Projects;
