"use client";
import { useState } from "react";
import { Icon } from "@iconify/react";
import DateRangeFilter from "@/components/dashboard/DateRangeFilter";
import ProductStats from "@/components/products/ProductStats";
import ProductChart from "@/components/products/ProductChart";
import CategoryPieChart from "@/components/products/CategoryPieChart";
import ProductTable from "@/components/products/ProductTable";
import AddProductModal from "@/components/products/AddProductModal";
import DeleteProductModal from "@/components/products/DeleteProductModal";

const INITIAL_PRODUCTS = [
  {
    id: 1,
    name: "Minimalist Watch",
    sku: "WT-2023-001",
    category: "Accessories",
    price: 129.99,
    stock: 45,
    status: "Active",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=200&h=200",
  },
  {
    id: 2,
    name: "Leather Backpack",
    sku: "BG-2023-012",
    category: "Bags",
    price: 199.50,
    stock: 12,
    status: "Low Stock",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=200&h=200",
  },
  {
    id: 3,
    name: "Wireless Headphones",
    sku: "EL-2023-045",
    category: "Electronics",
    price: 249.00,
    stock: 0,
    status: "Out of Stock",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=200&h=200",
  },
  {
    id: 4,
    name: "Ceramic Coffee Mug",
    sku: "HM-2023-089",
    category: "Home",
    price: 24.99,
    stock: 156,
    status: "Active",
    image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&q=80&w=200&h=200",
  },
  {
    id: 5,
    name: "Polarized Sunglasses",
    sku: "AC-2023-102",
    category: "Accessories",
    price: 89.95,
    stock: 34,
    status: "Active",
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=200&h=200",
  },
  {
    id: 6,
    name: "Running Shoes",
    sku: "FT-2023-221",
    category: "Footwear",
    price: 119.00,
    stock: 8,
    status: "Low Stock",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=200&h=200",
  },
];

export default function ProductsPage() {
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);
  
  // Delete State
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const handleEdit = (product) => {
    setProductToEdit(product);
    setIsAddProductOpen(true);
  };

  const handleAddProduct = () => {
    setProductToEdit(null);
    setIsAddProductOpen(true);
  };

  const handleDelete = (product) => {
    setProductToDelete(product);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (productToDelete) {
      setProducts(products.filter(p => p.id !== productToDelete.id));
      setIsDeleteModalOpen(false);
      setProductToDelete(null);
    }
  };

  const handleSaveProduct = (formData) => {
    if (productToEdit) {
      // Edit existing product
      setProducts(products.map(p => 
        p.id === productToEdit.id 
          ? { ...p, ...formData, price: parseFloat(formData.price), stock: parseInt(formData.stock) } 
          : p
      ));
    } else {
      // Add new product
      const newProduct = {
        id: products.length + 1, // Simple ID generation
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        sku: `PR-${new Date().getFullYear()}-${Math.floor(Math.random() * 1000)}`, // Generate fake SKU
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=200&h=200" // Default image for now
      };
      setProducts([newProduct, ...products]);
    }
    setIsAddProductOpen(false);
  };

  return (
    <div className="max-w-[1920px] mx-auto space-y-8">
      
      {/* Add/Edit Product Modal */}
      <AddProductModal 
        isOpen={isAddProductOpen} 
        onClose={() => setIsAddProductOpen(false)}
        productToEdit={productToEdit}
        onSave={handleSaveProduct}
      />

      {/* Delete Confirmation Modal */}
      <DeleteProductModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        productName={productToDelete?.name}
      />

      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-black tracking-tight">Products</h1>
          <p className="text-gray-500 mt-1">Manage your product inventory and catalog.</p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <DateRangeFilter />
          <button 
            onClick={handleAddProduct}
            className="bg-[#007ce1] text-white px-5 py-2 rounded-xl text-sm font-medium hover:bg-[#007ce1] transition-colors flex items-center justify-center gap-2 shadow-none w-full sm:w-auto"
          >
            <Icon icon="solar:add-circle-bold-duotone" width="20" />
            Add Product
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <ProductStats />

      {/* Charts Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 h-full">
            <ProductChart />
        </div>
        <div className="xl:col-span-1 h-full">
            <CategoryPieChart />
        </div>
      </div>

      {/* Product Table */}
      <ProductTable 
        products={products}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
