"use client";

import Link from "next/link";
import { BookOpen, User, Menu, X, ChevronDown } from "lucide-react";
import { THPT_SUBJECTS } from "@/data/mock-data";
import { resolveIcon } from "@/lib/icons";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { toggleMobileMenu, closeMobileMenu, setMegaMenu } from "@/lib/features/uiSlice";

export default function Navbar() {
  const dispatch = useAppDispatch();
  const { mobileMenuOpen, megaMenuOpen } = useAppSelector((s) => s.ui);

  return (
    <nav className="sticky top-0 z-50 w-full bg-brand-bg/80 backdrop-blur-md border-b border-brand-accent/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="text-3xl font-bold tracking-tighter text-brand-dark hover:opacity-80 transition-opacity">
            ely<span className="text-brand-accent">_edu</span>.
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            <div
              className="relative"
              onMouseEnter={() => dispatch(setMegaMenu(true))}
              onMouseLeave={() => dispatch(setMegaMenu(false))}
            >
              <Link
                href="/tot-nghiep-thpt"
                className="flex items-center gap-1 text-base font-semibold text-brand-dark hover:text-brand-accent transition-colors"
              >
                Luyện thi TN THPT
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${megaMenuOpen ? "rotate-180" : ""}`} />
              </Link>

              {/* Mega Menu */}
              <div
                className={`absolute top-full left-1/2 -translate-x-1/2 pt-4 z-50 transition-all duration-200 ${
                  megaMenuOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none"
                }`}
              >
                <div className="bg-white rounded-2xl shadow-xl border border-brand-accent/10 p-6 w-[640px]">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-brand-dark">Chọn môn thi</h3>
                    <Link href="/tot-nghiep-thpt" className="text-sm text-brand-accent font-semibold hover:underline">
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
                          className="flex items-center gap-3 p-3 rounded-xl hover:bg-brand-bg transition-colors group cursor-pointer"
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
            <button aria-label="User profile" className="text-brand-dark hover:text-brand-accent transition-colors cursor-pointer">
              <User className="w-5 h-5" />
            </button>
            <button
              aria-label="Menu"
              className="md:hidden text-brand-dark hover:text-brand-accent transition-colors cursor-pointer"
              onClick={() => dispatch(toggleMobileMenu())}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer with animation */}
      <div
        className={`md:hidden bg-white border-t border-brand-accent/10 overflow-hidden transition-all duration-300 ${
          mobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 py-6 space-y-4">
          {[
            { href: "/tot-nghiep-thpt", label: "Luyện thi TN THPT" },
            { href: "/dgnl", label: "Luyện thi ĐGNL" },
            { href: "/about", label: "Giới thiệu" },
            { href: "/quan-ly-luyen-tap", label: "Quản lý luyện tập" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block py-3 text-lg font-semibold text-brand-dark hover:text-brand-accent transition-colors"
              onClick={() => dispatch(closeMobileMenu())}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
