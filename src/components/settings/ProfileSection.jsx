import { useState, useRef } from "react";
import { Icon } from "@iconify/react";

export default function ProfileSection() {
  const [coverImage, setCoverImage] = useState("https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=2070&auto=format&fit=crop");
  const [avatarImage, setAvatarImage] = useState("https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1780&auto=format&fit=crop");
  
  const coverInputRef = useRef(null);
  const avatarInputRef = useRef(null);

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === 'cover') {
          setCoverImage(reader.result);
        } else {
          setAvatarImage(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      {/* Hidden Inputs */}
      <input 
        type="file" 
        ref={coverInputRef} 
        onChange={(e) => handleFileChange(e, 'cover')} 
        className="hidden" 
        accept="image/*"
      />
      <input 
        type="file" 
        ref={avatarInputRef} 
        onChange={(e) => handleFileChange(e, 'avatar')} 
        className="hidden" 
        accept="image/*"
      />

      {/* Profile Header */}
      <div className="relative rounded-3xl overflow-hidden bg-white border border-gray-100">
        <div className="h-32 bg-gradient-to-r from-blue-500 to-indigo-600 w-full relative">
            <img 
                src={coverImage}
                alt="Cover" 
                className="w-full h-full object-cover opacity-50"
            />
            <button 
                onClick={() => coverInputRef.current.click()}
                className="absolute bottom-4 right-4 bg-white/20 backdrop-blur-md border border-white/30 text-white px-3 py-1.5 rounded-xl text-xs font-medium flex items-center gap-2 hover:bg-white/30 transition-colors"
            >
                <Icon icon="solar:camera-minimalistic-bold" />
                Change Cover
            </button>
        </div>
        <div className="px-6 pb-6">
          <div className="relative flex justify-between items-end -mt-12 mb-6 pointer-events-none">
            <div className="flex items-end gap-4 pointer-events-auto">
              <div className="relative">
                <div className="w-24 h-24 rounded-2xl border-4 border-white overflow-hidden bg-gray-100">
                  <img 
                    src={avatarImage}
                    alt="Avatar" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <button 
                    onClick={() => avatarInputRef.current.click()}
                    className="absolute bottom-[-6px] right-[-6px] bg-[#007ce1] text-white p-2 rounded-xl border-4 border-white hover:bg-blue-700 transition-colors"
                >
                  <Icon icon="solar:pen-bold" width="14" />
                </button>
              </div>
              <div className="mb-1">
                <h2 className="text-xl font-bold text-black">Alex Morgan</h2>
                <p className="text-sm text-gray-500">Senior Marketing Manager</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <div className="relative">
                    <input 
                        type="text" 
                        defaultValue="Alex Morgan"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                    />
                    <Icon icon="solar:user-bold-duotone" className="absolute left-3 top-3 text-[#fff]" width="20" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <div className="relative">
                    <input 
                        type="email" 
                        defaultValue="alex.morgan@company.com"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                    />
                    <Icon icon="solar:letter-bold-duotone" className="absolute left-3 top-3 text-[#fff]" width="20" />
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <div className="relative">
                    <input 
                        type="tel" 
                        defaultValue="+1 (555) 123-4567"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                    />
                    <Icon icon="solar:phone-bold-duotone" className="absolute left-3 top-3 text-[#fff]" width="20" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <div className="relative">
                    <input 
                        type="text" 
                        defaultValue="San Francisco, CA"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                    />
                    <Icon icon="solar:map-point-bold-duotone" className="absolute left-3 top-3 text-[#fff]" width="20" />
                </div>
              </div>
            </div>
            <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                <textarea 
                    rows="4"
                    defaultValue="Passionate about data-driven marketing and user experience. Leading the growth team to new heights."
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all resize-none"
                ></textarea>
            </div>
          </div>

          <div className="mt-8 flex justify-end gap-3">
            <button className="px-6 py-2.5 text-sm font-medium text-gray-600 hover:text-black hover:bg-gray-50 rounded-xl transition-colors">
                Cancel
            </button>
            <button className="px-6 py-2.5 text-sm font-bold text-white bg-[#007ce1] hover:bg-blue-700 rounded-xl transition-all hover:scale-105 active:scale-95 flex items-center gap-2">
                <Icon icon="solar:disk-bold-duotone" />
                Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
