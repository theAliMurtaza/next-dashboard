"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  {
    name: "Overview",
    href: "/dashboard",
    icon: "⌂",
  },
  {
    name: "Leads",
    href: "/dashboard/leads",
    icon: "◎",
  },
  {
    name: "Customers",
    href: "/dashboard/customers",
    icon: "♙",
  },
  {
    name: "Tasks",
    href: "/dashboard/tasks",
    icon: "✓",
  },
  {
    name: "Analytics",
    href: "/dashboard/analytics",
    icon: "▥",
  },
];

const secondaryNavigation = [
  {
    name: "Settings",
    href: "/dashboard/settings",
    icon: "⚙",
  },
];

export function Sidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/dashboard") {
      return pathname === href;
    }

    return pathname.startsWith(href);
  };

  return (
    <aside className="hidden w-64 shrink-0 border-r border-slate-200 bg-white lg:flex lg:flex-col">
      {/* Logo */}
      <div className="flex h-16 items-center border-b border-slate-200 px-6">
        <Link href="/dashboard" className="text-xl font-bold text-slate-900">
          Ops<span className="text-blue-600">Pilot</span>
        </Link>
      </div>

      {/* Main navigation */}
      <nav className="flex-1 space-y-1 p-4">
        <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
          Workspace
        </p>

        {navigation.map((item) => {
          const active = isActive(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                active
                  ? "bg-blue-50 text-blue-700"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <span className="flex h-5 w-5 items-center justify-center text-base">
                {item.icon}
              </span>

              {item.name}
            </Link>
          );
        })}

        <div className="my-6 border-t border-slate-200" />

        <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
          System
        </p>

        {secondaryNavigation.map((item) => {
          const active = isActive(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                active
                  ? "bg-blue-50 text-blue-700"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <span className="flex h-5 w-5 items-center justify-center">
                {item.icon}
              </span>

              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* User */}
      <div className="border-t border-slate-200 p-4">
        <div className="flex items-center gap-3 rounded-lg bg-slate-50 p-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white">
            AM
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-slate-900">
              Admin User
            </p>

            <p className="truncate text-xs text-slate-500">
              admin@opspilot.dev
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}