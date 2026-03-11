"use client";
import { useState, useEffect, useRef } from "react";
import { Icon } from "@iconify/react";
import NewTicketModal from "./NewTicketModal";
import TicketDetailsModal from "./TicketDetailsModal";
import AssignAgentModal from "./AssignAgentModal";
import DeleteConfirmationModal from "./DeleteConfirmationModal";

const initialTickets = [
  { 
    id: "TK-2049", 
    subject: "Payment failed error on checkout", 
    requester: { name: "Alex Morgan", email: "alex@example.com", avatar: "A" },
    agent: { name: "Sarah Wilson", avatar: "https://i.pravatar.cc/150?u=sarah" },
    status: "Open", 
    priority: "High", 
    created: "Oct 24, 2023",
    lastUpdate: "2 mins ago", 
    category: "Billing" 
  },
  { 
    id: "TK-2048", 
    subject: "How to export data to CSV?", 
    requester: { name: "Mike Chen", email: "mike@example.com", avatar: "M" },
    agent: { name: "David Kim", avatar: "https://i.pravatar.cc/150?u=david" },
    status: "In Progress", 
    priority: "Medium", 
    created: "Oct 23, 2023",
    lastUpdate: "1 hour ago", 
    category: "Support" 
  },
  { 
    id: "TK-2045", 
    subject: "Feature request: Dark mode toggle", 
    requester: { name: "Emma Watson", email: "emma@example.com", avatar: "E" },
    agent: null,
    status: "Resolved", 
    priority: "Low", 
    created: "Oct 22, 2023",
    lastUpdate: "1 day ago", 
    category: "Feature" 
  },
  { 
    id: "TK-2042", 
    subject: "API rate limit reached unexpectedly", 
    requester: { name: "John Doe", email: "john@example.com", avatar: "J" },
    agent: { name: "Sarah Wilson", avatar: "https://i.pravatar.cc/150?u=sarah" },
    status: "Resolved", 
    priority: "High", 
    created: "Oct 20, 2023",
    lastUpdate: "2 days ago", 
    category: "Technical" 
  },
  { 
    id: "TK-2040", 
    subject: "Cannot invite new team members", 
    requester: { name: "Lisa Park", email: "lisa@example.com", avatar: "L" },
    agent: { name: "David Kim", avatar: "https://i.pravatar.cc/150?u=david" },
    status: "Open", 
    priority: "Critical", 
    created: "Oct 19, 2023",
    lastUpdate: "3 days ago", 
    category: "Account" 
  },
];

export default function RecentTicketsTable() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [selectedTickets, setSelectedTickets] = useState([]);
  const [tickets, setTickets] = useState(initialTickets);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleSelectAll = () => {
    if (selectedTickets.length === tickets.length) {
      setSelectedTickets([]);
    } else {
      setSelectedTickets(tickets.map(t => t.id));
    }
  };

  const toggleSelect = (id) => {
    if (selectedTickets.includes(id)) {
      setSelectedTickets(selectedTickets.filter(tid => tid !== id));
    } else {
      setSelectedTickets([...selectedTickets, id]);
    }
  };

  const getStatusStyle = (status) => {
    switch(status) {
      case 'Open': return 'bg-blue-50 text-black border-blue-100';
      case 'In Progress': return 'bg-amber-50 text-amber-600 border-amber-100';
      case 'Resolved': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'Closed': return 'bg-gray-50 text-gray-600 border-gray-100';
      default: return 'bg-gray-50 text-gray-600 border-gray-100';
    }
  };

  const getPriorityIcon = (priority) => {
    switch(priority) {
      case 'Critical': return { icon: "solar:danger-circle-bold", color: "text-red-600" };
      case 'High': return { icon: "solar:flag-bold", color: "text-orange-500" };
      case 'Medium': return { icon: "solar:flag-bold", color: "text-amber-500" };
      case 'Low': return { icon: "solar:flag-bold", color: "text-green-500" };
      default: return { icon: "solar:flag-bold", color: "text-[#fff]" };
    }
  };

  return (
    <>
      <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm">
        {/* Table Header / Toolbar */}
        <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold text-black">Recent Support Tickets</h3>
          <p className="text-gray-500 text-sm mt-1">Manage and track your support requests</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Icon icon="solar:magnifer-linear" className="absolute left-3 top-1/2 -translate-y-1/2 text-[#fff]" width="20" />
            <input 
              type="text" 
              placeholder="Search tickets..." 
              className="pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-50 w-full md:w-64 transition-all"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all">
            <Icon icon="solar:filter-bold-duotone" width="20" />
            Filter
          </button>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all"
          >
            <Icon icon="solar:add-circle-bold" width="20" />
            New Ticket
          </button>
        </div>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 border-b border-gray-100">
              <th className="py-4 px-6 w-12">
                <input 
                  type="checkbox" 
                  className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  checked={selectedTickets.length === tickets.length}
                  onChange={toggleSelectAll}
                />
              </th>
              <th className="py-4 px-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Ticket Details</th>
              <th className="py-4 px-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
              <th className="py-4 px-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Priority</th>
              <th className="py-4 px-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Assigned To</th>
              <th className="py-4 px-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Last Update</th>
              <th className="py-4 px-6 w-16"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {tickets.map((ticket, index) => (
              <tr key={ticket.id} className="hover:bg-gray-50/80 transition-colors group">
                <td className="py-4 px-6">
                  <input 
                    type="checkbox" 
                    className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    checked={selectedTickets.includes(ticket.id)}
                    onChange={() => toggleSelect(ticket.id)}
                  />
                </td>
                <td className="py-4 px-4">
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-black group-hover:text-indigo-600 transition-colors cursor-pointer mb-1">
                      {ticket.subject}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] font-bold text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded border border-gray-200">
                        {ticket.id}
                      </span>
                      <span className="text-xs text-gray-500">•</span>
                      <span className="text-xs text-gray-500">{ticket.category}</span>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border ${getStatusStyle(ticket.status)}`}>
                    {ticket.status === 'Open' && <span className="w-1.5 h-1.5 rounded-full bg-current mr-1.5 animate-pulse"></span>}
                    {ticket.status}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-1.5">
                    <Icon icon={getPriorityIcon(ticket.priority).icon} className={getPriorityIcon(ticket.priority).color} width="16" />
                    <span className={`text-xs font-bold ${getPriorityIcon(ticket.priority).color}`}>
                      {ticket.priority}
                    </span>
                  </div>
                </td>
                <td className="py-4 px-4">
                  {ticket.agent ? (
                    <div className="flex items-center gap-2">
                      <img src={ticket.agent.avatar} alt={ticket.agent.name} className="w-6 h-6 rounded-full border border-gray-200" />
                      <span className="text-sm text-gray-600">{ticket.agent.name}</span>
                    </div>
                  ) : (
                    <span className="text-xs text-[#fff] italic">Unassigned</span>
                  )}
                </td>
                <td className="py-4 px-4 text-right">
                  <div className="flex flex-col items-end">
                    <span className="text-sm font-bold text-black">{ticket.lastUpdate}</span>
                    <span className="text-xs text-[#fff]">Created {ticket.created}</span>
                  </div>
                </td>
                <td className="py-4 px-6 text-right relative">
                  <div className="relative">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveDropdown(activeDropdown === ticket.id ? null : ticket.id);
                      }}
                      className={`p-2 rounded-lg transition-colors ${
                        activeDropdown === ticket.id 
                          ? 'bg-indigo-50 text-indigo-600' 
                          : 'text-[#fff] hover:text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <Icon icon="solar:menu-dots-bold" width="20" />
                    </button>

                    {/* Dropdown Menu */}
                    {activeDropdown === ticket.id && (
                      <div 
                        ref={dropdownRef}
                        className={`absolute right-0 w-48 bg-white rounded-xl shadow-xl border border-gray-100 z-10 overflow-hidden transform transition-all animate-in fade-in duration-200 ${
                          index >= tickets.length - 2 
                            ? 'bottom-full mb-1 origin-bottom-right zoom-in-95' 
                            : 'top-full mt-1 origin-top-right zoom-in-95'
                        }`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="p-1">
                          <button 
                            className="w-full flex items-center gap-2 px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-indigo-600 rounded-lg transition-colors text-left"
                            onClick={() => {
                              setActiveDropdown(null);
                              setSelectedTicket(ticket);
                              setIsDetailsModalOpen(true);
                            }}
                          >
                            <Icon icon="solar:eye-linear" width="18" />
                            View Details
                          </button>
                          <button 
                            className="w-full flex items-center gap-2 px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-indigo-600 rounded-lg transition-colors text-left"
                            onClick={() => {
                              setActiveDropdown(null);
                              setSelectedTicket(ticket);
                              setIsModalOpen(true);
                            }}
                          >
                            <Icon icon="solar:pen-linear" width="18" />
                            Edit Ticket
                          </button>
                          <button 
                            className="w-full flex items-center gap-2 px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-indigo-600 rounded-lg transition-colors text-left"
                            onClick={() => {
                              setActiveDropdown(null);
                              setSelectedTicket(ticket);
                              setIsAssignModalOpen(true);
                            }}
                          >
                            <Icon icon="solar:user-plus-linear" width="18" />
                            Assign Agent
                          </button>
                          <div className="h-px bg-gray-100 my-1"></div>
                          <button 
                            className="w-full flex items-center gap-2 px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors text-left"
                            onClick={() => {
                              setActiveDropdown(null);
                              setSelectedTicket(ticket);
                              setIsDeleteModalOpen(true);
                            }}
                          >
                            <Icon icon="solar:trash-bin-trash-linear" width="18" />
                            Delete Ticket
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="p-4 border-t border-gray-100 bg-gray-50/30 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-gray-500">
          Showing <span className="font-bold text-black">1-5</span> of <span className="font-bold text-black">24</span> tickets
        </p>
        <div className="flex items-center gap-2">
          <button className="p-2 border border-gray-200 rounded-lg bg-white text-[#fff] hover:text-gray-600 hover:bg-gray-50 disabled:opacity-50 transition-colors" disabled>
            <Icon icon="solar:alt-arrow-left-linear" width="20" />
          </button>
          <div className="flex items-center gap-1">
            <button className="w-8 h-8 rounded-lg bg-indigo-600 text-white text-sm font-bold shadow-sm">1</button>
            <button className="w-8 h-8 rounded-lg text-gray-600 hover:bg-gray-100 text-sm font-medium transition-colors">2</button>
            <button className="w-8 h-8 rounded-lg text-gray-600 hover:bg-gray-100 text-sm font-medium transition-colors">3</button>
            <span className="text-[#fff]">...</span>
            <button className="w-8 h-8 rounded-lg text-gray-600 hover:bg-gray-100 text-sm font-medium transition-colors">5</button>
          </div>
          <button className="p-2 border border-gray-200 rounded-lg bg-white text-gray-600 hover:text-black hover:bg-gray-50 transition-colors">
            <Icon icon="solar:alt-arrow-right-linear" width="20" />
          </button>
        </div>
      </div>
      </div>
      
      <NewTicketModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        initialData={selectedTicket}
      />
      
      {selectedTicket && (
        <>
          <TicketDetailsModal 
            isOpen={isDetailsModalOpen} 
            onClose={() => setIsDetailsModalOpen(false)} 
            ticket={selectedTicket} 
          />
          
          <AssignAgentModal 
            isOpen={isAssignModalOpen} 
            onClose={() => setIsAssignModalOpen(false)} 
            ticket={selectedTicket} 
          />
          
          <DeleteConfirmationModal 
            isOpen={isDeleteModalOpen} 
            onClose={() => setIsDeleteModalOpen(false)} 
            ticket={selectedTicket} 
          />
        </>
      )}
    </>
  );
}
