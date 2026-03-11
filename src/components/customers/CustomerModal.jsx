"use client";
import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";

export default function CustomerModal({ isOpen, onClose, customer, onSave }) {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    status: "Active",
    spent: "0.00",
    avatar: ""
  });

  const isEditMode = !!customer;

  // Handle smooth animation state
  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      if (customer) {
        setFormData({
          name: customer.name || "",
          email: customer.email || "",
          status: customer.status || "Active",
          spent: customer.spent ? customer.spent.replace('$', '').replace(',', '') : "0.00",
          avatar: customer.avatar || ""
        });
      } else {
        setFormData({
          name: "",
          email: "",
          status: "Active",
          spent: "0.00",
          avatar: "" // Empty initially, will show placeholder
        });
      }
    } else {
      const timer = setTimeout(() => setIsVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen, customer]);

  if (!isVisible && !isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    // Format spent to currency string if needed, or keep as is.
    // Use a default avatar if none provided
    const finalAvatar = formData.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.name)}&background=random`;
    
    const formattedData = {
      ...formData,
      avatar: finalAvatar,
      spent: `$${parseFloat(formData.spent).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`,
      lastOrder: isEditMode ? customer.lastOrder : new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };
    
    // Simulate API delay
    setTimeout(() => {
        onSave(formattedData);
        onClose();
    }, 500);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, avatar: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

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
        className={`bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden relative transform transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
          isOpen ? "scale-100 translate-y-0 opacity-100" : "scale-95 translate-y-4 opacity-0"
        }`}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
          <h3 className="text-lg font-bold text-black">
            {isEditMode ? "Edit Customer" : "Add New Customer"}
          </h3>
          <button 
            onClick={onClose}
            className="text-[#fff] hover:text-gray-600 transition-colors p-1 hover:bg-gray-100 rounded-lg cursor-pointer"
          >
            <Icon icon="solar:close-circle-bold" width="24" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          
          {/* Profile Image Upload */}
          <div className="flex flex-col items-center justify-center mb-6">
            <div className="relative group cursor-pointer">
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-gray-50 shadow-md bg-gray-50 flex items-center justify-center">
                {formData.avatar ? (
                  <img 
                    src={formData.avatar} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Icon icon="solar:user-bold" className="text-gray-300" width="48" />
                )}
              </div>
              <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <Icon icon="solar:camera-add-bold" className="text-white" width="24" />
              </div>
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleImageChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>
            <p className="text-xs text-[#fff] mt-2">Click to upload image</p>
          </div>

          <div className="space-y-4">
            {/* Name Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm text-black"
                  required
                />
                <Icon icon="solar:user-bold-duotone" className="absolute left-3 top-1/2 -translate-y-1/2 text-[#fff]" width="20" />
              </div>
            </div>

            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm text-black"
                  required
                />
                <Icon icon="solar:letter-bold-duotone" className="absolute left-3 top-1/2 -translate-y-1/2 text-[#fff]" width="20" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                {/* Status Select */}
                <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <div className="relative">
                    <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm text-black appearance-none cursor-pointer"
                    >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Pending">Pending</option>
                    </select>
                    <Icon icon="solar:verified-check-bold-duotone" className="absolute left-3 top-1/2 -translate-y-1/2 text-[#fff]" width="20" />
                    <Icon icon="solar:alt-arrow-down-bold" className="absolute right-3 top-1/2 -translate-y-1/2 text-[#fff] pointer-events-none" width="16" />
                </div>
                </div>

                {/* Spent Input */}
                <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Total Spent ($)</label>
                <div className="relative">
                    <input
                    type="number"
                    name="spent"
                    value={formData.spent}
                    onChange={handleChange}
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm text-black"
                    />
                    <Icon icon="solar:dollar-minimalistic-bold-duotone" className="absolute left-3 top-1/2 -translate-y-1/2 text-[#fff]" width="20" />
                </div>
                </div>
            </div>
          </div>

          <div className="pt-2 flex gap-3">
            <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-3 bg-white border border-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-50 hover:border-gray-300 transition-colors cursor-pointer"
            >
                Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-[#007ce1] text-white py-3 rounded-xl font-medium hover:bg-[#007ce1] transition-colors flex items-center justify-center gap-2 shadow-lg shadow-[#007ce1]/20 cursor-pointer"
            >
              <Icon icon={isEditMode ? "solar:pen-new-square-bold" : "solar:user-plus-bold"} width="20" />
              {isEditMode ? "Save Changes" : "Add Customer"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
