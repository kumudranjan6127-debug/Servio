import { addDoc, serverTimestamp } from "firebase/firestore";
import { auditLogsCollection } from "./collections";

export interface AuditInput {
  actorUid: string;
  actorEmail: string;
  /** Stable action key, e.g. `project.delete`, `admin.role_change`. */
  action: string;
  targetType?: string;
  targetId?: string;
  metadata?: Record<string, unknown>;
}

/**
 * Append an entry to the `audit_logs` collection. Returns true on success,
 * false if the write fails (failure is logged to the console but not thrown so
 * the caller's user-facing action is never blocked). Callers should surface a
 * partial-success warning when this returns false.
 */
export async function writeAuditLog(input: AuditInput): Promise<boolean> {
  try {
    await addDoc(auditLogsCollection, {
      actorUid: input.actorUid,
      actorEmail: input.actorEmail,
      action: input.action,
      targetType: input.targetType ?? null,
      targetId: input.targetId ?? null,
      metadata: input.metadata ?? {},
      createdAt: serverTimestamp(),
    });
    return true;
  } catch (err) {
    console.error("[audit] failed to write log entry", input.action, err);
    return false;
  }
}
