import { Icon } from "@iconify/react";

export default function TransactionDetailModal({ isOpen, onClose, transaction }) {
  if (!transaction) return null;

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${
        isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div 
        className={`relative bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden transition-all duration-300 transform ${
          isOpen ? "scale-100 translate-y-0" : "scale-95 translate-y-4"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h3 className="text-lg font-bold text-black">Transaction Details</h3>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-50 rounded-full text-[#fff] hover:text-gray-600 transition-colors cursor-pointer"
          >
            <Icon icon="solar:close-circle-bold" width="24" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          <div className="flex flex-col items-center mb-8">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
              transaction.status === 'Completed' ? 'bg-emerald-50 text-emerald-500' : 'bg-amber-50 text-amber-500'
            }`}>
              <Icon 
                icon={transaction.status === 'Completed' ? "solar:check-circle-bold" : "solar:clock-circle-bold"} 
                width="32" 
              />
            </div>
            <h2 className="text-3xl font-bold text-black tracking-tight">{transaction.amount}</h2>
            <p className="text-gray-500 font-medium mt-1">{transaction.description}</p>
          </div>

          <div className="bg-gray-50 rounded-2xl p-4 space-y-4">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-500">Status</span>
              <span className={`font-semibold px-2 py-1 rounded-lg ${
                transaction.status === 'Completed' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
              }`}>
                {transaction.status}
              </span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-500">Date</span>
              <span className="font-semibold text-black">{transaction.date}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-500">Invoice ID</span>
              <span className="font-semibold text-black font-mono">{transaction.invoice}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-500">Payment Method</span>
              <div className="flex items-center gap-2">
                <Icon icon="logos:visa" width="24" />
                <span className="font-semibold text-black">Visa •••• 4242</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-100 flex gap-3">
          <button className="flex-1 bg-white border border-gray-200 text-gray-700 py-2.5 rounded-xl text-sm font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 cursor-pointer">
             <Icon icon="solar:question-circle-bold" width="18" />
             Report Issue
          </button>
          <button className="flex-1 bg-[#007ce1] text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-[#007ce1] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-gray-200">
             <Icon icon="solar:download-bold" width="18" />
             Download Invoice
          </button>
        </div>
      </div>
    </div>
  );
}
