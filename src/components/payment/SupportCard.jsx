import { Icon } from "@iconify/react";

export default function SupportCard() {
  return (
    <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 flex flex-col items-center text-center">
      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-black mb-3">
        <Icon icon="mdi:headset" width="24" />
      </div>
      <h3 className="text-base font-bold text-black">Need help with billing?</h3>
      <p className="text-sm text-gray-600 mt-1 mb-4">Our support team is here to assist you with any payment questions.</p>
      <button className="text-black text-sm font-bold hover:underline cursor-pointer">Contact Support</button>
    </div>
  );
}
