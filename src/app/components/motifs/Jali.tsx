import { useId } from "react";

/**
 * Mughal jali — an interlocking eight-point-star lattice, tiled as a faint
 * decorative field. For the "glass becomes a pierced screen" effect, apply the
 * `.jali-mask` utility (src/styles/glass.css) to a `.glass` element instead.
 */
export function Jali({
  className = "",
  color = "currentColor",
  opacity = 0.08,
  size = 46,
  strokeWidth = 1,
}: {
  className?: string;
  color?: string;
  opacity?: number;
  size?: number;
  strokeWidth?: number;
}) {
  const id = useId().replace(/[:]/g, "");
  const s = size;
  return (
    <div aria-hidden className={`pointer-events-none ${className}`} style={{ opacity }}>
      <svg width="100%" height="100%" preserveAspectRatio="xMidYMid">
        <defs>
          <pattern id={`jali-${id}`} width={s} height={s} patternUnits="userSpaceOnUse">
            <path
              d={`M${s / 2} 2 L${s - 2} ${s / 2} L${s / 2} ${s - 2} L2 ${s / 2} Z`}
              fill="none"
              stroke={color}
              strokeWidth={strokeWidth}
            />
            <path
              d={`M${s / 2} 2 L${s / 2} ${s - 2} M2 ${s / 2} L${s - 2} ${s / 2}`}
              stroke={color}
              strokeWidth={strokeWidth}
              opacity={0.6}
            />
            <circle cx={s / 2} cy={s / 2} r={s / 7} fill="none" stroke={color} strokeWidth={strokeWidth} />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#jali-${id})`} />
      </svg>
    </div>
  );
}
