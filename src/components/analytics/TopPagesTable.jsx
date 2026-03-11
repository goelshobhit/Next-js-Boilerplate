import { Icon } from "@iconify/react";

const pages = [
  {
    path: "/home",
    title: "Homepage - Minialis",
    visits: "1.2M",
    unique: "850K",
    bounce: "32%",
    change: "+12%",
    trend: "up"
  },
  {
    path: "/products/marketing-dashboard",
    title: "Marketing Dashboard Template",
    visits: "450K",
    unique: "320K",
    bounce: "28%",
    change: "+24%",
    trend: "up"
  },
  {
    path: "/blog/design-trends-2024",
    title: "Top UI/UX Trends for 2024",
    visits: "220K",
    unique: "180K",
    bounce: "65%",
    change: "-5%",
    trend: "down"
  },
  {
    path: "/pricing",
    title: "Pricing Plans",
    visits: "180K",
    unique: "90K",
    bounce: "45%",
    change: "+8%",
    trend: "up"
  },
  {
    path: "/about-us",
    title: "About Minialis Team",
    visits: "95K",
    unique: "70K",
    bounce: "55%",
    change: "+2%",
    trend: "up"
  },
];

export default function TopPagesTable() {
  return (
    <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100 flex justify-between items-center">
        <div>
          <h3 className="text-lg font-bold text-black">Top Visited Pages</h3>
          <p className="text-sm text-gray-500">Most popular content on your site</p>
        </div>
        <button className="text-sm font-medium text-black hover:text-blue-700 flex items-center gap-1">
          View Full Report
          <Icon icon="solar:arrow-right-linear" width="16" />
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 border-b border-gray-100">
              <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider w-[40%]">Page Title</th>
              <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Visits</th>
              <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Unique Visitors</th>
              <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Bounce Rate</th>
              <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Trend</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {pages.map((page, index) => (
              <tr key={index} className="hover:bg-gray-50/50 transition-colors group">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-50 text-black rounded-lg group-hover:bg-blue-100 transition-colors">
                      <Icon icon="solar:document-text-bold-duotone" width="20" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-black line-clamp-1">{page.title}</p>
                      <a href="#" className="text-xs text-gray-500 hover:text-black transition-colors">{page.path}</a>
                    </div>
                  </div>
                </td>
                <td className="p-4 text-sm font-semibold text-black">{page.visits}</td>
                <td className="p-4 text-sm text-gray-500">{page.unique}</td>
                <td className="p-4 text-sm text-gray-500">{page.bounce}</td>
                <td className="p-4 text-right">
                  <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${
                    page.trend === "up" ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"
                  }`}>
                    {page.change}
                    <Icon icon={page.trend === "up" ? "solar:arrow-right-up-linear" : "solar:arrow-right-down-linear"} width="14" />
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
