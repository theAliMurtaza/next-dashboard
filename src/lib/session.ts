import { createHmac } from "crypto";
import { cookies } from "next/headers";
import { SESSION_COOKIE } from "@/lib/auth-constants";

export { SESSION_COOKIE };
const SECRET = process.env.AUTH_SECRET || "opspilot-dev-auth-secret";
const WEEK_SECONDS = 60 * 60 * 24 * 7;

export function createSessionToken(userId: string): string {
  const payload = Buffer.from(
    JSON.stringify({ userId, exp: Date.now() + WEEK_SECONDS * 1000 })
  ).toString("base64url");
  const sig = createHmac("sha256", SECRET).update(payload).digest("base64url");
  return `${payload}.${sig}`;
}

export function readSessionToken(token: string): { userId: string } | null {
  const [payload, sig] = token.split(".");
  if (!payload || !sig) return null;

  const expected = createHmac("sha256", SECRET).update(payload).digest("base64url");
  if (expected.length !== sig.length) return null;
  if (!timingSafeEqualString(expected, sig)) return null;

  try {
    const data = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as {
      userId?: string;
      exp?: number;
    };
    if (!data.userId || typeof data.exp !== "number" || data.exp < Date.now()) {
      return null;
    }
    return { userId: data.userId };
  } catch {
    return null;
  }
}

function timingSafeEqualString(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  let mismatch = 0;
  for (let i = 0; i < bufA.length; i++) {
    mismatch |= bufA[i] ^ bufB[i];
  }
  return mismatch === 0;
}

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
