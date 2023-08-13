import React from 'react';
import './App.css';
import BackgroundVideo from './components/background';
import Header from './components/headtitle';
import AccordionWithContent from './components/Content';


function App() {
  return (
    <div>
      <BackgroundVideo />
      <div style={{ height: "200vh", background: "rgba(255, 128, 227, 0.5)" }}> 
     
      <Header />   

      <AccordionWithContent/>  
   
      


      </div>
    </div>
  );
}

export default App;