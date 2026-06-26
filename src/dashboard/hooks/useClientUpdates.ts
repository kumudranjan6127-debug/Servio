import { useEffect, useState } from "react";
import { useAuth } from "../../Firebase/useAuth";
import { subscribeClientUpdates } from "../services/updatesService";
import type { ClientUpdate } from "../lib/updates";

export interface ClientUpdatesState {
  updates: ClientUpdate[];
  loading: boolean;
  /** Firestore error message (e.g. permission denied), or null. */
  error: string | null;
  /**
   * True when the signed-in account's email is not yet verified. Updates are
   * addressed by email and the security rules only release them to a VERIFIED
   * address, so we surface a "verify your email" prompt instead of firing a
   * query that the rules would deny.
   */
  needsEmailVerification: boolean;
}

/**
 * Real-time feed of the admin-authored updates addressed to the signed-in
 * client (by their verified email). Replaces the old demo/mock updates — when
 * the client has none, `updates` is simply empty and the UI shows
 * "No updates yet".
 */
export function useClientUpdates(): ClientUpdatesState {
  const { currentUser } = useAuth();
  const email = currentUser?.email ?? null;
  const emailVerified = currentUser?.emailVerified ?? false;

  const [state, setState] = useState<ClientUpdatesState>({
    updates: [],
    loading: true,
    error: null,
    needsEmailVerification: false,
  });

  useEffect(() => {
    // No email on the account → nothing can be addressed to this user.
    if (!email) {
      setState({
        updates: [],
        loading: false,
        error: null,
        needsEmailVerification: false,
      });
      return;
    }

    // Unverified email → the rules would deny the read; prompt to verify.
    if (!emailVerified) {
      setState({
        updates: [],
        loading: false,
        error: null,
        needsEmailVerification: true,
      });
      return;
    }

    setState((prev) => ({
      ...prev,
      loading: true,
      error: null,
      needsEmailVerification: false,
    }));
    const unsubscribe = subscribeClientUpdates(
      email,
      (updates) =>
        setState({
          updates,
          loading: false,
          error: null,
          needsEmailVerification: false,
        }),
      (err) =>
        setState({
          updates: [],
          loading: false,
          error: err.message,
          needsEmailVerification: false,
        }),
    );
    return unsubscribe;
  }, [email, emailVerified]);

  return state;
}
