"use client";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Icon } from "@iconify/react";

export default function DeleteProductModal({ isOpen, onClose, onConfirm, productName }) {
  const [isVisible, setIsVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      document.body.style.overflow = 'hidden';
    } else {
      const timer = setTimeout(() => setIsVisible(false), 300);
      document.body.style.overflow = 'unset';
      return () => {
        clearTimeout(timer);
        document.body.style.overflow = 'unset';
      };
    }
  }, [isOpen]);

  if (!mounted) return null;
  if (!isVisible && !isOpen) return null;

  return createPortal(
    <div 
      className={`fixed inset-0 z-[110] flex items-center justify-center p-4 transition-colors duration-300 ${isOpen ? "bg-black/60 backdrop-blur-sm" : "bg-transparent pointer-events-none"}`}
      onClick={onClose}
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className={`bg-white w-full max-w-sm rounded-2xl shadow-2xl p-6 transform transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
          isOpen ? "scale-100 translate-y-0 opacity-100" : "scale-95 translate-y-4 opacity-0"
        }`}
      >
        <div className="flex flex-col items-center text-center">
          <div className="w-12 h-12 rounded-full bg-red-50 text-red-500 flex items-center justify-center mb-4">
            <Icon icon="solar:trash-bin-trash-bold" width="24" />
          </div>
          
          <h3 className="text-lg font-bold text-black mb-2">Delete Product?</h3>
          <p className="text-sm text-gray-500 mb-6">
            Are you sure you want to delete <span className="font-medium text-black">"{productName}"</span>? This action cannot be undone.
          </p>
          
          <div className="flex items-center gap-3 w-full">
            <button 
              onClick={onClose}
              className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
            <button 
              onClick={onConfirm}
              className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium text-white bg-red-500 hover:bg-red-600 shadow-lg shadow-red-500/20 transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
