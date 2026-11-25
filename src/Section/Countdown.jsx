import React, { useState, useEffect } from "react";
import { Sparkles, Heart } from "lucide-react";

const TARGET_DATE_ISO = "2026-12-16T18:00:00+05:30";

function getTimeRemaining(targetIso) {
  const targetMs = new Date(targetIso).getTime();
  const nowMs = Date.now();
  const diff = Math.max(0, targetMs - nowMs);

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return {
    days,
    hours,
    minutes,
    seconds,
    isComplete: diff === 0,
  };
}

function padTwo(num) {
  return String(num).padStart(2, "0");
}

function InteractiveFlower({ isOpen, onToggle, dateText }) {
  const petalCount = 10;
  const angles = Array.from({ length: petalCount }, (_, i) => (360 / petalCount) * i);

  return (
    <div className="relative my-4 flex flex-col items-center justify-center min-h-[230px] w-full">
      {/* Subtle Golden Halo Behind Flower */}
      <div
        className="pointer-events-none absolute w-48 h-48 rounded-full blur-2xl transition-all duration-700"
        style={{
          background: isOpen
            ? "radial-gradient(circle, rgba(243,208,120,0.34) 0%, rgba(29,78,216,0.2) 60%, transparent 75%)"
            : "radial-gradient(circle, rgba(243,208,120,0.22) 0%, rgba(29,78,216,0.28) 60%, transparent 75%)",
        }}
      />

      {/* Clickable Flower Container */}
      <button
        type="button"
        onClick={onToggle}
        aria-label={isOpen ? "Close flower" : "Click flower to reveal date"}
        className="relative w-52 h-52 sm:w-56 sm:h-56 flex items-center justify-center cursor-pointer focus:outline-none group"
      >
        {/* Bloomed Petals Ring Around Center When Open */}
        <svg
          viewBox="0 0 240 240"
          className="absolute inset-0 w-full h-full overflow-visible transition-transform duration-700 ease-out"
          style={{
            transform: isOpen ? "scale(1.14) rotate(18deg)" : "scale(0.95) rotate(0deg)",
          }}
        >
          <defs>
            <radialGradient id="royalPetalGrad" cx="50%" cy="20%" r="75%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="55%" stopColor="#1e40af" />
              <stop offset="100%" stopColor="#08163b" />
            </radialGradient>
            <radialGradient id="goldPetalGrad" cx="50%" cy="20%" r="75%">
              <stop offset="0%" stopColor="#fff3c4" />
              <stop offset="55%" stopColor="#f3d078" />
              <stop offset="100%" stopColor="#b8860b" />
            </radialGradient>
            <filter id="flowerShadow" x="-25%" y="-25%" width="150%" height="150%">
              <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#000000" floodOpacity="0.6" />
            </filter>
          </defs>

          <g filter="url(#flowerShadow)">
            {angles.map((angle, idx) => {
              const isGoldPetal = idx % 2 === 1;
              return (
                <g
                  key={angle}
                  style={{
                    transformOrigin: "120px 120px",
                    transform: `rotate(${angle}deg) translateY(${isOpen ? "-16px" : "0px"}) scale(${
                      isOpen ? 1.05 : 0.92
                    })`,
                    transition: "transform 650ms cubic-bezier(0.22, 1, 0.36, 1)",
                  }}
                >
                  <path
                    d="M120 116 C92 84, 94 34, 120 16 C146 34, 148 84, 120 116 Z"
                    fill={isGoldPetal ? "url(#goldPetalGrad)" : "url(#royalPetalGrad)"}
                    stroke={isGoldPetal ? "#fff6e0" : "#f3d078"}
                    strokeWidth="1.3"
                    opacity={isOpen ? 0.92 : 0.98}
                  />
                </g>
              );
            })}
          </g>
        </svg>

        {/* Center Medallion: Shows "Click Flower" Before Click, "16 December 2026" Inside After Click */}
        <div
          className="relative z-10 rounded-full border-2 border-[#f3d078] bg-[#06112d]/95 flex flex-col items-center justify-center text-center px-4 shadow-[0_10px_30px_rgba(0,0,0,0.85),0_0_20px_rgba(243,208,120,0.45)] transition-all duration-500"
          style={{
            width: isOpen ? "158px" : "86px",
            height: isOpen ? "158px" : "86px",
          }}
        >
          {isOpen ? (
            <div className="flex flex-col items-center animate-fadeIn">
              <span
                className="text-[9px] tracking-[0.22em] uppercase text-[#f3d078] mb-1"
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                Save The Date
              </span>
              <span
                className="text-2xl sm:text-[26px] text-[#fff6e0] leading-tight drop-shadow-[0_2px_10px_rgba(255,209,102,0.5)]"
                style={{ fontFamily: "'Great Vibes', cursive", textTransform: "none" }}
              >
                {dateText}
              </span>
            </div>
          ) : (
            <span
              className="text-[9px] font-semibold tracking-[0.18em] uppercase text-[#f3d078] group-hover:scale-105 transition-transform"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              Tap Flower
            </span>
          )}
        </div>
      </button>
    </div>
  );
}

export default function Countdown({
  targetDate = TARGET_DATE_ISO,
  heading = "Reveal The Date",
  dateText = "16 December 2026",
}) {
  const [isFlowerOpen, setIsFlowerOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState(() => getTimeRemaining(targetDate));

  useEffect(() => {
    const fontId = "wedding-glitter-fonts";
    if (!document.getElementById(fontId)) {
      const link = document.createElement("link");
      link.id = fontId;
      link.rel = "stylesheet";
      link.href =
        "https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Great+Vibes&family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&display=swap";
      document.head.appendChild(link);
    }
  }, []);

  useEffect(() => {
    setTimeLeft(getTimeRemaining(targetDate));
    const timer = setInterval(() => {
      setTimeLeft(getTimeRemaining(targetDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const units = [
    { label: "Days", value: padTwo(timeLeft.days) },
    { label: "Hours", value: padTwo(timeLeft.hours) },
    { label: "Minutes", value: padTwo(timeLeft.minutes) },
    { label: "Seconds", value: padTwo(timeLeft.seconds) },
  ];

  return (
    <section className="min-h-screen w-full bg-[#04091a] flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden select-none">
      {/* Ambient Royal Blue Glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-85"
        style={{
          background:
            "radial-gradient(circle at 50% 45%, rgba(29, 78, 216, 0.38) 0%, rgba(9, 24, 61, 0.92) 60%, rgba(4, 9, 26, 1) 100%)",
        }}
      />

      {/* Top Spotlight Beam */}
      <div
        className="pointer-events-none absolute inset-0 opacity-45"
        style={{
          background:
            "conic-gradient(from 165deg at 50% -10%, transparent 0deg, rgba(243, 208, 120, 0.24) 15deg, transparent 30deg)",
        }}
      />

      {/* Main Royal Countdown Card */}
      <div className="relative z-10 w-full max-w-[440px] rounded-[34px] border border-[#f3d078]/45 bg-[#071330]/90 backdrop-blur-md px-6 py-10 shadow-[0_25px_70px_rgba(0,0,0,0.9),0_0_45px_rgba(37,99,235,0.28)] flex flex-col items-center text-center">
        <div className="pointer-events-none absolute inset-3 rounded-[24px] border border-[#f3d078]/30" />

        <Sparkles className="w-4 h-4 text-[#f3d078]/75 absolute top-7 left-7 animate-pulse" />
        <Sparkles className="w-4 h-4 text-[#f3d078]/75 absolute top-7 right-7 animate-pulse" />

        {/* Top Heading: Reveal The Date */}
        <h2
          className="text-2xl sm:text-3xl font-bold tracking-[0.22em] uppercase text-[#fff6e0] drop-shadow-[0_2px_12px_rgba(243,208,120,0.35)] mt-1"
          style={{ fontFamily: "'Cinzel', serif" }}
        >
          {heading}
        </h2>

        <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-[#f3d078] to-transparent my-3" />

        {/* Proper Interactive Flower -> Reveals "16 December 2026" on Click */}
        <InteractiveFlower
          isOpen={isFlowerOpen}
          onToggle={() => setIsFlowerOpen((prev) => !prev)}
          dateText={dateText}
        />

        {/* Ornamental Divider */}
        <div className="flex items-center gap-2.5 my-3 text-[#f3d078]">
          <span className="w-12 h-[1px] bg-gradient-to-r from-transparent to-[#f3d078]/70" />
          <Heart className="w-3.5 h-3.5 fill-[#f3d078]" />
          <span className="w-12 h-[1px] bg-gradient-to-l from-transparent to-[#f3d078]/70" />
        </div>

        {/* Live Countdown Boxes */}
        {timeLeft.isComplete ? (
          <div
            className="my-3 px-5 py-4 rounded-2xl border border-[#f3d078]/50 bg-[#f3d078]/10 text-xl text-[#fff6e0]"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            The Celebration Has Begun
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-2.5 sm:gap-3 w-full my-2">
            {units.map((unit) => (
              <div
                key={unit.label}
                className="flex flex-col items-center justify-center rounded-2xl border border-[#f3d078]/40 bg-[#040b1f]/85 py-3.5 px-1.5 shadow-[0_8px_24px_rgba(0,0,0,0.65),inset_0_0_14px_rgba(243,208,120,0.08)]"
              >
                <span
                  className="text-2xl sm:text-3xl font-bold text-[#fff6e0] tracking-wider tabular-nums drop-shadow-[0_2px_8px_rgba(243,208,120,0.35)]"
                  style={{ fontFamily: "'Cinzel', serif" }}
                >
                  {unit.value}
                </span>
                <span
                  className="mt-1 text-[9px] sm:text-[10px] tracking-[0.2em] uppercase text-[#f3d078]"
                  style={{ fontFamily: "'Cinzel', serif" }}
                >
                  {unit.label}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}