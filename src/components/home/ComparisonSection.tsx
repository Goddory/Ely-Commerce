"use client";

import { FadeIn, RevealOnScroll } from "@/components/animations/FadeIn";
import SectionHeader from "@/components/shared/SectionHeader";
import { COMPARISONS } from "@/data/mock-data";
import { X, Check } from "lucide-react";
import { motion } from "framer-motion";

export default function ComparisonSection() {
  return (
    <section className="py-16 md:py-24 px-4 bg-white">
      <div className="max-w-5xl mx-auto">
        <FadeIn direction="up">
          <SectionHeader
            subtitle="So Sánh"
            title="Ely Edu khác biệt như thế nào?"
            description="Luyện thi thế hệ mới vs cách truyền thống — sự khác biệt rõ ràng."
          />
        </FadeIn>

        <RevealOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 rounded-3xl overflow-hidden shadow-lg">
            {/* Old way */}
            <div className="bg-gray-50 p-8 md:p-10">
              <h3 className="text-lg font-bold text-gray-400 mb-6 uppercase tracking-wider">
                Luyện cách cũ
              </h3>
              <ul className="space-y-5">
                {COMPARISONS.map((item, idx) => (
                  <motion.li
                    key={idx}
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + idx * 0.1, duration: 0.4 }}
                  >
                    <div className="w-7 h-7 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <X className="w-4 h-4 text-gray-400" />
                    </div>
                    <span className="text-gray-400 font-medium">{item.old}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Ely way */}
            <div className="bg-brand-accent-light p-8 md:p-10">
              <h3 className="text-lg font-bold text-brand-dark mb-6 uppercase tracking-wider">
                Ely Edu
              </h3>
              <ul className="space-y-5">
                {COMPARISONS.map((item, idx) => (
                  <motion.li
                    key={idx}
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + idx * 0.1, duration: 0.4 }}
                  >
                    <div className="w-7 h-7 bg-brand-accent rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-brand-dark font-semibold">{item.new}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
