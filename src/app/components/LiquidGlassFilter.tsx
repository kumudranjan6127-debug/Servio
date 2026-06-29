/**
 * The SVG displacement filter that gives `.glass[data-refract]` (and
 * `<GlassPanel refract>`) its liquid lensing. Referenced by CSS as
 * `backdrop-filter: … url(#liquid-glass)` — Chromium applies it; Safari/Firefox
 * silently keep the plain blur (graceful fallback). Render once near the app root.
 */
export function LiquidGlassFilter() {
  return (
    <svg
      aria-hidden
      focusable="false"
      style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}
    >
      <defs>
        <filter
          id="liquid-glass"
          x="-20%"
          y="-20%"
          width="140%"
          height="140%"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence type="fractalNoise" baseFrequency="0.008 0.012" numOctaves={2} seed={7} result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale={18} xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
    </svg>
  );
}
