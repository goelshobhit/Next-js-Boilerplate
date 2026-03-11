"use client";
import { useState } from "react";
import { Icon } from "@iconify/react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import SubscriptionModal from "./SubscriptionModal";
import AddPaymentModal from "@/components/payment/AddPaymentModal";

const usageData = [
  { name: "Mon", usage: 40 },
  { name: "Tue", usage: 65 },
  { name: "Wed", usage: 35 },
  { name: "Thu", usage: 80 },
  { name: "Fri", usage: 55 },
  { name: "Sat", usage: 20 },
  { name: "Sun", usage: 10 },
];

const invoices = [
  { id: "INV-001", date: "Oct 24, 2023", amount: "$29.00", status: "Paid" },
  { id: "INV-002", date: "Sep 24, 2023", amount: "$29.00", status: "Paid" },
  { id: "INV-003", date: "Aug 24, 2023", amount: "$29.00", status: "Paid" },
];

export default function BillingSection() {
  const [isSubscriptionOpen, setIsSubscriptionOpen] = useState(false);
  const [isAddCardOpen, setIsAddCardOpen] = useState(false);

  return (
    <>
      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Current Plan */}
          <div className="lg:col-span-2 bg-gradient-to-br from-[#007ce1] to-[#007ce1] rounded-3xl p-8 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 p-32 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16"></div>
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <p className="text-[#fff] text-sm font-medium mb-1">Current Plan</p>
                  <h3 className="text-3xl font-bold">Pro Plan</h3>
                </div>
                <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-lg text-xs font-bold border border-white/10">ACTIVE</span>
              </div>
              
              <div className="flex items-end gap-2 mb-8">
                  <span className="text-4xl font-bold">$29</span>
                  <span className="text-[#fff] mb-1">/ month</span>
              </div>

              <div className="flex flex-wrap gap-4">
                  <button 
                    onClick={() => setIsSubscriptionOpen(true)}
                    className="bg-white text-black px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-gray-100 transition-colors"
                  >
                      Manage Subscription
                  </button>
                  <button 
                    onClick={() => setIsSubscriptionOpen(true)}
                    className="bg-transparent border border-white/20 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-white/10 transition-colors"
                  >
                      Upgrade Plan
                  </button>
              </div>
            </div>
          </div>

          {/* Usage Chart */}
          <div className="bg-white p-6 rounded-3xl border border-gray-100 flex flex-col justify-between">
            <div>
              <h4 className="font-bold text-black mb-1">API Usage</h4>
              <p className="text-xs text-gray-500 mb-4">Requests per day</p>
            </div>
            <div className="h-40">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={usageData}>
                  <XAxis dataKey="name" hide />
                  <Tooltip 
                      cursor={{fill: 'transparent'}}
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                  />
                  <Bar dataKey="usage" radius={[4, 4, 4, 4]}>
                    {usageData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index === 3 ? '#2563EB' : '#E5E7EB'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-2">
              <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-500">24.5k / 50k</span>
                  <span className="font-bold text-black">49%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                  <div className="bg-[#007ce1] h-2 rounded-full" style={{ width: '49%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Method & Invoices */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-gray-100">
              <h4 className="font-bold text-black mb-6 flex items-center gap-2">
                  <Icon icon="solar:card-bold-duotone" className="text-blue-500" />
                  Payment Method
              </h4>
              <div className="flex items-center gap-4 p-4 border border-gray-100 rounded-2xl mb-4">
                  <div className="w-12 h-8 bg-[#007ce1] rounded-md flex items-center justify-center text-white text-xs font-bold">
                      VISA
                  </div>
                  <div className="flex-1">
                      <p className="text-sm font-bold text-black">•••• •••• •••• 4242</p>
                      <p className="text-xs text-gray-500">Expires 12/24</p>
                  </div>
                  <button className="text-[#fff] hover:text-gray-600">
                      <Icon icon="solar:pen-bold" width="18" />
                  </button>
              </div>
              <button 
                onClick={() => setIsAddCardOpen(true)}
                className="w-full py-3 border border-dashed border-gray-300 rounded-2xl text-sm font-medium text-gray-500 hover:border-blue-500 hover:text-black hover:bg-blue-50/50 transition-all flex items-center justify-center gap-2"
              >
                  <Icon icon="solar:add-circle-linear" width="20" />
                  Add New Card
              </button>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                  <h4 className="font-bold text-black flex items-center gap-2">
                      <Icon icon="solar:bill-list-bold-duotone" className="text-purple-500" />
                      Invoice History
                  </h4>
                  <button className="text-xs font-medium text-black hover:underline">View All</button>
              </div>
              <div className="space-y-3">
                  {invoices.map((inv) => (
                      <div key={inv.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors">
                          <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                                  <Icon icon="solar:document-text-linear" width="16" />
                              </div>
                              <div>
                                  <p className="text-sm font-bold text-black">{inv.date}</p>
                                  <p className="text-xs text-gray-500">{inv.id}</p>
                              </div>
                          </div>
                          <div className="text-right">
                              <p className="text-sm font-bold text-black">{inv.amount}</p>
                              <p className="text-xs text-green-600 font-medium">{inv.status}</p>
                          </div>
                          <button className="p-2 text-[#fff] hover:text-black">
                              <Icon icon="solar:download-minimalistic-linear" width="20" />
                          </button>
                      </div>
                  ))}
              </div>
          </div>
        </div>
      </div>

      <SubscriptionModal 
        isOpen={isSubscriptionOpen} 
        onClose={() => setIsSubscriptionOpen(false)} 
      />

      <AddPaymentModal 
        isOpen={isAddCardOpen} 
        onClose={() => setIsAddCardOpen(false)} 
      />
    </>
  );
}
