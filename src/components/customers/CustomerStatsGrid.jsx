import { Icon } from "@iconify/react";

export default function CustomerStatsGrid() {
  const stats = [
    { 
      title: "Total Customers", 
      value: "24,593", 
      change: "+12.5%", 
      trend: "up", 
      icon: "solar:users-group-rounded-bold-duotone",
      color: "text-black",
      bg: "bg-blue-50"
    },
    { 
      title: "Active Members", 
      value: "18,200", 
      change: "+5.2%", 
      trend: "up", 
      icon: "solar:user-check-bold-duotone",
      color: "text-emerald-600",
      bg: "bg-emerald-50"
    },
    { 
      title: "New This Month", 
      value: "2,450", 
      change: "+8.4%", 
      trend: "up", 
      icon: "solar:user-plus-bold-duotone",
      color: "text-purple-600",
      bg: "bg-purple-50"
    },
    { 
      title: "Churn Rate", 
      value: "1.2%", 
      change: "-0.4%", 
      trend: "down", // Good for churn to be down, but trend logic usually red/green. I'll handle color manually.
      icon: "solar:graph-down-bold-duotone",
      color: "text-orange-600",
      bg: "bg-orange-50"
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      {stats.map((stat, index) => {
        // Special logic for Churn Rate: 'down' is good (green), 'up' is bad (red)
        const isChurn = stat.title === "Churn Rate";
        const isPositiveTrend = stat.trend === 'up';
        
        let trendColor = isPositiveTrend ? 'text-emerald-700 bg-emerald-50' : 'text-rose-700 bg-rose-50';
        let trendIcon = isPositiveTrend ? "solar:arrow-right-up-linear" : "solar:arrow-right-down-linear";

        if (isChurn) {
            // Invert logic for churn
            trendColor = !isPositiveTrend ? 'text-emerald-700 bg-emerald-50' : 'text-rose-700 bg-rose-50';
        }

        return (
          <div key={index} className="bg-white p-5 rounded-2xl border border-gray-200 hover:border-gray-300 transition-colors group">
            <div className="flex justify-between items-start mb-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform duration-300`}>
                <Icon icon={stat.icon} width="24" />
              </div>
              <div className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${trendColor}`}>
                {stat.change}
                <Icon icon={trendIcon} width="12" />
              </div>
            </div>
            <div>
              <p className="text-gray-500 text-sm font-medium">{stat.title}</p>
              <h3 className="text-2xl font-bold text-black mt-1">{stat.value}</h3>
            </div>
          </div>
        );
      })}
    </div>
  );
}
