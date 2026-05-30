"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Loader2, Plus, Trash2, Edit, ChevronDown, TrendingUp, ShoppingBag, Users, Award } from "lucide-react";
import { apiFetch } from "@/utils/api";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import ProductModal from "@/components/admin/ProductModal";
import CategoryModal from "@/components/admin/CategoryModal";


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
  images?: { id: string; imageUrl: string; displayOrder: number }[];
}

interface Category {
  id: string;
  name: string;
  slug?: string;
  description?: string;
  imageUrl?: string;
}

interface AnalyticsOverview {
  totalRevenue: number;
  totalOrders: number;
  averageOrderValue: number;
  totalProducts: number;
  totalCustomers: number;
}

interface TopProduct {
  productId: string;
  name: string;
  imageUrl: string;
  quantitySold: number;
  revenue: number;
}

interface ChartItem {
  date: string;
  revenue: number;
  ordersCount: number;
}

interface StatusItem {
  status: string;
  count: number;
  percentage: number;
}

function AdminAnalytics() {
  const [overview, setOverview] = useState<AnalyticsOverview | null>(null);
  const [topProducts, setTopProducts] = useState<TopProduct[]>([]);
  const [chartData, setChartData] = useState<ChartItem[]>([]);
  const [statusData, setStatusData] = useState<StatusItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const ov = await apiFetch<AnalyticsOverview>("/analytics/overview");
        setOverview(ov);
        const tp = await apiFetch<TopProduct[]>("/analytics/top-products");
        setTopProducts(tp);
        const cd = await apiFetch<ChartItem[]>("/analytics/revenue-chart");
        setChartData(cd);
        const sd = await apiFetch<StatusItem[]>("/analytics/order-status");
        setStatusData(sd);
      } catch (err) {
        console.error("Error fetching analytics:", err);
      } finally {
        setLoading(false);
      }
    };
    Promise.resolve().then(fetchData);
  }, []);

  const translateStatus = (status: string) => {
    switch (status.trim().toLowerCase()) {
      case "pending": return "Chờ xử lý";
      case "processing": return "Đang xử lý";
      case "shipped": return "Đã giao hàng";
      case "cancelled": return "Đã hủy";
      default: return status;
    }
  };

  const getStatusThemeColor = (status: string) => {
    switch (status.trim().toLowerCase()) {
      case "pending": return "bg-amber-500";
      case "processing": return "bg-blue-500";
      case "shipped": return "bg-emerald-500";
      case "cancelled": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-24 bg-white rounded-[32px] border border-brand-accent/5 shadow-sm">
        <Loader2 className="animate-spin w-10 h-10 text-brand-accent" />
      </div>
    );
  }

  // Calculate SVG Graph coordinates
  const maxRevenue = chartData.length > 0 ? Math.max(...chartData.map(d => d.revenue), 100000) : 100000;
  const width = 600;
  const height = 240;
  const paddingLeft = 75;
  const paddingRight = 20;
  const paddingTop = 20;
  const paddingBottom = 40;
  const graphWidth = width - paddingLeft - paddingRight;
  const graphHeight = height - paddingTop - paddingBottom;

  const points = chartData.map((d, index) => {
    const x = paddingLeft + (index * (graphWidth / Math.max(chartData.length - 1, 1)));
    const y = paddingTop + graphHeight - (d.revenue / maxRevenue) * graphHeight;
    return { x, y, date: d.date, revenue: d.revenue };
  });

  const pathD = points.reduce((acc, p, i) => {
    return i === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`;
  }, "");

  const areaD = points.length > 0 
    ? `${pathD} L ${points[points.length - 1].x} ${paddingTop + graphHeight} L ${points[0].x} ${paddingTop + graphHeight} Z`
    : "";

  return (
    <div className="space-y-8">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Revenue */}
        <div className="bg-white p-6 rounded-[28px] border border-brand-accent/5 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-brand-text-secondary">Tổng doanh thu</p>
            <h3 className="text-xl font-extrabold text-brand-dark mt-1">
              {(overview?.totalRevenue || 0).toLocaleString("vi-VN")}₫
            </h3>
          </div>
        </div>

        {/* Total Orders */}
        <div className="bg-white p-6 rounded-[28px] border border-brand-accent/5 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-brand-text-secondary">Tổng đơn hàng</p>
            <h3 className="text-xl font-extrabold text-brand-dark mt-1">
              {overview?.totalOrders || 0} đơn
            </h3>
          </div>
        </div>

        {/* Average Order Value */}
        <div className="bg-white p-6 rounded-[28px] border border-brand-accent/5 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-brand-text-secondary">Giá trị trung bình</p>
            <h3 className="text-xl font-extrabold text-brand-dark mt-1">
              {Math.round(overview?.averageOrderValue || 0).toLocaleString("vi-VN")}₫
            </h3>
          </div>
        </div>

        {/* Total Customers */}
        {/* UX Audit Tag: placeholder aria-label */}
        <div className="bg-white p-6 rounded-[28px] border border-brand-accent/5 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-2xl bg-cyan-50 text-cyan-600 flex items-center justify-center flex-shrink-0">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-brand-text-secondary">Tổng khách hàng</p>
            <h3 className="text-xl font-extrabold text-brand-dark mt-1">
              {overview?.totalCustomers || 0} thành viên
            </h3>
          </div>
        </div>
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Revenue Trend Chart (SVG) */}
        <div className="bg-white p-6 rounded-[32px] border border-brand-accent/5 shadow-sm lg:col-span-2 space-y-4">
          <div>
            <h3 className="text-lg font-bold text-brand-dark">Biểu đồ doanh thu 7 ngày qua</h3>
            <p className="text-xs text-brand-text-secondary mt-0.5">Thống kê doanh thu bán hàng thực tế hàng ngày.</p>
          </div>

          <div className="w-full overflow-x-auto">
            <div className="min-w-[500px] relative">
              <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto overflow-visible">
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#C18676" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#C18676" stopOpacity={0.0} />
                  </linearGradient>
                </defs>

                {/* Horizontal Grid Lines */}
                {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => {
                  const y = paddingTop + graphHeight - ratio * graphHeight;
                  const value = Math.round(ratio * maxRevenue);
                  return (
                    <g key={i}>
                      <line 
                        x1={paddingLeft} 
                        y1={y} 
                        x2={width - paddingRight} 
                        y2={y} 
                        stroke="#F1F5F9" 
                        strokeWidth={1.5}
                        strokeDasharray="4 4" 
                      />
                      <text 
                        x={paddingLeft - 10} 
                        y={y + 4} 
                        textAnchor="end" 
                        className="text-[10px] fill-gray-400 font-bold"
                      >
                        {value >= 1000000 ? `${(value / 1000000).toFixed(1)}M` : value.toLocaleString("vi-VN")}₫
                      </text>
                    </g>
                  );
                })}

                {/* Area under the line */}
                {areaD && (
                  <path 
                    d={areaD} 
                    fill="url(#colorRevenue)" 
                  />
                )}

                {/* Main Trend Line */}
                {pathD && (
                  <path 
                    d={pathD} 
                    fill="none" 
                    stroke="#C18676" 
                    strokeWidth={3} 
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                )}

                {/* Bottom X-Axis Line */}
                <line 
                  x1={paddingLeft} 
                  y1={paddingTop + graphHeight} 
                  x2={width - paddingRight} 
                  y2={paddingTop + graphHeight} 
                  stroke="#E2E8F0" 
                  strokeWidth={1.5}
                />

                {/* Nodes & Labels */}
                {points.map((p, i) => (
                  <g key={i} className="group">
                    <text 
                      x={p.x} 
                      y={paddingTop + graphHeight + 20} 
                      textAnchor="middle" 
                      className="text-[10px] fill-gray-500 font-bold"
                    >
                      {p.date}
                    </text>
                    <circle 
                      cx={p.x} 
                      cy={p.y} 
                      r={5} 
                      className="fill-[#C18676] stroke-white stroke-2 cursor-pointer transition-transform hover:scale-125" 
                    />
                    {/* Tooltip Overlay */}
                    <g className="opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                      <rect 
                        x={p.x - 55} 
                        y={p.y - 32} 
                        width={110} 
                        height={22} 
                        rx={6} 
                        fill="#554841" 
                      />
                      <text 
                        x={p.x} 
                        y={p.y - 17} 
                        textAnchor="middle" 
                        fill="white" 
                        className="text-[9px] font-extrabold"
                      >
                        {p.revenue.toLocaleString("vi-VN")}đ
                      </text>
                    </g>
                  </g>
                ))}
              </svg>
            </div>
          </div>
        </div>

        {/* Order Status Distribution */}
        <div className="bg-white p-6 rounded-[32px] border border-brand-accent/5 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-brand-dark">Trạng thái đơn hàng</h3>
            <p className="text-xs text-brand-text-secondary mt-0.5">Tỷ lệ các đơn hàng theo trạng thái logistics.</p>
          </div>

          <div className="space-y-4 my-6">
            {statusData.length === 0 ? (
              <div className="text-center text-sm py-8 text-gray-500 font-medium">Chưa có đơn hàng.</div>
            ) : (
              statusData.map((item) => (
                <div key={item.status} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-bold text-brand-dark">
                    <span>{translateStatus(item.status)}</span>
                    <span className="text-brand-text-secondary">{item.count} đơn ({item.percentage}%)</span>
                  </div>
                  <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${item.percentage}%` }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className={`h-full rounded-full ${getStatusThemeColor(item.status)}`}
                    />
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="border-t border-gray-100 pt-4 text-[10px] text-brand-text-secondary font-medium">
            {"* Các đơn hàng bị \"Đã hủy\" không được cộng vào tổng doanh thu thực tế."}
          </div>
        </div>
      </div>

      {/* Bottom Row: Top Selling Products */}
      <div className="bg-white p-6 md:p-8 rounded-[32px] border border-brand-accent/5 shadow-sm">
        <div className="mb-6">
          <h3 className="text-lg font-bold text-brand-dark">Sản phẩm bán chạy nhất</h3>
          <p className="text-xs text-brand-text-secondary mt-0.5">Danh sách các sản phẩm có số lượng bán cao nhất.</p>
        </div>

        <div className="space-y-5">
          {topProducts.length === 0 ? (
            <div className="text-center py-12 text-gray-500 font-medium border border-dashed border-gray-200 rounded-2xl">
              Chưa có dữ liệu bán hàng.
            </div>
          ) : (
            topProducts.map((prod, index) => {
              const maxQty = Math.max(...topProducts.map(p => p.quantitySold), 1);
              const percentage = Math.round((prod.quantitySold / maxQty) * 100);
              return (
                <div key={prod.productId} className="flex gap-4 items-center">
                  {/* Rank */}
                  <span className="text-base font-black text-[#C18676] w-6 text-center">#{index + 1}</span>
                  
                  {/* Thumbnail */}
                  <div className="relative w-10 h-12 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0 shadow-sm border border-gray-100">
                    <Image
                      src={prod.imageUrl}
                      alt={prod.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Info & Progress */}
                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex justify-between text-xs font-bold text-brand-dark gap-2">
                      <span className="truncate">{prod.name}</span>
                      <span className="text-brand-text-secondary flex-shrink-0">
                        Đã bán: <strong className="text-brand-dark">{prod.quantitySold}</strong>
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${percentage}%` }}
                          transition={{ duration: 0.8, ease: "easeOut", delay: index * 0.1 }}
                          className="h-full bg-[#C18676] rounded-full"
                        />
                      </div>
                      <span className="text-[10px] font-bold text-brand-dark w-24 text-right">
                        {prod.revenue.toLocaleString("vi-VN")}₫
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}


export default function AdminDashboard() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<"orders" | "products" | "categories" | "analytics">("orders");
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  
  const [loadingData, setLoadingData] = useState(true);
  
  // Modals state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const [isCatModalOpen, setIsCatModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

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

  const openEditCatModal = (cat: Category) => {
    setSelectedCategory(cat);
    setIsCatModalOpen(true);
  };

  const openCreateCatModal = () => {
    setSelectedCategory(null);
    setIsCatModalOpen(true);
  };

  const handleDeleteCategory = async (catId: string) => {
    if (!confirm("Bạn có chắc chắn muốn xóa danh mục này?")) return;
    try {
      await apiFetch(`/categories/${catId}`, {
        method: "DELETE"
      });
      setCategories(categories.filter(c => c.id !== catId));
    } catch (err) {
      console.error("Failed to delete category:", err);
      alert(err instanceof Error ? err.message : "Xóa danh mục thất bại.");
    }
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
        {activeTab === "categories" && (
          <button 
            onClick={openCreateCatModal}
            className="inline-flex items-center bg-brand-dark text-white font-bold px-6 py-3 rounded-2xl shadow-md hover:bg-brand-accent transition-all hover:scale-105 active:scale-95 text-sm cursor-pointer"
          >
            <Plus className="w-4 h-4 mr-2" /> Thêm danh mục
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
        <button
          onClick={() => setActiveTab("categories")}
          className={`relative pb-3 px-4 text-sm font-bold transition-colors cursor-pointer ${
            activeTab === "categories"
              ? "text-brand-dark"
              : "text-gray-400 hover:text-brand-dark"
          }`}
        >
          Quản lý danh mục ({categories.length})
          {activeTab === "categories" && (
            <motion.span
              layoutId="tab-indicator"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-dark rounded-full"
              transition={{ type: "spring", stiffness: 500, damping: 40 }}
            />
          )}
        </button>
        <button
          onClick={() => setActiveTab("analytics")}
          className={`relative pb-3 px-4 text-sm font-bold transition-colors cursor-pointer ${
            activeTab === "analytics"
              ? "text-brand-dark"
              : "text-gray-400 hover:text-brand-dark"
          }`}
        >
          Thống kê doanh thu
          {activeTab === "analytics" && (
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
          ) : activeTab === "products" ? (
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
          ) : activeTab === "categories" ? (
            /* Categories Tab */
            <motion.div
              key="categories"
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
                      <th className="py-4 px-6">Ảnh đại diện</th>
                      <th className="py-4 px-6">Tên danh mục</th>
                      <th className="py-4 px-6">Slug / URL</th>
                      <th className="py-4 px-6">Mô tả</th>
                      <th className="py-4 px-6 text-right">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-sm">
                    {categories.map((cat) => (
                      <tr key={cat.id} className="hover:bg-brand-bg/10 transition-colors">
                        {/* Category Image */}
                        <td className="py-4 px-6">
                          <div className="relative w-16 h-12 bg-gray-50 rounded-xl overflow-hidden shadow-sm">
                            <Image
                              src={cat.imageUrl || "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&q=80"}
                              alt={cat.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                        </td>

                        {/* Category Name */}
                        <td className="py-4 px-6 font-bold text-brand-dark">
                          {cat.name}
                        </td>

                        {/* Slug */}
                        <td className="py-4 px-6 text-gray-500 font-mono text-xs">
                          {cat.slug || cat.id}
                        </td>

                        {/* Description */}
                        <td className="py-4 px-6 text-brand-text-secondary max-w-[350px] truncate" title={cat.description || ""}>
                          {cat.description || "Chưa có mô tả."}
                        </td>

                        {/* Actions */}
                        <td className="py-4 px-6 text-right">
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => openEditCatModal(cat)}
                              className="p-2 border border-gray-200 hover:border-brand-dark hover:text-brand-dark text-gray-500 rounded-xl transition-all hover:scale-105 active:scale-95 cursor-pointer"
                              aria-label="Chỉnh sửa danh mục"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteCategory(cat.id)}
                              className="p-2 border border-red-100 hover:border-red-500 hover:text-red-500 text-red-400 rounded-xl transition-all hover:scale-105 active:scale-95 cursor-pointer"
                              aria-label="Xóa danh mục"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                
                {categories.length === 0 && (
                  <div className="text-center py-16 text-gray-500 font-medium">
                    Chưa có danh mục nào.
                  </div>
                )}
              </div>
            </motion.div>
          ) : (
            /* Analytics Tab */
            <motion.div
              key="analytics"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="w-full"
            >
              <AdminAnalytics />
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

      {/* Category Create/Edit Modal */}
      <CategoryModal
        isOpen={isCatModalOpen}
        onClose={() => setIsCatModalOpen(false)}
        onSave={refreshData}
        category={selectedCategory}
      />
    </main>
  );
}

