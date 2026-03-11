"use client";
import { useState } from "react";
import { Icon } from "@iconify/react";
import Link from "next/link";

export default function UpgradePage() {
  const [billingCycle, setBillingCycle] = useState("monthly"); // monthly | yearly

  const plans = [
    {
      name: "Starter",
      price: billingCycle === "monthly" ? "0" : "0",
      description: "Perfect for individuals and hobbyists.",
      features: [
        "Up to 3 Projects",
        "Basic Analytics",
        "Community Support",
        "1 Team Member",
      ],
      current: false,
      popular: false,
      buttonText: "Downgrade",
      buttonVariant: "outline",
    },
    {
      name: "Pro",
      price: billingCycle === "monthly" ? "29" : "24",
      description: "For growing teams and businesses.",
      features: [
        "Unlimited Projects",
        "Advanced Analytics",
        "Priority Support",
        "5 Team Members",
        "Custom Domains",
      ],
      current: true,
      popular: true,
      buttonText: "Current Plan",
      buttonVariant: "solid",
    },
    {
      name: "Enterprise",
      price: billingCycle === "monthly" ? "99" : "89",
      description: "For large organizations with specific needs.",
      features: [
        "Everything in Pro",
        "Dedicated Account Manager",
        "SSO & Advanced Security",
        "Unlimited Team Members",
        "SLA Guarantee",
        "API Access",
      ],
      current: false,
      popular: false,
      buttonText: "Upgrade",
      buttonVariant: "gradient",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50/50 pb-12">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-12 px-4 sm:px-6 lg:px-8 pt-8">
        <Link 
          href="/dashboard/payment" 
          className="inline-flex items-center text-gray-500 hover:text-black transition-colors mb-6"
        >
          <Icon icon="solar:arrow-left-linear" width="20" className="mr-2" />
          Back to Payment
        </Link>
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-black mb-4">Choose the Perfect Plan</h1>
          <p className="text-gray-600 text-base md:text-lg">
            Scale your business with plans that grow with you. Upgrade or downgrade at any time.
          </p>
        </div>
      </div>

      {/* Billing Toggle */}
      <div className="flex justify-center mb-12 px-4">
        <div className="bg-white p-1 rounded-xl border border-gray-200 inline-flex relative w-full sm:w-auto flex-col sm:flex-row">
          <button
            onClick={() => setBillingCycle("monthly")}
            className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 w-full sm:w-auto ${
              billingCycle === "monthly" 
                ? "bg-[#007ce1] text-white shadow-md" 
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingCycle("yearly")}
            className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2 w-full sm:w-auto ${
              billingCycle === "yearly" 
                ? "bg-[#007ce1] text-white shadow-md" 
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            Yearly
            <span className="bg-emerald-100 text-emerald-700 text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wide whitespace-nowrap">
              Save 20%
            </span>
          </button>
        </div>
      </div>

      {/* Plans Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 px-4 sm:px-6 lg:px-8">
        {plans.map((plan) => (
          <div 
            key={plan.name}
            className={`relative bg-white rounded-3xl p-8 transition-all duration-300 ${
              plan.popular 
                ? "border-2 border-[#007ce1] shadow-xl xl:scale-105 z-10" 
                : "border border-gray-200 hover:border-gray-300 hover:shadow-lg"
            }`}
          >
            {plan.popular && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#007ce1] text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg whitespace-nowrap">
                Most Popular
              </div>
            )}

            <div className="mb-8">
              <h3 className="text-xl font-bold text-black mb-2">{plan.name}</h3>
              <p className="text-gray-500 text-sm h-10">{plan.description}</p>
            </div>

            <div className="mb-8 flex items-baseline gap-1">
              <span className="text-4xl font-bold text-black">${plan.price}</span>
              <span className="text-gray-500">/month</span>
            </div>

            {plan.buttonText === "Upgrade" ? (
              <Link
                href={`/dashboard/upgrade/payment?plan=${plan.name.toLowerCase()}&cycle=${billingCycle}`}
                className={`block w-full text-center py-3 rounded-xl font-bold text-sm mb-8 transition-all duration-300 ${
                  plan.buttonVariant === "gradient"
                    ? "bg-gradient-to-r from-[#007ce1] to-indigo-600 text-white hover:shadow-lg hover:shadow-blue-500/30"
                    : "bg-white border-2 border-gray-200 text-black hover:border-[#007ce1]"
                }`}
              >
                {plan.buttonText}
              </Link>
            ) : (
              <button
                className={`w-full py-3 rounded-xl font-bold text-sm mb-8 transition-all duration-300 ${
                  plan.buttonVariant === "gradient"
                    ? "bg-gradient-to-r from-[#007ce1] to-indigo-600 text-white hover:shadow-lg hover:shadow-blue-500/30"
                    : plan.buttonVariant === "solid"
                    ? "bg-gray-100 text-[#fff] cursor-not-allowed"
                    : "bg-white border-2 border-gray-200 text-black hover:border-[#007ce1]"
                }`}
                disabled={plan.current}
              >
                {plan.buttonText}
              </button>
            )}

            <div className="space-y-4">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Features</p>
              <ul className="space-y-3">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-gray-700">
                    <Icon icon="solar:check-circle-bold" className="text-black shrink-0 mt-0.5" width="18" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* FAQ or Trust Section */}
      <div className="max-w-3xl mx-auto mt-20 text-center px-4">
        <p className="text-gray-500 text-sm mb-4">Trusted by innovative teams</p>
        <div className="flex flex-wrap justify-center gap-8 opacity-50 grayscale">
           <Icon icon="logos:google" height="24" className="shrink-0" />
           <Icon icon="logos:spotify" height="24" className="shrink-0" />
           <Icon icon="logos:stripe" height="24" className="shrink-0" />
           <Icon icon="logos:airbnb" height="24" className="shrink-0" />
        </div>
      </div>
    </div>
  );
}
