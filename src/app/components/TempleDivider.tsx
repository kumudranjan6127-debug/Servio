import { cn } from "./ui/utils";

/**
 * An ornamental section separator: an engraved brass rule converging on a small
 * lotus-bud / temple-step finial at the centre. Marks the rhythm between
 * sections without the weight of a full band.
 */
export function TempleDivider({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn("mx-auto flex max-w-3xl items-center gap-4 px-6 py-8 text-brass", className)}
    >
      <span
        className="h-px flex-1"
        style={{ background: "linear-gradient(to right, transparent, color-mix(in oklch, var(--brass) 55%, transparent))" }}
      />
      <svg viewBox="0 0 48 26" className="h-5 w-12 shrink-0" fill="none" stroke="currentColor" strokeWidth={1}>
        {/* central lotus bud */}
        <path d="M24 3 C 19 9, 19 16, 24 23 C 29 16, 29 9, 24 3 Z" />
        {/* flanking temple-step curls */}
        <path d="M13 13 q5.5 -5 11 0 q5.5 5 11 0" strokeOpacity={0.55} />
        <circle cx="24" cy="13" r="1.4" fill="currentColor" stroke="none" />
        <circle cx="6" cy="13" r="1.1" fill="currentColor" stroke="none" opacity={0.7} />
        <circle cx="42" cy="13" r="1.1" fill="currentColor" stroke="none" opacity={0.7} />
      </svg>
      <span
        className="h-px flex-1"
        style={{ background: "linear-gradient(to left, transparent, color-mix(in oklch, var(--brass) 55%, transparent))" }}
      />
    </div>
  );
}
