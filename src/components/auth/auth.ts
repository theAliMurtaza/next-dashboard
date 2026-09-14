import { db } from "@/lib/db";
import { getSessionUserId } from "@/lib/session";
import { CURRENT_USER, User } from "@/models/user.model";

export async function getCurrentUser(): Promise<User | null> {
  const userId = await getSessionUserId();
  if (!userId) return null;
  return (await db.getPublicUserById(userId)) ?? null;
}

export async function isAuthenticated(): Promise<boolean> {
  return Boolean(await getCurrentUser());
}

export const auth = async () => {
  const user = await getCurrentUser();
  return { user: user ?? CURRENT_USER };
};

export const signIn = async () => {
  return { success: true };
};

export const signOut = async () => {
  return { success: true };
};

export const handlers = {
  GET: async () => new Response("Auth OK"),
  POST: async () => new Response("Auth OK"),
};
