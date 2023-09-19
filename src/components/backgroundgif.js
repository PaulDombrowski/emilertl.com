import React, { useState, useEffect } from 'react';
import '../App.css';


const gifPath = `${process.env.PUBLIC_URL}/MOSHED-2023-9-14-12-10-25.gif`;

function Background() {
    const [scrolling, setScrolling] = useState(false);
    
    const handleScroll = () => {
        if (!scrolling) {
            setScrolling(true);
            setTimeout(() => {
                setScrolling(false);
            }, 300);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [scrolling]);

    useEffect(() => {
        const handleArrowKeys = (e) => {
            if (e.keyCode === 38 || e.keyCode === 40) {
                handleScroll();
            }
        };

        window.addEventListener('keydown', handleArrowKeys);
        return () => window.removeEventListener('keydown', handleArrowKeys);
    }, []);

    return (
        <>
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="0" height="0">
                <defs>
                    <filter id="turbulent">
                        <feTurbulence type="fractalNoise" baseFrequency="0.01" numOctaves="2" result="turbulence">
                            <animate attributeName="seed" values="2;35;1" dur="4s" repeatCount="indefinite"/>
                        </feTurbulence>
                        <feDisplacementMap in2="turbulence" in="SourceGraphic" scale="30" xChannelSelector="R" yChannelSelector="G"></feDisplacementMap>
                    </filter>
                </defs>
            </svg>
            <div className={`background-image ${scrolling ? 'scrolling' : ''}`} style={{ backgroundImage: `url(${gifPath})` }}></div>
            <div className={`background-overlay ${scrolling ? 'scrolling' : ''}`}></div>
        </>
    );
}

export default Background;
