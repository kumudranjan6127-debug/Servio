/**
 * Bilingual eyebrow — one beautifully-set Devanagari word paired with its
 * English label (e.g. सेवाएँ · Services). The Indic word uses the real
 * Devanagari face via `font-indic` and is marked `lang="hi"` for correct
 * shaping and accessibility. Use sparingly — once per major section.
 */
export function DevanagariEyebrow({
  hi,
  en,
  className = "",
}: {
  hi: string;
  en: string;
  className?: string;
}) {
  return (
    <span className={`eyebrow inline-flex items-center gap-2 text-gold ${className}`}>
      <span lang="hi" className="font-indic normal-case tracking-normal text-[1.15em] leading-none">
        {hi}
      </span>
      <span aria-hidden className="opacity-50">
        ·
      </span>
      <span>{en}</span>
    </span>
  );
}
