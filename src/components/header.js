import React, { useState, useEffect } from 'react';
import '../App.css';

function FixedTitle() {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        }

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <h1 className={`fixed-title ${isScrolled ? "scrolled" : ""}`}>EMIL ERTL</h1>
    );
}

export default FixedTitle;
