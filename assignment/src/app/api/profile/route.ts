// app/api/profile/route.ts
import { NextResponse } from "next/server";
import { getSessionEmail } from "@/lib/session";
import { updateUser, users } from "@/lib/users";

export async function GET(req: Request) {
  // Read cookie directly from the Request
  const sessionId = req.cookies.get("session")?.value ?? null;
  const email = getSessionEmail(sessionId);
  if (!email) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const user = users.find(u => u.email === email);
  if (!user) return NextResponse.json({ message: "Not found" }, { status: 404 });

  return NextResponse.json({ name: user.name, email: user.email });
}

export async function PATCH(req: Request) {
  const sessionId = req.cookies.get("session")?.value ?? null;
  const currentEmail = getSessionEmail(sessionId);
  if (!currentEmail) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const { name, email } = await req.json();
  try {
    const updated = updateUser(currentEmail, name, email);
    return NextResponse.json({ name: updated.name, email: updated.email });
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 400 });
  }
}
