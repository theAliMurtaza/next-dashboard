import { randomBytes, scryptSync, timingSafeEqual } from "crypto";

export function hashPassword(password: string): { passwordHash: string; passwordSalt: string } {
  const passwordSalt = randomBytes(16).toString("hex");
  const passwordHash = scryptSync(password, passwordSalt, 64).toString("hex");
  return { passwordHash, passwordSalt };
}

export function verifyPassword(password: string, passwordSalt: string, passwordHash: string): boolean {
  const hashed = scryptSync(password, passwordSalt, 64);
  const stored = Buffer.from(passwordHash, "hex");
  if (hashed.length !== stored.length) return false;
  return timingSafeEqual(hashed, stored);
}
