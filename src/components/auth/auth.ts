import { CURRENT_USER, User } from "@/models/user.model";

export async function getCurrentUser(): Promise<User> {
  return CURRENT_USER;
}

export function isAuthenticated(): boolean {
  return true;
}

export const auth = async () => {
  return {
    user: CURRENT_USER,
  };
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
