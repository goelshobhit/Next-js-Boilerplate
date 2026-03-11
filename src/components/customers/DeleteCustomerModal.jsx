"use client";
import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";

export default function DeleteCustomerModal({ isOpen, onClose, customer, onConfirm }) {
  const [isVisible, setIsVisible] = useState(false);

  // Handle smooth animation state
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
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ease-out"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div 
        className={`bg-white w-full max-w-sm rounded-2xl shadow-2xl overflow-hidden relative transform transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
          isOpen ? "scale-100 translate-y-0 opacity-100" : "scale-95 translate-y-4 opacity-0"
        }`}
      >
        <div className="p-6 text-center">
            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon icon="solar:trash-bin-trash-bold-duotone" className="text-red-500" width="32" />
            </div>
            
            <h3 className="text-xl font-bold text-black mb-2">Delete Customer?</h3>
            <p className="text-gray-500 mb-6">
                Are you sure you want to delete <span className="font-semibold text-black">{customer?.name}</span>? This action cannot be undone.
            </p>

            <div className="flex gap-3">
                <button
                    onClick={onClose}
                    className="flex-1 px-4 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-50 hover:border-gray-300 transition-colors cursor-pointer"
                >
                    Cancel
                </button>
                <button
                    onClick={() => {
                        onConfirm();
                        onClose();
                    }}
                    className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700 transition-colors shadow-lg shadow-red-600/20 cursor-pointer flex items-center justify-center gap-2"
                >
                    <Icon icon="solar:trash-bin-trash-bold" width="18" />
                    Delete
                </button>
            </div>
        </div>
      </div>
    </div>
  );
}
