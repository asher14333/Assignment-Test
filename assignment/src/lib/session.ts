// lib/session.ts
import { cookies } from "next/headers";

// In-memory session store (replace with database in production)
const sessions = new Map<string, string>();

export function createSession(email: string) {
  const sessionToken = Math.random().toString(36).substring(2);
  sessions.set(sessionToken, email);
  
  cookies().set("session", sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });
}

export async function getSessionEmailServer() {
  const sessionToken = cookies().get("session")?.value;
  return sessionToken ? sessions.get(sessionToken) : null;
}