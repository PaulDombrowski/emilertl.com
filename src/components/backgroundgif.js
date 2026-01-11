import React, { useState, useEffect, useRef, useCallback } from 'react';
import '../App.css';

const gifPath = `${process.env.PUBLIC_URL}/MOSHED-2023-9-14-12-10-25.gif`;

function Background() {
    const [scrolling, setScrolling] = useState(false);
    const timeoutRef = useRef(null);
    const canvasRef = useRef(null);
    const animationRef = useRef(null);
    const ribbonsRef = useRef([]);
    const startTimeRef = useRef(null);
    const gifCycleRef = useRef(5200);
    const dimensionsRef = useRef({
        width: typeof window !== 'undefined' ? window.innerWidth : 0,
        height: typeof window !== 'undefined' ? window.innerHeight : 0
    });

    const activateScrolling = useCallback(() => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        setScrolling(true);
        timeoutRef.current = setTimeout(() => {
            setScrolling(false);
            timeoutRef.current = null;
        }, 300);
    }, []);

    useEffect(() => {
        const body = document.body;
        if (!body) {
            return;
        }
        body.classList.toggle('scrolling', scrolling);
        return () => {
            body.classList.remove('scrolling');
        };
    }, [scrolling]);

    useEffect(() => {
        const handleScroll = () => {
            activateScrolling();
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [activateScrolling]);

    useEffect(() => {
        const handleArrowKeys = (e) => {
            if (e.keyCode === 38 || e.keyCode === 40) {
                activateScrolling();
            }
        };

        window.addEventListener('keydown', handleArrowKeys);
        return () => window.removeEventListener('keydown', handleArrowKeys);
    }, [activateScrolling]);

    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) {
            return undefined;
        }

        const ctx = canvas.getContext('2d');
        if (!ctx) {
            return undefined;
        }

        const updateDimensions = () => {
            const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
            const width = window.innerWidth;
            const height = window.innerHeight;
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            dimensionsRef.current = { width, height };
        };

        const resolveGifCycle = () => {
            if (typeof window === 'undefined' || !document.documentElement) {
                return gifCycleRef.current;
            }

            const rawValue = window.getComputedStyle(document.documentElement).getPropertyValue('--gif-loop-duration').trim();
            if (!rawValue) {
                return gifCycleRef.current;
            }

            const lower = rawValue.toLowerCase();
            let parsed;
            if (lower.endsWith('ms')) {
                parsed = parseFloat(lower.slice(0, -2));
            } else if (lower.endsWith('s')) {
                parsed = parseFloat(lower.slice(0, -1)) * 1000;
            } else {
                parsed = parseFloat(lower);
            }

            if (Number.isNaN(parsed) || parsed <= 0) {
                return gifCycleRef.current;
            }
            return parsed;
        };

        const initRibbons = () => {
            const { width, height } = dimensionsRef.current;
            const count = width < 760 ? 6 : width < 1200 ? 8 : 10;
            const ribbons = [];
            for (let i = 0; i < count; i += 1) {
                const seed = Math.random();
                ribbons.push({
                    baseY: (i + 0.6) / (count + 0.2) * height,
                    amp: (0.12 + seed * 0.18) * height,
                    freq: 0.9 + seed * 1.1,
                    speed: 0.00045 + seed * 0.00055,
                    phase: seed * Math.PI * 2,
                    width: 2.2 + seed * 2.6,
                    hue: 350 + seed * 15
                });
            }
            ribbonsRef.current = ribbons;
            gifCycleRef.current = Math.max(2000, resolveGifCycle());
        };

        const drawRibbons = (time) => {
            const { width, height } = dimensionsRef.current;
            if (startTimeRef.current === null) {
                startTimeRef.current = time;
            }
            const elapsed = time - startTimeRef.current;
            const introDuration = 700;
            const dimLevel = 0.35;
            let intensity = 0.85;
            if (elapsed > introDuration) {
                const fadeWindow = 800;
                const t = Math.min(1, (elapsed - introDuration) / fadeWindow);
                intensity = 1 - (1 - dimLevel) * t;
            }
            const menuOpen = document.body && document.body.classList.contains('menu-open');
            const scrolling = document.body && document.body.classList.contains('scrolling');
            const motionScale = menuOpen ? 0.2 : 1;
            const cycle = gifCycleRef.current || 5200;
            const phase = (elapsed % cycle) / cycle;
            const edge = Math.min(phase, 1 - phase);
            const pulse = Math.max(0, 1 - edge / 0.08);
            const pulseStrength = 1 + pulse * 0.25;
            ctx.clearRect(0, 0, width, height);
            ctx.globalCompositeOperation = 'source-over';

            const ribbons = ribbonsRef.current;
            for (let i = 0; i < ribbons.length; i += 1) {
                const ribbon = ribbons[i];
                const steps = 9;
                const step = width / (steps - 1);
                const swing = Math.sin(time * ribbon.speed * motionScale + ribbon.phase) * ribbon.amp * 0.35;
                const hueShift = Math.sin(time * 0.00035 + i) * 4;
                let hue = (ribbon.hue + hueShift) % 360;
                if (hue < 0) {
                    hue += 360;
                }
                if (hue > 20 && hue < 340) {
                    hue = hue < 180 ? 20 : 340;
                }

                const baseAlpha = 0.75 * intensity * pulseStrength;
                ctx.lineCap = 'round';
                ctx.lineJoin = 'round';

                const accentHue = scrolling ? 52 : (hue + 12) % 360;
                const accentSat = scrolling ? 80 : 62;
                const accentLight = scrolling ? 62 : 45;
                ctx.strokeStyle = `hsla(${accentHue}, ${accentSat}%, ${accentLight}%, ${0.12 * intensity * pulseStrength})`;
                ctx.lineWidth = ribbon.width * (0.62 + intensity * 0.62) * pulseStrength;
                ctx.beginPath();
                for (let s = 0; s < steps; s += 1) {
                    const x = step * s;
                    const wave = Math.sin((s * 0.9) + time * ribbon.speed * 1.2 * motionScale + ribbon.phase) * ribbon.amp;
                    const micro = Math.sin((s * 1.8) - time * ribbon.speed * 0.8 * motionScale) * ribbon.amp * 0.22;
                    const y = ribbon.baseY + wave + micro + swing + 6;
                    if (s === 0) {
                        ctx.moveTo(x, y);
                    } else {
                        const prevX = step * (s - 1);
                        ctx.quadraticCurveTo(prevX + step * 0.5, y, x, y);
                    }
                }
                ctx.stroke();

                const mainHue = scrolling ? 50 : hue;
                const mainSat = scrolling ? 86 : 82;
                const mainLight = scrolling ? 70 : 58;
                ctx.strokeStyle = `hsla(${mainHue}, ${mainSat}%, ${mainLight}%, ${baseAlpha})`;
                ctx.lineWidth = ribbon.width * (0.34 + intensity * 0.56) * pulseStrength;

                ctx.beginPath();
                for (let s = 0; s < steps; s += 1) {
                    const x = step * s;
                    const wave = Math.sin((s * 0.9) + time * ribbon.speed * 1.2 * motionScale + ribbon.phase) * ribbon.amp;
                    const micro = Math.sin((s * 1.8) - time * ribbon.speed * 0.8 * motionScale) * ribbon.amp * 0.22;
                    const y = ribbon.baseY + wave + micro + swing;
                    if (s === 0) {
                        ctx.moveTo(x, y);
                    } else {
                        const prevX = step * (s - 1);
                        ctx.quadraticCurveTo(prevX + step * 0.5, y, x, y);
                    }
                }
                ctx.stroke();

                const dots = 0;
                for (let p = 0; p < dots; p += 1) {
                    const t = (time * 0.0002 * motionScale + p * 0.18 + i * 0.05) % 1;
                    const x = width * t;
                    const wave = Math.sin((t * 7) + time * ribbon.speed * motionScale + ribbon.phase) * ribbon.amp;
                    const micro = Math.cos((t * 13) - time * ribbon.speed * 0.7 * motionScale) * ribbon.amp * 0.18;
                    const y = ribbon.baseY + wave + micro + swing;
                    ctx.fillStyle = `hsla(${(ribbon.hue + hueShift + 20) % 360}, 88%, 68%, ${0.9 * intensity})`;
                    ctx.beginPath();
                    ctx.arc(x, y, 1.3 + intensity * 0.6, 0, Math.PI * 2);
                    ctx.fill();
                }
            }
        };

        let lastFrameTime = 0;
        const frameInterval = 1000 / 24;

        const loop = (timestamp) => {
            animationRef.current = requestAnimationFrame(loop);
            const now = typeof timestamp === 'number' ? timestamp : (typeof performance !== 'undefined' ? performance.now() : Date.now());
            if (now - lastFrameTime < frameInterval) {
                return;
            }
            lastFrameTime = now;
            drawRibbons(now);
        };

        updateDimensions();
        initRibbons();
        const handleResize = () => {
            updateDimensions();
            initRibbons();
        };
        window.addEventListener('resize', handleResize);
        loop();

        return () => {
            window.removeEventListener('resize', handleResize);
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, []);

    return (
        <>
            <div className={`background-image ${scrolling ? 'scrolling' : ''}`} style={{ backgroundImage: `url(${gifPath})` }}></div>
            <canvas ref={canvasRef} className="background-pixels" />
            <div className={`background-overlay ${scrolling ? 'scrolling' : ''}`}></div>
        </>
    );
}

export default Background;
