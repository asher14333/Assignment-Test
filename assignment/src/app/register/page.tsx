// app/register/page.tsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    if (res.ok) {
      router.push("/login");
    } else {
      const data = await res.json();
      alert(data.message);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col max-w-sm space-y-4">
      <input value={name} onChange={e => setName(e.target.value)} placeholder="Name" required className="border p-2" />
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required className="border p-2" />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required className="border p-2" />
      <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Register</button>
    </form>
  );
}
