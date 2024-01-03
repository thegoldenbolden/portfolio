'use client';
import { useEffect, useState } from 'react';

type MoveSpotlight = (e: MouseEvent) => void;

function throttle(fn: MoveSpotlight, wait: number): MoveSpotlight {
  let time = Date.now();
  return function cb(e) {
    if (time + wait - Date.now() < 0) {
      fn(e);
      time = Date.now();
    }
  };
}

export function Spotlight(): React.ReactNode {
  const [isTouch, setIsTouch] = useState<boolean | null>(null);

  useEffect(() => {
    const touch =
      navigator.maxTouchPoints || 'ontouchstart' in document.documentElement;

    if (touch) {
      setIsTouch(true);
      return;
    }

    const spotlightEl = document.getElementById('spotlight');
    if (!spotlightEl) return;

    const move = throttle((e) => {
      const { clientY, clientX } = e;
      const rect = spotlightEl.getBoundingClientRect();
      const centerY = clientY - Math.floor(rect.height / 2);
      const centerX = clientX - Math.floor(rect.width / 2);
      spotlightEl.style.top = `${centerY}px`;
      spotlightEl.style.left = `${centerX}px`;
    }, 60);

    document.addEventListener('mousemove', move);
    return () => {
      document.removeEventListener('mousemove', move);
    };
  }, []);

  if (isTouch) return null;

  return (
    <span
      style={{
        backgroundImage:
          'radial-gradient(ellipse at 25vw 25vw,hsl(var(--spotlight)), transparent 25%)',
      }}
      id="spotlight"
      className="pointer-events-none fixed -z-10 size-[50vw] rounded-full"
    />
  );
}
