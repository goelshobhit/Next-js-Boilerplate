"use client";

import { Icon } from "@iconify/react";

const invoices = [
  {
    id: "INV-001",
    client: {
      name: "Alex Morgan",
      email: "alex@example.com",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    amount: "$1,200.00",
    date: "Oct 24, 2023",
    status: "Paid",
  },
  {
    id: "INV-002",
    client: {
      name: "Sarah Smith",
      email: "sarah@example.com",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    amount: "$850.00",
    date: "Oct 22, 2023",
    status: "Pending",
  },
  {
    id: "INV-003",
    client: {
      name: "Michael Brown",
      email: "michael@example.com",
      image: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    amount: "$2,300.00",
    date: "Oct 20, 2023",
    status: "Overdue",
  },
  {
    id: "INV-004",
    client: {
      name: "Emily Davis",
      email: "emily@example.com",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    amount: "$500.00",
    date: "Oct 18, 2023",
    status: "Paid",
  },
  {
    id: "INV-005",
    client: {
      name: "David Wilson",
      email: "david@example.com",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    amount: "$1,750.00",
    date: "Oct 15, 2023",
    status: "Pending",
  },
];

export default function InvoiceTable({ onView }) {
  const getStatusColor = (status) => {
    switch (status) {
      case "Paid":
        return "bg-emerald-50 text-emerald-600";
      case "Pending":
        return "bg-orange-50 text-orange-600";
      case "Overdue":
        return "bg-red-50 text-red-600";
      default:
        return "bg-gray-50 text-gray-600";
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-black">Recent Invoices</h3>
          <p className="text-sm text-gray-500">Manage and track your recent invoices.</p>
        </div>
        <button className="text-sm font-medium text-black hover:text-blue-700 self-start sm:self-auto">View All</button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 border-b border-gray-100">
              <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Invoice ID</th>
              <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Client</th>
              <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
              <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Amount</th>
              <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
              <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {invoices.map((invoice) => (
              <tr key={invoice.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="p-4 text-sm font-medium text-black">{invoice.id}</td>
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <img 
                      src={invoice.client.image} 
                      alt={invoice.client.name} 
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div>
                      <p className="text-sm font-medium text-black">{invoice.client.name}</p>
                      <p className="text-xs text-gray-500">{invoice.client.email}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4 text-sm text-gray-500">{invoice.date}</td>
                <td className="p-4 text-sm font-semibold text-black">{invoice.amount}</td>
                <td className="p-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(invoice.status)}`}>
                    {invoice.status}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button 
                      onClick={() => onView && onView(invoice)}
                      className="p-2 text-[#fff] hover:text-black hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Icon icon="solar:eye-bold" width="18" />
                    </button>
                    <button className="p-2 text-[#fff] hover:text-black hover:bg-gray-100 rounded-lg transition-colors">
                      <Icon icon="solar:download-bold" width="18" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
