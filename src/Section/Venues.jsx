import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";

import { MapPin, Sparkles, Clock } from "lucide-react";
import reception from "../assets/Images/reception.jpg";

const SPARKLE_COLORS = [
  "#f3d078",
  "#ffd166",
  "#fff6e0",
  "#ffffff",
];

export default function Venues() {
  const [sparkles, setSparkles] = useState([]);

  const sectionRef = useRef(null);

  const receptionData = {
    date: "19 December 2026",
    heading: "The Reception",
    name: "Param Prime Hills",
    city: "Evening Celebration • 7:30 PM Onwards",
    photoSrc: reception,
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Param+Prime+Hills",
  };

  // Google Fonts
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

  // Scroll Based Reveal Animation
  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const elements = section.querySelectorAll(
      "[data-venue-reveal]"
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("venue-visible");

            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -30px 0px",
      }
    );

    elements.forEach((element) => {
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  // Golden Sparkle Effect
  const spawnSparkles = useCallback((count = 20) => {
    const burst = Array.from({ length: count }, (_, idx) => {
      const angle =
        (Math.PI * 2 * idx) / count +
        (Math.random() - 0.5) * 0.45;

      const distance = 36 + Math.random() * 48;

      return {
        id: `${Date.now()}-${idx}-${Math.random()}`,
        tx: `${Math.cos(angle) * distance}px`,
        ty: `${Math.sin(angle) * distance - 14}px`,
        size: 4 + Math.random() * 5,
        color:
          SPARKLE_COLORS[
            Math.floor(Math.random() * SPARKLE_COLORS.length)
          ],
        delay: `${Math.random() * 90}ms`,
      };
    });

    setSparkles((prev) => [...prev.slice(-28), ...burst]);
  }, []);

  useEffect(() => {
    if (!sparkles.length) return;

    const timer = setTimeout(() => {
      setSparkles([]);
    }, 850);

    return () => clearTimeout(timer);
  }, [sparkles]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden flex flex-col items-center justify-between px-5 py-10 sm:py-14 select-none bg-[#04091a]"
    >
      <style>{`

        /* General Scroll Reveal */

        [data-venue-reveal] {
          opacity: 0;
          transform: translateY(35px);
          filter: blur(5px);

          transition:
            opacity 1.2s cubic-bezier(0.22, 1, 0.36, 1),
            transform 1.2s cubic-bezier(0.22, 1, 0.36, 1),
            filter 1.2s ease;

          transition-delay: var(--venue-delay, 0ms);
        }

        [data-venue-reveal].venue-visible {
          opacity: 1;
          transform: translateY(0);
          filter: blur(0);
        }

        /* Cinematic Background Photo */

        [data-venue-reveal="background"] {
          opacity: 0;
          transform: scale(1.12);
          filter: none;

          transition:
            opacity 1.8s ease,
            transform 2.8s cubic-bezier(0.22, 1, 0.36, 1);
        }

        [data-venue-reveal="background"].venue-visible {
          opacity: 1;
          transform: scale(1);
        }

        /* Golden Frame Reveal */

        [data-venue-reveal="frame"] {
          transform: scale(0.96);
          filter: none;
        }

        [data-venue-reveal="frame"].venue-visible {
          transform: scale(1);
        }

        /* Date Animation */

        [data-venue-reveal="date"] {
          transform: translateY(-25px);
        }

        [data-venue-reveal="date"].venue-visible {
          transform: translateY(0);
        }

        /* Reception Heading Animation */

        [data-venue-reveal="heading"] {
          transform: translateY(-20px);
        }

        [data-venue-reveal="heading"].venue-visible {
          transform: translateY(0);
        }

        /* Location Button Animation */

        [data-venue-reveal="button"] {
          transform: translateY(20px) scale(0.85);
        }

        [data-venue-reveal="button"].venue-visible {
          transform: translateY(0) scale(1);
        }

        /* Golden Sparkle Burst */

        @keyframes buttonSparkleBurst {
          0% {
            opacity: 1;
            transform: translate(-50%, -50%)
              scale(0.3) rotate(0deg);
          }

          65% {
            opacity: 1;
          }

          100% {
            opacity: 0;
            transform: translate(
              calc(-50% + var(--tx)),
              calc(-50% + var(--ty))
            ) scale(1.25) rotate(135deg);
          }
        }

        .animate-sparkle-burst {
          animation: buttonSparkleBurst 760ms
            cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        /* Reduced Motion Accessibility */

        @media (prefers-reduced-motion: reduce) {
          [data-venue-reveal] {
            opacity: 1 !important;
            transform: none !important;
            filter: none !important;
            transition: none !important;
          }

          .animate-sparkle-burst {
            animation: none;
            opacity: 0;
          }
        }

      `}</style>

      {/* 01 — Cinematic Background Photograph */}

      <img
        data-venue-reveal="background"
        src={receptionData.photoSrc}
        alt={receptionData.name}
        className="absolute inset-0 h-full w-full object-cover object-center"
      />

      {/* Royal Blue Gradient Overlay */}

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(4,9,26,0.85) 0%, rgba(4,9,26,0.32) 38%, rgba(4,9,26,0.48) 62%, rgba(4,9,26,0.94) 100%)",
        }}
      />

      {/* 02 — Golden Frame */}

      <div
        data-venue-reveal="frame"
        style={{ "--venue-delay": "200ms" }}
        className="pointer-events-none absolute inset-3 sm:inset-5 rounded-[24px] border border-[#f3d078]/30"
      />

      {/* Top Heading Section */}

      <div className="relative z-10 flex flex-col items-center text-center mt-1">

        {/* 03 — Reception Date */}

        <div
          data-venue-reveal="date"
          className="text-base sm:text-lg font-semibold tracking-[0.18em] uppercase text-[#f3d078] mb-4 drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]"
          style={{
            fontFamily: "'Cinzel', serif",
            "--venue-delay": "350ms",
          }}
        >
          {receptionData.date}
        </div>

        {/* 04 — The Reception Heading */}

        <h1
          data-venue-reveal="heading"
          className="text-4xl sm:text-5xl font-bold tracking-[0.2em] uppercase text-[#fff6e0] drop-shadow-[0_4px_18px_rgba(0,0,0,0.95)]"
          style={{
            fontFamily: "'Cinzel', serif",
            "--venue-delay": "600ms",
          }}
        >
          {receptionData.heading}
        </h1>

        {/* Golden Divider */}

        <div
          data-venue-reveal="divider"
          style={{ "--venue-delay": "800ms" }}
          className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#f3d078] to-transparent mt-2.5"
        />

      </div>

      {/* Bottom Venue Details */}

      <div className="relative z-10 flex flex-col items-center text-center max-w-2xl mx-auto">

        {/* 05 — Venue Name */}

        <h2
          data-venue-reveal="name"
          className="text-5xl sm:text-6xl md:text-7xl text-[#fff6e0] drop-shadow-[0_4px_18px_rgba(0,0,0,0.95)] leading-tight"
          style={{
            fontFamily: "'Great Vibes', cursive",
            textTransform: "none",
            "--venue-delay": "300ms",
          }}
        >
          {receptionData.name}
        </h2>

        {/* 06 — Reception Timing */}

        <p
          data-venue-reveal="timing"
          className="mt-2 inline-flex items-center gap-2 text-xs sm:text-sm tracking-[0.24em] uppercase text-[#f3d078] drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]"
          style={{
            fontFamily: "'Cinzel', serif",
            "--venue-delay": "550ms",
          }}
        >
          <Clock className="w-3.5 h-3.5 text-[#f3d078]" />

          <span>{receptionData.city}</span>
        </p>

        {/* 07 — Get Location Button */}

        <div
          data-venue-reveal="button"
          style={{ "--venue-delay": "800ms" }}
          className="relative mt-7 flex items-center justify-center"
        >

          {/* Golden Sparkles */}

          <div className="pointer-events-none absolute inset-0 overflow-visible">

            {sparkles.map((sp) => (
              <span
                key={sp.id}
                className="animate-sparkle-burst absolute left-1/2 top-1/2 block"
                style={{
                  "--tx": sp.tx,
                  "--ty": sp.ty,
                  width: `${sp.size}px`,
                  height: `${sp.size}px`,
                  animationDelay: sp.delay,
                }}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill={sp.color}
                  className="w-full h-full drop-shadow-[0_0_6px_rgba(243,208,120,0.9)]"
                >
                  <path d="M12 1L14.8 9.2L23 12L14.8 14.8L12 23L9.2 14.8L1 12L9.2 9.2L12 1Z" />
                </svg>
              </span>
            ))}

          </div>

          <a
            href={receptionData.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => spawnSparkles(20)}
            onTouchStart={() => spawnSparkles(20)}
            className="relative z-10 inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-[#c8963e] via-[#f3d078] to-[#c8963e] text-[#071330] font-bold text-xs tracking-[0.22em] uppercase shadow-[0_8px_28px_rgba(243,208,120,0.45)] hover:scale-105 hover:brightness-110 active:scale-95 transition-all duration-200"
            style={{
              fontFamily: "'Cinzel', serif",
            }}
          >
            <MapPin className="w-4 h-4" />

            <span>Get Location</span>

            <Sparkles className="w-3.5 h-3.5" />
          </a>

        </div>

      </div>

    </section>
  );
}