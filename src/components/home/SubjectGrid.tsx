"use client";

import Link from "next/link";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations/FadeIn";
import SectionHeader from "@/components/shared/SectionHeader";
import SubjectCard from "@/components/shared/SubjectCard";
import { THPT_SUBJECTS, DGNL_CATEGORIES } from "@/data/mock-data";
import { GraduationCap, ArrowRight } from "lucide-react";

export default function SubjectGrid() {
  return (
    <section className="py-16 md:py-24 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* THPT Section */}
        <FadeIn direction="up">
          <SectionHeader
            subtitle="Kho Đề Thi"
            title="Luyện thi Tốt nghiệp THPT"
            description="784+ bài test online, bao phủ 12 môn thi, cập nhật liên tục theo cấu trúc đề mới nhất."
          />
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
          {THPT_SUBJECTS.map((subject) => (
            <StaggerItem key={subject.id}>
              <SubjectCard subject={subject} />
            </StaggerItem>
          ))}
        </StaggerContainer>

        <FadeIn direction="up" className="text-center mb-20">
          <Link
            href="/tot-nghiep-thpt"
            className="inline-flex items-center gap-2 text-brand-accent font-bold hover:underline transition-colors"
          >
            Xem tất cả môn thi
            <ArrowRight className="w-4 h-4" />
          </Link>
        </FadeIn>

        {/* ĐGNL Section */}
        <FadeIn direction="up">
          <SectionHeader
            subtitle="Đánh Giá Năng Lực"
            title="Luyện thi ĐGNL & ĐGTD"
            description="Đề thi thử ĐGNL các trường Đại học hàng đầu Việt Nam."
          />
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {DGNL_CATEGORIES.map((category) => (
            <StaggerItem key={category.id}>
              <Link
                href={`/dgnl/${category.slug}`}
                className="group block bg-brand-bg rounded-3xl p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 relative overflow-hidden"
              >
                {/* Decorative accent */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-accent/5 rounded-full blur-2xl translate-x-8 -translate-y-8" />

                <div className="relative z-10">
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-brand-accent mb-6 shadow-sm">
                    <GraduationCap className="w-7 h-7" />
                  </div>

                  <h3 className="text-xl font-bold text-brand-dark mb-2 group-hover:text-brand-accent transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-brand-text-secondary text-sm mb-4">{category.description}</p>

                  <div className="flex items-center gap-4 text-sm">
                    <span className="bg-white px-3 py-1 rounded-full font-semibold text-brand-dark shadow-sm">
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
  );
}
