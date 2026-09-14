import { db } from "@/lib/db";
import { LeadsTable } from "@/components/leads/leads-table";

export const dynamic = "force-dynamic";

export default async function LeadsPage() {
  const leads = await db.getLeads();
  return <LeadsTable leads={leads} />;
}
