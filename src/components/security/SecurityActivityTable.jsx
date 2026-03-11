import { Icon } from "@iconify/react";

const activities = [
  { id: 1, event: "Successful Login", location: "San Francisco, US", ip: "192.168.1.1", time: "2 mins ago", status: "success", icon: "solar:login-2-bold-duotone" },
  { id: 2, event: "Password Changed", location: "San Francisco, US", ip: "192.168.1.1", time: "1 day ago", status: "warning", icon: "solar:key-minimalistic-square-bold-duotone" },
  { id: 3, event: "Failed Login Attempt", location: "Moscow, RU", ip: "45.23.12.90", time: "2 days ago", status: "danger", icon: "solar:shield-warning-bold-duotone" },
  { id: 4, event: "New Device Detected", location: "Austin, US", ip: "10.0.0.5", time: "3 days ago", status: "info", icon: "solar:devices-bold-duotone" },
  { id: 5, event: "2FA Enabled", location: "San Francisco, US", ip: "192.168.1.1", time: "1 week ago", status: "success", icon: "solar:shield-check-bold-duotone" },
];

export default function SecurityActivityTable() {
  const getStatusColor = (status) => {
    switch(status) {
      case 'success': return 'text-green-600 bg-green-50 border-green-100';
      case 'warning': return 'text-orange-600 bg-orange-50 border-orange-100';
      case 'danger': return 'text-red-600 bg-red-50 border-red-100';
      case 'info': return 'text-black bg-blue-50 border-blue-100';
      default: return 'text-gray-600 bg-gray-50 border-gray-100';
    }
  };

  return (
    <div className="bg-white p-6 rounded-3xl border border-gray-100 h-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-black">Recent Activity</h3>
        <button className="text-sm font-bold text-black hover:text-blue-700">View All</button>
      </div>

      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-center justify-between p-3 rounded-2xl hover:bg-gray-50 transition-colors cursor-pointer group">
            <div className="flex items-center gap-4 min-w-0">
              <div className={`w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center border ${getStatusColor(activity.status).split(' ')[2]} ${getStatusColor(activity.status).split(' ')[1]} ${getStatusColor(activity.status).split(' ')[0]}`}>
                <Icon icon={activity.icon} width="20" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-bold text-black group-hover:text-black transition-colors truncate">{activity.event}</p>
                <p className="text-xs text-gray-500 truncate">{activity.location} • {activity.ip}</p>
              </div>
            </div>
            <div className="text-right flex-shrink-0 ml-4">
              <span className="text-xs font-medium text-[#fff] whitespace-nowrap">{activity.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
