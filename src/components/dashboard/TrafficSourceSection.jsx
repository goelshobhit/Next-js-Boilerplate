import { SalesDistributionChart } from '@/components/charts/SalesDistributionChart';

export default function TrafficSourceSection() {
  return (
    <div className="lg:col-span-12 xl:col-span-4 bg-white p-6 md:p-8 rounded-3xl border border-gray-200 flex flex-col">
      <div className="mb-2">
        <h3 className="text-lg font-bold text-black">Traffic Source</h3>
        <p className="text-sm text-gray-500">Visitor distribution by channel</p>
      </div>
      <div className="flex-1 flex items-center justify-center relative min-h-[200px]">
        <SalesDistributionChart />
        {/* Center Text Overlay for Donut */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center">
            <span className="block text-3xl font-bold text-black">100%</span>
            <span className="text-xs text-[#fff] font-medium uppercase tracking-wider">Total</span>
          </div>
        </div>
      </div>
      <div className="space-y-4 mt-2">
         <div className="flex items-center justify-between text-sm p-3 bg-gray-50 rounded-xl">
            <div className="flex items-center gap-3">
               <div className="w-3 h-3 rounded-full bg-indigo-600"></div>
               <span className="text-gray-700 font-medium">Direct</span>
            </div>
            <span className="font-bold text-black">45%</span>
         </div>
         <div className="flex items-center justify-between text-sm p-3 bg-gray-50 rounded-xl">
            <div className="flex items-center gap-3">
               <div className="w-3 h-3 rounded-full bg-teal-500"></div>
               <span className="text-gray-700 font-medium">Social</span>
            </div>
            <span className="font-bold text-black">35%</span>
         </div>
         <div className="flex items-center justify-between text-sm p-3 bg-gray-50 rounded-xl">
            <div className="flex items-center gap-3">
               <div className="w-3 h-3 rounded-full bg-gray-300"></div>
               <span className="text-gray-700 font-medium">Other</span>
            </div>
            <span className="font-bold text-black">20%</span>
         </div>
      </div>
    </div>
  );
}
