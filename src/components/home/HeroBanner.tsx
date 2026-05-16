import { FadeIn } from "@/components/animations/FadeIn";

export default function HeroBanner() {
  return (
    <section className="flex flex-col items-center justify-center py-24 px-4 text-center bg-brand-bg relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-accent-light/30 rounded-full blur-3xl -z-10" />

      <FadeIn delay={0.1}>
        <h2 className="text-brand-accent text-sm md:text-base font-bold tracking-widest uppercase mb-4">
          Bộ Sưu Tập Mùa Hè
        </h2>
      </FadeIn>
      
      <FadeIn delay={0.2}>
        <h1 className="text-5xl md:text-7xl font-bold text-brand-dark tracking-tight mb-6 leading-tight">
          THỂ HIỆN PHONG CÁCH <br />
          <span className="text-brand-accent">CỦA BẠN.</span>
        </h1>
      </FadeIn>
      
      <FadeIn delay={0.3}>
        <p className="max-w-xl mx-auto text-brand-text-secondary text-base md:text-lg mb-10">
          Khám phá những xu hướng thời trang Gen Z mới nhất. Thoải mái, tự tin và đầy cá tính.
        </p>
      </FadeIn>
      
      <FadeIn delay={0.4} direction="up">
        <div className="flex gap-4">
          <button className="bg-brand-accent hover:bg-brand-accent/90 text-white px-8 py-3 rounded-full font-bold transition-transform hover:scale-105 active:scale-95 shadow-lg shadow-brand-accent/20">
            Mua Ngay
          </button>
          <button className="bg-white hover:bg-brand-accent-light text-brand-dark px-8 py-3 rounded-full font-bold border border-brand-accent/20 transition-transform hover:scale-105 active:scale-95 shadow-sm">
            Xem Bộ Sưu Tập
          </button>
        </div>
      </FadeIn>
    </section>
  );
}
