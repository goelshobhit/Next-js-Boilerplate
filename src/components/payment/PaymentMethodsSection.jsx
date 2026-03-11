import { Icon } from "@iconify/react";

export default function PaymentMethodsSection({ onAddMethod }) {
  const paymentMethods = [
    { type: "Visa", number: "**** **** **** 4242", expiry: "12/24", isDefault: true, icon: "logos:visa" },
    { type: "Mastercard", number: "**** **** **** 5599", expiry: "09/25", isDefault: false, icon: "logos:mastercard" },
  ];

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-200">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold text-black">Payment Methods</h2>
        <button 
          onClick={onAddMethod}
          className="text-black hover:text-blue-700 cursor-pointer"
        >
          <Icon icon="solar:add-circle-bold-duotone" width="24" />
        </button>
      </div>
      <div className="space-y-4">
        {paymentMethods.map((method, idx) => (
          <div key={idx} className="flex items-center justify-between p-4 rounded-xl border border-gray-200 hover:border-blue-500 cursor-pointer transition-all group">
            <div className="flex items-center gap-4">
              <div className="w-12 h-8 bg-gray-50 rounded flex items-center justify-center">
                <Icon icon={method.icon} width="24" />
              </div>
              <div>
                <p className="text-sm font-bold text-black">{method.type} ending in {method.number.slice(-4)}</p>
                <p className="text-xs text-gray-500">Expires {method.expiry}</p>
              </div>
            </div>
            {method.isDefault && (
              <span className="text-xs font-semibold bg-blue-50 text-black px-2 py-1 rounded-full">Default</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
