"use client";

import Link from "next/link";
import { ChevronRight, GraduationCap } from "lucide-react";
import { use } from "react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations/FadeIn";
import TestCard from "@/components/shared/TestCard";
import { DGNL_CATEGORIES } from "@/data/mock-data";

function generateMockTests(slug: string, count: number) {
  return Array.from({ length: Math.min(count, 12) }, (_, i) => ({
    id: `${slug}-${i + 1}`,
    title: `Đề ĐGNL - Đề số ${i + 1}`,
    questionCount: 120,
    duration: 150,
    isNew: i < 3,
    slug,
  }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function DgnlDetailPage({ params }: PageProps) {
  const { slug } = use(params);
  const category = DGNL_CATEGORIES.find((c) => c.slug === slug);

  if (!category) {
    return (
      <main className="flex-1 flex items-center justify-center py-32">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-brand-dark mb-4">Không tìm thấy</h1>
          <p className="text-brand-text-secondary mb-8">Danh mục không tồn tại.</p>
          <Link href="/dgnl" className="text-brand-accent font-bold hover:underline">← Quay lại danh sách</Link>
        </div>
      </main>
    );
  }

  const tests = generateMockTests(slug, category.totalTests);

  return (
    <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 w-full">
      <nav className="flex text-sm text-gray-500 mb-8" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-3">
          <li><Link href="/" className="hover:text-brand-accent transition-colors">Trang chủ</Link></li>
          <li>
            <div className="flex items-center">
              <ChevronRight className="w-4 h-4 mx-1" />
              <Link href="/dgnl" className="hover:text-brand-accent transition-colors">Luyện thi ĐGNL</Link>
            </div>
          </li>
          <li aria-current="page">
            <div className="flex items-center">
              <ChevronRight className="w-4 h-4 mx-1" />
              <span className="text-brand-dark font-medium">{category.name}</span>
            </div>
          </li>
        </ol>
      </nav>

      <FadeIn direction="up">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-14 h-14 bg-brand-bg rounded-2xl flex items-center justify-center text-brand-accent">
            <GraduationCap className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-brand-dark">{category.name}</h1>
            <p className="text-brand-text-secondary mt-1">{category.totalTests} đề thi • {category.totalAttempts} lượt làm</p>
          </div>
        </div>
      </FadeIn>

      <StaggerContainer>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {tests.map((test) => (
            <StaggerItem key={test.id}>
              <TestCard {...test} />
            </StaggerItem>
          ))}
        </div>
      </StaggerContainer>

      {category.totalTests > 12 && (
        <FadeIn direction="up" className="text-center mt-12">
          <button className="bg-brand-bg hover:bg-brand-accent-light text-brand-dark px-8 py-3 rounded-full font-bold transition-colors shadow-sm cursor-pointer">
            Xem thêm ({category.totalTests - 12} đề còn lại)
          </button>
        </FadeIn>
      )}
    </main>
  );
}
