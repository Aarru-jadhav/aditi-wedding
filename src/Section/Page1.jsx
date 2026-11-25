// import React, { useState, useEffect, useRef, useCallback } from 'react';
// import { Mic, MicOff, RotateCcw, Sparkles, Calendar, MapPin, Heart } from 'lucide-react';

// /**
//  * Page1 - Interactive Royal Blue Glitter Reveal Wedding Invitation
//  *
//  * Features:
//  * - Fine, dense, shimmering royal blue & champagne gold HTML5 Canvas micro-glitter overlay
//  * - Physics-based particle dispersion on tap, swipe/drag, or microphone blow
//  * - Smooth reveal of royal blue velvet stage curtains parting to show the wedding invite
//  * - Self-contained styling & Google Fonts injection for luxury wedding typography
//  */
// export default function Page1() {
//   // Configurable invitation details
//   const [inviteDetails] = useState({
//     topLine: 'Together with their families',
//     bride: 'Aurelia',
//     groom: 'Sebastian',
//     subtitle: 'invite you to celebrate their wedding',
//     date: '12 . 06 . 2027',
//     time: '6:00 PM ONWARDS',
//     venue: 'The Hartwell Ballroom, Chicago',
//   });

//   // Reveal & interaction states
//   const [revealProgress, setRevealProgress] = useState(0); // 0 to 1
//   const [isFullyRevealed, setIsFullyRevealed] = useState(false);
//   const [micActive, setMicActive] = useState(false);
//   const [micError, setMicError] = useState('');
//   const [rsvpSubmitted, setRsvpSubmitted] = useState(false);

//   // Refs for canvas, particles, animation loop, and audio
//   const containerRef = useRef(null);
//   const canvasRef = useRef(null);
//   const particlesRef = useRef([]);
//   const animFrameRef = useRef(null);
//   const isPointerDownRef = useRef(false);
//   const lastPointerRef = useRef({ x: 0, y: 0 });
//   const isRevealedRef = useRef(false);
//   const audioContextRef = useRef(null);
//   const micStreamRef = useRef(null);
//   const micAnimRef = useRef(null);

//   // Inject luxury serif & script Google Fonts dynamically so Page1.jsx is 100% self-contained
//   useEffect(() => {
//     const fontId = 'wedding-glitter-fonts';
//     if (!document.getElementById(fontId)) {
//       const link = document.createElement('link');
//       link.id = fontId;
//       link.rel = 'stylesheet';
//       link.href =
//         'https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Great+Vibes&family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&display=swap';
//       document.head.appendChild(link);
//     }
//   }, []);

//   // Color palette for rich royal blue, sapphire, cobalt, champagne-gold, and white sparkles
//   const GLITTER_COLORS = [
//     '#1e40af', // Classic Royal Blue
//     '#1d4ed8', // Vibrant Sapphire
//     '#0a2463', // Deep Imperial Blue
//     '#3b82f6', // Royal Azure shimmer
//     '#0f172a', // Midnight Navy velvet
//     '#ffd166', // Warm champagne gold
//     '#ffffff', // Specular white glint
//   ];

//   // Initialize dense fine micro-glitter particles filling the card
//   const initParticles = useCallback((width, height) => {
//     const particles = [];
//     // Tighter spacing for smaller, fine glitter dust so coverage remains rich and opaque
//     const spacing = width < 400 ? 5 : 6;
//     const cols = Math.ceil(width / spacing);
//     const rows = Math.ceil(height / spacing);

//     for (let r = 0; r < rows; r++) {
//       for (let c = 0; c < cols; c++) {
//         const jitterX = (Math.random() - 0.5) * spacing * 1.4;
//         const jitterY = (Math.random() - 0.5) * spacing * 1.4;
//         const x = c * spacing + jitterX;
//         const y = r * spacing + jitterY;

//         const isGoldOrWhite = Math.random() > 0.84;
//         const color = isGoldOrWhite
//           ? Math.random() > 0.45
//             ? '#ffd166'
//             : '#f8fafc'
//           : GLITTER_COLORS[Math.floor(Math.random() * 5)];

//         particles.push({
//           x,
//           y,
//           originX: x,
//           originY: y,
//           vx: 0,
//           vy: 0,
//           // Smaller, delicate micro-sparkle sizes
//           size: isGoldOrWhite ? Math.random() * 1.1 + 0.7 : Math.random() * 1.6 + 1.1,
//           color,
//           alpha: 1,
//           shimmerPhase: Math.random() * Math.PI * 2,
//           shimmerSpeed: 0.05 + Math.random() * 0.09,
//           rotation: Math.random() * Math.PI * 2,
//           rotSpeed: (Math.random() - 0.5) * 0.18,
//           dispersed: false,
//           shape: Math.random() > 0.4 ? 'diamond' : 'circle',
//         });
//       }
//     }
//     particlesRef.current = particles;
//   }, []);

//   // Disperse glitter particles around an (x, y) point with outward impulse
//   const disperseAt = useCallback((x, y, radius = 95, force = 14) => {
//     const particles = particlesRef.current;
//     if (!particles.length) return;

//     let newlyDispersed = 0;
//     for (let i = 0; i < particles.length; i++) {
//       const p = particles[i];
//       const dx = p.x - x;
//       const dy = p.y - y;
//       const distSq = dx * dx + dy * dy;

//       if (distSq < radius * radius) {
//         const dist = Math.sqrt(distSq) || 1;
//         const falloff = 1 - dist / radius;
//         const angle = Math.atan2(dy, dx) + (Math.random() - 0.5) * 0.65;
//         const impulse = force * (0.45 + falloff * 0.95) * (0.7 + Math.random() * 0.6);

//         p.vx += Math.cos(angle) * impulse;
//         p.vy += Math.sin(angle) * impulse - 1.5; // slight upward swirl before gravity
//         if (!p.dispersed) {
//           p.dispersed = true;
//           newlyDispersed++;
//         }
//       }
//     }

//     if (newlyDispersed > 0) {
//       updateRevealRatio();
//     }
//   }, []);

//   // Blow effect: disperses a dramatic swath of glitter across the screen
//   const triggerBlowGust = useCallback((intensity = 1) => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;
//     const rect = canvas.getBoundingClientRect();
//     const centerX = rect.width * (0.3 + Math.random() * 0.4);
//     const centerY = rect.height * (0.35 + Math.random() * 0.3);

//     disperseAt(centerX, centerY, Math.max(rect.width, rect.height) * 0.55, 16 * intensity);
//   }, [disperseAt]);

//   // Calculate percentage of dispersed particles to trigger curtain parting
//   const updateRevealRatio = () => {
//     const particles = particlesRef.current;
//     if (!particles.length) return;
//     let count = 0;
//     for (let i = 0; i < particles.length; i++) {
//       if (particles[i].dispersed) count++;
//     }
//     const ratio = count / particles.length;
//     setRevealProgress(ratio);

//     // Once ~48% of the glitter is wiped/blown away, smoothly clear the remaining sparkles
//     if (ratio >= 0.48 && !isRevealedRef.current) {
//       isRevealedRef.current = true;
//       setIsFullyRevealed(true);
//       for (let i = 0; i < particles.length; i++) {
//         const p = particles[i];
//         if (!p.dispersed) {
//           p.dispersed = true;
//           const angle = Math.random() * Math.PI * 2;
//           const speed = 3 + Math.random() * 9;
//           p.vx = Math.cos(angle) * speed;
//           p.vy = Math.sin(angle) * speed - 2;
//         }
//       }
//     }
//   };

//   // Setup Canvas & Animation Loop
//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const container = containerRef.current;
//     if (!canvas || !container) return;

//     const ctx = canvas.getContext('2d');
//     let dpr = window.devicePixelRatio || 1;

//     const resizeCanvas = () => {
//       const rect = container.getBoundingClientRect();
//       dpr = window.devicePixelRatio || 1;
//       canvas.width = rect.width * dpr;
//       canvas.height = rect.height * dpr;
//       ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
//       initParticles(rect.width, rect.height);
//     };

//     resizeCanvas();
//     window.addEventListener('resize', resizeCanvas);

//     const render = () => {
//       const rect = container.getBoundingClientRect();
//       ctx.clearRect(0, 0, rect.width, rect.height);

//       // Deep royal blue base tint that fades as glitter clears
//       const activeParticles = particlesRef.current;
//       let remainingAlphaSum = 0;

//       for (let i = 0; i < activeParticles.length; i++) {
//         const p = activeParticles[i];
//         if (!p.dispersed) remainingAlphaSum += 1;
//       }
//       const coverage = activeParticles.length ? remainingAlphaSum / activeParticles.length : 0;

//       if (coverage > 0.02) {
//         ctx.fillStyle = `rgba(6, 18, 52, ${Math.min(0.94, coverage * 0.97)})`;
//         ctx.fillRect(0, 0, rect.width, rect.height);
//       }

//       // Update & draw each micro-glitter particle
//       for (let i = 0; i < activeParticles.length; i++) {
//         const p = activeParticles[i];
//         if (p.alpha <= 0.01) continue;

//         p.shimmerPhase += p.shimmerSpeed;
//         const twinkle = 0.55 + 0.45 * Math.sin(p.shimmerPhase);

//         if (p.dispersed) {
//           p.x += p.vx;
//           p.y += p.vy;
//           p.vy += 0.22; // gentle fine-glitter gravity
//           p.vx *= 0.97; // air drag
//           p.rotation += p.rotSpeed;
//           p.alpha -= 0.018;
//         }

//         const currentAlpha = Math.max(0, p.alpha * twinkle);
//         if (currentAlpha <= 0.01) continue;

//         ctx.save();
//         ctx.globalAlpha = currentAlpha;
//         ctx.translate(p.x, p.y);
//         ctx.rotate(p.rotation);
//         ctx.fillStyle = p.color;

//         if (p.shape === 'diamond') {
//           ctx.beginPath();
//           ctx.moveTo(0, -p.size);
//           ctx.lineTo(p.size * 0.75, 0);
//           ctx.lineTo(0, p.size);
//           ctx.lineTo(-p.size * 0.75, 0);
//           ctx.closePath();
//           ctx.fill();
//         } else {
//           ctx.beginPath();
//           ctx.arc(0, 0, p.size * 0.65, 0, Math.PI * 2);
//           ctx.fill();
//         }

//         // Delicate specular flash on gold/white micro-sparkles
//         if (twinkle > 0.93 && (p.color === '#ffd166' || p.color === '#f8fafc')) {
//           ctx.strokeStyle = '#ffffff';
//           ctx.lineWidth = 0.6;
//           ctx.beginPath();
//           ctx.moveTo(-p.size * 1.6, 0);
//           ctx.lineTo(p.size * 1.6, 0);
//           ctx.moveTo(0, -p.size * 1.6);
//           ctx.lineTo(0, p.size * 1.6);
//           ctx.stroke();
//         }

//         ctx.restore();
//       }

//       animFrameRef.current = requestAnimationFrame(render);
//     };

//     animFrameRef.current = requestAnimationFrame(render);

//     return () => {
//       window.removeEventListener('resize', resizeCanvas);
//       if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
//     };
//   }, [initParticles]);

//   // Pointer (Mouse + Touch) handlers for tap and swipe dispersion
//   const getRelativeCoords = (e) => {
//     const rect = canvasRef.current.getBoundingClientRect();
//     const clientX = e.touches ? e.touches[0].clientX : e.clientX;
//     const clientY = e.touches ? e.touches[0].clientY : e.clientY;
//     return {
//       x: clientX - rect.left,
//       y: clientY - rect.top,
//     };
//   };

//   const handlePointerDown = (e) => {
//     if (isRevealedRef.current) return;
//     isPointerDownRef.current = true;
//     const coords = getRelativeCoords(e);
//     lastPointerRef.current = coords;
//     // Tap burst
//     disperseAt(coords.x, coords.y, 105, 16);
//   };

//   const handlePointerMove = (e) => {
//     if (!isPointerDownRef.current || isRevealedRef.current) return;
//     const coords = getRelativeCoords(e);
//     const dx = coords.x - lastPointerRef.current.x;
//     const dy = coords.y - lastPointerRef.current.y;
//     const dist = Math.hypot(dx, dy);

//     // Interpolate along fast swipes so there are no gaps
//     const steps = Math.max(1, Math.floor(dist / 12));
//     for (let s = 1; s <= steps; s++) {
//       const ix = lastPointerRef.current.x + (dx * s) / steps;
//       const iy = lastPointerRef.current.y + (dy * s) / steps;
//       disperseAt(ix, iy, 85, 13);
//     }
//     lastPointerRef.current = coords;
//   };

//   const handlePointerUp = () => {
//     isPointerDownRef.current = false;
//   };

//   // Microphone Blow Detection using Web Audio API
//   const toggleMicrophoneBlow = async () => {
//     setMicError('');
//     if (micActive) {
//       stopMicrophone();
//       return;
//     }

//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//       micStreamRef.current = stream;
//       const AudioCtx = window.AudioContext || window.webkitAudioContext;
//       const audioCtx = new AudioCtx();
//       audioContextRef.current = audioCtx;

//       const source = audioCtx.createMediaStreamSource(stream);
//       const analyser = audioCtx.createAnalyser();
//       analyser.fftSize = 256;
//       source.connect(analyser);

//       const dataArray = new Uint8Array(analyser.frequencyBinCount);
//       setMicActive(true);

//       const detectBlow = () => {
//         if (!micStreamRef.current) return;
//         analyser.getByteFrequencyData(dataArray);

//         // Low-mid frequencies capture wind/blow noise across the mic capsule
//         let sum = 0;
//         const bins = 24;
//         for (let i = 0; i < bins; i++) {
//           sum += dataArray[i];
//         }
//         const avgVolume = sum / bins;

//         // Threshold for blowing into phone/laptop mic
//         if (avgVolume > 62 && !isRevealedRef.current) {
//           const intensity = Math.min(2, (avgVolume - 55) / 35);
//           triggerBlowGust(intensity);
//         }

//         micAnimRef.current = requestAnimationFrame(detectBlow);
//       };

//       micAnimRef.current = requestAnimationFrame(detectBlow);
//     } catch (err) {
//       setMicError('Mic access denied — tap or swipe the glitter!');
//       setMicActive(false);
//     }
//   };

//   const stopMicrophone = () => {
//     if (micAnimRef.current) cancelAnimationFrame(micAnimRef.current);
//     if (micStreamRef.current) {
//       micStreamRef.current.getTracks().forEach((t) => t.stop());
//       micStreamRef.current = null;
//     }
//     if (audioContextRef.current) {
//       audioContextRef.current.close().catch(() => {});
//       audioContextRef.current = null;
//     }
//     setMicActive(false);
//   };

//   useEffect(() => {
//     return () => stopMicrophone();
//   }, []);

//   // Reset / Replay Glitter Transition
//   const handleReplay = () => {
//     isRevealedRef.current = false;
//     setIsFullyRevealed(false);
//     setRevealProgress(0);
//     setRsvpSubmitted(false);
//     if (containerRef.current) {
//       const rect = containerRef.current.getBoundingClientRect();
//       initParticles(rect.width, rect.height);
//     }
//   };

//   // Curtain opening percentage driven by glitter dispersion
//   const curtainOpenPercent = isFullyRevealed
//     ? 68
//     : Math.min(55, Math.round(revealProgress * 95));

//   return (
//     <div className="min-h-screen w-full bg-[#04091a] flex flex-col items-center justify-center p-3 sm:p-6 select-none overflow-hidden relative">
//       {/* Ambient royal blue theater glow behind the invitation card */}
//       <div
//         className="pointer-events-none absolute inset-0 opacity-80"
//         style={{
//           background:
//             'radial-gradient(circle at 50% 45%, rgba(29, 78, 216, 0.42) 0%, rgba(10, 25, 68, 0.88) 55%, rgba(3, 7, 18, 1) 100%)',
//         }}
//       />

//       {/* Mobile-First Vertical Invitation Stage Card */}
//       <div
//         ref={containerRef}
//         className="relative w-full max-w-[410px] aspect-[9/16] max-h-[82vh] rounded-[32px] overflow-hidden shadow-[0_25px_70px_rgba(0,0,0,0.92),0_0_40px_rgba(37,99,235,0.35)] border-[2px] border-[#d4af37]/50 bg-[#071330]"
//       >
//         {/* LAYER 1: Inner Royal Blue & Gold Stage Content */}
//         <div
//           className="absolute inset-0 flex flex-col items-center justify-between px-6 py-10 text-center"
//           style={{
//             background:
//               'radial-gradient(ellipse at 50% 25%, #163680 0%, #09183d 65%, #040b1f 100%)',
//           }}
//         >
//           {/* Warm theatrical spotlight beam from top */}
//           <div
//             className="pointer-events-none absolute inset-0 opacity-50"
//             style={{
//               background:
//                 'conic-gradient(from 162deg at 50% -8%, transparent 0deg, rgba(255, 224, 155, 0.24) 18deg, transparent 36deg)',
//             }}
//           />

//           {/* Decorative Double Gold Inner Frame */}
//           <div className="pointer-events-none absolute inset-3 rounded-[22px] border border-[#f3d078]/40" />
//           <div className="pointer-events-none absolute inset-4 rounded-[18px] border border-[#f3d078]/20" />

//           {/* Top Invitation Header */}
//           <div
//             className={`relative z-10 mt-3 transition-all duration-1000 ${
//               isFullyRevealed || revealProgress > 0.25
//                 ? 'opacity-100 translate-y-0'
//                 : 'opacity-40 translate-y-2'
//             }`}
//           >
//             <p
//               className="text-[11px] sm:text-xs tracking-[0.26em] uppercase text-[#f6dfa4]"
//               style={{ fontFamily: "'Cinzel', serif" }}
//             >
//               {inviteDetails.topLine}
//             </p>
//             <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[#f3d078] to-transparent mx-auto mt-2.5" />
//           </div>

//           {/* Center Couple Names & Monogram Emblem */}
//           <div
//             className={`relative z-10 flex flex-col items-center my-auto transition-all duration-1000 ${
//               isFullyRevealed || revealProgress > 0.25
//                 ? 'opacity-100 scale-100'
//                 : 'opacity-40 scale-95'
//             }`}
//           >
//             <h1
//               className="text-5xl sm:text-6xl text-[#fff6e0] drop-shadow-[0_2px_12px_rgba(255,209,102,0.45)] leading-tight"
//               style={{ fontFamily: "'Great Vibes', cursive" }}
//             >
//               {inviteDetails.bride}
//             </h1>

//             <span
//               className="text-2xl sm:text-3xl text-[#f3d078] my-0.5"
//               style={{ fontFamily: "'Great Vibes', cursive" }}
//             >
//               &
//             </span>

//             <h1
//               className="text-5xl sm:text-6xl text-[#fff6e0] drop-shadow-[0_2px_12px_rgba(255,209,102,0.45)] leading-tight"
//               style={{ fontFamily: "'Great Vibes', cursive" }}
//             >
//               {inviteDetails.groom}
//             </h1>

//             <p
//               className="mt-4 text-sm sm:text-base italic text-[#f8e6be]/90 max-w-[240px]"
//               style={{ fontFamily: "'Cormorant Garamond', serif" }}
//             >
//               {inviteDetails.subtitle}
//             </p>

//             {/* Ornamental Divider */}
//             <div className="flex items-center gap-2 my-4 text-[#f3d078]">
//               <span className="w-10 h-[1px] bg-[#f3d078]/50" />
//               <Heart className="w-3.5 h-3.5 fill-[#f3d078]" />
//               <span className="w-10 h-[1px] bg-[#f3d078]/50" />
//             </div>

//             {/* Date & Venue Details */}
//             <div className="space-y-1.5 text-[#fff4d9]">
//               <div
//                 className="flex items-center justify-center gap-1.5 text-base sm:text-lg font-semibold tracking-[0.2em]"
//                 style={{ fontFamily: "'Cinzel', serif" }}
//               >
//                 <Calendar className="w-4 h-4 text-[#f3d078]" />
//                 <span>{inviteDetails.date}</span>
//               </div>
//               <p
//                 className="text-[11px] tracking-[0.22em] text-[#f3d078]/90 uppercase"
//                 style={{ fontFamily: "'Cinzel', serif" }}
//               >
//                 {inviteDetails.time}
//               </p>
//               <div
//                 className="flex items-center justify-center gap-1.5 pt-1 text-sm sm:text-base text-[#f8e6be]"
//                 style={{ fontFamily: "'Cormorant Garamond', serif" }}
//               >
//                 <MapPin className="w-4 h-4 text-[#f3d078] shrink-0" />
//                 <span>{inviteDetails.venue}</span>
//               </div>
//             </div>
//           </div>

//           {/* Bottom Interactive RSVP Action */}
//           <div className="relative z-10 w-full mb-1">
//             {rsvpSubmitted ? (
//               <div
//                 className="py-2.5 px-5 rounded-full bg-[#f3d078]/20 border border-[#f3d078] text-[#fff6e0] text-xs tracking-[0.18em] uppercase"
//                 style={{ fontFamily: "'Cinzel', serif" }}
//               >
//                 ✨ We look forward to celebrating with you!
//               </div>
//             ) : (
//               <button
//                 type="button"
//                 onClick={() => setRsvpSubmitted(true)}
//                 className="w-4/5 py-3 px-6 rounded-full bg-gradient-to-r from-[#c8963e] via-[#f3d078] to-[#c8963e] text-[#071330] font-bold text-xs tracking-[0.22em] uppercase shadow-[0_6px_24px_rgba(243,208,120,0.4)] hover:brightness-110 active:scale-95 transition-all cursor-pointer"
//                 style={{ fontFamily: "'Cinzel', serif" }}
//               >
//                 RSVP Now
//               </button>
//             )}
//           </div>
//         </div>

//         {/* LAYER 2: Royal Blue Velvet Stage Curtains (Part outward as glitter clears) */}
//         <div className="pointer-events-none absolute inset-0 z-20 flex overflow-hidden">
//           {/* Left Velvet Curtain */}
//           <div
//             className="h-full w-1/2 transition-transform duration-700 ease-out relative"
//             style={{
//               transform: `translateX(-${curtainOpenPercent}%)`,
//               background:
//                 'repeating-linear-gradient(90deg, #071436 0px, #17347a 14px, #050e26 28px, #132c69 42px)',
//               boxShadow: 'inset -12px 0 24px rgba(0,0,0,0.75), 6px 0 20px rgba(0,0,0,0.65)',
//             }}
//           >
//             {/* Golden inner curtain trim */}
//             <div className="absolute top-0 right-0 bottom-0 w-[3px] bg-gradient-to-b from-[#f3d078] via-[#b8860b] to-[#f3d078] opacity-85" />
//           </div>

//           {/* Right Velvet Curtain */}
//           <div
//             className="h-full w-1/2 transition-transform duration-700 ease-out relative"
//             style={{
//               transform: `translateX(${curtainOpenPercent}%)`,
//               background:
//                 'repeating-linear-gradient(90deg, #132c69 0px, #050e26 14px, #17347a 28px, #071436 42px)',
//               boxShadow: 'inset 12px 0 24px rgba(0,0,0,0.75), -6px 0 20px rgba(0,0,0,0.65)',
//             }}
//           >
//             {/* Golden inner curtain trim */}
//             <div className="absolute top-0 left-0 bottom-0 w-[3px] bg-gradient-to-b from-[#f3d078] via-[#b8860b] to-[#f3d078] opacity-85" />
//           </div>
//         </div>

//         {/* LAYER 3: Interactive Micro-Glitter Particle Canvas */}
//         <canvas
//           ref={canvasRef}
//           onMouseDown={handlePointerDown}
//           onMouseMove={handlePointerMove}
//           onMouseUp={handlePointerUp}
//           onMouseLeave={handlePointerUp}
//           onTouchStart={handlePointerDown}
//           onTouchMove={handlePointerMove}
//           onTouchEnd={handlePointerUp}
//           className={`absolute inset-0 z-30 w-full h-full touch-none ${
//             isFullyRevealed ? 'pointer-events-none' : 'cursor-pointer'
//           }`}
//         />

//         {/* LAYER 4: Floating Prompt Overlay */}
//         <div
//           className={`pointer-events-none absolute inset-0 z-40 flex flex-col items-center justify-between py-12 px-6 text-center transition-opacity duration-500 ${
//             revealProgress > 0.14 || isFullyRevealed ? 'opacity-0' : 'opacity-100'
//           }`}
//         >
//           <div className="mt-2 bg-[#040b1f]/45 backdrop-blur-[2px] px-4 py-1.5 rounded-full border border-white/15">
//             <p
//               className="text-xs sm:text-sm text-[#fff6e5] tracking-wide font-medium drop-shadow"
//               style={{ fontFamily: "'Cormorant Garamond', serif" }}
//             >
//               An invitation is hiding under the glitter!
//             </p>
//           </div>

//           <div className="my-auto flex flex-col items-center animate-pulse">
//             <Sparkles className="w-6 h-6 text-[#ffd166] mb-1.5 drop-shadow-[0_0_8px_rgba(255,209,102,0.8)]" />
//             <h2
//               className="text-4xl sm:text-5xl text-white drop-shadow-[0_3px_14px_rgba(0,0,0,0.9)]"
//               style={{ fontFamily: "'Great Vibes', cursive" }}
//             >
//               Blow on the glitter
//             </h2>
//             <p
//               className="text-xs sm:text-sm text-[#ffe8b3] tracking-widest uppercase mt-1 drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)]"
//               style={{ fontFamily: "'Cormorant Garamond', serif" }}
//             >
//               or simply tap & swipe
//             </p>
//           </div>

//           <div className="h-4" />
//         </div>
//       </div>

//       {/* Bottom Interactive Controls (Blow Mic, Simulate Blow Gust, Replay Glitter) */}
//       <div className="relative z-50 mt-4 flex flex-wrap items-center justify-center gap-2.5 max-w-[420px]">
//         {!isFullyRevealed && (
//           <>
//             <button
//               type="button"
//               onClick={toggleMicrophoneBlow}
//               className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium tracking-wider uppercase border transition-all cursor-pointer ${
//                 micActive
//                   ? 'bg-[#1d4ed8] text-white border-[#ffd166] shadow-[0_0_16px_rgba(37,99,235,0.8)]'
//                   : 'bg-white/10 text-[#f8e6be] border-white/20 hover:bg-white/20'
//               }`}
//             >
//               {micActive ? <Mic className="w-3.5 h-3.5 animate-bounce" /> : <MicOff className="w-3.5 h-3.5" />}
//               <span>{micActive ? 'Listening... Blow!' : 'Enable Mic Blow'}</span>
//             </button>

//             <button
//               type="button"
//               onClick={() => triggerBlowGust(1.3)}
//               className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium tracking-wider uppercase bg-[#f3d078]/15 text-[#f3d078] border border-[#f3d078]/40 hover:bg-[#f3d078]/25 active:scale-95 transition-all cursor-pointer"
//             >
//               <Sparkles className="w-3.5 h-3.5" />
//               <span>Blow Gust</span>
//             </button>
//           </>
//         )}

//         <button
//           type="button"
//           onClick={handleReplay}
//           className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium tracking-wider uppercase bg-white/10 text-white/90 border border-white/20 hover:bg-white/20 active:scale-95 transition-all cursor-pointer"
//         >
//           <RotateCcw className="w-3.5 h-3.5" />
//           <span>Replay Glitter</span>
//         </button>
//       </div>

//       {micError && (
//         <p className="relative z-50 mt-2 text-xs text-[#ffd166] text-center">{micError}</p>
//       )}
//     </div>
//   );
// }
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Mic, MicOff, RotateCcw, Sparkles, Volume2, VolumeX, Square } from 'lucide-react';
import WeddingLogo from '../assets/Images/Wedding logo.webp';
import Weddingaudio from '../assets/audio/Weddingaudio.mp3';

/**
- Page1 - Interactive Royal Blue Glitter Reveal Wedding Invitation
- With Logo Photo + Simple Name Reveal + Background Audio
 */
export default function Page1() {
  const [inviteDetails] = useState({
    logoSrc: WeddingLogo,
    logoAlt: 'Wedding Crest Logo',
    bride: 'Aditi',
    groom: 'Somya',
    audioSrc: Weddingaudio,
  });

  // Reveal & interaction states
  const [revealProgress, setRevealProgress] = useState(0); // 0 to 1
  const [isFullyRevealed, setIsFullyRevealed] = useState(false);
  const [micActive, setMicActive] = useState(false);
  const [micError, setMicError] = useState('');
  const [logoLoadError, setLogoLoadError] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

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
  const audioRef = useRef(null);

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

  // Audio playback helpers
  const startAudioOnInteraction = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || !audio.paused) return;
    audio.volume = 0.45;
    audio
      .play()
      .then(() => setIsMusicPlaying(true))
      .catch(() => {});
  }, []);

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.volume = 0.45;
      audio
        .play()
        .then(() => setIsMusicPlaying(true))
        .catch(() => {});
    } else {
      audio.pause();
      setIsMusicPlaying(false);
    }
  };

  const stopMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    audio.currentTime = 0;
    setIsMusicPlaying(false);
  };

  // Color palette for rich royal blue, sapphire, cobalt, champagne-gold, and white sparkles
  const GLITTER_COLORS = [
    '#1e40af', // Classic Royal Blue
    '#1d4ed8', // Vibrant Sapphire
    '#0a2463', // Deep Imperial Blue
    '#3b82f6', // Royal Azure shimmer
    '#0f172a', // Midnight Navy velvet
    '#ffd166', // Warm champagne gold
    '#ffffff', // Specular white glint
  ];

  // Initialize dense fine micro-glitter particles filling the card
  const initParticles = useCallback((width, height) => {
    const particles = [];
    const spacing = width < 400 ? 5 : 6;
    const cols = Math.ceil(width / spacing);
    const rows = Math.ceil(height / spacing);

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const jitterX = (Math.random() - 0.5) * spacing * 1.4;
        const jitterY = (Math.random() - 0.5) * spacing * 1.4;
        const x = c * spacing + jitterX;
        const y = r * spacing + jitterY;

        const isGoldOrWhite = Math.random() > 0.84;
        const color = isGoldOrWhite
          ? Math.random() > 0.45
            ? '#ffd166'
            : '#f8fafc'
          : GLITTER_COLORS[Math.floor(Math.random() * 5)];

        particles.push({
          x,
          y,
          originX: x,
          originY: y,
          vx: 0,
          vy: 0,
          size: isGoldOrWhite ? Math.random() * 1.1 + 0.7 : Math.random() * 1.6 + 1.1,
          color,
          alpha: 1,
          shimmerPhase: Math.random() * Math.PI * 2,
          shimmerSpeed: 0.05 + Math.random() * 0.09,
          rotation: Math.random() * Math.PI * 2,
          rotSpeed: (Math.random() - 0.5) * 0.18,
          dispersed: false,
          shape: Math.random() > 0.4 ? 'diamond' : 'circle',
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
        p.vy += Math.sin(angle) * impulse - 1.5;
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
  const triggerBlowGust = useCallback(
    (intensity = 1) => {
      startAudioOnInteraction();
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const centerX = rect.width * (0.3 + Math.random() * 0.4);
      const centerY = rect.height * (0.35 + Math.random() * 0.3);

      disperseAt(centerX, centerY, Math.max(rect.width, rect.height) * 0.55, 16 * intensity);
    },
    [disperseAt, startAudioOnInteraction]
  );

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

      const activeParticles = particlesRef.current;
      let remainingAlphaSum = 0;

      for (let i = 0; i < activeParticles.length; i++) {
        const p = activeParticles[i];
        if (!p.dispersed) remainingAlphaSum += 1;
      }
      const coverage = activeParticles.length ? remainingAlphaSum / activeParticles.length : 0;

      if (coverage > 0.02) {
        ctx.fillStyle = `rgba(6, 18, 52, ${Math.min(0.94, coverage * 0.97)})`;
        ctx.fillRect(0, 0, rect.width, rect.height);
      }

      for (let i = 0; i < activeParticles.length; i++) {
        const p = activeParticles[i];
        if (p.alpha <= 0.01) continue;

        p.shimmerPhase += p.shimmerSpeed;
        const twinkle = 0.55 + 0.45 * Math.sin(p.shimmerPhase);

        if (p.dispersed) {
          p.x += p.vx;
          p.y += p.vy;
          p.vy += 0.22;
          p.vx *= 0.97;
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

        if (twinkle > 0.93 && (p.color === '#ffd166' || p.color === '#f8fafc')) {
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 0.6;
          ctx.beginPath();
          ctx.moveTo(-p.size * 1.6, 0);
          ctx.lineTo(p.size * 1.6, 0);
          ctx.moveTo(0, -p.size * 1.6);
          ctx.lineTo(0, p.size * 1.6);
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
    startAudioOnInteraction();
    if (isRevealedRef.current) return;
    isPointerDownRef.current = true;
    const coords = getRelativeCoords(e);
    lastPointerRef.current = coords;
    disperseAt(coords.x, coords.y, 105, 16);
  };

  const handlePointerMove = (e) => {
    if (!isPointerDownRef.current || isRevealedRef.current) return;
    const coords = getRelativeCoords(e);
    const dx = coords.x - lastPointerRef.current.x;
    const dy = coords.y - lastPointerRef.current.y;
    const dist = Math.hypot(dx, dy);

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
    startAudioOnInteraction();
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

        let sum = 0;
        const bins = 24;
        for (let i = 0; i < bins; i++) {
          sum += dataArray[i];
        }
        const avgVolume = sum / bins;

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
    <div className="min-h-screen w-full bg-[#04091a] flex flex-col items-center justify-center p-3 sm:p-6 select-none overflow-hidden relative">
      {/* Equalizer bar animation for active song state */}
      <style>{`
        @keyframes eqBounce {
          0%, 100% { transform: scaleY(0.35); }
          50% { transform: scaleY(1); }
        }
        .eq-bar-1 { animation: eqBounce 0.7s ease-in-out infinite; }
        .eq-bar-2 { animation: eqBounce 0.55s ease-in-out 0.15s infinite; }
        .eq-bar-3 { animation: eqBounce 0.8s ease-in-out 0.3s infinite; }
      `}</style>

      {/* Background Wedding Audio */}
      <audio
        ref={audioRef}
        src={inviteDetails.audioSrc}
        loop
        preload="auto"
        onPlay={() => setIsMusicPlaying(true)}
        onPause={() => setIsMusicPlaying(false)}
      />

      {/* Ambient royal blue theater glow behind the card */}
      <div
        className="pointer-events-none absolute inset-0 opacity-80"
        style={{
          background:
            'radial-gradient(circle at 50% 45%, rgba(29, 78, 216, 0.42) 0%, rgba(10, 25, 68, 0.88) 55%, rgba(3, 7, 18, 1) 100%)',
        }}
      />

      {/* Mobile-First Vertical Stage Card */}
      <div
        ref={containerRef}
        className="relative w-full max-w-[410px] aspect-[9/16] max-h-[82vh] rounded-[32px] overflow-hidden shadow-[0_25px_70px_rgba(0,0,0,0.92),0_0_40px_rgba(37,99,235,0.35)] border-[2px] border-[#d4af37]/50 bg-[#071330]"
      >
        {/* LAYER 1: Simple Logo Photo + Name Stage */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center px-6 py-10 text-center"
          style={{
            background:
              'radial-gradient(ellipse at 50% 35%, #163680 0%, #09183d 65%, #040b1f 100%)',
          }}
        >
          {/* Warm theatrical spotlight beam from top */}
          <div
            className="pointer-events-none absolute inset-0 opacity-50"
            style={{
              background:
                'conic-gradient(from 162deg at 50% -8%, transparent 0deg, rgba(255, 224, 155, 0.24) 18deg, transparent 36deg)',
            }}
          />

          {/* Decorative Double Gold Inner Frame */}
          <div className="pointer-events-none absolute inset-3 rounded-[22px] border border-[#f3d078]/40" />
          <div className="pointer-events-none absolute inset-4 rounded-[18px] border border-[#f3d078]/20" />

          {/* Center Logo Photo & Name Only */}
          <div
            className={`relative z-10 flex flex-col items-center justify-center gap-6 transition-all duration-1000 ${
              isFullyRevealed || revealProgress > 0.25
                ? 'opacity-100 scale-100'
                : 'opacity-40 scale-95'
            }`}
          >
            {inviteDetails.logoSrc && !logoLoadError ? (
              <div className="w-36 h-36 sm:w-40 sm:h-40 rounded-2xl p-2 bg-[#050e26]/70 border border-[#f3d078]/50 shadow-[0_10px_30px_rgba(0,0,0,0.55)] flex items-center justify-center overflow-hidden">
                <img
                  src={inviteDetails.logoSrc}
                  alt={inviteDetails.logoAlt}
                  onError={() => setLogoLoadError(true)}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            ) : (
              <div className="w-28 h-28 rounded-full border border-[#f3d078]/60 bg-[#050e26]/70 flex items-center justify-center text-[#f3d078] text-xs tracking-widest uppercase">
                Logo
              </div>
            )}

            <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-[#f3d078] to-transparent" />

            <div className="flex flex-col items-center leading-tight">
              <h1
                className="text-4xl sm:text-5xl text-[#fff6e0] drop-shadow-[0_2px_12px_rgba(255,209,102,0.45)]"
                style={{ fontFamily: "'Great Vibes', cursive" }}
              >
                {inviteDetails.bride}
              </h1>

              <span
                className="text-2xl sm:text-3xl text-[#f3d078] my-1"
                style={{ fontFamily: "'Great Vibes', cursive" }}
              >
                &
              </span>

              <h1
                className="text-4xl sm:text-5xl text-[#fff6e0] drop-shadow-[0_2px_12px_rgba(255,209,102,0.45)]"
                style={{ fontFamily: "'Great Vibes', cursive" }}
              >
                {inviteDetails.groom}
              </h1>
            </div>
          </div>
        </div>

        {/* LAYER 2: Royal Blue Velvet Stage Curtains */}
        <div className="pointer-events-none absolute inset-0 z-20 flex overflow-hidden">
          <div
            className="h-full w-1/2 transition-transform duration-700 ease-out relative"
            style={{
              transform: `translateX(-${curtainOpenPercent}%)`,
              background:
                'repeating-linear-gradient(90deg, #071436 0px, #17347a 14px, #050e26 28px, #132c69 42px)',
              boxShadow: 'inset -12px 0 24px rgba(0,0,0,0.75), 6px 0 20px rgba(0,0,0,0.65)',
            }}
          >
            <div className="absolute top-0 right-0 bottom-0 w-[3px] bg-gradient-to-b from-[#f3d078] via-[#b8860b] to-[#f3d078] opacity-85" />
          </div>

          <div
            className="h-full w-1/2 transition-transform duration-700 ease-out relative"
            style={{
              transform: `translateX(${curtainOpenPercent}%)`,
              background:
                'repeating-linear-gradient(90deg, #132c69 0px, #050e26 14px, #17347a 28px, #071436 42px)',
              boxShadow: 'inset 12px 0 24px rgba(0,0,0,0.75), -6px 0 20px rgba(0,0,0,0.65)',
            }}
          >
            <div className="absolute top-0 left-0 bottom-0 w-[3px] bg-gradient-to-b from-[#f3d078] via-[#b8860b] to-[#f3d078] opacity-85" />
          </div>
        </div>

        {/* LAYER 3: Interactive Micro-Glitter Particle Canvas */}
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

        {/* LAYER 4: Floating Prompt Overlay */}
        <div
          className={`pointer-events-none absolute inset-0 z-40 flex flex-col items-center justify-between py-12 px-6 text-center transition-opacity duration-500 ${
            revealProgress > 0.14 || isFullyRevealed ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <div className="mt-2 bg-[#040b1f]/45 backdrop-blur-[2px] px-4 py-1.5 rounded-full border border-white/15">
            <p
              className="text-xs sm:text-sm text-[#fff6e5] tracking-wide font-medium drop-shadow"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Something special is under the glitter!
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
              or simply tap & swipe
            </p>
          </div>

          <div className="h-4" />
        </div>
      </div>

      {/* Bottom Interactive Controls */}
      <div className="relative z-50 mt-4 flex flex-wrap items-center justify-center gap-2.5 max-w-[460px]">
        {!isFullyRevealed && (
          <>
            <button
              type="button"
              onClick={toggleMicrophoneBlow}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium tracking-wider uppercase border transition-all cursor-pointer ${
                micActive
                  ? 'bg-[#1d4ed8] text-white border-[#ffd166] shadow-[0_0_16px_rgba(37,99,235,0.8)]'
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

        {/* Play / Pause Button with Active Playing Icon & Equalizer */}
        <button
          type="button"
          onClick={toggleMusic}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium tracking-wider uppercase border active:scale-95 transition-all cursor-pointer ${
            isMusicPlaying
              ? 'bg-[#f3d078]/25 text-[#fff6e0] border-[#ffd166] shadow-[0_0_14px_rgba(243,208,120,0.35)]'
              : 'bg-[#f3d078]/15 text-[#f8e6be] border-[#f3d078]/35 hover:bg-[#f3d078]/25'
          }`}
        >
          {isMusicPlaying ? (
            <>
              <Volume2 className="w-3.5 h-3.5 text-[#ffd166]" />
              <span className="flex items-end gap-[2px] h-3 w-3 justify-center">
                <span className="w-[2px] h-full bg-[#ffd166] rounded-full eq-bar-1 origin-bottom" />
                <span className="w-[2px] h-full bg-[#ffd166] rounded-full eq-bar-2 origin-bottom" />
                <span className="w-[2px] h-full bg-[#ffd166] rounded-full eq-bar-3 origin-bottom" />
              </span>
              <span>Playing</span>
            </>
          ) : (
            <>
              <VolumeX className="w-3.5 h-3.5" />
              <span>Play Music</span>
            </>
          )}
        </button>

        {/* Stop Button */}
        <button
          type="button"
          onClick={stopMusic}
          title="Stop Music"
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-medium tracking-wider uppercase bg-white/10 text-[#f8e6be] border border-white/20 hover:bg-white/20 active:scale-95 transition-all cursor-pointer"
        >
          <Square className="w-3 h-3 fill-current text-[#f3d078]" />
          <span>Stop</span>
        </button>

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