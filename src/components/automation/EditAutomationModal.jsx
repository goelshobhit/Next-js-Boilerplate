import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Icon } from "@iconify/react";

export default function EditAutomationModal({ isOpen, onClose, automation }) {
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "active"
  });

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    if (automation) {
      setFormData({
        title: automation.title,
        description: automation.description,
        status: automation.status
      });
    }
  }, [automation]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!mounted || !automation) return null;

  return createPortal(
    <div 
      className={`fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 transition-all duration-300 ${
        isOpen ? "visible" : "invisible delay-300"
      }`}
    >
      <div 
        className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />

      <div 
        className={`relative bg-white w-full max-w-2xl max-h-[90vh] flex flex-col rounded-3xl shadow-2xl transform transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
          isOpen ? "scale-100 translate-y-0 opacity-100 delay-100" : "scale-95 translate-y-8 opacity-0"
        }`}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-100 shrink-0">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-${automation.color}-50 text-${automation.color}-600`}>
              <Icon icon={automation.icon} width="22" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-black">Edit Automation</h2>
              <p className="text-sm text-gray-500">Configure workflow settings</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-[#fff] hover:text-gray-600 hover:bg-gray-50 rounded-xl transition-colors"
          >
            <Icon icon="solar:close-circle-bold" width="24" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Automation Name</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                rows="3"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all resize-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                <div className="text-sm text-gray-500 mb-1">Status</div>
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${formData.status === 'active' ? 'bg-green-500' : 'bg-[#fff]'}`}></span>
                  <span className="font-semibold text-black capitalize">{formData.status}</span>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                <div className="text-sm text-gray-500 mb-1">Last Edited</div>
                <div className="font-semibold text-black">Just now</div>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100">
              <h4 className="text-sm font-bold text-black mb-4">Configuration</h4>
              <div className="bg-blue-50/50 rounded-xl p-4 border border-blue-100 flex items-start gap-3">
                <Icon icon="solar:info-circle-bold" className="text-blue-500 shrink-0 mt-0.5" width="20" />
                <div>
                  <p className="text-sm text-blue-900 font-medium">Advanced Workflow Builder</p>
                  <p className="text-xs text-blue-700 mt-1">
                    To modify the actual workflow steps, logic, and conditions, please open the visual editor.
                  </p>
                  <button className="mt-3 text-xs font-bold text-white bg-[#007ce1] px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    Open Visual Editor
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-gray-100 flex justify-between items-center shrink-0 bg-gray-50/50 rounded-b-3xl">
          <button className="text-red-500 text-sm font-medium hover:text-red-600 px-2 py-1 rounded-lg hover:bg-red-50 transition-colors">
            Delete Automation
          </button>
          <div className="flex gap-3">
            <button 
              onClick={onClose}
              className="px-5 py-2.5 text-sm font-medium text-gray-600 hover:text-black hover:bg-gray-50 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button 
              onClick={onClose}
              className="px-5 py-2.5 text-sm font-bold text-white bg-[#007ce1] hover:bg-blue-700 rounded-xl shadow-lg shadow-[#007ce1]/20 transition-all hover:scale-105 active:scale-95"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
