import { Icon } from "@iconify/react";

export default function MessageStats() {
  const stats = [
    { 
      title: "Total Messages", 
      value: "2,543", 
      change: "+12.5%", 
      trend: "up", 
      icon: "solar:chat-round-line-bold-duotone",
      color: "text-black",
      bg: "bg-blue-50"
    },
    { 
      title: "Unread Messages", 
      value: "45", 
      change: "-5.2%", 
      trend: "down", 
      icon: "solar:unread-bold-duotone",
      color: "text-rose-600",
      bg: "bg-rose-50"
    },
    { 
      title: "Response Rate", 
      value: "94%", 
      change: "+2.4%", 
      trend: "up", 
      icon: "solar:check-circle-bold-duotone",
      color: "text-emerald-600",
      bg: "bg-emerald-50"
    },
    { 
      title: "Avg. Response Time", 
      value: "1h 24m", 
      change: "-15m", 
      trend: "up", // "up" here means improvement (lower time)
      icon: "solar:clock-circle-bold-duotone",
      color: "text-purple-600",
      bg: "bg-purple-50"
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
