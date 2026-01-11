import React, { useEffect, useRef, useState } from 'react';
import '../App.css';

const SLOW_THRESHOLD = 800; // ms before we show "still loading"

const joinClassNames = (...args) => args.filter(Boolean).join(' ');

function SmartImage({ src, alt, className = '', shimmer = true, revealDelay = 90, sizes, ...rest }) {
    const containerRef = useRef(null);
    const imgRef = useRef(null);
    const slowTimerRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isFailed, setIsFailed] = useState(false);
    const [isSlow, setIsSlow] = useState(false);

    useEffect(() => {
        const target = containerRef.current;
        if (!target) {
            return () => {};
        }

        if (typeof IntersectionObserver === 'undefined') {
            setIsVisible(true);
            return () => {};
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting || entry.intersectionRatio > 0.15) {
                    setIsVisible(true);
                }
            });
        }, {
            rootMargin: '150px',
            threshold: [0, 0.15, 0.35, 0.65, 1]
        });

        observer.observe(target);

        return () => {
            observer.unobserve(target);
        };
    }, []);

    useEffect(() => {
        if (!isVisible || isLoaded || isFailed) {
            return () => {};
        }

        slowTimerRef.current = window.setTimeout(() => {
            setIsSlow(true);
        }, SLOW_THRESHOLD);

        return () => {
            if (slowTimerRef.current) {
                clearTimeout(slowTimerRef.current);
                slowTimerRef.current = null;
            }
        };
    }, [isVisible, isLoaded, isFailed]);

    useEffect(() => {
        return () => {
            if (slowTimerRef.current) {
                clearTimeout(slowTimerRef.current);
            }
        };
    }, []);

    const handleLoad = () => {
        if (slowTimerRef.current) {
            clearTimeout(slowTimerRef.current);
            slowTimerRef.current = null;
        }
        window.setTimeout(() => {
            setIsLoaded(true);
            setIsSlow(false);
        }, revealDelay);
    };

    const handleError = () => {
        if (slowTimerRef.current) {
            clearTimeout(slowTimerRef.current);
            slowTimerRef.current = null;
        }
        setIsFailed(true);
        setIsSlow(false);
    };

    const wrapperClass = joinClassNames(
        'smart-image',
        className,
        isVisible && 'smart-image--visible',
        isLoaded && 'smart-image--loaded',
        isFailed && 'smart-image--error'
    );

    const shimmerClass = joinClassNames(
        'smart-image__shimmer',
        isSlow && 'smart-image__shimmer--slow'
    );

    return (
        <span ref={containerRef} className={wrapperClass}>
            {isVisible && !isFailed && (
                <img
                    ref={imgRef}
                    src={src}
                    alt={alt}
                    onLoad={handleLoad}
                    onError={handleError}
                    sizes={sizes}
                    loading="lazy"
                    {...rest}
                />
            )}
            {shimmer && !isLoaded && !isFailed && (
                <span className={shimmerClass} aria-hidden="true" />
            )}
            {isSlow && !isLoaded && !isFailed && (
                <span className="smart-image__hint" role="status">Bild wird geladen …</span>
            )}
            {isFailed && (
                <span className="smart-image__hint smart-image__hint--error" role="alert">Bild konnte nicht geladen werden</span>
            )}
        </span>
    );
}

export default SmartImage;
