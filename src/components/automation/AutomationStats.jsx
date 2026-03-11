import { Icon } from "@iconify/react";

const stats = [
  {
    title: "Active Automations",
    value: "12",
    change: "+2",
    trend: "up",
    icon: "solar:play-circle-bold-duotone",
    color: "bg-blue-50 text-black",
  },
  {
    title: "Tasks Automated",
    value: "14.5K",
    change: "+18%",
    trend: "up",
    icon: "solar:check-circle-bold-duotone",
    color: "bg-emerald-50 text-emerald-600",
  },
  {
    title: "Time Saved",
    value: "124h",
    change: "+12h",
    trend: "up",
    icon: "solar:clock-circle-bold-duotone",
    color: "bg-purple-50 text-purple-600",
  },
  {
    title: "Success Rate",
    value: "99.8%",
    change: "+0.2%",
    trend: "up",
    icon: "solar:shield-check-bold-duotone",
    color: "bg-orange-50 text-orange-600",
  },
];

export default function AutomationStats() {
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
                stat.trend === "up"
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
