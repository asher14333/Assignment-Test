// app/api/profile/route.ts
import { NextResponse } from "next/server";
import { getSessionEmailServer } from "@/lib/session";
import { updateUser } from "@/lib/users";   // ← add this!
import { users } from "@/lib/users";

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
export async function GET() {
  const sessionEmail = await getSessionEmailServer();
  if (!sessionEmail) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const user = users.find(u => u.email === sessionEmail);
  if (!user) return NextResponse.json({ message: "Not found" }, { status: 404 });

  return NextResponse.json({ name: user.name, email: user.email });
}
