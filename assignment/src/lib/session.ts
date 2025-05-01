// lib/session.ts
import crypto from "crypto";

// sessionId → userEmail
export const sessions = new Map<string, string>();

/**
 * Create a new session for `email` and return the sessionId.
 */
export function createSession(email: string): string {
  const sessionId = crypto.randomUUID();
  sessions.set(sessionId, email);
  return sessionId;
}

/**
 * Look up an email by sessionId. Returns null if not found.
 */
export function getSessionEmail(sessionId: string | null): string | null {
  if (!sessionId) return null;
  return sessions.get(sessionId) ?? null;
}
