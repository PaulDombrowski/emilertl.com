import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import '../App.css';

const TITLE_TEXT = 'EMIL ERTL';
const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
const ZERO_THRESHOLD = 0.015;

const computeIntensity = (width) => {
    if (width <= 0) {
        return 1;
    }
    if (width < 420) {
        return 0.34;
    }
    if (width < 640) {
        return 0.44;
    }
    if (width < 960) {
        return 0.62;
    }
    if (width < 1280) {
        return 0.82;
    }
    return 1;
};

function FixedTitle() {
    const [isScrolled, setIsScrolled] = useState(false);
    const innerRef = useRef(null);
    const textRef = useRef(null);
    const shadowRef = useRef(null);
    const scrollVisualRef = useRef(false);
    const bendDirectionRef = useRef(1);
    const lastScrollRef = useRef(0);
    const ratioStateRef = useRef({ current: 0, target: 0, holdTimeout: null, raf: null });
    const intensityRef = useRef(1);

    useEffect(() => {
        const stateRef = ratioStateRef;

        const applyRatio = (ratio) => {
            const intensity = intensityRef.current || 1;
            const effective = ratio * intensity;
            const stretch = ratio <= ZERO_THRESHOLD ? 1 : 1 + effective * 3.6;
            const direction = bendDirectionRef.current || 1;
            const slant = ratio <= ZERO_THRESHOLD ? 0 : direction * (8 + effective * 6.5);

            if (innerRef.current) {
                innerRef.current.style.setProperty('--heading-stretch', stretch.toFixed(3));
                innerRef.current.style.setProperty('--heading-tilt', `${slant.toFixed(3)}deg`);
                innerRef.current.style.setProperty('--heading-glow', '0');
                innerRef.current.style.setProperty('--heading-blur', '0px');
            }

            if (textRef.current) {
                const skewX = ratio <= ZERO_THRESHOLD ? 0 : (-direction * 4);
                textRef.current.style.transform = `skewY(${slant.toFixed(3)}deg) scaleY(${stretch.toFixed(3)}) skewX(${skewX.toFixed(3)}deg)`;
            }

            if (shadowRef.current) {
                shadowRef.current.style.opacity = '0';
            }
        };

        const animate = () => {
            const state = stateRef.current;
            const diff = state.target - state.current;
            const next = Math.abs(diff) < 0.0008 ? state.target : state.current + diff * 0.18;
            state.current = next;
            applyRatio(next);

            const shouldAppearScrolled = next > ZERO_THRESHOLD;
            if (shouldAppearScrolled !== scrollVisualRef.current) {
                scrollVisualRef.current = shouldAppearScrolled;
                setIsScrolled(shouldAppearScrolled);
            }

            if (Math.abs(state.target - next) < 0.0008 && state.target === 0) {
                state.current = 0;
                state.raf = null;
                return;
            }

            state.raf = requestAnimationFrame(animate);
        };

        const ensureAnimation = () => {
            const state = stateRef.current;
            if (!state.raf) {
                state.raf = requestAnimationFrame(animate);
            }
        };

        const handleScroll = () => {
            if (typeof window === 'undefined') {
                return;
            }
            const currentScroll = window.scrollY || window.pageYOffset || 0;
            const delta = currentScroll - lastScrollRef.current;
            lastScrollRef.current = currentScroll;
            if (delta !== 0) {
                bendDirectionRef.current = delta > 0 ? 1 : -1;
            }

            if (currentScroll <= 0) {
                if (scrollVisualRef.current) {
                    scrollVisualRef.current = false;
                    setIsScrolled(false);
                }
                stateRef.current.target = 0;
                ensureAnimation();
                return;
            }

            if (!scrollVisualRef.current) {
                scrollVisualRef.current = true;
                setIsScrolled(true);
            }

            const ratio = clamp(currentScroll / 380, 0, 1);
            stateRef.current.target = ratio;
            ensureAnimation();
        };

        intensityRef.current = computeIntensity(typeof window !== 'undefined' ? window.innerWidth : 1440);
        applyRatio(0);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            const state = stateRef.current;
            if (state.raf) {
                cancelAnimationFrame(state.raf);
                state.raf = null;
            }
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <motion.h1
            className={`fixed-title ${isScrolled ? 'scrolled' : ''}`}
            aria-label={TITLE_TEXT}
            initial={{ opacity: 0, filter: 'blur(10px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1.2, ease: [0.2, 0.7, 0.1, 1] }}
        >
            <span className="fixed-title__inner" ref={innerRef} aria-hidden="true">
                <span className="fixed-title__shadow" ref={shadowRef}>{TITLE_TEXT}</span>
                <span className="fixed-title__text" ref={textRef}>{TITLE_TEXT}</span>
            </span>
        </motion.h1>
    );
}

export default FixedTitle;
