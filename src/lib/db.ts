import "server-only";
import { connectDB } from "./mongodb";
import {
  LeadModel,
  CustomerModel,
  TaskModel,
  ActivityModel,
  N8nConfigModel,
  UserModel,
} from "./db-schemas";
import { hashPassword, verifyPassword } from "@/lib/password";
import { initialsFromName, StoredUser, toPublicUser, User } from "@/models/user.model";
import { ActivityFeedItem, Customer, DashboardStats, Lead, Task } from "@/types/lead";

// ─────────────────────────────────────────────────────────────
// NOTE: every exported function here is now ASYNC because every
// operation is a real network call to MongoDB. Every call site
// (Server Actions, route handlers, etc.) must use `await db.xxx()`.
// ─────────────────────────────────────────────────────────────

function genId(prefix: string) {
  return `${prefix}-${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
}

function timeAgo(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 60) return "Just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  const days = Math.floor(hours / 24);
  return `${days} day${days === 1 ? "" : "s"} ago`;
}

async function logActivity(item: {
  title: string;
  description: string;
  iconType: ActivityFeedItem["iconType"];
}) {
  await ActivityModel.create({ _id: genId("act"), ...item });
}

export const db = {
  // ---------- Leads ----------
  async getLeads(): Promise<Lead[]> {
    await connectDB();
    const docs = await LeadModel.find({}).sort({ createdAt: -1 }).lean();
    return docs.map(serializeLead);
  },

  async getLeadById(id: string): Promise<Lead | undefined> {
    await connectDB();
    const doc = await LeadModel.findById(id).lean();
    return doc ? serializeLead(doc) : undefined;
  },

  async createLead(
    data: Omit<Lead, "id" | "createdAt" | "updatedAt"> & { id?: string }
  ): Promise<Lead> {
    await connectDB();
    const doc = await LeadModel.create({
      _id: data.id ?? genId("lead"),
      name: data.name,
      company: data.company,
      email: data.email,
      phone: data.phone,
      source: data.source,
      status: data.status || "New",
      score: data.score ?? 50,
      priority: data.priority || "Medium",
      notes: data.notes,
      estimatedValue: data.estimatedValue || 10000,
      scoredAt: data.scoredAt,
      scoringRationale: data.scoringRationale,
      tags: data.tags || ["Inbound"],
    });

    await logActivity({
      title: "New lead created",
      description: `${doc.name} from ${doc.company} (${doc.source})`,
      iconType: "lead",
    });

    return serializeLead(doc.toObject());
  },

  async updateLead(id: string, updates: Partial<Lead>): Promise<Lead | undefined> {
    await connectDB();
    const current = await LeadModel.findById(id);
    if (!current) return undefined;

    const prevStatus = current.status;
    const prevScore = current.score;

    Object.assign(current, updates);
    await current.save();

    if (updates.status && updates.status !== prevStatus) {
      await logActivity({
        title: "Lead status updated",
        description: `${current.name} moved from ${prevStatus} to ${updates.status}`,
        iconType: "lead",
      });
    }

    if (updates.score !== undefined && updates.score !== prevScore) {
      await logActivity({
        title: "AI Score recomputed",
        description: `${current.name} scored ${updates.score}/100 via n8n automation`,
        iconType: "score",
      });
    }

    const becameConverted =
      updates.status &&
      updates.status.toLowerCase() === "converted" &&
      prevStatus.toLowerCase() !== "converted";
    if (becameConverted) {
      await db.ensureCustomerFromLead(serializeLead(current.toObject()));
    }

    return serializeLead(current.toObject());
  },

  async deleteLead(id: string): Promise<boolean> {
    await connectDB();
    const removed = await LeadModel.findByIdAndDelete(id);
    if (!removed) return false;

    await logActivity({
      title: "Lead removed",
      description: `${removed.name} (${removed.company}) was deleted`,
      iconType: "lead",
    });

    return true;
  },

  // ---------- Customers ----------
  async getCustomers(): Promise<Customer[]> {
    await connectDB();
    const docs = await CustomerModel.find({}).sort({ createdAt: -1 }).lean();
    return docs.map(serializeCustomer);
  },

  async getCustomerById(id: string): Promise<Customer | undefined> {
    await connectDB();
    const doc =
      (await CustomerModel.findById(id).lean()) ||
      (await CustomerModel.findOne({ name: new RegExp(`^${id}$`, "i") }).lean());
    return doc ? serializeCustomer(doc) : undefined;
  },

  async createCustomer(
    data: Omit<Customer, "id" | "createdAt"> & { id?: string }
  ): Promise<Customer> {
    await connectDB();
    const doc = await CustomerModel.create({
      _id: data.id ?? genId("cust"),
      name: data.name,
      company: data.company,
      contact: data.contact,
      email: data.email,
      phone: data.phone,
      status: data.status || "Active",
      value: data.value,
      rawNumericValue: data.rawNumericValue,
      projectsCount: data.projectsCount ?? 1,
      sinceYear: data.sinceYear || String(new Date().getFullYear()),
    });

    await logActivity({
      title: "Customer created",
      description: `${doc.company} added as ${doc.status} account`,
      iconType: "customer",
    });

    return serializeCustomer(doc.toObject());
  },

  async ensureCustomerFromLead(lead: Lead): Promise<Customer> {
    await connectDB();
    const existing = await CustomerModel.findOne({
      email: new RegExp(`^${lead.email}$`, "i"),
    }).lean();
    if (existing) return serializeCustomer(existing);

    const value = lead.estimatedValue || 10000;
    return db.createCustomer({
      name: lead.company,
      company: lead.company,
      contact: lead.name,
      email: lead.email,
      phone: lead.phone,
      status: "Active",
      value: `$${value.toLocaleString()}`,
      rawNumericValue: value,
      projectsCount: 1,
      sinceYear: String(new Date().getFullYear()),
    });
  },

  // ---------- Tasks ----------
  async getTasks(): Promise<Task[]> {
    await connectDB();
    const docs = await TaskModel.find({}).sort({ createdAt: -1 }).lean();
    return docs.map(serializeTask);
  },

  async getTaskById(id: string): Promise<Task | undefined> {
    await connectDB();
    const doc = await TaskModel.findById(id).lean();
    return doc ? serializeTask(doc) : undefined;
  },

  async createTask(data: Omit<Task, "id" | "createdAt">): Promise<Task> {
    await connectDB();
    const doc = await TaskModel.create({ _id: genId("task"), ...data });

    await logActivity({
      title: "Task created",
      description: doc.title,
      iconType: "task",
    });

    return serializeTask(doc.toObject());
  },

  async updateTask(id: string, updates: Partial<Task>): Promise<Task | undefined> {
    await connectDB();
    const doc = await TaskModel.findByIdAndUpdate(id, updates, { new: true }).lean();
    return doc ? serializeTask(doc) : undefined;
  },

  // ---------- Activity feed ----------
  async getActivities(): Promise<ActivityFeedItem[]> {
    await connectDB();
    const docs = await ActivityModel.find({}).sort({ createdAt: -1 }).limit(50).lean();
    return docs.map(serializeActivity);
  },

  async addActivity(
    item: Omit<ActivityFeedItem, "id" | "time">
  ): Promise<ActivityFeedItem> {
    await connectDB();
    const doc = await ActivityModel.create({ _id: genId("act"), ...item });
    return serializeActivity(doc.toObject());
  },

  // ---------- Stats ----------
  async getStats(): Promise<DashboardStats> {
    await connectDB();
    const [totalLeads, qualifiedLeads, totalCustomers, pendingTasks, convertedLeads] =
      await Promise.all([
        LeadModel.countDocuments({}),
        LeadModel.countDocuments({ status: { $regex: /^qualified$/i } }),
        CustomerModel.countDocuments({}),
        TaskModel.countDocuments({ completed: false }),
        LeadModel.countDocuments({ status: { $regex: /^converted$/i } }),
      ]);

    const conversionRate =
      totalLeads > 0 ? `${Math.round((convertedLeads / totalLeads) * 100)}%` : "0%";

    return {
      totalLeads,
      qualifiedLeads,
      totalCustomers,
      pendingTasks,
      conversionRate,
      automationExecutionsToday: 142,
      automationSuccessRate: "98.8%",
    };
  },

  // ---------- n8n config ----------
  async getN8nConfig() {
    await connectDB();
    let doc = await N8nConfigModel.findById("singleton").lean();
    if (!doc) {
      doc = (
        await N8nConfigModel.create({
          _id: "singleton",
          webhookUrl: process.env.N8N_WEBHOOK_URL || "",
          webhookSecret: process.env.N8N_WEBHOOK_SECRET || "",
          autoScoreOnCreate: true,
          alertOnHighPriority: true,
          lastSyncAt: new Date().toISOString(),
          totalExecutions: 0,
          successRate: "0%",
        })
      ).toObject();
    }
    return serializeGeneric(doc);
  },

  async updateN8nConfig(updates: Record<string, unknown>) {
    await connectDB();
    const doc = await N8nConfigModel.findByIdAndUpdate(
      "singleton",
      { ...updates, lastSyncAt: new Date().toISOString() },
      { new: true, upsert: true }
    ).lean();
    return serializeGeneric(doc);
  },

  // ---------- Users ----------
  async getUsers(): Promise<User[]> {
    await connectDB();
    const docs = await UserModel.find({}).lean();
    return docs.map((d) => toPublicUser(serializeGeneric(d) as StoredUser));
  },

  async getUserById(id: string): Promise<StoredUser | undefined> {
    await connectDB();
    const doc = await UserModel.findById(id).lean();
    return doc ? (serializeGeneric(doc) as StoredUser) : undefined;
  },

  async getPublicUserById(id: string): Promise<User | undefined> {
    const user = await db.getUserById(id);
    return user ? toPublicUser(user) : undefined;
  },

  async getUserByEmail(email: string): Promise<StoredUser | undefined> {
    await connectDB();
    const doc = await UserModel.findOne({
      email: email.trim().toLowerCase(),
    }).lean();
    return doc ? (serializeGeneric(doc) as StoredUser) : undefined;
  },

  async createUser(data: { name: string; email: string; password: string }): Promise<User> {
    await connectDB();
    const email = data.email.trim().toLowerCase();

    const existing = await UserModel.findOne({ email }).lean();
    if (existing) {
      throw new Error("An account with this email already exists.");
    }

    const creds = hashPassword(data.password);
    const name = data.name.trim();

    const doc = await UserModel.create({
      _id: genId("user"),
      name,
      email,
      role: "user",
      initials: initialsFromName(name) || "OP",
      title: "Operations User",
      organization: "OpsPilot",
      settings: {
        theme: "light",
        emailAlerts: true,
        n8nWebhookAlerts: true,
        highScoreLeadNotification: true,
        dailyDigest: true,
      },
      ...creds,
    });

    await logActivity({
      title: "New user registered",
      description: `${doc.name} (${doc.email}) created an account`,
      iconType: "customer",
    });

    return toPublicUser(serializeGeneric(doc.toObject()) as StoredUser);
  },

  async authenticateUser(email: string, password: string): Promise<User | null> {
    const user = await db.getUserByEmail(email);
    if (!user) return null;
    if (!verifyPassword(password, user.passwordSalt, user.passwordHash)) return null;
    return toPublicUser(user);
  },

  async updateUser(
    id: string,
    updates: Partial<Pick<User, "name" | "title" | "organization" | "settings">>
  ): Promise<User | undefined> {
    await connectDB();
    const current = await UserModel.findById(id);
    if (!current) return undefined;

    const name = updates.name?.trim() || current.name;
    current.name = name;
    current.initials = initialsFromName(name) || current.initials;
    if (updates.title) current.title = updates.title;
    if (updates.organization) current.organization = updates.organization;
    if (updates.settings) {
      current.settings = { ...current.settings.toObject?.() ?? current.settings, ...updates.settings };
    }

    await current.save();
    return toPublicUser(serializeGeneric(current.toObject()) as StoredUser);
  },
};

// ─────────────────────────────────────────────────────────────
// Serialization helpers: Mongoose .lean()/.toObject() docs use
// `_id` and Date objects for timestamps; the app's types expect
// `id` and ISO date strings, matching the old mock shape exactly.
// ─────────────────────────────────────────────────────────────

function serializeGeneric(doc: any) {
  const { _id, __v, ...rest } = doc;
  return { id: _id, ...rest };
}

function serializeLead(doc: any): Lead {
  const base = serializeGeneric(doc);
  return {
    ...base,
    createdAt: toISO(doc.createdAt),
    updatedAt: toISO(doc.updatedAt),
  };
}

function serializeCustomer(doc: any): Customer {
  const base = serializeGeneric(doc);
  return { ...base, createdAt: toISO(doc.createdAt) };
}

function serializeTask(doc: any): Task {
  const base = serializeGeneric(doc);
  return { ...base, createdAt: toISO(doc.createdAt) };
}

function serializeActivity(doc: any): ActivityFeedItem {
  const base = serializeGeneric(doc);
  return { ...base, time: timeAgo(new Date(doc.createdAt)) };
}

function toISO(value: unknown): string {
  if (!value) return new Date().toISOString();
  return value instanceof Date ? value.toISOString() : new Date(value as string).toISOString();
}

// Re-export for any code that imports connectDB from "@/lib/db"
export { connectDB };