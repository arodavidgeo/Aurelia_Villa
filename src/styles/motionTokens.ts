/**
 * Villa Aurelia Motion System Tokens
 * Strict tokens as specified in Section 3 of the Cinematic Interactive Experience Brief.
 * No magic numbers are permitted in components.
 */

export const MOTION_TOKENS = {
  durations: {
    micro: 150,     // 150 ms - micro-interactions, toggles
    button: 200,    // 200 ms - button states, active feedback
    nav: 220,       // 220 ms - navigation drawer, indicators
    image: 400,     // 400 ms - crossfades, image transitions
    reveal: 600,    // 600 ms - scroll reveals, clip-path wipes
  },
  easings: {
    standard: 'cubic-bezier(0.22, 1, 0.36, 1)',  // Natural decelerating ease
    inOut: 'cubic-bezier(0.65, 0, 0.35, 1)',      // Symmetrical ease-in-out
  },
  distances: {
    reveal: 24,     // 24 px scroll reveal displacement
    parallaxMax: 40,// 40 px maximum desktop parallax displacement
    magneticMax: 8, // 8 px maximum magnetic CTA pull
    arrowNudge: 4,  // 4 px button arrow hover nudge
  },
  stagger: {
    step: 70,       // 70 ms stagger interval
    maxSteps: 6,    // At most 6 steps
  },
  lerp: {
    cursor: 0.18,   // Controlled lag factor for trailing cursor ring
  },
  zoom: {
    heroEnd: 1.05,  // Subtle slow architectural hero zoom
    cardHover: 1.03,// Restrained card image zoom
    galleryHover: 1.04,
  },
  breakpoints: {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
  },
} as const;

export type MotionDurations = typeof MOTION_TOKENS.durations;
export type MotionEasings = typeof MOTION_TOKENS.easings;
