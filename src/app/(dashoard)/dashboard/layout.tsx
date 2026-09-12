import {DashboardHeader} from "@/components/dashboard-header";
import {Sidebar} from "@/components/sidebar";

export default function DashboardLayout({
    children,
}:{children: React.ReactNode

}
){
    return(
        <div className="flex min-h-screen flex-col md:flex-row">
            <Sidebar/>
            <DashboardHeader/>
            <main className="flex-1 p-6">
                {children}
            </main>
        </div>
    )
}