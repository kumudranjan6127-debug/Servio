// Pure, dependency-free helpers for the client "project updates" feed. Kept
// free of any Firebase import so it stays trivially unit-testable; the service
// layer (updatesService.ts) wires these to a Firestore subscription.

export const UPDATE_TYPES = ["feature", "bugfix", "milestone", "info"] as const;
export type UpdateType = (typeof UPDATE_TYPES)[number];

/** An admin-authored update as consumed by the client dashboard. */
export interface ClientUpdate {
  id: string;
  title: string;
  description: string;
  type: UpdateType;
  /** Resolved post time; null only for a not-yet-committed server timestamp. */
  createdAt: Date | null;
}

/** Lowercase + trim so the addressee match is case/whitespace-insensitive. */
export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

function isUpdateType(value: unknown): value is UpdateType {
  return (
    typeof value === "string" &&
    (UPDATE_TYPES as readonly string[]).includes(value)
  );
}

// Duck-typed conversion of a Firestore Timestamp (or Date / millis / ISO
// string) into a Date. Duck-typing keeps this module free of the Firebase SDK
// so it can be unit-tested without initializing an app.
function toDate(value: unknown): Date | null {
  if (value == null) return null;
  if (value instanceof Date) return Number.isNaN(value.getTime()) ? null : value;
  if (typeof value === "object") {
    const ts = value as {
      toDate?: () => Date;
      toMillis?: () => number;
      seconds?: number;
    };
    if (typeof ts.toDate === "function") {
      try {
        const d = ts.toDate();
        return d instanceof Date && !Number.isNaN(d.getTime()) ? d : null;
      } catch {
        /* fall through */
      }
    }
    if (typeof ts.toMillis === "function") {
      try {
        const d = new Date(ts.toMillis());
        return Number.isNaN(d.getTime()) ? null : d;
      } catch {
        /* fall through */
      }
    }
    if (typeof ts.seconds === "number") return new Date(ts.seconds * 1000);
  }
  if (typeof value === "number") return new Date(value);
  if (typeof value === "string") {
    const d = new Date(value);
    return Number.isNaN(d.getTime()) ? null : d;
  }
  return null;
}

/**
 * Parse a raw `projectUpdates` document into a `ClientUpdate`. Malformed
 * documents (missing title/description) are dropped — returning null — rather
 * than rendered as blank cards. An unknown `type` degrades to "info".
 */
export function parseClientUpdate(
  id: string,
  data: Record<string, unknown>,
): ClientUpdate | null {
  const title = typeof data.title === "string" ? data.title.trim() : "";
  const description =
    typeof data.description === "string" ? data.description.trim() : "";
  if (!title || !description) return null;
  return {
    id,
    title,
    description,
    type: isUpdateType(data.type) ? data.type : "info",
    createdAt: toDate(data.createdAt),
  };
}

/** Newest first; updates with no resolved timestamp sort to the end. */
export function sortByNewest(a: ClientUpdate, b: ClientUpdate): number {
  const at = a.createdAt ? a.createdAt.getTime() : 0;
  const bt = b.createdAt ? b.createdAt.getTime() : 0;
  return bt - at;
}

/** A progress-oriented summary of a client's project updates. */
export interface UpdatesSummary {
  /** Total number of updates posted. */
  total: number;
  /** How many of them are milestones (key progress markers). */
  milestones: number;
  /** Newest update's timestamp, or null when none are dated. */
  latest: Date | null;
  /** Oldest update's timestamp ("project journey start"), or null. */
  started: Date | null;
}

/**
 * Derive the headline progress figures the Progress section shows above the
 * journey timeline. Order-independent, so it works on the raw feed.
 */
export function summarizeUpdates(updates: ClientUpdate[]): UpdatesSummary {
  let milestones = 0;
  let latest: Date | null = null;
  let started: Date | null = null;
  for (const u of updates) {
    if (u.type === "milestone") milestones++;
    if (u.createdAt) {
      if (!latest || u.createdAt > latest) latest = u.createdAt;
      if (!started || u.createdAt < started) started = u.createdAt;
    }
  }
  return { total: updates.length, milestones, latest, started };
}
