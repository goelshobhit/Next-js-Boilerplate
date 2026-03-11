"use client";
import { useState } from "react";
import { Icon } from "@iconify/react";

export default function ProductTable({ products, onEdit, onDelete }) {
  const [selectedProducts, setSelectedProducts] = useState([]);

  const toggleSelectAll = () => {
    if (selectedProducts.length === products.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(products.map((p) => p.id));
    }
  };

  const toggleSelectProduct = (id) => {
    if (selectedProducts.includes(id)) {
      setSelectedProducts(selectedProducts.filter((pId) => pId !== id));
    } else {
      setSelectedProducts([...selectedProducts, id]);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-50 text-green-600";
      case "Low Stock":
        return "bg-orange-50 text-orange-600";
      case "Out of Stock":
        return "bg-red-50 text-red-600";
      default:
        return "bg-gray-50 text-gray-600";
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 border-b border-gray-100">
              <th className="p-4 w-12">
                <input
                  type="checkbox"
                  checked={selectedProducts.length === products.length && products.length > 0}
                  onChange={toggleSelectAll}
                  className="w-4 h-4 rounded border-gray-300 text-black focus:ring-blue-500 cursor-pointer"
                />
              </th>
              <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Product Name
              </th>
              <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Stock
              </th>
              <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {products.map((product) => (
              <tr
                key={product.id}
                className={`hover:bg-gray-50/50 transition-colors ${
                  selectedProducts.includes(product.id) ? "bg-blue-50/30" : ""
                }`}
              >
                <td className="p-4">
                  <input
                    type="checkbox"
                    checked={selectedProducts.includes(product.id)}
                    onChange={() => toggleSelectProduct(product.id)}
                    className="w-4 h-4 rounded border-gray-300 text-black focus:ring-blue-500 cursor-pointer"
                  />
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0 border border-gray-100">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium text-sm text-black">
                        {product.name}
                      </p>
                      <p className="text-xs text-gray-500">{product.sku}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-lg bg-gray-100 text-gray-600 text-xs font-medium">
                    {product.category}
                  </span>
                </td>
                <td className="p-4">
                  <span className="font-medium text-black">
                    ${product.price.toFixed(2)}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex flex-col gap-1">
                    <span className="text-sm text-gray-700">
                      {product.stock} in stock
                    </span>
                    {product.stock < 20 && product.stock > 0 && (
                      <div className="w-24 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-orange-500 rounded-full"
                          style={{ width: `${(product.stock / 50) * 100}%` }}
                        ></div>
                      </div>
                    )}
                  </div>
                </td>
                <td className="p-4">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                      product.status
                    )}`}
                  >
                    {product.status}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button 
                      onClick={() => onEdit(product)}
                      className="p-2 text-[#fff] hover:text-black hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Icon icon="solar:pen-bold" width="18" />
                    </button>
                    <button 
                      onClick={() => onDelete(product)}
                      className="p-2 text-[#fff] hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Icon icon="solar:trash-bin-trash-bold" width="18" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Pagination */}
      <div className="p-4 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500">
        <span>Showing 1-{products.length} of {products.length} products</span>
        <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-gray-100 rounded-lg disabled:opacity-50" disabled>
                <Icon icon="solar:alt-arrow-left-linear" width="20" />
            </button>
            <button className="px-3 py-1 bg-blue-50 text-black font-medium rounded-lg">1</button>
            <button className="px-3 py-1 hover:bg-gray-50 rounded-lg">2</button>
            <button className="px-3 py-1 hover:bg-gray-50 rounded-lg">3</button>
            <span>...</span>
            <button className="p-2 hover:bg-gray-100 rounded-lg">
                <Icon icon="solar:alt-arrow-right-linear" width="20" />
            </button>
        </div>
      </div>
    </div>
  );
}
