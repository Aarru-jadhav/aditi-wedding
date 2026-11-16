
import React from "react";
import bridePhoto from "../assets/Images/aditi.png";
import groomPhoto from "../assets/Images/soumya.png";

const TheCouple = () => {
  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-white text-[#2b1b13]">

      {/* Background Decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
          w-[500px] h-[500px] rounded-full bg-[#d9b8ad]/10 blur-[100px]"
        />
      </div>

      <div className="relative z-10 flex flex-col items-center
        px-5 py-16 sm:py-20">

        {/* Section Heading */}
        <p className="text-[#b68b45] text-[10px] sm:text-xs
          tracking-[0.35em] uppercase mb-3">
          Two Souls, One Journey
        </p>

        <h2 className="font-serif text-4xl sm:text-5xl
          text-[#3b2419] mb-10">
          The Couple
        </h2>

        {/* BRIDE */}
        <div className="flex flex-col items-center text-center">

          {/* Bride Photo */}
          <div className="relative w-[230px] sm:w-[280px] md:w-[300px]">
            <img
              src={bridePhoto}
              alt="Bride Aditi"
              className="w-full h-auto object-contain"
            />
          </div>

          {/* Bride Name */}
          <h3 className="mt-3 font-serif italic
            text-4xl sm:text-5xl text-[#3b2419]">
            Aditi
          </h3>

          {/* Bride Parents */}
          <p className="mt-3 text-sm sm:text-base
            tracking-wide text-[#8b7465]">
            Daughter of Mr. & Mrs. ...
          </p>
        </div>

        {/* CENTER DECORATIVE DESIGN */}
        <div className="flex flex-col items-center my-9 sm:my-12">

          <div className="flex items-center gap-4">
          
          </div>

          {/* Heart Design */}
          <div className="relative flex flex-col items-center mt-3">
            <span className="text-[#d8a69c] text-3xl">
              ♡
            </span>

            <span className="text-[#c9a46a] text-xs tracking-[0.4em] mt-1">
              A FOREVER BOND
            </span>
          </div>

        </div>

        {/* GROOM */}
        <div className="flex flex-col items-center text-center">

          {/* Groom Photo */}
          <div className="relative w-[230px] sm:w-[280px] md:w-[300px]">
            <img
              src={groomPhoto}
              alt="Groom Soumy"
              className="w-full h-auto object-contain"
            />
          </div>

          {/* Groom Name */}
          <h3 className="mt-3 font-serif italic
            text-4xl sm:text-5xl text-[#3b2419]">
            Soumy
          </h3>

          {/* Groom Parents */}
          <p className="mt-3 text-sm sm:text-base
            tracking-wide text-[#8b7465]">
            Son of Mr. & Mrs. ...
          </p>
        </div>

        {/* Bottom Decoration */}
       
      </div>
    </section>
  );
};

export default TheCouple;
