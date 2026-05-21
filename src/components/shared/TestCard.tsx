"use client";

import Link from "next/link";

interface TestCardProps {
  id: string;
  title: string;
  questionCount: number;
  duration: number;
  isNew?: boolean;
  slug: string;
}

export default function TestCard({ id, title, questionCount, duration, isNew, slug }: TestCardProps) {
  return (
    <div className="group bg-white rounded-2xl p-5 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-transparent hover:border-brand-accent/20">
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-brand-dark font-bold text-base truncate group-hover:text-brand-accent transition-colors">
              {title}
            </h3>
            {isNew && (
              <span className="flex-shrink-0 bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                Mới
              </span>
            )}
          </div>
          <div className="flex items-center gap-4 text-sm text-brand-text-secondary">
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {questionCount} câu
            </span>
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {duration} phút
            </span>
          </div>
        </div>
      </div>

      <Link
        href={`/tot-nghiep-thpt/${slug}/test/${id}`}
        className="inline-flex items-center justify-center w-full py-2.5 bg-brand-bg text-brand-dark font-semibold rounded-xl hover:bg-brand-accent hover:text-white transition-colors duration-300 text-sm"
      >
        Làm bài
      </Link>
    </div>
  );
}
