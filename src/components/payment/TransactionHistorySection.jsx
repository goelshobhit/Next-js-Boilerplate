import { useState } from "react";
import { Icon } from "@iconify/react";
import TransactionDetailModal from "./TransactionDetailModal";

export default function TransactionHistorySection() {
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const transactions = [
    { id: 1, description: "Pro Plan Subscription", date: "Jan 24, 2024", amount: "$29.00", status: "Completed", invoice: "#INV-2024-001" },
    { id: 2, description: "Extra Member Seat", date: "Jan 22, 2024", amount: "$12.00", status: "Completed", invoice: "#INV-2024-002" },
    { id: 3, description: "Yearly Maintenance", date: "Jan 15, 2024", amount: "$150.00", status: "Pending", invoice: "#INV-2024-003" },
    { id: 4, description: "Ad Campaign Budget", date: "Jan 10, 2024", amount: "$500.00", status: "Completed", invoice: "#INV-2024-004" },
  ];

  const handleRowClick = (transaction) => {
    setSelectedTransaction(transaction);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-lg font-bold text-black">Transaction History</h2>
          <button className="text-black text-sm font-semibold hover:text-blue-700 cursor-pointer">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Description</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Invoice</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {transactions.map((transaction) => (
                <tr 
                  key={transaction.id} 
                  onClick={() => handleRowClick(transaction)}
                  className="hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-black">
                         <Icon icon={transaction.amount.includes("500") ? "solar:graph-up-bold-duotone" : "solar:bill-list-bold-duotone"} width="20" />
                      </div>
                      <span className="text-sm font-medium text-black">{transaction.description}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{transaction.date}</td>
                  <td className="px-6 py-4 text-sm font-bold text-black">{transaction.amount}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      transaction.status === 'Completed' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {transaction.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 flex items-center gap-1 hover:text-black">
                    {transaction.invoice}
                    <Icon icon="solar:download-minimalistic-bold-duotone" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <TransactionDetailModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        transaction={selectedTransaction} 
      />
    </>
  );
}
