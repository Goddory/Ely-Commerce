"use client";

import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations/FadeIn";
import SectionHeader from "@/components/shared/SectionHeader";
import { TESTIMONIALS, PLATFORM_STATS } from "@/data/mock-data";
import { Star, Quote } from "lucide-react";

export default function Testimonials() {
  return (
    <section className="py-16 md:py-24 px-4 bg-brand-bg relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-brand-accent-light/30 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto relative z-10">
        <FadeIn direction="up">
          <SectionHeader
            subtitle="Phản Hồi Học Viên"
            title="Học viên nói gì về Ely Edu?"
          />
        </FadeIn>

        {/* Rating summary */}
        <FadeIn direction="up" delay={0.2} className="text-center mb-12">
          <div className="inline-flex items-center gap-4 bg-white px-8 py-4 rounded-full shadow-sm">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${i < Math.floor(PLATFORM_STATS.rating) ? "text-amber-400 fill-amber-400" : "text-gray-200"}`}
                />
              ))}
            </div>
            <span className="text-2xl font-bold text-brand-dark">{PLATFORM_STATS.rating}</span>
            <span className="text-brand-text-secondary">
              ({PLATFORM_STATS.totalReviews} đánh giá)
            </span>
          </div>
        </FadeIn>

        {/* Testimonial cards */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {TESTIMONIALS.map((testimonial, idx) => (
            <StaggerItem key={idx}>
              <div className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                {/* Quote icon */}
                <div className="w-10 h-10 bg-brand-bg rounded-xl flex items-center justify-center text-brand-accent mb-4">
                  <Quote className="w-5 h-5" />
                </div>

                {/* Quote text */}
                <blockquote className="text-brand-dark leading-relaxed mb-6 flex-1">
                  &quot;{testimonial.quote}&quot;
                </blockquote>

                {/* Student info */}
                <div className="flex items-center justify-between pt-4 border-t border-brand-bg">
                  <div>
                    <p className="font-bold text-brand-dark">{testimonial.name}</p>
                    <p className="text-sm text-brand-text-secondary">{testimonial.school}</p>
                  </div>
                  <div className="bg-brand-accent text-white text-sm font-bold px-4 py-1.5 rounded-full">
                    {testimonial.achievement} {testimonial.achievementType}
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
