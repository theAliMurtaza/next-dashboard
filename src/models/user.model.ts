export type UserRole = "admin" | "manager" | "sales_rep" | "viewer" | "user";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
  initials: string;
  title: string;
  organization: string;
  settings: {
    theme: "dark" | "light" | "system";
    emailAlerts: boolean;
    n8nWebhookAlerts: boolean;
    highScoreLeadNotification: boolean;
    dailyDigest: boolean;
  };
}

export const CURRENT_USER: User = {
  id: "user-admin-001",
  name: "Alex Morgan",
  email: "admin@opspilot.dev",
  role: "admin",
  initials: "AM",
  title: "Head of Operations & AI Systems",
  organization: "OpsPilot Enterprise",
  settings: {
    theme: "light",
    emailAlerts: true,
    n8nWebhookAlerts: true,
    highScoreLeadNotification: true,
    dailyDigest: true,
  },
};

export default CURRENT_USER;