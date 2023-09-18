import React, { useEffect, useState } from 'react';
import '../App.css';

function BackgroundComponent() {
    const [scrolling, setScrolling] = useState(false);
    const backgroundImage = "/Screenshot 2023-08-29 103936.png";

    useEffect(() => {
        const handleScroll = () => triggerScrollingEffect();
        const handleKeyDown = (event) => {
            if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
                triggerScrollingEffect();
            }
        };

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    const triggerScrollingEffect = () => {
        setScrolling(true);
        setTimeout(() => setScrolling(false), 500);
    };

    return (
        <div className="background-container">
            <div className="background-image" style={{ backgroundImage: `url(${backgroundImage})` }} />
            <div className={`overlay ${scrolling ? 'scrolling' : ''}`} />
            <svg style={{ visibility: "hidden", position: "absolute", width: 0, height: 0 }}>
                <filter id="wavyFilter">
                    <feTurbulence type="fractalNoise" baseFrequency="0 0.02" numOctaves="1" result="warp" seed="1">
                        <animate attributeName="baseFrequency" values="0 0.02; 0.02 0.03; 0 0.02" keyTimes="0; 0.5; 1" dur="3s" repeatCount="indefinite" />
                    </feTurbulence>
                    <feDisplacementMap xChannelSelector="R" yChannelSelector="G" scale="20" in="SourceGraphic" in2="warp" />
                </filter>
            </svg>
        </div>
    );
}

export default BackgroundComponent;
