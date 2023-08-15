import React, { useEffect, useState } from "react";

function BackgroundVideo() {
  const [opacity, setOpacity] = useState(0);  // Initialzustand von Opazität ist 0
  const [timer, setTimer] = useState(null);   // Ein Timer, um die Opazität zurückzusetzen, nachdem das Scrollen aufgehört hat

  const handleScroll = (e) => {
    // Diese Logik setzt die Opazität abhängig von der Scrollgeschwindigkeit. 
    // Sie können den Multiplikator anpassen, um den Effekt zu verstärken oder abzuschwächen.
    const newOpacity = Math.min(Math.abs(e.deltaY) * 0.005, 1);
    setOpacity(newOpacity);

    // Wenn bereits ein Timer existiert, löschen Sie ihn
    if (timer) {
      clearTimeout(timer);
    }

    // Setzen Sie einen neuen Timer, um die Opazität nach einer kurzen Verzögerung zurückzusetzen
    const newTimer = setTimeout(() => {
      setOpacity(0);
      setTimer(null);
    }, 150);  // Nach 150ms wird die Opazität zurückgesetzt

    setTimer(newTimer);
  };

  useEffect(() => {
    window.addEventListener("wheel", handleScroll);
    return () => {
      window.removeEventListener("wheel", handleScroll);
      if (timer) clearTimeout(timer);  // Löschen Sie den Timer, wenn die Komponente unmountet
    };
  }, [timer]);

  return (
    <>
      <div className="video-overlay" style={{ background: `rgba(255, 0, 0, ${opacity})` }}></div>
      <video 
        id="backgroundVideo" 
        autoPlay 
        muted 
        loop
      >
        <source src={process.env.PUBLIC_URL + '/Rec_2023-06-29 14-35-19.mp4'} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </>
  );
}

export default BackgroundVideo;
