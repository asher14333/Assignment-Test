// app/profile/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter();

  useEffect(() => {
    async function fetchProfile() {
      const res = await fetch("/api/profile", {
        method: "GET",
        credentials: "include",           // ← ensure cookie is sent
      });

      if (res.ok) {
        const data = await res.json();
        setUser(data);
        setName(data.name);
        setEmail(data.email);
      } else {
        router.push("/login");
      }
    }
    fetchProfile();
  }, [router]);

  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/profile", {
      method: "PATCH",
      credentials: "include",           // ← ensure cookie is sent
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email }),
    });

    if (res.ok) {
      const data = await res.json();
      alert("Profile updated!");
      setUser(data);
    } else {
      const err = await res.json();
      alert(err.message);
    }
  }

  if (!user) return <p>Loading...</p>;

  return (
    <form onSubmit={handleUpdate} className="max-w-md mx-auto mt-10 p-4 border rounded shadow space-y-4">
      <h1 className="text-2xl font-bold">Edit Profile</h1>
      <input
        value={name}
        onChange={e => setName(e.target.value)}
        className="border p-2 w-full"
        required
      />
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        className="border p-2 w-full"
        required
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Update
      </button>
    </form>
  );
}
