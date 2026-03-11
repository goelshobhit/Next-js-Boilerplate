"use client";
import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Icon } from "@iconify/react";

export default function AddProductModal({ isOpen, onClose, productToEdit, onSave }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    name: "",
    category: "Electronics",
    status: "Active",
    price: "",
    stock: "",
    description: ""
  });

  // Image Upload State
  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      document.body.style.overflow = 'hidden';
      
      // Populate form if editing
      if (productToEdit) {
        setFormData({
          name: productToEdit.name || "",
          category: productToEdit.category || "Electronics",
          status: productToEdit.status || "Active",
          price: productToEdit.price || "",
          stock: productToEdit.stock || "",
          description: productToEdit.description || ""
        });
        // Note: Handling existing images would require more complex logic (converting URL to file object or handling separately)
        // For now we keep files empty or could show existing image as a preview if we had the logic.
        if (productToEdit.image) {
            setFiles([{ preview: productToEdit.image, file: null }]);
        }
      } else {
        // Reset form
        setFormData({
          name: "",
          category: "Electronics",
          status: "Active",
          price: "",
          stock: "",
          description: ""
        });
        setFiles([]);
      }

    } else {
      const timer = setTimeout(() => setIsVisible(false), 300);
      document.body.style.overflow = 'unset';
      return () => {
        clearTimeout(timer);
        document.body.style.overflow = 'unset';
      };
    }
  }, [isOpen, productToEdit]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };


  // Handle Drag Events
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const newFiles = Array.from(e.dataTransfer.files);
      const validImageFiles = newFiles.filter(file => file.type.startsWith('image/'));
      
      if (validImageFiles.length > 0) {
        const newFileObjects = validImageFiles.map(file => ({
          file,
          preview: URL.createObjectURL(file)
        }));
        setFiles(prev => [...prev, ...newFileObjects]);
      }
    }
  };

  // Handle File Input Change
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      const newFileObjects = newFiles.map(file => ({
        file,
        preview: URL.createObjectURL(file)
      }));
      setFiles(prev => [...prev, ...newFileObjects]);
    }
  };

  // Trigger File Input Click
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  // Remove File
  const removeFile = (index) => {
    setFiles(prev => {
      const newFiles = [...prev];
      URL.revokeObjectURL(newFiles[index].preview); // Cleanup memory
      newFiles.splice(index, 1);
      return newFiles;
    });
  };

  if (!mounted) return null;
  if (!isVisible && !isOpen) return null;

  return createPortal(
    <div 
      className={`fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 transition-colors duration-300 ${isOpen ? "bg-black/60 backdrop-blur-sm" : "bg-transparent pointer-events-none"}`}
      onClick={onClose}
    >
      {/* Modal Container */}
      <div 
        onClick={(e) => e.stopPropagation()}
        className={`bg-white w-full shadow-2xl rounded-2xl overflow-hidden relative transform transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] flex flex-col ${
          isOpen ? "scale-100 translate-y-0 opacity-100" : "scale-95 translate-y-4 opacity-0"
        } ${
          isMaximized ? "max-w-[95vw] h-[90vh]" : "max-w-4xl max-h-[90vh]"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-white z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-black">
              <Icon icon="solar:box-minimalistic-bold-duotone" width="24" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-black">{productToEdit ? "Edit Product" : "Add New Product"}</h2>
              <p className="text-xs text-gray-500">{productToEdit ? "Update product details below." : "Fill in the information below to create a new product."}</p>
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

        {/* Body - Scrollable */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Left Column: Image Upload */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Product Images</label>
                
                {/* Hidden File Input */}
                <input 
                  type="file" 
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden" 
                  multiple 
                  accept="image/*"
                />

                {/* Drag & Drop Area */}
                <div 
                  onClick={handleUploadClick}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center text-center transition-all cursor-pointer group ${
                    isDragging 
                      ? "border-blue-500 bg-blue-50" 
                      : "border-gray-200 hover:bg-gray-50 hover:border-blue-300"
                  }`}
                >
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-colors mb-4 ${
                    isDragging ? "bg-blue-100 text-black" : "bg-gray-100 text-[#fff] group-hover:bg-blue-50 group-hover:text-blue-500"
                  }`}>
                    <Icon icon="solar:cloud-upload-bold-duotone" width="32" />
                  </div>
                  <h3 className="text-sm font-semibold text-black">Click to upload or drag and drop</h3>
                  <p className="text-xs text-gray-500 mt-1">SVG, PNG, JPG or GIF (max. 800x400px)</p>
                </div>
              </div>

              {/* Thumbnails Preview */}
              {files.length > 0 && (
                <div className="grid grid-cols-4 gap-3">
                  {files.map((fileObj, index) => (
                    <div key={index} className="aspect-square rounded-xl border border-gray-100 overflow-hidden relative group cursor-pointer">
                      <img src={fileObj.preview} alt={`preview-${index}`} className="w-full h-full object-cover" />
                      <div 
                        onClick={() => removeFile(index)}
                        className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                      >
                         <Icon icon="solar:trash-bin-trash-bold" className="text-white" width="20" />
                      </div>
                    </div>
                  ))}
                  <div 
                    onClick={handleUploadClick}
                    className="aspect-square rounded-xl border border-gray-100 flex items-center justify-center text-[#fff] hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <Icon icon="solar:add-circle-linear" width="24" />
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Form Fields */}
            <div className="space-y-5">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-700">Product Name</label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g. Minimalist Watch" 
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all placeholder:text-[#fff] text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-700">Category</label>
                  <div className="relative">
                    <select 
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all appearance-none bg-white text-sm text-gray-600"
                    >
                      <option>Electronics</option>
                      <option>Fashion</option>
                      <option>Home</option>
                      <option>Office</option>
                    </select>
                    <Icon icon="solar:alt-arrow-down-linear" className="absolute right-4 top-1/2 -translate-y-1/2 text-[#fff] pointer-events-none" width="16" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-700">Status</label>
                  <div className="relative">
                     <select 
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all appearance-none bg-white text-sm text-gray-600"
                    >
                      <option>Active</option>
                      <option>Draft</option>
                      <option>Low Stock</option>
                      <option>Out of Stock</option>
                    </select>
                    <Icon icon="solar:alt-arrow-down-linear" className="absolute right-4 top-1/2 -translate-y-1/2 text-[#fff] pointer-events-none" width="16" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-700">Price</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">$</span>
                    <input 
                      type="number" 
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      placeholder="0.00" 
                      className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all placeholder:text-[#fff] text-sm"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-700">Stock</label>
                  <input 
                    type="number" 
                    name="stock"
                    value={formData.stock}
                    onChange={handleInputChange}
                    placeholder="0" 
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all placeholder:text-[#fff] text-sm"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-700">Description</label>
                <textarea 
                  rows="4"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Enter product description..." 
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all placeholder:text-[#fff] text-sm resize-none"
                ></textarea>
              </div>

            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex items-center justify-end gap-3">
          <button 
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:text-black hover:bg-gray-200/50 transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={() => onSave && onSave(formData)}
            className="px-5 py-2.5 rounded-xl text-sm font-medium bg-[#007ce1] text-white hover:bg-[#007ce1] transition-colors shadow-lg shadow-[#007ce1]/20 flex items-center gap-2"
          >
            <Icon icon="solar:check-circle-bold" width="18" />
            {productToEdit ? "Save Changes" : "Create Product"}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
