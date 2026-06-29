import { useEffect, useState } from "react";

/**
 * Subscribe to a CSS media query. SSR-safe and resolved synchronously on first
 * render (so visuals never flip after mount — same discipline as useAppLoading).
 */
export function useMediaQuery(query: string): boolean {
  const read = () =>
    typeof window !== "undefined" && typeof window.matchMedia === "function"
      ? window.matchMedia(query).matches
      : false;

  const [matches, setMatches] = useState<boolean>(read);

  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") return;
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);
    onChange();
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [query]);

  return matches;
}

/** User prefers reduced data usage (data-saver). Gate heavy media / WebGL. */
export const useReducedData = () => useMediaQuery("(prefers-reduced-data: reduce)");

/** User prefers reduced transparency. Gate glass blur → solid surfaces. */
export const useReducedTransparency = () =>
  useMediaQuery("(prefers-reduced-transparency: reduce)");
