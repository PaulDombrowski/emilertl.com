import React, { useEffect, useState } from "react";

function BackgroundVideo() {
    const [opacity, setOpacity] = useState(0);
    const [timer, setTimer] = useState(null);
    const [startTouchY, setStartTouchY] = useState(null);

    const adjustOverlayHeight = () => {
        const overlay = document.querySelector('.video-overlay');
        if (overlay) {
            overlay.style.height = `${document.body.scrollHeight}px`;
        }
    };

    const handleScroll = (e) => {
        const newOpacity = Math.min(Math.abs(e.deltaY) * 0.005, 1);
        setOpacity(newOpacity);
        resetTimer();
    };

    const handleTouchStart = (e) => {
        setStartTouchY(e.touches[0].clientY);
    };

    const handleTouchMove = (e) => {
        if (startTouchY === null) return;

        const deltaY = startTouchY - e.touches[0].clientY;
        const newOpacity = Math.min(Math.abs(deltaY) * 0.005, 1);
        setOpacity(newOpacity);
        resetTimer();
    };

    const handleKeyDown = (e) => {
        if (e.keyCode === 40) { // KeyCode für Pfeil nach unten
            const newOpacity = Math.min(opacity + 0.05, 1);
            setOpacity(newOpacity);
            resetTimer();
        }
    };

    const handleScrollEvent = () => {
        const newOpacity = Math.min(opacity + 0.05, 1);
        setOpacity(newOpacity);
        resetTimer();
    };

    const resetTimer = () => {
        if (timer) {
            clearTimeout(timer);
        }

        const newTimer = setTimeout(() => {
            setOpacity(0);
            setTimer(null);
        }, 250);

        setTimer(newTimer);
    };

    useEffect(() => {
        adjustOverlayHeight();
        window.addEventListener("resize", adjustOverlayHeight);
        window.addEventListener("click", adjustOverlayHeight);
        window.addEventListener("wheel", handleScroll);
        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("scroll", handleScrollEvent);
        window.addEventListener("touchstart", handleTouchStart);
        window.addEventListener("touchmove", handleTouchMove);
        return () => {
            window.removeEventListener("wheel", handleScroll);
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("scroll", handleScrollEvent);
            window.removeEventListener("touchstart", handleTouchStart);
            window.removeEventListener("touchmove", handleTouchMove);
            window.removeEventListener("resize", adjustOverlayHeight);
            window.removeEventListener("click", adjustOverlayHeight);
            if (timer) clearTimeout(timer);
        };
    }, [timer, startTouchY, opacity]);

    useEffect(() => {
        const videoElement = document.getElementById("backgroundVideo");
        if (videoElement) {
            videoElement.play();

            const handleVideoTimeUpdate = () => {
                if (videoElement.duration - videoElement.currentTime <= 0.5) {
                    videoElement.currentTime = 0;
                    videoElement.play();
                }
            };

            videoElement.addEventListener('timeupdate', handleVideoTimeUpdate);
            return () => {
                videoElement.removeEventListener('timeupdate', handleVideoTimeUpdate);
            };
        }
    }, []);

    return (
        <>
            <div className="video-overlay" style={{ background: `rgba(255, 0, 0, ${opacity})` }}></div>
            <video 
                id="backgroundVideo" 
                autoPlay 
                muted 
                loop
                playsInline
            >
                <source src={process.env.PUBLIC_URL + '/Rec_2023-06-29 14-35-19.mp4'} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </>
    );
}

export default BackgroundVideo;
