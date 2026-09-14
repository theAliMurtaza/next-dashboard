"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Building, Search } from "lucide-react";
import { Customer } from "@/types/lead";

export function CustomersTable({ customers }: { customers: Customer[] }) {
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = useMemo(() => {
    return customers.filter(
      (c) =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [customers, searchTerm]);

  const totalRevenue = customers.reduce((acc, curr) => acc + curr.rawNumericValue, 0);

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
              Customer Accounts
            </h1>
            <span className="rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-semibold text-purple-700 dark:bg-purple-950 dark:text-purple-300">
              {customers.length} Active
            </span>
          </div>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Manage enterprise accounts, contracts, and lifetime value.
          </p>
        </div>

        <div className="rounded-xl border border-slate-200/80 bg-white px-4 py-2 text-right shadow-2xs dark:border-slate-800 dark:bg-slate-900">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            Total Contract Value
          </p>
          <p className="text-xl font-bold text-slate-900 dark:text-white">
            ${totalRevenue.toLocaleString()}
          </p>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <div className="border-b border-slate-200/80 p-4 dark:border-slate-800">
          <div className="relative max-w-md">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search customers by company or contact..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50/60 py-2 pl-9 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white dark:border-slate-700 dark:bg-slate-800/60 dark:text-white dark:focus:bg-slate-800"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-slate-100 bg-slate-50/60 text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:border-slate-800 dark:bg-slate-800/40 dark:text-slate-400">
              <tr>
                <th className="px-6 py-3.5">Company</th>
                <th className="px-6 py-3.5">Primary Contact</th>
                <th className="px-6 py-3.5">Email</th>
                <th className="px-6 py-3.5">Status</th>
                <th className="px-6 py-3.5">Annual Value</th>
                <th className="px-6 py-3.5 text-right">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {filtered.map((customer) => (
                <tr
                  key={customer.id}
                  className="transition-colors hover:bg-slate-50/80 dark:hover:bg-slate-800/40"
                >
                  <td className="px-6 py-4 font-semibold text-slate-900 dark:text-white">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-50 text-xs font-bold text-purple-700 dark:bg-purple-950 dark:text-purple-300">
                        <Building className="h-4 w-4" />
                      </div>
                      <span>{customer.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-300">
                    {customer.contact}
                  </td>
                  <td className="px-6 py-4 text-slate-500 text-xs">{customer.email}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        customer.status === "Active"
                          ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
                          : "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300"
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          customer.status === "Active" ? "bg-emerald-500" : "bg-amber-500"
                        }`}
                      />
                      {customer.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-bold text-slate-900 dark:text-white">
                    {customer.value}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      href={`/dashboard/customers/${customer.id}`}
                      className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-blue-600 shadow-2xs transition hover:border-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-blue-400"
                    >
                      Details
                      <ArrowUpRight className="h-3 w-3" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
