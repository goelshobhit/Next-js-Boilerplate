import { Icon } from "@iconify/react";
import { useState, useEffect } from "react";

export default function SecurityScanModal({ isOpen, onClose }) {
  const [scanStatus, setScanStatus] = useState("idle"); // idle, scanning, complete
  const [progress, setProgress] = useState(0);
  const [currentCheck, setCurrentCheck] = useState("Initializing...");

  const checks = [
    "Checking system integrity...",
    "Scanning for malware signatures...",
    "Verifying network configurations...",
    "Analyzing access logs...",
    "Checking password policies...",
    "Validating SSL certificates...",
    "Finalizing report..."
  ];

  useEffect(() => {
    if (isOpen) {
      setScanStatus("scanning");
      setProgress(0);
      let step = 0;
      
      const interval = setInterval(() => {
        step++;
        const newProgress = Math.min((step / 30) * 100, 100); // Simulate ~3 seconds
        setProgress(newProgress);
        
        // Update check text based on progress
        const checkIndex = Math.floor((newProgress / 100) * (checks.length - 1));
        setCurrentCheck(checks[checkIndex]);

        if (step >= 30) {
          clearInterval(interval);
          setScanStatus("complete");
        }
      }, 100);

      return () => clearInterval(interval);
    } else {
      // Reset when closed
      setTimeout(() => {
        setScanStatus("idle");
        setProgress(0);
      }, 300);
    }
  }, [isOpen]);

  const results = [
    { id: 1, name: "Malware Check", status: "passed", message: "No threats found" },
    { id: 2, name: "Firewall Status", status: "passed", message: "Active and protecting" },
    { id: 3, name: "Password Policy", status: "warning", message: "2 users have weak passwords" },
    { id: 4, name: "Software Updates", status: "passed", message: "All systems up to date" },
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
        className={`bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden relative transform transition-all duration-300 flex flex-col ${
          isOpen ? "scale-100 translate-y-0" : "scale-95 translate-y-4"
        }`}
      >
        {/* Header with Image Background */}
        <div className="relative h-48 bg-[#007ce1] overflow-hidden">
            <div className="absolute inset-0 opacity-60">
                <img 
                    src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop" 
                    alt="Scanning" 
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#007ce1] via-[#007ce1]/40 to-transparent"></div>
            
            <button 
                onClick={onClose}
                className="absolute top-4 right-4 text-white/70 hover:text-white bg-black/20 hover:bg-black/40 backdrop-blur-md p-2 rounded-xl transition-all"
            >
                <Icon icon="solar:close-circle-bold" width="24" />
            </button>

            <div className="absolute bottom-6 left-8 right-8">
                <div className="flex items-center gap-3 mb-2">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center backdrop-blur-md border border-white/20 ${scanStatus === 'complete' ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'}`}>
                        <Icon icon={scanStatus === 'complete' ? "solar:shield-check-bold-duotone" : "solar:radar-bold-duotone"} width="24" className={scanStatus === 'scanning' ? 'animate-spin-slow' : ''} />
                    </div>
                    <h3 className="text-2xl font-bold text-white">
                        {scanStatus === 'complete' ? "Scan Complete" : "System Scan"}
                    </h3>
                </div>
                <p className="text-gray-300 text-sm pl-1">
                    {scanStatus === 'complete' ? "Here is the security report for your system." : "Running deep security analysis..."}
                </p>
            </div>
        </div>

        {/* Body */}
        <div className="p-8">
            {scanStatus === 'scanning' && (
                <div className="space-y-6 py-4">
                    <div className="space-y-2">
                        <div className="flex justify-between text-sm font-medium">
                            <span className="text-black">{currentCheck}</span>
                            <span className="text-black">{Math.round(progress)}%</span>
                        </div>
                        <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                            <div 
                                className="h-full bg-[#007ce1] rounded-full transition-all duration-300 ease-out relative overflow-hidden"
                                style={{ width: `${progress}%` }}
                            >
                                <div className="absolute inset-0 bg-white/30 w-full h-full animate-shimmer"></div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <div className="inline-flex items-center gap-2 text-xs text-gray-500 bg-gray-50 px-3 py-1.5 rounded-lg">
                            <Icon icon="svg-spinners:ring-resize" />
                            Analyzing system components...
                        </div>
                    </div>
                </div>
            )}

            {scanStatus === 'complete' && (
                <div className="space-y-4 animate-fadeIn">
                    <div className="p-4 bg-green-50 border border-green-100 rounded-2xl flex items-start gap-4 mb-6">
                        <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Icon icon="solar:check-read-bold" width="18" />
                        </div>
                        <div>
                            <h4 className="font-bold text-green-900 text-sm">System Secure</h4>
                            <p className="text-green-700 text-xs mt-1">Your system is protected. No critical threats were found during the scan.</p>
                        </div>
                    </div>

                    <div className="space-y-3">
                        {results.map((result) => (
                            <div key={result.id} className="flex items-center justify-between p-3 border-b border-gray-50 last:border-0">
                                <div className="flex items-center gap-3">
                                    <Icon 
                                        icon={result.status === 'passed' ? "solar:shield-check-bold" : "solar:shield-warning-bold"} 
                                        className={result.status === 'passed' ? "text-green-500" : "text-orange-500"}
                                        width="20"
                                    />
                                    <span className="text-sm font-bold text-gray-700">{result.name}</span>
                                </div>
                                <span className={`text-xs font-medium px-2 py-1 rounded-md ${
                                    result.status === 'passed' ? "bg-green-50 text-green-600" : "bg-orange-50 text-orange-600"
                                }`}>
                                    {result.message}
                                </span>
                            </div>
                        ))}
                    </div>

                    <button 
                        onClick={onClose}
                        className="w-full mt-6 bg-[#007ce1] text-white py-3.5 rounded-xl font-bold hover:bg-[#007ce1] transition-colors shadow-lg shadow-gray-200"
                    >
                        Done
                    </button>
                </div>
            )}
        </div>
      </div>
    </div>
  );
}
