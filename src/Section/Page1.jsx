
import React, { useEffect, useState } from "react";
import WeddingLogo from "../assets/Images/Wedding logo.webp";

export default function Page1() {
  const [started, setStarted] = useState(false);
  const [showLogo, setShowLogo] = useState(false);
  const [showNames, setShowNames] = useState(false);
  const [showTagline, setShowTagline] = useState(false);
  const [finished, setFinished] = useState(false);

  const brideName = "Aditi";
  const groomName = "Somya";

  const handleEnter = () => {
    if (started) return;

    setStarted(true);

    setTimeout(() => setShowLogo(true), 900);
    setTimeout(() => setShowNames(true), 2300);
    setTimeout(() => setShowTagline(true), 3700);
    setTimeout(() => setFinished(true), 5500);
  };

  const particles = Array.from({ length: 35 }, (_, i) => ({
    id: i,
    left: `${(i * 37 + 13) % 100}%`,
    top: `${(i * 53 + 7) % 100}%`,
    delay: `${(i % 9) * 0.7}s`,
    duration: `${5 + (i % 6)}s`,
    size: `${2 + (i % 3)}px`,
  }));

  return (
    <section className="relative flex h-[100svh] w-full items-center justify-center overflow-hidden bg-[#100609]">

      {/* RESPONSIVE 9:16 FRAME */}
      <div
        className="relative h-[100svh] max-h-[100svh] w-full overflow-hidden"
        style={{
          width: "min(100vw, 56.25vh)",
          aspectRatio: "9 / 16",
          background:
            "radial-gradient(ellipse at 50% 45%, #421922 0%, #230D13 48%, #100609 100%)",
        }}
      >

        {/* BACKGROUND GLOW */}
        <div
          className={`pointer-events-none absolute left-1/2 top-[43%] h-[75%] w-[120%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[80px] transition-all duration-[3000ms] ${
            started ? "scale-100 opacity-100" : "scale-50 opacity-0"
          }`}
          style={{
            background:
              "radial-gradient(ellipse, rgba(197,145,76,0.22), rgba(120,58,42,0.08) 45%, transparent 70%)",
          }}
        />

        {/* GOLDEN SPOTLIGHT */}
        <div
          className={`pointer-events-none absolute left-1/2 top-0 h-[80%] w-[100%] -translate-x-1/2 transition-all duration-[2500ms] ${
            started ? "opacity-100" : "opacity-0"
          }`}
          style={{
            background:
              "linear-gradient(180deg, transparent 0%, rgba(213,168,101,0.10) 25%, rgba(213,168,101,0.04) 65%, transparent 100%)",
            clipPath: "polygon(35% 0, 65% 0, 100% 100%, 0 100%)",
            filter: "blur(25px)",
          }}
        />

        {/* FLOATING GOLD PARTICLES */}
        {started &&
          particles.map((particle) => (
            <span
              key={particle.id}
              className="pointer-events-none absolute rounded-full bg-[#E8C68D] animate-gold-float"
              style={{
                left: particle.left,
                top: particle.top,
                width: particle.size,
                height: particle.size,
                animationDelay: particle.delay,
                animationDuration: particle.duration,
                boxShadow: "0 0 10px rgba(232,198,141,0.8)",
              }}
            />
          ))}

        {/* OPENING TEXT */}
        <div
          className={`absolute left-0 right-0 top-[22%] z-20 text-center transition-all duration-[1800ms] ${
            started
              ? "-translate-y-8 opacity-0"
              : "translate-y-0 opacity-100"
          }`}
        >
          <p className="font-serif text-[10px] tracking-[0.5em] text-[#D6B77D]">
            A CELEBRATION OF LOVE
          </p>
        </div>

        {/* CENTER LOGO */}
        <div
          className={`absolute left-0 right-0 top-[31%] z-30 flex justify-center transition-all duration-[1800ms] ease-out ${
            showLogo
              ? "translate-y-0 scale-100 opacity-100"
              : "translate-y-8 scale-75 opacity-0"
          }`}
        >
          <img
            src={WeddingLogo}
            alt="Wedding Logo"
            className="h-auto w-36 object-contain drop-shadow-[0_0_25px_rgba(226,185,117,0.45)] sm:w-44"
          />
        </div>

        {/* COUPLE NAMES */}
        <div className="absolute left-0 right-0 top-[51%] z-30 flex flex-col items-center text-center">

          {/* BRIDE */}
          <h1
            className={`font-['Dancing_Script'] text-6xl font-medium text-[#FFF0D2] drop-shadow-[0_3px_15px_rgba(0,0,0,0.8)] transition-all duration-[1800ms] ease-out sm:text-7xl ${
              showNames
                ? "translate-x-0 opacity-100"
                : "-translate-x-20 opacity-0"
            }`}
          >
            {brideName}
          </h1>

          {/* AMPERSAND */}
          <span
            className={`my-2 font-serif text-3xl italic text-[#DAB77A] transition-all duration-[1600ms] delay-300 ${
              showNames ? "scale-100 opacity-100" : "scale-50 opacity-0"
            }`}
          >
            &
          </span>

          {/* GROOM */}
          <h1
            className={`font-['Dancing_Script'] text-6xl font-medium text-[#FFF0D2] drop-shadow-[0_3px_15px_rgba(0,0,0,0.8)] transition-all duration-[1800ms] ease-out sm:text-7xl ${
              showNames
                ? "translate-x-0 opacity-100"
                : "translate-x-20 opacity-0"
            }`}
          >
            {groomName}
          </h1>
        </div>

        {/* GOLD DIVIDER */}
        <div
          className={`absolute left-1/2 top-[76%] z-30 flex w-44 -translate-x-1/2 items-center gap-3 transition-all duration-[1500ms] ${
            showTagline ? "scale-100 opacity-100" : "scale-50 opacity-0"
          }`}
        >
          <span className="h-px flex-1 bg-gradient-to-r from-transparent to-[#D9B779]" />
          <span className="h-2 w-2 rotate-45 border border-[#D9B779]" />
          <span className="h-px flex-1 bg-gradient-to-l from-transparent to-[#D9B779]" />
        </div>

        {/* TAGLINE */}
        <div
          className={`absolute left-0 right-0 top-[79%] z-30 text-center transition-all duration-[1800ms] ${
            showTagline
              ? "translate-y-0 opacity-100"
              : "translate-y-5 opacity-0"
          }`}
        >
          <p className="font-serif text-[9px] tracking-[0.35em] text-[#E8D1A9]">
            TWO SOULS, ONE BEAUTIFUL JOURNEY
          </p>
        </div>

        {/* TAP TO BEGIN */}
        {!started && (
          <button
            onClick={handleEnter}
            className="absolute bottom-[13%] left-1/2 z-40 -translate-x-1/2 whitespace-nowrap border border-[#C9A568] bg-[#541C27]/80 px-10 py-4 font-serif text-[10px] tracking-[0.4em] text-[#F8E8C5] shadow-[0_5px_25px_rgba(0,0,0,0.3)] transition-all duration-500 hover:scale-105 hover:bg-[#702D36]"
          >
            TAP TO BEGIN
          </button>
        )}

        {/* FINAL SMALL TEXT */}
        {finished && (
          <div className="absolute bottom-[5%] left-0 right-0 z-30 text-center">
            <p className="font-serif text-[8px] tracking-[0.4em] text-[#C9A568]">
              A ROYAL CELEBRATION AWAITS
            </p>
          </div>
        )}
      </div>

      {/* PARTICLE ANIMATION CSS */}
      <style>{`
        @keyframes goldFloat {
          0% {
            transform: translateY(25px) scale(0.5);
            opacity: 0;
          }
          25% {
            opacity: 0.8;
          }
          75% {
            opacity: 0.5;
          }
          100% {
            transform: translateY(-100px) scale(1.2);
            opacity: 0;
          }
        }

        .animate-gold-float {
          animation-name: goldFloat;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
        }
      `}</style>
    </section>
  );
}
