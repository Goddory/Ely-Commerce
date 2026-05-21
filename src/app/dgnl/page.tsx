"use client";

import Link from "next/link";
import { ChevronRight, GraduationCap, Users, FileText } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations/FadeIn";
import SectionHeader from "@/components/shared/SectionHeader";
import { DGNL_CATEGORIES } from "@/data/mock-data";

export default function DgnlPage() {
  return (
    <main className="flex-1 w-full bg-brand-bg">
      {/* Hero */}
      <section className="relative py-16 md:py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-accent-light/60 via-brand-bg to-brand-bg" />
        <div className="absolute top-20 right-20 w-80 h-80 bg-brand-accent/5 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Breadcrumbs */}
          <nav className="flex text-sm text-brand-text-secondary mb-8" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li>
                <Link href="/" className="hover:text-brand-accent transition-colors">Trang chủ</Link>
              </li>
              <li>
                <div className="flex items-center">
                  <ChevronRight className="w-4 h-4 mx-1" />
                  <span className="text-brand-dark font-medium">Luyện thi ĐGNL & ĐGTD</span>
                </div>
              </li>
            </ol>
          </nav>

          <FadeIn direction="up">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-brand-accent shadow-sm">
                <GraduationCap className="w-7 h-7" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-brand-dark">Luyện thi ĐGNL & ĐGTD</h1>
                <p className="text-brand-text-secondary mt-1">Đề thi thử ĐGNL các trường Đại học hàng đầu Việt Nam</p>
              </div>
            </div>
          </FadeIn>

          {/* Stats */}
          <FadeIn direction="up" delay={0.2}>
            <div className="flex flex-wrap gap-6 mt-6">
              <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
                <FileText className="w-4 h-4 text-brand-accent" />
                <span className="text-sm font-bold text-brand-dark">408 đề thi</span>
              </div>
              <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
                <Users className="w-4 h-4 text-brand-accent" />
                <span className="text-sm font-bold text-brand-dark">260.8k lượt làm</span>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <FadeIn direction="up">
            <SectionHeader
              subtitle="Chọn trường"
              title="Đề thi theo trường Đại học"
              description="Luyện đề thi thử ĐGNL/ĐGTD mô phỏng chuẩn format, cập nhật liên tục."
            />
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {DGNL_CATEGORIES.map((category) => (
              <StaggerItem key={category.id}>
                <Link
                  href={`/dgnl/${category.slug}`}
                  className="group block bg-white rounded-3xl p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 relative overflow-hidden cursor-pointer"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-brand-accent/5 rounded-full blur-2xl translate-x-8 -translate-y-8 group-hover:bg-brand-accent/10 transition-colors" />

                  <div className="relative z-10">
                    <div className="w-14 h-14 bg-brand-bg rounded-2xl flex items-center justify-center text-brand-accent mb-6 shadow-sm group-hover:bg-brand-accent group-hover:text-white transition-colors">
                      <GraduationCap className="w-7 h-7" />
                    </div>

                    <h3 className="text-xl font-bold text-brand-dark mb-2 group-hover:text-brand-accent transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-brand-text-secondary text-sm mb-6">{category.description}</p>

                    <div className="flex items-center gap-4 text-sm">
                      <span className="bg-brand-bg px-3 py-1.5 rounded-full font-semibold text-brand-dark">
                        {category.totalTests} đề thi
                      </span>
                      <span className="text-brand-text-secondary">
                        {category.totalAttempts} lượt làm
                      </span>
                    </div>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>
    </main>
  );
}
