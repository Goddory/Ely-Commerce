"use client";
// UX Audit Tag: placeholder aria-label

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { apiFetch } from "@/utils/api";
import { Loader2, LogOut, Package, User } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations/FadeIn";
import Link from "next/link";
import Image from "next/image";

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

export default function ProfilePage() {
  const { user, logout, loading: authLoading } = useAuth();
  const router = useRouter();

  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      router.push("/login");
      return;
    }

    Promise.resolve().then(() => setLoadingOrders(true));
    apiFetch<Order[]>("/orders/my-orders")
      .then((data) => {
        setOrders(data);
      })
      .catch((err) => {
        console.error("Error loading profile orders:", err);
      })
      .finally(() => setLoadingOrders(false));
  }, [user, authLoading, router]);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status.trim().toLowerCase()) {
      case "pending":
        return "bg-amber-50 text-amber-600 border-amber-100";
      case "processing":
        return "bg-blue-50 text-blue-600 border-blue-100";
      case "shipped":
        return "bg-emerald-50 text-emerald-600 border-emerald-100";
      case "cancelled":
        return "bg-red-50 text-red-600 border-red-100";
      default:
        return "bg-gray-50 text-gray-600 border-gray-100";
    }
  };

  const translateStatus = (status: string) => {
    switch (status.trim().toLowerCase()) {
      case "pending": return "Chờ xử lý";
      case "processing": return "Đang xử lý";
      case "shipped": return "Đã giao hàng";
      case "cancelled": return "Đã hủy";
      default: return status;
    }
  };

  if (authLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 className="animate-spin w-12 h-12 text-brand-accent" />
      </div>
    );
  }

  if (!user) {
    return null; // Redirecting...
  }

  return (
    <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
        {/* Left Side: Profile Info Card */}
        <div className="lg:col-span-4">
          <FadeIn direction="up" className="bg-white p-6 md:p-8 rounded-[32px] shadow-sm border border-brand-accent/5 sticky top-28 space-y-6">
            <div className="flex flex-col items-center text-center pb-6 border-b border-gray-100">
              <div className="w-20 h-20 rounded-full bg-brand-bg/40 flex items-center justify-center mb-4 text-brand-dark">
                <User className="w-10 h-10" />
              </div>
              <h2 className="text-xl font-extrabold text-brand-dark">{user.username}</h2>
              <p className="text-sm text-brand-text-secondary mt-1">{user.email}</p>
              <span className="mt-3 px-3 py-1 bg-brand-accent/15 text-brand-accent text-xs font-bold rounded-full uppercase">
                {user.role}
              </span>
            </div>

            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center py-3 border border-red-200 text-red-500 rounded-2xl font-bold transition-all hover:bg-red-50 active:scale-[0.98] text-sm cursor-pointer"
            >
              <LogOut className="w-4 h-4 mr-2" /> Đăng xuất tài khoản
            </button>
          </FadeIn>
        </div>

        {/* Right Side: Order History */}
        <div className="lg:col-span-8">
          <FadeIn direction="up" delay={0.1}>
            <h1 className="text-2xl font-extrabold text-brand-dark mb-8 flex items-center">
              <Package className="w-6 h-6 mr-2 text-brand-accent" /> Lịch sử mua hàng
            </h1>

            {loadingOrders ? (
              <div className="flex justify-center items-center py-20 bg-white rounded-[32px] border border-brand-accent/5">
                <Loader2 className="animate-spin w-10 h-10 text-brand-accent" />
              </div>
            ) : orders.length === 0 ? (
              <div className="bg-white p-12 rounded-[32px] text-center border border-brand-accent/5 flex flex-col items-center">
                <Package className="w-16 h-16 text-gray-300 mb-4" />
                <h3 className="text-lg font-bold text-brand-dark mb-2">Bạn chưa có đơn hàng nào</h3>
                <p className="text-sm text-brand-text-secondary mb-8 max-w-sm mx-auto">
                  Hãy bắt đầu mua sắm những sản phẩm tuyệt vời của Ely ngay hôm nay!
                </p>
                <Link href="/products" className="bg-brand-dark hover:bg-brand-accent text-white px-8 py-3.5 rounded-full font-bold transition-all shadow-md active:scale-95 text-sm cursor-pointer">
                  Khám phá ngay
                </Link>
              </div>
            ) : (
              <StaggerContainer className="space-y-6">
                {orders.map((order) => (
                  <StaggerItem key={order.id} className="bg-white p-6 md:p-8 rounded-[32px] shadow-sm border border-brand-accent/5 space-y-4">
                    {/* Header */}
                    <div className="flex flex-wrap justify-between items-center gap-3 border-b border-gray-100 pb-4">
                      <div>
                        <span className="text-xs text-brand-text-secondary">Mã đơn hàng</span>
                        <h4 className="text-sm font-bold text-brand-dark mt-0.5">{order.id}</h4>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className={`px-3.5 py-1 border text-xs font-bold rounded-full ${getStatusBadgeClass(order.status)}`}>
                          {translateStatus(order.status)}
                        </span>
                        <div className="text-right">
                          <span className="text-xs text-brand-text-secondary block">Ngày mua</span>
                          <span className="text-sm font-medium text-brand-dark">
                            {new Date(order.orderDate).toLocaleDateString("vi-VN", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Items */}
                    <div className="space-y-3.5 pt-2">
                      {order.orderItems.map((item) => (
                        <div key={item.id} className="flex gap-4 items-center">
                          {item.product && (
                            <div className="relative w-12 h-16 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0">
                              <Image
                                src={item.product.imageUrl}
                                alt={item.product.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <h5 className="text-sm font-bold text-brand-dark truncate">
                              {item.product?.name || "Sản phẩm"}
                            </h5>
                            <p className="text-xs text-brand-text-secondary mt-0.5">
                              {item.color && `Màu: ${item.color}`} {item.size && `| Size: ${item.size}`} | SL: {item.quantity}
                            </p>
                          </div>
                          <div className="text-sm font-bold text-brand-dark text-right">
                            {(item.price * item.quantity).toLocaleString("vi-VN")}₫
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Footer */}
                    <div className="border-t border-gray-100 pt-4 flex justify-between items-center text-sm font-extrabold text-brand-dark">
                      <span className="text-brand-text-secondary font-medium">Tổng thanh toán</span>
                      <span className="text-lg text-brand-dark">{order.totalAmount.toLocaleString("vi-VN")}₫</span>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            )}
          </FadeIn>
        </div>
      </div>
    </main>
  );
}
