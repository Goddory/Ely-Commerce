"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import { Search, ShoppingBag, User, Heart, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useWishlist } from "@/context/WishlistContext";
import CartDrawer from "./CartDrawer";

export default function Navbar() {
  const router = useRouter();
  const { cartCount, setIsCartOpen } = useCart();
  const { user, logout } = useAuth();
  const { wishlistCount } = useWishlist();
  const pathname = usePathname();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const navLinkClass = (href: string) =>
    `text-base font-semibold transition-colors ${
      pathname === href || pathname.startsWith(href + "/")
        ? "text-brand-dark"
        : "text-brand-text-secondary hover:text-brand-dark"
    }`;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <>
      <nav className="sticky top-0 z-50 w-full bg-brand-bg/80 backdrop-blur-md border-b border-brand-accent/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link href="/" className="text-3xl font-bold tracking-tighter text-brand-dark hover:opacity-80 transition-opacity">
              Ely.
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex space-x-8">
              <Link href="/products" className={navLinkClass("/products")}>
                Sản phẩm mới
              </Link>
              <Link href="/collections" className={navLinkClass("/collections")}>
                Bộ sưu tập
              </Link>
              <Link href="/about" className={navLinkClass("/about")}>
                Về chúng tôi
              </Link>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-5">
              {isSearchOpen ? (
                <form onSubmit={handleSearchSubmit} className="flex items-center border border-gray-200 rounded-full px-3 py-1.5 bg-white shadow-sm transition-all duration-300">
                  <input
                    type="text"
                    placeholder="Tìm kiếm sản phẩm..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-40 md:w-60 bg-transparent text-sm focus:outline-none text-brand-dark px-1"
                    autoFocus
                  />
                  <button type="submit" className="text-brand-dark hover:text-brand-accent p-1">
                    <Search className="w-4 h-4" />
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setIsSearchOpen(false)}
                    className="text-gray-400 hover:text-brand-dark p-1"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </form>
              ) : (
                <button 
                  aria-label="Search" 
                  className="text-brand-dark hover:text-brand-accent transition-colors cursor-pointer"
                  onClick={() => setIsSearchOpen(true)}
                >
                  <Search className="w-5 h-5" />
                </button>
              )}
              
              {/* Wishlist */}
              <Link 
                href="/wishlist" 
                aria-label="Wishlist" 
                className="relative text-brand-dark hover:text-brand-accent transition-colors cursor-pointer"
              >
                <Heart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-brand-accent text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* User Account Dropdown */}
              {user ? (
                <div className="relative">
                  <button 
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    onBlur={() => setTimeout(() => setIsUserMenuOpen(false), 200)}
                    className="flex items-center space-x-1.5 text-brand-dark hover:text-brand-accent transition-colors cursor-pointer focus:outline-none"
                    aria-label="User profile menu"
                  >
                    <User className="w-5 h-5" />
                    <span className="hidden md:inline text-sm font-semibold max-w-[100px] truncate">{user.username}</span>
                  </button>
                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-3 w-48 bg-white/95 backdrop-blur-md border border-brand-accent/10 rounded-2xl shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                      <button 
                        onClick={() => {
                          router.push("/profile");
                          setIsUserMenuOpen(false);
                        }}
                        className="w-full text-left block px-4 py-2 text-sm font-semibold text-brand-dark hover:bg-brand-accent/5 hover:text-brand-accent transition-colors"
                      >
                        Trang cá nhân
                      </button>
                      {user.role === "Admin" && (
                        <button 
                          onClick={() => {
                            router.push("/admin");
                            setIsUserMenuOpen(false);
                          }}
                          className="w-full text-left block px-4 py-2 text-sm font-semibold text-brand-accent hover:bg-brand-accent/5 transition-colors border-t border-gray-100"
                        >
                          Quản trị hệ thống
                        </button>
                      )}
                      <button 
                        onClick={() => {
                          logout();
                          setIsUserMenuOpen(false);
                          router.push("/");
                        }}
                        className="w-full text-left px-4 py-2 text-sm font-semibold text-red-500 hover:bg-red-50 hover:text-red-600 transition-colors border-t border-gray-100"
                      >
                        Đăng xuất
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link 
                  href="/login" 
                  aria-label="User profile" 
                  className="text-brand-dark hover:text-brand-accent transition-colors cursor-pointer"
                >
                  <User className="w-5 h-5" />
                </Link>
              )}

              {/* Cart */}
              <button 
                aria-label="Cart" 
                className="relative text-brand-dark hover:text-brand-accent transition-colors cursor-pointer"
                onClick={() => setIsCartOpen(true)}
              >
                <ShoppingBag className="w-5 h-5" />
                {/* Dynamic cart badge */}
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-brand-accent text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Cart Drawer Overlay */}
      <CartDrawer />
    </>
  );
}

