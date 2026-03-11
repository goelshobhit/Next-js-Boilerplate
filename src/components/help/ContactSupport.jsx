import { Icon } from "@iconify/react";

export default function ContactSupport() {
  const options = [
    {
      title: "Live Chat",
      desc: "Chat with our support team in real-time.",
      wait: "Wait time: < 2 mins",
      icon: "solar:chat-round-dots-bold-duotone",
      color: "text-black",
      bg: "bg-blue-50",
      action: "Start Chat"
    },
    {
      title: "Email Support",
      desc: "Send us an email and we'll get back to you.",
      wait: "Response: < 24 hrs",
      icon: "solar:letter-bold-duotone",
      color: "text-purple-600",
      bg: "bg-purple-50",
      action: "Send Email"
    },
    {
      title: "Phone Support",
      desc: "Call us directly for urgent matters.",
      wait: "Mon-Fri, 9am-6pm EST",
      icon: "solar:phone-calling-bold-duotone",
      color: "text-green-600",
      bg: "bg-green-50",
      action: "Call Now"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {options.map((opt, idx) => (
        <div key={idx} className="bg-white p-6 rounded-3xl border border-gray-100 hover:border-gray-300 hover:shadow-lg transition-all duration-300 group cursor-pointer">
          <div className={`w-14 h-14 rounded-2xl ${opt.bg} ${opt.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
            <Icon icon={opt.icon} width="28" />
          </div>
          
          <h3 className="text-lg font-bold text-black mb-2">{opt.title}</h3>
          <p className="text-sm text-gray-500 mb-4 min-h-[40px]">{opt.desc}</p>
          
          <div className={`inline-flex items-center gap-2 text-xs font-bold mb-6 px-4 py-2.5 rounded-xl ${opt.bg} ${opt.color}`}>
            <Icon icon="solar:clock-circle-bold" width="16" />
            <span>{opt.wait}</span>
          </div>
          
          <button className="w-full py-2.5 rounded-xl border border-gray-200 text-sm font-bold text-gray-700 hover:bg-[#007ce1] hover:text-white hover:border-[#007ce1] transition-colors flex items-center justify-center gap-2">
            {opt.action}
            <Icon icon="solar:arrow-right-linear" width="16" />
          </button>
        </div>
      ))}
    </div>
  );
}
