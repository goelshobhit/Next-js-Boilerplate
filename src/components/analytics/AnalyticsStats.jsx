import { Icon } from "@iconify/react";

const stats = [
  {
    title: "Total Visits",
    value: "2.4M",
    change: "+12.5%",
    trend: "up",
    icon: "solar:eye-bold-duotone",
    color: "bg-blue-50 text-black",
  },
  {
    title: "Bounce Rate",
    value: "42.3%",
    change: "-2.1%",
    trend: "down", // down is good for bounce rate, but let's stick to generic trend logic or handle specifically
    icon: "solar:graph-down-bold-duotone",
    color: "bg-purple-50 text-purple-600",
    isInverse: true, // Custom flag to indicate 'down' is good
  },
  {
    title: "Active Users",
    value: "45.2K",
    change: "+5.4%",
    trend: "up",
    icon: "solar:users-group-two-rounded-bold-duotone",
    color: "bg-orange-50 text-orange-600",
  },
  {
    title: "Avg. Session",
    value: "4m 32s",
    change: "+1.2%",
    trend: "up",
    icon: "solar:clock-circle-bold-duotone",
    color: "bg-emerald-50 text-emerald-600",
  },
];

export default function AnalyticsStats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div 
          key={index} 
          className="bg-white p-6 rounded-3xl border border-gray-100 hover:border-gray-200 transition-colors"
        >
          <div className="flex items-start justify-between mb-4">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${stat.color}`}>
              <Icon icon={stat.icon} width="24" />
            </div>
            <span 
              className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${
                (stat.trend === "up" && !stat.isInverse) || (stat.trend === "down" && stat.isInverse)
                  ? "bg-green-50 text-green-600" 
                  : "bg-red-50 text-red-600"
              }`}
            >
              {stat.trend === "up" ? <Icon icon="solar:arrow-right-up-linear" /> : <Icon icon="solar:arrow-right-down-linear" />}
              {stat.change}
            </span>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">{stat.title}</p>
            <h3 className="text-2xl font-bold text-black mt-1">{stat.value}</h3>
          </div>
        </div>
      ))}
    </div>
  );
}
