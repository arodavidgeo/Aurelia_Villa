import React, { useEffect, useRef } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { MOTION_TOKENS } from '../../styles/motionTokens';

/**
 * Custom Cursor Component (Desktop with fine pointer only)
 * - Dot follows pointer directly
 * - Ring trails with lerp factor 0.18
 * - Driven by one requestAnimationFrame loop reading from plain mutable ref
 * - Zero React state updates on mousemove
 * - Pauses on visibilitychange and window mouseleave
 * - Restores native cursor and cancels rAF loop on unmount
 */
export const CustomCursor: React.FC = () => {
  const prefersReduced = useReducedMotion();
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (prefersReduced || typeof window === 'undefined') return;

    // Check if device has fine pointer and hover support
    const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!isFinePointer) return;

    const coords = {
      mouseX: -100,
      mouseY: -100,
      ringX: -100,
      ringY: -100,
      isActive: false,
      cursorType: '' as '' | 'view' | 'explore' | 'link',
      isHoveringInput: false,
    };

    let rafId: number | null = null;
    let isRunning = false;

    const dot = dotRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;

    if (!dot || !ring || !label) return;

    // Hide native cursor only after initialization
    document.body.classList.add('has-custom-cursor');

    const updateLoop = () => {
      if (!coords.isActive || coords.isHoveringInput) {
        dot.style.opacity = '0';
        ring.style.opacity = '0';
        label.style.opacity = '0';
      } else {
        dot.style.opacity = '1';
        ring.style.opacity = '1';
        label.style.opacity = coords.cursorType ? '1' : '0';
      }

      // Direct position for dot
      dot.style.transform = `translate3d(${coords.mouseX}px, ${coords.mouseY}px, 0)`;

      // Lerp trailing position for ring
      coords.ringX += (coords.mouseX - coords.ringX) * MOTION_TOKENS.lerp.cursor;
      coords.ringY += (coords.mouseY - coords.ringY) * MOTION_TOKENS.lerp.cursor;
      ring.style.transform = `translate3d(${coords.ringX}px, ${coords.ringY}px, 0)`;

      // Ring scaling and label based on cursorType
      if (coords.cursorType === 'view') {
        ring.style.width = '64px';
        ring.style.height = '64px';
        label.textContent = 'VIEW';
      } else if (coords.cursorType === 'explore') {
        ring.style.width = '72px';
        ring.style.height = '72px';
        label.textContent = 'EXPLORE';
      } else if (coords.cursorType === 'link') {
        ring.style.width = '48px';
        ring.style.height = '48px';
        label.textContent = '';
      } else {
        ring.style.width = '32px';
        ring.style.height = '32px';
        label.textContent = '';
      }

      if (isRunning) {
        rafId = requestAnimationFrame(updateLoop);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      coords.mouseX = e.clientX;
      coords.mouseY = e.clientY;
      coords.isActive = true;

      // Check target element
      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Preserve native cursor on interactive inputs, maps, and text areas
      const isInput =
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.tagName === 'SELECT' ||
        target.tagName === 'IFRAME' ||
        target.closest('input, textarea, select, iframe');

      coords.isHoveringInput = !!isInput;

      // Check data-cursor attributes
      const cursorTarget = target.closest<HTMLElement>('[data-cursor]');
      if (cursorTarget) {
        const val = cursorTarget.getAttribute('data-cursor');
        coords.cursorType = (val as 'view' | 'explore' | 'link') || 'link';
      } else if (target.closest('a, button, [role="button"], [role="tab"]')) {
        coords.cursorType = 'link';
      } else {
        coords.cursorType = '';
      }

      if (!isRunning) {
        isRunning = true;
        rafId = requestAnimationFrame(updateLoop);
      }
    };

    const handleMouseLeave = () => {
      coords.isActive = false;
      isRunning = false;
      if (rafId) cancelAnimationFrame(rafId);
      if (dot && ring) {
        dot.style.opacity = '0';
        ring.style.opacity = '0';
      }
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        coords.isActive = false;
        isRunning = false;
        if (rafId) cancelAnimationFrame(rafId);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      document.body.classList.remove('has-custom-cursor');
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [prefersReduced]);

  if (prefersReduced) return null;

  return (
    <>
      {/* Precision Center Dot */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-theme-accent pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 opacity-0 transition-opacity duration-150"
      />

      {/* Trailing Lag Ring */}
      <div
        ref={ringRef}
        aria-hidden="true"
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-theme-accent pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 opacity-0 flex items-center justify-center transition-[width,height,opacity] duration-200"
      >
        <span
          ref={labelRef}
          className="text-[9px] font-sans tracking-widest font-semibold text-theme-accent select-none pointer-events-none opacity-0"
        />
      </div>
    </>
  );
};

