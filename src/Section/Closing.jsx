
export default function Closing() {
  return (
    <section
      id="closing"
      className="relative w-full overflow-hidden bg-white px-5 py-10"
    >
      {/* Vintage Paper Texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 5px, rgba(153,125,82,0.08) 6px)",
        }}
      />

      {/* Decorative Frame */}
      <div className="relative mx-auto flex min-h-[390px] w-full max-w-sm flex-col items-center justify-center px-5 py-8 text-center">

        {/* Top Floral Ornament */}
        <svg
          viewBox="0 0 300 55"
          className="mb-5 w-full max-w-[250px]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 28 C60 28, 90 25, 150 28 C210 25, 240 28, 290 28"
            stroke="#B69A63"
            strokeWidth="1"
          />

          {/* Center Flower */}
          <g transform="translate(150 27)">
            <ellipse rx="5" ry="12" fill="#D6B58A" transform="rotate(0)" />
            <ellipse rx="5" ry="12" fill="#D6B58A" transform="rotate(45)" />
            <ellipse rx="5" ry="12" fill="#D6B58A" transform="rotate(90)" />
            <ellipse rx="5" ry="12" fill="#D6B58A" transform="rotate(135)" />
            <circle r="4" fill="#9D7651" />
          </g>

          {/* Side Flowers */}
          {[55, 80, 105, 195, 220, 245].map((x, i) => (
            <g key={i} transform={`translate(${x} 27)`}>
              <ellipse
                rx="3"
                ry="7"
                fill="#C7A77D"
                transform={`rotate(${i * 30})`}
              />
              <ellipse
                rx="3"
                ry="7"
                fill="#D7BFA0"
                transform={`rotate(${i * 30 + 60})`}
              />
              <circle r="2.5" fill="#9D7651" />
            </g>
          ))}

          {/* Leaves */}
          <path
            d="M30 28 Q45 8 60 20 Q45 28 30 28
               M75 28 Q90 45 105 32 Q90 28 75 28
               M195 28 Q210 8 225 20 Q210 28 195 28
               M240 28 Q255 45 270 32 Q255 28 240 28"
            fill="#B6A17B"
          />
        </svg>

        {/* Main Heading */}
        <h2 className="font-serif text-3xl font-medium leading-tight text-[#98465D] sm:text-4xl">
          Come be part
          <br />
          of our day
        </h2>

        {/* Couple Names */}
        <p className="mt-4 font-serif text-[9px] tracking-[0.28em] text-[#94784E]">
          WITH LOVE, ASHISH & DEEPALI
        </p>

        {/* Minimal Divider */}
        <div className="mt-5 flex items-center gap-2">
          <span className="h-px w-5 bg-[#C5A56C]" />
          <span className="text-[10px] text-[#B58B50]">✦</span>
          <span className="h-px w-5 bg-[#C5A56C]" />
        </div>

        {/* Small Decorative Divider */}
        <div className="mt-12 flex w-full items-center justify-center gap-2">
          <span className="text-[8px] text-[#B47A83]">•</span>
          <svg
            viewBox="0 0 120 18"
            className="w-24"
            fill="none"
          >
            <path
              d="M2 9 C20 1, 35 17, 60 9 C85 1, 100 17, 118 9"
              stroke="#B47A83"
              strokeWidth="0.8"
            />
            <circle cx="60" cy="9" r="3" fill="#B47A83" />
            <circle cx="48" cy="9" r="1.5" fill="#B47A83" />
            <circle cx="72" cy="9" r="1.5" fill="#B47A83" />
          </svg>
          <span className="text-[8px] text-[#B47A83]">•</span>
        </div>

        {/* Closing Message */}
        <p className="mt-7 font-serif text-sm text-[#704D3B]">
          We can't wait to celebrate with you
        </p>

        {/* Footer */}
        <p className="mt-4 font-serif text-[16px]  text-[#9C805B] ">
          Made by Profiles
        </p>
      </div>
    </section>
  );
}
