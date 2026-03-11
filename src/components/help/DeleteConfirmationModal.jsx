import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';

const DeleteConfirmationModal = ({ isOpen, onClose, ticket, onDelete }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setTimeout(() => setIsAnimating(true), 10);
    } else {
      setIsAnimating(false);
      setTimeout(() => setIsVisible(false), 300);
    }
  }, [isOpen]);

  const handleDelete = () => {
    onDelete && onDelete(ticket.id);
    onClose();
  };

  if (!isVisible || !ticket) return null;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${isAnimating ? 'opacity-100' : 'opacity-0'}`}>
      <div 
        className="absolute inset-0 bg-[#007ce1]/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      <div className={`relative bg-white w-full max-w-sm rounded-3xl shadow-2xl overflow-hidden transition-all duration-300 transform ${isAnimating ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'}`}>
        
        <div className="p-8 text-center">
          <div className="w-16 h-16 rounded-2xl bg-red-50 text-red-500 flex items-center justify-center mx-auto mb-6">
            <Icon icon="solar:trash-bin-trash-bold-duotone" width="32" />
          </div>
          
          <h2 className="text-xl font-bold text-black mb-2">Delete Ticket?</h2>
          <p className="text-sm text-gray-500 mb-6">
            Are you sure you want to delete ticket <span className="font-mono font-bold text-gray-700">{ticket.id}</span>? 
            This action cannot be undone and will remove all associated data.
          </p>

          <div className="flex flex-col gap-3">
            <button 
              onClick={handleDelete}
              className="w-full py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl text-sm font-bold shadow-lg shadow-red-200 transition-all"
            >
              Yes, Delete Ticket
            </button>
            <button 
              onClick={onClose}
              className="w-full py-3 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-xl text-sm font-bold transition-all"
            >
              Cancel
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
