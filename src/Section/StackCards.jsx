import React, { useEffect, useRef, useState } from "react";

const COLORS = {
  cream: "#F0E4D2",
  burgundy: "#702B35",
  textMuted: "rgba(112, 43, 53, 0.84)",
  cardBorder: "rgba(112, 43, 53, 0.25)",
  shadow: "rgba(112, 43, 53, 0.28)",
};

const DEFAULT_CARDS = [
  {
    id: 1,
    title: "GREAT WALL OF CHINA",
    description:
      "A vast defensive structure built over centuries to protect Chinese states across northern China.",
    image:
      "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: 2,
    title: "CHRIST THE REDEEMER",
    description:
      "A monumental statue overlooking Rio de Janeiro, symbolizing both Christianity and Brazil's global identity.",
    image:
      "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: 3,
    title: "TAJ MAHAL",
    description:
      "An ivory-white marble mausoleum built as a symbol of love, combining architectural symmetry with craftsmanship.",
    image:
      "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: 4,
    title: "PETRA TREASURY",
    description:
      "An ancient city carved directly into rose-red sandstone cliffs, famous for its rock-cut architecture.",
    image:
      "https://images.unsplash.com/photo-1579606032821-4e6161c56a0e?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: 5,
    title: "MACHU PICCHU",
    description:
      "A 15th-century Inca citadel set high in the Andes Mountains above the Sacred Valley in Peru.",
    image:
      "https://images.unsplash.com/photo-1587595431973-160d0d94add1?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: 6,
    title: "PYRAMIDS OF GIZA",
    description:
      "Ancient monumental tombs built on the Giza plateau, standing as enduring landmarks of human engineering.",
    image:
      "https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: 7,
    title: "ROMAN COLOSSEUM",
    description:
      "The largest ancient amphitheatre ever built, standing at the heart of Rome as an icon of classical architecture.",
    image:
      "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: 8,
    title: "CHICHEN ITZA",
    description:
      "A grand pre-Columbian Maya city dominated by the iconic step pyramid of El Castillo in Mexico.",
    image:
      "https://images.unsplash.com/photo-1518638150340-f706e86654de?auto=format&fit=crop&w=1000&q=85",
  },
];

export default function StackCards({
  cards = DEFAULT_CARDS,
  speed = 0.00045,
  cardWidth = 265,
  cardHeight = 420,
  spacing = 285,
  arcDepth = 58,
  pauseOnHover = true,
}) {
  const count = cards.length;
  // Center the 8 cards around 0 so all 8 appear once without wrapping around
  const progressRef = useRef((count - 1) / 2);
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
    if (!count) return;

    const minPos = 0;
    const maxPos = Math.max(0, count - 1);

    const animate = (timestamp) => {
      if (lastTimeRef.current == null) {
        lastTimeRef.current = timestamp;
      }
      const delta = timestamp - lastTimeRef.current;
      lastTimeRef.current = timestamp;

      if (!isPausedRef.current && !dragStateRef.current.dragging && count > 1) {
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

  const activeCard = cards[activeIndex] || cards[0];

  return (
    <main
      style={{
        minHeight: "100vh",
        width: "100%",
        background: COLORS.cream,
        color: COLORS.burgundy,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "40px 16px 48px",
        boxSizing: "border-box",
        fontFamily:
          'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        userSelect: "none",
        overflowX: "clip",
      }}
      onMouseEnter={() => {
        if (pauseOnHover) isPausedRef.current = true;
      }}
      onMouseLeave={() => {
        if (pauseOnHover) isPausedRef.current = false;
        dragStateRef.current.dragging = false;
      }}
    >
      {/* Dynamic Header synced with active card */}
      <header
        style={{
          textAlign: "center",
          maxWidth: "740px",
          margin: "0 auto 18px",
          minHeight: "102px",
        }}
      >
        <span
          style={{
            display: "inline-block",
            padding: "4px 12px",
            marginBottom: "10px",
            fontSize: "11px",
            fontWeight: 700,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: COLORS.cream,
            background: COLORS.burgundy,
            borderRadius: "999px",
          }}
        >
          {String(activeIndex + 1).padStart(2, "0")} /{" "}
          {String(count).padStart(2, "0")}
        </span>

        <h1
          style={{
            margin: "0 0 8px",
            fontSize: "32px",
            fontWeight: 800,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            color: COLORS.burgundy,
          }}
        >
          {activeCard?.title}
        </h1>

        <p
          style={{
            margin: 0,
            fontSize: "15px",
            lineHeight: 1.5,
            color: COLORS.textMuted,
          }}
        >
          {activeCard?.description}
        </p>
      </header>

      {/* Full-width Cream Stage — Each of the 8 cards appears once */}
      <div
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        style={{
          position: "relative",
          width: "100%",
          height: `${cardHeight + arcDepth * 2 + 44}px`,
          overflow: "hidden",
          cursor: dragStateRef.current.dragging ? "grabbing" : "grab",
          touchAction: "pan-y",
        }}
      >
        {/* Top curved cream mask */}
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
            background: COLORS.cream,
            zIndex: 30,
            pointerEvents: "none",
          }}
        />

        {/* Cards Layer */}
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
            const scale = Math.max(0.85, 1.04 - absOffset * 0.045);
            const zIndex = Math.round(25 - absOffset * 3);

            return (
              <div
                key={card.id ?? index}
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
                  borderRadius: "14px",
                  overflow: "hidden",
                  boxShadow: isCenter
                    ? `0 22px 42px ${COLORS.shadow}, 0 0 0 3px ${COLORS.burgundy}`
                    : `0 12px 26px rgba(112, 43, 53, 0.16)`,
                  border: `1.5px solid ${
                    isCenter ? COLORS.burgundy : COLORS.cardBorder
                  }`,
                  background: COLORS.burgundy,
                  willChange: "transform",
                  transition: "box-shadow 0.25s ease, border-color 0.25s ease",
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
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(180deg, rgba(112,43,53,0) 62%, rgba(112,43,53,0.45) 100%)",
                    pointerEvents: "none",
                  }}
                />
              </div>
            );
          })}
        </div>

        {/* Bottom curved cream mask */}
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
            background: COLORS.cream,
            zIndex: 30,
            pointerEvents: "none",
          }}
        />
      </div>
    </main>
  );
}