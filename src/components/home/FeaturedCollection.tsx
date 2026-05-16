import Image from "next/image";
import { FadeIn } from "@/components/animations/FadeIn";

export default function FeaturedCollection() {
  return (
    <section className="py-24 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24 bg-brand-bg rounded-[40px] p-8 lg:p-16 overflow-hidden relative">
          
          {/* Decorative shapes */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-accent-light/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/50 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3" />

          {/* Text Content */}
          <FadeIn direction="right" className="flex-1 z-10 text-center lg:text-left">
            <h2 className="text-brand-accent text-sm md:text-base font-bold tracking-widest uppercase mb-4">
              Bộ Sưu Tập Giới Hạn
            </h2>
            <h3 className="text-4xl md:text-5xl font-bold text-brand-dark tracking-tight mb-6 leading-tight">
              SỰ KẾT HỢP HOÀN HẢO GIỮA <br className="hidden md:block" />
              <span className="text-brand-accent">CỔ ĐIỂN & HIỆN ĐẠI</span>
            </h3>
            <p className="text-brand-text-secondary text-base md:text-lg mb-8 max-w-lg mx-auto lg:mx-0">
              Chất liệu vải lanh thoáng mát kết hợp cùng những đường may tinh tế. 
              Mang lại cảm giác thoải mái tuyệt đối cho những ngày năng động.
            </p>
            <button className="bg-brand-dark hover:bg-brand-accent text-white px-8 py-3 rounded-full font-bold transition-all hover:scale-105 active:scale-95 shadow-lg">
              Khám Phá Ngay
            </button>
          </FadeIn>

          {/* Image */}
          <FadeIn direction="left" delay={0.2} className="flex-1 w-full relative z-10">
            <div className="aspect-square md:aspect-[4/3] lg:aspect-square relative rounded-3xl overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500">
              <Image
                src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80"
                alt="Featured Collection"
                fill
                className="object-cover"
              />
            </div>
            
            {/* Floating badge */}
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl animate-bounce-slow">
              <div className="text-brand-accent font-bold text-xl">-20%</div>
              <div className="text-brand-text-secondary text-sm font-medium">Cho Member</div>
            </div>
          </FadeIn>
          
        </div>
      </div>
    </section>
  );
}
