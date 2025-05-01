// app/api/register/route.ts
import { NextResponse } from "next/server";
import { createUser } from "@/lib/users";

export async function POST(req: Request) {
  const { name, email, password } = await req.json();

  try {
    const user = await createUser(name, email, password);
    return NextResponse.json(user, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 400 });
  }
}
