import type { ReactNode } from "react";
import { cn } from "./ui/utils";

/**
 * A single carved corner bracket (top-left orientation). Rotate for the other
 * three corners. Drawn in `currentColor` so the parent sets the metal tone.
 * Double-line L + a brass stud + small temple-step diamond terminals.
 */
function Corner({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 56 56"
      className={cn("absolute h-9 w-9 md:h-12 md:w-12", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.25}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 28 L6 12 Q6 6 12 6 L28 6" />
      <path d="M14 30 L14 18 Q14 15 17 15 L30 15" strokeOpacity={0.5} />
      <circle cx="11" cy="11" r="1.7" fill="currentColor" stroke="none" />
      <path d="M6 31 l3 4 -3 4 -3 -4 z" fill="currentColor" stroke="none" opacity={0.65} />
      <path d="M31 6 l4 3 -4 3 -4 -3 z" fill="currentColor" stroke="none" opacity={0.65} />
    </svg>
  );
}

/**
 * Frames a section like a carved temple panel: four corner brackets + faint
 * engraved side rails, aligned to the content column (max-w-7xl). The whole
 * overlay is `pointer-events-none` and inset within the content padding, so it
 * never clips content or causes horizontal overflow.
 */
export function SectionFrame({
  children,
  className,
  rails = true,
}: {
  children: ReactNode;
  className?: string;
  rails?: boolean;
}) {
  return (
    <div className={cn("relative", className)}>
      {children}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-20 text-brass opacity-70"
      >
        <div className="relative mx-auto h-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <Corner className="left-3 top-3" />
          <Corner className="right-3 top-3 rotate-90" />
          <Corner className="right-3 bottom-3 rotate-180" />
          <Corner className="left-3 bottom-3 -rotate-90" />
          {rails && (
            <>
              <span
                className="absolute inset-y-16 left-4 w-px"
                style={{ background: "linear-gradient(to bottom, transparent, color-mix(in oklch, var(--brass) 28%, transparent), transparent)" }}
              />
              <span
                className="absolute inset-y-16 right-4 w-px"
                style={{ background: "linear-gradient(to bottom, transparent, color-mix(in oklch, var(--brass) 28%, transparent), transparent)" }}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
