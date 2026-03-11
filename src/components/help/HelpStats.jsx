"use client";
import { Icon } from "@iconify/react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const ticketData = [
  { name: "Open", value: 5, color: "#3B82F6" }, // Blue
  { name: "Progress", value: 3, color: "#F59E0B" }, // Amber
  { name: "Resolved", value: 12, color: "#10B981" }, // Emerald
];

const stats = [
  { label: "Total Tickets", value: "20", icon: "solar:ticket-sale-bold-duotone", color: "text-black", bg: "bg-blue-50" },
  { label: "Avg. Response", value: "2h", icon: "solar:clock-circle-bold-duotone", color: "text-purple-600", bg: "bg-purple-50" },
  { label: "Satisfaction", value: "4.8/5", icon: "solar:stars-bold-duotone", color: "text-yellow-600", bg: "bg-yellow-50" },
];

export default function HelpStats() {
  return (
    <div className="bg-white p-8 rounded-3xl border border-gray-100">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
        {/* Left Column: Key Metrics */}
        <div className="flex flex-col">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-[#007ce1] text-white flex items-center justify-center">
              <Icon icon="solar:chart-2-bold-duotone" width="24" />
            </div>
            <h3 className="text-xl font-bold text-black">Support Overview</h3>
          </div>

          <div className="space-y-4 flex-1">
            {stats.map((stat, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 rounded-2xl hover:bg-gray-50 border border-transparent hover:border-gray-100 transition-all group">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <Icon icon={stat.icon} width="24" />
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-0.5">{stat.label}</p>
                    <h4 className="text-xl font-bold text-black">{stat.value}</h4>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-white border border-gray-100 flex items-center justify-center text-[#fff] group-hover:text-black group-hover:border-gray-300 transition-colors">
                  <Icon icon="solar:alt-arrow-right-linear" width="16" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Chart */}
        <div className="flex flex-col bg-gray-50 rounded-3xl p-4 relative overflow-hidden">
          <div className="flex items-center justify-between mb-4 relative z-10">
            <h3 className="text-base font-bold text-black">Ticket Status</h3>
            <button className="text-[#fff] hover:text-gray-600">
                <Icon icon="solar:menu-dots-bold" width="20" />
            </button>
          </div>

          <div className="flex-1 min-h-[180px] relative z-10">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={ticketData}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  cornerRadius={8}
                  stroke="none"
                >
                  {ticketData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  cursor={false}
                  contentStyle={{ 
                    borderRadius: '12px', 
                    border: 'none', 
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                    padding: '8px 12px',
                    backgroundColor: '#1f2937',
                    color: '#fff'
                  }}
                  itemStyle={{ color: '#fff', fontSize: '12px', fontWeight: '600' }}
                  formatter={(value) => [`${value} Tickets`]}
                />
              </PieChart>
            </ResponsiveContainer>
            
            {/* Center Text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-3xl font-bold text-black">20</span>
                <span className="text-xs text-gray-500 font-medium">Total</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 mt-4 relative z-10">
            {ticketData.map((item, idx) => (
              <div key={idx} className="flex flex-col items-center text-center">
                <div className="w-2 h-2 rounded-full mb-1" style={{ backgroundColor: item.color }}></div>
                <span className="text-[10px] text-gray-500 font-semibold uppercase">{item.name}</span>
                <span className="text-sm font-bold text-black">{item.value}</span>
              </div>
            ))}
          </div>
          
          {/* Background Decoration */}
          <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-gray-100 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
        </div>
      </div>
    </div>
  );
}
