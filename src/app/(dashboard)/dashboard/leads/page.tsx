import { db } from "@/lib/db";
import { LeadsTable } from "@/components/leads/leads-table";

export const dynamic = "force-dynamic";

export default function LeadsPage() {
  const leads = db.getLeads();
  return <LeadsTable leads={leads} />;
}
