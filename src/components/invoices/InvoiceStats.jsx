import { Icon } from "@iconify/react";

export default function InvoiceStats() {
  const stats = [
    { 
      title: "Total Invoices", 
      value: "1,248", 
      change: "+8.5%", 
      trend: "up", 
      icon: "solar:bill-list-bold-duotone",
      color: "text-black",
      bg: "bg-blue-50"
    },
    { 
      title: "Paid Invoices", 
      value: "$842,300", 
      change: "+12.2%", 
      trend: "up", 
      icon: "solar:check-circle-bold-duotone",
      color: "text-emerald-600",
      bg: "bg-emerald-50"
    },
    { 
      title: "Pending Amount", 
      value: "$24,500", 
      change: "-5.4%", 
      trend: "down", 
      icon: "solar:hourglass-bold-duotone",
      color: "text-orange-600",
      bg: "bg-orange-50"
    },
    { 
      title: "Overdue", 
      value: "$5,240", 
      change: "+2.1%", 
      trend: "down", // down is bad here, but let's keep consistent direction meaning (increase = up)
      icon: "solar:danger-circle-bold-duotone",
      color: "text-red-600",
      bg: "bg-red-50"
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white p-5 rounded-2xl border border-gray-200 hover:border-gray-300 transition-colors group">
          <div className="flex justify-between items-start mb-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform duration-300`}>
              <Icon icon={stat.icon} width="24" />
            </div>
            <div className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${stat.trend === 'up' ? 'text-emerald-700 bg-emerald-50' : 'text-rose-700 bg-rose-50'}`}>
              {stat.trend === 'up' ? '+' : ''}{stat.change}
              <Icon icon={stat.trend === 'up' ? "solar:arrow-right-up-linear" : "solar:arrow-right-down-linear"} width="12" />
            </div>
          </div>
          <div>
            <p className="text-gray-500 text-sm font-medium">{stat.title}</p>
            <h3 className="text-2xl font-bold text-black mt-1">{stat.value}</h3>
          </div>
        </div>
      ))}
    </div>
  );
}
