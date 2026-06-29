/**
 * Smoothly scrolls to a section by its element ID.
 *
 * Respects the user's `prefers-reduced-motion` setting:
 * - When reduced motion is preferred the scroll is instant (`behavior: 'auto'`).
 * - Otherwise it uses native smooth scrolling (`behavior: 'smooth'`).
 *
 * @param id - The `id` attribute of the target section element.
 */
export function scrollToSection(id: string): void {
  const element = document.getElementById(id);
  if (!element) return;

  // Prefer the active Lenis instance so in-page anchors share the site's
  // inertial scroll; fall back to native (reduced-motion → instant).
  if (typeof window !== 'undefined' && window.__lenis) {
    window.__lenis.scrollTo(element);
    return;
  }

  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  element.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth' });
}

/**
 * Navigates to the landing page and then scrolls to a section.
 *
 * Use this variant when the caller may be on a route other than `/`.
 * It accepts a `navigate` function from `react-router-dom` and optionally
 * a `currentPathname` so it can decide whether navigation is needed first.
 *
 * @param id              - The `id` attribute of the target section element.
 * @param navigate        - The `navigate` function from `useNavigate()`.
 * @param currentPathname - The current `location.pathname` (from `useLocation()`).
 */
export function scrollToSectionFromAnyRoute(
  id: string,
  navigate: (path: string) => void,
  currentPathname: string,
): void {
  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const doScroll = () => {
    const element = document.getElementById(id);
    if (!element) return;
    if (typeof window !== 'undefined' && window.__lenis) {
      window.__lenis.scrollTo(element);
      return;
    }
    element.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth' });
  };

  if (currentPathname !== '/') {
    navigate('/');
    
    const observer = new MutationObserver((_mutations, obs) => {
      if (document.getElementById(id)) {
        obs.disconnect();
        doScroll();
      }
    });
    
    observer.observe(document.body, { childList: true, subtree: true });
    
    // Fallback timeout to prevent memory leaks if the element never appears
    setTimeout(() => {
      observer.disconnect();
    }, 2000);
  } else {
    doScroll();
  }
}
