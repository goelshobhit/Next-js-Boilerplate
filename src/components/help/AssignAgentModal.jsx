import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';

const agents = [
  { id: 1, name: "Sarah Wilson", email: "sarah@example.com", avatar: "https://i.pravatar.cc/150?u=sarah", role: "Senior Agent", active: true },
  { id: 2, name: "David Kim", email: "david@example.com", avatar: "https://i.pravatar.cc/150?u=david", role: "Support Agent", active: true },
  { id: 3, name: "Jessica Lee", email: "jessica@example.com", avatar: "https://i.pravatar.cc/150?u=jessica", role: "Tech Lead", active: false },
  { id: 4, name: "Michael Chen", email: "michael@example.com", avatar: "https://i.pravatar.cc/150?u=michael", role: "Billing Specialist", active: true },
];

const AssignAgentModal = ({ isOpen, onClose, ticket, onAssign }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAgent, setSelectedAgent] = useState(null);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setTimeout(() => setIsAnimating(true), 10);
      // Pre-select current agent if exists
      if (ticket?.agent) {
        const currentAgent = agents.find(a => a.name === ticket.agent.name);
        if (currentAgent) setSelectedAgent(currentAgent.id);
      } else {
        setSelectedAgent(null);
      }
    } else {
      setIsAnimating(false);
      setTimeout(() => setIsVisible(false), 300);
    }
  }, [isOpen, ticket]);

  const filteredAgents = agents.filter(agent => 
    agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    agent.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAssign = () => {
    // Logic to update ticket
    onAssign && onAssign(selectedAgent);
    onClose();
  };

  if (!isVisible || !ticket) return null;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${isAnimating ? 'opacity-100' : 'opacity-0'}`}>
      <div 
        className="absolute inset-0 bg-[#007ce1]/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      <div className={`relative bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden transition-all duration-300 transform ${isAnimating ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'}`}>
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <div>
            <h2 className="text-lg font-bold text-black">Assign Agent</h2>
            <p className="text-xs text-gray-500 mt-0.5">Select a team member for ticket <span className="font-mono font-medium text-gray-700">{ticket.id}</span></p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-[#fff] hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
          >
            <Icon icon="solar:close-circle-bold" width="24" />
          </button>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-gray-100">
          <div className="relative">
            <Icon icon="solar:magnifer-linear" className="absolute left-3 top-1/2 -translate-y-1/2 text-[#fff]" width="18" />
            <input 
              type="text" 
              placeholder="Search agents..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-50 transition-all"
            />
          </div>
        </div>

        {/* Agents List */}
        <div className="max-h-[300px] overflow-y-auto p-2 custom-scrollbar">
          {filteredAgents.map((agent) => (
            <div 
              key={agent.id}
              onClick={() => setSelectedAgent(agent.id)}
              className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all border ${
                selectedAgent === agent.id 
                  ? 'bg-indigo-50 border-indigo-200 shadow-sm' 
                  : 'border-transparent hover:bg-gray-50'
              }`}
            >
              <div className="relative">
                <img src={agent.avatar} alt={agent.name} className="w-10 h-10 rounded-full" />
                <span className={`absolute bottom-0 right-0 w-3 h-3 border-2 border-white rounded-full ${agent.active ? 'bg-green-500' : 'bg-gray-300'}`}></span>
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <h4 className={`text-sm font-bold ${selectedAgent === agent.id ? 'text-indigo-900' : 'text-black'}`}>{agent.name}</h4>
                  {selectedAgent === agent.id && <Icon icon="solar:check-circle-bold" className="text-indigo-600" width="20" />}
                </div>
                <p className="text-xs text-gray-500">{agent.role}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
          <button 
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={handleAssign}
            disabled={!selectedAgent}
            className="px-6 py-2 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-indigo-200 transition-all"
          >
            Assign Selected
          </button>
        </div>

      </div>
    </div>
  );
};

export default AssignAgentModal;
