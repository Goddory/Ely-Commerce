import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations/FadeIn";
import SubjectCard from "@/components/shared/SubjectCard";
import { THPT_SUBJECTS, PLATFORM_STATS } from "@/data/mock-data";

export default function TotNghiepThptPage() {
  return (
    <main className="flex-1 w-full bg-white">
      {/* Hero Section */}
      <section className="bg-brand-bg py-16 md:py-24 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <FadeIn direction="up">
            <h1 className="text-4xl md:text-5xl font-bold text-brand-dark mb-4">
              Luyện thi Tốt nghiệp THPT
            </h1>
            <p className="text-brand-text-secondary text-lg mb-6">
              {PLATFORM_STATS.totalTests}+ bài test online, bao phủ 12 môn thi. Mô phỏng
              chuẩn format đề thi thật, phân tích chi tiết kết quả.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="bg-white px-4 py-2 rounded-full font-semibold text-brand-dark shadow-sm">
                📝 {PLATFORM_STATS.totalTests}+ bài test
              </span>
              <span className="bg-white px-4 py-2 rounded-full font-semibold text-brand-dark shadow-sm">
                👥 {PLATFORM_STATS.totalAttempts} lượt làm
              </span>
              <span className="bg-white px-4 py-2 rounded-full font-semibold text-brand-dark shadow-sm">
                ✨ 100% Miễn phí
              </span>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Subject Grid */}
      <section className="py-16 md:py-24 px-4 max-w-7xl mx-auto">
        {/* Breadcrumbs */}
        <nav className="flex text-sm text-gray-500 mb-8" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link href="/" className="hover:text-brand-accent transition-colors">
                Trang chủ
              </Link>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <ChevronRight className="w-4 h-4 mx-1" />
                <span className="text-brand-dark font-medium">Luyện thi TN THPT</span>
              </div>
            </li>
          </ol>
        </nav>

        <FadeIn direction="up">
          <h2 className="text-2xl font-bold text-brand-dark mb-2">Chọn môn thi</h2>
          <p className="text-brand-text-secondary mb-8">
            Hiển thị {THPT_SUBJECTS.length} môn học
          </p>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {THPT_SUBJECTS.map((subject) => (
            <StaggerItem key={subject.id}>
              <SubjectCard subject={subject} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>
    </main>
  );
}
