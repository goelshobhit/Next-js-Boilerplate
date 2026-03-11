import { Icon } from "@iconify/react";
import { useState } from "react";
import Link from "next/link";

export default function SubscriptionModal({ isOpen, onClose }) {
  const [billingCycle, setBillingCycle] = useState("monthly");

  const plans = [
    {
      name: "Basic",
      price: billingCycle === "monthly" ? "0" : "0",
      period: billingCycle === "monthly" ? "/mo" : "/yr",
      features: ["3 Projects", "Basic Analytics", "24/7 Support"],
      active: false,
      color: "blue"
    },
    {
      name: "Pro",
      price: billingCycle === "monthly" ? "29" : "290",
      period: billingCycle === "monthly" ? "/mo" : "/yr",
      features: ["Unlimited Projects", "Advanced Analytics", "Priority Support", "Custom Domain"],
      active: true,
      color: "indigo"
    },
    {
      name: "Enterprise",
      price: billingCycle === "monthly" ? "99" : "990",
      period: billingCycle === "monthly" ? "/mo" : "/yr",
      features: ["Dedicated Manager", "SSO & SAML", "Audit Logs", "SLA Guarantee"],
      active: false,
      color: "purple"
    }
  ];

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${
        isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div 
        className={`bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden relative transform transition-all duration-300 flex flex-col max-h-[90vh] ${
          isOpen ? "scale-100 translate-y-0" : "scale-95 translate-y-4"
        }`}
      >
        {/* Header */}
        <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between bg-white z-10">
          <div>
            <h3 className="text-2xl font-bold text-black">Manage Subscription</h3>
            <p className="text-sm text-gray-500 mt-1">Change your plan or cancel subscription</p>
          </div>
          <button 
            onClick={onClose}
            className="text-[#fff] hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-xl"
          >
            <Icon icon="solar:close-circle-bold" width="24" />
          </button>
        </div>

        {/* Body */}
        <div className="p-8 overflow-y-auto">
          {/* Billing Cycle Toggle */}
          <div className="flex justify-center mb-10">
            <div className="bg-gray-100 p-1.5 rounded-2xl inline-flex relative">
              <button
                onClick={() => setBillingCycle("monthly")}
                className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${
                  billingCycle === "monthly" 
                    ? "bg-white text-black shadow-sm" 
                    : "text-gray-500 hover:text-black"
                }`}
              >
                Monthly Billing
              </button>
              <button
                onClick={() => setBillingCycle("yearly")}
                className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 flex items-center gap-2 ${
                  billingCycle === "yearly" 
                    ? "bg-white text-black shadow-sm" 
                    : "text-gray-500 hover:text-black"
                }`}
              >
                Yearly Billing
                <span className="bg-green-100 text-green-700 text-[10px] px-2 py-0.5 rounded-full font-extrabold uppercase tracking-wide">
                  Save 20%
                </span>
              </button>
            </div>
          </div>

          {/* Plans Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan, idx) => (
              <div 
                key={idx}
                className={`relative rounded-3xl p-6 border-2 transition-all duration-300 group ${
                  plan.active 
                    ? "border-indigo-600 bg-indigo-50/30" 
                    : "border-gray-100 hover:border-gray-300 hover:shadow-lg bg-white"
                }`}
              >
                {plan.active && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-indigo-600 text-white px-4 py-1 rounded-full text-xs font-bold shadow-lg shadow-indigo-200">
                    CURRENT PLAN
                  </div>
                )}
                
                <div className="mb-6">
                  <h4 className={`text-lg font-bold mb-2 ${plan.active ? "text-indigo-900" : "text-black"}`}>
                    {plan.name}
                  </h4>
                  <div className="flex items-end gap-1">
                    <span className="text-4xl font-bold text-black">${plan.price}</span>
                    <span className="text-gray-500 font-medium mb-1">{plan.period}</span>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  {plan.features.map((feature, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                        plan.active ? "bg-indigo-100 text-indigo-600" : "bg-gray-100 text-gray-500"
                      }`}>
                        <Icon icon="solar:check-read-bold" width="12" />
                      </div>
                      <span className={`text-sm ${plan.active ? "text-indigo-900 font-medium" : "text-gray-600"}`}>
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                {plan.active ? (
                  <button 
                    className="w-full py-3.5 rounded-xl text-sm font-bold transition-all duration-300 bg-indigo-600 text-white shadow-lg shadow-indigo-200 hover:bg-indigo-700"
                  >
                    Manage Plan
                  </button>
                ) : (
                  <Link
                    href={`/dashboard/upgrade/payment?plan=${plan.name.toLowerCase()}&cycle=${billingCycle}`}
                    className="block w-full text-center py-3.5 rounded-xl text-sm font-bold transition-all duration-300 bg-[#007ce1] text-white hover:bg-[#007ce1] hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Upgrade Now
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="px-8 py-6 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
            <p className="text-xs text-gray-500 max-w-sm">
                By upgrading, you agree to our <a href="#" className="text-indigo-600 hover:underline">Terms of Service</a>. 
                You can cancel anytime.
            </p>
            <button className="text-gray-500 hover:text-red-600 text-sm font-medium transition-colors flex items-center gap-2">
                <Icon icon="solar:trash-bin-trash-bold" />
                Cancel Subscription
            </button>
        </div>
      </div>
    </div>
  );
}
