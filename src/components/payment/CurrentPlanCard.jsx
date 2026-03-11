import { Icon } from "@iconify/react";
import Link from "next/link";

export default function CurrentPlanCard() {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-[#007ce1] text-white group cursor-pointer">
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2000&auto=format&fit=crop" 
          alt="Plan Background" 
          className="w-full h-full object-cover opacity-20 group-hover:scale-105 transition-transform duration-700"
        />
      </div>
      <div className="relative p-8">
        <div className="flex justify-between items-start mb-6">
          <div>
            <p className="text-gray-300 text-sm font-medium mb-1">Current Plan</p>
            <h3 className="text-2xl font-bold">Pro Plan</h3>
          </div>
          <span className="bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold border border-white/20">Active</span>
        </div>
        
        <ul className="space-y-3 mb-8">
          <li className="flex items-center gap-2 text-sm text-gray-300">
            <Icon icon="solar:check-circle-bold" className="text-emerald-400" />
            Unlimited Projects
          </li>
          <li className="flex items-center gap-2 text-sm text-gray-300">
            <Icon icon="solar:check-circle-bold" className="text-emerald-400" />
            Priority Support
          </li>
          <li className="flex items-center gap-2 text-sm text-gray-300">
            <Icon icon="solar:check-circle-bold" className="text-emerald-400" />
            Advanced Analytics
          </li>
        </ul>

        <div className="flex items-center justify-between mt-auto">
          <div>
            <p className="text-xs text-[#fff]">Renews on</p>
            <p className="text-sm font-medium">Feb 24, 2024</p>
          </div>
          <Link 
            href="/dashboard/upgrade"
            className="bg-white text-black px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-100 transition-colors cursor-pointer"
          >
            Upgrade
          </Link>
        </div>
      </div>
    </div>
  );
}
