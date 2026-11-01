import { useEffect, useRef } from 'react';
import { useReducedMotion } from './useReducedMotion';

interface ScrollRevealOptions {
  threshold?: number;
  rootMargin?: string;
  delayMs?: number;
}

/**
 * Hook to trigger a one-shot scroll reveal using IntersectionObserver.
 * Cleans up observer on unmount.
 */
export const useScrollReveal = <T extends HTMLElement = HTMLDivElement>(
  options: ScrollRevealOptions = {}
) => {
  const { threshold = 0.15, rootMargin = '0px 0px -40px 0px', delayMs = 0 } = options;
  const ref = useRef<T>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReduced) {
      el.classList.add('is-revealed');
      return;
    }

    if (typeof IntersectionObserver === 'undefined') {
      el.classList.add('is-revealed');
      return;
    }

    let timeoutId: NodeJS.Timeout | null = null;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (delayMs > 0) {
              timeoutId = setTimeout(() => {
                entry.target.classList.add('is-revealed');
              }, delayMs);
            } else {
              entry.target.classList.add('is-revealed');
            }
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(el);

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, [threshold, rootMargin, delayMs, prefersReduced]);

  return ref;
};
