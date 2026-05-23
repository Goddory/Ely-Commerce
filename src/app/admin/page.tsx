"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Loader2, Plus, Trash2, Edit, ChevronDown } from "lucide-react";
import { apiFetch } from "@/utils/api";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import ProductModal from "@/components/admin/ProductModal";

interface OrderItem {
  id: string;
  productId: string;
  quantity: number;
  price: number;
  color?: string;
  size?: string;
  product?: {
    name: string;
    imageUrl: string;
  };
}

interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  shippingAddress: string;
  totalAmount: number;
  orderDate: string;
  status: string;
  orderItems: OrderItem[];
}

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  description: string;
  imageUrl: string;
  stock: number;
  colorOptions?: string;
  sizeOptions?: string;
  isNew: boolean;
  categoryId: string;
}

interface Category {
  id: string;
  name: string;
}

export default function AdminDashboard() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<"orders" | "products">("orders");
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  
  const [loadingData, setLoadingData] = useState(true);
  
  // Modals state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Status transitions indicators
  const [updatingOrderId, setUpdatingOrderId] = useState<string | null>(null);

  const refreshData = async () => {
    setLoadingData(true);
    try {
      const cats = await apiFetch<Category[]>("/categories");
      setCategories(cats);

      const prodsRes = await apiFetch<{ products: Product[] }>("/products?limit=100");
      setProducts(prodsRes.products);

      const ords = await apiFetch<Order[]>("/orders");
      setOrders(ords);
    } catch (err) {
      console.error("Error loading admin data:", err);
    } finally {
      setLoadingData(false);
    }
  };

  useEffect(() => {
    if (authLoading) return;
    if (!user || user.role !== "Admin") {
      router.push("/");
      return;
    }

    Promise.resolve().then(() => {
      refreshData();
    });
  }, [user, authLoading, router]);

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    setUpdatingOrderId(orderId);
    try {
      await apiFetch(`/orders/${orderId}/status`, {
        method: "PUT",
        body: JSON.stringify({ status: newStatus })
      });
      const updatedOrders = await apiFetch<Order[]>("/orders");
      setOrders(updatedOrders);
    } catch (err) {
      console.error("Failed to update status:", err);
      alert("Cập nhật trạng thái thất bại.");
    } finally {
      setUpdatingOrderId(null);
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    if (!confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) return;
    try {
      await apiFetch(`/products/${productId}`, {
        method: "DELETE"
      });
      setProducts(products.filter(p => p.id !== productId));
    } catch (err) {
      console.error("Failed to delete product:", err);
      alert("Xóa sản phẩm thất bại.");
    }
  };

  const openEditModal = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const openCreateModal = () => {
    setSelectedProduct(null);
    setIsModalOpen(true);
  };

  if (authLoading || (user && user.role !== "Admin")) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 className="animate-spin w-12 h-12 text-brand-accent" />
      </div>
    );
  }

  // Removed unused translateStatus

  const getStatusColor = (status: string) => {
    switch (status.trim().toLowerCase()) {
      case "pending": return "text-amber-600 bg-amber-50 border-amber-100";
      case "processing": return "text-blue-600 bg-blue-50 border-blue-100";
      case "shipped": return "text-emerald-600 bg-emerald-50 border-emerald-100";
      case "cancelled": return "text-red-600 bg-red-50 border-red-100";
      default: return "text-gray-600 bg-gray-50 border-gray-100";
    }
  };

  return (
    <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 w-full">
      {/* Title */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-brand-dark">Trang Quản Trị Hệ Thống</h1>
          <p className="text-brand-text-secondary mt-1">Quản lý kho sản phẩm và trạng thái đơn đặt hàng.</p>
        </div>
        
        {activeTab === "products" && (
          <button 
            onClick={openCreateModal}
            className="inline-flex items-center bg-brand-dark text-white font-bold px-6 py-3 rounded-2xl shadow-md hover:bg-brand-accent transition-all hover:scale-105 active:scale-95 text-sm cursor-pointer"
          >
            <Plus className="w-4 h-4 mr-2" /> Thêm sản phẩm
          </button>
        )}
      </div>

      {/* Tabs Menu */}
      <div className="flex space-x-2 border-b border-gray-200 mb-8 pb-px">
        <button
          onClick={() => setActiveTab("orders")}
          className={`relative pb-3 px-4 text-sm font-bold transition-colors cursor-pointer ${
            activeTab === "orders"
              ? "text-brand-dark"
              : "text-gray-400 hover:text-brand-dark"
          }`}
        >
          Quản lý đơn hàng ({orders.length})
          {activeTab === "orders" && (
            <motion.span
              layoutId="tab-indicator"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-dark rounded-full"
              transition={{ type: "spring", stiffness: 500, damping: 40 }}
            />
          )}
        </button>
        <button
          onClick={() => setActiveTab("products")}
          className={`relative pb-3 px-4 text-sm font-bold transition-colors cursor-pointer ${
            activeTab === "products"
              ? "text-brand-dark"
              : "text-gray-400 hover:text-brand-dark"
          }`}
        >
          Quản lý sản phẩm ({products.length})
          {activeTab === "products" && (
            <motion.span
              layoutId="tab-indicator"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-dark rounded-full"
              transition={{ type: "spring", stiffness: 500, damping: 40 }}
            />
          )}
        </button>
      </div>

      {loadingData ? (
        <div className="flex justify-center items-center py-24 bg-white rounded-[32px] border border-brand-accent/5 shadow-sm">
          <Loader2 className="animate-spin w-10 h-10 text-brand-accent" />
        </div>
      ) : (
        <AnimatePresence mode="wait">
          {activeTab === "orders" ? (
            /* Orders Tab */
            <motion.div
              key="orders"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="bg-white rounded-[32px] shadow-sm border border-brand-accent/5 overflow-hidden"
            >
              <div className="overflow-x-auto w-full">
                <table className="w-full text-left border-collapse min-w-[900px]">
                  <thead>
                    <tr className="bg-brand-bg/40 text-brand-dark font-bold text-xs uppercase tracking-wider border-b border-gray-100">
                      <th className="py-4 px-6">Đơn hàng</th>
                      <th className="py-4 px-6">Khách hàng</th>
                      <th className="py-4 px-6">Sản phẩm</th>
                      <th className="py-4 px-6">Tổng tiền</th>
                      <th className="py-4 px-6">Trạng thái</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-sm">
                    {orders.map((order) => (
                      <tr key={order.id} className="hover:bg-brand-bg/10 transition-colors">
                        {/* ID & Date */}
                        <td className="py-4 px-6 align-top">
                          <span className="font-bold text-brand-dark text-xs block truncate max-w-[120px]">{order.id}</span>
                          <span className="text-xs text-brand-text-secondary mt-1 block">
                            {new Date(order.orderDate).toLocaleString("vi-VN", {
                              month: "short",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit"
                            })}
                          </span>
                        </td>
                        
                        {/* Customer Info */}
                        <td className="py-4 px-6 align-top max-w-[200px]">
                          <span className="font-semibold text-brand-dark block truncate">{order.customerName}</span>
                          <span className="text-xs text-brand-text-secondary mt-0.5 block">{order.customerPhone}</span>
                          <span className="text-xs text-brand-text-secondary mt-1 block line-clamp-2">{order.shippingAddress}</span>
                        </td>

                        {/* Order Items */}
                        <td className="py-4 px-6 align-top max-w-[300px]">
                          <div className="space-y-2">
                            {order.orderItems.map((item) => (
                              <div key={item.id} className="flex gap-2 items-center">
                                {item.product && (
                                  <div className="relative w-8 h-10 bg-gray-50 rounded overflow-hidden flex-shrink-0">
                                    <Image
                                      src={item.product.imageUrl}
                                      alt={item.product.name}
                                      fill
                                      className="object-cover"
                                    />
                                  </div>
                                )}
                                <div className="min-w-0">
                                  <p className="text-xs font-semibold text-brand-dark truncate max-w-[220px]">
                                    {item.product?.name || "Sản phẩm"}
                                  </p>
                                  <p className="text-[10px] text-brand-text-secondary">
                                    {item.color && `Màu: ${item.color}`} {item.size && `| Size: ${item.size}`} | SL: {item.quantity}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </td>

                        {/* Total Amount */}
                        <td className="py-4 px-6 align-top font-bold text-brand-dark">
                          {order.totalAmount.toLocaleString("vi-VN")}₫
                        </td>

                        {/* Status Select Dropdown */}
                        <td className="py-4 px-6 align-top">
                          <div className="relative inline-block text-left">
                            {updatingOrderId === order.id ? (
                              <div className="flex items-center gap-1.5 px-3 py-1 border rounded-full text-xs text-gray-500 bg-gray-50">
                                <Loader2 className="animate-spin w-3.5 h-3.5" /> Đang cập nhật...
                              </div>
                            ) : (
                              <select
                                value={order.status}
                                onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                className={`appearance-none font-bold border rounded-full text-xs py-1.5 pl-3 pr-8 focus:outline-none cursor-pointer ${getStatusColor(order.status)}`}
                              >
                                <option value="Pending">Chờ xử lý</option>
                                <option value="Processing">Đang xử lý</option>
                                <option value="Shipped">Đã giao hàng</option>
                                <option value="Cancelled">Đã hủy</option>
                              </select>
                            )}
                            {updatingOrderId !== order.id && (
                              <ChevronDown className="absolute right-2.5 top-2.5 w-3.5 h-3.5 pointer-events-none text-brand-dark" />
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                
                {orders.length === 0 && (
                  <div className="text-center py-16 text-gray-500 font-medium">
                    Chưa có đơn hàng nào được đặt.
                  </div>
                )}
              </div>
            </motion.div>
          ) : (
            /* Products Tab */
            <motion.div
              key="products"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="bg-white rounded-[32px] shadow-sm border border-brand-accent/5 overflow-hidden"
            >
              <div className="overflow-x-auto w-full">
                <table className="w-full text-left border-collapse min-w-[900px]">
                  <thead>
                    <tr className="bg-brand-bg/40 text-brand-dark font-bold text-xs uppercase tracking-wider border-b border-gray-100">
                      <th className="py-4 px-6">Ảnh</th>
                      <th className="py-4 px-6">Tên sản phẩm</th>
                      <th className="py-4 px-6">Danh mục</th>
                      <th className="py-4 px-6">Giá bán</th>
                      <th className="py-4 px-6">Kho</th>
                      <th className="py-4 px-6 text-right">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-sm">
                    {products.map((product) => {
                      const categoryName = categories.find(c => c.id === product.categoryId)?.name || product.categoryId;
                      return (
                        <tr key={product.id} className="hover:bg-brand-bg/10 transition-colors">
                          {/* Product Image */}
                          <td className="py-4 px-6">
                            <div className="relative w-12 h-16 bg-gray-50 rounded-xl overflow-hidden shadow-sm">
                              <Image
                                src={product.imageUrl}
                                alt={product.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                          </td>

                          {/* Product Details */}
                          <td className="py-4 px-6 font-bold text-brand-dark max-w-[250px] truncate">
                            <span className="block truncate">{product.name}</span>
                            {product.isNew && (
                              <span className="inline-block mt-1 bg-brand-accent/15 text-brand-accent text-[9px] font-extrabold px-1.5 py-0.5 rounded-md uppercase">
                                MỚI
                              </span>
                            )}
                          </td>

                          {/* Category */}
                          <td className="py-4 px-6 text-brand-text-secondary font-medium">
                            {categoryName}
                          </td>

                          {/* Prices */}
                          <td className="py-4 px-6 font-bold text-brand-dark">
                            <span className="block">{product.price.toLocaleString("vi-VN")}₫</span>
                            {product.originalPrice > product.price && (
                              <span className="text-xs text-gray-400 line-through font-normal block mt-0.5">
                                {product.originalPrice.toLocaleString("vi-VN")}₫
                              </span>
                            )}
                          </td>

                          {/* Stock */}
                          <td className="py-4 px-6 align-middle">
                            <span className={`font-semibold ${product.stock <= 5 ? 'text-red-500 font-extrabold' : 'text-brand-dark'}`}>
                              {product.stock}
                            </span>
                            {product.stock === 0 && (
                              <span className="text-[10px] text-red-500 font-bold block mt-0.5 uppercase">Hết hàng</span>
                            )}
                          </td>

                          {/* Actions */}
                          <td className="py-4 px-6 text-right">
                            <div className="flex justify-end gap-2">
                              <button
                                onClick={() => openEditModal(product)}
                                className="p-2 border border-gray-200 hover:border-brand-dark hover:text-brand-dark text-gray-500 rounded-xl transition-all hover:scale-105 active:scale-95 cursor-pointer"
                                aria-label="Chỉnh sửa sản phẩm"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteProduct(product.id)}
                                className="p-2 border border-red-100 hover:border-red-500 hover:text-red-500 text-red-400 rounded-xl transition-all hover:scale-105 active:scale-95 cursor-pointer"
                                aria-label="Xóa sản phẩm"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                
                {products.length === 0 && (
                  <div className="text-center py-16 text-gray-500 font-medium">
                    Chưa có sản phẩm nào trong cửa hàng.
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}

      {/* Product Create/Edit Modal */}
      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={refreshData}
        product={selectedProduct}
        categories={categories}
      />
    </main>
  );
}
