"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { FadeIn, ParallaxSection } from "@/components/animations/FadeIn";
import { motion } from "framer-motion";

export default function CTASection() {
  return (
    <section className="py-16 md:py-24 px-4 bg-brand-bg relative overflow-hidden">
      <ParallaxSection speed={0.2} className="absolute -top-20 -right-20 w-80 h-80 bg-brand-accent/5 rounded-full blur-3xl" />
      <ParallaxSection speed={-0.15} className="absolute -bottom-20 -left-20 w-60 h-60 bg-brand-accent-light/30 rounded-full blur-3xl" />

      <FadeIn direction="up">
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="relative bg-gradient-to-br from-[#2A1F1A] via-[#3B2B22] to-[#1E1512] rounded-3xl p-10 md:p-16 overflow-hidden">
            {/* Decorative glow */}
            <motion.div
              className="absolute top-0 right-0 w-96 h-96 bg-brand-accent/10 rounded-full blur-3xl"
              animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute bottom-0 left-0 w-64 h-64 bg-brand-accent/5 rounded-full blur-3xl"
              animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            />

            {/* Floating decorative dots */}
            <motion.div
              className="absolute top-8 right-12 w-2 h-2 bg-brand-accent/40 rounded-full"
              animate={{ y: [0, -15, 0], opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute bottom-12 left-16 w-3 h-3 bg-brand-accent/20 rounded-full"
              animate={{ y: [0, 10, 0], x: [0, 5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            />

            <div className="relative z-10 text-center">
              <motion.div
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-brand-accent-light text-sm font-bold px-4 py-2 rounded-full mb-6"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <Sparkles className="w-4 h-4" /> Bắt đầu ngay hôm nay
              </motion.div>

              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                Sẵn sàng chinh phục <br className="hidden md:block" />
                kỳ thi của bạn?
              </h2>
              <p className="text-white/60 max-w-xl mx-auto mb-8 text-lg">
                Hơn 784+ bài test online, phân tích kết quả chi tiết,
                hoàn toàn miễn phí. Bắt đầu luyện ngay!
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/tot-nghiep-thpt"
                  className="group bg-brand-accent hover:bg-brand-accent/90 text-white px-8 py-3.5 rounded-full font-bold transition-all hover:scale-105 active:scale-95 shadow-lg shadow-brand-accent/30 inline-flex items-center gap-2 cursor-pointer"
                >
                  Luyện thi ngay
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/quan-ly-luyen-tap"
                  className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-8 py-3.5 rounded-full font-bold border border-white/20 transition-all hover:scale-105 active:scale-95 cursor-pointer"
                >
                  Xem tiến độ học tập
                </Link>
              </div>
            </div>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
