import React, { useState, useEffect } from 'react';
import './App.css';
import { motion, AnimatePresence } from 'framer-motion';
import Background from './components/backgroundgif';
import AccordionWithContent from './components/Content';
import FixedTitle from './components/header';

function App() {
  // Zustand für den Ladebalken
  const [isLoading, setIsLoading] = useState(true);

  // Simuliere einen Ladevorgang, nur zum Testen
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // 3 Sekunden

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  return (
    <div style={{ minHeight: "100vh", background: "rgba(255, 128, 227, 0.5)" }}>
      <a className="skip-link" href="#main-content">
        Zum Inhalt springen
      </a>
      <Background /> {/* Hier wird der Background sofort geladen */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            exit={{ width: 0 }}
            transition={{ duration: 3 }} 
            id="loadingBar"
          ></motion.div>
        )}
      </AnimatePresence>
      <FixedTitle />
      <motion.div
        initial={{ opacity: 0, y: 16, scale: 1.04, filter: 'blur(10px)' }}
        animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
        transition={{ duration: 1.2, delay: 0.35, ease: [0.2, 0.7, 0.1, 1] }}
      >
        <main id="main-content">
          <AccordionWithContent />
        </main>
      </motion.div>
    </div>
  );
}

export default App;
