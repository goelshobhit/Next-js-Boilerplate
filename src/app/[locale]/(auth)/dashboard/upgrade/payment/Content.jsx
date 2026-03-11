"use client";

import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { AreaChart, Area, ResponsiveContainer, Tooltip } from "recharts";

// Mock data for the chart
const growthData = [
  { month: "Mon 1", value: 1000 },
  { month: "Mon 2", value: 2500 },
  { month: "Mon 3", value: 4800 },
  { month: "Mon 4", value: 7200 },
  { month: "Mon 5", value: 11500 },
  { month: "Mon 6", value: 18000 },
];

function PaymentContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const plan = searchParams.get("plan") || "enterprise";
  const cycle = searchParams.get("cycle") || "monthly";

  const isYearly = cycle === "yearly";
  const planPrice = plan === "enterprise" ? (isYearly ? 89 : 99) : (isYearly ? 24 : 29);
  const total = planPrice;

  const [paymentMethod, setPaymentMethod] = useState("card"); // card, paypal
  const [isLoading, setIsLoading] = useState(false);

  const handlePayment = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      router.push("/dashboard");
    }, 2000);
  };

  return (
    <div className="w-full max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="mb-8">
        <Link 
          href="/dashboard/upgrade" 
          className="inline-flex items-center text-gray-500 hover:text-black transition-colors mb-4"
        >
          <Icon icon="solar:arrow-left-linear" width="20" className="mr-2" />
          Back to Plans
        </Link>
        <h1 className="text-3xl font-bold text-black">Secure Checkout</h1>
        <p className="text-gray-500 mt-1">Complete your upgrade to unlock full potential.</p>
      </div>

      <div className="flex flex-col xl:flex-row gap-8 items-start">
        
        {/* Left Column: Payment Details */}
        <div className="flex-1 w-full space-y-6">
          
          {/* Payment Method Selection */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <h2 className="text-lg font-bold text-black mb-4">Payment Method</h2>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setPaymentMethod("card")}
                className={`flex items-center justify-center gap-2 p-4 rounded-xl border transition-all ${
                  paymentMethod === "card"
                    ? "border-indigo-600 bg-indigo-50/50 text-indigo-700"
                    : "border-gray-200 hover:border-gray-300 text-gray-600"
                }`}
              >
                <Icon icon="solar:card-bold" width="24" className="shrink-0" />
                <span className="font-semibold whitespace-nowrap">Credit Card</span>
              </button>
              <button
                onClick={() => setPaymentMethod("paypal")}
                className={`flex items-center justify-center gap-2 p-4 rounded-xl border transition-all ${
                  paymentMethod === "paypal"
                    ? "border-indigo-600 bg-indigo-50/50 text-indigo-700"
                    : "border-gray-200 hover:border-gray-300 text-gray-600"
                }`}
              >
                <Icon icon="logos:paypal" width="20" className="shrink-0" />
                <span className="font-semibold text-black">PayPal</span>
              </button>
            </div>
          </div>

          {/* Card Details Form */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <h2 className="text-lg font-bold text-black mb-6">Payment Details</h2>
            <form onSubmit={handlePayment} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Cardholder Name</label>
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="John Doe"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-indigo-600 focus:ring-0 outline-none transition-colors bg-gray-50/30"
                    required
                  />
                  <Icon icon="solar:user-circle-linear" className="absolute left-3 top-1/2 -translate-y-1/2 text-[#fff]" width="20" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="0000 0000 0000 0000"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-indigo-600 focus:ring-0 outline-none transition-colors bg-gray-50/30"
                    required
                  />
                  <Icon icon="solar:card-linear" className="absolute left-3 top-1/2 -translate-y-1/2 text-[#fff]" width="20" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder="MM / YY"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-indigo-600 focus:ring-0 outline-none transition-colors bg-gray-50/30"
                      required
                    />
                    <Icon icon="solar:calendar-linear" className="absolute left-3 top-1/2 -translate-y-1/2 text-[#fff]" width="20" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">CVC</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder="123"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-indigo-600 focus:ring-0 outline-none transition-colors bg-gray-50/30"
                      required
                    />
                    <Icon icon="solar:lock-password-linear" className="absolute left-3 top-1/2 -translate-y-1/2 text-[#fff]" width="20" />
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <button 
                  type="submit" 
                  disabled={isLoading}
                  className="w-full bg-indigo-600 text-white py-3.5 rounded-xl font-bold text-sm hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <Icon icon="svg-spinners:90-ring-with-bg" width="20" />
                      Processing...
                    </>
                  ) : (
                    <>
                      Pay ${total.toFixed(2)}
                      <Icon icon="solar:arrow-right-linear" width="20" />
                    </>
                  )}
                </button>
                <p className="text-center text-xs text-[#fff] mt-4 flex items-center justify-center gap-1">
                  <Icon icon="solar:shield-check-bold" className="text-green-500" />
                  Payments are secure and encrypted
                </p>
              </div>
            </form>
          </div>
        </div>

        {/* Right Column: Order Summary */}
        <div className="w-full xl:w-[400px] shrink-0 space-y-6">
          
          {/* Visual Image */}
          <div className="relative h-48 rounded-2xl overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80" 
              alt="Office workspace" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
              <div>
                <p className="text-white/90 text-sm font-medium">Premium Workspace</p>
                <h3 className="text-white text-xl font-bold">Unlock Enterprise Power</h3>
              </div>
            </div>
          </div>

          {/* Order Summary Card */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <h2 className="text-lg font-bold text-black mb-6">Order Summary</h2>
            
            {/* Plan Details Table */}
            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-600">Plan</span>
                <span className="font-semibold text-black capitalize">{plan} Plan</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-600">Billing Cycle</span>
                <span className="font-semibold text-black capitalize">{cycle}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold text-black">${planPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center py-3">
                <span className="text-lg font-bold text-black">Total</span>
                <span className="text-2xl font-bold text-indigo-600">${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Growth Chart */}
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-black">Projected Growth</h3>
                <span className="text-xs text-green-600 bg-green-100 px-2 py-0.5 rounded-full font-medium">+124%</span>
              </div>
              <div className="h-32 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={growthData}>
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <Tooltip 
                      contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                      itemStyle={{ color: '#4f46e5', fontWeight: '600' }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#4f46e5" 
                      strokeWidth={2}
                      fillOpacity={1} 
                      fill="url(#colorValue)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <p className="text-xs text-[#fff] mt-2 text-center">Estimated performance boost with {plan} plan</p>
            </div>

          </div>

          {/* Features List */}
          <div className="bg-indigo-50/50 rounded-2xl border border-indigo-100 p-6">
            <h3 className="text-sm font-bold text-indigo-900 mb-4 uppercase tracking-wider">What's Included</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-sm text-indigo-800">
                <Icon icon="solar:check-circle-bold" className="text-indigo-600 shrink-0" />
                <span>Unlimited Team Members</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-indigo-800">
                <Icon icon="solar:check-circle-bold" className="text-indigo-600 shrink-0" />
                <span>Advanced Analytics Dashboard</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-indigo-800">
                <Icon icon="solar:check-circle-bold" className="text-indigo-600 shrink-0" />
                <span>Priority 24/7 Support</span>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Icon icon="svg-spinners:90-ring-with-bg" className="text-indigo-600" width="40" />
      </div>
    }>
      <PaymentContent />
    </Suspense>
  );
}