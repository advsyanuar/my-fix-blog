import { useRef, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { Footer } from './Footer';
import { pageContentRef, transitionDirection } from '../../hooks/pageTransitionState';

export function Layout() {
  const location = useLocation();
  const localRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    pageContentRef.current = localRef.current;
  }, []);

  useEffect(() => {
    const el = localRef.current;
    if (!el) return;

    gsap.killTweensOf(el);

    const dir = transitionDirection;

    if (dir === 1) {
      gsap.fromTo(el, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.25, ease: 'power2.out' });
    } else if (dir === -1) {
      gsap.fromTo(el, { y: -30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.25, ease: 'power2.out' });
    } else {
      gsap.fromTo(el, { opacity: 0 }, { opacity: 1, duration: 0.2, ease: 'power2.out' });
    }
  }, [location]);

  return (
    <>
      <div ref={localRef}>
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
