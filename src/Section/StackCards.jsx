// import React, { useEffect, useRef, useState } from "react";

// const COLORS = {
//   cream: "#F0E4D2",
//   burgundy: "#702B35",
//   textMuted: "rgba(112, 43, 53, 0.84)",
//   cardBorder: "rgba(112, 43, 53, 0.25)",
//   shadow: "rgba(112, 43, 53, 0.28)",
// };

// const DEFAULT_CARDS = [
//   {
//     id: 1,
//     title: "GREAT WALL OF CHINA",
//     description:
//       "A vast defensive structure built over centuries to protect Chinese states across northern China.",
//     image:
//       "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=1000&q=85",
//   },
//   {
//     id: 2,
//     title: "CHRIST THE REDEEMER",
//     description:
//       "A monumental statue overlooking Rio de Janeiro, symbolizing both Christianity and Brazil's global identity.",
//     image:
//       "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=1000&q=85",
//   },
//   {
//     id: 3,
//     title: "TAJ MAHAL",
//     description:
//       "An ivory-white marble mausoleum built as a symbol of love, combining architectural symmetry with craftsmanship.",
//     image:
//       "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1000&q=85",
//   },
//   {
//     id: 4,
//     title: "PETRA TREASURY",
//     description:
//       "An ancient city carved directly into rose-red sandstone cliffs, famous for its rock-cut architecture.",
//     image:
//       "https://images.unsplash.com/photo-1579606032821-4e6161c56a0e?auto=format&fit=crop&w=1000&q=85",
//   },
//   {
//     id: 5,
//     title: "MACHU PICCHU",
//     description:
//       "A 15th-century Inca citadel set high in the Andes Mountains above the Sacred Valley in Peru.",
//     image:
//       "https://images.unsplash.com/photo-1587595431973-160d0d94add1?auto=format&fit=crop&w=1000&q=85",
//   },
//   {
//     id: 6,
//     title: "PYRAMIDS OF GIZA",
//     description:
//       "Ancient monumental tombs built on the Giza plateau, standing as enduring landmarks of human engineering.",
//     image:
//       "https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&w=1000&q=85",
//   },
//   {
//     id: 7,
//     title: "ROMAN COLOSSEUM",
//     description:
//       "The largest ancient amphitheatre ever built, standing at the heart of Rome as an icon of classical architecture.",
//     image:
//       "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1000&q=85",
//   },
//   {
//     id: 8,
//     title: "CHICHEN ITZA",
//     description:
//       "A grand pre-Columbian Maya city dominated by the iconic step pyramid of El Castillo in Mexico.",
//     image:
//       "https://images.unsplash.com/photo-1518638150340-f706e86654de?auto=format&fit=crop&w=1000&q=85",
//   },
// ];

// export default function StackCards({
//   cards = DEFAULT_CARDS,
//   speed = 0.00045,
//   cardWidth = 265,
//   cardHeight = 420,
//   spacing = 285,
//   arcDepth = 58,
//   pauseOnHover = true,
// }) {
//   const count = cards.length;
//   // Center the 8 cards around 0 so all 8 appear once without wrapping around
//   const progressRef = useRef((count - 1) / 2);
//   const directionRef = useRef(1);
//   const lastTimeRef = useRef(null);
//   const rafRef = useRef(null);
//   const isPausedRef = useRef(false);
//   const dragStateRef = useRef({
//     dragging: false,
//     startX: 0,
//     startProgress: 0,
//   });

//   const [tick, setTick] = useState(0);
//   const [activeIndex, setActiveIndex] = useState(Math.floor((count - 1) / 2));

//   useEffect(() => {
//     if (!count) return;

//     const minPos = 0;
//     const maxPos = Math.max(0, count - 1);

//     const animate = (timestamp) => {
//       if (lastTimeRef.current == null) {
//         lastTimeRef.current = timestamp;
//       }
//       const delta = timestamp - lastTimeRef.current;
//       lastTimeRef.current = timestamp;

//       if (!isPausedRef.current && !dragStateRef.current.dragging && count > 1) {
//         let next = progressRef.current + delta * speed * directionRef.current;
//         if (next >= maxPos) {
//           next = maxPos;
//           directionRef.current = -1;
//         } else if (next <= minPos) {
//           next = minPos;
//           directionRef.current = 1;
//         }
//         progressRef.current = next;
//       }

//       let closestIdx = 0;
//       let minDist = Infinity;
//       for (let i = 0; i < count; i++) {
//         const dist = Math.abs(i - progressRef.current);
//         if (dist < minDist) {
//           minDist = dist;
//           closestIdx = i;
//         }
//       }

//       setActiveIndex((prev) => (prev !== closestIdx ? closestIdx : prev));
//       setTick((t) => (t + 1) % 1000000);

//       rafRef.current = requestAnimationFrame(animate);
//     };

//     rafRef.current = requestAnimationFrame(animate);
//     return () => {
//       if (rafRef.current) cancelAnimationFrame(rafRef.current);
//       lastTimeRef.current = null;
//     };
//   }, [count, speed]);

//   const handlePointerDown = (e) => {
//     dragStateRef.current = {
//       dragging: true,
//       startX: e.clientX,
//       startProgress: progressRef.current,
//     };
//   };

//   const handlePointerMove = (e) => {
//     if (!dragStateRef.current.dragging) return;
//     const dx = e.clientX - dragStateRef.current.startX;
//     const next = Math.min(
//       Math.max(0, dragStateRef.current.startProgress - dx / spacing),
//       Math.max(0, count - 1)
//     );
//     progressRef.current = next;
//   };

//   const handlePointerUp = () => {
//     dragStateRef.current.dragging = false;
//   };

//   const activeCard = cards[activeIndex] || cards[0];

//   return (
//     <main
//       style={{
//         minHeight: "100vh",
//         width: "100%",
//         background: COLORS.cream,
//         color: COLORS.burgundy,
//         display: "flex",
//         flexDirection: "column",
//         justifyContent: "center",
//         alignItems: "center",
//         padding: "40px 16px 48px",
//         boxSizing: "border-box",
//         fontFamily:
//           'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
//         userSelect: "none",
//         overflowX: "clip",
//       }}
//       onMouseEnter={() => {
//         if (pauseOnHover) isPausedRef.current = true;
//       }}
//       onMouseLeave={() => {
//         if (pauseOnHover) isPausedRef.current = false;
//         dragStateRef.current.dragging = false;
//       }}
//     >
//       {/* Dynamic Header synced with active card */}
//       <header
//         style={{
//           textAlign: "center",
//           maxWidth: "740px",
//           margin: "0 auto 18px",
//           minHeight: "102px",
//         }}
//       >
//         <span
//           style={{
//             display: "inline-block",
//             padding: "4px 12px",
//             marginBottom: "10px",
//             fontSize: "11px",
//             fontWeight: 700,
//             letterSpacing: "0.14em",
//             textTransform: "uppercase",
//             color: COLORS.cream,
//             background: COLORS.burgundy,
//             borderRadius: "999px",
//           }}
//         >
//           {String(activeIndex + 1).padStart(2, "0")} /{" "}
//           {String(count).padStart(2, "0")}
//         </span>

//         <h1
//           style={{
//             margin: "0 0 8px",
//             fontSize: "32px",
//             fontWeight: 800,
//             letterSpacing: "0.06em",
//             textTransform: "uppercase",
//             color: COLORS.burgundy,
//           }}
//         >
//           {activeCard?.title}
//         </h1>

//         <p
//           style={{
//             margin: 0,
//             fontSize: "15px",
//             lineHeight: 1.5,
//             color: COLORS.textMuted,
//           }}
//         >
//           {activeCard?.description}
//         </p>
//       </header>

//       {/* Full-width Cream Stage — Each of the 8 cards appears once */}
//       <div
//         onPointerDown={handlePointerDown}
//         onPointerMove={handlePointerMove}
//         onPointerUp={handlePointerUp}
//         onPointerCancel={handlePointerUp}
//         style={{
//           position: "relative",
//           width: "100%",
//           height: `${cardHeight + arcDepth * 2 + 44}px`,
//           overflow: "hidden",
//           cursor: dragStateRef.current.dragging ? "grabbing" : "grab",
//           touchAction: "pan-y",
//         }}
//       >
//         {/* Top curved cream mask */}
//         <div
//           aria-hidden="true"
//           style={{
//             position: "absolute",
//             top: "-165px",
//             left: "50%",
//             transform: "translateX(-50%)",
//             width: "160%",
//             height: "215px",
//             borderRadius: "50%",
//             background: COLORS.cream,
//             zIndex: 30,
//             pointerEvents: "none",
//           }}
//         />

//         {/* Cards Layer */}
//         <div
//           data-frame={tick}
//           style={{
//             position: "relative",
//             width: "100%",
//             height: "100%",
//           }}
//         >
//           {cards.map((card, index) => {
//             const offset = index - progressRef.current;
//             const absOffset = Math.abs(offset);
//             const isCenter = absOffset < 0.45;

//             const x = offset * spacing;
//             const y = Math.pow(offset, 2) * (arcDepth * 0.28);
//             const rotateZ = offset * 2.6;
//             const scale = Math.max(0.85, 1.04 - absOffset * 0.045);
//             const zIndex = Math.round(25 - absOffset * 3);

//             return (
//               <div
//                 key={card.id ?? index}
//                 style={{
//                   position: "absolute",
//                   top: "50%",
//                   left: "50%",
//                   width: `${cardWidth}px`,
//                   height: `${cardHeight}px`,
//                   marginLeft: `-${cardWidth / 2}px`,
//                   marginTop: `-${cardHeight / 2}px`,
//                   transform: `translate3d(${x}px, ${y}px, 0) rotate(${rotateZ}deg) scale(${scale})`,
//                   transformOrigin: "center center",
//                   zIndex,
//                   borderRadius: "14px",
//                   overflow: "hidden",
//                   boxShadow: isCenter
//                     ? `0 22px 42px ${COLORS.shadow}, 0 0 0 3px ${COLORS.burgundy}`
//                     : `0 12px 26px rgba(112, 43, 53, 0.16)`,
//                   border: `1.5px solid ${
//                     isCenter ? COLORS.burgundy : COLORS.cardBorder
//                   }`,
//                   background: COLORS.burgundy,
//                   willChange: "transform",
//                   transition: "box-shadow 0.25s ease, border-color 0.25s ease",
//                 }}
//               >
//                 <img
//                   src={card.image}
//                   alt={card.title}
//                   draggable={false}
//                   style={{
//                     width: "100%",
//                     height: "100%",
//                     objectFit: "cover",
//                     display: "block",
//                   }}
//                 />
//                 <div
//                   style={{
//                     position: "absolute",
//                     inset: 0,
//                     background:
//                       "linear-gradient(180deg, rgba(112,43,53,0) 62%, rgba(112,43,53,0.45) 100%)",
//                     pointerEvents: "none",
//                   }}
//                 />
//               </div>
//             );
//           })}
//         </div>

//         {/* Bottom curved cream mask */}
//         <div
//           aria-hidden="true"
//           style={{
//             position: "absolute",
//             bottom: "-165px",
//             left: "50%",
//             transform: "translateX(-50%)",
//             width: "160%",
//             height: "215px",
//             borderRadius: "50%",
//             background: COLORS.cream,
//             zIndex: 30,
//             pointerEvents: "none",
//           }}
//         />
//       </div>
//     </main>
//   );
// }
import React, { useEffect, useRef, useState } from "react";
import { Sparkles, MapPin } from "lucide-react";

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
    title: "Haldi Ceremony",
    dateTag: "Day 01 • Morning",
    description:
      "Morning turmeric blessings filled with laughter, marigold decor, and family warmth.",
    locationName: "Royal Courtyard Lawn",
    mapUrl: "https://maps.google.com/?q=Royal+Courtyard+Lawn",
    image:
      "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: 2,
    title: "Mehndi",
    dateTag: "Day 01 • Afternoon",
    description:
      "Intricate henna designs, folk songs, vibrant colors, and joyful celebrations.",
    locationName: "Garden Pavilion Hall",
    mapUrl: "https://maps.google.com/?q=Garden+Pavilion+Hall",
    image:
      "https://images.unsplash.com/photo-1604608672516-f1b9b1d370e5?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: 3,
    title: "Sangeet Night",
    dateTag: "Day 01 • Evening",
    description:
      "An evening of choreographed dances, music, lights, and unforgettable performances.",
    locationName: "Grand Banquet Ballroom",
    mapUrl: "https://maps.google.com/?q=Grand+Banquet+Ballroom",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: 4,
    title: "Baraat",
    dateTag: "Day 02 • Afternoon",
    description:
      "A lively procession with dhol beats, dancing guests, and festive celebration.",
    locationName: "Heritage Main Gate",
    mapUrl: "https://maps.google.com/?q=Heritage+Main+Gate",
    image:
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: 5,
    title: "Shadi (Pheras)",
    dateTag: "Day 02 • Auspicious Hour",
    description:
      "Sacred vows around the holy fire surrounded by family blessings and tradition.",
    locationName: "Mandap Sacred Lawn",
    mapUrl: "https://maps.google.com/?q=Mandap+Sacred+Lawn",
    image:
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: 6,
    title: "Reception",
    dateTag: "Day 02 • Grand Finale",
    description:
      "A grand evening to celebrate the newlyweds with dinner, toasts, and music.",
    locationName: "Crystal Palace Lawns",
    mapUrl: "https://maps.google.com/?q=Crystal+Palace+Lawns",
    image:
      "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1000&q=85",
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
}) {
  const count = cards.length;
  const progressRef = useRef((count - 1) / 2);
  const targetRef = useRef(null); // Smooth jump target when clicking a pill/card
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

  // Same Google Fonts as Page1 & TheCouple
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
        // Smooth glide to selected ceremony
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
      {/* Ambient Royal Blue Theater Glow */}
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

      {/* Top Theatrical Gold Spotlight */}
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

      {/* Dynamic Header synced with active card */}
      <header
        style={{
          position: "relative",
          zIndex: 40,
          textAlign: "center",
          maxWidth: "740px",
          margin: "0 auto 14px",
          minHeight: "126px",
          padding: "0 12px",
        }}
      >
        {/* Top Royal Eyebrow Badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "5px 14px",
            marginBottom: "10px",
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

        {/* Active Ceremony Title in Great Vibes */}
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

        {/* Ornamental Gold Hairline */}
        <div
          style={{
            width: "90px",
            height: "1px",
            margin: "0 auto 10px",
            background:
              "linear-gradient(90deg, transparent, #f3d078, transparent)",
          }}
        />

        {/* Editorial Description */}
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

      {/* Full-width Royal Blue Arc Stage */}
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
        {/* Top curved Midnight Blue mask */}
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

                {/* Double Inner Champagne Gold Frame */}
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

                {/* Royal Midnight Gradient Overlay */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(180deg, rgba(4,9,26,0.08) 42%, rgba(4,9,26,0.94) 100%)",
                    pointerEvents: "none",
                  }}
                />

                {/* Bottom Event Name & Location Button */}
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

        {/* Bottom curved Midnight Blue mask */}
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

      {/* Interactive Ceremony Quick-Jump Pills */}
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