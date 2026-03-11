import { Icon } from "@iconify/react";

const categories = [
  { name: "Getting Started", count: "12 articles", icon: "solar:rocket-bold-duotone", color: "text-black", bg: "bg-blue-50" },
  { name: "Account & Billing", count: "8 articles", icon: "solar:wallet-bold-duotone", color: "text-green-600", bg: "bg-green-50" },
  { name: "Features & Guides", count: "24 articles", icon: "solar:book-bookmark-bold-duotone", color: "text-purple-600", bg: "bg-purple-50" },
  { name: "API & Developers", count: "15 articles", icon: "solar:code-circle-bold-duotone", color: "text-orange-600", bg: "bg-orange-50" },
  { name: "Troubleshooting", count: "10 articles", icon: "solar:bug-bold-duotone", color: "text-red-600", bg: "bg-red-50" },
  { name: "Mobile App", count: "6 articles", icon: "solar:smartphone-bold-duotone", color: "text-cyan-600", bg: "bg-cyan-50" },
];

export default function DocumentationCategories() {
  return (
    <div className="bg-white p-6 rounded-3xl border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-black">Documentation</h3>
        <button className="text-sm font-bold text-black hover:text-blue-700">View All</button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-6 gap-6">
        {categories.map((cat, idx) => (
          <div key={idx} className="p-5 rounded-2xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50/30 transition-all cursor-pointer group flex items-start gap-4 h-full">
            <div className={`w-12 h-12 rounded-2xl ${cat.bg} ${cat.color} flex items-center justify-center group-hover:scale-110 transition-transform shrink-0`}>
              <Icon icon={cat.icon} width="24" />
            </div>
            <div>
              <h4 className="font-bold text-black text-sm mb-1 group-hover:text-blue-700 transition-colors">{cat.name}</h4>
              <p className="text-xs text-gray-500 font-medium">{cat.count}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
