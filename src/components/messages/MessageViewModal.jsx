"use client";
import { Icon } from "@iconify/react";
import { useState, useEffect } from "react";

export default function MessageViewModal({ isOpen, onClose, message }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
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
        className="absolute inset-0 bg-[#007ce1]/20 backdrop-blur-sm transition-opacity duration-300 ease-out"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div 
        className={`bg-white rounded-2xl border border-gray-200 w-full max-w-2xl overflow-hidden relative transform transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
          isOpen ? "scale-100 translate-y-0 opacity-100" : "scale-95 translate-y-4 opacity-0"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-200">
              <img src={message?.avatar} alt={message?.sender} className="w-full h-full object-cover" />
            </div>
            <div>
              <h3 className="font-bold text-black">{message?.sender}</h3>
              <p className="text-xs text-gray-500">{message?.email}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full text-[#fff] hover:text-gray-600 transition-colors cursor-pointer">
            <Icon icon="solar:close-circle-bold" width="24" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-bold text-black">{message?.subject}</h4>
            <span className="text-sm text-gray-500">{message?.date} • {message?.time}</span>
          </div>
          
          <div className="prose prose-sm max-w-none text-gray-600 mb-8">
            <p>{message?.content}</p>
          </div>

          {/* Quick Reply Box */}
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
            <textarea 
              placeholder="Type your reply..." 
              className="w-full bg-transparent border-none outline-none text-sm resize-none h-24 placeholder-[#fff]"
            ></textarea>
            <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-200">
              <div className="flex gap-2">
                <button className="p-2 hover:bg-gray-200 rounded-lg text-[#fff] transition-colors cursor-pointer">
                  <Icon icon="solar:paperclip-linear" width="20" />
                </button>
                <button className="p-2 hover:bg-gray-200 rounded-lg text-[#fff] transition-colors cursor-pointer">
                  <Icon icon="solar:gallery-linear" width="20" />
                </button>
              </div>
              <button className="bg-[#007ce1] text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors flex items-center gap-2 cursor-pointer shadow-lg shadow-[#007ce1]/20">
                <Icon icon="solar:plain-3-bold-duotone" width="18" />
                Send Reply
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
