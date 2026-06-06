import { useCallback, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { navSections } from '../data/navigation';
import { pageContentRef, setTransitionDirection } from './pageTransitionState';

const orderedPaths = navSections.map((s) => s.path);

export function usePageNavigation() {
  const location = useLocation();
  const navigate = useNavigate();

  const currentIndex = useMemo(
    () => orderedPaths.indexOf(location.pathname),
    [location.pathname],
  );

  const isFirst = currentIndex <= 0;
  const isLast = currentIndex >= orderedPaths.length - 1;

  const animateExit = useCallback(
    (targetPath: string, dir: 1 | -1) => {
      const el = pageContentRef.current;
      if (!el) {
        navigate(targetPath);
        return;
      }

      gsap.killTweensOf(el);

      const yOffset = dir === 1 ? -30 : 30;

      gsap.to(el, {
        y: yOffset,
        opacity: 0,
        duration: 0.15,
        ease: 'power2.in',
        onComplete: () => {
          setTransitionDirection(dir);
          navigate(targetPath);
        },
      });
    },
    [navigate],
  );

  const goUp = useCallback(() => {
    if (isFirst) return;
    animateExit(orderedPaths[currentIndex - 1], -1);
  }, [isFirst, currentIndex, animateExit]);

  const goDown = useCallback(() => {
    if (isLast) return;
    animateExit(orderedPaths[currentIndex + 1], 1);
  }, [isLast, currentIndex, animateExit]);

  const goTop = useCallback(() => {
    if (isFirst) return;
    animateExit(orderedPaths[0], -1);
  }, [isFirst, animateExit]);

  const goEnd = useCallback(() => {
    if (isLast) return;
    animateExit(orderedPaths[orderedPaths.length - 1], 1);
  }, [isLast, animateExit]);

  return { goUp, goDown, goTop, goEnd, isFirst, isLast };
}
