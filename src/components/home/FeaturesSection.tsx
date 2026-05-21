"use client";

import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations/FadeIn";
import SectionHeader from "@/components/shared/SectionHeader";
import { PLATFORM_FEATURES } from "@/data/mock-data";
import { resolveIcon } from "@/lib/icons";

export default function FeaturesSection() {
  return (
    <section className="py-16 md:py-24 px-4 bg-brand-bg relative overflow-hidden">
      {/* Decorative blurs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-accent-light/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/60 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-7xl mx-auto relative z-10">
        <FadeIn direction="up">
          <SectionHeader
            subtitle="Vì Sao Chọn Ely Edu"
            title="Sự vượt trội của nền tảng"
            description="Trải nghiệm luyện thi thế hệ mới — chuẩn format, thông minh và hoàn toàn miễn phí."
          />
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {PLATFORM_FEATURES.map((feature, idx) => {
            const Icon = resolveIcon(feature.iconName);
            return (
              <StaggerItem key={idx}>
                <div className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 h-full">
                  <div className="w-14 h-14 bg-brand-bg rounded-2xl flex items-center justify-center text-brand-accent mb-6">
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-brand-dark mb-3">{feature.title}</h3>
                  <p className="text-brand-text-secondary leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
