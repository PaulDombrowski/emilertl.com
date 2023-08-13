import React, { useState, useEffect } from 'react';
import '../App.css';

const Header = () => {
  const [scrollY, setScrollY] = useState(0);
  const [fontSize, setFontSize] = useState('20vw');
  const [textOutline, setTextOutline] = useState(false); // Neuer Zustand für Text-Kontur

  const handleScroll = () => {
    setScrollY(window.scrollY);
  };

  useEffect(() => {
    if (scrollY <= 50) {
      setFontSize(`${13 - scrollY * 0.02}vw`);
      setTextOutline(false); // Text hat normale Füllung bis 50
    } else {
      setFontSize('6vw');
      setTextOutline(true); // Nur Konturen nach 50
    }
  }, [scrollY]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="header-container">
      <h1 style={{ fontSize }} className={`header-text ${textOutline ? 'header-text-outline' : ''}`}>
        EMIL ERTL
      </h1>
    </div>
  );
};

export default Header;
