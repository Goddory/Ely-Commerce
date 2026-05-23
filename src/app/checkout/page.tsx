"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { apiFetch } from "@/utils/api";
import { Loader2, ArrowLeft, ShieldCheck, Truck, CreditCard } from "lucide-react";
import { FadeIn } from "@/components/animations/FadeIn";
import Image from "next/image";

export default function CheckoutPage() {
  const router = useRouter();
  const { cartItems, cartTotal, clearCart } = useCart();
  const { user } = useAuth();

  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Prefill user details if logged in
  useEffect(() => {
    if (user) {
      Promise.resolve().then(() => {
        setCustomerName(user.username);
      });
    }
  }, [user]);

  const shippingCost = cartTotal >= 500000 ? 0 : 30000;
  const finalTotal = cartTotal + shippingCost;

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!customerName || !customerPhone || !shippingAddress) {
      setError("Vui lòng nhập đầy đủ thông tin giao hàng.");
      return;
    }

    if (cartItems.length === 0) {
      setError("Giỏ hàng của bạn đang trống.");
      return;
    }

    setLoading(true);
    try {
      const orderItemsPayload = cartItems.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
        color: item.color,
        size: item.size,
      }));

      const response = await apiFetch<{ message: string; orderId: string; totalAmount: number }>("/orders", {
        method: "POST",
        body: JSON.stringify({
          customerName,
          customerPhone,
          shippingAddress,
          items: orderItemsPayload,
        }),
      });

      // Clear cart context and redirect
      clearCart();
      router.push(`/checkout/success?orderId=${response.orderId}&total=${response.totalAmount}`);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Đặt hàng thất bại. Vui lòng thử lại sau.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <main className="flex-1 max-w-2xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-extrabold text-brand-dark mb-4">Giỏ hàng của bạn đang trống</h2>
        <p className="text-brand-text-secondary mb-8">Vui lòng chọn sản phẩm vào giỏ hàng trước khi thực hiện thanh toán.</p>
        <Link href="/products" className="bg-brand-dark hover:bg-brand-accent text-white px-8 py-3.5 rounded-full font-bold transition-all shadow-md active:scale-95">
          Quay lại cửa hàng
        </Link>
      </main>
    );
  }

  return (
    <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 w-full">
      <div className="mb-8">
        <Link href="/products" className="inline-flex items-center text-sm font-semibold text-brand-text-secondary hover:text-brand-accent transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Quay lại xem sản phẩm
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
        {/* Left Column: Checkout Details Form */}
        <div className="lg:col-span-7">
          <FadeIn direction="up">
            <h1 className="text-3xl font-extrabold text-brand-dark mb-8">Thông tin thanh toán</h1>
            
            {error && (
              <div className="bg-red-50 text-red-600 px-4 py-3 rounded-2xl text-sm font-medium border border-red-100 mb-6">
                {error}
              </div>
            )}

            <form onSubmit={handlePlaceOrder} className="space-y-6">
              <div className="bg-white p-6 md:p-8 rounded-[32px] shadow-sm border border-brand-accent/5 space-y-6">
                <h3 className="text-lg font-bold text-brand-dark border-b border-gray-100 pb-3 flex items-center">
                  <Truck className="w-5 h-5 mr-2 text-brand-accent" /> Địa chỉ giao hàng
                </h3>

                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-brand-dark mb-1">
                    Họ tên người nhận
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Nguyễn Văn A"
                    className="appearance-none block w-full px-4 py-3 border border-gray-200 rounded-2xl text-brand-dark placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-accent focus:border-transparent transition-all text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-brand-dark mb-1">
                    Số điện thoại nhận hàng
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="0987654321"
                    className="appearance-none block w-full px-4 py-3 border border-gray-200 rounded-2xl text-brand-dark placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-accent focus:border-transparent transition-all text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="address" className="block text-sm font-semibold text-brand-dark mb-1">
                    Địa chỉ giao hàng chi tiết
                  </label>
                  <textarea
                    id="address"
                    required
                    rows={3}
                    value={shippingAddress}
                    onChange={(e) => setShippingAddress(e.target.value)}
                    placeholder="Số nhà, tên đường, phường/xã, quận/huyện, tỉnh/thành phố"
                    className="appearance-none block w-full px-4 py-3 border border-gray-200 rounded-2xl text-brand-dark placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-accent focus:border-transparent transition-all text-sm resize-none"
                  />
                </div>
              </div>

              <div className="bg-white p-6 md:p-8 rounded-[32px] shadow-sm border border-brand-accent/5 space-y-6">
                <h3 className="text-lg font-bold text-brand-dark border-b border-gray-100 pb-3 flex items-center">
                  <CreditCard className="w-5 h-5 mr-2 text-brand-accent" /> Phương thức thanh toán
                </h3>
                
                <div className="border-2 border-brand-dark bg-brand-bg/20 p-4 rounded-2xl flex items-center cursor-pointer">
                  <input
                    type="radio"
                    id="cod"
                    name="paymentMethod"
                    defaultChecked
                    className="h-4 w-4 text-brand-dark focus:ring-brand-dark border-gray-300 cursor-pointer"
                  />
                  <label htmlFor="cod" className="ml-3 block font-semibold text-brand-dark cursor-pointer text-sm">
                    Thanh toán khi nhận hàng (COD)
                  </label>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-4 px-4 border border-transparent font-bold rounded-2xl text-white bg-brand-dark hover:bg-brand-accent focus:outline-none transition-colors shadow-lg active:scale-[0.98] disabled:opacity-50 text-sm cursor-pointer"
              >
                {loading ? (
                  <Loader2 className="animate-spin h-5 w-5 text-white" />
                ) : (
                  `Đặt hàng • ${finalTotal.toLocaleString("vi-VN")}₫`
                )}
              </button>
            </form>
          </FadeIn>
        </div>

        {/* Right Column: Order Summary */}
        <div className="lg:col-span-5">
          <FadeIn direction="up" delay={0.1} className="sticky top-28 bg-white p-6 md:p-8 rounded-[32px] shadow-sm border border-brand-accent/5">
            <h2 className="text-xl font-bold text-brand-dark border-b border-gray-100 pb-4 mb-6">Đơn hàng của bạn</h2>
            
            <div className="max-h-[300px] overflow-y-auto pr-2 mb-6 space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-4 items-center">
                  <div className="relative w-16 h-20 bg-gray-50 rounded-xl overflow-hidden flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-brand-dark truncate">{item.name}</h4>
                    <p className="text-xs text-brand-text-secondary mt-1">
                      {item.color && `Màu: ${item.color}`} {item.size && `| Size: ${item.size}`}
                    </p>
                    <p className="text-xs text-brand-text-secondary mt-1">Số lượng: {item.quantity}</p>
                  </div>
                  <div className="text-sm font-bold text-brand-dark text-right">
                    {(item.price * item.quantity).toLocaleString("vi-VN")}₫
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-100 pt-4 space-y-3">
              <div className="flex justify-between text-sm text-brand-text-secondary">
                <span>Tạm tính</span>
                <span className="font-medium text-brand-dark">{cartTotal.toLocaleString("vi-VN")}₫</span>
              </div>
              <div className="flex justify-between text-sm text-brand-text-secondary">
                <span>Phí vận chuyển</span>
                <span className="font-medium text-brand-dark">
                  {shippingCost === 0 ? "Miễn phí" : `${shippingCost.toLocaleString("vi-VN")}₫`}
                </span>
              </div>
              
              <div className="border-t border-gray-100 pt-4 flex justify-between font-extrabold text-brand-dark text-lg">
                <span>Tổng cộng</span>
                <span>{finalTotal.toLocaleString("vi-VN")}₫</span>
              </div>
            </div>

            <div className="mt-8 border-t border-gray-100 pt-6 flex items-center text-xs text-brand-text-secondary leading-relaxed">
              <ShieldCheck className="w-5 h-5 mr-3 text-emerald-500 flex-shrink-0" />
              <span>Ely cam kết bảo mật tuyệt đối thông tin thanh toán và giao hàng của khách hàng.</span>
            </div>
          </FadeIn>
        </div>
      </div>
    </main>
  );
}
