import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';

const NewTicketModal = ({ isOpen, onClose, initialData = null }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = React.useRef(null);
  
  // Form State
  const [formData, setFormData] = useState({
    subject: '',
    category: 'Technical Support',
    priority: 'Medium',
    description: ''
  });

  // Load initial data if provided (Edit Mode)
  useEffect(() => {
    if (initialData) {
      setFormData({
        subject: initialData.subject || '',
        category: initialData.category || 'Technical Support',
        priority: initialData.priority || 'Medium',
        description: initialData.description || '' // Assuming description exists in data
      });
    } else {
      // Reset form for new ticket
      setFormData({
        subject: '',
        category: 'Technical Support',
        priority: 'Medium',
        description: ''
      });
      setFiles([]);
    }
  }, [initialData, isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

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
      setFiles(prev => [...prev, ...newFiles]);
    }
  };

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      setFiles(prev => [...prev, ...newFiles]);
    }
  };

  const removeFile = (index) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  // Handle animation states
  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      // Small delay to allow render before animating in
      setTimeout(() => setIsAnimating(true), 10);
    } else {
      setIsAnimating(false);
      // Wait for animation to finish before hiding
      setTimeout(() => setIsVisible(false), 300);
    }
  }, [isOpen]);

  if (!isVisible) return null;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${isAnimating ? 'opacity-100' : 'opacity-0'}`}>
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-[#007ce1]/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className={`relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden transition-all duration-300 transform ${isAnimating ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'}`}>
        
        {/* Header with Decorative Background */}
        <div className="relative bg-gradient-to-r from-indigo-600 to-violet-600 px-8 py-6">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Icon icon="solar:ticket-sale-bold" width="120" />
          </div>
          
          <div className="relative z-10 flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">
                {initialData ? 'Edit Ticket' : 'Create New Ticket'}
              </h2>
              <p className="text-indigo-100 text-sm">
                {initialData ? 'Update ticket details and information' : 'Fill in the details below to submit your request'}
              </p>
            </div>
            <button 
              onClick={onClose}
              className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-colors backdrop-blur-md"
            >
              <Icon icon="solar:close-circle-bold" width="24" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="max-h-[70vh] overflow-y-auto px-8 py-6 custom-scrollbar">
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            
            {/* Subject */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Subject</label>
              <div className="relative">
                <Icon icon="solar:pen-new-square-linear" className="absolute left-4 top-1/2 -translate-y-1/2 text-[#fff]" width="20" />
                <input 
                  type="text" 
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="Briefly describe the issue..." 
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-50 transition-all"
                />
              </div>
            </div>

            {/* Grid for Category & Priority */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Category */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Category</label>
                <div className="relative">
                  <select 
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full pl-4 pr-10 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm appearance-none focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-50 transition-all text-gray-600"
                  >
                    <option>Technical Support</option>
                    <option>Billing & Payments</option>
                    <option>Feature Request</option>
                    <option>General Inquiry</option>
                  </select>
                  <Icon icon="solar:alt-arrow-down-linear" className="absolute right-4 top-1/2 -translate-y-1/2 text-[#fff] pointer-events-none" width="20" />
                </div>
              </div>

              {/* Priority */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Priority</label>
                <div className="flex gap-2">
                  {['Low', 'Medium', 'High'].map((p) => (
                    <label key={p} className="cursor-pointer relative flex-1">
                      <input 
                        type="radio" 
                        name="priority" 
                        value={p}
                        checked={formData.priority === p}
                        onChange={handleInputChange}
                        className="peer sr-only" 
                      />
                      <div className="flex items-center justify-center py-3 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 peer-checked:bg-indigo-50 peer-checked:border-indigo-500 peer-checked:text-indigo-600 transition-all hover:bg-gray-50">
                        {p}
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
              <div className="relative">
                <textarea 
                  rows="4"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Please provide detailed information about your request..." 
                  className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-50 transition-all resize-none"
                ></textarea>
              </div>
            </div>

            {/* Attachments */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Attachments</label>
              
              <div 
                className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all cursor-pointer group ${
                  isDragging 
                    ? 'border-indigo-500 bg-indigo-50' 
                    : 'border-gray-200 hover:border-indigo-400 hover:bg-indigo-50/30'
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={triggerFileInput}
              >
                <input 
                  type="file" 
                  ref={fileInputRef}
                  className="hidden" 
                  multiple 
                  onChange={handleFileSelect}
                  accept="image/png, image/jpeg, image/gif, image/svg+xml"
                />
                
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full mb-3 transition-transform ${
                  isDragging ? 'bg-indigo-100 text-indigo-600 scale-110' : 'bg-indigo-50 text-indigo-500 group-hover:scale-110'
                }`}>
                  <Icon icon="solar:cloud-upload-linear" width="24" />
                </div>
                <p className="text-sm font-medium text-gray-700">
                  {isDragging ? "Drop files here" : "Click to upload or drag and drop"}
                </p>
                <p className="text-xs text-[#fff] mt-1">SVG, PNG, JPG or GIF (max. 800x400px)</p>
              </div>

              {/* File List */}
              {files.length > 0 && (
                <div className="mt-4 space-y-2">
                  {files.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 border border-gray-100 rounded-xl group hover:border-indigo-100 transition-all">
                      <div className="flex items-center gap-3 overflow-hidden">
                        <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600 flex-shrink-0">
                          <Icon icon="solar:file-bold" width="16" />
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="text-sm font-medium text-gray-700 truncate block">{file.name}</span>
                          <span className="text-xs text-[#fff]">{(file.size / 1024).toFixed(1)} KB</span>
                        </div>
                      </div>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          removeFile(index);
                        }}
                        className="p-1.5 text-[#fff] hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Icon icon="solar:trash-bin-trash-bold" width="16" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </form>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
          <button 
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all transform hover:-translate-y-0.5">
            <Icon icon="solar:plain-3-bold" width="20" />
            {initialData ? 'Update Ticket' : 'Submit Ticket'}
          </button>
        </div>

      </div>
    </div>
  );
};

export default NewTicketModal;
