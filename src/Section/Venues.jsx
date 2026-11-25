import React, { useState, useEffect, useCallback } from "react";
import { MapPin, Sparkles } from "lucide-react";

const SPARKLE_COLORS = ["#f3d078", "#ffd166", "#fff6e0", "#ffffff"];

export default function Venues() {
  const [sparkles, setSparkles] = useState([]);

  const venueData = {
    heading: "The Venue",
    name: "The Ananta Hotel",
    city: "Udaipur, Rajasthan",
    photoSrc:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1800&q=85",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=The+Ananta+Hotel+Udaipur",
  };

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

  const spawnSparkles = useCallback((count = 20) => {
    const burst = Array.from({ length: count }, (_, idx) => {
      const angle = (Math.PI * 2 * idx) / count + (Math.random() - 0.5) * 0.45;
      const distance = 36 + Math.random() * 48;
      return {
        id: `${Date.now()}-${idx}-${Math.random()}`,
        tx: `${Math.cos(angle) * distance}px`,
        ty: `${Math.sin(angle) * distance - 14}px`,
        size: 4 + Math.random() * 5,
        color: SPARKLE_COLORS[Math.floor(Math.random() * SPARKLE_COLORS.length)],
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
    <section className="relative min-h-screen w-full overflow-hidden flex flex-col items-center justify-between px-5 py-10 sm:py-14 select-none bg-[#04091a]">
      {/* Sparkle Burst Keyframes */}
      <style>{`
        @keyframes buttonSparkleBurst {
          0% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(0.3) rotate(0deg);
          }
          65% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            transform: translate(calc(-50% + var(--tx)), calc(-50% + var(--ty))) scale(1.25) rotate(135deg);
          }
        }
        .animate-sparkle-burst {
          animation: buttonSparkleBurst 760ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

      {/* Full-Screen Cover Photo (Mobile & Desktop) */}
      <img
        src={venueData.photoSrc}
        alt={venueData.name}
        className="absolute inset-0 h-full w-full object-cover object-center"
      />

      {/* Royal Blue & Midnight Gradient Overlay for Top & Bottom Text Clarity */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(4,9,26,0.82) 0%, rgba(4,9,26,0.28) 38%, rgba(4,9,26,0.45) 62%, rgba(4,9,26,0.92) 100%)",
        }}
      />

      {/* Subtle Full-Viewport Gold Frame */}
      <div className="pointer-events-none absolute inset-3 sm:inset-5 rounded-[24px] border border-[#f3d078]/30" />

      {/* Top Heading: The Venue */}
      <div className="relative z-10 flex flex-col items-center text-center mt-1">
        <h1
          className="text-4xl sm:text-5xl font-bold tracking-[0.2em] uppercase text-[#fff6e0] drop-shadow-[0_4px_18px_rgba(0,0,0,0.95)]"
          style={{ fontFamily: "'Cinzel', serif" }}
        >
          {venueData.heading}
        </h1>
        <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-[#f3d078] to-transparent mt-2.5" />
      </div>

      {/* Bottom Overlay: Hotel Name + Get Location Button */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-2xl mx-auto">
        <h2
          className="text-5xl sm:text-6xl md:text-7xl text-[#fff6e0] drop-shadow-[0_4px_18px_rgba(0,0,0,0.95)] leading-tight"
          style={{ fontFamily: "'Great Vibes', cursive", textTransform: "none" }}
        >
          {venueData.name}
        </h2>

        <p
          className="mt-1.5 text-xs sm:text-sm tracking-[0.28em] uppercase text-[#f3d078] drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]"
          style={{ fontFamily: "'Cinzel', serif" }}
        >
          {venueData.city}
        </p>

        {/* Get Location Button with Sparkle Burst on Hover */}
        <div className="relative mt-7 flex items-center justify-center">
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
            href={venueData.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => spawnSparkles(20)}
            onTouchStart={() => spawnSparkles(20)}
            className="relative z-10 inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-[#c8963e] via-[#f3d078] to-[#c8963e] text-[#071330] font-bold text-xs tracking-[0.22em] uppercase shadow-[0_8px_28px_rgba(243,208,120,0.45)] hover:scale-105 hover:brightness-110 active:scale-95 transition-all duration-200"
            style={{ fontFamily: "'Cinzel', serif" }}
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