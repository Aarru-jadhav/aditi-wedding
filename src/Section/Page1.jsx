

import React, { useState } from "react";
import weddingHero from "../assets/Video/wedding-hero.mp4";
import weddingLogo from "../assets/Images/Wedding logo.webp";

const REVEAL_AT = 4; // Curtain खुलने का समय (seconds)

const Page1 = () => {
  const [showNames, setShowNames] = useState(false);

  const handleVideoTime = (e) => {
    const currentTime = e.currentTarget.currentTime;
    setShowNames(currentTime >= REVEAL_AT);
  };

  return (
    <section className="relative w-full h-[100svh] overflow-hidden bg-[#2b1b13]">

      {/* Background Wedding Video */}
      <video
       className="absolute inset-0 w-full h-full object-contain max-md:object-cover"
        src={weddingHero}
        autoPlay
        muted
        playsInline
        preload="auto"
        onTimeUpdate={handleVideoTime}
      />

      {/* Wedding Logo & Names Reveal */}
      <div
        className={`
          absolute z-10
          left-[50%] top-[50%]
          -translate-x-1/2 -translate-y-1/2
          w-[55%] sm:w-[45%] md:w-[38%]
          max-w-[300px]
          text-center
          pointer-events-none
          transition-all duration-[1800ms] ease-out
          ${
            showNames
              ? "opacity-100 scale-100"
              : "opacity-0 scale-90"
          }
        `}
      >

        {/* Wedding Logo */}
        <img
  src={weddingLogo}
  alt="Wedding Logo"
  className="
    w-[clamp(90px,20vw,110px)]
    max-h-[12vh]
    h-auto
    object-contain
    mx-auto
    mb-2
  "
  loading="eager"
  fetchPriority="high"
/>

        {/* Wedding Heading */}
        <p
          className="
            text-[#8b4b2b]
            text-[clamp(14px,1.4vw,13px)]
            tracking-[0.15em]
            mb-[1.5vh]
          "
        >
          THE WEDDING OF
        </p>

        {/* Couple Names */}
        <h1
          className="
            font-serif
            text-[#8b4b2b]
            text-[clamp(22px,4vw,42px)]
            leading-tight
          "
        >
          Ashish

          <span
            className="
              block
              text-[#b68b45]
              text-[clamp(20px,3vw,30px)]
              my-[1vh]
            "
          >
            &
          </span>

          Deepali
        </h1>

      </div>
    </section>
  );
};

export default Page1;
