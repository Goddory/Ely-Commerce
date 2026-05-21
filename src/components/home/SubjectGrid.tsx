"use client";

import Link from "next/link";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations/FadeIn";
import SectionHeader from "@/components/shared/SectionHeader";
import SubjectCard from "@/components/shared/SubjectCard";
import { THPT_SUBJECTS, DGNL_CATEGORIES } from "@/data/mock-data";
import { GraduationCap, ArrowRight } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setActiveExamTab } from "@/lib/features/uiSlice";

export default function SubjectGrid() {
  const dispatch = useAppDispatch();
  const activeTab = useAppSelector((s) => s.ui.activeExamTab);

  return (
    <section className="py-16 md:py-24 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Tab Switcher */}
        <FadeIn direction="up">
          <div className="flex justify-center mb-12">
            <div className="inline-flex bg-brand-bg rounded-2xl p-1.5 gap-1">
              <button
                onClick={() => dispatch(setActiveExamTab("thpt"))}
                className={`px-6 py-3 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                  activeTab === "thpt"
                    ? "bg-white text-brand-dark shadow-sm"
                    : "text-brand-text-secondary hover:text-brand-dark"
                }`}
              >
                Tốt nghiệp THPT
              </button>
              <button
                onClick={() => dispatch(setActiveExamTab("dgnl"))}
                className={`px-6 py-3 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                  activeTab === "dgnl"
                    ? "bg-white text-brand-dark shadow-sm"
                    : "text-brand-text-secondary hover:text-brand-dark"
                }`}
              >
                ĐGNL & ĐGTD
              </button>
            </div>
          </div>
        </FadeIn>

        {/* THPT Tab */}
        <div className={activeTab === "thpt" ? "block" : "hidden"}>
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

          <FadeIn direction="up" className="text-center">
            <Link
              href="/tot-nghiep-thpt"
              className="inline-flex items-center gap-2 text-brand-accent font-bold hover:underline transition-colors cursor-pointer"
            >
              Xem tất cả môn thi
              <ArrowRight className="w-4 h-4" />
            </Link>
          </FadeIn>
        </div>

        {/* ĐGNL Tab */}
        <div className={activeTab === "dgnl" ? "block" : "hidden"}>
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
                  className="group block bg-brand-bg rounded-3xl p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 relative overflow-hidden cursor-pointer"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-brand-accent/5 rounded-full blur-2xl translate-x-8 -translate-y-8 group-hover:bg-brand-accent/10 transition-colors" />

                  <div className="relative z-10">
                    <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-brand-accent mb-6 shadow-sm group-hover:bg-brand-accent group-hover:text-white transition-colors">
                      <GraduationCap className="w-7 h-7" />
                    </div>

                    <h3 className="text-xl font-bold text-brand-dark mb-2 group-hover:text-brand-accent transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-brand-text-secondary text-sm mb-4">{category.description}</p>

                    <div className="flex items-center gap-4 text-sm">
                      <span className="bg-white px-3 py-1.5 rounded-full font-semibold text-brand-dark shadow-sm">
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

          <FadeIn direction="up" className="text-center mt-8">
            <Link
              href="/dgnl"
              className="inline-flex items-center gap-2 text-brand-accent font-bold hover:underline transition-colors cursor-pointer"
            >
              Xem tất cả ĐGNL
              <ArrowRight className="w-4 h-4" />
            </Link>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
