import React, { useEffect, useRef, useState } from 'react';

const ParticleIntro = ({ onComplete }) => {
    const canvasRef = useRef(null);
    const containerRef = useRef(null);
    const [isFadingOut, setIsFadingOut] = useState(false);

    useEffect(() => {
        // Check if intro has already been viewed in this session
        const hasSeenIntro = sessionStorage.getItem('portfolio_intro_seen') === 'true';
        const hasHash = window.location.hash.length > 1;
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (hasSeenIntro || hasHash || prefersReducedMotion) {
            onComplete();
            return;
        }

        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d', { alpha: false });
        if (!ctx) {
            onComplete();
            return;
        }

        let width = window.innerWidth;
        let height = window.innerHeight;
        let dpr = Math.min(window.devicePixelRatio || 1, 2);

        canvas.width = width * dpr;
        canvas.height = height * dpr;
        ctx.scale(dpr, dpr);

        // Particle configuration
        const particleCount = width < 768 ? 750 : 1500;
        const maxDepth = 1200;
        const fov = 320;

        // Palette inspired by reference: luminous teal, vibrant cyan, occasional violet
        const colors = [
            'rgba(0, 229, 201, ',   // Luminous Teal (Dominant)
            'rgba(45, 212, 191, ',  // Bright Teal
            'rgba(0, 168, 158, ',   // Deep Teal
            'rgba(56, 189, 248, ',  // Cyan
            'rgba(103, 232, 249, ', // Light Cyan
            'rgba(168, 85, 247, ',  // Violet (Occasional)
            'rgba(192, 132, 252, ', // Soft Violet
        ];

        const particles = [];
        for (let i = 0; i < particleCount; i++) {
            // Distribute with higher density toward the center core (matching reference)
            const spreadFactor = Math.pow(Math.random(), 1.4);
            const angle = Math.random() * Math.PI * 2;
            const radius = spreadFactor * Math.hypot(width, height) * 0.9;

            // 15% violet, 85% teal & cyan
            const isViolet = Math.random() < 0.15;
            const colorPrefix = isViolet
                ? (Math.random() < 0.5 ? colors[5] : colors[6])
                : colors[Math.floor(Math.random() * 5)];

            particles.push({
                x: Math.cos(angle) * radius,
                y: Math.sin(angle) * radius,
                z: Math.random() * maxDepth,
                baseRadius: Math.random() * 1.8 + 0.6,
                colorPrefix,
                twinkleSpeed: Math.random() * 3 + 1.5,
                twinklePhase: Math.random() * Math.PI * 2,
                speedZ: Math.random() * 4.5 + 3.0,
            });
        }

        let animationFrameId;
        const startTime = performance.now();
        let isEnded = false;

        const endIntro = () => {
            if (isEnded) return;
            isEnded = true;
            sessionStorage.setItem('portfolio_intro_seen', 'true');
            setIsFadingOut(true);
            setTimeout(() => {
                onComplete();
            }, 750);
        };

        const render = (now) => {
            if (isEnded) return;
            animationFrameId = requestAnimationFrame(render);

            const elapsedSec = (now - startTime) * 0.001;

            // Stage timing:
            // 0s to 1.6s: Starfield tunnel flight toward viewer
            // 1.6s to 2.5s: Smooth convergence toward center
            // 2.5s: Trigger portfolio reveal
            if (elapsedSec >= 2.55) {
                endIntro();
                return;
            }

            const isConverging = elapsedSec > 1.55;
            const convergenceFactor = isConverging ? Math.min(1, (elapsedSec - 1.55) / 0.95) : 0;

            // Deep charcoal-green / near-black canvas clear
            ctx.fillStyle = '#060D0C';
            ctx.fillRect(0, 0, width, height);

            const centerX = width * 0.5;
            const centerY = height * 0.5;

            // Draw deep luminous central nebula glow (matching reference image)
            const coreGlow = ctx.createRadialGradient(
                centerX, centerY, 0,
                centerX, centerY, Math.min(width, height) * 0.55
            );
            coreGlow.addColorStop(0, 'rgba(0, 229, 201, 0.22)');
            coreGlow.addColorStop(0.25, 'rgba(0, 168, 158, 0.12)');
            coreGlow.addColorStop(0.55, 'rgba(6, 40, 36, 0.08)');
            coreGlow.addColorStop(1, 'rgba(6, 13, 12, 0)');

            ctx.fillStyle = coreGlow;
            ctx.fillRect(0, 0, width, height);

            // Render and update 3D particles
            for (let i = 0; i < particleCount; i++) {
                const p = particles[i];

                // Fly toward viewer along Z
                if (isConverging) {
                    // Stage B: Convergence flow toward center
                    p.x *= (1 - 0.035 * (1 + convergenceFactor));
                    p.y *= (1 - 0.035 * (1 + convergenceFactor));
                    p.z -= p.speedZ * (1 + convergenceFactor * 2.5);
                } else {
                    p.z -= p.speedZ;
                }

                // Recycle particles that pass the camera
                if (p.z <= 0) {
                    p.z = maxDepth;
                    const spread = Math.pow(Math.random(), 1.4);
                    const ang = Math.random() * Math.PI * 2;
                    const rad = spread * Math.hypot(width, height) * 0.85;
                    p.x = Math.cos(ang) * rad;
                    p.y = Math.sin(ang) * rad;
                }

                // 3D perspective projection
                const scale = fov / (fov + p.z);
                const screenX = centerX + p.x * scale;
                const screenY = centerY + p.y * scale;

                if (screenX >= -10 && screenX <= width + 10 && screenY >= -10 && screenY <= height + 10) {
                    const depthAlpha = Math.max(0.15, Math.min(1, 1 - (p.z / maxDepth) * 0.85));
                    const twinkle = 0.85 + 0.25 * Math.sin(elapsedSec * p.twinkleSpeed + p.twinklePhase);
                    const alpha = Math.min(1, depthAlpha * twinkle);
                    const radius = Math.max(0.6, p.baseRadius * scale * 1.8);

                    ctx.beginPath();
                    ctx.arc(screenX, screenY, radius, 0, Math.PI * 2);
                    ctx.fillStyle = `${p.colorPrefix}${alpha.toFixed(2)})`;
                    ctx.fill();

                    // Soft outer glow for prominent near particles
                    if (scale > 0.65 && !isConverging) {
                        ctx.beginPath();
                        ctx.arc(screenX, screenY, radius * 2.2, 0, Math.PI * 2);
                        ctx.fillStyle = `${p.colorPrefix}${(alpha * 0.25).toFixed(2)})`;
                        ctx.fill();
                    }
                }
            }
        };

        animationFrameId = requestAnimationFrame(render);

        const onResize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            dpr = Math.min(window.devicePixelRatio || 1, 2);
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            ctx.scale(dpr, dpr);
        };

        window.addEventListener('resize', onResize);

        // Allow instant skip on click or Esc key
        const onKeyDown = (e) => {
            if (e.key === 'Escape' || e.key === ' ') {
                endIntro();
            }
        };

        window.addEventListener('keydown', onKeyDown);

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', onResize);
            window.removeEventListener('keydown', onKeyDown);
        };
    }, [onComplete]);

    return (
        <div
            ref={containerRef}
            onClick={() => {
                sessionStorage.setItem('portfolio_intro_seen', 'true');
                setIsFadingOut(true);
                setTimeout(onComplete, 500);
            }}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                zIndex: 99999,
                backgroundColor: '#060D0C',
                opacity: isFadingOut ? 0 : 1,
                transform: isFadingOut ? 'scale(1.04)' : 'scale(1)',
                filter: isFadingOut ? 'blur(6px)' : 'none',
                transition: 'opacity 0.75s cubic-bezier(0.4, 0, 0.2, 1), transform 0.75s cubic-bezier(0.4, 0, 0.2, 1), filter 0.75s ease',
                cursor: 'pointer',
                overflow: 'hidden',
                userSelect: 'none',
            }}
            title="Click to skip intro"
        >
            <canvas
                ref={canvasRef}
                style={{
                    display: 'block',
                    width: '100%',
                    height: '100%',
                }}
            />

            {/* Subtle discreet skip indicator */}
            <div
                style={{
                    position: 'absolute',
                    bottom: '24px',
                    right: '28px',
                    color: 'rgba(255, 255, 255, 0.4)',
                    fontSize: '0.775rem',
                    letterSpacing: '0.05em',
                    fontWeight: 500,
                    textTransform: 'uppercase',
                    pointerEvents: 'none',
                    transition: 'opacity 0.3s ease',
                }}
            >
                Skip ✕
            </div>
        </div>
    );
};

export default ParticleIntro;
