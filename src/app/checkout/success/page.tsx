"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { CheckCircle2, ShoppingBag, ArrowRight, UserPlus, FileText } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { FadeIn } from "@/components/animations/FadeIn";

function SuccessContent() {
  const searchParams = useSearchParams();
  const { user } = useAuth();
  
  const orderId = searchParams.get("orderId") || "N/A";
  const total = searchParams.get("total") || "0";
  const numericTotal = parseInt(total, 10) || 0;

  return (
    <main className="flex-1 max-w-xl mx-auto px-4 py-16 md:py-24 text-center">
      <FadeIn className="space-y-8 bg-white p-8 md:p-12 rounded-[40px] shadow-xl border border-brand-accent/5">
        <div className="flex justify-center">
          <CheckCircle2 className="w-20 h-20 text-emerald-500 animate-bounce-slow" />
        </div>

        <div>
          <h1 className="text-3xl font-extrabold text-brand-dark mb-2">Đặt hàng thành công!</h1>
          <p className="text-brand-text-secondary text-sm">
            Cảm ơn bạn đã lựa chọn mua sắm tại Ely. Đơn hàng của bạn đang được xử lý.
          </p>
        </div>

        <div className="bg-brand-bg/40 p-5 rounded-2xl space-y-3 text-sm text-left">
          <div className="flex justify-between border-b border-gray-100 pb-2.5">
            <span className="text-brand-text-secondary font-medium">Mã đơn hàng</span>
            <span className="font-bold text-brand-dark select-all">{orderId}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-brand-text-secondary font-medium">Tổng thanh toán</span>
            <span className="font-bold text-brand-dark">{numericTotal.toLocaleString("vi-VN")}₫</span>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          {user ? (
            <Link 
              href="/profile" 
              className="flex items-center justify-center bg-brand-dark hover:bg-brand-accent text-white py-3.5 px-6 rounded-2xl font-bold transition-all shadow-md active:scale-95 text-sm cursor-pointer"
            >
              <FileText className="w-4 h-4 mr-2" /> Xem lịch sử mua hàng
            </Link>
          ) : (
            <div className="bg-amber-50/50 border border-amber-100 p-5 rounded-2xl text-left mb-3">
              <h4 className="font-bold text-amber-800 text-sm mb-1.5 flex items-center">
                <UserPlus className="w-4 h-4 mr-1.5" /> Tạo tài khoản để theo dõi đơn hàng
              </h4>
              <p className="text-xs text-amber-700 leading-relaxed mb-4">
                Đăng ký tài khoản với email đặt hàng để lưu lịch sử giao dịch và theo dõi trạng thái giao hàng dễ dàng.
              </p>
              <Link 
                href="/register" 
                className="inline-flex items-center text-xs font-bold text-brand-accent hover:underline"
              >
                Đăng ký ngay <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Link>
            </div>
          )}

          <Link 
            href="/products" 
            className="flex items-center justify-center border border-gray-200 hover:border-brand-dark text-brand-dark py-3.5 px-6 rounded-2xl font-bold transition-all active:scale-95 text-sm cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4 mr-2" /> Tiếp tục mua sắm
          </Link>
        </div>
      </FadeIn>
    </main>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-brand-dark"></div>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}
