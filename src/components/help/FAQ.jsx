"use client";
import { useState } from "react";
import { Icon } from "@iconify/react";

const faqs = [
  {
    question: "How do I reset my password?",
    answer: "You can reset your password by going to the Settings page and clicking on the 'Security' tab. From there, select 'Change Password' and follow the instructions sent to your email."
  },
  {
    question: "Can I upgrade my subscription plan?",
    answer: "Yes, you can upgrade your plan at any time. Navigate to Settings > Billing and click on 'Upgrade Plan'. The changes will be applied immediately."
  },
  {
    question: "Where can I find my API keys?",
    answer: "API keys are located in the Developer settings. Go to Settings > Developer to manage your API keys. Please keep them secure and do not share them publicly."
  },
  {
    question: "How do I add a new team member?",
    answer: "To add a team member, go to the Team section in your dashboard. Click 'Invite Member', enter their email address, and select their role/permissions."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="bg-white p-8 rounded-3xl border border-gray-100 h-full">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <Icon icon="solar:question-circle-bold-duotone" width="24" />
        </div>
        <h3 className="text-xl font-bold text-black">Frequently Asked Questions</h3>
      </div>
      
      <div className="space-y-4">
        {faqs.map((faq, idx) => (
          <div 
            key={idx} 
            className={`border border-gray-100 rounded-2xl overflow-hidden transition-all duration-300 ${
                openIndex === idx ? 'bg-gray-50' : 'bg-white hover:border-gray-200'
            }`}
          >
            <button
              onClick={() => setOpenIndex(openIndex === idx ? -1 : idx)}
              className="w-full flex items-center justify-between p-4 text-left"
            >
              <span className={`font-bold text-sm ${openIndex === idx ? 'text-black' : 'text-gray-600'}`}>
                {faq.question}
              </span>
              <Icon 
                icon="solar:alt-arrow-down-linear" 
                className={`text-[#fff] transition-transform duration-300 ${openIndex === idx ? 'rotate-180 text-indigo-600' : ''}`} 
                width="20" 
              />
            </button>
            <div 
                className={`grid transition-all duration-300 ease-in-out ${
                    openIndex === idx ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                }`}
            >
                <div className="overflow-hidden">
                    <p className="px-4 pb-4 text-sm text-gray-500 leading-relaxed">
                        {faq.answer}
                    </p>
                </div>
            </div>
          </div>
        ))}
      </div>
      
      <button className="w-full mt-6 py-3 text-sm font-bold text-indigo-600 hover:bg-indigo-50 rounded-xl transition-colors">
        View All FAQs
      </button>
    </div>
  );
}
