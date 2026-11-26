import React, { useState, useEffect } from "react";
import { Sparkles, Heart } from "lucide-react";

export default function Closing({
  bride = "Aditi",
  groom = "Somya",
  dateText = "December 16, 2026",
  venueText = "The Ananta Hotel, Udaipur",
}) {
  const [isTied, setIsTied] = useState(false);

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

  return (
    <section className="min-h-screen w-full bg-[#04091a] flex flex-col items-center justify-center px-5 py-16 relative overflow-hidden select-none">
      <style>{`
        @keyframes threadPulse {
          0%, 100% {
            filter: drop-shadow(0 0 8px rgba(243, 208, 120, 0.45));
            opacity: 0.8;
          }
          50% {
            filter: drop-shadow(0 0 18px rgba(255, 224, 130, 0.85));
            opacity: 1;
          }
        }
        @keyframes knotPop {
          0% {
            opacity: 0;
            transform: scale(0.5);
          }
          70% {
            transform: scale(1.12);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes textReveal {
          0% {
            opacity: 0;
            transform: translateY(12px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-thread {
          animation: threadPulse 3.6s ease-in-out infinite;
        }
        .animate-knot {
          animation: knotPop 0.55s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .animate-reveal {
          animation: textReveal 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
      `}</style>

      {/* Deep Royal Blue Spotlight Backdrop */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 46%, rgba(29, 78, 216, 0.4) 0%, rgba(7, 19, 48, 0.92) 58%, rgba(4, 9, 26, 1) 100%)",
        }}
      />

      {/* Center Content */}
      <div className="relative z-10 max-w-[440px] w-full flex flex-col items-center text-center">
        <Sparkles className="w-4 h-4 text-[#f3d078] mb-3 opacity-85" />

        <p
          className="text-[11px] tracking-[0.3em] uppercase text-[#f3d078]"
          style={{ fontFamily: "'Cinzel', serif" }}
        >
          Bound By Love & Togetherness
        </p>

        <h2
          className="mt-3 text-4xl sm:text-5xl text-[#fff6e0] leading-tight drop-shadow-[0_2px_14px_rgba(255,209,102,0.45)]"
          style={{ fontFamily: "'Great Vibes', cursive" }}
        >
          A Lifetime Begins With You Here
        </h2>

        <p
          className="mt-4 text-base sm:text-lg italic text-[#f8e6be]/90 max-w-[335px] leading-relaxed"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          Two paths, countless memories, and one sacred thread that brings all
          our favorite people together. Come share in our happiness as we begin
          our forever.
        </p>

        {/* Golden Thread & Interactive Knot */}
        <div className="relative w-full h-20 my-5 flex items-center justify-center">
          <svg
            viewBox="0 0 400 80"
            fill="none"
            className="w-full h-full animate-thread"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="goldThreadGrad" x1="0%" y1="50%" x2="100%" y2="50%">
                <stop offset="0%" stopColor="#f3d078" stopOpacity="0.05" />
                <stop offset="25%" stopColor="#f3d078" stopOpacity="0.75" />
                <stop offset="50%" stopColor="#fff3c4" stopOpacity="1" />
                <stop offset="75%" stopColor="#f3d078" stopOpacity="0.75" />
                <stop offset="100%" stopColor="#f3d078" stopOpacity="0.05" />
              </linearGradient>
            </defs>

            <path
              d="M 10 42 Q 105 14, 200 40 T 390 38"
              stroke="url(#goldThreadGrad)"
              strokeWidth={isTied ? "2.4" : "1.6"}
              strokeLinecap="round"
            />
          </svg>

          {/* Center Knot / Heart Emblem when tied */}
          {isTied && (
            <div className="animate-knot absolute w-11 h-11 rounded-full bg-[#071330] border border-[#ffd166] shadow-[0_0_24px_rgba(255,209,102,0.8)] flex items-center justify-center">
              <Heart className="w-4 h-4 text-[#ffd166] fill-[#ffd166]" />
            </div>
          )}
        </div>

        {/* Couple Names & Event Details */}
        <div className="flex flex-col items-center leading-tight">
          <span
            className="text-4xl sm:text-5xl text-[#fff6e0] drop-shadow-[0_2px_12px_rgba(255,209,102,0.4)]"
            style={{ fontFamily: "'Great Vibes', cursive" }}
          >
            {bride} & {groom}
          </span>
          <span
            className="mt-2 text-[11px] tracking-[0.22em] uppercase text-[#f3d078]/85"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            {dateText} • {venueText}
          </span>
        </div>

        {/* Interactive Action */}
        <div className="mt-7 flex flex-col items-center">
          <button
            type="button"
            onClick={() => setIsTied((prev) => !prev)}
            className="px-6 py-2.5 rounded-full border border-[#f3d078]/65 bg-[#f3d078]/10 hover:bg-[#f3d078]/20 active:scale-95 text-[#f3d078] text-[11px] tracking-[0.22em] uppercase transition-all cursor-pointer"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            {isTied ? "Forever Tied • Reset" : "Tie Our Golden Thread"}
          </button>

          {isTied && (
            <p
              className="animate-reveal mt-4 text-sm sm:text-base italic text-[#fff6e0] max-w-[310px]"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              “Your presence is the finest blessing we could ask for—we’ll be
              waiting to welcome you!”
            </p>
          )}
        </div>
      </div>
    </section>
  );
}