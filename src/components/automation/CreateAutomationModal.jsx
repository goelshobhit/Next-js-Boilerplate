import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Icon } from "@iconify/react";

const templates = [
  {
    id: "welcome",
    title: "Welcome Series",
    description: "Engage new subscribers with a sequence of warm welcome emails.",
    icon: "solar:letter-bold-duotone",
    color: "blue"
  },
  {
    id: "cart",
    title: "Abandoned Cart",
    description: "Recover lost sales by reminding customers of items left behind.",
    icon: "solar:cart-large-bold-duotone",
    color: "orange"
  },
  {
    id: "lead",
    title: "Lead Scoring",
    description: "Automatically qualify leads based on their interaction and behavior.",
    icon: "solar:star-bold-duotone",
    color: "purple"
  },
  {
    id: "social",
    title: "Social Auto-Post",
    description: "Schedule and publish content across social platforms automatically.",
    icon: "solar:share-bold-duotone",
    color: "pink"
  },
  {
    id: "custom",
    title: "Custom Workflow",
    description: "Build a completely custom automation from scratch.",
    icon: "solar:magic-stick-3-bold-duotone",
    color: "emerald"
  }
];

export default function CreateAutomationModal({ isOpen, onClose }) {
  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState(1);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    trigger: "",
    description: ""
  });

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setStep(1); // Reset step on open
      setSelectedTemplate(null);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
    setFormData(prev => ({
      ...prev,
      name: template.id === 'custom' ? '' : template.title,
      description: template.description
    }));
    setStep(2);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would handle the actual creation logic
    console.log("Creating automation:", { ...formData, template: selectedTemplate?.id });
    onClose();
  };

  if (!mounted) return null;

  return createPortal(
    <div 
      className={`fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 transition-all duration-300 ${
        isOpen ? "visible" : "invisible delay-300"
      }`}
    >
      {/* Backdrop */}
      <div 
        className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />

      {/* Modal Content */}
      <div 
        className={`relative bg-white w-full max-w-4xl max-h-[90vh] flex flex-col rounded-3xl shadow-2xl transform transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
          isOpen ? "scale-100 translate-y-0 opacity-100 delay-100" : "scale-95 translate-y-8 opacity-0"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100 shrink-0">
          <div>
            <h2 className="text-xl font-bold text-black">
              {step === 1 ? "Choose a Template" : "Configure Automation"}
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              {step === 1 ? "Start with a pre-built workflow or build from scratch" : "Set up your automation details"}
            </p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-[#fff] hover:text-gray-600 hover:bg-gray-50 rounded-xl transition-colors"
          >
            <Icon icon="solar:close-circle-bold" width="24" />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
          
          {/* Step 1: Template Selection */}
          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 transition-all duration-300 ${step === 1 ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-full hidden"}`}>
            {templates.map((template) => (
              <button
                key={template.id}
                onClick={() => handleTemplateSelect(template)}
                className="group flex flex-col items-start p-5 rounded-2xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50/30 transition-all duration-300 text-left hover:shadow-lg hover:shadow-blue-50/50"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-${template.color}-50 text-${template.color}-600 mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon icon={template.icon} width="24" />
                </div>
                <h3 className="text-lg font-bold text-black mb-1">{template.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{template.description}</p>
                <div className="mt-4 flex items-center gap-1 text-sm font-medium text-black opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                  Select Template <Icon icon="solar:arrow-right-linear" />
                </div>
              </button>
            ))}
          </div>

          {/* Step 2: Configuration Form */}
          <div className={`space-y-6 transition-all duration-300 ${step === 2 ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full hidden"}`}>
            <div className="flex items-center gap-4 mb-6">
              <button 
                onClick={() => setStep(1)}
                className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-black transition-colors"
              >
                <Icon icon="solar:arrow-left-linear" width="20" />
                Back to Templates
              </button>
              {selectedTemplate && (
                <div className="flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-bold uppercase tracking-wide">
                  <Icon icon={selectedTemplate.icon} width="14" />
                  {selectedTemplate.title}
                </div>
              )}
            </div>

            <form id="automation-form" onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Automation Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="e.g. New Subscriber Welcome"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all placeholder:text-[#fff]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Trigger Event</label>
                    <select
                      value={formData.trigger}
                      onChange={(e) => setFormData({...formData, trigger: e.target.value})}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all bg-white"
                    >
                      <option value="">Select a trigger...</option>
                      <option value="new_subscriber">New Subscriber Joined</option>
                      <option value="purchase">Product Purchased</option>
                      <option value="abandoned_cart">Cart Abandoned</option>
                      <option value="tag_added">Tag Added to Contact</option>
                      <option value="date">Specific Date/Time</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    rows="5"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    placeholder="Describe what this automation does..."
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all placeholder:text-[#fff] resize-none"
                  ></textarea>
                </div>
              </div>

              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <h4 className="text-sm font-bold text-black mb-4 flex items-center gap-2">
                  <Icon icon="solar:settings-bold-duotone" className="text-[#fff]" />
                  Workflow Configuration
                </h4>
                <div className="flex flex-col items-center justify-center py-8 text-center space-y-3">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center border-2 border-dashed border-gray-200 text-gray-300">
                    <Icon icon="solar:add-circle-linear" width="32" />
                  </div>
                  <p className="text-sm text-gray-500">
                    Visual workflow builder will be available after creation.
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-100 flex justify-end gap-3 shrink-0">
          <button 
            onClick={onClose}
            className="px-6 py-2.5 text-sm font-medium text-gray-600 hover:text-black hover:bg-gray-50 rounded-xl transition-colors"
          >
            Cancel
          </button>
          {step === 2 && (
            <button 
              type="submit"
              form="automation-form"
              className="px-6 py-2.5 text-sm font-bold text-white bg-[#007ce1] hover:bg-blue-700 rounded-xl shadow-lg shadow-[#007ce1]/20 transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
            >
              <Icon icon="solar:magic-stick-3-bold-duotone" />
              Create Automation
            </button>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}
