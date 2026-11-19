import React, { useEffect, useRef, useState } from "react";

const DEFAULT_CARDS = [
  {
    id: 1,
    title: "GREAT WALL OF CHINA",
    description:
      "A vast defensive structure built over centuries to protect Chinese states across northern China.",
    image:
      "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 2,
    title: "CHRIST THE REDEEMER",
    description:
      "A monumental statue overlooking Rio de Janeiro, symbolizing both Christianity and Brazil's global identity.",
    image:
      "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 3,
    title: "TAJ MAHAL",
    description:
      "An ivory-white marble mausoleum built as a symbol of love, combining architectural symmetry with craftsmanship.",
    image:
      "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 4,
    title: "PETRA TREASURY",
    description:
      "An ancient city carved directly into rose-red sandstone cliffs, famous for its rock-cut architecture.",
    image:
      "https://images.unsplash.com/photo-1579606032821-4e6161c56a0e?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 5,
    title: "MACHU PICCHU",
    description:
      "A 15th-century Inca citadel set high in the Andes Mountains above the Sacred Valley in Peru.",
    image:
      "https://images.unsplash.com/photo-1587595431973-160d0d94add1?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 6,
    title: "PYRAMIDS OF GIZA",
    description:
      "Ancient monumental tombs built on the Giza plateau, standing as enduring landmarks of human engineering.",
    image:
      "https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&w=900&q=80",
  },
];

export default function StackCards({
  cards = DEFAULT_CARDS,
  speed = 0.00045, // continuous scroll speed (cards per ms)
  cardWidth = 175,
  cardHeight = 290,
  spacing = 195, // horizontal distance between card centers
  arcDepth = 42, // vertical curve depth along the arc
  pauseOnHover = true,
}) {
  const count = cards.length;
  const progressRef = useRef(0); // continuous float index
  const lastTimeRef = useRef(null);
  const rafRef = useRef(null);
  const isPausedRef = useRef(false);
  const dragStateRef = useRef({
    dragging: false,
    startX: 0,
    startProgress: 0,
  });

  const [tick, setTick] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  // Shortest circular offset in [-count/2, count/2]
  const getCircularOffset = (index, currentProgress) => {
    let diff = (index - currentProgress) % count;
    if (diff > count / 2) diff -= count;
    if (diff < -count / 2) diff += count;
    return diff;
  };

  useEffect(() => {
    if (!count) return;

    const animate = (timestamp) => {
      if (lastTimeRef.current == null) {
        lastTimeRef.current = timestamp;
      }
      const delta = timestamp - lastTimeRef.current;
      lastTimeRef.current = timestamp;

      if (!isPausedRef.current && !dragStateRef.current.dragging) {
        progressRef.current = (progressRef.current + delta * speed) % count;
        if (progressRef.current < 0) progressRef.current += count;
      }

      // Find card closest to center (offset = 0)
      let closestIdx = 0;
      let minDist = Infinity;
      for (let i = 0; i < count; i++) {
        const dist = Math.abs(getCircularOffset(i, progressRef.current));
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
    let next = dragStateRef.current.startProgress - dx / spacing;
    next = ((next % count) + count) % count;
    progressRef.current = next;
  };

  const handlePointerUp = () => {
    dragStateRef.current.dragging = false;
  };

  const activeCard = cards[activeIndex] || cards[0];

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "960px",
        margin: "0 auto",
        padding: "28px 16px 36px",
        background: "#ffffff",
        color: "#111827",
        fontFamily:
          'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        userSelect: "none",
      }}
      onMouseEnter={() => {
        if (pauseOnHover) isPausedRef.current = true;
      }}
      onMouseLeave={() => {
        if (pauseOnHover) isPausedRef.current = false;
        dragStateRef.current.dragging = false;
      }}
    >
      {/* Dynamic Header synced with center/active card */}
      <div
        style={{
          textAlign: "center",
          maxWidth: "640px",
          margin: "0 auto 14px",
          minHeight: "82px",
        }}
      >
        <h2
          style={{
            margin: "0 0 6px",
            fontSize: "24px",
            fontWeight: 800,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            color: "#111827",
          }}
        >
          {activeCard?.title}
        </h2>
        <p
          style={{
            margin: 0,
            fontSize: "13.5px",
            lineHeight: 1.45,
            color: "#4b5563",
          }}
        >
          {activeCard?.description}
        </p>
      </div>

      {/* Continuous Curved Cards Stage */}
      <div
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        style={{
          position: "relative",
          width: "100%",
          height: `${cardHeight + arcDepth * 2 + 24}px`,
          overflow: "hidden",
          cursor: dragStateRef.current.dragging ? "grabbing" : "grab",
          touchAction: "pan-y",
        }}
      >
        {/* Top curved mask matching video's curved arc edge */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "-135px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "145%",
            height: "175px",
            borderRadius: "50%",
            background: "#ffffff",
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
            const offset = getCircularOffset(index, progressRef.current);
            const absOffset = Math.abs(offset);

            // Hide cards far outside visible window
            if (absOffset > Math.max(3.2, count / 2 + 0.5)) {
              return null;
            }

            const x = offset * spacing;
            // Parabola curve: center (offset = 0) sits slightly higher, outer cards curve down
            const y = Math.pow(offset, 2) * (arcDepth * 0.42);
            const rotateZ = offset * 3.2;
            const scale = Math.max(0.86, 1.04 - absOffset * 0.055);
            const zIndex = Math.round(20 - absOffset * 4);
            const opacity = absOffset > 2.6 ? Math.max(0, 1 - (absOffset - 2.6) * 1.6) : 1;

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
                  opacity,
                  borderRadius: "10px",
                  overflow: "hidden",
                  boxShadow:
                    absOffset < 0.6
                      ? "0 18px 34px rgba(15, 23, 42, 0.22)"
                      : "0 10px 22px rgba(15, 23, 42, 0.14)",
                  border: "1px solid rgba(255, 255, 255, 0.65)",
                  background: "#e5e7eb",
                  willChange: "transform",
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
              </div>
            );
          })}
        </div>

        {/* Bottom curved mask matching video's curved arc edge */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            bottom: "-135px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "145%",
            height: "175px",
            borderRadius: "50%",
            background: "#ffffff",
            zIndex: 30,
            pointerEvents: "none",
          }}
        />
      </div>
    </div>
  );
}