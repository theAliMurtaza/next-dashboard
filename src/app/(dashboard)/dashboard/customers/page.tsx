import { db } from "@/lib/db";
import { CustomersTable } from "@/components/customers/customers-table";

export const dynamic = "force-dynamic";

export default function CustomersPage() {
  const customers = db.getCustomers();
  return <CustomersTable customers={customers} />;
}
