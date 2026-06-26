/**
 * splashSession.test.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Regression guard for issue #162: the brand splash must play only when the
 * website is first opened, not on every client-side navigation back to "/".
 *
 * The fix records a per-session flag once the splash has played; these tests pin
 * the read/write contract and the graceful degradation when sessionStorage is
 * unavailable (private mode, sandboxed iframe, storage disabled).
 *
 * Run with: npx vitest run src/app/lib/splashSession.test.ts
 */

import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { hasPlayedSplash, markSplashPlayed } from "./splashSession";
import { SPLASH_SESSION_KEY } from "../constants/splash";

beforeEach(() => {
  sessionStorage.clear();
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe("splash session flag", () => {
  it("reports not-played on a fresh session", () => {
    expect(hasPlayedSplash()).toBe(false);
  });

  it("reports played after the splash has been marked", () => {
    markSplashPlayed();
    expect(hasPlayedSplash()).toBe(true);
  });

  it("writes the documented session key (kept in sync with sessionStorage)", () => {
    markSplashPlayed();
    expect(sessionStorage.getItem(SPLASH_SESSION_KEY)).toBe("1");
  });

  it("is idempotent — marking twice still reads as played once", () => {
    markSplashPlayed();
    markSplashPlayed();
    expect(hasPlayedSplash()).toBe(true);
  });

  it("treats any non-'1' stored value as not-played", () => {
    sessionStorage.setItem(SPLASH_SESSION_KEY, "true");
    expect(hasPlayedSplash()).toBe(false);
  });

  it("degrades to not-played when reading sessionStorage throws", () => {
    vi.spyOn(window.sessionStorage, "getItem").mockImplementation(() => {
      throw new DOMException("denied", "SecurityError");
    });
    expect(hasPlayedSplash()).toBe(false);
  });

  it("never throws when writing sessionStorage throws", () => {
    vi.spyOn(window.sessionStorage, "setItem").mockImplementation(() => {
      throw new DOMException("quota", "QuotaExceededError");
    });
    expect(() => markSplashPlayed()).not.toThrow();
  });
});
