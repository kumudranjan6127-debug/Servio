// Session-scoped memory for the brand splash. The splash is meant to play once
// when the website is first opened — not on every client-side navigation back
// to "/". These helpers record and read that "already played" mark so the
// loading hook can skip straight to the revealed landing on subsequent mounts.
//
// Every access is wrapped because `sessionStorage` can throw (Safari private
// mode, sandboxed iframes, storage disabled). The splash replaying is a harmless
// degradation, so on any failure we simply behave as if it hasn't played yet.

import { SPLASH_SESSION_KEY } from "../constants/splash";

/** True once the brand splash has played in this browser session. */
export function hasPlayedSplash(): boolean {
  try {
    return window.sessionStorage.getItem(SPLASH_SESSION_KEY) === "1";
  } catch {
    return false;
  }
}

/** Record that the splash has played so it is not replayed on SPA navigation. */
export function markSplashPlayed(): void {
  try {
    window.sessionStorage.setItem(SPLASH_SESSION_KEY, "1");
  } catch {
    // Non-fatal: without persistence the splash just replays on the next mount.
  }
}
