"use client"

import {Link} from "next/link"
import {usePathname} from "next/navigation"

const pageTitles : Record<string , string> = {
    "/dashboard" : "Overview" , 
    "/dashboard/leads" : "Leads" ,
    "/dashboard/customers" : "Customers" , 
    "/dashboard/tasks" : "Tasks" , 
    "/dashboard/analytics" : "Analytics" , 
    "/dashboard/settings" : "Settings"

}

export function DashboardHeader(){
    const pathname = usePathname()
    const title = pageTitles[pathname] ??
    Object.entries(pageTitles).find(([path])=> path!=="/dashboard" && pathname.startsWith(path))?.[1] ?? "Dashboard"
     return(
        <header className="flex h-16 items-center justify-between border-b border-slate-200 px-6">
            <div className="text-lg font-semibold text-slate-900">{title}</div>
            <p className="text-sm text-slate-500">Welcome to the Dashboard!</p>
            <div className="flex items-center gap-4">
                <button className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
                    Logout
                </button>
                <Link href="/dashboard/settings/profile" className="rounded bg-slate-100 px-4 py-2 text-sm font-medium text-slate-900 hover:bg-slate-200">
                    Profile
                </Link>
            </div>
        </header>
     )
}