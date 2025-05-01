// app/api/login/route.ts
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { createSession } from "@/lib/session";
import { users } from "@/lib/users"; // need to export `users` from lib/users.ts

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const user = users.find(u => u.email === email);
  if (!user) {
    return NextResponse.json({ message: "Invalid email or password" }, { status: 401 });
  }

  const match = await bcrypt.compare(password, user.passwordHash);
  if (!match) {
    return NextResponse.json({ message: "Invalid email or password" }, { status: 401 });
  }

  createSession(email);
  return NextResponse.json({ message: "Login successful" });
}
