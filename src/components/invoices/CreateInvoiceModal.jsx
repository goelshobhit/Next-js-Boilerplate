import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Icon } from "@iconify/react";

export default function CreateInvoiceModal({ isOpen, onClose }) {
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    clientName: "",
    clientEmail: "",
    invoiceNumber: "INV-001", // Should ideally be auto-generated
    issueDate: new Date().toISOString().split('T')[0],
    dueDate: "",
    status: "Draft",
    items: [
      { id: 1, description: "Web Design Service", quantity: 1, price: 500 }
    ],
    notes: ""
  });

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Item Management
  const addItem = () => {
    const newItem = {
      id: Date.now(),
      description: "",
      quantity: 1,
      price: 0
    };
    setFormData(prev => ({
      ...prev,
      items: [...prev.items, newItem]
    }));
  };

  const removeItem = (id) => {
    if (formData.items.length === 1) return; // Prevent removing last item
    setFormData(prev => ({
      ...prev,
      items: prev.items.filter(item => item.id !== id)
    }));
  };

  const updateItem = (id, field, value) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.map(item => 
        item.id === id ? { ...item, [field]: value } : item
      )
    }));
  };

  // Calculations
  const calculateSubtotal = () => {
    return formData.items.reduce((sum, item) => sum + (Number(item.quantity) * Number(item.price)), 0);
  };

  const subtotal = calculateSubtotal();
  const tax = subtotal * 0.1; // Assuming 10% tax for example
  const total = subtotal + tax;

  if (!mounted) return null;

  return createPortal(
    <div 
      className={`fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 transition-colors duration-300 ${isOpen ? "bg-black/60 backdrop-blur-sm" : "bg-transparent pointer-events-none"}`}
      onClick={onClose}
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className={`bg-white w-full max-w-4xl max-h-[90vh] flex flex-col rounded-3xl shadow-2xl transform transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
          isOpen ? "scale-100 translate-y-0 opacity-100" : "scale-95 translate-y-8 opacity-0"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100 shrink-0">
          <div>
            <h2 className="text-xl font-bold text-black">Create New Invoice</h2>
            <p className="text-sm text-gray-500 mt-1">Fill in the details to create a new invoice</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-[#fff] hover:text-gray-600 hover:bg-gray-50 rounded-xl transition-colors"
          >
            <Icon icon="solar:close-circle-bold" width="24" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
          
          {/* Top Section: Client & Invoice Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Client Info */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-black uppercase tracking-wider flex items-center gap-2">
                <Icon icon="solar:user-bold-duotone" className="text-blue-500" />
                Client Details
              </h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Client Name</label>
                  <input
                    type="text"
                    name="clientName"
                    value={formData.clientName}
                    onChange={handleInputChange}
                    placeholder="e.g. Acme Corp"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all placeholder:text-[#fff]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Client Email</label>
                  <input
                    type="email"
                    name="clientEmail"
                    value={formData.clientEmail}
                    onChange={handleInputChange}
                    placeholder="billing@acme.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all placeholder:text-[#fff]"
                  />
                </div>
              </div>
            </div>

            {/* Invoice Meta */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-black uppercase tracking-wider flex items-center gap-2">
                <Icon icon="solar:document-text-bold-duotone" className="text-purple-500" />
                Invoice Details
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Invoice #</label>
                  <input
                    type="text"
                    name="invoiceNumber"
                    value={formData.invoiceNumber}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed outline-none"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all bg-white"
                  >
                    <option value="Draft">Draft</option>
                    <option value="Pending">Pending</option>
                    <option value="Paid">Paid</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Issue Date</label>
                  <input
                    type="date"
                    name="issueDate"
                    value={formData.issueDate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-gray-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                  <input
                    type="date"
                    name="dueDate"
                    value={formData.dueDate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-gray-600"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Items Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-black uppercase tracking-wider flex items-center gap-2">
                <Icon icon="solar:cart-large-minimalistic-bold-duotone" className="text-orange-500" />
                Items
              </h3>
              <button 
                onClick={addItem}
                className="text-sm font-medium text-black hover:text-blue-700 hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5"
              >
                <Icon icon="solar:add-circle-bold" />
                Add Item
              </button>
            </div>

            <div className="border border-gray-100 rounded-2xl overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead className="bg-gray-50/50 border-b border-gray-100 text-xs uppercase text-gray-500 font-semibold hidden sm:table-header-group">
                  <tr>
                    <th className="p-4 w-[40%]">Description</th>
                    <th className="p-4 w-[15%] text-center">Qty</th>
                    <th className="p-4 w-[20%] text-right">Price</th>
                    <th className="p-4 w-[20%] text-right">Total</th>
                    <th className="p-4 w-[5%]"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {formData.items.map((item, index) => (
                    <tr key={item.id} className="group hover:bg-gray-50/30 transition-colors grid grid-cols-12 gap-3 sm:gap-0 sm:table-row border-b border-gray-100 sm:border-none p-4 sm:p-0 relative">
                      <td className="col-span-12 sm:w-[40%] p-0 sm:p-3">
                        <label className="block text-xs font-semibold text-gray-500 mb-1 sm:hidden">Description</label>
                        <input
                          type="text"
                          placeholder="Item description"
                          value={item.description}
                          onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                          className="w-full px-3 py-2 rounded-lg border border-transparent hover:border-gray-200 focus:border-blue-500 focus:bg-white bg-transparent outline-none transition-all placeholder:text-gray-300"
                        />
                      </td>
                      <td className="col-span-3 sm:w-[15%] p-0 sm:p-3">
                        <label className="block text-xs font-semibold text-gray-500 mb-1 text-center sm:hidden">Qty</label>
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => updateItem(item.id, 'quantity', e.target.value)}
                          className="w-full px-3 py-2 rounded-lg border border-transparent hover:border-gray-200 focus:border-blue-500 focus:bg-white bg-transparent outline-none transition-all text-center"
                        />
                      </td>
                      <td className="col-span-4 sm:w-[20%] p-0 sm:p-3">
                        <label className="block text-xs font-semibold text-gray-500 mb-1 text-right sm:hidden">Price</label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#fff] text-sm">$</span>
                          <input
                            type="number"
                            min="0"
                            value={item.price}
                            onChange={(e) => updateItem(item.id, 'price', e.target.value)}
                            className="w-full pl-7 pr-3 py-2 rounded-lg border border-transparent hover:border-gray-200 focus:border-blue-500 focus:bg-white bg-transparent outline-none transition-all text-right"
                          />
                        </div>
                      </td>
                      <td className="col-span-3 sm:w-[20%] p-0 sm:p-3 text-right font-medium text-black flex flex-col justify-center sm:table-cell sm:align-middle">
                        <label className="block text-xs font-semibold text-gray-500 mb-1 sm:hidden">Total</label>
                        <span className="block py-2">
                          ${(Number(item.quantity) * Number(item.price)).toFixed(2)}
                        </span>
                      </td>
                      <td className="col-span-2 sm:w-[5%] p-0 sm:p-3 text-center flex items-center justify-center sm:table-cell sm:align-middle">
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-gray-300 hover:text-red-500 p-1.5 rounded-lg hover:bg-red-50 transition-colors sm:opacity-0 group-hover:opacity-100 mt-5 sm:mt-0"
                          title="Remove Item"
                        >
                          <Icon icon="solar:trash-bin-trash-bold" width="18" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Summary Section */}
          <div className="flex flex-col md:flex-row justify-between gap-8 border-t border-gray-100 pt-8">
            <div className="w-full md:w-1/2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                rows="3"
                placeholder="Additional notes or payment instructions..."
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all resize-none placeholder:text-[#fff]"
              ></textarea>
            </div>
            
            <div className="w-full md:w-1/3 space-y-3">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Subtotal</span>
                <span className="font-medium text-black">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Tax (10%)</span>
                <span className="font-medium text-black">${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-base font-bold text-black pt-3 border-t border-gray-100">
                <span>Total Amount</span>
                <span className="text-black">${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-100 shrink-0 flex items-center justify-end gap-3 bg-gray-50/50 rounded-b-3xl">
          <button 
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl text-sm font-medium text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 hover:text-black transition-colors"
          >
            Cancel
          </button>
          <button 
            className="px-5 py-2.5 rounded-xl text-sm font-medium text-white bg-[#007ce1] hover:bg-[#007ce1] shadow-lg shadow-[#007ce1]/20 transition-all flex items-center gap-2"
          >
            <Icon icon="solar:check-circle-bold" width="18" />
            Create Invoice
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
