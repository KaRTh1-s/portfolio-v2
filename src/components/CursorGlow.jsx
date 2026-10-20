import React, { useEffect, useRef } from 'react';

const CursorGlow = () => {
    const glowRef = useRef(null);

    useEffect(() => {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);

        if (prefersReducedMotion || isTouchDevice) {
            return;
        }

        const glowEl = glowRef.current;
        if (!glowEl) return;

        let targetX = -500;
        let targetY = -500;
        let currentX = -500;
        let currentY = -500;
        let isVisible = false;
        let animationFrameId;

        const onMouseMove = (e) => {
            targetX = e.clientX;
            targetY = e.clientY;
            if (!isVisible) {
                isVisible = true;
                glowEl.style.opacity = '1';
            }
        };

        const onMouseLeave = () => {
            isVisible = false;
            glowEl.style.opacity = '0';
        };

        window.addEventListener('mousemove', onMouseMove, { passive: true });
        document.documentElement.addEventListener('mouseleave', onMouseLeave, { passive: true });

        // High-performance 60fps lerp loop without triggering React renders
        const render = () => {
            animationFrameId = requestAnimationFrame(render);

            const lerpSpeed = 0.12;
            currentX += (targetX - currentX) * lerpSpeed;
            currentY += (targetY - currentY) * lerpSpeed;

            // Offset by half size (250px) to center under the cursor
            glowEl.style.transform = `translate3d(${(currentX - 250).toFixed(1)}px, ${(currentY - 250).toFixed(1)}px, 0)`;
        };

        render();

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('mousemove', onMouseMove);
            document.documentElement.removeEventListener('mouseleave', onMouseLeave);
        };
    }, []);

    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                pointerEvents: 'none',
                zIndex: 0,
                overflow: 'hidden',
            }}
            aria-hidden="true"
        >
            <div
                ref={glowRef}
                className="cursor-glow-blob"
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '500px',
                    height: '500px',
                    borderRadius: '50%',
                    background: 'var(--cursor-glow)',
                    opacity: 0,
                    transition: 'opacity 0.4s ease',
                    willChange: 'transform, opacity',
                    pointerEvents: 'none',
                    filter: 'blur(10px)',
                }}
            />
        </div>
    );
};

export default CursorGlow;
