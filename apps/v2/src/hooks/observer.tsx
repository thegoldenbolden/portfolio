'use client';

import { useEffect } from 'react';

export function Observer(): React.ReactNode {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const text = entry.target.id.toLowerCase();
          const el = document.querySelector(`a[href='#${text}']`);
          if (!el) return;

          if (entry.isIntersecting) {
            el.setAttribute('data-active', 'true');
          } else {
            el.setAttribute('data-active', 'false');
          }
        });
      },
      {
        threshold: 0.5,
      },
    );

    const sections = document.getElementsByTagName('section');
    Array.from(sections).forEach((e) => {
      observer.observe(e);
    });

    return () => {
      observer.disconnect();
    };
  }, []);
  return null;
}
