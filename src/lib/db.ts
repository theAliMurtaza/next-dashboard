import { ActivityFeedItem, Customer, DashboardStats, Lead, Task } from "@/types/lead";

interface N8nConfig {
  webhookUrl: string;
  webhookSecret: string;
  autoScoreOnCreate: boolean;
  alertOnHighPriority: boolean;
  lastSyncAt?: string;
  totalExecutions: number;
  successRate: string;
}

interface DatabaseStore {
  leads: Lead[];
  customers: Customer[];
  tasks: Task[];
  activities: ActivityFeedItem[];
  n8nConfig: N8nConfig;
}

const INITIAL_LEADS: Lead[] = [
  {
    id: "lead-001",
    name: "John Smith",
    company: "TechVision",
    email: "john@techvision.com",
    phone: "+1 (555) 123-4567",
    source: "Website",
    status: "Qualified",
    score: 92,
    priority: "High",
    notes: "Interested in AI-driven CRM automation workflows. Requested a customized product demo for 50+ seats.",
    estimatedValue: 48000,
    createdAt: "2026-09-10T10:30:00.000Z",
    updatedAt: "2026-09-12T14:20:00.000Z",
    scoredAt: "2026-09-10T10:32:15.000Z",
    scoringRationale: "Enterprise budget confirmed. Immediate implementation timeline and executive decision-maker contact.",
    tags: ["Enterprise", "AI Pipeline", "Hot"],
  },
  {
    id: "lead-002",
    name: "Sarah Johnson",
    company: "GrowthLabs",
    email: "sarah@growthlabs.com",
    phone: "+1 (555) 234-5678",
    source: "LinkedIn",
    status: "Contacted",
    score: 84,
    priority: "High",
    notes: "Followed up regarding n8n webhook connectors. Waiting on security team compliance sign-off.",
    estimatedValue: 24000,
    createdAt: "2026-09-11T09:15:00.000Z",
    updatedAt: "2026-09-12T16:45:00.000Z",
    scoredAt: "2026-09-11T09:16:30.000Z",
    scoringRationale: "High website interaction and strong domain authority. Fast-growing agency profile.",
    tags: ["Agency", "Mid-Market"],
  },
  {
    id: "lead-003",
    name: "Michael Brown",
    company: "CloudWorks",
    email: "michael@cloudworks.com",
    phone: "+1 (555) 345-6789",
    source: "Referral",
    status: "New",
    score: 76,
    priority: "Medium",
    notes: "Referred by existing partner DigitalFlow. Inquiring about custom webhook event transformers.",
    estimatedValue: 18500,
    createdAt: "2026-09-12T11:00:00.000Z",
    updatedAt: "2026-09-12T11:00:00.000Z",
    scoredAt: "2026-09-12T11:01:00.000Z",
    scoringRationale: "Warm referral with defined use-case. Moderate team scale.",
    tags: ["Referral", "DevOps"],
  },
  {
    id: "lead-004",
    name: "Emily Davis",
    company: "DigitalFlow",
    email: "emily@digitalflow.com",
    phone: "+1 (555) 456-7890",
    source: "Website",
    status: "Converted",
    score: 95,
    priority: "Critical",
    notes: "Contract executed. Onboarding initiated for operations analytics suite.",
    estimatedValue: 65000,
    createdAt: "2026-09-08T08:00:00.000Z",
    updatedAt: "2026-09-13T08:30:00.000Z",
    scoredAt: "2026-09-08T08:02:10.000Z",
    scoringRationale: "Top-tier budget allocation, high urgency, verified creditworthiness.",
    tags: ["VIP", "Closed-Won"],
  },
  {
    id: "lead-005",
    name: "David Wilson",
    company: "ScaleUp",
    email: "david@scaleup.com",
    phone: "+1 (555) 567-8901",
    source: "Email",
    status: "New",
    score: 68,
    priority: "Medium",
    notes: "Responded to Q3 cold email outreach. Requested pricing tiers.",
    estimatedValue: 12000,
    createdAt: "2026-09-13T06:45:00.000Z",
    updatedAt: "2026-09-13T06:45:00.000Z",
    scoredAt: "2026-09-13T06:46:20.000Z",
    scoringRationale: "Early stage prospect exploring market alternatives.",
    tags: ["Outbound", "SaaS"],
  },
  {
    id: "lead-006",
    name: "Elena Rostova",
    company: "Apex Dynamics",
    email: "elena@apexdynamics.io",
    phone: "+1 (555) 678-9012",
    source: "LinkedIn",
    status: "Qualified",
    score: 89,
    priority: "High",
    notes: "COO looking to automate lead intake into internal ERP via n8n.",
    estimatedValue: 38000,
    createdAt: "2026-09-13T07:15:00.000Z",
    updatedAt: "2026-09-13T09:10:00.000Z",
    scoredAt: "2026-09-13T07:16:00.000Z",
    scoringRationale: "C-Level prospect with clear ROI requirement and technical competency.",
    tags: ["Operations", "Inbound"],
  },
];

const INITIAL_CUSTOMERS: Customer[] = [
  {
    id: "cust-001",
    name: "TechVision",
    company: "TechVision Inc.",
    contact: "John Smith",
    email: "john@techvision.com",
    phone: "+1 (555) 123-4567",
    status: "Active",
    value: "$24,500",
    rawNumericValue: 24500,
    projectsCount: 8,
    sinceYear: "2025",
    createdAt: "2025-06-15T00:00:00.000Z",
  },
  {
    id: "cust-002",
    name: "GrowthLabs",
    company: "GrowthLabs Media",
    contact: "Sarah Johnson",
    email: "sarah@growthlabs.com",
    phone: "+1 (555) 234-5678",
    status: "Active",
    value: "$18,200",
    rawNumericValue: 18200,
    projectsCount: 5,
    sinceYear: "2025",
    createdAt: "2025-09-10T00:00:00.000Z",
  },
  {
    id: "cust-003",
    name: "DigitalFlow",
    company: "DigitalFlow Systems",
    contact: "Emily Davis",
    email: "emily@digitalflow.com",
    phone: "+1 (555) 456-7890",
    status: "Active",
    value: "$32,800",
    rawNumericValue: 32800,
    projectsCount: 12,
    sinceYear: "2024",
    createdAt: "2024-11-20T00:00:00.000Z",
  },
  {
    id: "cust-004",
    name: "CloudWorks",
    company: "CloudWorks Global",
    contact: "Michael Brown",
    email: "michael@cloudworks.com",
    phone: "+1 (555) 345-6789",
    status: "Pending",
    value: "$9,600",
    rawNumericValue: 9600,
    projectsCount: 2,
    sinceYear: "2026",
    createdAt: "2026-01-14T00:00:00.000Z",
  },
];

const INITIAL_TASKS: Task[] = [
  {
    id: "task-001",
    title: "Follow up with John Smith",
    description: "Contact the lead and schedule technical review of n8n webhook pipeline.",
    lead: "TechVision",
    leadId: "lead-001",
    priority: "High",
    due: "Today",
    completed: false,
    assignedTo: "Alex Morgan",
    createdAt: "2026-09-12T10:00:00.000Z",
  },
  {
    id: "task-002",
    title: "Send proposal to GrowthLabs",
    description: "Prepare customized pricing tier for multi-node n8n orchestrator.",
    lead: "GrowthLabs",
    leadId: "lead-002",
    priority: "High",
    due: "Today",
    completed: false,
    assignedTo: "Alex Morgan",
    createdAt: "2026-09-12T11:30:00.000Z",
  },
  {
    id: "task-003",
    title: "Schedule CloudWorks demo",
    description: "Showcase automated lead scoring and webhook fallback triggers.",
    lead: "CloudWorks",
    leadId: "lead-003",
    priority: "Medium",
    due: "Tomorrow",
    completed: false,
    assignedTo: "Sarah Sales",
    createdAt: "2026-09-13T07:00:00.000Z",
  },
  {
    id: "task-004",
    title: "Update DigitalFlow account",
    description: "Sync Q3 usage metrics and renew yearly enterprise service license.",
    lead: "DigitalFlow",
    leadId: "lead-004",
    priority: "Low",
    due: "Sep 15",
    completed: true,
    assignedTo: "Alex Morgan",
    createdAt: "2026-09-10T14:00:00.000Z",
  },
  {
    id: "task-005",
    title: "Verify n8n webhook retry telemetry",
    description: "Ensure dead-letter queues in n8n are forwarding failed execution alerts.",
    lead: "Ops Automation",
    priority: "Medium",
    due: "Sep 16",
    completed: false,
    assignedTo: "DevOps Lead",
    createdAt: "2026-09-13T08:00:00.000Z",
  },
];

const INITIAL_ACTIVITIES: ActivityFeedItem[] = [
  {
    id: "act-001",
    title: "New lead captured",
    description: "Elena Rostova from Apex Dynamics registered via LinkedIn",
    time: "25 minutes ago",
    iconType: "lead",
  },
  {
    id: "act-002",
    title: "AI Lead scoring completed",
    description: "n8n AI evaluated John Smith with score 92 (Hot)",
    time: "48 minutes ago",
    iconType: "score",
  },
  {
    id: "act-003",
    title: "Customer contract renewed",
    description: "DigitalFlow renewed annual contract ($32,800)",
    time: "2 hours ago",
    iconType: "customer",
  },
  {
    id: "act-004",
    title: "n8n workflow executed",
    description: "Hourly CRM synchronization job finished successfully",
    time: "3 hours ago",
    iconType: "automation",
  },
  {
    id: "act-005",
    title: "Task completed",
    description: "Alex Morgan marked DigitalFlow account update done",
    time: "5 hours ago",
    iconType: "task",
  },
];

const INITIAL_N8N_CONFIG: N8nConfig = {
  webhookUrl: process.env.N8N_WEBHOOK_URL || "https://n8n.example.com/webhook/opspilot-lead-score",
  webhookSecret: process.env.N8N_WEBHOOK_SECRET || "opspilot-secret-token-xyz99",
  autoScoreOnCreate: true,
  alertOnHighPriority: true,
  lastSyncAt: new Date().toISOString(),
  totalExecutions: 1842,
  successRate: "98.8%",
};

declare global {
  // eslint-disable-next-line no-var
  var __OPSPILOT_DB__: DatabaseStore | undefined;
}

function getStore(): DatabaseStore {
  if (!globalThis.__OPSPILOT_DB__) {
    globalThis.__OPSPILOT_DB__ = {
      leads: [...INITIAL_LEADS],
      customers: [...INITIAL_CUSTOMERS],
      tasks: [...INITIAL_TASKS],
      activities: [...INITIAL_ACTIVITIES],
      n8nConfig: { ...INITIAL_N8N_CONFIG },
    };
  }
  return globalThis.__OPSPILOT_DB__;
}

export const db = {
  getLeads(): Lead[] {
    return [...getStore().leads];
  },

  getLeadById(id: string): Lead | undefined {
    return getStore().leads.find((l) => l.id === id);
  },

  createLead(data: Omit<Lead, "id" | "createdAt" | "updatedAt"> & { id?: string }): Lead {
    const store = getStore();
    const now = new Date().toISOString();
    const newLead: Lead = {
      id: data.id ?? `lead-${Date.now().toString(36)}`,
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
      createdAt: now,
      updatedAt: now,
      scoredAt: data.scoredAt,
      scoringRationale: data.scoringRationale,
      tags: data.tags || ["Inbound"],
    };

    store.leads.unshift(newLead);

    store.activities.unshift({
      id: `act-${Date.now().toString(36)}`,
      title: "New lead created",
      description: `${newLead.name} from ${newLead.company} (${newLead.source})`,
      time: "Just now",
      iconType: "lead",
    });

    return newLead;
  },

  updateLead(id: string, updates: Partial<Lead>): Lead | undefined {
    const store = getStore();
    const index = store.leads.findIndex((l) => l.id === id);
    if (index === -1) return undefined;

    const current = store.leads[index];
    const updated: Lead = {
      ...current,
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    store.leads[index] = updated;

    if (updates.status && updates.status !== current.status) {
      store.activities.unshift({
        id: `act-${Date.now().toString(36)}`,
        title: "Lead status updated",
        description: `${updated.name} moved from ${current.status} to ${updates.status}`,
        time: "Just now",
        iconType: "lead",
      });
    }

    if (updates.score !== undefined && updates.score !== current.score) {
      store.activities.unshift({
        id: `act-${Date.now().toString(36)}`,
        title: "AI Score recomputed",
        description: `${updated.name} scored ${updates.score}/100 via n8n automation`,
        time: "Just now",
        iconType: "score",
      });
    }

    return updated;
  },

  deleteLead(id: string): boolean {
    const store = getStore();
    const index = store.leads.findIndex((l) => l.id === id);
    if (index === -1) return false;
    const removed = store.leads.splice(index, 1)[0];

    store.activities.unshift({
      id: `act-${Date.now().toString(36)}`,
      title: "Lead removed",
      description: `${removed.name} (${removed.company}) was deleted`,
      time: "Just now",
      iconType: "lead",
    });

    return true;
  },

  getCustomers(): Customer[] {
    return [...getStore().customers];
  },

  getCustomerById(id: string): Customer | undefined {
    const store = getStore();
    return (
      store.customers.find((c) => c.id === id) ||
      store.customers.find((c) => c.name.toLowerCase() === id.toLowerCase())
    );
  },

  getTasks(): Task[] {
    return [...getStore().tasks];
  },

  getTaskById(id: string): Task | undefined {
    return getStore().tasks.find((t) => t.id === id);
  },

  createTask(data: Omit<Task, "id" | "createdAt">): Task {
    const store = getStore();
    const newTask: Task = {
      id: `task-${Date.now().toString(36)}`,
      ...data,
      createdAt: new Date().toISOString(),
    };
    store.tasks.unshift(newTask);

    store.activities.unshift({
      id: `act-${Date.now().toString(36)}`,
      title: "Task created",
      description: newTask.title,
      time: "Just now",
      iconType: "task",
    });

    return newTask;
  },

  updateTask(id: string, updates: Partial<Task>): Task | undefined {
    const store = getStore();
    const index = store.tasks.findIndex((t) => t.id === id);
    if (index === -1) return undefined;

    store.tasks[index] = {
      ...store.tasks[index],
      ...updates,
    };
    return store.tasks[index];
  },

  getActivities(): ActivityFeedItem[] {
    return [...getStore().activities];
  },

  addActivity(item: Omit<ActivityFeedItem, "id" | "time">): ActivityFeedItem {
    const store = getStore();
    const newAct: ActivityFeedItem = {
      id: `act-${Date.now().toString(36)}`,
      ...item,
      time: "Just now",
    };
    store.activities.unshift(newAct);
    return newAct;
  },

  getStats(): DashboardStats {
    const store = getStore();
    const qualified = store.leads.filter((l) => l.status === "Qualified" || l.status === "qualified").length;
    const pending = store.tasks.filter((t) => !t.completed).length;
    const converted = store.leads.filter((l) => l.status === "Converted" || l.status === "converted").length;
    const conversion =
      store.leads.length > 0
        ? `${Math.round((converted / store.leads.length) * 100)}%`
        : "0%";

    return {
      totalLeads: store.leads.length,
      qualifiedLeads: qualified,
      totalCustomers: store.customers.length,
      pendingTasks: pending,
      conversionRate: conversion,
      automationExecutionsToday: 142,
      automationSuccessRate: "98.8%",
    };
  },

  getN8nConfig(): N8nConfig {
    return { ...getStore().n8nConfig };
  },

  updateN8nConfig(updates: Partial<N8nConfig>): N8nConfig {
    const store = getStore();
    store.n8nConfig = {
      ...store.n8nConfig,
      ...updates,
      lastSyncAt: new Date().toISOString(),
    };
    return { ...store.n8nConfig };
  },
};

// Also export connectDB for backwards compatibility if needed
export async function connectDB() {
  return null;
}