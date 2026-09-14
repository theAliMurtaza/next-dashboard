import { createHmac } from "crypto";

const SECRET = process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET || "opspilot-dev-auth-secret";
const WEEK_SECONDS = 60 * 60 * 24 * 7;

export function createSessionToken(userId: string): string {
  const payload = Buffer.from(
    JSON.stringify({ userId, exp: Date.now() + WEEK_SECONDS * 1000 })
  ).toString("base64url");
  const signature = createHmac("sha256", SECRET).update(payload).digest("base64url");
  return `${payload}.${signature}`;
}

export function readSessionToken(token: string): { userId: string } | null {
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return null;

  const expected = createHmac("sha256", SECRET).update(payload).digest("base64url");
  const expectedBytes = Buffer.from(expected);
  const receivedBytes = Buffer.from(signature);
  if (expectedBytes.length !== receivedBytes.length) return null;

  let mismatch = 0;
  for (let index = 0; index < expectedBytes.length; index += 1) {
    mismatch |= expectedBytes[index] ^ receivedBytes[index];
  }
  if (mismatch !== 0) return null;

  try {
    const data = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as {
      userId?: string;
      exp?: number;
    };
    return data.userId && typeof data.exp === "number" && data.exp >= Date.now()
      ? { userId: data.userId }
      : null;
  } catch {
    return null;
  }
}

export { WEEK_SECONDS };
