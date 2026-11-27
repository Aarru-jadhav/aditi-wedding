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
  const playPendingRef = useRef(false);

  // Start music immediately
  const ensureMusicPlaying = useCallback(() => {
    const audio = audioRef.current;

    if (!audio || manuallyPausedRef.current) return;

    audio.volume = 0.45;

    if (!audio.paused) {
      setIsMusicPlaying(true);
      return;
    }

    if (playPendingRef.current) return;

    playPendingRef.current = true;

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
      })
      .finally(() => {
        playPendingRef.current = false;
      });
  }, []);

  // Start music as soon as website mounts
  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    audio.volume = 0.45;
    audio.preload = "auto";

    ensureMusicPlaying();

    // Retry as soon as audio is ready
    const handleAudioReady = () => {
      ensureMusicPlaying();
    };

    // Start immediately on first user interaction
    const handleUserInteraction = (event) => {
      if (
        event.target instanceof Element &&
        event.target.closest("[data-music-toggle]")
      ) {
        return;
      }

      ensureMusicPlaying();
    };

    audio.addEventListener(
      "canplay",
      handleAudioReady
    );

    window.addEventListener(
      "pointerdown",
      handleUserInteraction,
      true
    );

    window.addEventListener(
      "touchend",
      handleUserInteraction,
      true
    );

    window.addEventListener(
      "click",
      handleUserInteraction,
      true
    );

    window.addEventListener(
      "keydown",
      handleUserInteraction,
      true
    );

    return () => {
      audio.removeEventListener(
        "canplay",
        handleAudioReady
      );

      window.removeEventListener(
        "pointerdown",
        handleUserInteraction,
        true
      );

      window.removeEventListener(
        "touchend",
        handleUserInteraction,
        true
      );

      window.removeEventListener(
        "click",
        handleUserInteraction,
        true
      );

      window.removeEventListener(
        "keydown",
        handleUserInteraction,
        true
      );
    };
  }, [ensureMusicPlaying]);

  // Music ON / OFF button
  const toggleCircleMusic = (e) => {
    e.stopPropagation();

    const audio = audioRef.current;

    if (!audio) return;

    if (!audio.paused || playPendingRef.current) {
      manuallyPausedRef.current = true;

      audio.pause();

      setIsMusicPlaying(false);
    } else {
      manuallyPausedRef.current = false;

      ensureMusicPlaying();
    }
  };

  // Page1 reveal complete
  const handleRevealComplete = useCallback(() => {
    ensureMusicPlaying();

    setPage1Opened(true);
  }, [ensureMusicPlaying]);

  return (
    <div className="w-full min-h-screen bg-[#04091a] relative">

      {/* Background Wedding Music */}

      <audio
        ref={audioRef}
        src={Weddingaudio}
        loop
        autoPlay
        preload="auto"
        playsInline
        onPlay={() => {
          if (!manuallyPausedRef.current) {
            setIsMusicPlaying(true);
          }
        }}
        onPause={() => {
          setIsMusicPlaying(false);
        }}
      />

      {/* Floating Music Control Button */}

      <button
        type="button"
        data-music-toggle
        onClick={toggleCircleMusic}
        aria-label={
          isMusicPlaying
            ? "Turn music off"
            : "Turn music on"
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

      {/* Opening Page */}

      <Page1
        onRevealComplete={handleRevealComplete}
      />

      {/* Remaining Wedding Website Sections */}

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