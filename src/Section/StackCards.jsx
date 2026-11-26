import React, { useEffect, useRef, useState } from "react";
import { Sparkles, MapPin, Calendar } from "lucide-react";
import ganeshpooja from "../assets/Images/ganesh pooja.jpg";
import chakbhat from "../assets/Images/chak bhat.jpg";
import mehndi from "../assets/Images/mehndi.jpg";
import sagai from "../assets/Images/sagai.jpg";
import silverwedding from "../assets/Images/silver weding.jpg";
import mahilaSangeet from "../assets/Images/mahila sangeet.jpg";
import galandinner from "../assets/Images/galadinner.jpg";

const ANANTA_MAP_URL =
  "https://www.google.com/maps/search/?api=1&query=The+Ananta+Udaipur+Kodiyat+Road";

const COLORS = {
  bgDeep: "#04091a",
  cardNavy: "#071330",
  gold: "#f3d078",
  goldMuted: "rgba(243, 208, 120, 0.35)",
  goldFaint: "rgba(243, 208, 120, 0.14)",
  creamText: "#fff6e0",
  bodyMuted: "rgba(248, 230, 190, 0.85)",
  shadow: "rgba(0, 0, 0, 0.88)",
};

const DEFAULT_CARDS = [
  {
    id: 1,
    title: "Karnival",
    date: "Dec 13, 2026",
   
    description:
      "Morning turmeric blessings filled with laughter, marigold decor, and family warmth.",
    locationName: "The Ananta Hotel, Udaipur",
    mapUrl: ANANTA_MAP_URL,
    image: ganeshpooja,
  },
  {
    id: 2,
    title: "Engagement",
    date: "Dec 13, 2026",
  
    description:
      "Intricate henna designs, folk songs, vibrant colors, and joyful celebrations.",
    locationName: "The Ananta Hotel, Udaipur",
    mapUrl: ANANTA_MAP_URL,
    image: sagai,
  },
  {
    id: 3,
    title: "Mahila Sangeet",
    date: "Dec 13, 2026",
   
    description:
      "An evening of choreographed dances, music, lights, and unforgettable performances.",
    locationName: "The Ananta Hotel, Udaipur",
    mapUrl: ANANTA_MAP_URL,
    image: mahilaSangeet,
  },
  {
    id: 4,
    title: "Samela",
    date: "Dec 14, 2026",
    
    description:
      "A lively procession with dhol beats, dancing guests, and festive celebration.",
    locationName: "The Ananta Hotel, Udaipur",
    mapUrl: ANANTA_MAP_URL,
    image:
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: 5,
    title: "The Silver Wedding",
    date: "Dec 14, 2026",
    
    description:
      "Sacred vows around the holy fire surrounded by family blessings and tradition.",
    locationName: "The Ananta Hotel, Udaipur",
    mapUrl: ANANTA_MAP_URL,
    image: silverwedding,
  },
  {
    id: 6,
    title: "Gala Dinner",
    date: "Dec 14, 2026",
    
    description:
      "Sacred vows around the holy fire surrounded by family blessings and tradition.",
    locationName: "The Ananta Hotel, Udaipur",
    mapUrl: ANANTA_MAP_URL,
    image: galandinner,
  },
];

export default function StackCards({
  cards = DEFAULT_CARDS,
  speed = 0.00042,
  cardWidth = 268,
  cardHeight = 425,
  spacing = 290,
  arcDepth = 58,
  pauseOnHover = true,
  showDate = true,
}) {
  const count = cards.length;
  const progressRef = useRef((count - 1) / 2);
  const targetRef = useRef(null);
  const directionRef = useRef(1);
  const lastTimeRef = useRef(null);
  const rafRef = useRef(null);
  const isPausedRef = useRef(false);
  const dragStateRef = useRef({
    dragging: false,
    startX: 0,
    startProgress: 0,
  });

  const [tick, setTick] = useState(0);
  const [activeIndex, setActiveIndex] = useState(Math.floor((count - 1) / 2));

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

  useEffect(() => {
    if (!count) return;

    const minPos = 0;
    const maxPos = Math.max(0, count - 1);

    const animate = (timestamp) => {
      if (lastTimeRef.current == null) {
        lastTimeRef.current = timestamp;
      }
      const delta = timestamp - lastTimeRef.current;
      lastTimeRef.current = timestamp;

      if (targetRef.current !== null && !dragStateRef.current.dragging) {
        const diff = targetRef.current - progressRef.current;
        if (Math.abs(diff) < 0.008) {
          progressRef.current = targetRef.current;
          targetRef.current = null;
        } else {
          progressRef.current += diff * Math.min(1, delta * 0.01);
        }
      } else if (
        !isPausedRef.current &&
        !dragStateRef.current.dragging &&
        count > 1
      ) {
        let next = progressRef.current + delta * speed * directionRef.current;
        if (next >= maxPos) {
          next = maxPos;
          directionRef.current = -1;
        } else if (next <= minPos) {
          next = minPos;
          directionRef.current = 1;
        }
        progressRef.current = next;
      }

      let closestIdx = 0;
      let minDist = Infinity;
      for (let i = 0; i < count; i++) {
        const dist = Math.abs(i - progressRef.current);
        if (dist < minDist) {
          minDist = dist;
          closestIdx = i;
        }
      }

      setActiveIndex((prev) => (prev !== closestIdx ? closestIdx : prev));
      setTick((t) => (t + 1) % 1000000);

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      lastTimeRef.current = null;
    };
  }, [count, speed]);

  const handlePointerDown = (e) => {
    targetRef.current = null;
    dragStateRef.current = {
      dragging: true,
      startX: e.clientX,
      startProgress: progressRef.current,
    };
  };

  const handlePointerMove = (e) => {
    if (!dragStateRef.current.dragging) return;
    const dx = e.clientX - dragStateRef.current.startX;
    const next = Math.min(
      Math.max(0, dragStateRef.current.startProgress - dx / spacing),
      Math.max(0, count - 1)
    );
    progressRef.current = next;
  };

  const handlePointerUp = () => {
    dragStateRef.current.dragging = false;
  };

  const jumpToCard = (idx) => {
    targetRef.current = idx;
  };

  const activeCard = cards[activeIndex] || cards[0];

  return (
    <main
      style={{
        minHeight: "100vh",
        width: "100%",
        background: COLORS.bgDeep,
        color: COLORS.creamText,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "44px 16px 52px",
        boxSizing: "border-box",
        userSelect: "none",
        overflowX: "clip",
        position: "relative",
      }}
      onMouseEnter={() => {
        if (pauseOnHover) isPausedRef.current = true;
      }}
      onMouseLeave={() => {
        if (pauseOnHover) isPausedRef.current = false;
        dragStateRef.current.dragging = false;
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(circle at 50% 45%, rgba(29, 78, 216, 0.36) 0%, rgba(9, 24, 61, 0.92) 58%, rgba(4, 9, 26, 1) 100%)",
        }}
      />

      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          opacity: 0.45,
          background:
            "conic-gradient(from 165deg at 50% -10%, transparent 0deg, rgba(243, 208, 120, 0.24) 15deg, transparent 30deg)",
        }}
      />

      <header
        style={{
          position: "relative",
          zIndex: 40,
          textAlign: "center",
          maxWidth: "740px",
          margin: "0 auto 14px",
          minHeight: "144px",
          padding: "0 12px",
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "5px 14px",
            marginBottom: "8px",
            fontSize: "11px",
            fontWeight: 600,
            letterSpacing: "0.24em",
            textTransform: "uppercase",
            color: COLORS.gold,
            background: "rgba(7, 19, 48, 0.85)",
            border: `1px solid ${COLORS.goldMuted}`,
            borderRadius: "999px",
            fontFamily: "'Cinzel', serif",
          }}
        >
          <Sparkles size={12} color={COLORS.gold} />
          <span>
            {String(activeIndex + 1).padStart(2, "0")} /{" "}
            {String(count).padStart(2, "0")}
          </span>
          {activeCard?.dateTag && (
            <>
              <span style={{ opacity: 0.45 }}>•</span>
              <span>{activeCard.dateTag}</span>
            </>
          )}
        </div>

        {/* Dedicated Event Date Pill */}
        {showDate && activeCard?.date && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "6px",
            }}
          >
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "4px 12px",
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: COLORS.creamText,
                background: COLORS.goldFaint,
                border: `1px solid ${COLORS.goldMuted}`,
                borderRadius: "999px",
                fontFamily: "'Cinzel', serif",
              }}
            >
              <Calendar size={12} color={COLORS.gold} />
              <span>{activeCard.date}</span>
            </span>
          </div>
        )}

        <h1
          style={{
            margin: "0 0 6px",
            fontSize: "clamp(38px, 5vw, 52px)",
            fontWeight: 400,
            lineHeight: 1.15,
            color: COLORS.creamText,
            textShadow: "0 2px 14px rgba(243, 208, 120, 0.4)",
            fontFamily: "'Great Vibes', cursive",
            textTransform: "none",
          }}
        >
          {activeCard?.title}
        </h1>

        <div
          style={{
            width: "90px",
            height: "1px",
            margin: "0 auto 10px",
            background:
              "linear-gradient(90deg, transparent, #f3d078, transparent)",
          }}
        />

        <p
          style={{
            margin: "0 auto",
            maxWidth: "520px",
            fontSize: "16px",
            fontStyle: "italic",
            lineHeight: 1.5,
            color: COLORS.bodyMuted,
            fontFamily: "'Cormorant Garamond', serif",
          }}
        >
          {activeCard?.description}
        </p>
      </header>

      <div
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        style={{
          position: "relative",
          zIndex: 20,
          width: "100%",
          height: `${cardHeight + arcDepth * 2 + 44}px`,
          overflow: "hidden",
          cursor: dragStateRef.current.dragging ? "grabbing" : "grab",
          touchAction: "pan-y",
        }}
      >
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "-165px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "160%",
            height: "215px",
            borderRadius: "50%",
            background: COLORS.bgDeep,
            zIndex: 30,
            pointerEvents: "none",
          }}
        />

        <div
          data-frame={tick}
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
          }}
        >
          {cards.map((card, index) => {
            const offset = index - progressRef.current;
            const absOffset = Math.abs(offset);
            const isCenter = absOffset < 0.45;

            const x = offset * spacing;
            const y = Math.pow(offset, 2) * (arcDepth * 0.28);
            const rotateZ = offset * 2.6;
            const scale = Math.max(0.85, 1.05 - absOffset * 0.048);
            const zIndex = Math.round(25 - absOffset * 3);

            return (
              <div
                key={card.id ?? index}
                onClick={() => {
                  if (!isCenter) jumpToCard(index);
                }}
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  width: `${cardWidth}px`,
                  height: `${cardHeight}px`,
                  marginLeft: `-${cardWidth / 2}px`,
                  marginTop: `-${cardHeight / 2}px`,
                  transform: `translate3d(${x}px, ${y}px, 0) rotate(${rotateZ}deg) scale(${scale})`,
                  transformOrigin: "center center",
                  zIndex,
                  borderRadius: "20px",
                  overflow: "hidden",
                  boxShadow: isCenter
                    ? `0 24px 50px ${COLORS.shadow}, 0 0 28px rgba(243, 208, 120, 0.35)`
                    : `0 14px 30px rgba(0, 0, 0, 0.65)`,
                  border: `1.5px solid ${
                    isCenter ? COLORS.gold : COLORS.goldMuted
                  }`,
                  background: COLORS.cardNavy,
                  willChange: "transform",
                  transition: "box-shadow 0.3s ease, border-color 0.3s ease",
                }}
              >
                <img
                  src={card.image}
                  alt={card.title}
                  draggable={false}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                    filter: isCenter ? "brightness(1)" : "brightness(0.72)",
                    transition: "filter 0.35s ease",
                  }}
                />

                <div
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    inset: "8px",
                    borderRadius: "14px",
                    border: `1px solid ${
                      isCenter
                        ? "rgba(243, 208, 120, 0.65)"
                        : "rgba(243, 208, 120, 0.25)"
                    }`,
                    pointerEvents: "none",
                    zIndex: 2,
                  }}
                />

                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(180deg, rgba(4,9,26,0.08) 42%, rgba(4,9,26,0.94) 100%)",
                    pointerEvents: "none",
                  }}
                />

                <div
                  style={{
                    position: "absolute",
                    bottom: "18px",
                    left: "18px",
                    right: "18px",
                    zIndex: 3,
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                  }}
                >
                  {/* Date badge inside the card */}
                  {showDate && card.date && (
                    <div
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        alignSelf: "flex-start",
                        gap: "5px",
                        padding: "3px 9px",
                        fontSize: "9px",
                        fontWeight: 600,
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        color: COLORS.gold,
                        background: "rgba(4, 9, 26, 0.78)",
                        border: `1px solid ${COLORS.goldMuted}`,
                        borderRadius: "999px",
                        pointerEvents: "none",
                        fontFamily: "'Cinzel', serif",
                      }}
                    >
                      <Calendar size={10} color={COLORS.gold} />
                      <span>{card.date}</span>
                    </div>
                  )}

                  <div
                    style={{
                      fontSize: "14px",
                      fontWeight: 700,
                      letterSpacing: "0.14em",
                      color: COLORS.creamText,
                      textTransform: "uppercase",
                      lineHeight: 1.25,
                      pointerEvents: "none",
                      fontFamily: "'Cinzel', serif",
                    }}
                  >
                    {card.title}
                  </div>

                  {card.mapUrl && (
                    <a
                      href={card.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onPointerDown={(e) => e.stopPropagation()}
                      onClick={(e) => e.stopPropagation()}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "6px",
                        padding: "8px 12px",
                        fontSize: "10px",
                        fontWeight: 600,
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        textDecoration: "none",
                        color: isCenter ? "#071330" : COLORS.gold,
                        background: isCenter
                          ? "linear-gradient(90deg, #c8963e, #f3d078, #c8963e)"
                          : "rgba(7, 19, 48, 0.85)",
                        border: `1px solid ${COLORS.goldMuted}`,
                        borderRadius: "999px",
                        cursor: "pointer",
                        boxShadow: "0 4px 14px rgba(0, 0, 0, 0.4)",
                        fontFamily: "'Cinzel', serif",
                      }}
                    >
                      <MapPin size={12} />
                      <span
                        style={{
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {card.locationName || "View on Map"}
                      </span>
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            bottom: "-165px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "160%",
            height: "215px",
            borderRadius: "50%",
            background: COLORS.bgDeep,
            zIndex: 30,
            pointerEvents: "none",
          }}
        />
      </div>

      <nav
        aria-label="Wedding Events"
        style={{
          position: "relative",
          zIndex: 40,
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "8px",
          marginTop: "6px",
          maxWidth: "680px",
        }}
      >
        {cards.map((card, idx) => {
          const isActive = idx === activeIndex;
          return (
            <button
              key={card.id ?? idx}
              type="button"
              onClick={() => jumpToCard(idx)}
              style={{
                padding: "6px 14px",
                fontSize: "10px",
                fontWeight: 600,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                borderRadius: "999px",
                border: `1px solid ${
                  isActive ? COLORS.gold : COLORS.goldMuted
                }`,
                background: isActive
                  ? "rgba(243, 208, 120, 0.2)"
                  : "rgba(7, 19, 48, 0.65)",
                color: isActive ? COLORS.creamText : COLORS.gold,
                cursor: "pointer",
                transition: "all 0.25s ease",
                fontFamily: "'Cinzel', serif",
              }}
            >
              {card.title}
            </button>
          );
        })}
      </nav>
    </main>
  );
}