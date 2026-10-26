import React, { useState, useEffect, useRef } from 'react';
import { Eye, X, Award, CheckCircle2 } from 'lucide-react';
import { SiLeetcode, SiHackerrank } from 'react-icons/si';

const achievementData = [
    // LeetCode Badges
    {
        id: 'lc-100-days-2025',
        title: '100 Days Badge 2025',
        category: 'leetcode',
        categoryLabel: 'LeetCode',
        year: '2025',
        description: 'Solving Problems 100+ Days in 2025',
        image: '/leetcode/100-days.webp',
        fallback: '/leetcode/100-days.png'
    },
    {
        id: 'lc-50-days-2025',
        title: '50 Days Badge 2025',
        category: 'leetcode',
        categoryLabel: 'LeetCode',
        year: '2025',
        description: 'Solving Problems 50+ Days in 2025',
        image: '/leetcode/50-days.webp',
        fallback: '/leetcode/50-days.png'
    },
    {
        id: 'lc-dcc-aug-2025',
        title: 'DCC August 2025',
        category: 'leetcode',
        categoryLabel: 'LeetCode',
        year: '2025',
        description: 'Daily Coding Challenge August 2025',
        image: '/leetcode/dcc-aug.webp',
        fallback: '/leetcode/dcc-aug.png'
    },
    {
        id: 'lc-dcc-sep-2025',
        title: 'DCC September 2025',
        category: 'leetcode',
        categoryLabel: 'LeetCode',
        year: '2025',
        description: 'Daily Coding Challenge September 2025',
        image: '/leetcode/dcc-sep.webp',
        fallback: '/leetcode/dcc-sep.png'
    },
    {
        id: 'lc-sql-50',
        title: 'SQL 50',
        category: 'leetcode',
        categoryLabel: 'LeetCode',
        description: 'Completed SQL 50 Problems Study Plan',
        image: '/leetcode/sql-50.webp',
        fallback: '/leetcode/sql-50.png'
    },

    // HackerRank Badges
    {
        id: 'hr-sql',
        title: 'SQL',
        category: 'hackerrank',
        categoryLabel: 'HackerRank',
        description: 'Certified in SQL',
        image: '/hackerrank/sql.webp',
        fallback: '/hackerrank/sql.png'
    },
    {
        id: 'hr-java',
        title: 'Java',
        category: 'hackerrank',
        categoryLabel: 'HackerRank',
        description: 'Certified in Java',
        image: '/hackerrank/java.webp',
        fallback: '/hackerrank/java.png'
    },
    {
        id: 'hr-cpp',
        title: 'C++',
        category: 'hackerrank',
        categoryLabel: 'HackerRank',
        description: 'Certified in C++',
        image: '/hackerrank/cpp.webp',
        fallback: '/hackerrank/cpp.png'
    },
    {
        id: 'hr-problem-solving',
        title: 'Problem Solving',
        category: 'hackerrank',
        categoryLabel: 'HackerRank',
        description: 'Certified in Problem Solving',
        image: '/hackerrank/problem-solving.webp',
        fallback: '/hackerrank/problem-solving.png'
    },

    // Professional Certifications
    {
        id: 'cert-aws-essentials',
        title: 'AWS Essentials',
        category: 'certifications',
        categoryLabel: 'Certification',
        issuer: 'Amazon',
        description: 'Cloud fundamentals and core AWS architecture essentials',
        image: '/certs/aws.jpg'
    },
    {
        id: 'cert-spring-boot',
        title: 'Spring Boot',
        category: 'certifications',
        categoryLabel: 'Certification',
        issuer: 'Infosys',
        description: 'Enterprise backend development using Spring Boot and REST APIs',
        image: '/certs/spring-boot.jpg'
    },
    {
        id: 'cert-google-cloud',
        title: 'Google Cloud Computing',
        category: 'certifications',
        categoryLabel: 'Certification',
        issuer: 'Google',
        description: 'Foundations of cloud infrastructure, services, and architecture',
        image: '/certs/google-cloud.jpg'
    },
    {
        id: 'cert-java-foundation',
        title: 'Java Foundation',
        category: 'certifications',
        categoryLabel: 'Certification',
        issuer: 'Infosys',
        description: 'Core Java programming language principles and data structures',
        image: '/certs/java-foundation.jpg'
    },
    {
        id: 'cert-oops-java',
        title: 'OOPs in Java',
        category: 'certifications',
        categoryLabel: 'Certification',
        issuer: 'Great Learning',
        description: 'Object-oriented programming concepts, inheritance, and encapsulation in Java',
        image: '/certs/oops-java.jpg'
    },
    {
        id: 'cert-webservices',
        title: 'WebServices Testing',
        category: 'certifications',
        categoryLabel: 'Certification',
        issuer: 'Udemy',
        description: 'RESTful API verification, endpoint testing, and web services workflows',
        image: '/certs/webservices.png'
    },
    {
        id: 'cert-css-crash',
        title: 'CSS Crash Course',
        category: 'certifications',
        categoryLabel: 'Certification',
        issuer: 'Udemy',
        description: 'Modern responsive web styling, layout architecture, and UI fundamentals',
        image: '/certs/css.png'
    },
    {
        id: 'cert-iot-connecting',
        title: 'Connecting with IoT',
        category: 'certifications',
        categoryLabel: 'Certification',
        issuer: 'Infosys',
        description: 'IoT network architecture and sensor connectivity fundamentals',
        image: '/certs/iot-connecting.png'
    },
    {
        id: 'cert-iot',
        title: 'IoT',
        category: 'certifications',
        categoryLabel: 'Certification',
        issuer: 'Infosys',
        description: 'Internet of Things system concepts and embedded communication',
        image: '/certs/iot.png'
    },
    {
        id: 'cert-cybersecurity',
        title: 'Intro to Cybersecurity',
        category: 'certifications',
        categoryLabel: 'Certification',
        issuer: 'Cisco',
        description: 'Network defense concepts, cyber threat awareness, and security principles',
        image: '/certs/cybersecurity.png'
    },
    {
        id: 'cert-firewall',
        title: 'Intro to Firewall',
        category: 'certifications',
        categoryLabel: 'Certification',
        issuer: 'Great Learning',
        description: 'Network perimeter security, packet inspection, and firewall rules',
        image: '/certs/firewall.jpg'
    },
    {
        id: 'cert-chatgpt',
        title: 'ChatGPT for Everyone',
        category: 'certifications',
        categoryLabel: 'Certification',
        issuer: 'Guvi',
        description: 'Generative AI applications, prompting principles, and LLM fundamentals',
        image: '/certs/chatgpt.png'
    },
    {
        id: 'cert-mastering-prompt',
        title: 'Mastering Prompt Eng',
        category: 'certifications',
        categoryLabel: 'Certification',
        issuer: 'Udemy',
        description: 'Advanced prompt design patterns, context engineering, and LLM tuning',
        image: '/certs/mastering-prompt.jpg'
    },
    {
        id: 'cert-intro-prompt',
        title: 'Intro to Prompt Eng',
        category: 'certifications',
        categoryLabel: 'Certification',
        issuer: 'Simplilearn',
        description: 'Techniques for structured prompt development with foundation models',
        image: '/certs/intro-prompt.jpg'
    },
    {
        id: 'cert-learnathon',
        title: 'Learnathon',
        category: 'certifications',
        categoryLabel: 'Certification',
        issuer: 'ICT Academy',
        description: 'Technical learning immersion marathon in emerging technologies',
        image: '/certs/learnathon.jpg'
    }
];

const CategoryIcon = ({ category }) => {
    switch (category) {
        case 'leetcode':
            return <SiLeetcode size={14} color="#FFA116" />;
        case 'hackerrank':
            return <SiHackerrank size={14} color="#2EC866" />;
        case 'certifications':
        default:
            return <Award size={14} color="var(--accent-color)" />;
    }
};

const AchievementCard = ({ item, onPreview }) => {
    const cardRef = useRef(null);
    const [imgSrc, setImgSrc] = useState(item.image);
    const [hasError, setHasError] = useState(false);

    const handleImgError = () => {
        if (item.fallback && imgSrc !== item.fallback) {
            setImgSrc(item.fallback);
        } else {
            setHasError(true);
        }
    };

    const isCert = item.category === 'certifications';

    return (
        <div
            ref={cardRef}
            className="ref-card card-hover achievement-grid-card"
            style={{
                display: 'flex',
                flexDirection: 'column',
                borderRadius: '16px',
                overflow: 'hidden',
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                boxShadow: 'var(--shadow-card)',
                transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                height: '100%'
            }}
        >
            {/* Visual Header / Image Frame */}
            <div
                onClick={() => !hasError && onPreview(item)}
                role={hasError ? undefined : 'button'}
                tabIndex={hasError ? undefined : 0}
                onKeyDown={(e) => {
                    if ((e.key === 'Enter' || e.key === ' ') && !hasError) {
                        e.preventDefault();
                        onPreview(item);
                    }
                }}
                aria-label={`Preview ${item.title}`}
                className="achievement-media-slot"
                style={{
                    height: '210px',
                    width: '100%',
                    backgroundColor: 'var(--bg-secondary)',
                    borderBottom: '1px solid var(--border-color)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    cursor: hasError ? 'default' : 'pointer',
                    overflow: 'hidden',
                    padding: isCert ? '0.75rem' : '1.5rem'
                }}
            >
                {/* Background subtle mesh pattern */}
                <div
                    style={{
                        position: 'absolute',
                        inset: 0,
                        opacity: 0.03,
                        backgroundImage: 'radial-gradient(var(--text-primary) 1px, transparent 1px)',
                        backgroundSize: '16px 16px',
                        pointerEvents: 'none'
                    }}
                />

                {!hasError && imgSrc ? (
                    <img
                        src={imgSrc}
                        alt={`${item.title} ${isCert ? 'certificate' : 'badge'}`}
                        loading="lazy"
                        width="200"
                        height="200"
                        onError={handleImgError}
                        className="achievement-image"
                        style={{
                            maxWidth: '100%',
                            maxHeight: '100%',
                            objectFit: isCert ? 'contain' : 'contain',
                            filter: isCert ? 'drop-shadow(0 4px 12px rgba(0,0,0,0.15))' : 'drop-shadow(0 6px 16px rgba(0,0,0,0.12))',
                            transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                        }}
                    />
                ) : (
                    <div style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
                        <Award size={36} color="var(--accent-color)" style={{ opacity: 0.7, marginBottom: '6px' }} />
                        <span style={{ fontSize: '0.8rem', display: 'block' }}>Verified Credential</span>
                    </div>
                )}
            </div>

            {/* Card Content */}
            <div style={{
                padding: '1.5rem',
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem'
            }}>
                {/* Category & Year Row */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.5rem' }}>
                    <span
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '5px',
                            padding: '0.2rem 0.65rem',
                            borderRadius: '9999px',
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            backgroundColor: 'var(--bg-secondary)',
                            border: '1px solid var(--border-color)',
                            color: 'var(--text-secondary)'
                        }}
                    >
                        <CategoryIcon category={item.category} />
                        <span>{item.issuer ? `${item.issuer}` : item.categoryLabel}</span>
                    </span>

                    {item.year && (
                        <span
                            style={{
                                fontSize: '0.75rem',
                                fontWeight: 600,
                                color: 'var(--accent-color)',
                                backgroundColor: 'var(--accent-subtle)',
                                padding: '0.15rem 0.55rem',
                                borderRadius: '9999px',
                                border: '1px solid var(--accent-color)'
                            }}
                        >
                            {item.year}
                        </span>
                    )}
                </div>

                {/* Title */}
                <h3 style={{
                    fontSize: '1.15rem',
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                    margin: 0,
                    lineHeight: 1.35
                }}>
                    {item.title}
                </h3>

                {/* Description */}
                <p style={{
                    fontSize: '0.875rem',
                    color: 'var(--text-secondary)',
                    margin: 0,
                    lineHeight: 1.55,
                    flex: 1
                }}>
                    {item.description}
                </p>

                {/* Action button: View Badge or View Certificate */}
                {!hasError && imgSrc && (
                    <div style={{ marginTop: 'auto', paddingTop: '0.75rem', borderTop: '1px solid var(--border-light)' }}>
                        <button
                            type="button"
                            onClick={() => onPreview(item)}
                            className="btn-outline achievement-view-btn"
                            style={{
                                width: '100%',
                                padding: '0.6rem 1rem',
                                fontSize: '0.85rem',
                                borderRadius: '8px',
                                display: 'inline-flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '6px'
                            }}
                        >
                            <Eye size={15} />
                            <span>{isCert ? 'View Certificate' : 'View Badge'}</span>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

const Achievements = () => {
    const [selectedFilter, setSelectedFilter] = useState('all');
    const [previewItem, setPreviewItem] = useState(null);
    const closeBtnRef = useRef(null);
    const previousFocusRef = useRef(null);

    // Derived counts strictly from real achievement data
    const totalCount = achievementData.length;
    const leetcodeCount = achievementData.filter(item => item.category === 'leetcode').length;
    const hackerrankCount = achievementData.filter(item => item.category === 'hackerrank').length;
    const certsCount = achievementData.filter(item => item.category === 'certifications').length;

    // Filtered achievements
    const filteredItems = selectedFilter === 'all'
        ? achievementData
        : achievementData.filter(item => item.category === selectedFilter);

    // Modal focus management & keyboard dismiss
    useEffect(() => {
        if (previewItem) {
            previousFocusRef.current = document.activeElement;
            document.body.style.overflow = 'hidden';
            setTimeout(() => {
                closeBtnRef.current?.focus();
            }, 30);
        } else {
            document.body.style.overflow = 'unset';
            if (previousFocusRef.current && typeof previousFocusRef.current.focus === 'function') {
                previousFocusRef.current.focus();
            }
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [previewItem]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape' && previewItem) {
                e.preventDefault();
                setPreviewItem(null);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [previewItem]);

    const filterOptions = [
        { id: 'all', label: 'All', count: totalCount },
        { id: 'leetcode', label: 'LeetCode', count: leetcodeCount, icon: SiLeetcode, iconColor: '#FFA116' },
        { id: 'hackerrank', label: 'HackerRank', count: hackerrankCount, icon: SiHackerrank, iconColor: '#2EC866' },
        ...(certsCount > 0 ? [{ id: 'certifications', label: 'Certifications', count: certsCount, icon: Award, iconColor: 'var(--accent-color)' }] : [])
    ];

    return (
        <section
            id="achievements"
            className="section"
            style={{
                minHeight: '80vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                padding: '5rem 0'
            }}
        >
            <div className="container">
                {/* Header Section */}
                <div className="section-header" style={{ marginBottom: '2rem' }}>
                    <h2 className="section-title">Achievements</h2>
                    <div className="teal-divider" />
                    <p className="section-subtitle">
                        Coding milestones, verified skill badges, and professional certifications
                    </p>
                </div>

                {/* Compact Derived Summary Counts Row */}
                <div
                    className="achievements-summary-strip"
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        gap: '1rem',
                        marginBottom: '2.25rem',
                        maxWidth: '900px',
                        margin: '0 auto 2.25rem'
                    }}
                >
                    <div className="summary-stat-pill">
                        <CheckCircle2 size={16} color="var(--accent-color)" />
                        <span className="summary-stat-label">Total Verified:</span>
                        <strong className="summary-stat-value">{totalCount}</strong>
                    </div>

                    <div className="summary-stat-pill">
                        <SiLeetcode size={15} color="#FFA116" />
                        <span className="summary-stat-label">LeetCode Badges:</span>
                        <strong className="summary-stat-value">{leetcodeCount}</strong>
                    </div>

                    <div className="summary-stat-pill">
                        <SiHackerrank size={15} color="#2EC866" />
                        <span className="summary-stat-label">HackerRank Certs:</span>
                        <strong className="summary-stat-value">{hackerrankCount}</strong>
                    </div>

                    {certsCount > 0 && (
                        <div className="summary-stat-pill">
                            <Award size={16} color="var(--accent-color)" />
                            <span className="summary-stat-label">Certifications:</span>
                            <strong className="summary-stat-value">{certsCount}</strong>
                        </div>
                    )}
                </div>

                {/* Filter Controls */}
                <div
                    role="tablist"
                    aria-label="Filter achievements by category"
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        gap: '0.65rem',
                        marginBottom: '3rem'
                    }}
                >
                    {filterOptions.map((filter) => {
                        const Icon = filter.icon;
                        const isActive = selectedFilter === filter.id;
                        return (
                            <button
                                key={filter.id}
                                role="tab"
                                id={`filter-${filter.id}`}
                                aria-selected={isActive}
                                aria-controls="achievements-grid"
                                onClick={() => setSelectedFilter(filter.id)}
                                className={`achievement-filter-btn ${isActive ? 'active' : ''}`}
                            >
                                {Icon && <Icon size={15} color={isActive ? undefined : filter.iconColor} />}
                                <span>{filter.label}</span>
                                <span className="filter-count-badge">{filter.count}</span>
                            </button>
                        );
                    })}
                </div>

                {/* Screen-reader Live Region */}
                <div aria-live="polite" className="sr-only">
                    Showing {filteredItems.length} achievements for filter {selectedFilter}.
                </div>

                {/* Responsive Achievement Cards Grid */}
                <div
                    id="achievements-grid"
                    role="tabpanel"
                    aria-labelledby={`filter-${selectedFilter}`}
                    className="achievements-responsive-grid"
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                        gap: '1.75rem',
                        maxWidth: '1160px',
                        margin: '0 auto'
                    }}
                >
                    {filteredItems.map((item) => (
                        <AchievementCard
                            key={item.id}
                            item={item}
                            onPreview={setPreviewItem}
                        />
                    ))}
                </div>
            </div>

            {/* Accessible Badge/Certificate Preview Modal */}
            {previewItem && (
                <div
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="preview-modal-title"
                    className="preview-modal-backdrop"
                    onClick={() => setPreviewItem(null)}
                    style={{
                        position: 'fixed',
                        inset: 0,
                        backgroundColor: 'rgba(15, 23, 22, 0.75)',
                        backdropFilter: 'blur(8px)',
                        WebkitBackdropFilter: 'blur(8px)',
                        zIndex: 99999,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '1.5rem',
                        boxSizing: 'border-box'
                    }}
                >
                    <div
                        className="preview-modal-card ref-card"
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            width: '100%',
                            maxWidth: '680px',
                            maxHeight: '90vh',
                            backgroundColor: 'var(--bg-card)',
                            border: '1px solid var(--border-color)',
                            borderRadius: '16px',
                            boxShadow: '0 24px 48px rgba(0, 0, 0, 0.35)',
                            overflow: 'hidden',
                            display: 'flex',
                            flexDirection: 'column'
                        }}
                    >
                        {/* Modal Header */}
                        <div style={{
                            padding: '1.25rem 1.5rem',
                            borderBottom: '1px solid var(--border-color)',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            backgroundColor: 'var(--bg-secondary)'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0 }}>
                                <CategoryIcon category={previewItem.category} />
                                <span style={{
                                    fontSize: '0.8rem',
                                    fontWeight: 700,
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.04em',
                                    color: 'var(--text-secondary)'
                                }}>
                                    {previewItem.issuer ? `${previewItem.issuer} Certification` : `${previewItem.categoryLabel} Achievement`}
                                </span>
                            </div>

                            <button
                                ref={closeBtnRef}
                                type="button"
                                onClick={() => setPreviewItem(null)}
                                aria-label="Close preview dialog"
                                className="modal-close-btn"
                                style={{
                                    background: 'transparent',
                                    border: 'none',
                                    cursor: 'pointer',
                                    color: 'var(--text-secondary)',
                                    padding: '6px',
                                    borderRadius: '6px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Modal Body / Preview Frame */}
                        <div style={{
                            padding: '2rem',
                            overflowY: 'auto',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '1.5rem'
                        }}>
                            <div
                                style={{
                                    width: '100%',
                                    minHeight: '260px',
                                    maxHeight: '440px',
                                    backgroundColor: 'var(--bg-secondary)',
                                    borderRadius: '12px',
                                    border: '1px solid var(--border-color)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    padding: '1.5rem',
                                    boxSizing: 'border-box'
                                }}
                            >
                                <img
                                    src={previewItem.image}
                                    alt={`${previewItem.title} full credential`}
                                    onError={(e) => {
                                        if (previewItem.fallback && e.currentTarget.src !== previewItem.fallback) {
                                            e.currentTarget.src = previewItem.fallback;
                                        }
                                    }}
                                    style={{
                                        maxWidth: '100%',
                                        maxHeight: '380px',
                                        objectFit: 'contain',
                                        filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.2))'
                                    }}
                                />
                            </div>

                            {/* Title & Metadata */}
                            <div style={{ textAlign: 'center', maxWidth: '520px' }}>
                                <h3
                                    id="preview-modal-title"
                                    style={{
                                        fontSize: '1.4rem',
                                        fontWeight: 700,
                                        color: 'var(--text-primary)',
                                        marginBottom: '0.45rem'
                                    }}
                                >
                                    {previewItem.title}
                                </h3>
                                <p style={{
                                    fontSize: '0.95rem',
                                    color: 'var(--text-secondary)',
                                    lineHeight: 1.6,
                                    margin: 0
                                }}>
                                    {previewItem.description}
                                </p>

                                {previewItem.year && (
                                    <div style={{ marginTop: '0.75rem' }}>
                                        <span style={{
                                            fontSize: '0.8rem',
                                            fontWeight: 600,
                                            color: 'var(--accent-color)',
                                            backgroundColor: 'var(--accent-subtle)',
                                            padding: '0.2rem 0.65rem',
                                            borderRadius: '9999px',
                                            border: '1px solid var(--accent-color)'
                                        }}>
                                            Awarded {previewItem.year}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div style={{
                            padding: '0.85rem 1.5rem',
                            borderTop: '1px solid var(--border-color)',
                            backgroundColor: 'var(--bg-secondary)',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            fontSize: '0.8rem',
                            color: 'var(--text-muted)'
                        }}>
                            <span>Click outside or press <kbd style={{ padding: '0.15rem 0.4rem', borderRadius: '4px', backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}>ESC</kbd> to dismiss</span>
                            <button
                                type="button"
                                onClick={() => setPreviewItem(null)}
                                className="btn-primary"
                                style={{ padding: '0.4rem 1rem', fontSize: '0.825rem', borderRadius: '6px' }}
                            >
                                Close Preview
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <style dangerouslySetInnerHTML={{
                __html: `
                .sr-only {
                    position: absolute;
                    width: 1px;
                    height: 1px;
                    padding: 0;
                    margin: -1px;
                    overflow: hidden;
                    clip: rect(0, 0, 0, 0);
                    white-space: nowrap;
                    border-width: 0;
                }

                /* Summary stats strip */
                .summary-stat-pill {
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    padding: 0.45rem 1rem;
                    border-radius: 9999px;
                    background-color: var(--bg-card);
                    border: 1px solid var(--border-color);
                    box-shadow: var(--shadow-card);
                    font-size: 0.85rem;
                }
                .summary-stat-label {
                    color: var(--text-secondary);
                    font-weight: 500;
                }
                .summary-stat-value {
                    color: var(--text-primary);
                    font-weight: 700;
                }

                /* Category Filters */
                .achievement-filter-btn {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    padding: 0.6rem 1.25rem;
                    border-radius: 9999px;
                    background-color: var(--bg-card);
                    border: 1px solid var(--border-color);
                    color: var(--text-secondary);
                    font-size: 0.9rem;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.2s ease;
                }
                .achievement-filter-btn:hover {
                    border-color: var(--accent-color);
                    color: var(--text-primary);
                    transform: translateY(-1px);
                }
                .achievement-filter-btn.active {
                    background-color: var(--accent-subtle);
                    border-color: var(--accent-color);
                    color: var(--accent-color);
                    box-shadow: 0 2px 10px rgba(0, 127, 120, 0.18);
                }
                .filter-count-badge {
                    font-size: 0.725rem;
                    padding: 0.1rem 0.5rem;
                    border-radius: 9999px;
                    background-color: var(--bg-secondary);
                    color: var(--text-secondary);
                    font-weight: 700;
                }
                .achievement-filter-btn.active .filter-count-badge {
                    background-color: var(--accent-color);
                    color: #FFFFFF;
                }
                .achievement-filter-btn:focus-visible, .achievement-view-btn:focus-visible, .modal-close-btn:focus-visible {
                    outline: 2px solid var(--accent-color);
                    outline-offset: 2px;
                }

                /* Media slot & hover animation */
                .achievement-media-slot:hover .achievement-image {
                    transform: scale(1.06);
                }
                .achievement-view-btn:hover {
                    border-color: var(--accent-color) !important;
                    color: var(--accent-color) !important;
                    transform: translateY(-1px);
                }

                /* Preview Modal Animations */
                .preview-modal-backdrop {
                    animation: modalFadeIn 0.18s ease-out;
                }
                .preview-modal-card {
                    animation: modalScaleUp 0.22s cubic-bezier(0.16, 1, 0.3, 1);
                }
                @keyframes modalFadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes modalScaleUp {
                    from { transform: scale(0.96) translateY(8px); opacity: 0; }
                    to { transform: scale(1) translateY(0); opacity: 1; }
                }

                /* Responsive Breakpoints */
                @media (max-width: 1023px) and (min-width: 640px) {
                    .achievements-responsive-grid {
                        grid-template-columns: repeat(2, 1fr) !important;
                    }
                }
                @media (max-width: 639px) {
                    .achievements-responsive-grid {
                        grid-template-columns: 1fr !important;
                    }
                    .summary-stat-pill {
                        font-size: 0.775rem !important;
                        padding: 0.35rem 0.75rem !important;
                    }
                }

                /* Reduced motion support */
                @media (prefers-reduced-motion: reduce) {
                    .preview-modal-backdrop, .preview-modal-card {
                        animation: none !important;
                    }
                    .achievement-grid-card, .achievement-image, .achievement-filter-btn {
                        transition: none !important;
                        transform: none !important;
                    }
                    .achievement-media-slot:hover .achievement-image {
                        transform: none !important;
                    }
                }
            ` }} />
        </section>
    );
};

export default Achievements;
