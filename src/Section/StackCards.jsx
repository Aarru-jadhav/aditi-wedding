
import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import haldiImage from "../assets/Images/haldi.jpg";
import mehndiImage from "../assets/Images/mehndi.jpg";
import galaImage from "../assets/Images/gala.jpg";
import receptionImage from "../assets/Images/reception.jpg";

gsap.registerPlugin(ScrollTrigger);

const cardsData = [
  {
    title: "Haldi",
    number: "01",
    date: "12 Feb 2027",
    time: "10:00 AM",
    venue: "Pine Courtyard",
    wear: "Yellow",
    bgImage: haldiImage,
    accent: "#B69B70",
    mapsQuery: "Pine Courtyard",
  },
  {
    title: "Mehndi",
    number: "02",
    date: "13 Feb 2027",
    time: "04:00 PM",
    venue: "Venue Name",
    wear: "Green",
    bgImage: mehndiImage,
    accent: "#849276",
    mapsQuery: "Venue Name",
  },
  {
    title: "Gala Dinner",
    number: "03",
    date: "13 Feb 2027",
    time: "07:00 PM",
    venue: "Venue Name",
    wear: "Elegant Evening",
    bgImage: galaImage,
    accent: "#B18B60",
    mapsQuery: "Venue Name",
  },
  {
    title: "Reception",
    number: "04",
    date: "14 Feb 2027",
    time: "07:00 PM",
    venue: "Venue Name",
    wear: "Formal",
    bgImage: receptionImage,
    accent: "#A7865B",
    mapsQuery: "Venue Name",
  },
];

const StackCards = () => {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(".stack-card");

      cards.forEach((card, index) => {
        if (index === 0) return;

        gsap.set(card, {
          yPercent: 100,
        });
      });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${cards.length * 100}%`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      cards.forEach((card, index) => {
        if (index === 0) return;

        const previousCard = cards[index - 1];

        timeline.to(
          previousCard,
          {
            scale: 0.88,
            opacity: 0.45,
            duration: 1,
            ease: "none",
          },
          index - 1
        );

        timeline.to(
          card,
          {
            yPercent: 0,
            duration: 1,
            ease: "none",
          },
          index - 1
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-[#F2EADF]"
    >

      {/* STATIC HEADING - CARDS KE BAHAR */}
      <div className="absolute top-[5%] left-0 z-50 w-full px-4 text-center">

        <p className="font-serif italic text-[#A58A66]
          text-xl sm:text-2xl mb-2">
          Our Wedding
        </p>

        <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl
          text-[#6B4E3D] tracking-wide">
          When & Where
        </h2>

        {/* Decorative Divider */}
       
      </div>

      {/* EVENT CARDS */}
      <div className="absolute inset-0">

        {cardsData.map((item, index) => (
          <div
            key={item.number}
           className="stack-card absolute top-[22%] bottom-[5%]
  left-0 right-0 flex items-end justify-center
  overflow-hidden rounded-[30px] sm:rounded-[40px]
  px-4 pb-8 sm:px-8 sm:pb-12"
            style={{
              zIndex: index + 1,
            }}
          >

            {/* INDIVIDUAL CARD BACKGROUND IMAGE */}
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat rounded-[30px] sm:rounded-[40px] overflow-hidden"
              style={{
                backgroundImage: `url(${item.bgImage})`,
              }}
            />

            {/* LIGHT IMAGE OVERLAY */}
            <div className="absolute inset-0 bg-[#F3E9DC]/10" />

            {/* EVENT DETAILS BOX */}
            <div
              className="relative z-10 w-full max-w-[850px]
  rounded-[22px] sm:rounded-[28px]
  border border-[#D6B879]/70
  bg-[#FFF8EB]/80
  backdrop-blur-[2px]
  shadow-[0_8px_25px_rgba(60,40,20,0.12)]"
            >

              <div className="flex items-start gap-4 sm:gap-6
                p-4 sm:p-7 md:p-9">

                {/* EVENT NUMBER */}
                <div
                  className="flex shrink-0 items-center justify-center
                    w-[64px] h-[64px] sm:w-[100px] sm:h-[100px]
                    rounded-[12px] sm:rounded-[16px]
                    font-serif text-sm sm:text-xl"
                  style={{
                    backgroundColor: "#B69B70" === item.accent ? "#B69B70" : "#D6B879",
                  }}
                >
                  {item.number}
                </div>

                {/* EVENT DETAILS */}
                <div className="flex-1 min-w-0">

                  <h3 className="font-serif text-2xl sm:text-3xl
                    md:text-4xl text-[#4A3023] mb-3">
                    {item.title}
                  </h3>

                  <div className="space-y-1.5 sm:space-y-2
                    text-xs sm:text-sm md:text-base
                    text-[#4A3023]">

                    <div className="flex gap-3">
                      <span className="w-12 sm:w-14 text-[#4A3023]">
                        Date
                      </span>
                      <span>{item.date}</span>
                    </div>

                    <div className="flex gap-3">
                      <span className="w-12 sm:w-14 text-[#4A3023]">
                        Time
                      </span>
                      <span>{item.time}</span>
                    </div>

                    <div className="flex gap-3">
                      <span className="w-12 sm:w-14 text-[#4A3023]">
                        Venue
                      </span>
                      <span>{item.venue}</span>
                    </div>

                    <div className="flex gap-3">
                      <span className="w-12 sm:w-14 text-[#4A3023]">
                        Wear
                      </span>
                      <span>{item.wear}</span>
                    </div>

                  </div>

                  {/* DIRECTIONS */}
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.mapsQuery)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center
                      mt-4 sm:mt-6 px-5 sm:px-7 py-2.5
                      rounded-full border border-[#B19A63]
                      text-[10px] sm:text-xs tracking-[0.15em]
                      text-[#7B6542]
                      hover:bg-[#B19A63] hover:text-white
                      transition-all duration-300"
                  >
                    DIRECTIONS
                  </a>

                </div>
              </div>
            </div>

          </div>
        ))}

      </div>

    </section>
  );
};

export default StackCards;
