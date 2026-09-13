export type LeadStatus =
  | "New"
  | "Contacted"
  | "Qualified"
  | "Converted"
  | "Lost"
  | "new"
  | "contacted"
  | "qualified"
  | "converted"
  | "lost";

export type LeadSource =
  | "Website"
  | "LinkedIn"
  | "Referral"
  | "Email"
  | "Advertisement"
  | "Event"
  | "Organic"
  | "Other";

export type LeadPriority = "Low" | "Medium" | "High" | "Critical";

export interface LeadActivity {
  id: string;
  leadId: string;
  title: string;
  description: string;
  timestamp: string;
  type: "created" | "status_change" | "scored" | "contacted" | "note_added" | "webhook";
}

export interface Lead {
  id: string;
  name: string;
  company: string;
  email: string;
  phone?: string;
  source: LeadSource | string;
  status: LeadStatus;
  score: number;
  priority: LeadPriority;
  notes?: string;
  estimatedValue?: number;
  createdAt: string;
  updatedAt: string;
  scoredAt?: string;
  scoringRationale?: string;
  tags?: string[];
}

export interface Customer {
  id: string;
  name: string;
  company: string;
  contact: string;
  email: string;
  phone?: string;
  status: "Active" | "Pending" | "Churned";
  value: string;
  rawNumericValue: number;
  projectsCount: number;
  sinceYear: string;
  createdAt: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  lead?: string;
  leadId?: string;
  priority: "High" | "Medium" | "Low";
  due: string;
  completed: boolean;
  assignedTo?: string;
  createdAt: string;
}

export interface ActivityFeedItem {
  id: string;
  title: string;
  description: string;
  time: string;
  iconType: "lead" | "score" | "task" | "automation" | "customer";
}

export interface DashboardStats {
  totalLeads: number;
  qualifiedLeads: number;
  totalCustomers: number;
  pendingTasks: number;
  conversionRate: string;
  automationExecutionsToday: number;
  automationSuccessRate: string;
}

export interface N8nWebhookPayload {
  event: "lead.create" | "lead.score" | "lead.status_change" | "task.create" | "ping";
  lead?: Partial<Lead>;
  leadId?: string;
  timestamp: string;
  sourceSystem?: string;
  score?: number;
  rationale?: string;
}

export interface N8nScoringResult {
  leadId: string;
  score: number;
  priority: LeadPriority;
  rationale: string;
  recommendedNextStep: string;
}