"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { use } from "react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations/FadeIn";
import TestCard from "@/components/shared/TestCard";
import { THPT_SUBJECTS } from "@/data/mock-data";
import { resolveIcon } from "@/lib/icons";

function generateMockTests(subjectSlug: string, count: number) {
  return Array.from({ length: Math.min(count, 12) }, (_, i) => ({
    id: `${subjectSlug}-${i + 1}`,
    title: `Đề thi thử ${subjectSlug.charAt(0).toUpperCase() + subjectSlug.slice(1)} - Đề số ${i + 1}`,
    questionCount: 40,
    duration: 50,
    isNew: i < 3,
    slug: subjectSlug,
  }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function SubjectDetailPage({ params }: PageProps) {
  const { slug } = use(params);
  const subject = THPT_SUBJECTS.find((s) => s.slug === slug);

  if (!subject) {
    return (
      <main className="flex-1 flex items-center justify-center py-32">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-brand-dark mb-4">Không tìm thấy</h1>
          <p className="text-brand-text-secondary mb-8">Môn thi không tồn tại.</p>
          <Link href="/tot-nghiep-thpt" className="text-brand-accent font-bold hover:underline">
            ← Quay lại danh sách
          </Link>
        </div>
      </main>
    );
  }

  const Icon = resolveIcon(subject.iconName);
  const tests = generateMockTests(slug, subject.testCount);

  return (
    <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 w-full">
      {/* Breadcrumbs */}
      <nav className="flex text-sm text-gray-500 mb-8" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-3">
          <li className="inline-flex items-center">
            <Link href="/" className="hover:text-brand-accent transition-colors">
              Trang chủ
            </Link>
          </li>
          <li>
            <div className="flex items-center">
              <ChevronRight className="w-4 h-4 mx-1" />
              <Link href="/tot-nghiep-thpt" className="hover:text-brand-accent transition-colors">
                Luyện thi TN THPT
              </Link>
            </div>
          </li>
          <li aria-current="page">
            <div className="flex items-center">
              <ChevronRight className="w-4 h-4 mx-1" />
              <span className="text-brand-dark font-medium">{subject.name}</span>
            </div>
          </li>
        </ol>
      </nav>

      {/* Subject Header */}
      <FadeIn direction="up">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-14 h-14 bg-brand-bg rounded-2xl flex items-center justify-center text-brand-accent">
            <Icon className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold text-brand-dark">{subject.name}</h1>
              {subject.isHot && (
                <span className="bg-brand-accent text-white text-xs font-bold px-3 py-1 rounded-full">
                  HOT
                </span>
              )}
            </div>
            <p className="text-brand-text-secondary mt-1">
              {subject.testCount} bài test online
            </p>
          </div>
        </div>
      </FadeIn>

      {/* Test Grid */}
      <StaggerContainer>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {tests.map((test) => (
            <StaggerItem key={test.id}>
              <TestCard {...test} />
            </StaggerItem>
          ))}
        </div>
      </StaggerContainer>

      {/* Load more hint */}
      {subject.testCount > 12 && (
        <FadeIn direction="up" className="text-center mt-12">
          <button className="bg-brand-bg hover:bg-brand-accent-light text-brand-dark px-8 py-3 rounded-full font-bold transition-colors shadow-sm">
            Xem thêm ({subject.testCount - 12} đề còn lại)
          </button>
        </FadeIn>
      )}
    </main>
  );
}
