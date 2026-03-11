import { Icon } from "@iconify/react";

export default function TopPerformersSection() {
  const teamMembers = [
    { name: "Sarah Wilson", role: "UI Designer", avatar: "https://i.pravatar.cc/150?u=sarah", performance: 92, status: "online" },
    { name: "Mike Johnson", role: "Developer", avatar: "https://i.pravatar.cc/150?u=mike", performance: 88, status: "busy" },
    { name: "Emma Davis", role: "Marketing", avatar: "https://i.pravatar.cc/150?u=emma", performance: 95, status: "offline" },
    { name: "James Miller", role: "Sales", avatar: "https://i.pravatar.cc/150?u=james", performance: 85, status: "online" },
  ];

  const avgPerformance = Math.round(teamMembers.reduce((sum, m) => sum + m.performance, 0) / teamMembers.length);
  const activeMembers = teamMembers.filter(m => m.status === "online").length;

  return (
    <div className="lg:col-span-6 xl:col-span-4 bg-white px-6 py-4 md:px-8 md:py-6 rounded-3xl border border-gray-200 flex flex-col h-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-black">Top Performers</h3>
        <button className="text-sm font-semibold text-black hover:text-blue-700">View All</button>
      </div>
      <div className="space-y-5 flex-1">
        {teamMembers.map((member, idx) => (
          <div key={idx} className="flex items-center gap-4 group cursor-pointer">
            <div className="relative">
              <img 
                src={member.avatar} 
                alt={member.name} 
                className="w-12 h-12 rounded-full border-2 border-white bg-gray-100 object-cover group-hover:scale-105 transition-transform"
              />
              <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                member.status === 'online' ? 'bg-green-500' : 
                member.status === 'busy' ? 'bg-red-500' : 'bg-[#fff]'
              }`}></div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center mb-1">
                <h4 className="text-sm font-bold text-black truncate group-hover:text-black transition-colors">{member.name}</h4>
                <span className="text-sm font-bold text-black">{member.performance}%</span>
              </div>
              <div className="text-xs text-gray-500 mb-2">{member.role}</div>
              <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                <div 
                  className="bg-[#007ce1] h-1.5 rounded-full transition-all duration-1000 ease-out" 
                  style={{ width: `${member.performance}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 p-4 bg-gray-50 rounded-xl grid grid-cols-2 gap-2">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-100 text-black flex items-center justify-center">
            <Icon icon="solar:stars-bold" width="18" />
          </div>
          <div>
            <p className="text-xs text-gray-500 line-clamp-1">Avg Performance</p>
            <p className="text-sm font-bold text-black">{avgPerformance}%</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center">
            <Icon icon="solar:user-bold" width="18" />
          </div>
          <div>
            <p className="text-xs text-gray-500 line-clamp-1">Active Members</p>
            <p className="text-sm font-bold text-black">{activeMembers}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
