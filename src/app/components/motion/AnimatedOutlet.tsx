import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useLocation, useOutlet } from "react-router-dom";
import { EASE } from "../../lib/motion";

/**
 * Cross-fades / slides between routes. The scroll reset happens only after the
 * outgoing page has fully exited (Lenis if active, native otherwise), so the
 * fade and the scroll-to-top never fight. Reduced-motion → instant swap.
 */
export function AnimatedOutlet() {
  const location = useLocation();
  const outlet = useOutlet();
  const reduce = useReducedMotion();

  // Key on the top-level path segment only: navigating between nested routes
  // (e.g. dashboard tabs) must NOT remount the whole subtree — the inner
  // <Outlet/> handles those. Only top-level section changes get the transition.
  const segment = "/" + location.pathname.split("/")[1];

  return (
    <AnimatePresence
      mode="wait"
      onExitComplete={() => {
        if (window.__lenis) window.__lenis.scrollTo(0, { immediate: true });
        else window.scrollTo(0, 0);
      }}
    >
      <motion.div
        key={segment}
        initial={reduce ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={reduce ? { opacity: 1 } : { opacity: 0, y: -8 }}
        transition={{ duration: reduce ? 0 : 0.35, ease: EASE.exit }}
      >
        {outlet}
      </motion.div>
    </AnimatePresence>
  );
}
