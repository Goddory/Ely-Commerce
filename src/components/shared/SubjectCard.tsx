"use client";

import Link from "next/link";
import type { Subject } from "@/types";
import { resolveIcon } from "@/lib/icons";

interface SubjectCardProps {
  subject: Subject;
}

export default function SubjectCard({ subject }: SubjectCardProps) {
  const Icon = resolveIcon(subject.iconName);

  return (
    <Link
      href={`/tot-nghiep-thpt/${subject.slug}`}
      className="group flex items-center gap-4 bg-brand-bg hover:bg-white rounded-2xl p-4 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
    >
      <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-brand-accent group-hover:bg-brand-accent group-hover:text-white transition-colors flex-shrink-0">
        <Icon className="w-5 h-5" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-bold text-brand-dark text-sm">{subject.name}</span>
          {subject.isHot && (
            <span className="bg-brand-accent text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
              HOT
            </span>
          )}
        </div>
        <span className="text-xs text-brand-text-secondary">{subject.testCount} bài test</span>
      </div>
    </Link>
  );
}
