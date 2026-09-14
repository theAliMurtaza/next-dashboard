import { db } from "@/lib/db";
import { CustomersTable } from "@/components/customers/customers-table";

export const dynamic = "force-dynamic";

export default async function CustomersPage() {
  const customers = await db.getCustomers();
  return <CustomersTable customers={customers} />;
}
