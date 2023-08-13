import React from 'react';
import './App.css';
import BackgroundVideo from './components/background';


function App() {
  return (
    <div>
      <BackgroundVideo />
      <div style={{ height: "200vh", background: "rgba(255, 128, 227, 0.4)" }}> 
      {/* Dieser Div gibt Ihnen Scroll-Raum. 
           Das semi-transparente Weiß lässt Sie den Videohintergrund sehen. 
           Fügen Sie hier Ihren Hauptinhalt ein. */}
      </div>
    </div>
  );
}

export default App;