/**
 * Zari (Banarasi gold thread) hairline — the connective tissue used as a divider
 * or rim accent. Fades in/out at the ends so it reads as woven, not drawn.
 */
export function ZariHairline({
  className = "",
  vertical = false,
}: {
  className?: string;
  vertical?: boolean;
}) {
  const axis = vertical ? "180deg" : "90deg";
  return (
    <div
      aria-hidden
      className={`${vertical ? "w-px h-full" : "h-px w-full"} ${className}`}
      style={{ background: `linear-gradient(${axis}, transparent, var(--gold), transparent)` }}
    />
  );
}
