'use client';
import { useEffect, useState } from 'react';

function throttle(fn, wait: number) {
  var time = Date.now();
    return function(e) {      
    if ((time + wait - Date.now()) < 0) {
      fn(e);
      time = Date.now();
    }
  }
}

export function Spotlight() {
  const [isTouch, setIsTouch] = useState(null);

  useEffect(() => {
    if (!navigator || !document) return;
    
    const touch = (navigator.maxTouchPoints || 'ontouchstart' in document.documentElement);
    
    if (touch) {
      setIsTouch(true);
      return;
    }


    const spotlightEl = document.getElementById('mouse-light');
    if (!spotlightEl) return;

    const move = throttle((e: MouseEvent) => {
      const { clientY, clientX } = e;
      const rect = spotlightEl.getBoundingClientRect();
      spotlightEl.style.top = clientY - Math.floor(rect.height / 2) + 'px';
      spotlightEl.style.left = clientX - Math.floor(rect.width / 2) + 'px';
    }, 60)

    document.addEventListener('mousemove', move);
    return () => document.removeEventListener('mousemove', move);
  }, []);

  if (isTouch) return null;

  return (
    <span
      style={{
        backgroundImage:
          'radial-gradient(ellipse at 25vw 25vw,hsl(var(--spotlight)), transparent 25%)',
      }}
      id="mouse-light"
      className="pointer-events-none fixed -z-10 size-[50vw] rounded-full"
    />
  );
}
