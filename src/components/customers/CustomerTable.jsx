"use client";
import { useState, useRef, useEffect } from "react";
import { Icon } from "@iconify/react";
import CustomerModal from "@/components/customers/CustomerModal";
import DeleteCustomerModal from "@/components/customers/DeleteCustomerModal";

export default function CustomerTable() {
  const [customers, setCustomers] = useState([
    { 
      id: 1, 
      name: "Alex Morgan", 
      email: "alex.morgan@example.com", 
      status: "Active", 
      spent: "$2,450.00", 
      lastOrder: "Jan 28, 2024", 
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=60" 
    },
    { 
      id: 2, 
      name: "Sarah Jenkins", 
      email: "sarah.j@example.com", 
      status: "Active", 
      spent: "$1,890.50", 
      lastOrder: "Jan 27, 2024", 
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=60" 
    },
    { 
      id: 3, 
      name: "Michael Chen", 
      email: "m.chen@example.com", 
      status: "Inactive", 
      spent: "$450.00", 
      lastOrder: "Dec 15, 2023", 
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&auto=format&fit=crop&q=60" 
    },
    { 
      id: 4, 
      name: "Emily Davis", 
      email: "emily.d@example.com", 
      status: "Active", 
      spent: "$3,200.00", 
      lastOrder: "Jan 25, 2024", 
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&auto=format&fit=crop&q=60" 
    },
    { 
      id: 5, 
      name: "David Wilson", 
      email: "david.w@example.com", 
      status: "Pending", 
      spent: "$0.00", 
      lastOrder: "N/A", 
      avatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&auto=format&fit=crop&q=60" 
    },
    { 
      id: 6, 
      name: "Lisa Anderson", 
      email: "lisa.a@example.com", 
      status: "Active", 
      spent: "$850.25", 
      lastOrder: "Jan 20, 2024", 
      avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=100&auto=format&fit=crop&q=60" 
    },
    { 
      id: 7, 
      name: "James Martin", 
      email: "j.martin@example.com", 
      status: "Active", 
      spent: "$1,250.00", 
      lastOrder: "Jan 22, 2024", 
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=60" 
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const filterMenuRef = useRef(null);

  // Close filter menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (filterMenuRef.current && !filterMenuRef.current.contains(event.target)) {
        setIsFilterMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          customer.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "All" || customer.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(filteredCustomers.map(c => c.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectOne = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(selectedId => selectedId !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const isAllSelected = filteredCustomers.length > 0 && filteredCustomers.every(c => selectedIds.includes(c.id));
  const isIndeterminate = selectedIds.length > 0 && !isAllSelected;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const handleAdd = () => {
    setSelectedCustomer(null);
    setIsModalOpen(true);
  };

  const handleEdit = (customer) => {
    setSelectedCustomer(customer);
    setIsModalOpen(true);
  };

  const handleDelete = (customer) => {
    setSelectedCustomer(customer);
    setIsDeleteModalOpen(true);
  };

  const handleSave = (customerData) => {
    if (selectedCustomer) {
      // Update existing
      setCustomers(customers.map(c => c.id === selectedCustomer.id ? { ...c, ...customerData } : c));
    } else {
      // Add new
      const newCustomer = {
        id: customers.length + 1,
        ...customerData
      };
      setCustomers([newCustomer, ...customers]);
    }
    setIsModalOpen(false);
  };

  const handleConfirmDelete = () => {
    if (selectedCustomer) {
      setCustomers(customers.filter(c => c.id !== selectedCustomer.id));
      setIsDeleteModalOpen(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      {/* Table Header / Filters */}
      <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <h2 className="text-lg font-bold text-black">All Customers</h2>
          {selectedIds.length > 0 && (
            <span className="text-sm text-black bg-blue-50 px-3 py-1 rounded-full font-medium">
              {selectedIds.length} selected
            </span>
          )}
        </div>
        <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
          <div className="relative w-full md:w-auto">
             <Icon icon="solar:magnifer-linear" className="absolute left-3 top-1/2 -translate-y-1/2 text-[#fff]" width="20" />
             <input 
               type="text" 
               placeholder="Search customers..." 
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
               className="pl-10 pr-4 py-2 border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-500 w-full md:w-64"
             />
          </div>
          
          <div className="flex gap-3 w-full md:w-auto">
            {/* Filter Dropdown */}
            <div className="relative flex-1 md:flex-none" ref={filterMenuRef}>
              <button 
                onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)}
                className={`w-full md:w-auto flex items-center justify-center gap-2 px-4 py-2 border rounded-xl text-sm font-medium transition-colors ${
                  statusFilter !== 'All' 
                    ? 'bg-blue-50 border-blue-200 text-blue-700' 
                    : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Icon icon="solar:filter-bold-duotone" width="20" />
                {statusFilter === 'All' ? 'Filter' : statusFilter}
                <Icon icon="solar:alt-arrow-down-bold" width="12" className={`transition-transform ${isFilterMenuOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isFilterMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-20">
                  {['All', 'Active', 'Inactive', 'Pending'].map((status) => (
                    <button
                      key={status}
                      onClick={() => {
                        setStatusFilter(status);
                        setIsFilterMenuOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors flex items-center justify-between ${
                        statusFilter === status ? 'text-black font-medium bg-blue-50/50' : 'text-gray-600'
                      }`}
                    >
                      {status}
                      {statusFilter === status && <Icon icon="solar:check-read-bold" width="16" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button 
              onClick={handleAdd}
              className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-[#007ce1] text-white rounded-xl text-sm font-medium hover:bg-[#007ce1] transition-colors shadow-lg shadow-[#007ce1]/20 whitespace-nowrap"
            >
              <Icon icon="solar:add-circle-bold" width="20" />
              Add Customer
            </button>
          </div>
        </div>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider w-10">
                <input 
                  type="checkbox" 
                  className="rounded border-gray-300 text-black focus:ring-blue-500 cursor-pointer" 
                  checked={isAllSelected}
                  onChange={handleSelectAll}
                  ref={input => { if (input) input.indeterminate = isIndeterminate; }}
                />
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Customer</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Total Spent</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Last Order</th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredCustomers.length > 0 ? (
              filteredCustomers.map((customer) => (
                <tr key={customer.id} className={`transition-colors group ${selectedIds.includes(customer.id) ? 'bg-blue-50/30 hover:bg-blue-50/50' : 'hover:bg-gray-50'}`}>
                  <td className="px-6 py-4">
                    <input 
                      type="checkbox" 
                      className="rounded border-gray-300 text-black focus:ring-blue-500 cursor-pointer" 
                      checked={selectedIds.includes(customer.id)}
                      onChange={() => handleSelectOne(customer.id)}
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img 
                        src={customer.avatar} 
                        alt={customer.name} 
                        className="w-10 h-10 rounded-full object-cover border border-gray-100"
                      />
                      <div>
                        <p className="text-sm font-bold text-black">{customer.name}</p>
                        <p className="text-xs text-gray-500">{customer.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      customer.status === 'Active' ? 'bg-emerald-100 text-emerald-800' : 
                      customer.status === 'Inactive' ? 'bg-gray-100 text-black' :
                      'bg-amber-100 text-amber-800'
                    }`}>
                      {customer.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-black">{customer.spent}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{customer.lastOrder}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => handleEdit(customer)}
                        className="p-2 text-[#fff] hover:text-black hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                      >
                        <Icon icon="solar:pen-bold-duotone" width="18" />
                      </button>
                      <button 
                        onClick={() => handleDelete(customer)}
                        className="p-2 text-[#fff] hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                      >
                        <Icon icon="solar:trash-bin-trash-bold-duotone" width="18" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-2">
                      <Icon icon="solar:user-block-rounded-bold-duotone" className="text-[#fff]" width="24" />
                    </div>
                    <p className="text-sm font-medium text-black">No customers found</p>
                    <p className="text-xs text-[#fff]">Try adjusting your search or filter</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="p-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-gray-500">Showing {customers.length > 0 ? 1 : 0}-{Math.min(7, customers.length)} of {customers.length} customers</p>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1 text-sm border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50 disabled:opacity-50" disabled>Previous</button>
          <button className="px-3 py-1 text-sm bg-[#007ce1] text-white rounded-lg">1</button>
          <button className="px-3 py-1 text-sm border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50">2</button>
          <button className="px-3 py-1 text-sm border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50">3</button>
          <span className="text-[#fff]">...</span>
          <button className="px-3 py-1 text-sm border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50">12</button>
          <button className="px-3 py-1 text-sm border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50">Next</button>
        </div>
      </div>

      {/* Modals */}
      <CustomerModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        customer={selectedCustomer}
        onSave={handleSave}
      />

      <DeleteCustomerModal 
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        customer={selectedCustomer}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
