import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Sparkles, Volume2, VolumeX } from 'lucide-react';
import WeddingLogo from '../assets/Images/Wedding logo.webp';
import Weddingaudio from '../assets/audio/Weddingaudio.mp3';

/**
- Page1 - Interactive Royal Blue Glitter Scratch Reveal Wedding Invitation
- - Locks scroll / next sections until matter is fully revealed
- - Keeps revealed matter clear with non-blocking sparkles (never re-covers with glitter veil)
- - Auto-plays music and turns off when user clicks the side circle icon
 */
export default function Page1({ onRevealComplete }) {
  const [inviteDetails] = useState({
    logoSrc: WeddingLogo,
    logoAlt: 'Wedding Crest Logo',
    bride: 'Aditi',
    groom: 'Somya',
    dateText: '14 December 2026',
    audioSrc: Weddingaudio,
  });

  const [revealProgress, setRevealProgress] = useState(0);
  const [isFullyRevealed, setIsFullyRevealed] = useState(false);
  const [logoLoadError, setLogoLoadError] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animFrameRef = useRef(null);
  const isPointerDownRef = useRef(false);
  const lastPointerRef = useRef({ x: 0, y: 0 });
  const isRevealedRef = useRef(false);
  const audioRef = useRef(null);
  const manuallyPausedRef = useRef(false);

  // Inject luxury serif & script Google Fonts
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

  // Lock page scrolling until Page1 matter is completely revealed
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    if (!isFullyRevealed) {
      document.body.style.overflow = 'hidden';
      window.scrollTo(0, 0);
    } else {
      document.body.style.overflow = prevOverflow || '';
      if (typeof onRevealComplete === 'function') {
        onRevealComplete();
      }
    }

    return () => {
      document.body.style.overflow = prevOverflow || '';
    };
  }, [isFullyRevealed, onRevealComplete]);

  // Auto-play music on load and first interaction unless user turns it off
  const ensureMusicPlaying = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || manuallyPausedRef.current) return;
    audio.volume = 0.45;
    if (audio.paused) {
      audio
        .play()
        .then(() => setIsMusicPlaying(true))
        .catch(() => setIsMusicPlaying(false));
    } else {
      setIsMusicPlaying(true);
    }
  }, []);

  useEffect(() => {
    ensureMusicPlaying();

    const handleFirstUserGesture = () => {
      ensureMusicPlaying();
    };

    window.addEventListener('pointerdown', handleFirstUserGesture, { passive: true });
    window.addEventListener('touchstart', handleFirstUserGesture, { passive: true });
    window.addEventListener('keydown', handleFirstUserGesture, { passive: true });

    return () => {
      window.removeEventListener('pointerdown', handleFirstUserGesture);
      window.removeEventListener('touchstart', handleFirstUserGesture);
      window.removeEventListener('keydown', handleFirstUserGesture);
    };
  }, [ensureMusicPlaying]);

  const toggleCircleMusic = (e) => {
    e.stopPropagation();
    const audio = audioRef.current;
    if (!audio) return;

    if (!audio.paused) {
      manuallyPausedRef.current = true;
      audio.pause();
      setIsMusicPlaying(false);
    } else {
      manuallyPausedRef.current = false;
      ensureMusicPlaying();
    }
  };

  const GLITTER_COLORS = [
    '#1e40af',
    '#1d4ed8',
    '#0a2463',
    '#3b82f6',
    '#0f172a',
    '#ffd166',
    '#ffffff',
  ];

  const initParticles = useCallback((width, height) => {
    if (isRevealedRef.current) return;
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

  const updateRevealRatio = useCallback(() => {
    if (isRevealedRef.current) return;
    const particles = particlesRef.current;
    if (!particles.length) return;

    let count = 0;
    for (let i = 0; i < particles.length; i++) {
      if (particles[i].dispersed) count++;
    }
    const ratio = count / particles.length;
    setRevealProgress(ratio);

    if (ratio >= 0.45) {
      isRevealedRef.current = true;
      setRevealProgress(1);
      setIsFullyRevealed(true);
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        if (!p.dispersed) {
          p.dispersed = true;
          const angle = Math.random() * Math.PI * 2;
          const speed = 3.5 + Math.random() * 9;
          p.vx = Math.cos(angle) * speed;
          p.vy = Math.sin(angle) * speed - 2;
        }
      }
    }
  }, []);

  const disperseAt = useCallback(
    (x, y, radius = 95, force = 14) => {
      if (isRevealedRef.current) return;
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
    },
    [updateRevealRatio]
  );

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
      if (!isRevealedRef.current) {
        initParticles(rect.width, rect.height);
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const render = () => {
      const rect = container.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      const activeParticles = particlesRef.current;
      let undispersedCount = 0;

      for (let i = 0; i < activeParticles.length; i++) {
        if (!activeParticles[i].dispersed) undispersedCount++;
      }

      const coverage =
        !isRevealedRef.current && activeParticles.length
          ? undispersedCount / activeParticles.length
          : 0;

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
          p.alpha -= 0.022;
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
    ensureMusicPlaying();
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

  const curtainOpenPercent = isFullyRevealed
    ? 68
    : Math.min(55, Math.round(revealProgress * 95));

  return (
    <div className="min-h-screen w-full bg-[#04091a] flex flex-col items-center justify-center p-3 sm:p-6 select-none overflow-hidden relative">
      <style>{`
        @keyframes matterSparkle {
          0%, 100% {
            opacity: 0.25;
            transform: scale(0.8);
          }
          50% {
            opacity: 0.95;
            transform: scale(1.2);
          }
        }
        .matter-sparkle-dot {
          animation: matterSparkle 2.4s ease-in-out infinite;
        }
      `}</style>

      <audio
        ref={audioRef}
        src={inviteDetails.audioSrc}
        loop
        autoPlay
        preload="auto"
        onPlay={() => {
          if (!manuallyPausedRef.current) setIsMusicPlaying(true);
        }}
        onPause={() => setIsMusicPlaying(false)}
      />

      {/* Side Fixed Circular Music Toggle Icon */}
      <button
        type="button"
        onClick={toggleCircleMusic}
        aria-label={isMusicPlaying ? 'Turn music off' : 'Turn music on'}
        className={`fixed bottom-5 right-4 sm:right-6 z-50 w-10 h-10 rounded-full border flex items-center justify-center backdrop-blur-md shadow-[0_8px_22px_rgba(0,0,0,0.75)] active:scale-95 transition-all cursor-pointer ${
          isMusicPlaying
            ? 'bg-[#071330]/90 border-[#f3d078]/75 text-[#ffd166]'
            : 'bg-[#071330]/80 border-[#f3d078]/35 text-[#f8e6be]/70'
        }`}
      >
        {isMusicPlaying ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
      </button>

      <div
        className="pointer-events-none absolute inset-0 opacity-80"
        style={{
          background:
            'radial-gradient(circle at 50% 45%, rgba(29, 78, 216, 0.42) 0%, rgba(10, 25, 68, 0.88) 55%, rgba(3, 7, 18, 1) 100%)',
        }}
      />

      <div
        ref={containerRef}
        className="relative w-full max-w-[410px] aspect-[9/16] max-h-[85vh] rounded-[32px] overflow-hidden shadow-[0_25px_70px_rgba(0,0,0,0.92),0_0_40px_rgba(37,99,235,0.35)] border-[2px] border-[#d4af37]/50 bg-[#071330]"
      >
        {/* LAYER 1: Logo Photo + Name + Date Stage */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center px-6 py-10 text-center"
          style={{
            background:
              'radial-gradient(ellipse at 50% 35%, #163680 0%, #09183d 65%, #040b1f 100%)',
          }}
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-50"
            style={{
              background:
                'conic-gradient(from 162deg at 50% -8%, transparent 0deg, rgba(255, 224, 155, 0.24) 18deg, transparent 36deg)',
            }}
          />

          <div className="pointer-events-none absolute inset-3 rounded-[22px] border border-[#f3d078]/40" />
          <div className="pointer-events-none absolute inset-4 rounded-[18px] border border-[#f3d078]/20" />

          {/* Subtle non-blocking sparkles that stay over the matter after reveal */}
          {isFullyRevealed && (
            <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden">
              <span
                className="matter-sparkle-dot absolute top-[18%] left-[22%] w-1.5 h-1.5 rounded-full bg-[#ffd166] shadow-[0_0_8px_#ffd166]"
                style={{ animationDelay: '0s' }}
              />
              <span
                className="matter-sparkle-dot absolute top-[26%] right-[20%] w-2 h-2 rounded-full bg-[#fff6e0] shadow-[0_0_10px_#ffd166]"
                style={{ animationDelay: '0.6s' }}
              />
              <span
                className="matter-sparkle-dot absolute top-[52%] left-[16%] w-1.5 h-1.5 rounded-full bg-[#ffd166] shadow-[0_0_8px_#ffd166]"
                style={{ animationDelay: '1.1s' }}
              />
              <span
                className="matter-sparkle-dot absolute top-[64%] right-[18%] w-1.5 h-1.5 rounded-full bg-[#fff6e0] shadow-[0_0_8px_#ffd166]"
                style={{ animationDelay: '1.6s' }}
              />
              <span
                className="matter-sparkle-dot absolute bottom-[20%] left-[28%] w-2 h-2 rounded-full bg-[#ffd166] shadow-[0_0_10px_#ffd166]"
                style={{ animationDelay: '0.9s' }}
              />
            </div>
          )}

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

              <p
                className="mt-6 text-[18px] font-medium tracking-[0.28em] uppercase text-[#f3d078]/90"
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                {inviteDetails.dateText}
              </p>
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

        {/* LAYER 3: Interactive Scratch / Glitter Particle Canvas */}
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
            isFullyRevealed ? 'pointer-events-none opacity-0 transition-opacity duration-500' : 'cursor-pointer'
          }`}
        />

        {/* LAYER 4: Scratch Prompt Overlay */}
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
              Scratch the glitter
            </h2>
            <p
              className="text-xs sm:text-sm text-[#ffe8b3] tracking-widest uppercase mt-1 drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)]"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              tap & swipe to reveal
            </p>
          </div>

          <div className="h-4" />
        </div>
      </div>
    </div>
  );
}