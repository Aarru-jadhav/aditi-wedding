
import React from "react";
import couplePhoto from "../assets/Images/couple.jpeg";

const TheCouple = () => {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#F0E4D2] text-[#702B35]">

      {/* BACKGROUND TEXTURE */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.13]"
        style={{
          backgroundImage:
            "radial-gradient(#A98755 0.7px, transparent 0.7px)",
          backgroundSize: "8px 8px",
        }}
      />

      {/* SOFT CENTER LIGHT */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,rgba(255,249,235,0.85),transparent_75%)]" />

      {/* ================================= */}
      {/* ROYAL PALACE ENTRANCE GATE */}
      {/* ================================= */}

      <div className="pointer-events-none absolute left-0 top-0 z-0 h-[230px] w-full sm:h-[270px]">

        <svg
          viewBox="0 0 600 230"
          preserveAspectRatio="none"
          className="h-full w-full overflow-visible"
          fill="none"
        >

          {/* OUTER PALACE GATE */}
          <path
            d="
              M 14 230
              L 14 132
              Q 14 108 40 91
              L 105 52
              Q 135 29 180 28
              L 250 31
              Q 282 32 292 12
              L 300 0
              L 308 12
              Q 318 32 350 31
              L 420 28
              Q 465 29 495 52
              L 560 91
              Q 586 108 586 132
              L 586 230
            "
            stroke="#B9955C"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />

          {/* INNER PALACE GATE LINE */}
          <path
            d="
              M 22 230
              L 22 135
              Q 22 113 46 98
              L 110 60
              Q 140 38 181 37
              L 250 40
              Q 281 41 295 21
              L 300 13
              L 305 21
              Q 319 41 350 40
              L 419 37
              Q 460 38 490 60
              L 554 98
              Q 578 113 578 135
              L 578 230
            "
            stroke="#D2B77F"
            strokeWidth="1"
            strokeLinejoin="round"
          />

          {/* CENTRAL CREST DETAIL */}
          <path
            d="
              M 280 34
              Q 293 29 300 8
              Q 307 29 320 34
            "
            stroke="#B9955C"
            strokeWidth="1.5"
          />

          {/* SMALL CREST DECORATION */}
          <path
            d="
              M 300 3
              L 300 19
              M 293 11
              L 307 11
            "
            stroke="#B9955C"
            strokeWidth="1.5"
          />

          {/* SMALL SIDE ARCH DETAILS */}
          <path
            d="M 14 145 Q 30 139 42 145"
            stroke="#B9955C"
            strokeWidth="1"
          />

          <path
            d="M 586 145 Q 570 139 558 145"
            stroke="#B9955C"
            strokeWidth="1"
          />

        </svg>
      </div>

      {/* SIDE ARCHITECTURAL BORDERS */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">

        {/* LEFT SIDE */}
        <div className="absolute bottom-[8%] left-3 top-[230px] w-px bg-[#B9955C]/50 sm:left-7 sm:top-[270px]" />

        <div
          className="absolute bottom-[15%] left-[7px] top-[250px] w-5 opacity-[0.16] sm:left-4 sm:top-[290px] sm:w-8"
          style={{
            backgroundImage: `
              repeating-linear-gradient(
                45deg,
                #987342 0px,
                #987342 1px,
                transparent 1px,
                transparent 10px
              ),
              repeating-linear-gradient(
                -45deg,
                #987342 0px,
                #987342 1px,
                transparent 1px,
                transparent 10px
              )
            `,
          }}
        />

        {/* RIGHT SIDE */}
        <div className="absolute bottom-[8%] right-3 top-[230px] w-px bg-[#B9955C]/50 sm:right-7 sm:top-[270px]" />

        <div
          className="absolute bottom-[15%] right-[7px] top-[250px] w-5 opacity-[0.16] sm:right-4 sm:top-[290px] sm:w-8"
          style={{
            backgroundImage: `
              repeating-linear-gradient(
                45deg,
                #987342 0px,
                #987342 1px,
                transparent 1px,
                transparent 10px
              ),
              repeating-linear-gradient(
                -45deg,
                #987342 0px,
                #987342 1px,
                transparent 1px,
                transparent 10px
              )
            `,
          }}
        />

        {/* CORNER DETAILS */}
        <span className="absolute bottom-4 left-4 text-xl text-[#B9955C]/70 sm:left-8">
          ❧
        </span>

        <span className="absolute bottom-4 right-4 -scale-x-100 text-xl text-[#B9955C]/70 sm:right-8">
          ❧
        </span>

      </div>

      {/* ================================= */}
      {/* MAIN CONTENT */}
      {/* ================================= */}

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[650px] flex-col items-center px-10 pb-14 pt-16 sm:px-16 sm:pt-20">

        {/* TOP HEADING */}
        <div className="mb-4 flex flex-col items-center">

          <span className="text-2xl text-[#B9955C]">
            ✧
          </span>

          <div className="mt-2 flex items-center gap-3">
            <span className="h-px w-12 bg-[#B9955C]" />
            <span className="text-xs text-[#B9955C]">✦</span>
            <span className="h-px w-12 bg-[#B9955C]" />
          </div>

        </div>

        {/* SECTION TITLE */}
        <p className="mb-3 text-[9px] font-medium uppercase tracking-[0.4em] text-[#A17C47] sm:text-[11px]">
          A Royal Celebration
        </p>

        <h2 className="font-serif text-4xl font-normal tracking-wide text-[#702B35] sm:text-5xl">
          The Couple
        </h2>

        <p className="mt-3 text-[9px] tracking-[0.3em] text-[#92734F] sm:text-[10px]">
          TWO SOULS · ONE BEAUTIFUL JOURNEY
        </p>

        {/* GOLD DIVIDER */}
        <div className="my-8 flex w-full items-center justify-center gap-3">
          <span className="h-px w-14 bg-[#B9955C]/70" />
          <span className="text-[#B9955C]">✧</span>
          <span className="h-px w-14 bg-[#B9955C]/70" />
        </div>

        {/* ================================= */}
        {/* COUPLE PHOTO - ROYAL ARCH FRAME */}
        {/* ================================= */}

        <div className="relative w-full max-w-[390px] px-2">

          {/* OUTER GOLD ARCH */}
          <div
            className="absolute -inset-[6px] border-2 border-[#B9955C]"
            style={{
              borderRadius: "50% 50% 0 0 / 18% 18% 0 0",
            }}
          />

          {/* INNER GOLD ARCH */}
          <div
            className="absolute -inset-[1px] border border-[#D5B77D]"
            style={{
              borderRadius: "50% 50% 0 0 / 18% 18% 0 0",
            }}
          />

          {/* COUPLE IMAGE */}
          <div
            className="relative overflow-hidden bg-[#E8DCC7]"
            style={{
              borderRadius: "50% 50% 0 0 / 18% 18% 0 0",
            }}
          >
            <img
              src={couplePhoto}
              alt="Aditi and Somya"
              className="block h-auto w-full object-contain"
            />
          </div>

          {/* ARCH TOP ORNAMENT */}
          <div className="absolute -top-5 left-1/2 -translate-x-1/2 text-2xl text-[#B9955C]">
            ✦
          </div>

          {/* SIDE ARCH ORNAMENTS */}
          <div className="absolute -left-3 top-[18%] text-lg text-[#B9955C]">
            ❧
          </div>

          <div className="absolute -right-3 top-[18%] -scale-x-100 text-lg text-[#B9955C]">
            ❧
          </div>

        </div>

        {/* ================================= */}
        {/* COUPLE NAMES */}
        {/* ================================= */}

        <div className="mt-10 flex flex-col items-center text-center">

          <h3 className="font-['Pacifico'] text-4xl text-[#702B35] sm:text-5xl">
            Aditi
          </h3>

          <div className="my-2 flex items-center gap-4">
            <span className="h-px w-12 bg-[#B9955C]" />

            <span className="font-serif text-3xl text-[#B9955C]">
              &
            </span>

            <span className="h-px w-12 bg-[#B9955C]" />
          </div>

          <h3 className="font-['Pacifico'] text-4xl text-[#702B35] sm:text-5xl">
            Somya
          </h3>

          <p className="mt-4 text-[9px] font-medium uppercase tracking-[0.35em] text-[#A17C47]">
            Together Forever
          </p>

        </div>

        {/* BOTTOM DECORATION */}
        <div className="mt-10 flex w-full items-center justify-center gap-3">
          <span className="h-px w-16 bg-[#B9955C]/70" />
       
          <span className="h-px w-16 bg-[#B9955C]/70" />
        </div>

      </div>

    </section>
  );
};

export default TheCouple;
