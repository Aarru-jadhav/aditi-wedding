
import { useState } from "react";
import haldiVenue from "../assets/Images/haldivenue.jpg";
import mehndiVenue from "../assets/Images/mehndivenue.jpg";

const venues = [
  {
    id: 1,
    event: "Haldi Ceremony",
    title: "The Haldi Garden",
    image: haldiVenue,
    mapLink: "https://maps.google.com",
    x: 18,
    y: 72,
  },
  {
    id: 2,
    event: "Mehndi Ceremony",
    title: "The Mehndi Courtyard",
    image: mehndiVenue,
    mapLink: "https://maps.google.com",
    x: 42,
    y: 48,
  },
  {
    id: 3,
    event: "Wedding Ceremony",
    title: "The Wedding Palace",
    image: "/images/wedding-venue.jpg",
    mapLink: "https://maps.google.com",
    x: 68,
    y: 30,
  },
  {
    id: 4,
    event: "Reception",
    title: "The Grand Celebration",
    image: "/images/reception-venue.jpg",
    mapLink: "https://maps.google.com",
    x: 84,
    y: 65,
  },
];

export default function Venues() {
  const [activeVenue, setActiveVenue] = useState(0);

  const selectedVenue = venues[activeVenue];

  // Curved route connecting all locations
  const routePath = venues
    .map((venue, index) => {
      if (index === 0) {
        return `M ${venue.x} ${venue.y}`;
      }

      const previous = venues[index - 1];
      const midX = (previous.x + venue.x) / 2;
      const midY = (previous.y + venue.y) / 2 - 8;

      return `Q ${midX} ${midY}, ${venue.x} ${venue.y}`;
    })
    .join(" ");

  return (
    <section
      id="venues"
      className="relative min-h-screen overflow-hidden bg-white px-4 py-12 text-[#6D5237] md:px-10 md:py-16"
    >
      {/* Heading */}
      <div className="mx-auto mb-8 max-w-3xl text-center md:mb-10">
        <span className="font-serif text-xs tracking-[0.4em] text-[#A88A55]">
          ASHISH & DEEPALI
        </span>

        <h2 className="mt-3 font-serif text-4xl font-light md:text-6xl">
          The Wedding Journey
        </h2>
      </div>

      {/* MAP */}
      <div className="relative mx-auto max-w-6xl">
        <div className="relative aspect-[1/1.1] overflow-hidden rounded-[2rem] border border-[#C7B28D] bg-white shadow-[0_15px_45px_rgba(95,70,40,0.10)] md:aspect-[1.8/1]">
          {/* Map Background */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_20%,rgba(202,180,140,0.2),transparent_40%),radial-gradient(ellipse_at_80%_70%,rgba(202,180,140,0.25),transparent_40%)]" />

          {/* Decorative Terrain */}
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="absolute inset-0 h-full w-full opacity-50"
          >
            <g fill="none" stroke="#D2C1A0" strokeWidth="0.35">
              <path d="M-5 15 Q20 5 30 25 T65 18 T105 35" />
              <path d="M-5 20 Q20 10 30 30 T65 23 T105 40" />
              <path d="M-5 25 Q20 15 30 35 T65 28 T105 45" />

              <path d="M-5 70 Q20 60 35 80 T70 65 T105 85" />
              <path d="M-5 75 Q20 65 35 85 T70 70 T105 90" />
              <path d="M-5 80 Q20 70 35 90 T70 75 T105 95" />

              <path d="M15 -5 Q25 20 15 40 T25 75 T15 105" />
              <path d="M20 -5 Q30 20 20 40 T30 75 T20 105" />

              <path d="M75 -5 Q65 20 80 40 T75 75 T85 105" />
              <path d="M80 -5 Q70 20 85 40 T80 75 T90 105" />
            </g>

            {/* Scenic Patches */}
            <g fill="#D5DCC4" opacity="0.65">
              <ellipse cx="15" cy="25" rx="8" ry="5" />
              <ellipse cx="75" cy="85" rx="12" ry="7" />
              <ellipse cx="90" cy="18" rx="8" ry="5" />
              <ellipse cx="45" cy="90" rx="9" ry="5" />
            </g>

            {/* Water */}
            <g fill="#DCE4DF" opacity="0.7">
              <path d="M0 45 Q20 35 30 45 T60 48 T100 40 L100 47 Q80 55 60 52 T30 50 T0 52Z" />
            </g>
          </svg>

          {/* Map Label */}
          <div className="absolute right-[8%] top-[12%] font-serif text-xs italic text-[#B59A69]">
            The Journey
          </div>

          {/* Animated Golden Route */}
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="absolute inset-0 h-full w-full overflow-visible"
          >
            <path
              d={routePath}
              fill="none"
              stroke="#B99A60"
              strokeWidth="0.8"
              strokeLinecap="round"
              strokeDasharray="2 1.8"
              className="venue-route"
            />

            <path
              d={routePath}
              fill="none"
              stroke="#D9BD83"
              strokeWidth="1.8"
              strokeLinecap="round"
              opacity="0.25"
            />
          </svg>

          {/* Location Pins */}
          {venues.map((venue, index) => (
            <button
              key={venue.id}
              onClick={() => setActiveVenue(index)}
              className="absolute z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center transition-all duration-300 hover:scale-110"
              style={{
                left: `${venue.x}%`,
                top: `${venue.y}%`,
              }}
            >
              {/* Pin */}
              <div
                className={`relative flex h-9 w-9 items-center justify-center rounded-full border shadow-lg transition-all duration-300 md:h-12 md:w-12 ${
                  activeVenue === index
                    ? "scale-125 border-[#A88A55] bg-[#A88A55] text-white"
                    : "border-[#B99A60] bg-white text-[#8A6A3E]"
                }`}
              >
                <span className="font-serif text-xs md:text-sm">
                  {String(index + 1).padStart(2, "0")}
                </span>

                {activeVenue === index && (
                  <span className="absolute -inset-2 animate-ping rounded-full border border-[#B99A60]/40" />
                )}
              </div>

              {/* Event Label */}
              <span
                className={`mt-1.5 whitespace-nowrap rounded-sm px-2 py-1 font-serif text-[9px] tracking-wider shadow-sm md:text-xs ${
                  activeVenue === index
                    ? "bg-[#A88A55] text-white"
                    : "bg-white/90 text-[#80633E]"
                }`}
              >
                {venue.event}
              </span>
            </button>
          ))}

          {/* Compass */}
          <div className="absolute bottom-4 right-4 flex h-10 w-10 flex-col items-center justify-center rounded-full border border-[#C7B28D] bg-white/70 font-serif text-xs text-[#A88A55] md:bottom-5 md:right-5 md:h-12 md:w-12">
            <span>↑</span>
            <span className="text-[8px] tracking-widest">N</span>
          </div>
        </div>
      </div>

      {/* SELECTED VENUE CARD */}
      <div className="mx-auto mt-5 max-w-5xl">
        <div
          key={selectedVenue.id}
          className="grid overflow-hidden rounded-xl border border-[#C7B28D]/70 bg-white shadow-[0_10px_30px_rgba(95,70,40,0.06)] md:grid-cols-2"
          style={{
            animation: "venueReveal 0.4s ease both",
          }}
        >
          {/* Venue Image */}
          <div className="relative h-48 overflow-hidden md:h-[250px]">
            <img
              src={selectedVenue.image}
              alt={selectedVenue.event}
              className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>

          {/* Compact Venue Details */}
          <div className="flex flex-col items-center justify-center px-4 py-5 text-center md:px-6 md:py-6">
            <h3 className="font-serif text-3xl font-light text-[#6D5237] md:text-4xl">
              {selectedVenue.event}
            </h3>

            <div className="my-3 flex items-center gap-3">
              <span className="h-px w-8 bg-[#B99A60]" />
              <span className="text-[#A88A55]">✦</span>
              <span className="h-px w-8 bg-[#B99A60]" />
            </div>

            <a
              href={selectedVenue.mapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="font-serif text-xl text-[#80633E] underline decoration-[#B99A60]/50 underline-offset-4 transition hover:text-[#A88A55] md:text-2xl"
            >
              {selectedVenue.title} ↗
            </a>
          </div>
        </div>

        {/* Venue Navigation */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
          {venues.map((venue, index) => (
            <button
              key={venue.id}
              onClick={() => setActiveVenue(index)}
              className={`rounded-full border px-4 py-1.5 font-serif text-[10px] tracking-wider transition-all duration-300 md:px-5 md:py-2 md:text-xs ${
                activeVenue === index
                  ? "border-[#A88A55] bg-[#A88A55] text-white"
                  : "border-[#B99A60]/50 bg-transparent text-[#80633E] hover:bg-[#D7C5A3]/40"
              }`}
            >
              {String(index + 1).padStart(2, "0")} · {venue.event}
            </button>
          ))}
        </div>
      </div>

      {/* Animations */}
      <style>
        {`
          @keyframes venueReveal {
            from {
              opacity: 0;
              transform: translateY(12px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes routeFlow {
            to {
              stroke-dashoffset: -40;
            }
          }

          .venue-route {
            animation: routeFlow 8s linear infinite;
          }
        `}
      </style>
    </section>
  );
}
