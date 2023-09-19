import React, { useEffect, useState } from 'react';
import '../App.css';

function BackgroundComponent() {
    const [scrolling, setScrolling] = useState(false);
    const backgroundImage = "/public/Screenshot 2023-08-29 103936.png";

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
        <div className="background-container" style={{ backgroundImage: `url(${backgroundImage})` }}>
            <div className={`overlay ${scrolling ? 'scrolling' : ''}`} />
            <svg style={{ visibility: "hidden", position: "absolute", width: 0, height: 0 }}>
                <filter id="wavyFilter">
                <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="2" result="turbulence">
    <animate attributeName="seed" values="2;20;2" dur="4s" repeatCount="indefinite"/>
</feTurbulence>
<feDisplacementMap in2="turbulence" in="SourceGraphic" scale="20" xChannelSelector="R" yChannelSelector="G"></feDisplacementMap>

                </filter>
            </svg>
        </div>
    );
}

export default BackgroundComponent;
