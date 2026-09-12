const customers = [
    {
        name: "TechVision",
        contact: "John Smith",
        email: "john@techvision.com",
        status: "Active",
        value: "$24,500",
    },
    {
        name: "GrowthLabs",
        contact: "Sarah Johnson",
        email: "sarah@growthlabs.com",
        status: "Active",
        value: "$18,200",
    },
    {
        name: "DigitalFlow",
        contact: "Emily Davis",
        email: "emily@digitalflow.com",
        status: "Active",
        value: "$32,800",
    },
    {
        name: "CloudWorks",
        contact: "Michael Brown",
        email: "michael@cloudworks.com",
        status: "Pending",
        value: "$9,600",
    },
];

export default function CustomersPage() {
    return (
        <div className="mx-auto max-w-7xl space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-slate-900">
                    Customers
                </h1>

                <p className="mt-1 text-sm text-slate-500">
                    Manage your customer relationships.
                </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
                <div className="border-b border-slate-200 p-5">
                    <input
                        type="search"
                        placeholder="Search customers..."
                        className="w-full max-w-sm rounded-lg border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500"
                    />
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                            <tr>
                                <th className="px-5 py-3">Company</th>
                                <th className="px-5 py-3">Contact</th>
                                <th className="px-5 py-3">Email</th>
                                <th className="px-5 py-3">Status</th>
                                <th className="px-5 py-3">Value</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-slate-100">
                            {customers.map((customer) => (
                                <tr
                                    key={customer.email}
                                    className="hover:bg-slate-50"
                                >
                                    <td className="px-5 py-4 font-medium text-slate-900">
                                        {customer.name}
                                    </td>

                                    <td className="px-5 py-4 text-slate-600">
                                        {customer.contact}
                                    </td>

                                    <td className="px-5 py-4 text-slate-600">
                                        {customer.email}
                                    </td>

                                    <td className="px-5 py-4">
                                        <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
                                            {customer.status}
                                        </span>
                                    </td>

                                    <td className="px-5 py-4 font-semibold text-slate-900">
                                        {customer.value}
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