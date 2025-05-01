// app/api/login/route.ts
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { users } from "@/lib/users";
import { createSession } from "@/lib/session";

export async function POST(req: Request) {
  const { email, password } = await req.json();
  const user = users.find(u => u.email === email);

  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
  }

  // Generate a new session ID...
  const sessionId = createSession(email);

  // ...and set it as an httpOnly cookie on the response
  const res = NextResponse.json({ message: "Login successful" });
  res.cookies.set("session", sessionId, {
    httpOnly: true,
    path: "/",
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });
  return res;
}
