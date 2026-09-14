import { cookies } from "next/headers";
import { SESSION_COOKIE } from "@/lib/auth-constants";
import { createSessionToken, readSessionToken, WEEK_SECONDS } from "@/lib/session-token";

export { SESSION_COOKIE };
export { createSessionToken, readSessionToken };

export async function setSessionCookie(userId: string): Promise<void> {
  const jar = await cookies();
  jar.set(SESSION_COOKIE, createSessionToken(userId), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    secure: process.env.NODE_ENV === "production",
    maxAge: WEEK_SECONDS,
  });
}

export async function clearSessionCookie(): Promise<void> {
  const jar = await cookies();
  jar.delete(SESSION_COOKIE);
}

export async function getSessionUserId(): Promise<string | null> {
  const jar = await cookies();
  const token = jar.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  return readSessionToken(token)?.userId ?? null;
}
