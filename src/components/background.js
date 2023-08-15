import React, { useEffect, useState } from "react";

function BackgroundVideo() {
    const [opacity, setOpacity] = useState(0);
    const [timer, setTimer] = useState(null);

    const adjustOverlayHeight = () => {
        const overlay = document.querySelector('.video-overlay');
        if (overlay) {
            overlay.style.height = `${document.body.scrollHeight}px`;
        }
    };

    const handleScroll = (e) => {
        const newOpacity = Math.min(Math.abs(e.deltaY) * 0.005, 1);
        setOpacity(newOpacity);

        if (timer) {
            clearTimeout(timer);
        }

        const newTimer = setTimeout(() => {
            setOpacity(0);
            setTimer(null);
        }, 150);

        setTimer(newTimer);
    };

    useEffect(() => {
        adjustOverlayHeight();
        window.addEventListener("resize", adjustOverlayHeight);
        window.addEventListener("click", adjustOverlayHeight);  // Höhe anpassen, wenn auf das Akkordeon geklickt wird

        window.addEventListener("wheel", handleScroll);
        return () => {
            window.removeEventListener("wheel", handleScroll);
            window.removeEventListener("resize", adjustOverlayHeight);
            window.removeEventListener("click", adjustOverlayHeight);
            if (timer) clearTimeout(timer);
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
