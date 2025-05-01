// lib/session.ts (updated)
import { cookies } from "next/headers";
import crypto from "crypto";

const sessions = new Map<string, string>(); // sessionId -> email

export function createSession(email: string) {
  const sessionId = crypto.randomUUID();
  sessions.set(sessionId, email);
  cookies().set("session", sessionId, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
  });
}

export function getSessionEmailServer(): string | null {
  const sessionId = cookies().get("session")?.value;
  if (!sessionId) return null;
  return sessions.get(sessionId) || null;
}
