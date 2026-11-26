import React, { useState, useEffect, useRef, useCallback } from "react";
import { Volume2, VolumeX } from "lucide-react";
import Weddingaudio from "./assets/audio/Weddingaudio.mp3";
import Page1 from "./Section/Page1.jsx";
import TheCouple from "./Section/TheCouple.jsx";
import StackCards from "./Section/StackCards.jsx";
import Venues from "./Section/Venues.jsx";
import Countdown from "./Section/Countdown.jsx";
import Closing from "./Section/Closing.jsx";

const App = () => {
  const [page1Opened, setPage1Opened] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  const audioRef = useRef(null);
  const manuallyPausedRef = useRef(false);

  const ensureMusicPlaying = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || manuallyPausedRef.current) return;
    audio.volume = 0.45;
    if (audio.paused) {
      audio
        .play()
        .then(() => setIsMusicPlaying(true))
        .catch(() => setIsMusicPlaying(false));
    } else {
      setIsMusicPlaying(true);
    }
  }, []);

  useEffect(() => {
    ensureMusicPlaying();

    const handleFirstUserGesture = () => {
      ensureMusicPlaying();
    };

    window.addEventListener("pointerdown", handleFirstUserGesture, {
      passive: true,
    });
    window.addEventListener("touchstart", handleFirstUserGesture, {
      passive: true,
    });
    window.addEventListener("keydown", handleFirstUserGesture, {
      passive: true,
    });

    return () => {
      window.removeEventListener("pointerdown", handleFirstUserGesture);
      window.removeEventListener("touchstart", handleFirstUserGesture);
      window.removeEventListener("keydown", handleFirstUserGesture);
    };
  }, [ensureMusicPlaying]);

  const toggleCircleMusic = (e) => {
    e.stopPropagation();
    const audio = audioRef.current;
    if (!audio) return;

    if (!audio.paused) {
      manuallyPausedRef.current = true;
      audio.pause();
      setIsMusicPlaying(false);
    } else {
      manuallyPausedRef.current = false;
      ensureMusicPlaying();
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#04091a] relative">
      <audio
        ref={audioRef}
        src={Weddingaudio}
        loop
        autoPlay
        preload="auto"
        onPlay={() => {
          if (!manuallyPausedRef.current) setIsMusicPlaying(true);
        }}
        onPause={() => setIsMusicPlaying(false)}
      />

      <button
        type="button"
        onClick={toggleCircleMusic}
        aria-label={isMusicPlaying ? "Turn music off" : "Turn music on"}
        className={`fixed bottom-5 right-4 sm:right-6 z-50 w-10 h-10 rounded-full border flex items-center justify-center backdrop-blur-md shadow-[0_8px_22px_rgba(0,0,0,0.75)] active:scale-95 transition-all cursor-pointer ${
          isMusicPlaying
            ? "bg-[#071330]/90 border-[#f3d078]/75 text-[#ffd166]"
            : "bg-[#071330]/80 border-[#f3d078]/35 text-[#f8e6be]/70"
        }`}
      >
        {isMusicPlaying ? (
          <Volume2 className="w-4 h-4" />
        ) : (
          <VolumeX className="w-4 h-4" />
        )}
      </button>

      <Page1 onRevealComplete={() => setPage1Opened(true)} />

      {page1Opened && (
        <div className="w-full transition-opacity duration-700 opacity-100">
          <TheCouple />
          <StackCards />
          <Venues />
          <Countdown />
          <Closing />
        </div>
      )}
    </div>
  );
};

export default App;