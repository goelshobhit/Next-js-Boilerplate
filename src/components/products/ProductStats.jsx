"use client";
import { Icon } from "@iconify/react";

export default function ProductStats() {
  const stats = [
    {
      title: "Total Products",
      value: "2,543",
      change: "+12.5%",
      isPositive: true,
      icon: "solar:box-minimalistic-bold-duotone",
      color: "text-black",
      bg: "bg-blue-50",
    },
    {
      title: "Active Products",
      value: "1,890",
      change: "+8.2%",
      isPositive: true,
      icon: "solar:shop-bold-duotone",
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      title: "Low Stock",
      value: "45",
      change: "-2.4%",
      isPositive: false,
      icon: "solar:archive-down-minimlistic-bold-duotone",
      color: "text-orange-600",
      bg: "bg-orange-50",
    },
    {
      title: "Total Revenue",
      value: "$84.2k",
      change: "+15.3%",
      isPositive: true,
      icon: "solar:dollar-minimalistic-bold-duotone",
      color: "text-indigo-600",
      bg: "bg-indigo-50",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-white p-6 rounded-2xl border border-gray-100 flex items-start justify-between hover:border-blue-100 transition-colors group"
        >
          <div>
            <p className="text-gray-500 text-sm font-medium">{stat.title}</p>
            <h3 className="text-2xl font-bold text-black mt-2">{stat.value}</h3>
            <div className="flex items-center gap-1 mt-2">
              <span
                className={`text-xs font-semibold ${
                  stat.isPositive ? "text-green-600" : "text-red-600"
                }`}
              >
                {stat.change}
              </span>
              <span className="text-xs text-[#fff]">vs last month</span>
            </div>
          </div>
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform duration-300`}>
            <Icon icon={stat.icon} width="24" />
          </div>
        </div>
      ))}
    </div>
  );
}
