"use client";

import Link from "next/link";
import { BookOpen, User, Menu, X, ChevronDown } from "lucide-react";
import { useState } from "react";
import { THPT_SUBJECTS } from "@/data/mock-data";
import { resolveIcon } from "@/lib/icons";

export default function Navbar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full bg-brand-bg/80 backdrop-blur-md border-b border-brand-accent/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="text-3xl font-bold tracking-tighter text-brand-dark hover:opacity-80 transition-opacity">
            ely<span className="text-brand-accent">_edu</span>.
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-8">
            <div
              className="relative"
              onMouseEnter={() => setIsMegaMenuOpen(true)}
              onMouseLeave={() => setIsMegaMenuOpen(false)}
            >
              <Link
                href="/tot-nghiep-thpt"
                className="flex items-center gap-1 text-base font-semibold text-brand-dark hover:text-brand-accent transition-colors"
              >
                Luyện thi TN THPT
                <ChevronDown className={`w-4 h-4 transition-transform ${isMegaMenuOpen ? "rotate-180" : ""}`} />
              </Link>

              {/* Mega Menu */}
              {isMegaMenuOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 z-50">
                  <div className="bg-white rounded-2xl shadow-xl border border-brand-accent/10 p-6 w-[640px]">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold text-brand-dark">Chọn môn thi</h3>
                      <Link
                        href="/tot-nghiep-thpt"
                        className="text-sm text-brand-accent font-semibold hover:underline"
                      >
                        Xem tất cả →
                      </Link>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {THPT_SUBJECTS.map((subject) => {
                        const Icon = resolveIcon(subject.iconName);
                        return (
                          <Link
                            key={subject.id}
                            href={`/tot-nghiep-thpt/${subject.slug}`}
                            className="flex items-center gap-3 p-3 rounded-xl hover:bg-brand-bg transition-colors group"
                          >
                            <div className="w-9 h-9 bg-brand-bg rounded-lg flex items-center justify-center text-brand-accent group-hover:bg-brand-accent group-hover:text-white transition-colors">
                              <Icon className="w-4 h-4" />
                            </div>
                            <div>
                              <span className="text-sm font-semibold text-brand-dark block">{subject.name}</span>
                              <span className="text-xs text-brand-text-secondary">{subject.testCount} bài test</span>
                            </div>
                            {subject.isHot && (
                              <span className="bg-brand-accent text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full ml-auto">
                                HOT
                              </span>
                            )}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Link href="/dgnl" className="text-base font-semibold text-brand-text-secondary hover:text-brand-accent transition-colors">
              Luyện thi ĐGNL
            </Link>
            <Link href="/about" className="text-base font-semibold text-brand-text-secondary hover:text-brand-accent transition-colors">
              Giới thiệu
            </Link>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-5">
            <Link
              href="/quan-ly-luyen-tap"
              aria-label="Quản lý luyện tập"
              className="hidden md:flex text-brand-dark hover:text-brand-accent transition-colors"
            >
              <BookOpen className="w-5 h-5" />
            </Link>
            <button aria-label="User profile" className="text-brand-dark hover:text-brand-accent transition-colors">
              <User className="w-5 h-5" />
            </button>
            <button
              aria-label="Menu"
              className="md:hidden text-brand-dark hover:text-brand-accent transition-colors"
              onClick={() => setIsMobileOpen(!isMobileOpen)}
            >
              {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileOpen && (
        <div className="md:hidden bg-white border-t border-brand-accent/10 px-4 py-6 space-y-4">
          <Link
            href="/tot-nghiep-thpt"
            className="block py-3 text-lg font-semibold text-brand-dark hover:text-brand-accent transition-colors"
            onClick={() => setIsMobileOpen(false)}
          >
            Luyện thi TN THPT
          </Link>
          <Link
            href="/dgnl"
            className="block py-3 text-lg font-semibold text-brand-dark hover:text-brand-accent transition-colors"
            onClick={() => setIsMobileOpen(false)}
          >
            Luyện thi ĐGNL
          </Link>
          <Link
            href="/about"
            className="block py-3 text-lg font-semibold text-brand-dark hover:text-brand-accent transition-colors"
            onClick={() => setIsMobileOpen(false)}
          >
            Giới thiệu
          </Link>
          <Link
            href="/quan-ly-luyen-tap"
            className="block py-3 text-lg font-semibold text-brand-dark hover:text-brand-accent transition-colors"
            onClick={() => setIsMobileOpen(false)}
          >
            Quản lý luyện tập
          </Link>
        </div>
      )}
    </nav>
  );
}
