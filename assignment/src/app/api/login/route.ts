// app/api/login/route.ts
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { users } from "@/lib/users";
import { createSession } from "@/lib/session";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const user = users.find(u => u.email === email);
  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    return NextResponse.json(
      { message: "Invalid email or password" }, 
      { status: 401 }
    );
  }

  // Create session and set cookie
  createSession(email);

  // Respond after session is set
  return NextResponse.json({ message: "Login successful" });
}