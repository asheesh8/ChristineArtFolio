"use client";

import { useEffect, useState } from "react";

const TRACK_HEIGHT = 240;
const BALL_SIZE = 18;
const TRAVEL = TRACK_HEIGHT - BALL_SIZE;

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function update() {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      setProgress(max > 0 ? Math.min(1, Math.max(0, doc.scrollTop / max)) : 0);
    }

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 lg:block"
    >
      <div
        className="relative w-2 overflow-visible rounded-full bg-stone-300/50"
        style={{ height: TRACK_HEIGHT }}
      >
        <div
          className="absolute left-0 top-0 w-full rounded-full bg-sage/70 transition-[height] duration-75 ease-out"
          style={{ height: `${progress * 100}%` }}
        />
        <div
          className="absolute flex items-center justify-center rounded-full bg-stone-950 shadow-md ring-2 ring-[#fbf8f1]"
          style={{
            width: BALL_SIZE,
            height: BALL_SIZE,
            left: "50%",
            top: 0,
            transform: `translateX(-50%) translateY(${progress * TRAVEL}px) rotate(${progress * 1080}deg)`,
          }}
        >
          <span className="block h-[5px] w-[5px] -translate-y-[3px] rounded-full bg-sage" />
        </div>
      </div>
    </div>
  );
}
