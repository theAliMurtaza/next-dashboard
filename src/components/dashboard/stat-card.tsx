interface StatCardProps {
    title: string;
    value: string , 
    change: string, 
    description: string,
    icon: string , 
    positive?: boolean
}

export function StatCard({title , value , change , description , icon , positive = true} : StatCardProps){
    return(
        <div className="flex flex-col gap-2 rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-center gap-2">
                <div>
                    <p className="text-sm font-medium text-slate-500">{title}</p>
                    <p className="text-2xl font-semibold text-slate-900">{value}</p>
                </div>
                <div className={`flex h-10 w-10 items-center justify-center rounded-full ${positive ? "bg-green-100" : "bg-red-100"}`}>
                    <div className={`h-6 w-6 ${icon} ${positive ? "text-green-500" : "text-red-500"}`}>{icon}</div>
                </div>
                <div className={`ml-auto text-sm font-medium ${positive ? "text-green-500" : "text-red-500"}`}>{description}</div>
            </div>
        </div>
    )
}