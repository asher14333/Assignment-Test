// app/profile/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter();

  // Fetch profile on mount
  useEffect(() => {
    async function fetchProfile() {
      const res = await fetch("/api/profile", {
        method: "GET",
        credentials: "include",
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

  // Handle profile update
  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/profile", {
      method: "PATCH",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email }),
    });
    if (res.ok) {
      const data = await res.json();
      setUser(data);
      alert("Profile updated!");
    } else {
      const err = await res.json();
      alert(err.message);
    }
  }

  // Handle logout
  async function handleLogout() {
    await fetch("/api/logout", {
      method: "POST",
      credentials: "include",
    });
    router.push("/login");
  }

  if (!user) return <p>Loading...</p>;

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded shadow space-y-6">
      <h1 className="text-2xl font-bold">Profile</h1>
      <div>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
      </div>
      <form onSubmit={handleUpdate} className="space-y-4">
        <h2 className="text-xl font-semibold">Edit Profile</h2>
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
          Update Profile
        </button>
      </form>
      <button
        onClick={handleLogout}
        className="mt-4 w-full bg-red-600 text-white px-4 py-2 rounded"
      >
        Logout
      </button>
    </div>
  );
}
