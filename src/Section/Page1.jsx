
import React, { useState } from "react";
import WeddingLogo from "../assets/Images/Wedding logo.webp";

export default function Page1() {
  const [started, setStarted] = useState(false);
  const [showLogo, setShowLogo] = useState(false);
  const [showNames, setShowNames] = useState(false);
  const [showTagline, setShowTagline] = useState(false);
  const [finished, setFinished] = useState(false);

  // Couple Names
  const brideName = "Aditi";
  const groomName = "Somya";

  // Start cinematic reveal
  const handleEnter = () => {
    if (started) return;

    setStarted(true);

    setTimeout(() => setShowLogo(true), 900);
    setTimeout(() => setShowNames(true), 2300);
    setTimeout(() => setShowTagline(true), 3700);
    setTimeout(() => setFinished(true), 5500);
  };

  // Golden particles
  const particles = Array.from({ length: 45 }, (_, i) => ({
    id: i,
    left: `${(i * 37 + 13) % 100}%`,
    top: `${(i * 53 + 7) % 100}%`,
    delay: `${(i % 9) * 0.7}s`,
    duration: `${5 + (i % 6)}s`,
    size: `${2 + (i % 3)}px`,
  }));

  return (
    <section className="relative flex h-[100svh] w-full items-center justify-center overflow-hidden bg-[#16090D]">

      {/* RESPONSIVE 9:16 FRAME */}
      <div
        className="relative h-[100svh] max-h-[100svh] w-full overflow-hidden"
        style={{
          width: "min(100vw, 56.25vh)",
          aspectRatio: "9 / 16",
          background:
            "radial-gradient(ellipse at 50% 45%, #642A32 0%, #35131C 52%, #16090D 100%)",
        }}
      >

        {/* BACKGROUND AMBIENT GLOW */}
        <div
          className={`pointer-events-none absolute left-1/2 top-[43%] h-[75%] w-[130%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[75px] transition-all duration-[3000ms] ${
            started ? "scale-100 opacity-100" : "scale-50 opacity-0"
          }`}
          style={{
            background:
              "radial-gradient(ellipse, rgba(255,205,125,0.34) 0%, rgba(222,158,82,0.16) 35%, transparent 72%)",
          }}
        />

        {/* MOVING DISCO SPOTLIGHTS */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">

          {/* SPOTLIGHT 1 */}
          <div
            className={`absolute -top-[35%] left-[10%] h-[125%] w-[38%] origin-top transition-opacity duration-1000 ${
              started ? "opacity-100" : "opacity-0"
            }`}
            style={{
              background:
                "linear-gradient(180deg, rgba(255,222,163,0.48), rgba(242,188,112,0.16) 55%, transparent)",
              clipPath: "polygon(35% 0, 65% 0, 100% 100%, 0 100%)",
              filter: "blur(22px)",
              animation: "spotlightOne 7s ease-in-out infinite alternate",
            }}
          />

          {/* SPOTLIGHT 2 */}
          <div
            className={`absolute -top-[35%] right-[10%] h-[125%] w-[38%] origin-top transition-opacity duration-1000 ${
              started ? "opacity-100" : "opacity-0"
            }`}
            style={{
              background:
                "linear-gradient(180deg, rgba(255,224,174,0.42), rgba(224,166,100,0.14) 60%, transparent)",
              clipPath: "polygon(35% 0, 65% 0, 100% 100%, 0 100%)",
              filter: "blur(22px)",
              animation: "spotlightTwo 9s ease-in-out infinite alternate",
            }}
          />

          {/* SPOTLIGHT 3 - SOFT CENTER BEAM */}
          <div
            className={`absolute -top-[25%] left-[35%] h-[115%] w-[30%] origin-top transition-opacity duration-1000 ${
              started ? "opacity-100" : "opacity-0"
            }`}
            style={{
              background:
                "linear-gradient(180deg, rgba(255,239,204,0.32), rgba(255,210,143,0.08) 65%, transparent)",
              clipPath: "polygon(40% 0, 60% 0, 100% 100%, 0 100%)",
              filter: "blur(30px)",
              animation: "spotlightThree 11s ease-in-out infinite alternate",
            }}
          />

          {/* DIAGONAL LIGHT SWEEP */}
          <div
            className={`absolute -left-[100%] top-0 h-full w-[75%] transition-opacity duration-1000 ${
              started ? "opacity-100" : "opacity-0"
            }`}
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(255,218,155,0.13), rgba(255,237,196,0.3), transparent)",
              filter: "blur(25px)",
              transform: "skewX(-22deg)",
              animation: "lightSweep 8s ease-in-out infinite",
            }}
          />

        </div>

        {/* FLOATING GOLD PARTICLES */}
        {started &&
          particles.map((particle) => (
            <span
              key={particle.id}
              className="pointer-events-none absolute z-10 rounded-full bg-[#F7D69C] animate-gold-float"
              style={{
                left: particle.left,
                top: particle.top,
                width: particle.size,
                height: particle.size,
                animationDelay: particle.delay,
                animationDuration: particle.duration,
                boxShadow:
                  "0 0 8px rgba(255,215,150,0.9), 0 0 16px rgba(255,190,110,0.5)",
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
          <p className="font-serif text-[10px] tracking-[0.5em] text-[#F1D49F]">
            A CELEBRATION OF LOVE
          </p>
        </div>

        {/* CENTER WEDDING LOGO */}
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
            className="h-auto w-36 object-contain drop-shadow-[0_0_25px_rgba(255,210,130,0.6)] sm:w-44"
          />
        </div>

        {/* COUPLE NAMES */}
        <div className="absolute left-0 right-0 top-[51%] z-30 flex flex-col items-center text-center">

          {/* BRIDE NAME */}
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
            className={`my-2 font-serif text-3xl italic text-[#F1C77E] drop-shadow-[0_0_12px_rgba(255,206,130,0.6)] transition-all duration-[1600ms] delay-300 ${
              showNames
                ? "scale-100 opacity-100"
                : "scale-50 opacity-0"
            }`}
          >
            &
          </span>

          {/* GROOM NAME */}
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
          <span className="h-px flex-1 bg-gradient-to-r from-transparent to-[#F1C77E]" />
          <span className="h-2 w-2 rotate-45 border border-[#F1C77E]" />
          <span className="h-px flex-1 bg-gradient-to-l from-transparent to-[#F1C77E]" />
        </div>

        {/* TAGLINE */}
        <div
          className={`absolute left-0 right-0 top-[79%] z-30 text-center transition-all duration-[1800ms] ${
            showTagline
              ? "translate-y-0 opacity-100"
              : "translate-y-5 opacity-0"
          }`}
        >
          <p className="font-serif text-[9px] tracking-[0.35em] text-[#F0D9B0]">
            TWO SOULS, ONE BEAUTIFUL JOURNEY
          </p>
        </div>

        {/* TAP TO BEGIN */}
        {!started && (
          <button
            onClick={handleEnter}
            className="absolute bottom-[13%] left-1/2 z-40 -translate-x-1/2 whitespace-nowrap border border-[#DDBB7B] bg-[#702D36]/90 px-10 py-4 font-serif text-[10px] tracking-[0.4em] text-[#FFF0D2] shadow-[0_5px_25px_rgba(0,0,0,0.3)] transition-all duration-500 hover:scale-105 hover:bg-[#863C45]"
          >
            TAP TO BEGIN
          </button>
        )}

        {/* FINAL TEXT */}
        {finished && (
          <div className="absolute bottom-[5%] left-0 right-0 z-30 text-center">
            <p className="font-serif text-[8px] tracking-[0.4em] text-[#E5C68F]">
              A ROYAL CELEBRATION AWAITS
            </p>
          </div>
        )}

      </div>

      {/* ANIMATION STYLES */}
      <style>{`
        @keyframes goldFloat {
          0% {
            transform: translateY(30px) scale(0.5);
            opacity: 0;
          }
          25% {
            opacity: 1;
          }
          75% {
            opacity: 0.7;
          }
          100% {
            transform: translateY(-120px) scale(1.4);
            opacity: 0;
          }
        }

        .animate-gold-float {
          animation-name: goldFloat;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
        }

        @keyframes spotlightOne {
          0% {
            transform: rotate(-28deg);
            opacity: 0.65;
          }
          50% {
            transform: rotate(12deg);
            opacity: 1;
          }
          100% {
            transform: rotate(35deg);
            opacity: 0.7;
          }
        }

        @keyframes spotlightTwo {
          0% {
            transform: rotate(30deg);
            opacity: 0.5;
          }
          50% {
            transform: rotate(-12deg);
            opacity: 0.95;
          }
          100% {
            transform: rotate(-35deg);
            opacity: 0.65;
          }
        }

        @keyframes spotlightThree {
          0% {
            transform: rotate(15deg);
            opacity: 0.45;
          }
          100% {
            transform: rotate(-20deg);
            opacity: 0.9;
          }
        }

        @keyframes lightSweep {
          0% {
            left: -100%;
          }
          50% {
            left: 130%;
          }
          100% {
            left: 130%;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-gold-float {
            animation: none !important;
          }
        }
      `}</style>

    </section>
  );
}
