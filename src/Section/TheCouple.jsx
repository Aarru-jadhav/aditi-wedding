import React, { useState, useEffect, useRef } from 'react';
import { Heart, Sparkles } from 'lucide-react';
import Couple from '../assets/Images/Couple .jpeg';

export default function TheCouple() {
  const [showStory, setShowStory] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  const sectionRef = useRef(null);

  const coupleData = {
    tag: 'Two Souls, One Journey',
    photoSrc: Couple,
    bride: 'Aditi',
    groom: 'Somya',
    quote: '“In all the world, there is no heart for me like yours.”',
    story:
      'From a chance coffee conversation to forever — celebrating love, laughter, and the beginning of our greatest adventure together with our closest family and friends.',
  };

  // Google Fonts
  useEffect(() => {
    const fontId = 'wedding-glitter-fonts';

    if (!document.getElementById(fontId)) {
      const link = document.createElement('link');

      link.id = fontId;
      link.rel = 'stylesheet';
      link.href =
        'https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Great+Vibes&family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&display=swap';

      document.head.appendChild(link);
    }
  }, []);

  // Scroll Reveal Animation
  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const elements = section.querySelectorAll(
      '[data-couple-reveal]'
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('couple-visible');

            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -45px 0px',
      }
    );

    elements.forEach((element) => {
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen w-full bg-[#04091a] flex flex-col items-center justify-center px-4 py-16 relative overflow-hidden select-none"
    >
      <style>{`

        /* Scroll Reveal Animation */

        [data-couple-reveal] {
          opacity: 0;
          transform: translateY(45px);
          filter: blur(5px);

          transition:
            opacity 1s cubic-bezier(0.22, 1, 0.36, 1),
            transform 1s cubic-bezier(0.22, 1, 0.36, 1),
            filter 1s ease;

          transition-delay: var(--reveal-delay, 0ms);
        }

        [data-couple-reveal].couple-visible {
          opacity: 1;
          transform: translateY(0);
          filter: blur(0);
        }

        /* Photograph Reveal */

        [data-couple-reveal="photo"] {
          transform: translateY(40px) scale(0.88);
        }

        [data-couple-reveal="photo"].couple-visible {
          transform: translateY(0) scale(1);
        }

        /* Rotating Golden Ring */

        @keyframes slowRingSpin {
          from {
            transform: rotate(0deg);
          }

          to {
            transform: rotate(360deg);
          }
        }

        /* Gentle Photo Zoom */

        @keyframes medallionZoom {
          0%, 100% {
            transform: scale(1);
          }

          50% {
            transform: scale(1.06);
          }
        }

        /* Note Reveal */

        @keyframes noteFadeUp {
          from {
            opacity: 0;
            transform: translateY(12px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-ring-spin {
          animation: slowRingSpin 36s linear infinite;
        }

        .animate-medallion-zoom {
          animation: medallionZoom 14s ease-in-out infinite;
        }

        .animate-note-reveal {
          animation: noteFadeUp 0.65s ease forwards;
        }

        /* Reduced Motion Accessibility */

        @media (prefers-reduced-motion: reduce) {
          [data-couple-reveal] {
            opacity: 1;
            transform: none;
            filter: none;
            transition: none;
          }

          .animate-ring-spin,
          .animate-medallion-zoom,
          .animate-note-reveal {
            animation: none;
          }
        }

      `}</style>

      {/* Royal Blue Background Glow */}

      <div
        className="pointer-events-none absolute inset-0 opacity-85"
        style={{
          background:
            'radial-gradient(circle at 50% 40%, rgba(29, 78, 216, 0.38) 0%, rgba(9, 24, 61, 0.9) 58%, rgba(4, 9, 26, 1) 100%)',
        }}
      />

      {/* Golden Spotlight */}

      <div
        className="pointer-events-none absolute inset-0 opacity-45"
        style={{
          background:
            'conic-gradient(from 165deg at 50% -10%, transparent 0deg, rgba(243, 208, 120, 0.22) 15deg, transparent 30deg)',
        }}
      />

      {/* Main Royal Card */}

      <div className="relative z-10 w-full max-w-[430px] rounded-[34px] border border-[#f3d078]/45 bg-[#071330]/90 backdrop-blur-md px-6 py-10 shadow-[0_25px_70px_rgba(0,0,0,0.9),0_0_45px_rgba(37,99,235,0.28)] flex flex-col items-center text-center">

        {/* Inner Golden Frame */}

        <div className="pointer-events-none absolute inset-3 rounded-[24px] border border-[#f3d078]/30" />

        {/* Corner Sparkles */}

        <Sparkles className="w-4 h-4 text-[#f3d078]/75 absolute top-7 left-7 animate-pulse" />

        <Sparkles className="w-4 h-4 text-[#f3d078]/75 absolute top-7 right-7 animate-pulse" />

        {/* 01 — Section Heading */}

        <div
          data-couple-reveal="heading"
          style={{ '--reveal-delay': '0ms' }}
          className="flex flex-col items-center"
        >
          <p
            className="text-[11px] sm:text-xs tracking-[0.28em] uppercase text-[#f3d078] mt-1"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            {coupleData.tag}
          </p>

          <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-[#f3d078] to-transparent my-3" />
        </div>

        {/* 02 — Couple Photograph */}

        <div
          data-couple-reveal="photo"
          style={{ '--reveal-delay': '180ms' }}
          className="relative w-full max-w-[250px] sm:max-w-[270px] aspect-[4/5] my-3 flex items-center justify-center"
        >

          {/* Spotlight Behind Photograph */}

          <div
            className="pointer-events-none absolute -inset-4 rounded-full blur-xl opacity-60"
            style={{
              background:
                'radial-gradient(circle, rgba(243, 208, 120, 0.28) 0%, rgba(37, 99, 235, 0.22) 55%, transparent 75%)',
            }}
          />

          {/* Rotating Golden Ring */}

          <div className="pointer-events-none absolute inset-0 rounded-full border border-dashed border-[#f3d078]/55 animate-ring-spin">

            <span className="w-2 h-2 rounded-full bg-[#f3d078] shadow-[0_0_8px_#f3d078] absolute -top-1 left-1/2 -translate-x-1/2" />

            <span className="w-2 h-2 rounded-full bg-[#f3d078] shadow-[0_0_8px_#f3d078] absolute -bottom-1 left-1/2 -translate-x-1/2" />

          </div>

          {/* Oval Golden Photo Frame */}

          <div className="relative w-[88%] h-[90%] rounded-full p-[3px] bg-gradient-to-b from-[#f3d078] via-[#b8860b]/75 to-[#f3d078]/45 shadow-[0_14px_38px_rgba(0,0,0,0.85)]">

            <div className="relative w-full h-full rounded-full overflow-hidden bg-[#040b1f]">

              {coupleData.photoSrc && (
                <img
                  src={coupleData.photoSrc}
                  alt="Aditi and Somya"
                  onLoad={() => setImgLoaded(true)}
                  onError={() => setImgLoaded(false)}
                  className={`absolute inset-0 w-full h-full object-cover object-center animate-medallion-zoom transition-opacity duration-700 ${
                    imgLoaded
                      ? 'opacity-100'
                      : 'opacity-0'
                  }`}
                />
              )}

              {!imgLoaded && (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-[#f3d078]/60 px-4">

                  <Heart className="w-6 h-6 mb-2 text-[#f3d078]/70 animate-pulse" />

                  <span
                    className="text-[10px] tracking-[0.22em] uppercase"
                    style={{ fontFamily: "'Cinzel', serif" }}
                  >
                    Couple Portrait
                  </span>

                </div>
              )}

            </div>

          </div>

        </div>

        {/* 03 — Bride & Groom Names */}

        <div
          data-couple-reveal="names"
          style={{ '--reveal-delay': '350ms' }}
          className="flex flex-col items-center w-full mt-4"
        >
          <h2
            className="text-4xl sm:text-5xl text-[#fff6e0] drop-shadow-[0_2px_12px_rgba(255,209,102,0.45)] leading-tight"
            style={{
              fontFamily: "'Great Vibes', cursive",
              textTransform: 'none',
            }}
          >
            {coupleData.bride}{' '}

            <span className="text-[#f3d078] text-3xl mx-0.5">
              &
            </span>{' '}

            {coupleData.groom}
          </h2>
        </div>

        {/* 04 — Golden Heart Divider */}

        <div
          data-couple-reveal="divider"
          style={{ '--reveal-delay': '450ms' }}
          className="flex items-center gap-2.5 my-4 text-[#f3d078]"
        >

          <span className="w-12 h-[1px] bg-gradient-to-r from-transparent to-[#f3d078]/70" />

          <Heart className="w-3.5 h-3.5 fill-[#f3d078]" />

          <span className="w-12 h-[1px] bg-gradient-to-l from-transparent to-[#f3d078]/70" />

        </div>

        {/* 05 — Romantic Quote */}

        <div
          data-couple-reveal="quote"
          style={{ '--reveal-delay': '550ms' }}
          className="flex justify-center w-full"
        >
          <p
            className="text-base sm:text-lg italic text-[#f8e6be]/95 max-w-[290px] leading-relaxed"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
            }}
          >
            {coupleData.quote}
          </p>
        </div>

        {/* 06 — Our Little Note Button */}

        <div
          data-couple-reveal="button"
          style={{ '--reveal-delay': '700ms' }}
          className="mt-5 w-full flex flex-col items-center"
        >

          <button
            type="button"
            onClick={() =>
              setShowStory((prev) => !prev)
            }
            aria-expanded={showStory}
            className="px-5 py-2 rounded-full border border-[#f3d078]/50 bg-[#f3d078]/10 hover:bg-[#f3d078]/20 active:scale-95 text-[#f3d078] text-[11px] tracking-[0.22em] uppercase transition-all cursor-pointer"
            style={{
              fontFamily: "'Cinzel', serif",
            }}
          >
            {showStory
              ? 'Hide Note'
              : 'Our Little Note'}
          </button>

          {showStory && (
            <p
              className="mt-3.5 text-sm sm:text-base text-[#e2e8f0]/90 leading-relaxed max-w-[300px] px-2 animate-note-reveal"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
              }}
            >
              {coupleData.story}
            </p>
          )}

        </div>

      </div>

    </section>
  );
}