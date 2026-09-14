"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { clearSessionCookie, getSessionUserId, setSessionCookie } from "@/lib/session";
import { User } from "@/models/user.model";

export interface AuthActionResult {
  success: boolean;
  message?: string;
}

export async function registerAction(formData: FormData): Promise<AuthActionResult> {
  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "");

  if (name.length < 2) {
    return { success: false, message: "Please enter your full name." };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { success: false, message: "Please enter a valid email address." };
  }
  if (password.length < 6) {
    return { success: false, message: "Password must be at least 6 characters." };
  }

  try {
    const user = await db.createUser({ name, email, password });
    await setSessionCookie(user.id);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Could not create account.";
    return { success: false, message };
  }

  revalidatePath("/", "layout");
  redirect("/dashboard");
}

export async function loginAction(formData: FormData): Promise<AuthActionResult> {
  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "");

  const user = await db.authenticateUser(email, password);
  if (!user) {
    return { success: false, message: "Invalid email or password." };
  }

  await setSessionCookie(user.id);
  revalidatePath("/", "layout");
  redirect("/dashboard");
}

export async function logoutAction(): Promise<void> {
  await clearSessionCookie();
  revalidatePath("/", "layout");
  redirect("/login");
}

export async function updateProfileAction(formData: FormData): Promise<AuthActionResult> {
  const userId = await getSessionUserId();
  if (!userId) {
    return { success: false, message: "You must be signed in." };
  }

  const updated = await db.updateUser(userId, {
    name: String(formData.get("name") || ""),
    title: String(formData.get("title") || ""),
    organization: String(formData.get("organization") || ""),
  });

  if (!updated) {
    return { success: false, message: "User not found." };
  }

  revalidatePath("/dashboard", "layout");
  revalidatePath("/dashboard/settings/profile");
  return { success: true, message: "Profile updated successfully." };
}

export async function updateNotificationSettingsAction(
  settings: User["settings"]
): Promise<AuthActionResult> {
  const userId = await getSessionUserId();
  if (!userId) return { success: false, message: "You must be signed in." };

  const updated = await db.updateUser(userId, { settings });
  if (!updated) return { success: false, message: "User not found." };

  revalidatePath("/dashboard/settings/notifications");
  return { success: true, message: "Notification preferences saved." };
}

export async function requireUser(): Promise<User> {
  const userId = await getSessionUserId();
  const user = userId ? await db.getPublicUserById(userId) : undefined;
  if (!user) {
    redirect("/login");
  }
  return user;
}
