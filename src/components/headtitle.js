import React, { useState, useEffect } from 'react';
import '../App.css';
import { motion, useAnimation } from 'framer-motion';

const Header = () => {
  const controls = useAnimation();
  const [scrollY, setScrollY] = useState(0);

  const handleScroll = () => {
    setScrollY(window.scrollY);
  };

  useEffect(() => {
    if (scrollY <= 50) {
      controls.start({ fontSize: `${11 - scrollY * 0.02}vw`, opacity: 1 });
    } else {
      controls.start({ fontSize: '5vw', opacity: 0.5 });
    }
  }, [scrollY, controls]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="header-container">
      <motion.h1 
        className="header-text"
        animate={controls}
        whileHover={{ opacity: 1 }}
      >
        EMIL ERTL
      </motion.h1>
    </div>
  );
};

export default Header


