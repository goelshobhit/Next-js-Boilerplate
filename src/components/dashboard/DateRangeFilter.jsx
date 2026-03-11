"use client";

import { useState, useRef, useEffect } from "react";
import { Icon } from "@iconify/react";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";
import "react-day-picker/style.css";

export default function DateRangeFilter() {
  const [isOpen, setIsOpen] = useState(false);
  const [range, setRange] = useState({
    from: new Date(2026, 0, 1),
    to: new Date(2026, 0, 15),
  });
  
  const containerRef = useRef(null);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Format date range for display
  const formatDateRange = () => {
    if (range?.from) {
      if (range.to) {
        return `${format(range.from, "MMM yyyy")} - ${format(range.to, "MMM yyyy")}`;
      }
      return format(range.from, "MMM yyyy");
    }
    return "Select dates";
  };

  return (
    <div className="relative" ref={containerRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center bg-white border rounded-xl px-4 py-2 transition-all duration-200 ${
          isOpen ? "border-blue-500 ring-2 ring-blue-100" : "border-gray-200 hover:border-gray-300"
        }`}
      >
        <Icon icon="solar:calendar-bold-duotone" className="text-[#fff] mr-2" width="20" />
        <span className="text-sm font-medium text-gray-600 min-w-[140px] text-left">
          {formatDateRange()}
        </span>
        <Icon 
          icon="solar:alt-arrow-down-linear" 
          className={`text-[#fff] ml-auto transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} 
          width="16" 
        />
      </button>

      {/* Popover */}
      <div
        className={`absolute top-full right-0 mt-2 bg-white rounded-2xl shadow-xl border border-gray-100 p-4 z-50 transition-all duration-300 origin-top-right ${
          isOpen 
            ? "opacity-100 scale-100 translate-y-0 visible" 
            : "opacity-0 scale-95 -translate-y-2 invisible"
        }`}
      >
        <div className="bg-white rounded-xl">
          <style>{`
            .rdp {
              --rdp-cell-size: 36px;
              --rdp-caption-font-size: 14px;
              --rdp-accent-color: #111827; 
              --rdp-background-color: #f3f4f6;
              margin: 0;
            }
            .rdp-month {
              border-collapse: collapse;
            }
            .rdp table {
              border-collapse: collapse;
            }
            .rdp-caption_label {
              font-weight: 600;
              color: #111827;
            }
            .rdp-day {
              width: 36px;
              height: 36px;
              font-size: 13px;
              border-radius: 0;
            }
            .rdp-button:hover:not([disabled]):not(.rdp-selected) {
              background-color: #f9fafb;
              border-radius: 6px;
            }
            
            /* Range Start - Round Left */
            .rdp-range_start:not(.rdp-range_end) {
              background-color: var(--rdp-accent-color);
              color: white;
              border-top-left-radius: 50%;
              border-bottom-left-radius: 50%;
            }

            /* Range End - Round Right */
            .rdp-range_end:not(.rdp-range_start) {
              background-color: var(--rdp-accent-color);
              color: white;
              border-top-right-radius: 50%;
              border-bottom-right-radius: 50%;
            }

            /* Single Day Selected - Round Circle */
            .rdp-range_start.rdp-range_end {
              background-color: var(--rdp-accent-color);
              color: white;
              border-radius: 50%;
            }

            /* Middle Range - Square & Light */
            .rdp-range_middle {
              color: #111827 !important;
              border-radius: 0 !important;
            }

            .rdp-nav_button {
              width: 28px;
              height: 28px;
            }
          `}</style>
          
          <DayPicker
            mode="range"
            defaultMonth={range?.from}
            selected={range}
            onSelect={setRange}
            numberOfMonths={1}
            pagedNavigation
            showOutsideDays
            weekStartsOn={1}
          />
          
          <div className="flex justify-end gap-2 mt-4 pt-3 border-t border-gray-100">
            <button 
              onClick={() => setIsOpen(false)}
              className="px-3 py-1.5 text-xs font-semibold text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button 
              onClick={() => setIsOpen(false)}
              className="px-3 py-1.5 text-xs font-semibold bg-[#007ce1] text-white rounded-lg hover:bg-[#007ce1] transition-colors shadow-sm cursor-pointer"
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
