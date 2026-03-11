"use client";
import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";

export default function AddPaymentModal({ isOpen, onClose }) {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    cardName: "",
    cardNumber: "",
    expiryDate: "",
    cvc: "",
  });

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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      onClose();
      // Reset form
      setFormData({
        cardName: "",
        cardNumber: "",
        expiryDate: "",
        cvc: "",
      });
    }, 500);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    // Simple formatting logic
    if (name === "cardNumber") {
      formattedValue = value.replace(/\D/g, "").slice(0, 16).replace(/(\d{4})/g, "$1 ").trim();
    } else if (name === "expiryDate") {
      formattedValue = value.replace(/\D/g, "").slice(0, 4).replace(/(\d{2})(\d{0,2})/, "$1/$2").replace(/\/$/, "");
    } else if (name === "cvc") {
      formattedValue = value.replace(/\D/g, "").slice(0, 3);
    }

    setFormData(prev => ({ ...prev, [name]: formattedValue }));
  };

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${
        isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div 
        className={`bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden relative transform transition-all duration-300 ${
          isOpen ? "scale-100 translate-y-0" : "scale-95 translate-y-4"
        }`}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
          <h3 className="text-lg font-bold text-black">Add Payment Method</h3>
          <button 
            onClick={onClose}
            className="text-[#fff] hover:text-gray-600 transition-colors p-1 hover:bg-gray-100 rounded-lg"
          >
            <Icon icon="mdi:close" width="20" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Card Preview (Visual flair) */}
          <div className="bg-gradient-to-br from-[#007ce1] to-[#007ce1] rounded-xl p-6 text-white shadow-lg mb-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
            <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-24 h-24 bg-blue-500/20 rounded-full blur-xl"></div>
            
            <div className="flex justify-between items-start mb-8 relative">
              <Icon icon="mdi:chip" width="32" className="text-yellow-500/80" />
              <Icon icon="logos:mastercard" width="32" />
            </div>
            
            <div className="space-y-4 relative">
              <div className="text-xl font-mono tracking-widest">
                {formData.cardNumber || "**** **** **** ****"}
              </div>
              <div className="flex justify-between text-xs text-[#fff] uppercase tracking-wider">
                <div>
                  <div className="mb-1">Card Holder</div>
                  <div className="text-white font-medium text-sm normal-case">
                    {formData.cardName || "Your Name"}
                  </div>
                </div>
                <div>
                  <div className="mb-1">Expires</div>
                  <div className="text-white font-medium text-sm">
                    {formData.expiryDate || "MM/YY"}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Cardholder Name</label>
              <div className="relative">
                <input
                  type="text"
                  name="cardName"
                  value={formData.cardName}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm text-black"
                  required
                />
                <Icon icon="solar:user-bold-duotone" className="absolute left-3 top-1/2 -translate-y-1/2 text-[#fff]" width="20" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
              <div className="relative">
                <input
                  type="text"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleChange}
                  placeholder="0000 0000 0000 0000"
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm font-mono text-black"
                  required
                  maxLength="19"
                />
                <Icon icon="solar:card-bold-duotone" className="absolute left-3 top-1/2 -translate-y-1/2 text-[#fff]" width="20" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                <div className="relative">
                  <input
                    type="text"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleChange}
                    placeholder="MM/YY"
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm text-black"
                    required
                    maxLength="5"
                  />
                  <Icon icon="solar:calendar-date-bold-duotone" className="absolute left-3 top-1/2 -translate-y-1/2 text-[#fff]" width="20" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">CVC</label>
                <div className="relative">
                  <input
                    type="text"
                    name="cvc"
                    value={formData.cvc}
                    onChange={handleChange}
                    placeholder="123"
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm font-mono text-black"
                    required
                    maxLength="3"
                  />
                  <Icon icon="solar:lock-password-bold-duotone" className="absolute left-3 top-1/2 -translate-y-1/2 text-[#fff]" width="20" />
                </div>
              </div>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full bg-[#007ce1] text-white py-3 rounded-xl font-medium hover:bg-[#007ce1] transition-colors flex items-center justify-center gap-2"
            >
              <Icon icon="solar:card-plus-bold" width="20" />
              Add Payment Method
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
