"use client";
import { useState } from "react";
import { Icon } from "@iconify/react";
import AddPaymentModal from "@/components/payment/AddPaymentModal";
import PaymentStatsGrid from "@/components/payment/PaymentStatsGrid";
import SpendingAnalyticsSection from "@/components/payment/SpendingAnalyticsSection";
import TransactionHistorySection from "@/components/payment/TransactionHistorySection";
import CurrentPlanCard from "@/components/payment/CurrentPlanCard";
import PaymentMethodsSection from "@/components/payment/PaymentMethodsSection";
import SupportCard from "@/components/payment/SupportCard";

export default function PaymentPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="max-w-[1920px] mx-auto space-y-8">
      
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-black tracking-tight">Payment & Billing</h1>
          <p className="text-gray-500 mt-1">Manage your payment methods, billing history, and plan details.</p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <button className="bg-white border border-gray-200 text-gray-700 px-5 py-2 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 cursor-pointer w-full sm:w-auto">
            <Icon icon="solar:download-bold-duotone" width="20" />
            Download Invoice
          </button>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-[#007ce1] text-white px-5 py-2 rounded-xl text-sm font-medium hover:bg-[#007ce1] transition-colors flex items-center justify-center gap-2 cursor-pointer w-full sm:w-auto"
          >
            <Icon icon="mdi:credit-card-plus-outline" width="20" />
            Add Payment Method
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <PaymentStatsGrid />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="xl:col-span-2 space-y-8">
          
          {/* Spending Analytics Chart */}
          <SpendingAnalyticsSection />

          {/* Transaction History */}
          <TransactionHistorySection />
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          
          {/* Current Plan Card with Unsplash Image */}
          <CurrentPlanCard />

          {/* Payment Methods */}
          <PaymentMethodsSection onAddMethod={() => setIsModalOpen(true)} />

          {/* Contact Support */}
          <SupportCard />

        </div>
      </div>

      <AddPaymentModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
