import "server-only";
import mongoose, { Schema, Model } from "mongoose";

// ─────────────────────────────────────────────────────────────
// All models use a string `_id` (e.g. "lead-001", "lead-1a2b3c")
// so the rest of the app can keep working with `.id` exactly as
// it did with the old in-memory mock — no need to touch every
// component that reads `lead.id`.
// ─────────────────────────────────────────────────────────────

const toJSONOptions = {
  virtuals: true,
  versionKey: false,
  transform: (_doc: any, ret: any) => {
    ret.id = ret._id;
    delete ret._id;
  },
};

// ---------- Lead ----------
const LeadSchema = new Schema(
  {
    _id: { type: String },
    name: { type: String, required: true },
    company: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    source: { type: String, required: true },
    status: { type: String, required: true, default: "New" },
    score: { type: Number, default: 50 },
    priority: { type: String, default: "Medium" },
    notes: { type: String },
    estimatedValue: { type: Number, default: 10000 },
    scoredAt: { type: String },
    scoringRationale: { type: String },
    tags: { type: [String], default: ["Inbound"] },
  },
  { timestamps: true, toJSON: toJSONOptions }
);
// timestamps:true adds createdAt/updatedAt as Dates; the app expects
// ISO strings, which JSON.stringify() already produces for Dates, so
// this is compatible with existing `Lead.createdAt` string usage.

// ---------- Customer ----------
const CustomerSchema = new Schema(
  {
    _id: { type: String },
    name: { type: String, required: true },
    company: { type: String, required: true },
    contact: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    status: { type: String, default: "Active" },
    value: { type: String, required: true },
    rawNumericValue: { type: Number, required: true },
    projectsCount: { type: Number, default: 1 },
    sinceYear: { type: String, required: true },
  },
  { timestamps: { createdAt: true, updatedAt: false }, toJSON: toJSONOptions }
);

// ---------- Task ----------
const TaskSchema = new Schema(
  {
    _id: { type: String },
    title: { type: String, required: true },
    description: { type: String },
    lead: { type: String },
    leadId: { type: String },
    priority: { type: String, default: "Medium" },
    due: { type: String, default: "" },
    completed: { type: Boolean, default: false },
    assignedTo: { type: String },
  },
  { timestamps: { createdAt: true, updatedAt: false }, toJSON: toJSONOptions }
);

// ---------- Activity feed ----------
const ActivitySchema = new Schema(
  {
    _id: { type: String },
    title: { type: String, required: true },
    description: { type: String, required: true },
    iconType: { type: String, required: true },
  },
  { timestamps: { createdAt: true, updatedAt: false }, toJSON: toJSONOptions }
);

// ---------- n8n config (single document) ----------
const N8nConfigSchema = new Schema(
  {
    _id: { type: String, default: "singleton" },
    webhookUrl: { type: String, default: "" },
    webhookSecret: { type: String, default: "" },
    autoScoreOnCreate: { type: Boolean, default: true },
    alertOnHighPriority: { type: Boolean, default: true },
    lastSyncAt: { type: String },
    totalExecutions: { type: Number, default: 0 },
    successRate: { type: String, default: "0%" },
  },
  { toJSON: toJSONOptions }
);

// ---------- User ----------
const UserSchema = new Schema(
  {
    _id: { type: String },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    role: { type: String, default: "user" },
    avatarUrl: { type: String },
    initials: { type: String, required: true },
    title: { type: String, default: "Operations User" },
    organization: { type: String, default: "OpsPilot" },
    settings: {
      theme: { type: String, default: "light" },
      emailAlerts: { type: Boolean, default: true },
      n8nWebhookAlerts: { type: Boolean, default: true },
      highScoreLeadNotification: { type: Boolean, default: true },
      dailyDigest: { type: Boolean, default: true },
    },
    passwordHash: { type: String, required: true },
    passwordSalt: { type: String, required: true },
  },
  { timestamps: { createdAt: true, updatedAt: false }, toJSON: toJSONOptions }
);

// Prevent "OverwriteModelError" when Next.js hot-reloads this module
// in dev (models would otherwise get re-registered on every reload).
export const LeadModel: Model<any> =
  mongoose.models.Lead || mongoose.model("Lead", LeadSchema);

export const CustomerModel: Model<any> =
  mongoose.models.Customer || mongoose.model("Customer", CustomerSchema);

export const TaskModel: Model<any> =
  mongoose.models.Task || mongoose.model("Task", TaskSchema);

export const ActivityModel: Model<any> =
  mongoose.models.Activity || mongoose.model("Activity", ActivitySchema);

export const N8nConfigModel: Model<any> =
  mongoose.models.N8nConfig || mongoose.model("N8nConfig", N8nConfigSchema);

export const UserModel: Model<any> =
  mongoose.models.User || mongoose.model("User", UserSchema);