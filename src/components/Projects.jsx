import React, { useEffect, useRef, useState } from 'react';
import { ExternalLink, Play, Cloud, CloudRain, Github, Apple, Sparkles, ScanFace, X, Workflow, ArrowRight } from 'lucide-react';

const ProjectCard = ({ project, index, onOpenMethodology }) => {
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
            { threshold: 0.05, rootMargin: '60px' }
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
            borderRadius: '16px',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            height: '100%'
        }}>
            {/* Minimal visual header preview */}
            <div style={{
                height: '140px',
                backgroundColor: 'var(--bg-secondary)',
                borderBottom: '1px solid var(--border-color)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden'
            }}>
                {/* Background soft geometric pattern */}
                <div style={{
                    position: 'absolute',
                    top: 0, left: 0, right: 0, bottom: 0,
                    opacity: 0.05,
                    backgroundImage: 'radial-gradient(var(--text-primary) 1px, transparent 1px)',
                    backgroundSize: '16px 16px'
                }} />

                {project.badge && (
                    <div style={{
                        position: 'absolute',
                        top: '1rem',
                        left: '1rem',
                        zIndex: 2
                    }}>
                        <span className="ref-pill" style={{
                            fontSize: '0.75rem',
                            padding: '0.25rem 0.75rem',
                            fontWeight: 600,
                            color: 'var(--accent-color)',
                            borderColor: 'var(--accent-color)'
                        }}>
                            <Sparkles size={12} /> {project.badge}
                        </span>
                    </div>
                )}

                {project.placeholderIcon && (
                    <div style={{
                        color: 'var(--accent-color)',
                        opacity: 0.85,
                        transform: 'scale(1.2)',
                        transition: 'transform 0.3s ease',
                        zIndex: 1
                    }} className="project-icon-hover">
                        {project.placeholderIcon}
                    </div>
                )}
            </div>

            <div style={{ padding: '2rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '0.35rem', color: 'var(--text-primary)' }}>
                    {project.title}
                </h3>
                <h4 style={{ fontSize: '1rem', color: 'var(--accent-color)', fontWeight: 500, marginBottom: '1rem' }}>
                    {project.subtitle}
                </h4>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '0.925rem', lineHeight: 1.65 }}>
                    {project.description}
                </p>

                {/* Technology Pills */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem', marginBottom: '1.75rem' }}>
                    {project.tags.map(tag => (
                        <span key={tag} style={{
                            padding: '0.25rem 0.75rem',
                            background: 'var(--bg-secondary)',
                            border: '1px solid var(--border-color)',
                            borderRadius: '9999px',
                            fontSize: '0.775rem',
                            fontWeight: 500,
                            color: 'var(--text-secondary)'
                        }}>
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Feature Bullet Points */}
                <ul style={{ listStyle: 'none', padding: 0, marginBottom: '2rem', flex: 1 }}>
                    {project.features.map((feature, i) => (
                        <li key={i} style={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: '8px',
                            marginBottom: '0.6rem',
                            color: 'var(--text-secondary)',
                            fontSize: '0.875rem',
                            lineHeight: 1.5
                        }}>
                            <span style={{ color: 'var(--accent-color)', fontSize: '0.8rem', marginTop: '2px', flexShrink: 0 }}>▸</span>
                            {feature}
                        </li>
                    ))}
                </ul>

                {/* Action Buttons */}
                <div style={{ display: 'flex', gap: '0.85rem', marginTop: 'auto', flexWrap: 'wrap' }}>
                    {project.buttons && project.buttons.map((btn, i) => {
                        const Icon = btn.icon === 'github' ? Github : btn.icon === 'play' ? Play : btn.icon === 'workflow' ? Workflow : ExternalLink;
                        if (btn.action === 'open_methodology') {
                            return (
                                <button
                                    key={i}
                                    type="button"
                                    onClick={() => onOpenMethodology(project)}
                                    className="btn-outline"
                                    style={{
                                        flex: 1,
                                        padding: '0.65rem 1rem',
                                        fontSize: '0.875rem',
                                        minWidth: '130px',
                                        fontFamily: 'inherit'
                                    }}
                                >
                                    <Icon size={15} />
                                    {btn.label}
                                </button>
                            );
                        }
                        return (
                            <a
                                key={i}
                                href={btn.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-outline"
                                style={{
                                    flex: 1,
                                    padding: '0.65rem 1rem',
                                    fontSize: '0.875rem',
                                    minWidth: '130px'
                                }}
                            >
                                <Icon size={15} />
                                {btn.label}
                            </a>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

const Projects = () => {
    const [selectedMethodologyProject, setSelectedMethodologyProject] = useState(null);

    // Lock body scroll when methodology modal is open
    useEffect(() => {
        if (selectedMethodologyProject) {
            document.body.style.overflow = 'hidden';
            const handleKeyDown = (e) => {
                if (e.key === 'Escape') setSelectedMethodologyProject(null);
            };
            window.addEventListener('keydown', handleKeyDown);
            return () => {
                document.body.style.overflow = 'unset';
                window.removeEventListener('keydown', handleKeyDown);
            };
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [selectedMethodologyProject]);

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
            placeholderIcon: <Apple size={52} color="var(--accent-color)" />,
            buttons: [
                { label: 'Source Code', icon: 'github', link: 'https://github.com/KaRTh1-s/ByteInsight' }
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
            placeholderIcon: <Cloud size={52} color="var(--accent-color)" />,
            buttons: [
                { label: 'View Documentation', icon: 'doc', link: 'https://docs.google.com/document/d/1bkguwLhvV9q5JTXc_x65JWckywcctCPk/edit?usp=sharing&ouid=100395741747953207405&rtpof=true&sd=true' }
            ]
        },
        {
            title: 'AgeVision AI',
            subtitle: 'Deep Learning-Based Facial Age Estimation',
            description: "AgeVision AI is a deep learning-based facial age estimation system designed to predict a person's apparent age from facial images. It uses a multi-stage face detection and preprocessing pipeline, a ConvNeXt-Small feature extractor, and Deep Label Distribution Learning (DLDL) with expected-age estimation. Test-Time Augmentation (TTA) combines predictions from original and horizontally flipped images to improve inference robustness. The pipeline incorporates MTCNN-based image validation, Haar Cascade fallback face detection, padded face cropping, image normalization, and probability-distribution ensembling to produce a continuous estimated age.",
            tags: [
                'Python',
                'PyTorch',
                'ConvNeXt-Small',
                'Computer Vision',
                'Deep Learning',
                'MTCNN',
                'Haar Cascade',
                'DLDL',
                'Test-Time Augmentation (TTA)',
                'Streamlit'
            ],
            features: [
                'Multi-stage face detection via MTCNN with Haar Cascade fallback and 20% padded crop',
                'ConvNeXt-Small backbone extracting 768-D features mapped to 101 age logits',
                'Test-Time Augmentation (TTA) combining predictions from original and flipped views',
                'Deep Label Distribution Learning (DLDL) with continuous expected age estimation'
            ],
            badge: 'Computer Vision · AI',
            placeholderIcon: <ScanFace size={52} color="var(--accent-color)" />,
            buttons: [
                { label: 'Live Demo', icon: 'play', link: 'https://age-ai.streamlit.app/' },
                { label: 'Methodology', icon: 'workflow', action: 'open_methodology' }
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
            placeholderIcon: <CloudRain size={52} color="var(--accent-color)" />,
            buttons: [
                { label: 'View Documentation', icon: 'doc', link: 'https://docs.google.com/document/d/1J6Ls1ERlBejpB0P-2k6cGYorChCXUI4g/edit?usp=sharing&ouid=100395741747953207405&rtpof=true&sd=true' },
                { label: 'Live Demo', icon: 'play', link: 'https://weatherfinder-v1.netlify.app/' }
            ]
        }
    ];

    const pipelineSteps = [
        'Input Image',
        'Image Validation',
        'MTCNN Face Detection',
        'Haar Cascade Fallback',
        'Face Crop with 20% Padding',
        'Resize to 224 × 224 and Normalize',
        'Original Image + Horizontally Flipped Image',
        'Shared ConvNeXt-Small Backbone',
        '768-D Feature Vectors',
        'Custom Age Head',
        '101 Age Logits',
        'Softmax Probability Distributions',
        'Average the Two Distributions',
        'Expected Age Estimation using DLDL',
        'Final Predicted Age'
    ];

    return (
        <section id="projects" className="section" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Projects</h2>
                    <div className="teal-divider" />
                    <p className="section-subtitle">Building innovative solutions to real-world problems</p>
                </div>

                <div className="projects-grid" style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: '2rem',
                    maxWidth: '1160px',
                    margin: '0 auto'
                }}>
                    {projectsData.map((project, index) => (
                        <ProjectCard
                            key={index}
                            project={project}
                            index={index}
                            onOpenMethodology={setSelectedMethodologyProject}
                        />
                    ))}
                </div>
            </div>

            {/* AgeVision AI Methodology & Architecture Modal */}
            {selectedMethodologyProject && (
                <div
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100vw',
                        height: '100vh',
                        background: 'rgba(25, 44, 43, 0.75)',
                        backdropFilter: 'blur(8px)',
                        WebkitBackdropFilter: 'blur(8px)',
                        zIndex: 9999,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '1.25rem',
                        boxSizing: 'border-box'
                    }}
                    onClick={() => setSelectedMethodologyProject(null)}
                >
                    <div
                        style={{
                            background: 'var(--bg-card)',
                            width: '100%',
                            maxWidth: '920px',
                            maxHeight: '90vh',
                            borderRadius: '16px',
                            overflow: 'hidden',
                            display: 'flex',
                            flexDirection: 'column',
                            position: 'relative',
                            boxShadow: '0 24px 48px rgba(0, 0, 0, 0.3)',
                            border: '1px solid var(--border-color)'
                        }}
                        onClick={e => e.stopPropagation()}
                    >
                        {/* Modal Header */}
                        <div style={{
                            padding: '1.25rem 1.75rem',
                            borderBottom: '1px solid var(--border-color)',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            background: 'var(--bg-secondary)'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <div style={{
                                    width: '36px',
                                    height: '36px',
                                    borderRadius: '8px',
                                    background: 'var(--hover-primary)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    border: '1px solid var(--border-color)'
                                }}>
                                    <ScanFace size={20} color="var(--accent-color)" />
                                </div>
                                <div>
                                    <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                                        AgeVision AI — Technical Methodology
                                    </h3>
                                    <p style={{ margin: 0, fontSize: '0.825rem', color: 'var(--accent-color)', fontWeight: 500 }}>
                                        Deep Learning-Based Facial Age Estimation Pipeline
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => setSelectedMethodologyProject(null)}
                                style={{
                                    background: 'transparent',
                                    border: 'none',
                                    cursor: 'pointer',
                                    padding: '6px',
                                    borderRadius: '6px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'var(--text-secondary)',
                                    transition: 'color 0.2s ease'
                                }}
                                aria-label="Close modal"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div style={{
                            padding: '1.75rem',
                            overflowY: 'auto',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1.75rem'
                        }}>
                            {/* Live Demo Quick Action Banner */}
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                background: 'var(--bg-secondary)',
                                border: '1px solid var(--border-color)',
                                borderRadius: '12px',
                                padding: '1rem 1.25rem',
                                flexWrap: 'wrap',
                                gap: '1rem'
                            }}>
                                <div>
                                    <span style={{
                                        fontSize: '0.75rem',
                                        fontWeight: 600,
                                        letterSpacing: '0.05em',
                                        textTransform: 'uppercase',
                                        color: 'var(--accent-color)'
                                    }}>
                                        Category: Computer Vision · Deep Learning · AI
                                    </span>
                                    <p style={{ margin: '0.25rem 0 0', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                                        Interactive deployment hosted live on Streamlit Cloud.
                                    </p>
                                </div>
                                <a
                                    href="https://age-ai.streamlit.app/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-outline"
                                    style={{
                                        padding: '0.55rem 1.15rem',
                                        fontSize: '0.85rem',
                                        borderColor: 'var(--accent-color)'
                                    }}
                                >
                                    <Play size={14} /> Open Live Demo
                                </a>
                            </div>

                            {/* Section: Architecture Flow Diagram */}
                            <div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.85rem' }}>
                                    <Workflow size={18} color="var(--accent-color)" />
                                    <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                                        Inference Pipeline Architecture
                                    </h4>
                                </div>
                                <div style={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    alignItems: 'center',
                                    gap: '8px',
                                    padding: '1.25rem',
                                    background: 'var(--bg-secondary)',
                                    borderRadius: '12px',
                                    border: '1px solid var(--border-color)'
                                }}>
                                    {pipelineSteps.map((step, idx) => (
                                        <React.Fragment key={idx}>
                                            <div style={{
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                gap: '6px',
                                                padding: '0.4rem 0.75rem',
                                                background: 'var(--bg-card)',
                                                border: '1px solid var(--border-color)',
                                                borderRadius: '8px',
                                                fontSize: '0.8rem',
                                                fontWeight: 500,
                                                color: 'var(--text-primary)',
                                                boxShadow: '0 2px 4px rgba(0,0,0,0.04)'
                                            }}>
                                                <span style={{
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    width: '18px',
                                                    height: '18px',
                                                    borderRadius: '9999px',
                                                    background: 'var(--accent-color)',
                                                    color: '#ffffff',
                                                    fontSize: '0.65rem',
                                                    fontWeight: 700
                                                }}>
                                                    {idx + 1}
                                                </span>
                                                {step}
                                            </div>
                                            {idx < pipelineSteps.length - 1 && (
                                                <span style={{ color: 'var(--accent-color)', opacity: 0.75, display: 'inline-flex', alignItems: 'center' }}>
                                                    <ArrowRight size={14} />
                                                </span>
                                            )}
                                        </React.Fragment>
                                    ))}
                                </div>
                            </div>

                            {/* Section: 5 Detailed Methodology Stages */}
                            <div>
                                <h4 style={{ margin: '0 0 1rem 0', fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                                    Technical Methodology
                                </h4>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    {/* Stage 1 */}
                                    <div style={{
                                        padding: '1.15rem 1.25rem',
                                        background: 'var(--bg-secondary)',
                                        borderRadius: '10px',
                                        border: '1px solid var(--border-color)'
                                    }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.4rem' }}>
                                            <span style={{
                                                fontSize: '0.725rem',
                                                fontWeight: 700,
                                                padding: '0.15rem 0.5rem',
                                                borderRadius: '4px',
                                                background: 'var(--accent-color)',
                                                color: '#ffffff'
                                            }}>
                                                Stage 1
                                            </span>
                                            <h5 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                                                Image Validation and Face Detection
                                            </h5>
                                        </div>
                                        <p style={{ margin: 0, fontSize: '0.875rem', lineHeight: 1.6, color: 'var(--text-secondary)' }}>
                                            The input image first passes through an MTCNN-based image validation and face detection stage. Haar Cascade detection provides a fallback when MTCNN does not detect a suitable face. After detection, the face crop is padded by approximately 20% to retain surrounding facial features.
                                        </p>
                                    </div>

                                    {/* Stage 2 */}
                                    <div style={{
                                        padding: '1.15rem 1.25rem',
                                        background: 'var(--bg-secondary)',
                                        borderRadius: '10px',
                                        border: '1px solid var(--border-color)'
                                    }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.4rem' }}>
                                            <span style={{
                                                fontSize: '0.725rem',
                                                fontWeight: 700,
                                                padding: '0.15rem 0.5rem',
                                                borderRadius: '4px',
                                                background: 'var(--accent-color)',
                                                color: '#ffffff'
                                            }}>
                                                Stage 2
                                            </span>
                                            <h5 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                                                Image Preprocessing & Test-Time Augmentation (TTA)
                                            </h5>
                                        </div>
                                        <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.875rem', lineHeight: 1.6, color: 'var(--text-secondary)' }}>
                                            The detected face is resized to 224 × 224 pixels and normalized to match the model's expected input distribution. Test-Time Augmentation creates two inference inputs:
                                        </p>
                                        <ul style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '0.875rem', lineHeight: 1.6, color: 'var(--text-secondary)' }}>
                                            <li>The original face image.</li>
                                            <li>A horizontally flipped version of the face image.</li>
                                        </ul>
                                    </div>

                                    {/* Stage 3 */}
                                    <div style={{
                                        padding: '1.15rem 1.25rem',
                                        background: 'var(--bg-secondary)',
                                        borderRadius: '10px',
                                        border: '1px solid var(--border-color)'
                                    }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.4rem' }}>
                                            <span style={{
                                                fontSize: '0.725rem',
                                                fontWeight: 700,
                                                padding: '0.15rem 0.5rem',
                                                borderRadius: '4px',
                                                background: 'var(--accent-color)',
                                                color: '#ffffff'
                                            }}>
                                                Stage 3
                                            </span>
                                            <h5 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                                                Deep Feature Extraction
                                            </h5>
                                        </div>
                                        <p style={{ margin: 0, fontSize: '0.875rem', lineHeight: 1.6, color: 'var(--text-secondary)' }}>
                                            Both inputs are processed using the same ConvNeXt-Small backbone with shared weights. The backbone extracts 768-dimensional feature representations. A custom age prediction head maps these features to 101 age logits, representing age classes from 0 through 100.
                                        </p>
                                    </div>

                                    {/* Stage 4 */}
                                    <div style={{
                                        padding: '1.15rem 1.25rem',
                                        background: 'var(--bg-secondary)',
                                        borderRadius: '10px',
                                        border: '1px solid var(--border-color)'
                                    }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.4rem' }}>
                                            <span style={{
                                                fontSize: '0.725rem',
                                                fontWeight: 700,
                                                padding: '0.15rem 0.5rem',
                                                borderRadius: '4px',
                                                background: 'var(--accent-color)',
                                                color: '#ffffff'
                                            }}>
                                                Stage 4
                                            </span>
                                            <h5 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                                                Probability Ensembling
                                            </h5>
                                        </div>
                                        <p style={{ margin: '0 0 0.6rem 0', fontSize: '0.875rem', lineHeight: 1.6, color: 'var(--text-secondary)' }}>
                                            The logits from both image views are converted into probability distributions using Softmax. The two distributions are averaged:
                                        </p>
                                        <div style={{
                                            padding: '0.6rem 1rem',
                                            background: 'var(--bg-card)',
                                            borderRadius: '6px',
                                            border: '1px solid var(--border-color)',
                                            fontFamily: 'monospace',
                                            fontSize: '0.85rem',
                                            color: 'var(--accent-color)',
                                            fontWeight: 600,
                                            marginBottom: '0.6rem'
                                        }}>
                                            Final Distribution = (Original Probabilities + Flipped Probabilities) / 2
                                        </div>
                                        <p style={{ margin: 0, fontSize: '0.875rem', lineHeight: 1.6, color: 'var(--text-secondary)' }}>
                                            This combines predictions from both views into a single final age probability distribution.
                                        </p>
                                    </div>

                                    {/* Stage 5 */}
                                    <div style={{
                                        padding: '1.15rem 1.25rem',
                                        background: 'var(--bg-secondary)',
                                        borderRadius: '10px',
                                        border: '1px solid var(--border-color)'
                                    }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.4rem' }}>
                                            <span style={{
                                                fontSize: '0.725rem',
                                                fontWeight: 700,
                                                padding: '0.15rem 0.5rem',
                                                borderRadius: '4px',
                                                background: 'var(--accent-color)',
                                                color: '#ffffff'
                                            }}>
                                                Stage 5
                                            </span>
                                            <h5 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                                                Expected Age Estimation using DLDL
                                            </h5>
                                        </div>
                                        <p style={{ margin: '0 0 0.6rem 0', fontSize: '0.875rem', lineHeight: 1.6, color: 'var(--text-secondary)' }}>
                                            Instead of selecting only the age class with the highest probability, the system calculates the expected age across all 101 age classes:
                                        </p>
                                        <div style={{
                                            padding: '0.6rem 1rem',
                                            background: 'var(--bg-card)',
                                            borderRadius: '6px',
                                            border: '1px solid var(--border-color)',
                                            fontFamily: 'monospace',
                                            fontSize: '0.875rem',
                                            color: 'var(--accent-color)',
                                            fontWeight: 600,
                                            marginBottom: '0.6rem'
                                        }}>
                                            Expected Age = Σ [i × P(Age = i)], for i = 0 to 100
                                        </div>
                                        <p style={{ margin: 0, fontSize: '0.875rem', lineHeight: 1.6, color: 'var(--text-secondary)' }}>
                                            The resulting value is a continuous estimated age.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <style dangerouslySetInnerHTML={{
                __html: `
                .card-hover:hover .project-icon-hover {
                    transform: scale(1.3) !important;
                }
                @media (max-width: 992px) {
                    .projects-grid { grid-template-columns: 1fr !important; }
                }
            ` }} />
        </section>
    );
};

export default Projects;
