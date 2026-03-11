"use client";
import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";

export default function ComposeMessageModal({ isOpen, onClose }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);

  // Handle smooth animation state
  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setIsMaximized(false);
    } else {
      const timer = setTimeout(() => setIsVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isVisible && !isOpen) return null;

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
        isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-[#007ce1]/30 backdrop-blur-sm transition-opacity duration-300 ease-out"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div 
        className={`bg-white w-full shadow-2xl rounded-2xl overflow-hidden relative transform transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] flex flex-col ${
          isOpen ? "scale-100 translate-y-0 opacity-100" : "scale-95 translate-y-4 opacity-0"
        } ${
          isMaximized ? "max-w-[95vw] h-[90vh]" : "max-w-2xl max-h-[90vh]"
        }`}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/80 backdrop-blur-md sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-black">
              <Icon icon="solar:pen-new-square-bold-duotone" width="24" />
            </div>
            <div>
              <h3 className="font-bold text-black">New Message</h3>
              <p className="text-xs text-gray-500">Compose a new message</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button 
                onClick={() => setIsMaximized(!isMaximized)}
                className="p-2 hover:bg-gray-100 rounded-full text-[#fff] hover:text-gray-600 transition-colors"
            >
              <Icon icon={isMaximized ? "solar:minimize-square-linear" : "solar:maximize-square-linear"} width="20" />
            </button>
            <button 
                onClick={onClose} 
                className="p-2 hover:bg-red-50 rounded-full text-[#fff] hover:text-red-500 transition-colors"
            >
              <Icon icon="solar:close-circle-bold" width="24" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-5">
            
            {/* To Field */}
            <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">To</label>
                <div className="relative group">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#fff] group-focus-within:text-blue-500 transition-colors">
                        <Icon icon="solar:user-circle-bold" width="20" />
                    </div>
                    <input 
                        type="text" 
                        placeholder="Recipient (e.g., name@example.com)" 
                        className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all placeholder:text-[#fff] text-sm font-medium"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1">
                        <button className="text-xs font-medium text-gray-500 hover:text-black hover:bg-blue-50 px-2 py-1 rounded transition-colors">CC</button>
                        <button className="text-xs font-medium text-gray-500 hover:text-black hover:bg-blue-50 px-2 py-1 rounded transition-colors">BCC</button>
                    </div>
                </div>
            </div>

            {/* Subject Field */}
            <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">Subject</label>
                <div className="relative group">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#fff] group-focus-within:text-blue-500 transition-colors">
                        <Icon icon="solar:letter-bold" width="20" />
                    </div>
                    <input 
                        type="text" 
                        placeholder="What is this regarding?" 
                        className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all placeholder:text-[#fff] text-sm font-medium"
                    />
                </div>
            </div>

            {/* Message Body */}
            <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">Message</label>
                <div className="border border-gray-200 rounded-xl overflow-hidden focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10 transition-all bg-white">
                    {/* Toolbar */}
                    <div className="flex items-center gap-1 p-2 border-b border-gray-100 bg-gray-50/50">
                        <button className="p-1.5 hover:bg-gray-200 rounded text-gray-500 hover:text-gray-700 transition-colors">
                            <Icon icon="solar:text-bold-bold" width="18" />
                        </button>
                        <button className="p-1.5 hover:bg-gray-200 rounded text-gray-500 hover:text-gray-700 transition-colors">
                            <Icon icon="solar:text-italic-bold" width="18" />
                        </button>
                        <button className="p-1.5 hover:bg-gray-200 rounded text-gray-500 hover:text-gray-700 transition-colors">
                            <Icon icon="solar:text-underline-bold" width="18" />
                        </button>
                        <div className="w-px h-4 bg-gray-300 mx-1"></div>
                        <button className="p-1.5 hover:bg-gray-200 rounded text-gray-500 hover:text-gray-700 transition-colors">
                            <Icon icon="solar:list-bold" width="18" />
                        </button>
                        <button className="p-1.5 hover:bg-gray-200 rounded text-gray-500 hover:text-gray-700 transition-colors">
                            <Icon icon="solar:link-bold" width="18" />
                        </button>
                        <div className="flex-1"></div>
                        <button className="p-1.5 hover:bg-gray-200 rounded text-gray-500 hover:text-gray-700 transition-colors">
                            <Icon icon="solar:emoji-funny-circle-linear" width="18" />
                        </button>
                    </div>
                    <textarea 
                        placeholder="Write your message here..." 
                        className="w-full p-4 h-48 outline-none text-sm resize-none placeholder:text-[#fff]"
                    ></textarea>
                </div>
            </div>

            {/* Attachments Drop Zone */}
            <div className="border-2 border-dashed border-gray-200 rounded-xl p-4 flex flex-col items-center justify-center text-center hover:border-blue-400 hover:bg-blue-50/30 transition-all cursor-pointer group">
                <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center mb-2 group-hover:scale-110 transition-transform text-[#fff] group-hover:text-blue-500">
                    <Icon icon="solar:cloud-upload-bold-duotone" width="24" />
                </div>
                <p className="text-sm font-medium text-gray-700">Click to upload or drag and drop</p>
                <p className="text-xs text-gray-500">SVG, PNG, JPG or PDF (max. 10MB)</p>
            </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex items-center justify-between">
            <button 
                onClick={onClose}
                className="px-4 py-2 text-gray-600 font-medium hover:text-black transition-colors text-sm"
            >
                Save as Draft
            </button>
            <button className="bg-[#007ce1] text-white px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-[#007ce1] transition-all shadow-lg shadow-[#007ce1]/20 flex items-center gap-2 group">
                <span className="group-hover:-translate-y-0.5 transition-transform">Send Message</span>
                <Icon icon="solar:plain-3-bold-duotone" width="20" className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
        </div>
      </div>
    </div>
  );
}
