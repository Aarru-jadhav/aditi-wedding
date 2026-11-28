import React, { useState, useEffect, useMemo } from "react";
import { Sparkles, Heart } from "lucide-react";

function seededRandom(seed) {
  const x = Math.sin(seed * 9999.13) * 10000;
  return x - Math.floor(x);
}

export default function Closing({
  bride = "Aditi",
  groom = "Somya",
  dateText = "December 14, 2026",
  venueText = "The Ananta Hotel, Udaipur",
}) {
  const [isTied, setIsTied] = useState(false);

  useEffect(() => {
    const fontId = "wedding-closing-editorial-fonts";
    if (!document.getElementById(fontId)) {
      const link = document.createElement("link");
      link.id = fontId;
      link.rel = "stylesheet";
      link.href =
        "https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600;700&family=Cormorant+Garamond:ital,wght@0,500;0,600;1,400;1,500&family=Montserrat:wght@400;500;600&family=Pinyon+Script&display=swap";
      document.head.appendChild(link);
    }
  }, []);

  // Scattered blue & gold bokeh dots + 4-point star sparkles across the section
  const shimmerParticles = useMemo(() => {
    const items = [];
    const total = 140;
    for (let i = 0; i < total; i++) {
      const r1 = seededRandom(i + 17);
      const r2 = seededRandom(i + 113);
      const r3 = seededRandom(i + 227);
      const r4 = seededRandom(i + 331);
      const r5 = seededRandom(i + 449);

      const isStar = r1 > 0.78;
      const isGold = r2 > 0.74;
      const isBrightBlue = r2 > 0.36;

      items.push({
        id: i,
        x: r1 * 100,
        y: r2 * 100,
        size: isStar ? 7 + r3 * 8 : 4 + r3 * 8,
        isStar,
        color: isGold
          ? "rgba(255, 214, 110, 0.78)"
          : isBrightBlue
          ? "rgba(96, 165, 250, 0.68)"
          : "rgba(37, 99, 235, 0.62)",
        dur: 1.8 + r4 * 2.4,
        delay: r5 * 2.5,
      });
    }
    return items;
  }, []);

  return (
    <section className="min-h-screen w-full bg-[#04091a] flex flex-col items-center justify-between px-5 pt-16 pb-6 relative overflow-hidden select-none">
      <style>{`
        @keyframes shimmerTwinkle {
          0%, 100% {
            opacity: 0.3;
            transform: scale(0.85);
          }
          50% {
            opacity: 0.95;
            transform: scale(1.15);
          }
        }
        @keyframes threadPulse {
          0%, 100% {
            filter: drop-shadow(0 0 8px rgba(243, 208, 120, 0.45));
            opacity: 0.82;
          }
          50% {
            filter: drop-shadow(0 0 18px rgba(255, 224, 130, 0.88));
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
        .shimmer-particle {
          animation-name: shimmerTwinkle;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
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
            "radial-gradient(circle at 50% 46%, rgba(29, 78, 216, 0.36) 0%, rgba(7, 19, 48, 0.92) 58%, rgba(4, 9, 26, 1) 100%)",
        }}
      />

      {/* Scattered Shimmer Layer Over the Section */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-20 overflow-hidden"
      >
        {shimmerParticles.map((p) => (
          <div
            key={p.id}
            style={{
              position: "absolute",
              left: `${p.x}%`,
              top: `${p.y}%`,
            }}
          >
            {p.isStar ? (
              <svg
                width={p.size}
                height={p.size}
                viewBox="0 0 24 24"
                fill={p.color}
                className="shimmer-particle"
                style={{
                  animationDuration: `${p.dur}s`,
                  animationDelay: `${p.delay}s`,
                  filter: `drop-shadow(0 0 6px ${p.color})`,
                }}
              >
                <path d="M12 0L14.6 9.4L24 12L14.6 14.6L12 24L9.4 14.6L0 12L9.4 9.4L12 0Z" />
              </svg>
            ) : (
              <span
                className="shimmer-particle block rounded-full"
                style={{
                  width: `${p.size}px`,
                  height: `${p.size}px`,
                  background: p.color,
                  boxShadow: `0 0 ${p.size * 1.4}px ${p.color}`,
                  animationDuration: `${p.dur}s`,
                  animationDelay: `${p.delay}s`,
                }}
              />
            )}
          </div>
        ))}
      </div>

      {/* Top Spacer */}
      <div className="hidden sm:block" />

      {/* Center Content */}
      <div className="relative z-10 max-w-[470px] w-full my-auto flex flex-col items-center text-center">
        <p
          className="text-[11px] font-medium tracking-[0.3em] uppercase text-[#f3d078]"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          Come To Join Us To Celebrate
        </p>

        <h2
          className="mt-3 text-4xl sm:text-5xl text-[#fff6e0] leading-tight drop-shadow-[0_2px_14px_rgba(255,209,102,0.45)]"
          style={{ fontFamily: "'Lora', serif" }}
        >
          A New Chapter Begins With You
        </h2>

        <p
          className="mt-4 text-lg sm:text-[19px] italic text-[#f8e6be]/90 max-w-[375px] leading-relaxed"
          style={{ fontFamily: "'Lora', serif" }}
        >
          Come to join us to celebrate love, laughter, and the start of our
          forever. Your warmth and blessings will make our special day truly
          unforgettable.
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
              <linearGradient
                id="goldThreadGrad"
                x1="0%"
                y1="50%"
                x2="100%"
                y2="50%"
              >
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
            style={{ fontFamily: "'Changa One'" }}
          >
            {bride} & {groom}
          </span>
          <span
            className="mt-2 text-[11px] font-medium tracking-[0.22em] uppercase text-[#f3d078]/90"
            style={{ fontFamily: "'Changa One'" }}
          >
            {dateText} • {venueText}
          </span>
        </div>

        {/* Interactive Action */}
        <div className="mt-7 flex flex-col items-center">
          <button
            type="button"
            onClick={() => setIsTied((prev) => !prev)}
            className="px-6 py-2.5 rounded-full border border-[#f3d078]/65 bg-[#f3d078]/10 hover:bg-[#f3d078]/20 active:scale-95 text-[#f3d078] text-[11px] font-medium tracking-[0.22em] uppercase transition-all cursor-pointer"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            {isTied ? "Forever Tied • Reset" : "Tie Our Golden Thread"}
          </button>

          {isTied && (
            <p
              className="animate-reveal mt-4 text-base sm:text-lg italic text-[#fff6e0] max-w-[340px]"
              style={{ fontFamily: "'Lora', serif" }}
            >
              “Come to join us to celebrate—we can’t wait to welcome you with
              open hearts!”
            </p>
          )}
        </div>
      </div>

      {/* Bottom Studio Credit Tagline */}
      <footer className="relative z-30 mt-12 pt-4 flex flex-col items-center text-center">
        <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#f3d078]/40 to-transparent mb-3" />
        <p
          className="text-[10px] sm:text-[11px] tracking-[0.24em] uppercase text-[#f8e6be]/75"
          style={{ fontFamily: "'Cinzel', serif" }}
        >
          Design By{" "}
          <span className="text-[#f3d078] font-semibold">PROFILES</span>{" "}
          <span className="mx-1.5 text-[#f3d078]/50">•</span>
          <a
            href="tel:9425064293"
            className="text-[#fff6e0]/85 hover:text-[#f3d078] transition-colors tracking-[0.18em]"
          >
            9425064293
          </a>
        </p>
      </footer>
    </section>
  );
}