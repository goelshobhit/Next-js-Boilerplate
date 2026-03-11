import { Icon } from "@iconify/react";

export default function PaymentStatsGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-2xl border border-gray-200 flex items-center justify-between group cursor-pointer hover:border-blue-300 transition-all">
        <div>
          <p className="text-gray-500 text-sm font-medium">Total Spent</p>
          <h3 className="text-3xl font-bold text-black mt-2">$12,450</h3>
          <span className="text-emerald-600 text-xs font-semibold bg-emerald-50 px-2 py-1 rounded-full mt-2 inline-block">+12.5% vs last month</span>
        </div>
        <div className="w-14 h-14 rounded-full bg-blue-50 text-black flex items-center justify-center group-hover:scale-110 transition-transform">
          <Icon icon="solar:wallet-money-bold-duotone" width="28" />
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-gray-200 flex items-center justify-between group cursor-pointer hover:border-purple-300 transition-all">
        <div>
          <p className="text-gray-500 text-sm font-medium">Next Invoice</p>
          <h3 className="text-3xl font-bold text-black mt-2">$29.00</h3>
          <span className="text-[#fff] text-xs font-medium mt-2 inline-block">Due on Feb 01, 2024</span>
        </div>
        <div className="w-14 h-14 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform">
          <Icon icon="solar:calendar-date-bold-duotone" width="28" />
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-gray-200 flex items-center justify-between group cursor-pointer hover:border-orange-300 transition-all">
        <div>
          <p className="text-gray-500 text-sm font-medium">Available Credits</p>
          <h3 className="text-3xl font-bold text-black mt-2">$150.00</h3>
          <span className="text-orange-600 text-xs font-semibold bg-orange-50 px-2 py-1 rounded-full mt-2 inline-block">Use for next bill</span>
        </div>
        <div className="w-14 h-14 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center group-hover:scale-110 transition-transform">
          <Icon icon="solar:gift-bold-duotone" width="28" />
        </div>
      </div>
    </div>
  );
}
