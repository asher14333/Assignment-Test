// app/api/profile/route.ts
import { getSessionEmailServer } from "@/lib/session";
import { users } from "@/lib/users";
import { NextResponse } from "next/server";

export async function GET() {
  const sessionEmail = await getSessionEmailServer();
  if (!sessionEmail) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const user = users.find(u => u.email === sessionEmail);
  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  // Return only non-sensitive fields
  return NextResponse.json({ name: user.name, email: user.email });
}

export async function PATCH(req: Request) {
  const sessionEmail = await getSessionEmailServer();
  if (!sessionEmail) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { name, email } = await req.json();

  try {
    const updated = updateUser(sessionEmail, name, email);
    return NextResponse.json({ name: updated.name, email: updated.email });
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 400 });
  }
}
