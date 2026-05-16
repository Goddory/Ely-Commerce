import Link from "next/link";
import { Search, ShoppingBag, User } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full bg-brand-bg/80 backdrop-blur-md border-b border-brand-accent/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="text-3xl font-bold tracking-tighter text-brand-dark hover:opacity-80 transition-opacity">
            Ely.
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex space-x-8">
            <Link href="/products" className="text-base font-semibold text-brand-dark hover:text-brand-accent transition-colors">
              Sản phẩm mới
            </Link>
            <Link href="/collections" className="text-base font-semibold text-brand-text-secondary hover:text-brand-accent transition-colors">
              Bộ sưu tập
            </Link>
            <Link href="/about" className="text-base font-semibold text-brand-text-secondary hover:text-brand-accent transition-colors">
              Về chúng tôi
            </Link>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-5">
            <button aria-label="Search" className="text-brand-dark hover:text-brand-accent transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <button aria-label="User profile" className="text-brand-dark hover:text-brand-accent transition-colors">
              <User className="w-5 h-5" />
            </button>
            <button aria-label="Cart" className="relative text-brand-dark hover:text-brand-accent transition-colors">
              <ShoppingBag className="w-5 h-5" />
              {/* Fake cart badge */}
              <span className="absolute -top-1 -right-1 bg-brand-accent text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                2
              </span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
