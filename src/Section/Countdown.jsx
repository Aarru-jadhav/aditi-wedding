
import { useState, useEffect } from "react";

const weddingDate = new Date("2026-11-24T00:00:00+05:30").getTime();

export default function Countdown() {
  const calculateTime = () => {
    const now = new Date().getTime();
    const difference = weddingDate - now;

    if (difference <= 0) {
      return {
        days: "00",
        hours: "00",
        minutes: "00",
        seconds: "00",
        completed: true,
      };
    }

    return {
      days: String(Math.floor(difference / (1000 * 60 * 60 * 24))).padStart(2, "0"),
      hours: String(Math.floor((difference / (1000 * 60 * 60)) % 24)).padStart(2, "0"),
      minutes: String(Math.floor((difference / (1000 * 60)) % 60)).padStart(2, "0"),
      seconds: String(Math.floor((difference / 1000) % 60)).padStart(2, "0"),
      completed: false,
    };
  };

  const [time, setTime] = useState(calculateTime);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(calculateTime());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const countdownItems = [
    { label: "DAYS", value: time.days },
    { label: "HOURS", value: time.hours },
    { label: "MINUTES", value: time.minutes },
    { label: "SECONDS", value: time.seconds },
  ];

  return (
    <section
      id="countdown"
      className="relative w-full overflow-hidden bg-white px-3 py-6 text-[#6D5237]"
    >
      {/* Main Content */}
      <div className="relative z-10 mx-auto w-full max-w-2xl text-center">

        {/* Heading */}
        <h2 className="font-serif text-3xl font-light text-[#6D5237] sm:text-4xl">
          The Countdown
        </h2>

        {/* Wedding Date */}
        <div className="mt-3">
          <span className="font-serif text-[10px] tracking-[0.2em] text-[#A88A55] sm:text-xs">
            24 · NOVEMBER · 2026
          </span>
        </div>

        {/* Countdown */}
        <div className="mx-auto mt-5 grid w-full max-w-xs grid-cols-4 gap-2 sm:max-w-sm sm:gap-3">

          {countdownItems.map((item) => (
            <div
              key={item.label}
              className="flex flex-col items-center justify-center"
            >
              {/* Circular Number */}
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#B99A60]/60 bg-[#FAF7F0] sm:h-14 sm:w-14">
                <span
                  key={`${item.label}-${item.value}`}
                  className="font-serif text-xl font-light text-[#6D5237] sm:text-2xl"
                  style={{
                    animation: "countdownFlip 0.5s ease",
                  }}
                >
                  {item.value}
                </span>
              </div>

              {/* Label */}
              <span className="mt-1.5 font-serif text-[7px] tracking-[0.15em] text-[#A88A55] sm:text-[9px]">
                {item.label}
              </span>
            </div>
          ))}
        </div>

        {/* Bottom Message */}
        <div className="mt-4">
          {time.completed ? (
            <p className="font-serif text-sm italic text-[#80633E]">
              The Celebration Begins ✦
            </p>
          ) : (
            <p className="font-serif text-xs italic text-[#80633E] sm:text-sm">
              A beautiful beginning awaits...
            </p>
          )}
        </div>
      </div>

      {/* Animation */}
      <style>
        {`
          @keyframes countdownFlip {
            from {
              opacity: 0.3;
              transform: translateY(-3px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </section>
  );
}
