import { Icon } from "@iconify/react";
import { SalesChart } from '@/components/charts/SalesChart';

export default function RevenueChartSection() {
  return (
    <div className="lg:col-span-12 xl:col-span-8 bg-white p-6 md:p-8 rounded-3xl border border-gray-200 flex flex-col">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-lg font-bold text-black">Revenue Analytics</h3>
          <p className="text-sm text-gray-500">Monthly revenue growth and trends</p>
        </div>
        <button className="p-2 hover:bg-gray-50 rounded-full text-[#fff] hover:text-gray-600 transition-colors">
          <Icon icon="solar:menu-dots-bold" width="24" />
        </button>
      </div>
      <div className="flex-1 w-full min-h-[300px]">
        <SalesChart />
      </div>
    </div>
  );
}
