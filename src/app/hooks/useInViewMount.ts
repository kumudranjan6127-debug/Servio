import { useEffect, useRef, useState } from "react";

/**
 * Controls MOUNT (not just animation) of heavy effects: the returned `inView`
 * flips true once the element nears the viewport, then stays mounted. Off-screen
 * sections never instantiate WebGL / rAF loops.
 *
 *   const { ref, inView } = useInViewMount<HTMLDivElement>();
 *   <div ref={ref}>{inView && <CulturalCanvas />}</div>
 */
export function useInViewMount<T extends Element = HTMLDivElement>(rootMargin = "200px") {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin]);

  return { ref, inView };
}
