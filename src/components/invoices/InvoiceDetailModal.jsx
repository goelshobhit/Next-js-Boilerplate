import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Icon } from "@iconify/react";

export default function InvoiceDetailModal({ isOpen, onClose, invoice }) {
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      document.body.style.overflow = 'hidden';
    } else {
      const timer = setTimeout(() => setIsVisible(false), 300);
      document.body.style.overflow = 'unset';
      return () => {
        clearTimeout(timer);
        document.body.style.overflow = 'unset';
      };
    }
  }, [isOpen]);

  if (!mounted) return null;

  // Mock items data if not provided (since the table data is simple)
  const items = invoice?.items || [
    { id: 1, description: "Professional Web Design", quantity: 1, price: 800 },
    { id: 2, description: "SEO Optimization", quantity: 1, price: 400 },
  ];
  
  // Calculate total if strictly needed from items, otherwise parse invoice.amount
  // For this demo, we'll try to match invoice.amount approximately or just show the items total
  const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  const getStatusColor = (status) => {
    switch (status) {
      case "Paid": return "bg-emerald-50 text-emerald-600 border-emerald-100";
      case "Pending": return "bg-orange-50 text-orange-600 border-orange-100";
      case "Overdue": return "bg-red-50 text-red-600 border-red-100";
      default: return "bg-gray-50 text-gray-600 border-gray-100";
    }
  };

  return createPortal(
    <div 
      className={`fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6 transition-colors duration-300 ${isOpen ? "bg-black/60 backdrop-blur-sm" : "bg-transparent pointer-events-none"}`}
      onClick={onClose}
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className={`bg-white w-full max-w-2xl max-h-[90vh] flex flex-col rounded-3xl shadow-2xl transform transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
          isOpen ? "scale-100 translate-y-0 opacity-100" : "scale-95 translate-y-8 opacity-0"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100 shrink-0 bg-gray-50/30 rounded-t-3xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-50 text-black flex items-center justify-center">
              <Icon icon="solar:document-text-bold" width="24" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-black">Invoice Details</h2>
              <p className="text-sm text-gray-500">{invoice?.id}</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-[#fff] hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
          >
            <Icon icon="solar:close-circle-bold" width="24" />
          </button>
        </div>

        {/* Content */}
        {invoice && (
          <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
            {/* Status Banner */}
            <div className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 border border-gray-100">
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</span>
                <span className={`mt-1 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(invoice.status)}`}>
                  {invoice.status}
                </span>
              </div>
              <div className="flex flex-col text-right">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</span>
                <span className="mt-1 text-sm font-medium text-black">{invoice.date}</span>
              </div>
            </div>

            {/* Client Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Billed To</h3>
                <div className="flex items-start gap-3">
                  <img 
                    src={invoice.client?.image} 
                    alt={invoice.client?.name} 
                    className="w-10 h-10 rounded-full object-cover border border-gray-100"
                  />
                  <div>
                    <p className="text-sm font-bold text-black">{invoice.client?.name}</p>
                    <p className="text-sm text-gray-500">{invoice.client?.email}</p>
                    <p className="text-sm text-gray-500 mt-1">123 Business St, Tech City, TC 90210</p>
                  </div>
                </div>
              </div>
              <div className="sm:text-right">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Payment Details</h3>
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Bank Transfer</p>
                  <p className="text-sm font-medium text-black">Chase Bank</p>
                  <p className="text-sm text-gray-500">**** **** **** 4242</p>
                </div>
              </div>
            </div>

            {/* Items Table */}
            <div>
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Invoice Items</h3>
              <div className="border border-gray-100 rounded-2xl overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-gray-50/50 text-xs uppercase text-gray-500 font-semibold border-b border-gray-100">
                    <tr>
                      <th className="p-3 w-[50%]">Description</th>
                      <th className="p-3 text-center">Qty</th>
                      <th className="p-3 text-right">Price</th>
                      <th className="p-3 text-right">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-sm">
                    {items.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50/30 transition-colors">
                        <td className="p-3 font-medium text-black">{item.description}</td>
                        <td className="p-3 text-center text-gray-500">{item.quantity}</td>
                        <td className="p-3 text-right text-gray-500">${item.price.toFixed(2)}</td>
                        <td className="p-3 text-right font-medium text-black">${(item.quantity * item.price).toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Summary */}
            <div className="flex justify-end">
              <div className="w-full sm:w-1/2 space-y-3">
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Tax (10%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-base font-bold text-black pt-3 border-t border-gray-100">
                  <span>Total Amount</span>
                  <span className="text-black">{invoice.amount || `$${total.toFixed(2)}`}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="p-6 border-t border-gray-100 shrink-0 flex items-center justify-end gap-3 bg-gray-50/50 rounded-b-3xl">
          <button 
            className="px-4 py-2 rounded-xl text-sm font-medium text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 hover:text-black transition-colors flex items-center gap-2"
          >
            <Icon icon="solar:printer-bold" width="18" />
            Print
          </button>
          <button 
            className="px-4 py-2 rounded-xl text-sm font-medium text-white bg-[#007ce1] hover:bg-blue-700 shadow-lg shadow-[#007ce1]/20 transition-all flex items-center gap-2"
          >
            <Icon icon="solar:download-bold" width="18" />
            Download PDF
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
