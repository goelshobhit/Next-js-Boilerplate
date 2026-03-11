import { Icon } from "@iconify/react";

export default function HelpHeader() {
  return (
    <div className="relative rounded-3xl overflow-hidden h-[300px] flex items-center justify-center text-center p-8 group">
      {/* Background with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?q=80&w=2070&auto=format&fit=crop" 
          alt="Help Center" 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-[#007ce1]/60 backdrop-blur-sm"></div>
      </div>

      <div className="relative z-10 max-w-2xl w-full">
        <h1 className="text-4xl font-bold text-white mb-4">How can we help you?</h1>
        <p className="text-gray-200 mb-8 text-lg">Search our knowledge base or get in touch with our support team.</p>
        
        <div className="relative">
          <Icon icon="solar:magnifer-linear" className="absolute left-4 top-1/2 -translate-y-1/2 text-[#fff]" width="24" />
          <input 
            type="text" 
            placeholder="Search for answers..." 
            className="w-full pl-12 pr-4 py-4 bg-white rounded-2xl text-black placeholder-[#fff] focus:outline-none focus:ring-4 focus:ring-blue-500/30 transition-all shadow-xl"
          />
          <button className="absolute right-2 top-2 bottom-2 bg-[#007ce1] text-white px-6 rounded-xl font-bold text-sm hover:bg-[#007ce1] transition-colors">
            Search
          </button>
        </div>
      </div>
    </div>
  );
}
