"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";
import MessageViewModal from "./MessageViewModal";
import DeleteMessageModal from "./DeleteMessageModal";

export default function MessageTable() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "Alice Freeman",
      email: "alice.free@example.com",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=60",
      subject: "Inquiry about Enterprise Plan",
      preview: "Hi, I was wondering if you offer custom pricing for...",
      content: "Hi, I was wondering if you offer custom pricing for larger teams? We have about 50 members and the current plans don't quite fit our needs. Would love to hop on a call to discuss this further.",
      status: "Unread",
      date: "Today",
      time: "10:30 AM"
    },
    {
      id: 2,
      sender: "Robert Fox",
      email: "robert.fox@example.com",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=60",
      subject: "Feedback on the new dashboard",
      preview: "Just wanted to say the new dashboard looks amazing! ...",
      content: "Just wanted to say the new dashboard looks amazing! The analytics charts are much clearer now. One suggestion though, it would be great if we could export the reports in PDF format directly.",
      status: "Read",
      date: "Yesterday",
      time: "2:15 PM"
    },
    {
      id: 3,
      sender: "Kathryn Murphy",
      email: "kathryn.m@example.com",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=60",
      subject: "Support Request #1023",
      preview: "I'm having trouble connecting my bank account...",
      content: "I'm having trouble connecting my bank account. I keep getting an error code 503. I've tried clearing my cache but it persists. Can you help me look into this?",
      status: "Replied",
      date: "Jan 28",
      time: "9:45 AM"
    },
    {
      id: 4,
      sender: "Darlene Robertson",
      email: "darlene.r@example.com",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=60",
      subject: "Partnership Opportunity",
      preview: "We'd like to propose a partnership with your company...",
      content: "We'd like to propose a partnership with your company. We believe our services align perfectly with your user base. Attached is a proposal deck for your review.",
      status: "Unread",
      date: "Jan 27",
      time: "4:20 PM"
    },
    {
      id: 5,
      sender: "Jerome Bell",
      email: "jerome.b@example.com",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=60",
      subject: "Question about API limits",
      preview: "What are the rate limits for the public API endpoints?",
      content: "What are the rate limits for the public API endpoints? I couldn't find detailed info in the docs. We are planning to integrate heavily and need to know the constraints.",
      status: "Read",
      date: "Jan 26",
      time: "11:00 AM"
    },
  ]);

  const [selectedMessage, setSelectedMessage] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [messageToDelete, setMessageToDelete] = useState(null);

  const handleView = (message) => {
    setSelectedMessage(message);
    setIsViewModalOpen(true);
    
    // Mark as read if unread
    if (message.status === 'Unread') {
      setMessages(messages.map(m => m.id === message.id ? { ...m, status: 'Read' } : m));
    }
  };

  const handleDeleteClick = (message) => {
    setMessageToDelete(message);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (messageToDelete) {
      setMessages(messages.filter(m => m.id !== messageToDelete.id));
      setMessageToDelete(null);
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden flex flex-col h-full">
      <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-black">Recent Messages</h3>
          <p className="text-sm text-gray-500">You have {messages.filter(m => m.status === 'Unread').length} unread messages</p>
        </div>
        
        <div className="flex gap-2">
          <button className="p-2 rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-600 transition-colors">
            <Icon icon="solar:sort-vertical-linear" width="20" />
          </button>
          <button className="p-2 rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-600 transition-colors">
            <Icon icon="solar:filter-linear" width="20" />
          </button>
        </div>
      </div>

      <div className="overflow-x-auto flex-1">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Sender</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Subject</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {messages.map((message) => (
              <tr 
                key={message.id} 
                className={`group hover:bg-gray-50 transition-colors cursor-pointer ${message.status === 'Unread' ? 'bg-blue-50/10' : ''}`}
                onClick={() => handleView(message)}
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img 
                      src={message.avatar} 
                      alt={message.sender} 
                      className="w-10 h-10 flex-shrink-0 rounded-full object-cover border border-gray-100"
                    />
                    <div>
                      <p className={`text-sm ${message.status === 'Unread' ? 'font-bold text-black' : 'font-medium text-gray-700'}`}>
                        {message.sender}
                      </p>
                      <p className="text-xs text-gray-500">{message.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 max-w-xs">
                  <p className={`text-sm ${message.status === 'Unread' ? 'font-bold text-black' : 'font-medium text-gray-700'} truncate`}>
                    {message.subject}
                  </p>
                  <p className="text-xs text-gray-500 truncate">{message.preview}</p>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    message.status === 'Unread' ? 'bg-blue-100 text-blue-700' :
                    message.status === 'Replied' ? 'bg-emerald-100 text-emerald-700' :
                    'bg-gray-100 text-gray-600'
                  }`}>
                    {message.status === 'Unread' && <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-1.5"></span>}
                    {message.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  <div className="flex flex-col">
                    <span className="font-medium text-black">{message.date}</span>
                    <span className="text-xs">{message.time}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                    <button 
                      onClick={() => handleView(message)}
                      className="p-2 text-[#fff] hover:text-black hover:bg-blue-50 rounded-lg transition-colors"
                      title="View"
                    >
                      <Icon icon="solar:eye-bold-duotone" width="18" />
                    </button>
                    <button 
                      className="p-2 text-[#fff] hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                      title="Archive"
                    >
                      <Icon icon="solar:archive-down-minimlistic-bold-duotone" width="18" />
                    </button>
                    <button 
                      onClick={() => handleDeleteClick(message)}
                      className="p-2 text-[#fff] hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <Icon icon="solar:trash-bin-trash-bold-duotone" width="18" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <MessageViewModal 
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        message={selectedMessage}
      />

      <DeleteMessageModal 
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        message={messageToDelete}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
