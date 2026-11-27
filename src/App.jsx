import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";

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

  // Start wedding music
  const startMusic = useCallback(() => {
    const audio = audioRef.current;

    if (!audio || manuallyPausedRef.current) return;

    audio.volume = 0.45;

    audio
      .play()
      .then(() => {
        if (manuallyPausedRef.current) {
          audio.pause();
          return;
        }

        setIsMusicPlaying(true);
      })
      .catch(() => {
        setIsMusicPlaying(false);
      });
  }, []);

  // Initialize music immediately
  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    audio.volume = 0.45;
    audio.preload = "auto";

    // Attempt autoplay on website load
    startMusic();

    // Custom wedding music event
    window.addEventListener(
      "weddingMusicStart",
      startMusic
    );

    // Start music on first scratch or touch
    const handleFirstInteraction = (event) => {
      if (
        event.target instanceof Element &&
        event.target.closest("[data-music-toggle]")
      ) {
        return;
      }

      if (manuallyPausedRef.current) return;

      if (audio.paused) {
        window.dispatchEvent(
          new Event("weddingMusicStart")
        );
      }
    };

    window.addEventListener(
      "pointerdown",
      handleFirstInteraction,
      true
    );

    window.addEventListener(
      "pointerup",
      handleFirstInteraction,
      true
    );

    window.addEventListener(
      "touchstart",
      handleFirstInteraction,
      true
    );

    window.addEventListener(
      "touchend",
      handleFirstInteraction,
      true
    );

    window.addEventListener(
      "click",
      handleFirstInteraction,
      true
    );

    window.addEventListener(
      "keydown",
      handleFirstInteraction,
      true
    );

    return () => {
      window.removeEventListener(
        "weddingMusicStart",
        startMusic
      );

      window.removeEventListener(
        "pointerdown",
        handleFirstInteraction,
        true
      );

      window.removeEventListener(
        "pointerup",
        handleFirstInteraction,
        true
      );

      window.removeEventListener(
        "touchstart",
        handleFirstInteraction,
        true
      );

      window.removeEventListener(
        "touchend",
        handleFirstInteraction,
        true
      );

      window.removeEventListener(
        "click",
        handleFirstInteraction,
        true
      );

      window.removeEventListener(
        "keydown",
        handleFirstInteraction,
        true
      );
    };
  }, [startMusic]);

  // Music ON / OFF button
  const toggleCircleMusic = (e) => {
    e.stopPropagation();

    const audio = audioRef.current;

    if (!audio) return;

    if (audio.paused) {
      manuallyPausedRef.current = false;
      startMusic();
    } else {
      manuallyPausedRef.current = true;
      audio.pause();
      setIsMusicPlaying(false);
    }
  };

  // Page1 reveal complete
  const handleRevealComplete = useCallback(() => {
    setPage1Opened(true);
  }, []);

  return (
    <div className="w-full min-h-screen bg-[#04091a] relative">

      {/* SINGLE SHARED WEDDING MUSIC PLAYER */}

      <audio
        ref={audioRef}
        src={Weddingaudio}
        loop
        autoPlay
        preload="auto"
        playsInline
        onPlaying={() => {
          if (!manuallyPausedRef.current) {
            setIsMusicPlaying(true);
          }
        }}
        onPause={() => {
          setIsMusicPlaying(false);
        }}
        onEnded={() => {
          setIsMusicPlaying(false);
        }}
      />

      {/* FLOATING MUSIC CONTROL BUTTON */}

      <button
        type="button"
        data-music-toggle
        onClick={toggleCircleMusic}
        aria-label={
          isMusicPlaying
            ? "Turn music off"
            : "Turn music on"
        }
        title={
          isMusicPlaying
            ? "Pause music"
            : "Play music"
        }
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

      {/* OPENING PAGE */}

      <Page1
        onRevealComplete={handleRevealComplete}
      />

      {/* REMAINING WEDDING WEBSITE SECTIONS */}

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