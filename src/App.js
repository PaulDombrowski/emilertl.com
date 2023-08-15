import React from 'react';
import './App.css';
import BackgroundVideo from './components/background';
import Header from './components/headtitle';
import AccordionWithContent from './components/Content';


function App() {
  return (
    <div style={{ minHeight: "100vh", background: "rgba(255, 128, 227, 0.5)" }}>
      <BackgroundVideo />
      <Header />   
      <AccordionWithContent />
    </div>
  );
}



export default App;