import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

declare global {
  interface Window {
    /** The live Lenis instance, exposed so scroll helpers can drive it. */
    __lenis?: Lenis;
  }
}

/**
 * Inertial smooth scroll (Lenis) bridged to GSAP ScrollTrigger through a single
 * rAF loop, so pinned/scrubbed timelines never desync from the scroll position.
 *
 * `enabled` must be false under reduced-motion / data-saver — Lenis simply never
 * instantiates and native scrolling takes over.
 */
export function useSmoothScroll(enabled: boolean): void {
  useEffect(() => {
    if (!enabled) return;

    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    window.__lenis = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      window.__lenis = undefined;
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [enabled]);
}
