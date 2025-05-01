import bcrypt from "bcryptjs";

export interface User {
  name: string;
  email: string;
  passwordHash: string;
}

export const users: User[] = [];

export async function createUser(name: string, email: string, password: string) {
  if (users.find(u => u.email === email)) {
    throw new Error("Email already in use");
  }

  const passwordHash = await bcrypt.hash(password, 10);
  users.push({ name, email, passwordHash });
  return { name, email };
}

export function getUserByEmail(email: string) {
  return users.find(user => user.email === email);
}

export function updateUser(email: string, newName: string, newEmail: string) {
  const user = users.find(u => u.email === email);
  if (!user) throw new Error("User not found");
  user.name = newName;
  user.email = newEmail;
  return user;
}
