import { useEffect, useRef } from 'react';
import { useReducedMotion } from './useReducedMotion';

interface MagneticOptions {
  maxDisplacement?: number; // Maximum 8px displacement per spec
}

/**
 * Hook to apply subtle magnetic displacement on primary CTAs (desktop only).
 * Clean unmount and listener cleanup. Disabled under prefers-reduced-motion.
 */
export const useMagnetic = <T extends HTMLElement = HTMLButtonElement>(
  options: MagneticOptions = {}
) => {
  const { maxDisplacement = 8 } = options;
  const ref = useRef<T>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced || typeof window === 'undefined') return;
    const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!isFinePointer) return;

    const el = ref.current;
    if (!el) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = (e.clientX - centerX) * 0.25;
      const deltaY = (e.clientY - centerY) * 0.25;

      const clampedX = Math.max(-maxDisplacement, Math.min(maxDisplacement, deltaX));
      const clampedY = Math.max(-maxDisplacement, Math.min(maxDisplacement, deltaY));

      el.style.transform = `translate3d(${clampedX}px, ${clampedY}px, 0)`;
    };

    const handleMouseLeave = () => {
      el.style.transform = 'translate3d(0, 0, 0)';
    };

    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
      el.style.transform = '';
    };
  }, [maxDisplacement, prefersReduced]);

  return ref;
};

