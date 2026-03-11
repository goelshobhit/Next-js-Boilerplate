import { Icon } from "@iconify/react";

export default function SecurityStats() {
  const stats = [
    {
      title: "Security Score",
      value: "92/100",
      change: "+5% vs last month",
      isPositive: true,
      icon: "solar:shield-check-bold-duotone",
      color: "text-green-600",
      bg: "bg-green-50",
      borderColor: "border-green-100"
    },
    {
      title: "Threats Blocked",
      value: "14",
      change: "2 new this week",
      isPositive: true,
      icon: "solar:danger-triangle-bold-duotone",
      color: "text-red-600",
      bg: "bg-red-50",
      borderColor: "border-red-100"
    },
    {
      title: "Active Sessions",
      value: "3",
      change: "Same as yesterday",
      isPositive: null,
      icon: "solar:devices-bold-duotone",
      color: "text-black",
      bg: "bg-blue-50",
      borderColor: "border-blue-100"
    },
    {
      title: "2FA Status",
      value: "Enabled",
      change: "Protected",
      isPositive: true,
      icon: "solar:lock-password-bold-duotone",
      color: "text-purple-600",
      bg: "bg-purple-50",
      borderColor: "border-purple-100"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, idx) => (
        <div key={idx} className="bg-white p-6 rounded-3xl border border-gray-100 hover:border-gray-200 transition-colors">
          <div className="flex justify-between items-start mb-4">
            <div className={`w-12 h-12 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center border ${stat.borderColor}`}>
              <Icon icon={stat.icon} width="24" />
            </div>
            {stat.isPositive !== null && (
              <span className={`text-xs font-bold px-2 py-1 rounded-full ${stat.isPositive ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                {stat.change}
              </span>
            )}
          </div>
          <div>
            <h3 className="text-gray-500 text-sm font-medium mb-1">{stat.title}</h3>
            <p className="text-2xl font-bold text-black">{stat.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
