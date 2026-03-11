import { Icon } from "@iconify/react";
import SubscriberChart from '@/components/charts/SubscriberChart';

export default function SubscriberGrowthSection() {
  return (
    <div className="lg:col-span-6 xl:col-span-4 bg-white px-6 py-4 md:px-8 md:py-6 rounded-3xl border border-gray-200 flex flex-col h-full">
       <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-bold text-black">Subscriber Growth</h3>
        <div className="flex items-center gap-1 text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">
          <Icon icon="solar:graph-up-bold" width="16" />
          <span className="text-xs font-bold">+12.5%</span>
        </div>
      </div>
    <p className="text-sm text-gray-500 mb-6">New subscribers over the last 7 days</p>
    <div className="flex-1">
        <SubscriberChart />
      </div>
    <div className="mt-4 grid grid-cols-3 gap-4">
      <div className="p-3 bg-gray-50 rounded-xl">
        <p className="text-[10px] text-gray-500">Total</p>
        <p className="text-sm font-bold text-black">1,245</p>
      </div>
      <div className="p-3 bg-gray-50 rounded-xl">
        <p className="text-[10px] text-gray-500">Peak Day</p>
        <p className="text-sm font-bold text-black">Wed</p>
      </div>
      <div className="p-3 bg-gray-50 rounded-xl">
        <p className="text-[10px] text-gray-500">Avg/Day</p>
        <p className="text-sm font-bold text-black">178</p>
      </div>
    </div>
    </div>
  );
}
