/**
 * Canonical motion vocabulary for the public site.
 *
 * One source of truth for easing curves, durations, and reveal distances so the
 * whole site shares a single rhythm (this ends the 4-curve drift the audit found).
 *
 * `EASE.enter` is mirrored as `--ease-enter` in `src/styles/theme.css`, so CSS
 * keyframes and JS (motion/react) animations agree on the same curve.
 */

/** Cubic-bezier control points, typed as 4-tuples for motion/react's `ease`. */
type Bezier = [number, number, number, number];

export const EASE: { enter: Bezier; exit: Bezier; inOut: Bezier } = {
  /** Expressive "settle" — entrances, reveals, springy resolves. */
  enter: [0.22, 1, 0.36, 1],
  /** Quiet exit — fades and dismissals. */
  exit: [0.4, 0, 0.2, 1],
  /** Symmetric — looping / scrubbed motion. */
  inOut: [0.65, 0, 0.35, 1],
};

/** Durations in seconds. */
export const DUR = { fast: 0.4, base: 0.6, slow: 0.9 } as const;

/** Reveal travel distances in px. */
export const DIST = { sm: 16, md: 28, lg: 48 } as const;

/** Default stagger (seconds) between siblings in a RevealGroup. */
export const STAGGER = 0.08;
