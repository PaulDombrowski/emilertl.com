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
    setTimeout(() => {
      setIsLoading(false);
    }, 3000); // 5 Sekunden
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
}, []);

  return (
    <div style={{ minHeight: "100vh", background: "rgba(255, 128, 227, 0.5)" }}>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            exit={{ width: 0 }}
            transition={{ duration: 5 }}
            id="loadingBar"
          ></motion.div>
        )}
      </AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 1.5 }}
      >
        <Background />
      </motion.div>
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8, duration: 1.2 }}
      >
        <FixedTitle/>
      </motion.div>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.3, duration: 1.2 }}
      >
        <AccordionWithContent />
      </motion.div>
    </div>
  );
}

export default App;
