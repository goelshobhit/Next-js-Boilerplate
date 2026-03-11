"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";
import DateRangeFilter from "@/components/dashboard/DateRangeFilter";
import InvoiceStats from "@/components/invoices/InvoiceStats";
import InvoiceChart from "@/components/invoices/InvoiceChart";
import InvoiceTable from "@/components/invoices/InvoiceTable";
import CreateInvoiceModal from "@/components/invoices/CreateInvoiceModal";
import InvoiceDetailModal from "@/components/invoices/InvoiceDetailModal";

export default function InvoicesPage() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const handleViewInvoice = (invoice) => {
    setSelectedInvoice(invoice);
    setIsDetailModalOpen(true);
  };

  const closeDetailModal = () => {
    setIsDetailModalOpen(false);
    setTimeout(() => setSelectedInvoice(null), 300); // Wait for animation
  };

  return (
    <div className="max-w-[1920px] mx-auto space-y-8">
      
      <CreateInvoiceModal 
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />

      <InvoiceDetailModal
        isOpen={isDetailModalOpen}
        onClose={closeDetailModal}
        invoice={selectedInvoice}
      />

      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-black tracking-tight">Invoices</h1>
          <p className="text-gray-500 mt-1">Manage, track, and create invoices for your clients.</p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <DateRangeFilter />
          <button 
            onClick={() => setIsCreateModalOpen(true)}
            className="bg-[#007ce1] text-white px-5 py-2 rounded-xl text-sm font-medium hover:bg-[#007ce1] transition-colors flex items-center justify-center gap-2 shadow-none w-full sm:w-auto"
          >
            <Icon icon="solar:add-circle-bold-duotone" width="20" />
            Create Invoice
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <InvoiceStats />

      {/* Chart Section */}
      <div className="grid grid-cols-1">
        <InvoiceChart />
      </div>

      {/* Invoice Table */}
      <InvoiceTable onView={handleViewInvoice} />
    </div>
  );
}
