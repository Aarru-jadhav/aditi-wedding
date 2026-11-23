
// import React, { useState } from "react";
// import WeddingLogo from "../assets/Images/Wedding logo.webp";

// export default function Page1() {
//   const [started, setStarted] = useState(false);
//   const [showLogo, setShowLogo] = useState(false);
//   const [showNames, setShowNames] = useState(false);
//   const [showTagline, setShowTagline] = useState(false);
//   const [finished, setFinished] = useState(false);

//   // Couple Names
//   const brideName = "Aditi";
//   const groomName = "Somya";

//   // Start cinematic reveal
//   const handleEnter = () => {
//     if (started) return;

//     setStarted(true);

//     setTimeout(() => setShowLogo(true), 900);
//     setTimeout(() => setShowNames(true), 2300);
//     setTimeout(() => setShowTagline(true), 3700);
//     setTimeout(() => setFinished(true), 5500);
//   };

//   // Golden particles
//   const particles = Array.from({ length: 45 }, (_, i) => ({
//     id: i,
//     left: `${(i * 37 + 13) % 100}%`,
//     top: `${(i * 53 + 7) % 100}%`,
//     delay: `${(i % 9) * 0.7}s`,
//     duration: `${5 + (i % 6)}s`,
//     size: `${2 + (i % 3)}px`,
//   }));

//   return (
//     <section className="relative flex h-[100svh] w-full items-center justify-center overflow-hidden bg-[#16090D]">

//       {/* RESPONSIVE 9:16 FRAME */}
//       <div
//         className="relative h-[100svh] max-h-[100svh] w-full overflow-hidden"
//         style={{
//           width: "min(100vw, 56.25vh)",
//           aspectRatio: "9 / 16",
//           background:
//             "radial-gradient(ellipse at 50% 45%, #642A32 0%, #35131C 52%, #16090D 100%)",
//         }}
//       >

//         {/* BACKGROUND AMBIENT GLOW */}
//         <div
//           className={`pointer-events-none absolute left-1/2 top-[43%] h-[75%] w-[130%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[75px] transition-all duration-[3000ms] ${
//             started ? "scale-100 opacity-100" : "scale-50 opacity-0"
//           }`}
//           style={{
//             background:
//               "radial-gradient(ellipse, rgba(255,205,125,0.34) 0%, rgba(222,158,82,0.16) 35%, transparent 72%)",
//           }}
//         />

//         {/* MOVING DISCO SPOTLIGHTS */}
//         <div className="pointer-events-none absolute inset-0 overflow-hidden">

//           {/* SPOTLIGHT 1 */}
//           <div
//             className={`absolute -top-[35%] left-[10%] h-[125%] w-[38%] origin-top transition-opacity duration-1000 ${
//               started ? "opacity-100" : "opacity-0"
//             }`}
//             style={{
//               background:
//                 "linear-gradient(180deg, rgba(255,222,163,0.48), rgba(242,188,112,0.16) 55%, transparent)",
//               clipPath: "polygon(35% 0, 65% 0, 100% 100%, 0 100%)",
//               filter: "blur(22px)",
//               animation: "spotlightOne 7s ease-in-out infinite alternate",
//             }}
//           />

//           {/* SPOTLIGHT 2 */}
//           <div
//             className={`absolute -top-[35%] right-[10%] h-[125%] w-[38%] origin-top transition-opacity duration-1000 ${
//               started ? "opacity-100" : "opacity-0"
//             }`}
//             style={{
//               background:
//                 "linear-gradient(180deg, rgba(255,224,174,0.42), rgba(224,166,100,0.14) 60%, transparent)",
//               clipPath: "polygon(35% 0, 65% 0, 100% 100%, 0 100%)",
//               filter: "blur(22px)",
//               animation: "spotlightTwo 9s ease-in-out infinite alternate",
//             }}
//           />

//           {/* SPOTLIGHT 3 - SOFT CENTER BEAM */}
//           <div
//             className={`absolute -top-[25%] left-[35%] h-[115%] w-[30%] origin-top transition-opacity duration-1000 ${
//               started ? "opacity-100" : "opacity-0"
//             }`}
//             style={{
//               background:
//                 "linear-gradient(180deg, rgba(255,239,204,0.32), rgba(255,210,143,0.08) 65%, transparent)",
//               clipPath: "polygon(40% 0, 60% 0, 100% 100%, 0 100%)",
//               filter: "blur(30px)",
//               animation: "spotlightThree 11s ease-in-out infinite alternate",
//             }}
//           />

//           {/* DIAGONAL LIGHT SWEEP */}
//           <div
//             className={`absolute -left-[100%] top-0 h-full w-[75%] transition-opacity duration-1000 ${
//               started ? "opacity-100" : "opacity-0"
//             }`}
//             style={{
//               background:
//                 "linear-gradient(90deg, transparent, rgba(255,218,155,0.13), rgba(255,237,196,0.3), transparent)",
//               filter: "blur(25px)",
//               transform: "skewX(-22deg)",
//               animation: "lightSweep 8s ease-in-out infinite",
//             }}
//           />

//         </div>

//         {/* FLOATING GOLD PARTICLES */}
//         {started &&
//           particles.map((particle) => (
//             <span
//               key={particle.id}
//               className="pointer-events-none absolute z-10 rounded-full bg-[#F7D69C] animate-gold-float"
//               style={{
//                 left: particle.left,
//                 top: particle.top,
//                 width: particle.size,
//                 height: particle.size,
//                 animationDelay: particle.delay,
//                 animationDuration: particle.duration,
//                 boxShadow:
//                   "0 0 8px rgba(255,215,150,0.9), 0 0 16px rgba(255,190,110,0.5)",
//               }}
//             />
//           ))}

//         {/* OPENING TEXT */}
//         <div
//           className={`absolute left-0 right-0 top-[22%] z-20 text-center transition-all duration-[1800ms] ${
//             started
//               ? "-translate-y-8 opacity-0"
//               : "translate-y-0 opacity-100"
//           }`}
//         >
//           <p className="font-serif text-[10px] tracking-[0.5em] text-[#F1D49F]">
//             A CELEBRATION OF LOVE
//           </p>
//         </div>

//         {/* CENTER WEDDING LOGO */}
//         <div
//           className={`absolute left-0 right-0 top-[31%] z-30 flex justify-center transition-all duration-[1800ms] ease-out ${
//             showLogo
//               ? "translate-y-0 scale-100 opacity-100"
//               : "translate-y-8 scale-75 opacity-0"
//           }`}
//         >
//           <img
//             src={WeddingLogo}
//             alt="Wedding Logo"
//             className="h-auto w-36 object-contain drop-shadow-[0_0_25px_rgba(255,210,130,0.6)] sm:w-44"
//           />
//         </div>

//         {/* COUPLE NAMES */}
//         <div className="absolute left-0 right-0 top-[51%] z-30 flex flex-col items-center text-center">

//           {/* BRIDE NAME */}
//           <h1
//             className={`font-['Dancing_Script'] text-6xl font-medium text-[#FFF0D2] drop-shadow-[0_3px_15px_rgba(0,0,0,0.8)] transition-all duration-[1800ms] ease-out sm:text-7xl ${
//               showNames
//                 ? "translate-x-0 opacity-100"
//                 : "-translate-x-20 opacity-0"
//             }`}
//           >
//             {brideName}
//           </h1>

//           {/* AMPERSAND */}
//           <span
//             className={`my-2 font-serif text-3xl italic text-[#F1C77E] drop-shadow-[0_0_12px_rgba(255,206,130,0.6)] transition-all duration-[1600ms] delay-300 ${
//               showNames
//                 ? "scale-100 opacity-100"
//                 : "scale-50 opacity-0"
//             }`}
//           >
//             &
//           </span>

//           {/* GROOM NAME */}
//           <h1
//             className={`font-['Dancing_Script'] text-6xl font-medium text-[#FFF0D2] drop-shadow-[0_3px_15px_rgba(0,0,0,0.8)] transition-all duration-[1800ms] ease-out sm:text-7xl ${
//               showNames
//                 ? "translate-x-0 opacity-100"
//                 : "translate-x-20 opacity-0"
//             }`}
//           >
//             {groomName}
//           </h1>

//         </div>

//         {/* GOLD DIVIDER */}
//         <div
//           className={`absolute left-1/2 top-[76%] z-30 flex w-44 -translate-x-1/2 items-center gap-3 transition-all duration-[1500ms] ${
//             showTagline ? "scale-100 opacity-100" : "scale-50 opacity-0"
//           }`}
//         >
//           <span className="h-px flex-1 bg-gradient-to-r from-transparent to-[#F1C77E]" />
//           <span className="h-2 w-2 rotate-45 border border-[#F1C77E]" />
//           <span className="h-px flex-1 bg-gradient-to-l from-transparent to-[#F1C77E]" />
//         </div>

//         {/* TAGLINE */}
//         <div
//           className={`absolute left-0 right-0 top-[79%] z-30 text-center transition-all duration-[1800ms] ${
//             showTagline
//               ? "translate-y-0 opacity-100"
//               : "translate-y-5 opacity-0"
//           }`}
//         >
//           <p className="font-serif text-[9px] tracking-[0.35em] text-[#F0D9B0]">
//             TWO SOULS, ONE BEAUTIFUL JOURNEY
//           </p>
//         </div>

//         {/* TAP TO BEGIN */}
//         {!started && (
//           <button
//             onClick={handleEnter}
//             className="absolute bottom-[13%] left-1/2 z-40 -translate-x-1/2 whitespace-nowrap border border-[#DDBB7B] bg-[#702D36]/90 px-10 py-4 font-serif text-[10px] tracking-[0.4em] text-[#FFF0D2] shadow-[0_5px_25px_rgba(0,0,0,0.3)] transition-all duration-500 hover:scale-105 hover:bg-[#863C45]"
//           >
//             TAP TO BEGIN
//           </button>
//         )}

//         {/* FINAL TEXT */}
//         {finished && (
//           <div className="absolute bottom-[5%] left-0 right-0 z-30 text-center">
//             <p className="font-serif text-[8px] tracking-[0.4em] text-[#E5C68F]">
//               A ROYAL CELEBRATION AWAITS
//             </p>
//           </div>
//         )}

//       </div>

//       {/* ANIMATION STYLES */}
//       <style>{`
//         @keyframes goldFloat {
//           0% {
//             transform: translateY(30px) scale(0.5);
//             opacity: 0;
//           }
//           25% {
//             opacity: 1;
//           }
//           75% {
//             opacity: 0.7;
//           }
//           100% {
//             transform: translateY(-120px) scale(1.4);
//             opacity: 0;
//           }
//         }

//         .animate-gold-float {
//           animation-name: goldFloat;
//           animation-timing-function: ease-in-out;
//           animation-iteration-count: infinite;
//         }

//         @keyframes spotlightOne {
//           0% {
//             transform: rotate(-28deg);
//             opacity: 0.65;
//           }
//           50% {
//             transform: rotate(12deg);
//             opacity: 1;
//           }
//           100% {
//             transform: rotate(35deg);
//             opacity: 0.7;
//           }
//         }

//         @keyframes spotlightTwo {
//           0% {
//             transform: rotate(30deg);
//             opacity: 0.5;
//           }
//           50% {
//             transform: rotate(-12deg);
//             opacity: 0.95;
//           }
//           100% {
//             transform: rotate(-35deg);
//             opacity: 0.65;
//           }
//         }

//         @keyframes spotlightThree {
//           0% {
//             transform: rotate(15deg);
//             opacity: 0.45;
//           }
//           100% {
//             transform: rotate(-20deg);
//             opacity: 0.9;
//           }
//         }

//         @keyframes lightSweep {
//           0% {
//             left: -100%;
//           }
//           50% {
//             left: 130%;
//           }
//           100% {
//             left: 130%;
//           }
//         }

//         @media (prefers-reduced-motion: reduce) {
//           .animate-gold-float {
//             animation: none !important;
//           }
//         }
//       `}</style>

//     </section>
//   );
// }
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Mic, MicOff, RotateCcw, Sparkles, Calendar, MapPin, Heart } from 'lucide-react';

/**
 * Page1 - Interactive Red Glitter Reveal Wedding Invitation
 *
 * Features:
 * - Dense, shimmering red & gold HTML5 Canvas glitter overlay
 * - Physics-based particle dispersion on tap, swipe/drag, or microphone blow
 * - Smooth reveal of red velvet stage curtains parting to show the wedding invite
 * - Self-contained styling & Google Fonts injection for luxury wedding typography
 */
export default function Page1() {
  // Configurable invitation details
  const [inviteDetails] = useState({
    topLine: 'Together with their families',
    bride: 'Aurelia',
    groom: 'Sebastian',
    subtitle: 'invite you to celebrate their wedding',
    date: '12 . 06 . 2027',
    time: '6:00 PM ONWARDS',
    venue: 'The Hartwell Ballroom, Chicago',
  });

  // Reveal & interaction states
  const [revealProgress, setRevealProgress] = useState(0); // 0 to 1
  const [isFullyRevealed, setIsFullyRevealed] = useState(false);
  const [micActive, setMicActive] = useState(false);
  const [micError, setMicError] = useState('');
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);

  // Refs for canvas, particles, animation loop, and audio
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animFrameRef = useRef(null);
  const isPointerDownRef = useRef(false);
  const lastPointerRef = useRef({ x: 0, y: 0 });
  const isRevealedRef = useRef(false);
  const audioContextRef = useRef(null);
  const micStreamRef = useRef(null);
  const micAnimRef = useRef(null);

  // Inject luxury serif & script Google Fonts dynamically so Page1.jsx is 100% self-contained
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

  // Color palette for rich ruby red, crimson, rose-gold, and champagne sparkles
  const GLITTER_COLORS = [
    '#ff1e38', // Bright ruby
    '#d90429', // Deep crimson
    '#9b0014', // Dark velvet red
    '#ff4d6d', // Rose ruby shimmer
    '#ffd166', // Warm champagne gold
    '#ffffff', // Specular white glint
    '#b8001f', // Rich garnet
  ];

  // Initialize dense glitter particles filling the card
  const initParticles = useCallback((width, height) => {
    const particles = [];
    // Spacing determines density so the invite is hidden initially
    const spacing = width < 400 ? 7 : 8;
    const cols = Math.ceil(width / spacing);
    const rows = Math.ceil(height / spacing);

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const jitterX = (Math.random() - 0.5) * spacing * 1.4;
        const jitterY = (Math.random() - 0.5) * spacing * 1.4;
        const x = c * spacing + jitterX;
        const y = r * spacing + jitterY;

        const isGoldOrWhite = Math.random() > 0.82;
        const color = isGoldOrWhite
          ? Math.random() > 0.45
            ? '#ffd166'
            : '#fff5e4'
          : GLITTER_COLORS[Math.floor(Math.random() * 5)];

        particles.push({
          x,
          y,
          originX: x,
          originY: y,
          vx: 0,
          vy: 0,
          size: isGoldOrWhite ? Math.random() * 2.2 + 1.2 : Math.random() * 3.8 + 2.2,
          color,
          alpha: 1,
          shimmerPhase: Math.random() * Math.PI * 2,
          shimmerSpeed: 0.04 + Math.random() * 0.08,
          rotation: Math.random() * Math.PI * 2,
          rotSpeed: (Math.random() - 0.5) * 0.15,
          dispersed: false,
          shape: Math.random() > 0.35 ? 'diamond' : 'circle',
        });
      }
    }
    particlesRef.current = particles;
  }, []);

  // Disperse glitter particles around an (x, y) point with outward impulse
  const disperseAt = useCallback((x, y, radius = 95, force = 14) => {
    const particles = particlesRef.current;
    if (!particles.length) return;

    let newlyDispersed = 0;
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      const dx = p.x - x;
      const dy = p.y - y;
      const distSq = dx * dx + dy * dy;

      if (distSq < radius * radius) {
        const dist = Math.sqrt(distSq) || 1;
        const falloff = 1 - dist / radius;
        const angle = Math.atan2(dy, dx) + (Math.random() - 0.5) * 0.65;
        const impulse = force * (0.45 + falloff * 0.95) * (0.7 + Math.random() * 0.6);

        p.vx += Math.cos(angle) * impulse;
        p.vy += Math.sin(angle) * impulse - 1.5; // slight upward swirl before gravity
        if (!p.dispersed) {
          p.dispersed = true;
          newlyDispersed++;
        }
      }
    }

    if (newlyDispersed > 0) {
      updateRevealRatio();
    }
  }, []);

  // Blow effect: disperses a dramatic swath of glitter across the screen
  const triggerBlowGust = useCallback((intensity = 1) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const centerX = rect.width * (0.3 + Math.random() * 0.4);
    const centerY = rect.height * (0.35 + Math.random() * 0.3);

    disperseAt(centerX, centerY, Math.max(rect.width, rect.height) * 0.55, 16 * intensity);
  }, [disperseAt]);

  // Calculate percentage of dispersed particles to trigger curtain parting
  const updateRevealRatio = () => {
    const particles = particlesRef.current;
    if (!particles.length) return;
    let count = 0;
    for (let i = 0; i < particles.length; i++) {
      if (particles[i].dispersed) count++;
    }
    const ratio = count / particles.length;
    setRevealProgress(ratio);

    // Once ~48% of the glitter is wiped/blown away, smoothly clear the remaining sparkles
    if (ratio >= 0.48 && !isRevealedRef.current) {
      isRevealedRef.current = true;
      setIsFullyRevealed(true);
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        if (!p.dispersed) {
          p.dispersed = true;
          const angle = Math.random() * Math.PI * 2;
          const speed = 3 + Math.random() * 9;
          p.vx = Math.cos(angle) * speed;
          p.vy = Math.sin(angle) * speed - 2;
        }
      }
    }
  };

  // Setup Canvas & Animation Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    let dpr = window.devicePixelRatio || 1;

    const resizeCanvas = () => {
      const rect = container.getBoundingClientRect();
      dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initParticles(rect.width, rect.height);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const render = () => {
      const rect = container.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      // Subtle deep crimson base tint that fades as glitter clears
      const activeParticles = particlesRef.current;
      let remainingAlphaSum = 0;

      for (let i = 0; i < activeParticles.length; i++) {
        const p = activeParticles[i];
        if (!p.dispersed) remainingAlphaSum += 1;
      }
      const coverage = activeParticles.length ? remainingAlphaSum / activeParticles.length : 0;

      if (coverage > 0.02) {
        ctx.fillStyle = `rgba(55, 2, 10, ${Math.min(0.92, coverage * 0.96)})`;
        ctx.fillRect(0, 0, rect.width, rect.height);
      }

      // Update & draw each glitter particle
      for (let i = 0; i < activeParticles.length; i++) {
        const p = activeParticles[i];
        if (p.alpha <= 0.01) continue;

        p.shimmerPhase += p.shimmerSpeed;
        const twinkle = 0.55 + 0.45 * Math.sin(p.shimmerPhase);

        if (p.dispersed) {
          p.x += p.vx;
          p.y += p.vy;
          p.vy += 0.24; // gentle glitter gravity
          p.vx *= 0.97; // air drag
          p.rotation += p.rotSpeed;
          p.alpha -= 0.018;
        }

        const currentAlpha = Math.max(0, p.alpha * twinkle);
        if (currentAlpha <= 0.01) continue;

        ctx.save();
        ctx.globalAlpha = currentAlpha;
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.fillStyle = p.color;

        if (p.shape === 'diamond') {
          ctx.beginPath();
          ctx.moveTo(0, -p.size);
          ctx.lineTo(p.size * 0.75, 0);
          ctx.lineTo(0, p.size);
          ctx.lineTo(-p.size * 0.75, 0);
          ctx.closePath();
          ctx.fill();
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, p.size * 0.65, 0, Math.PI * 2);
          ctx.fill();
        }

        // Bright specular flash on gold/white sparkles
        if (twinkle > 0.92 && (p.color === '#ffd166' || p.color === '#fff5e4')) {
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(-p.size * 1.5, 0);
          ctx.lineTo(p.size * 1.5, 0);
          ctx.moveTo(0, -p.size * 1.5);
          ctx.lineTo(0, p.size * 1.5);
          ctx.stroke();
        }

        ctx.restore();
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [initParticles]);

  // Pointer (Mouse + Touch) handlers for tap and swipe dispersion
  const getRelativeCoords = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };
  };

  const handlePointerDown = (e) => {
    if (isRevealedRef.current) return;
    isPointerDownRef.current = true;
    const coords = getRelativeCoords(e);
    lastPointerRef.current = coords;
    // Tap burst
    disperseAt(coords.x, coords.y, 105, 16);
  };

  const handlePointerMove = (e) => {
    if (!isPointerDownRef.current || isRevealedRef.current) return;
    const coords = getRelativeCoords(e);
    const dx = coords.x - lastPointerRef.current.x;
    const dy = coords.y - lastPointerRef.current.y;
    const dist = Math.hypot(dx, dy);

    // Interpolate along fast swipes so there are no gaps
    const steps = Math.max(1, Math.floor(dist / 12));
    for (let s = 1; s <= steps; s++) {
      const ix = lastPointerRef.current.x + (dx * s) / steps;
      const iy = lastPointerRef.current.y + (dy * s) / steps;
      disperseAt(ix, iy, 85, 13);
    }
    lastPointerRef.current = coords;
  };

  const handlePointerUp = () => {
    isPointerDownRef.current = false;
  };

  // Microphone Blow Detection using Web Audio API
  const toggleMicrophoneBlow = async () => {
    setMicError('');
    if (micActive) {
      stopMicrophone();
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      micStreamRef.current = stream;
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      const audioCtx = new AudioCtx();
      audioContextRef.current = audioCtx;

      const source = audioCtx.createMediaStreamSource(stream);
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 256;
      source.connect(analyser);

      const dataArray = new Uint8Array(analyser.frequencyBinCount);
      setMicActive(true);

      const detectBlow = () => {
        if (!micStreamRef.current) return;
        analyser.getByteFrequencyData(dataArray);

        // Low-mid frequencies capture wind/blow noise across the mic capsule
        let sum = 0;
        const bins = 24;
        for (let i = 0; i < bins; i++) {
          sum += dataArray[i];
        }
        const avgVolume = sum / bins;

        // Threshold for blowing into phone/laptop mic
        if (avgVolume > 62 && !isRevealedRef.current) {
          const intensity = Math.min(2, (avgVolume - 55) / 35);
          triggerBlowGust(intensity);
        }

        micAnimRef.current = requestAnimationFrame(detectBlow);
      };

      micAnimRef.current = requestAnimationFrame(detectBlow);
    } catch (err) {
      setMicError('Mic access denied — tap or swipe the glitter!');
      setMicActive(false);
    }
  };

  const stopMicrophone = () => {
    if (micAnimRef.current) cancelAnimationFrame(micAnimRef.current);
    if (micStreamRef.current) {
      micStreamRef.current.getTracks().forEach((t) => t.stop());
      micStreamRef.current = null;
    }
    if (audioContextRef.current) {
      audioContextRef.current.close().catch(() => {});
      audioContextRef.current = null;
    }
    setMicActive(false);
  };

  useEffect(() => {
    return () => stopMicrophone();
  }, []);

  // Reset / Replay Glitter Transition
  const handleReplay = () => {
    isRevealedRef.current = false;
    setIsFullyRevealed(false);
    setRevealProgress(0);
    setRsvpSubmitted(false);
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      initParticles(rect.width, rect.height);
    }
  };

  // Curtain opening percentage driven by glitter dispersion
  const curtainOpenPercent = isFullyRevealed
    ? 68
    : Math.min(55, Math.round(revealProgress * 95));

  return (
    <div className="min-h-screen w-full bg-[#180205] flex flex-col items-center justify-center p-3 sm:p-6 select-none overflow-hidden relative">
      {/* Ambient red theater glow behind the invitation card */}
      <div
        className="pointer-events-none absolute inset-0 opacity-75"
        style={{
          background:
            'radial-gradient(circle at 50% 45%, rgba(185, 12, 34, 0.45) 0%, rgba(45, 3, 9, 0.85) 55%, rgba(12, 1, 3, 1) 100%)',
        }}
      />

      {/* Mobile-First Vertical Invitation Stage Card */}
      <div
        ref={containerRef}
        className="relative w-full max-w-[410px] aspect-[9/16] max-h-[82vh] rounded-[32px] overflow-hidden shadow-[0_25px_70px_rgba(0,0,0,0.9),0_0_40px_rgba(220,20,60,0.35)] border-[2px] border-[#d4af37]/50 bg-[#2b0308]"
      >
        {/* LAYER 1: Inner Golden Stage & Wedding Invitation Content */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-between px-6 py-10 text-center"
          style={{
            background:
              'radial-gradient(ellipse at 50% 25%, #5c0914 0%, #2d0308 65%, #160104 100%)',
          }}
        >
          {/* Warm theatrical spotlight beam from top */}
          <div
            className="pointer-events-none absolute inset-0 opacity-50"
            style={{
              background:
                'conic-gradient(from 162deg at 50% -8%, transparent 0deg, rgba(255, 224, 155, 0.26) 18deg, transparent 36deg)',
            }}
          />

          {/* Decorative Double Gold Inner Frame */}
          <div className="pointer-events-none absolute inset-3 rounded-[22px] border border-[#f3d078]/40" />
          <div className="pointer-events-none absolute inset-4 rounded-[18px] border border-[#f3d078]/20" />

          {/* Top Invitation Header */}
          <div
            className={`relative z-10 mt-3 transition-all duration-1000 ${
              isFullyRevealed || revealProgress > 0.25
                ? 'opacity-100 translate-y-0'
                : 'opacity-40 translate-y-2'
            }`}
          >
            <p
              className="text-[11px] sm:text-xs tracking-[0.26em] uppercase text-[#f6dfa4]"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              {inviteDetails.topLine}
            </p>
            <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[#f3d078] to-transparent mx-auto mt-2.5" />
          </div>

          {/* Center Couple Names & Monogram Emblem */}
          <div
            className={`relative z-10 flex flex-col items-center my-auto transition-all duration-1000 ${
              isFullyRevealed || revealProgress > 0.25
                ? 'opacity-100 scale-100'
                : 'opacity-40 scale-95'
            }`}
          >
            <h1
              className="text-5xl sm:text-6xl text-[#fff6e0] drop-shadow-[0_2px_12px_rgba(255,209,102,0.45)] leading-tight"
              style={{ fontFamily: "'Great Vibes', cursive" }}
            >
              {inviteDetails.bride}
            </h1>

            <span
              className="text-2xl sm:text-3xl text-[#f3d078] my-0.5"
              style={{ fontFamily: "'Great Vibes', cursive" }}
            >
              &amp;
            </span>

            <h1
              className="text-5xl sm:text-6xl text-[#fff6e0] drop-shadow-[0_2px_12px_rgba(255,209,102,0.45)] leading-tight"
              style={{ fontFamily: "'Great Vibes', cursive" }}
            >
              {inviteDetails.groom}
            </h1>

            <p
              className="mt-4 text-sm sm:text-base italic text-[#f8e6be]/90 max-w-[240px]"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              {inviteDetails.subtitle}
            </p>

            {/* Ornamental Divider */}
            <div className="flex items-center gap-2 my-4 text-[#f3d078]">
              <span className="w-10 h-[1px] bg-[#f3d078]/50" />
              <Heart className="w-3.5 h-3.5 fill-[#f3d078]" />
              <span className="w-10 h-[1px] bg-[#f3d078]/50" />
            </div>

            {/* Date & Venue Details */}
            <div className="space-y-1.5 text-[#fff4d9]">
              <div
                className="flex items-center justify-center gap-1.5 text-base sm:text-lg font-semibold tracking-[0.2em]"
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                <Calendar className="w-4 h-4 text-[#f3d078]" />
                <span>{inviteDetails.date}</span>
              </div>
              <p
                className="text-[11px] tracking-[0.22em] text-[#f3d078]/90 uppercase"
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                {inviteDetails.time}
              </p>
              <div
                className="flex items-center justify-center gap-1.5 pt-1 text-sm sm:text-base text-[#f8e6be]"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                <MapPin className="w-4 h-4 text-[#f3d078] shrink-0" />
                <span>{inviteDetails.venue}</span>
              </div>
            </div>
          </div>

          {/* Bottom Interactive RSVP Action */}
          <div className="relative z-10 w-full mb-1">
            {rsvpSubmitted ? (
              <div
                className="py-2.5 px-5 rounded-full bg-[#f3d078]/20 border border-[#f3d078] text-[#fff6e0] text-xs tracking-[0.18em] uppercase"
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                ✨ We look forward to celebrating with you!
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setRsvpSubmitted(true)}
                className="w-4/5 py-3 px-6 rounded-full bg-gradient-to-r from-[#c8963e] via-[#f3d078] to-[#c8963e] text-[#2b0308] font-bold text-xs tracking-[0.22em] uppercase shadow-[0_6px_24px_rgba(243,208,120,0.4)] hover:brightness-110 active:scale-95 transition-all cursor-pointer"
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                RSVP Now
              </button>
            )}
          </div>
        </div>

        {/* LAYER 2: Red Velvet Stage Curtains (Part outward as glitter clears) */}
        <div className="pointer-events-none absolute inset-0 z-20 flex overflow-hidden">
          {/* Left Velvet Curtain */}
          <div
            className="h-full w-1/2 transition-transform duration-700 ease-out relative"
            style={{
              transform: `translateX(-${curtainOpenPercent}%)`,
              background:
                'repeating-linear-gradient(90deg, #4a040d 0px, #8c0b1c 14px, #3b0209 28px, #7a0918 42px)',
              boxShadow: 'inset -12px 0 24px rgba(0,0,0,0.75), 6px 0 20px rgba(0,0,0,0.65)',
            }}
          >
            {/* Golden inner curtain trim */}
            <div className="absolute top-0 right-0 bottom-0 w-[3px] bg-gradient-to-b from-[#f3d078] via-[#b8860b] to-[#f3d078] opacity-85" />
          </div>

          {/* Right Velvet Curtain */}
          <div
            className="h-full w-1/2 transition-transform duration-700 ease-out relative"
            style={{
              transform: `translateX(${curtainOpenPercent}%)`,
              background:
                'repeating-linear-gradient(90deg, #7a0918 0px, #3b0209 14px, #8c0b1c 28px, #4a040d 42px)',
              boxShadow: 'inset 12px 0 24px rgba(0,0,0,0.75), -6px 0 20px rgba(0,0,0,0.65)',
            }}
          >
            {/* Golden inner curtain trim */}
            <div className="absolute top-0 left-0 bottom-0 w-[3px] bg-gradient-to-b from-[#f3d078] via-[#b8860b] to-[#f3d078] opacity-85" />
          </div>
        </div>

        {/* LAYER 3: Interactive Glitter Particle Canvas */}
        <canvas
          ref={canvasRef}
          onMouseDown={handlePointerDown}
          onMouseMove={handlePointerMove}
          onMouseUp={handlePointerUp}
          onMouseLeave={handlePointerUp}
          onTouchStart={handlePointerDown}
          onTouchMove={handlePointerMove}
          onTouchEnd={handlePointerUp}
          className={`absolute inset-0 z-30 w-full h-full touch-none ${
            isFullyRevealed ? 'pointer-events-none' : 'cursor-pointer'
          }`}
        />

        {/* LAYER 4: Floating Prompt Overlay (Matches the video's exact prompt typography) */}
        <div
          className={`pointer-events-none absolute inset-0 z-40 flex flex-col items-center justify-between py-12 px-6 text-center transition-opacity duration-500 ${
            revealProgress > 0.14 || isFullyRevealed ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <div className="mt-2 bg-black/30 backdrop-blur-[2px] px-4 py-1.5 rounded-full border border-white/15">
            <p
              className="text-xs sm:text-sm text-[#fff6e5] tracking-wide font-medium drop-shadow"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              An invitation is hiding under the glitter!
            </p>
          </div>

          <div className="my-auto flex flex-col items-center animate-pulse">
            <Sparkles className="w-6 h-6 text-[#ffd166] mb-1.5 drop-shadow-[0_0_8px_rgba(255,209,102,0.8)]" />
            <h2
              className="text-4xl sm:text-5xl text-white drop-shadow-[0_3px_14px_rgba(0,0,0,0.9)]"
              style={{ fontFamily: "'Great Vibes', cursive" }}
            >
              Blow on the glitter
            </h2>
            <p
              className="text-xs sm:text-sm text-[#ffe8b3] tracking-widest uppercase mt-1 drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)]"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              or simply tap &amp; swipe
            </p>
          </div>

          <div className="h-4" />
        </div>
      </div>

      {/* Bottom Interactive Controls (Blow Mic, Simulate Blow Gust, Replay Glitter) */}
      <div className="relative z-50 mt-4 flex flex-wrap items-center justify-center gap-2.5 max-w-[420px]">
        {!isFullyRevealed && (
          <>
            <button
              type="button"
              onClick={toggleMicrophoneBlow}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium tracking-wider uppercase border transition-all cursor-pointer ${
                micActive
                  ? 'bg-[#d90429] text-white border-[#ffd166] shadow-[0_0_16px_rgba(217,4,41,0.7)]'
                  : 'bg-white/10 text-[#f8e6be] border-white/20 hover:bg-white/20'
              }`}
            >
              {micActive ? <Mic className="w-3.5 h-3.5 animate-bounce" /> : <MicOff className="w-3.5 h-3.5" />}
              <span>{micActive ? 'Listening... Blow!' : 'Enable Mic Blow'}</span>
            </button>

            <button
              type="button"
              onClick={() => triggerBlowGust(1.3)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium tracking-wider uppercase bg-[#f3d078]/15 text-[#f3d078] border border-[#f3d078]/40 hover:bg-[#f3d078]/25 active:scale-95 transition-all cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Blow Gust</span>
            </button>
          </>
        )}

        <button
          type="button"
          onClick={handleReplay}
          className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium tracking-wider uppercase bg-white/10 text-white/90 border border-white/20 hover:bg-white/20 active:scale-95 transition-all cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Replay Glitter</span>
        </button>
      </div>

      {micError && (
        <p className="relative z-50 mt-2 text-xs text-[#ffd166] text-center">{micError}</p>
      )}
    </div>
  );
}