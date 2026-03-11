import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';

const TicketDetailsModal = ({ isOpen, onClose, ticket }) => {
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

  if (!isVisible || !ticket) return null;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${isAnimating ? 'opacity-100' : 'opacity-0'}`}>
      <div 
        className="absolute inset-0 bg-[#007ce1]/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      <div className={`relative bg-white w-full max-w-3xl rounded-3xl shadow-2xl overflow-hidden transition-all duration-300 transform flex flex-col max-h-[85vh] ${isAnimating ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'}`}>
        
        {/* Header */}
        <div className="bg-white border-b border-gray-100 p-6 flex items-start justify-between">
          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600">
              <Icon icon="solar:ticket-sale-bold" width="28" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-mono text-xs font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded border border-gray-200">
                  {ticket.id}
                </span>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${
                  ticket.status === 'Open' ? 'bg-blue-50 text-black border-blue-100' :
                  ticket.status === 'In Progress' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                  ticket.status === 'Resolved' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                  'bg-gray-50 text-gray-600 border-gray-100'
                }`}>
                  {ticket.status}
                </span>
              </div>
              <h2 className="text-xl font-bold text-black">{ticket.subject}</h2>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-[#fff] hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
          >
            <Icon icon="solar:close-circle-bold" width="24" />
          </button>
        </div>

        <div className="flex flex-col md:flex-row h-full overflow-hidden">
          {/* Main Content */}
          <div className="flex-1 overflow-y-auto p-6 custom-scrollbar border-r border-gray-100">
            {/* Requester Info */}
            <div className="flex items-center gap-3 mb-8 p-4 bg-gray-50/50 rounded-2xl border border-gray-100">
              {ticket.requester.avatar.startsWith('http') ? (
                <img src={ticket.requester.avatar} alt={ticket.requester.name} className="w-10 h-10 rounded-full" />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
                  {ticket.requester.avatar}
                </div>
              )}
              <div>
                <p className="text-sm font-bold text-black">{ticket.requester.name}</p>
                <p className="text-xs text-gray-500">{ticket.requester.email}</p>
              </div>
              <div className="ml-auto text-xs text-[#fff]">
                Reported {ticket.created}
              </div>
            </div>

            {/* Description */}
            <div className="prose prose-sm max-w-none mb-8">
              <h3 className="text-sm font-bold text-black mb-3 flex items-center gap-2">
                <Icon icon="solar:document-text-bold" className="text-indigo-500" />
                Description
              </h3>
              <p className="text-gray-600 leading-relaxed bg-white border border-gray-100 p-4 rounded-2xl shadow-sm">
                User reported an issue regarding the payment process. When trying to checkout with a credit card, the system returns a 500 error. This has happened multiple times.
                <br/><br/>
                Please investigate the payment gateway logs.
              </p>
            </div>

            {/* Conversation Mock */}
            <div>
              <h3 className="text-sm font-bold text-black mb-4 flex items-center gap-2">
                <Icon icon="solar:chat-line-bold" className="text-indigo-500" />
                Activity Log
              </h3>
              <div className="space-y-6 relative pl-4 border-l-2 border-gray-100 ml-2">
                <div className="relative">
                  <div className="absolute -left-[21px] top-0 w-3 h-3 rounded-full bg-indigo-500 ring-4 ring-white"></div>
                  <div className="bg-indigo-50/50 p-4 rounded-2xl rounded-tl-none border border-indigo-100">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-bold text-indigo-700">Sarah Wilson (Agent)</span>
                      <span className="text-[10px] text-[#fff]">2 mins ago</span>
                    </div>
                    <p className="text-sm text-gray-700">I've escalated this to the engineering team. We're looking into the gateway logs now.</p>
                  </div>
                </div>
                
                <div className="relative">
                  <div className="absolute -left-[21px] top-0 w-3 h-3 rounded-full bg-gray-300 ring-4 ring-white"></div>
                  <div className="bg-gray-50 p-4 rounded-2xl rounded-tl-none border border-gray-100">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-bold text-gray-700">System</span>
                      <span className="text-[10px] text-[#fff]">1 hour ago</span>
                    </div>
                    <p className="text-sm text-gray-500 italic">Ticket status changed from Open to In Progress</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-full md:w-72 bg-gray-50/50 p-6 overflow-y-auto">
            <h3 className="text-xs font-bold text-[#fff] uppercase tracking-wider mb-4">Ticket Details</h3>
            
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                <span className="text-xs text-gray-500 block mb-1">Assigned Agent</span>
                <div className="flex items-center gap-2">
                  {ticket.agent ? (
                    <>
                      <img src={ticket.agent.avatar} alt={ticket.agent.name} className="w-6 h-6 rounded-full" />
                      <span className="text-sm font-medium text-black">{ticket.agent.name}</span>
                    </>
                  ) : (
                    <span className="text-sm text-[#fff] italic">Unassigned</span>
                  )}
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                <span className="text-xs text-gray-500 block mb-1">Priority</span>
                <div className="flex items-center gap-2">
                  <Icon 
                    icon={
                      ticket.priority === 'High' ? "solar:flag-bold" : 
                      ticket.priority === 'Critical' ? "solar:danger-circle-bold" : "solar:flag-bold"
                    } 
                    className={
                      ticket.priority === 'High' ? "text-orange-500" :
                      ticket.priority === 'Critical' ? "text-red-600" :
                      ticket.priority === 'Medium' ? "text-amber-500" : "text-green-500"
                    } 
                  />
                  <span className="text-sm font-medium text-black">{ticket.priority}</span>
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                <span className="text-xs text-gray-500 block mb-1">Category</span>
                <div className="flex items-center gap-2">
                  <Icon icon="solar:folder-bold" className="text-indigo-400" />
                  <span className="text-sm font-medium text-black">{ticket.category}</span>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <button className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-bold shadow-lg shadow-indigo-200 transition-all">
                Add Note
              </button>
              <button className="w-full mt-3 py-2.5 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-xl text-sm font-bold transition-all">
                Close Ticket
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default TicketDetailsModal;
