
import React, { useRef, useState } from "react";

import palacePoster from "../assets/Images/palace.png";
import palaceVideo from "../assets/Video/wedding-hero.mp4";

export default function Page1() {
  const videoRef = useRef(null);

  const [started, setStarted] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [showNames, setShowNames] = useState(false);
  const [videoFinished, setVideoFinished] = useState(false);

  // Change names here
  const brideName = "Aarav";
  const groomName = "Shanaya";

  const handleEnter = async () => {
    const video = videoRef.current;

    if (!video || started) return;

    setStarted(true);
    setVideoError(false);

    video.currentTime = 0;

    try {
      await video.play();
    } catch (error) {
      console.error("Video playback failed:", error);
      setVideoError(true);
      setStarted(false);
    }
  };

  // Reveal names near the end of the 6-second video
  const handleTimeUpdate = () => {
    const video = videoRef.current;

    if (!video) return;

    if (video.currentTime >= 4.8) {
      setShowNames(true);
    }
  };

  const handleVideoEnd = () => {
    setShowNames(true);
    setVideoFinished(true);
  };

  return (
    <section className="relative flex h-[100svh] w-full items-center justify-center overflow-hidden bg-black">

      {/* 9:16 RESPONSIVE FRAME */}
      <div
        className="relative h-[100svh] max-h-[100svh] overflow-hidden bg-[#EBD9BD]"
        style={{
          width: "min(100vw, 56.25vh)",
          aspectRatio: "9 / 16",
        }}
      >

        {/* POSTER IMAGE */}
        <img
          src={palacePoster}
          alt="Royal Rajasthani Palace"
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
            started ? "opacity-0" : "opacity-100"
          }`}
        />

        {/* PALACE VIDEO */}
        <video
          ref={videoRef}
          src={palaceVideo}
          poster={palacePoster}
          playsInline
          preload="auto"
          muted={false}
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleVideoEnd}
          onError={() => {
            setVideoError(true);
            setStarted(false);
          }}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
            started ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* SUBTLE DARK OVERLAY */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/25" />

        {/* TAP TO ENTER */}
        {!started && (
          <div className="absolute inset-0 z-20 flex items-end justify-center pb-[13%]">

            <button
              onClick={handleEnter}
              className="group relative flex items-center justify-center border border-[#D9B76B] bg-[#681F29]/90 px-9 py-4 text-[#F8E8C5] shadow-[0_5px_25px_rgba(0,0,0,0.25)] transition-all duration-500 hover:scale-105 hover:bg-[#7B2934]"
            >
              <span className="absolute -inset-1 border border-[#D9B76B]/50" />

              <span className="relative font-serif text-xs tracking-[0.35em]">
                TAP TO ENTER
              </span>
            </button>

          </div>
        )}

        {/* VIDEO ERROR MESSAGE */}
        {videoError && (
          <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/70 p-6 text-center">
            <div>
              <p className="font-serif text-lg text-white">
                Unable to play the video
              </p>

              <button
                onClick={() => {
                  setVideoError(false);
                  setStarted(false);
                }}
                className="mt-4 border border-[#D9B76B] px-6 py-2 text-xs tracking-widest text-[#F8E8C5]"
              >
                TRY AGAIN
              </button>
            </div>
          </div>
        )}

        {/* COUPLE NAMES REVEAL */}
        <div
          className={`pointer-events-none absolute left-0 right-0 top-[12%] z-20 flex flex-col items-center text-center transition-all duration-[1500ms] ease-out ${
            showNames
              ? "translate-y-0 scale-100 opacity-100"
              : "-translate-y-8 scale-95 opacity-0"
          }`}
        >
          <p className="mb-3 font-serif text-[9px] tracking-[0.45em] text-[#F8E8C5] drop-shadow-md">
            TOGETHER WITH THEIR FAMILIES
          </p>

          <h1 className="font-serif text-3xl font-normal text-[#FFF0D2] drop-shadow-[0_3px_8px_rgba(0,0,0,0.65)] sm:text-4xl">
            {brideName}
            <span className="mx-2 text-[#E5C078]">&</span>
            {groomName}
          </h1>

          <div className="mt-4 flex items-center gap-3">
            <span className="h-px w-8 bg-[#D9B76B]" />
            <span className="text-xs text-[#F1D08B]">✦</span>
            <span className="h-px w-8 bg-[#D9B76B]" />
          </div>
        </div>

        {/* ENDING DARK GRADIENT */}
        <div
          className={`pointer-events-none absolute inset-x-0 top-0 z-10 h-[35%] bg-gradient-to-b from-black/30 to-transparent transition-opacity duration-1000 ${
            showNames ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* VIDEO FINISHED INDICATOR */}
        {videoFinished && (
          <div className="absolute bottom-6 left-0 right-0 z-20 text-center">
            <span className="font-serif text-[9px] tracking-[0.35em] text-[#F8E8C5]">
              A ROYAL CELEBRATION AWAITS
            </span>
          </div>
        )}

      </div>
    </section>
  );
}
