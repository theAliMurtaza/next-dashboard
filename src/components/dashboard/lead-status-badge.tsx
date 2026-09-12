type LeadStatus = "New" | "Contacted" | "Qualified" | "Converted"

interface LeadStatusBadgeProps {
    status: LeadStatus
}

const statusStyles : Record<LeadStatus , string> = {
        New : "bg-blue-100 text-blue-800" ,
        Contacted : "bg-yellow-100 text-yellow-800" ,
        Qualified : "bg-green-100 text-green-800" ,
        Converted : "bg-purple-100 text-purple-800"
    }

export function LeadStatusBadge({status} : LeadStatusBadgeProps){
    return(
        <span className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${statusStyles[status]}`}>
            {status}
        </span>
    )
    
}