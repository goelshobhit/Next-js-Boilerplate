"use client";
import HelpHeader from "@/components/help/HelpHeader";
import HelpStats from "@/components/help/HelpStats";
import FAQ from "@/components/help/FAQ";
import RecentTicketsTable from "@/components/help/RecentTicketsTable";
import ContactSupport from "@/components/help/ContactSupport";
import DocumentationCategories from "@/components/help/DocumentationCategories";

export default function HelpPage() {
  return (
    <div className="max-w-[1920px] mx-auto space-y-8">
      {/* Header with Search */}
      <HelpHeader />

      {/* Support Options */}
      <ContactSupport />

      {/* Stats & FAQ */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <div className="h-full">
            <HelpStats />
        </div>
        <div className="h-full">
            <FAQ />
        </div>
      </div>

      {/* Documentation & Tickets */}
      <DocumentationCategories />
      <RecentTicketsTable />
    </div>
  );
}
