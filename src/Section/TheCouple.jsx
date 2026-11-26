
// import React from "react";
// import couplePhoto from "../assets/Images/Couple .jpeg";

// const TheCouple = () => {
//   return (
//     <section className="relative min-h-screen w-full overflow-hidden bg-[#F0E4D2] text-[#702B35]">

//       {/* BACKGROUND TEXTURE */}
//       <div
//         className="pointer-events-none absolute inset-0 z-0 opacity-[0.13]"
//         style={{
//           backgroundImage:
//             "radial-gradient(#A98755 0.7px, transparent 0.7px)",
//           backgroundSize: "8px 8px",
//         }}
//       />

//       {/* SOFT CENTER LIGHT */}
//       <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,rgba(255,249,235,0.85),transparent_75%)]" />

//       {/* ================================= */}
//       {/* ROYAL PALACE ENTRANCE GATE */}
//       {/* ================================= */}

//       <div className="pointer-events-none absolute left-0 top-0 z-0 h-[230px] w-full sm:h-[270px]">

//         <svg
//           viewBox="0 0 600 230"
//           preserveAspectRatio="none"
//           className="h-full w-full overflow-visible"
//           fill="none"
//         >

//           {/* OUTER PALACE GATE */}
//           <path
//             d="
//               M 14 230
//               L 14 132
//               Q 14 108 40 91
//               L 105 52
//               Q 135 29 180 28
//               L 250 31
//               Q 282 32 292 12
//               L 300 0
//               L 308 12
//               Q 318 32 350 31
//               L 420 28
//               Q 465 29 495 52
//               L 560 91
//               Q 586 108 586 132
//               L 586 230
//             "
//             stroke="#B9955C"
//             strokeWidth="2.2"
//             strokeLinejoin="round"
//           />

//           {/* INNER PALACE GATE LINE */}
//           <path
//             d="
//               M 22 230
//               L 22 135
//               Q 22 113 46 98
//               L 110 60
//               Q 140 38 181 37
//               L 250 40
//               Q 281 41 295 21
//               L 300 13
//               L 305 21
//               Q 319 41 350 40
//               L 419 37
//               Q 460 38 490 60
//               L 554 98
//               Q 578 113 578 135
//               L 578 230
//             "
//             stroke="#D2B77F"
//             strokeWidth="1"
//             strokeLinejoin="round"
//           />

//           {/* CENTRAL CREST DETAIL */}
//           <path
//             d="
//               M 280 34
//               Q 293 29 300 8
//               Q 307 29 320 34
//             "
//             stroke="#B9955C"
//             strokeWidth="1.5"
//           />

//           {/* SMALL CREST DECORATION */}
//           <path
//             d="
//               M 300 3
//               L 300 19
//               M 293 11
//               L 307 11
//             "
//             stroke="#B9955C"
//             strokeWidth="1.5"
//           />

//           {/* SMALL SIDE ARCH DETAILS */}
//           <path
//             d="M 14 145 Q 30 139 42 145"
//             stroke="#B9955C"
//             strokeWidth="1"
//           />

//           <path
//             d="M 586 145 Q 570 139 558 145"
//             stroke="#B9955C"
//             strokeWidth="1"
//           />

//         </svg>
//       </div>

//       {/* SIDE ARCHITECTURAL BORDERS */}
//       <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">

//         {/* LEFT SIDE */}
//         <div className="absolute bottom-[8%] left-3 top-[230px] w-px bg-[#B9955C]/50 sm:left-7 sm:top-[270px]" />

//         <div
//           className="absolute bottom-[15%] left-[7px] top-[250px] w-5 opacity-[0.16] sm:left-4 sm:top-[290px] sm:w-8"
//           style={{
//             backgroundImage: `
//               repeating-linear-gradient(
//                 45deg,
//                 #987342 0px,
//                 #987342 1px,
//                 transparent 1px,
//                 transparent 10px
//               ),
//               repeating-linear-gradient(
//                 -45deg,
//                 #987342 0px,
//                 #987342 1px,
//                 transparent 1px,
//                 transparent 10px
//               )
//             `,
//           }}
//         />

//         {/* RIGHT SIDE */}
//         <div className="absolute bottom-[8%] right-3 top-[230px] w-px bg-[#B9955C]/50 sm:right-7 sm:top-[270px]" />

//         <div
//           className="absolute bottom-[15%] right-[7px] top-[250px] w-5 opacity-[0.16] sm:right-4 sm:top-[290px] sm:w-8"
//           style={{
//             backgroundImage: `
//               repeating-linear-gradient(
//                 45deg,
//                 #987342 0px,
//                 #987342 1px,
//                 transparent 1px,
//                 transparent 10px
//               ),
//               repeating-linear-gradient(
//                 -45deg,
//                 #987342 0px,
//                 #987342 1px,
//                 transparent 1px,
//                 transparent 10px
//               )
//             `,
//           }}
//         />

//         {/* CORNER DETAILS */}
//         <span className="absolute bottom-4 left-4 text-xl text-[#B9955C]/70 sm:left-8">
//           ❧
//         </span>

//         <span className="absolute bottom-4 right-4 -scale-x-100 text-xl text-[#B9955C]/70 sm:right-8">
//           ❧
//         </span>

//       </div>

//       {/* ================================= */}
//       {/* MAIN CONTENT */}
//       {/* ================================= */}

//       <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[650px] flex-col items-center px-10 pb-14 pt-16 sm:px-16 sm:pt-20">

//         {/* TOP HEADING */}
//         <div className="mb-4 flex flex-col items-center">

//           <span className="text-2xl text-[#B9955C]">
//             ✧
//           </span>

//           <div className="mt-2 flex items-center gap-3">
//             <span className="h-px w-12 bg-[#B9955C]" />
//             <span className="text-xs text-[#B9955C]">✦</span>
//             <span className="h-px w-12 bg-[#B9955C]" />
//           </div>

//         </div>

//         {/* SECTION TITLE */}
//         <p className="mb-3 text-[9px] font-medium uppercase tracking-[0.4em] text-[#A17C47] sm:text-[11px]">
//           A Royal Celebration
//         </p>

//         <h2 className="font-serif text-4xl font-normal tracking-wide text-[#702B35] sm:text-5xl">
//           The Couple
//         </h2>

//         <p className="mt-3 text-[9px] tracking-[0.3em] text-[#92734F] sm:text-[10px]">
//           TWO SOULS · ONE BEAUTIFUL JOURNEY
//         </p>

//         {/* GOLD DIVIDER */}
//         <div className="my-8 flex w-full items-center justify-center gap-3">
//           <span className="h-px w-14 bg-[#B9955C]/70" />
//           <span className="text-[#B9955C]">✧</span>
//           <span className="h-px w-14 bg-[#B9955C]/70" />
//         </div>

//         {/* ================================= */}
//         {/* COUPLE PHOTO - ROYAL ARCH FRAME */}
//         {/* ================================= */}

//         <div className="relative w-full max-w-[390px] px-2">

//           {/* OUTER GOLD ARCH */}
//           <div
//             className="absolute -inset-[6px] border-2 border-[#B9955C]"
//             style={{
//               borderRadius: "50% 50% 0 0 / 18% 18% 0 0",
//             }}
//           />

//           {/* INNER GOLD ARCH */}
//           <div
//             className="absolute -inset-[1px] border border-[#D5B77D]"
//             style={{
//               borderRadius: "50% 50% 0 0 / 18% 18% 0 0",
//             }}
//           />

//           {/* COUPLE IMAGE */}
//           <div
//             className="relative overflow-hidden bg-[#E8DCC7]"
//             style={{
//               borderRadius: "50% 50% 0 0 / 18% 18% 0 0",
//             }}
//           >
//             <img
//               src={couplePhoto}
//               alt="Aditi and Somya"
//               className="block h-auto w-full object-contain"
//             />
//           </div>

//           {/* ARCH TOP ORNAMENT */}
//           <div className="absolute -top-5 left-1/2 -translate-x-1/2 text-2xl text-[#B9955C]">
//             ✦
//           </div>

         

//         </div>

//         {/* ================================= */}
//         {/* COUPLE NAMES */}
//         {/* ================================= */}

//         <div className="mt-10 flex flex-col items-center text-center">

//           <h3 className="font-['Pacifico'] text-4xl text-[#702B35] sm:text-5xl">
//             Aditi
//           </h3>

//           <div className="my-2 flex items-center gap-4">
//             <span className="h-px w-12 bg-[#B9955C]" />

//             <span className="font-serif text-3xl text-[#B9955C]">
//               &
//             </span>

//             <span className="h-px w-12 bg-[#B9955C]" />
//           </div>

//           <h3 className="font-['Pacifico'] text-4xl text-[#702B35] sm:text-5xl">
//             Somya
//           </h3>

//           <p className="mt-4 text-[9px] font-medium uppercase tracking-[0.35em] text-[#A17C47]">
//             Together Forever
//           </p>

//         </div>

//         {/* BOTTOM DECORATION */}
//         <div className="mt-10 flex w-full items-center justify-center gap-3">
//           <span className="h-px w-16 bg-[#B9955C]/70" />
       
//           <span className="h-px w-16 bg-[#B9955C]/70" />
//         </div>

//       </div>

//     </section>
//   );
// };

// export default TheCouple;
import React, { useState, useEffect } from 'react';
import { Heart, Sparkles } from 'lucide-react';
import Couple from '../assets/Images/Couple .jpeg';

export default function TheCouple() {
  const [showStory, setShowStory] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  const coupleData = {
    tag: 'Two Souls, One Journey',
    photoSrc: Couple,
    bride: 'Aditi',
    groom: 'Somya',
    quote: '“In all the world, there is no heart for me like yours.”',
    story:
      'From a chance coffee conversation to forever — celebrating love, laughter, and the beginning of our greatest adventure together with our closest family and friends.',
  };

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

  return (
    <section className="min-h-screen w-full bg-[#04091a] flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden select-none">
      {/* Medallion & Royal Stage Animations */}
      <style>{`
        @keyframes royalFadeUp {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slowRingSpin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        @keyframes medallionZoom {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.06);
          }
          100% {
            transform: scale(1);
          }
        }
        .animate-royal-fade-1 {
          animation: royalFadeUp 0.85s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .animate-royal-fade-2 {
          opacity: 0;
          animation: royalFadeUp 0.95s cubic-bezier(0.22, 1, 0.36, 1) 0.16s forwards;
        }
        .animate-royal-fade-3 {
          opacity: 0;
          animation: royalFadeUp 0.95s cubic-bezier(0.22, 1, 0.36, 1) 0.32s forwards;
        }
        .animate-ring-spin {
          animation: slowRingSpin 36s linear infinite;
        }
        .animate-medallion-zoom {
          animation: medallionZoom 14s ease-in-out infinite;
        }
      `}</style>

      {/* Ambient Royal Blue Theater Glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-85"
        style={{
          background:
            'radial-gradient(circle at 50% 40%, rgba(29, 78, 216, 0.38) 0%, rgba(9, 24, 61, 0.9) 58%, rgba(4, 9, 26, 1) 100%)',
        }}
      />

      {/* Top Spotlight Beam */}
      <div
        className="pointer-events-none absolute inset-0 opacity-45"
        style={{
          background:
            'conic-gradient(from 165deg at 50% -10%, transparent 0deg, rgba(243, 208, 120, 0.22) 15deg, transparent 30deg)',
        }}
      />

      {/* Main Royal Card Container */}
      <div className="relative z-10 w-full max-w-[430px] rounded-[34px] border border-[#f3d078]/45 bg-[#071330]/90 backdrop-blur-md px-6 py-9 shadow-[0_25px_70px_rgba(0,0,0,0.9),0_0_45px_rgba(37,99,235,0.28)] flex flex-col items-center text-center">
        {/* Double Inner Champagne Gold Frame */}
        <div className="pointer-events-none absolute inset-3 rounded-[24px] border border-[#f3d078]/30" />

        {/* Corner Gold Sparkles */}
        <Sparkles className="w-4 h-4 text-[#f3d078]/75 absolute top-7 left-7 animate-pulse" />
        <Sparkles className="w-4 h-4 text-[#f3d078]/75 absolute top-7 right-7 animate-pulse" />

        {/* Section Tag */}
        <div className="animate-royal-fade-1 flex flex-col items-center">
          <p
            className="text-[11px] sm:text-xs tracking-[0.28em] uppercase text-[#f3d078] mt-1"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            {coupleData.tag}
          </p>
          <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-[#f3d078] to-transparent my-3" />
        </div>

        {/* Spotlight Oval Medallion with Rotating Gold Filigree Ring */}
        <div className="animate-royal-fade-2 relative w-[250px] sm:w-[270px] aspect-[4/5] my-1 flex items-center justify-center">
          {/* Radial Spotlight Behind Medallion */}
          <div
            className="pointer-events-none absolute -inset-4 rounded-full blur-xl opacity-60"
            style={{
              background:
                'radial-gradient(circle, rgba(243, 208, 120, 0.28) 0%, rgba(37, 99, 235, 0.22) 55%, transparent 75%)',
            }}
          />

          {/* Slow Rotating Dashed & Solid Gold Ring */}
          <div className="pointer-events-none absolute inset-0 rounded-full border border-dashed border-[#f3d078]/55 animate-ring-spin">
            <span className="w-2 h-2 rounded-full bg-[#f3d078] shadow-[0_0_8px_#f3d078] absolute -top-1 left-1/2 -translate-x-1/2" />
            <span className="w-2 h-2 rounded-full bg-[#f3d078] shadow-[0_0_8px_#f3d078] absolute -bottom-1 left-1/2 -translate-x-1/2" />
          </div>

          {/* Inner Oval Photo Frame */}
          <div className="relative w-[88%] h-[90%] rounded-full p-[3px] bg-gradient-to-b from-[#f3d078] via-[#b8860b]/75 to-[#f3d078]/45 shadow-[0_14px_38px_rgba(0,0,0,0.85)]">
            <div className="relative w-full h-full rounded-full overflow-hidden bg-[#040b1f] flex items-center justify-center">
              {coupleData.photoSrc && (
                <img
                  src={coupleData.photoSrc}
                  alt="Aditi and Somya"
                  onLoad={() => setImgLoaded(true)}
                  onError={() => setImgLoaded(false)}
                  className={`w-full h-full object-cover object-center animate-medallion-zoom transition-opacity duration-700 ${
                    imgLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              )}

              {!imgLoaded && (
                <div className="flex flex-col items-center justify-center text-[#f3d078]/60 px-4">
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

        {/* Couple Name, Quote & Little Note */}
        <div className="animate-royal-fade-3 flex flex-col items-center w-full mt-3">
          <h2
            className="text-4xl sm:text-5xl text-[#fff6e0] drop-shadow-[0_2px_12px_rgba(255,209,102,0.45)] leading-tight"
            style={{ fontFamily: "'Great Vibes', cursive", textTransform: 'none' }}
          >
            {coupleData.bride}{' '}
            <span className="text-[#f3d078] text-3xl mx-0.5">&</span>{' '}
            {coupleData.groom}
          </h2>

          <div className="flex items-center gap-2.5 my-3 text-[#f3d078]">
            <span className="w-12 h-[1px] bg-gradient-to-r from-transparent to-[#f3d078]/70" />
            <Heart className="w-3.5 h-3.5 fill-[#f3d078]" />
            <span className="w-12 h-[1px] bg-gradient-to-l from-transparent to-[#f3d078]/70" />
          </div>

          <p
            className="text-base sm:text-lg italic text-[#f8e6be]/95 max-w-[290px] leading-relaxed"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            {coupleData.quote}
          </p>

          <div className="mt-4 w-full flex flex-col items-center">
            <button
              type="button"
              onClick={() => setShowStory((prev) => !prev)}
              className="px-5 py-2 rounded-full border border-[#f3d078]/50 bg-[#f3d078]/10 hover:bg-[#f3d078]/20 active:scale-95 text-[#f3d078] text-[11px] tracking-[0.22em] uppercase transition-all cursor-pointer"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              {showStory ? 'Hide Note' : 'Our Little Note'}
            </button>

            {showStory && (
              <p
                className="mt-3.5 text-sm sm:text-base text-[#e2e8f0]/90 leading-relaxed max-w-[300px] px-2 animate-royal-fade-1"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                {coupleData.story}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}