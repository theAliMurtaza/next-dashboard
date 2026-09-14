import "server-only";
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    "Missing MONGODB_URI environment variable. Set it in .env.local and in Vercel → Settings → Environment Variables."
  );
}

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// Cache the connection on globalThis so we don't open a new connection
// on every serverless invocation / hot reload. This is the standard
// pattern recommended for Mongoose + Next.js on serverless platforms.
declare global {
  // eslint-disable-next-line no-var
  var __opspilot_mongoose_cache__: MongooseCache | undefined;
}

const cached: MongooseCache = globalThis.__opspilot_mongoose_cache__ ?? {
  conn: null,
  promise: null,
};

if (!globalThis.__opspilot_mongoose_cache__) {
  globalThis.__opspilot_mongoose_cache__ = cached;
}

export async function connectDB(): Promise<typeof mongoose> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI as string, {
        bufferCommands: false,
      })
      .then((m) => m);
  }

  try {
    cached.conn = await cached.promise;
  } catch (err) {
    // Reset so the next request can retry the connection instead of
    // being stuck with a rejected promise forever.
    cached.promise = null;
    throw err;
  }

  return cached.conn;
}