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

    // Für Pfeiltasten
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
        <div className={`background ${scrolling ? 'scrolling' : ''}`} style={{ backgroundImage: `url(${gifPath})` }}></div>
    );
}

export default Background;
