/**
 * Toran — the scalloped doorway garland that signals welcome. Pin it to the top
 * of a section (it hangs down). Pure SVG, stretches to full width.
 */
export function Toran({
  className = "",
  color = "var(--gold)",
  count = 14,
  drop = 30,
}: {
  className?: string;
  color?: string;
  count?: number;
  drop?: number;
}) {
  const width = 1200;
  const w = width / count;
  const scallops = Array.from({ length: count }, (_, i) => i);
  return (
    <svg
      aria-hidden
      viewBox={`0 0 ${width} ${drop + 12}`}
      preserveAspectRatio="none"
      fill="none"
      stroke={color}
      className={`pointer-events-none w-full ${className}`}
    >
      {scallops.map((i) => {
        const x = i * w;
        return (
          <g key={i}>
            <path d={`M${x} 0 Q ${x + w / 2} ${drop} ${x + w} 0`} strokeWidth={1.2} />
            <circle cx={x + w / 2} cy={drop} r={2.4} fill={color} stroke="none" />
            <line x1={x + w / 2} y1={drop} x2={x + w / 2} y2={drop + 8} strokeWidth={1} />
          </g>
        );
      })}
    </svg>
  );
}
