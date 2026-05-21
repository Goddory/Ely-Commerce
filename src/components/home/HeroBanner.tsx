"use client";

import Link from "next/link";
import { FadeIn, TextReveal, ParallaxSection } from "@/components/animations/FadeIn";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const duration = 1500;
    const steps = 40;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <span ref={ref} className="text-2xl font-bold text-brand-accent tabular-nums">
      {count.toLocaleString()}{suffix}
    </span>
  );
}

export default function HeroBanner() {
  return (
    <section className="flex flex-col items-center justify-center py-20 md:py-28 px-4 text-center bg-brand-bg relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-accent-light/30 rounded-full blur-3xl -z-10" />

      <ParallaxSection speed={0.15} className="absolute top-20 right-20 w-64 h-64 bg-brand-accent/5 rounded-full blur-2xl -z-10" />
      <ParallaxSection speed={-0.1} className="absolute bottom-20 left-10 w-48 h-48 bg-brand-accent-light/40 rounded-full blur-2xl -z-10" />

      {/* Floating dots */}
      <motion.div
        className="absolute top-1/4 left-[15%] w-3 h-3 bg-brand-accent/20 rounded-full"
        animate={{ y: [0, -20, 0], opacity: [0.3, 0.8, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/3 right-[20%] w-2 h-2 bg-brand-accent/30 rounded-full"
        animate={{ y: [0, 15, 0], opacity: [0.2, 0.7, 0.2] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
      <motion.div
        className="absolute top-[40%] left-[80%] w-4 h-4 bg-brand-accent-light/50 rounded-full"
        animate={{ y: [0, -10, 0], x: [0, 5, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      />

      <FadeIn delay={0.1}>
        <h2 className="text-brand-accent text-sm md:text-base font-bold tracking-widest uppercase mb-4">
          Nền Tảng Luyện Thi Online
        </h2>
      </FadeIn>

      <h1 className="text-5xl md:text-7xl font-bold text-brand-dark tracking-tight mb-6 leading-tight">
        <TextReveal text="LUYỆN THI TỐT NGHIỆP" delay={0.2} />
        <br />
        <span className="text-brand-accent">
          <TextReveal text="THPT & ĐGNL" delay={0.6} />
        </span>
      </h1>

      <FadeIn delay={0.9}>
        <p className="max-w-2xl mx-auto text-brand-text-secondary text-base md:text-lg mb-10">
          Luyện đề thi thử online miễn phí, mô phỏng chuẩn format thi thật.
          Phân tích chi tiết, đánh giá năng lực và lộ trình cá nhân hoá.
        </p>
      </FadeIn>

      <FadeIn delay={1.1} direction="up">
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/tot-nghiep-thpt"
            className="bg-brand-accent hover:bg-brand-accent/90 text-white px-8 py-3.5 rounded-full font-bold transition-all hover:scale-105 active:scale-95 shadow-lg shadow-brand-accent/20 cursor-pointer"
          >
            Luyện thi Tốt nghiệp
          </Link>
          <Link
            href="/dgnl"
            className="bg-white hover:bg-brand-accent-light text-brand-dark px-8 py-3.5 rounded-full font-bold border border-brand-accent/20 transition-all hover:scale-105 active:scale-95 shadow-sm cursor-pointer"
          >
            Luyện thi ĐGNL
          </Link>
        </div>
      </FadeIn>

      {/* Animated stat badges */}
      <FadeIn delay={1.3} direction="none">
        <div className="flex flex-wrap justify-center gap-4 mt-12">
          <div className="bg-white/80 backdrop-blur-sm px-5 py-2.5 rounded-full shadow-sm border border-brand-accent/10">
            <AnimatedCounter target={784} suffix="+" />
            <span className="text-sm text-brand-text-secondary ml-2">bài test</span>
          </div>
          <div className="bg-white/80 backdrop-blur-sm px-5 py-2.5 rounded-full shadow-sm border border-brand-accent/10">
            <span className="text-2xl font-bold text-brand-accent">100%</span>
            <span className="text-sm text-brand-text-secondary ml-2">miễn phí</span>
          </div>
          <div className="bg-white/80 backdrop-blur-sm px-5 py-2.5 rounded-full shadow-sm border border-brand-accent/10">
            <AnimatedCounter target={5333} suffix="+" />
            <span className="text-sm text-brand-text-secondary ml-2">học viên/ngày</span>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
