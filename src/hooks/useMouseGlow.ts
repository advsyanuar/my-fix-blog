import { useEffect, useRef } from 'react';

export function useMouseGlow<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const el2: T = el;

    function handler(e: MouseEvent) {
      const rect = el2.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      el2.style.setProperty('--mouse-x', `${x}px`);
      el2.style.setProperty('--mouse-y', `${y}px`);
    }

    el2.addEventListener('mousemove', handler);
    return () => el2.removeEventListener('mousemove', handler);
  }, []);

  return ref;
}
