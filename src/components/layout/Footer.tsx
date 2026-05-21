import Link from "next/link";
import { Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white pt-20 pb-10 border-t border-brand-bg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* Brand & Intro */}
          <div className="lg:col-span-1">
            <Link href="/" className="text-2xl font-bold text-brand-dark tracking-tight block mb-6">
              ely<span className="text-brand-accent">_edu</span>.
            </Link>
            <p className="text-brand-text-secondary mb-6 leading-relaxed">
              Nền tảng luyện thi Tốt nghiệp THPT & ĐGNL online miễn phí,
              giúp học sinh chinh phục kỳ thi một cách tự tin và hiệu quả.
            </p>
            <div className="flex items-center gap-4 text-brand-dark">
              <a href="#" className="hover:text-brand-accent transition-colors bg-brand-bg p-2 rounded-full">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href="#" className="hover:text-brand-accent transition-colors bg-brand-bg p-2 rounded-full">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
              </a>
              <a href="#" className="hover:text-brand-accent transition-colors bg-brand-bg p-2 rounded-full">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
              </a>
            </div>
          </div>

          {/* Kho Đề Thi */}
          <div>
            <h4 className="font-bold text-brand-dark mb-6 uppercase tracking-wider text-sm">Kho Đề Thi</h4>
            <ul className="space-y-4 text-brand-text-secondary font-medium">
              <li><Link href="/tot-nghiep-thpt" className="hover:text-brand-accent transition-colors">Luyện thi TN THPT</Link></li>
              <li><Link href="/dgnl" className="hover:text-brand-accent transition-colors">Luyện thi ĐGNL</Link></li>
              <li><Link href="/tot-nghiep-thpt/anh" className="hover:text-brand-accent transition-colors">Tiếng Anh THPT</Link></li>
              <li><Link href="/tot-nghiep-thpt/toan" className="hover:text-brand-accent transition-colors">Toán học THPT</Link></li>
            </ul>
          </div>

          {/* Về Ely Edu */}
          <div>
            <h4 className="font-bold text-brand-dark mb-6 uppercase tracking-wider text-sm">Về Ely Edu</h4>
            <ul className="space-y-4 text-brand-text-secondary font-medium">
              <li><Link href="/about" className="hover:text-brand-accent transition-colors">Giới thiệu</Link></li>
              <li><Link href="#" className="hover:text-brand-accent transition-colors">Chính sách bảo mật</Link></li>
              <li><Link href="#" className="hover:text-brand-accent transition-colors">Điều khoản sử dụng</Link></li>
              <li><Link href="#" className="hover:text-brand-accent transition-colors">Liên hệ</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-bold text-brand-dark mb-6 uppercase tracking-wider text-sm">Nhận Thông Báo</h4>
            <p className="text-brand-text-secondary mb-4">Đăng ký để nhận thông báo đề thi mới và mẹo ôn thi hiệu quả.</p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Email của bạn..."
                className="w-full bg-brand-bg border-none rounded-full px-4 py-3 focus:ring-2 focus:ring-brand-accent focus:outline-none transition-shadow"
              />
              <button
                type="submit"
                className="bg-brand-accent hover:bg-brand-accent/90 text-white p-3 rounded-full transition-transform hover:scale-105 active:scale-95 flex-shrink-0"
              >
                <Mail className="w-5 h-5" />
              </button>
            </form>
          </div>

        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-brand-bg flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-brand-text-secondary text-sm font-medium">
            &copy; {new Date().getFullYear()} ely_edu. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm font-medium text-brand-text-secondary">
            <Link href="#" className="hover:text-brand-accent transition-colors">Điều khoản</Link>
            <Link href="#" className="hover:text-brand-accent transition-colors">Bảo mật</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
