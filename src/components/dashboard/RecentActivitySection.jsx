import { Icon } from "@iconify/react";

export default function RecentActivitySection() {
  const recentActivities = [
    { title: "New project created", time: "2 min ago", type: "project", icon: "solar:folder-with-files-bold-duotone", color: "text-blue-500 bg-blue-50" },
    { title: "Meeting with client", time: "1h ago", type: "meeting", icon: "solar:videocamera-record-bold-duotone", color: "text-purple-500 bg-purple-50" },
    { title: "Design system update", time: "3h ago", type: "task", icon: "solar:palette-bold-duotone", color: "text-pink-500 bg-pink-50" },
    { title: "Quarterly report", time: "5h ago", type: "file", icon: "solar:document-text-bold-duotone", color: "text-orange-500 bg-orange-50" },
  ];

  return (
    <div className="lg:col-span-12 xl:col-span-4 bg-white px-6 py-4 md:px-8 md:py-6 rounded-3xl border border-gray-200 flex flex-col h-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-black">Recent Activity</h3>
        <button className="p-2 hover:bg-gray-50 rounded-full text-[#fff] transition-colors">
          <Icon icon="solar:settings-bold" width="20" />
        </button>
      </div>
      <div className="relative flex-1">
         {/* Timeline Line */}
         <div className="absolute left-6 top-4 bottom-4 w-0.5 bg-gray-100"></div>
         
         <div className="space-y-6">
          {recentActivities.map((activity, idx) => (
            <div key={idx} className="relative flex items-center gap-4 group">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 z-10 border-4 border-white ${activity.color} group-hover:scale-110 transition-transform`}>
                <Icon icon={activity.icon} width="20" />
              </div>
              <div className="flex-1 py-1">
                <h4 className="text-sm font-bold text-black group-hover:text-black transition-colors">{activity.title}</h4>
                <p className="text-xs text-gray-500 mt-0.5">{activity.time}</p>
              </div>
              <button className="text-gray-300 hover:text-gray-500">
                <Icon icon="solar:alt-arrow-right-linear" width="20" />
              </button>
            </div>
          ))}
         </div>
      </div>
      <button className="w-full mt-auto py-3 border border-gray-200 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors">
        View All History
      </button>
    </div>
  );
}
