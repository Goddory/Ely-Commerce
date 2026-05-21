import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { FadeIn } from "@/components/animations/FadeIn";

export default function CTASection() {
  return (
    <section className="py-16 md:py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <FadeIn direction="up">
          <div className="relative rounded-[32px] overflow-hidden bg-gradient-to-br from-brand-dark via-brand-dark to-brand-accent/80 px-8 md:px-16 py-16 md:py-20 text-center">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-accent/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-2xl" />
            <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-brand-accent/40 rounded-full animate-pulse" />
            <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-white/10 rounded-full animate-bounce-slow" />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                <Sparkles className="w-4 h-4 text-brand-accent" />
                <span className="text-white/80 text-sm font-medium">100% Miễn phí</span>
              </div>

              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
                Bắt đầu luyện thi ngay<br className="hidden md:block" /> hôm nay
              </h2>
              <p className="text-white/70 text-lg max-w-xl mx-auto mb-10">
                Tham gia cùng 5,333+ học viên mỗi ngày. Luyện đề chuẩn format, nhận phân tích chi tiết, nâng điểm nhanh chóng.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/tot-nghiep-thpt"
                  className="inline-flex items-center gap-2 bg-brand-accent hover:bg-brand-accent/90 text-white px-8 py-4 rounded-full font-bold transition-all hover:scale-105 active:scale-95 shadow-lg shadow-brand-accent/30 cursor-pointer"
                >
                  Luyện thi TN THPT
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/dgnl"
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-full font-bold border border-white/20 transition-all hover:scale-105 active:scale-95 cursor-pointer"
                >
                  Luyện thi ĐGNL
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
