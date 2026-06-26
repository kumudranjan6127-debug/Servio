/**
 * updates.test.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Unit tests for the client project-updates helpers (issue #167). These pin the
 * contract the Firestore subscription relies on: case-insensitive addressing,
 * tolerant timestamp parsing, dropping malformed docs, and newest-first order.
 *
 * Run with: npx vitest run src/dashboard/lib/updates.test.ts
 */

import { describe, it, expect } from "vitest";
import {
  normalizeEmail,
  parseClientUpdate,
  sortByNewest,
  type ClientUpdate,
} from "./updates";

describe("normalizeEmail", () => {
  it("lowercases and trims so addressing is case/whitespace-insensitive", () => {
    expect(normalizeEmail("  Client@Example.COM ")).toBe("client@example.com");
  });
});

describe("parseClientUpdate", () => {
  const base = {
    title: "Homepage shipped",
    description: "The new homepage is live.",
    type: "milestone",
    createdAt: { toMillis: () => 1_700_000_000_000 },
  };

  it("parses a well-formed document and converts a Firestore-like timestamp", () => {
    const u = parseClientUpdate("u1", base);
    expect(u).not.toBeNull();
    expect(u).toMatchObject({
      id: "u1",
      title: "Homepage shipped",
      description: "The new homepage is live.",
      type: "milestone",
    });
    expect(u!.createdAt?.getTime()).toBe(1_700_000_000_000);
  });

  it("drops a document missing a title or description", () => {
    expect(parseClientUpdate("u2", { ...base, title: "   " })).toBeNull();
    expect(parseClientUpdate("u3", { ...base, description: undefined })).toBeNull();
  });

  it("degrades an unknown type to 'info'", () => {
    expect(parseClientUpdate("u4", { ...base, type: "spam" })?.type).toBe("info");
    expect(parseClientUpdate("u5", { ...base, type: 42 })?.type).toBe("info");
  });

  it("tolerates a null/pending timestamp without dropping the update", () => {
    const u = parseClientUpdate("u6", { ...base, createdAt: null });
    expect(u).not.toBeNull();
    expect(u!.createdAt).toBeNull();
  });

  it("accepts an ISO string or epoch-millis timestamp", () => {
    expect(
      parseClientUpdate("u7", { ...base, createdAt: "2026-06-26T00:00:00.000Z" })
        ?.createdAt?.toISOString(),
    ).toBe("2026-06-26T00:00:00.000Z");
    expect(
      parseClientUpdate("u8", { ...base, createdAt: 1_700_000_000_000 })?.createdAt?.getTime(),
    ).toBe(1_700_000_000_000);
  });
});

describe("sortByNewest", () => {
  const make = (id: string, ms: number | null): ClientUpdate => ({
    id,
    title: id,
    description: id,
    type: "info",
    createdAt: ms == null ? null : new Date(ms),
  });

  it("orders newest first and pushes timestamp-less updates to the end", () => {
    const ordered = [make("old", 1000), make("new", 5000), make("pending", null)].sort(
      sortByNewest,
    );
    expect(ordered.map((u) => u.id)).toEqual(["new", "old", "pending"]);
  });
});
