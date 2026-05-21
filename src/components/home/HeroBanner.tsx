import Link from "next/link";
import { FadeIn } from "@/components/animations/FadeIn";

export default function HeroBanner() {
  return (
    <section className="flex flex-col items-center justify-center py-20 md:py-28 px-4 text-center bg-brand-bg relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-accent-light/30 rounded-full blur-3xl -z-10" />
      <div className="absolute top-20 right-20 w-64 h-64 bg-brand-accent/5 rounded-full blur-2xl -z-10" />

      <FadeIn delay={0.1}>
        <h2 className="text-brand-accent text-sm md:text-base font-bold tracking-widest uppercase mb-4">
          Nền Tảng Luyện Thi Online
        </h2>
      </FadeIn>

      <FadeIn delay={0.2}>
        <h1 className="text-5xl md:text-7xl font-bold text-brand-dark tracking-tight mb-6 leading-tight">
          LUYỆN THI TỐT NGHIỆP <br />
          <span className="text-brand-accent">THPT & ĐGNL</span>
        </h1>
      </FadeIn>

      <FadeIn delay={0.3}>
        <p className="max-w-2xl mx-auto text-brand-text-secondary text-base md:text-lg mb-10">
          Luyện đề thi thử online miễn phí, mô phỏng chuẩn format thi thật.
          Phân tích chi tiết, đánh giá năng lực và lộ trình cá nhân hoá.
        </p>
      </FadeIn>

      <FadeIn delay={0.4} direction="up">
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/tot-nghiep-thpt"
            className="bg-brand-accent hover:bg-brand-accent/90 text-white px-8 py-3.5 rounded-full font-bold transition-transform hover:scale-105 active:scale-95 shadow-lg shadow-brand-accent/20"
          >
            Luyện thi Tốt nghiệp
          </Link>
          <Link
            href="/dgnl"
            className="bg-white hover:bg-brand-accent-light text-brand-dark px-8 py-3.5 rounded-full font-bold border border-brand-accent/20 transition-transform hover:scale-105 active:scale-95 shadow-sm"
          >
            Luyện thi ĐGNL
          </Link>
        </div>
      </FadeIn>

      {/* Floating stat badges */}
      <FadeIn delay={0.6} direction="none">
        <div className="flex flex-wrap justify-center gap-4 mt-12">
          <div className="bg-white/80 backdrop-blur-sm px-5 py-2.5 rounded-full shadow-sm border border-brand-accent/10">
            <span className="text-2xl font-bold text-brand-accent">784+</span>
            <span className="text-sm text-brand-text-secondary ml-2">bài test</span>
          </div>
          <div className="bg-white/80 backdrop-blur-sm px-5 py-2.5 rounded-full shadow-sm border border-brand-accent/10">
            <span className="text-2xl font-bold text-brand-accent">100%</span>
            <span className="text-sm text-brand-text-secondary ml-2">miễn phí</span>
          </div>
          <div className="bg-white/80 backdrop-blur-sm px-5 py-2.5 rounded-full shadow-sm border border-brand-accent/10">
            <span className="text-2xl font-bold text-brand-accent">5,333+</span>
            <span className="text-sm text-brand-text-secondary ml-2">học viên/ngày</span>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
