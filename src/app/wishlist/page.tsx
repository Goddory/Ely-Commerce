"use client";

import Link from "next/link";
import { Heart, ChevronRight, ShoppingBag } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";
import ProductCard from "@/components/shared/ProductCard";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations/FadeIn";

export default function WishlistPage() {
  const { wishlistItems } = useWishlist();

  return (
    <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
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
              <span className="text-brand-dark font-medium">Danh sách yêu thích</span>
            </div>
          </li>
        </ol>
      </nav>

      {/* Header */}
      <div className="mb-10 text-center md:text-left">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-brand-dark mb-2">
          Danh sách yêu thích
        </h1>
        <p className="text-gray-500">
          Lưu giữ những món đồ yêu thích của bạn tại đây để dễ dàng mua sắm sau.
        </p>
      </div>

      {wishlistItems.length === 0 ? (
        /* Empty State */
        <FadeIn direction="up" delay={0.1}>
          <div className="flex flex-col items-center justify-center py-16 px-4 bg-white rounded-3xl shadow-sm border border-brand-accent/5 max-w-md mx-auto text-center">
            <div className="w-16 h-16 bg-brand-accent/10 rounded-full flex items-center justify-center text-brand-accent mb-6 animate-bounce">
              <Heart className="w-8 h-8 fill-brand-accent text-brand-accent" />
            </div>
            <h2 className="text-2xl font-bold text-brand-dark mb-3">
              Chưa có sản phẩm yêu thích
            </h2>
            <p className="text-gray-500 mb-8 max-w-xs">
              Hãy lướt qua cửa hàng của chúng tôi và thả tim những sản phẩm bạn ưng ý nhất!
            </p>
            <Link 
              href="/products" 
              className="inline-flex items-center bg-brand-dark text-white font-semibold px-8 py-3.5 rounded-xl shadow-md hover:bg-brand-accent transition-all duration-300 hover:scale-105"
            >
              <ShoppingBag className="w-5 h-5 mr-2" />
              Tiếp tục mua sắm
            </Link>
          </div>
        </FadeIn>
      ) : (
        /* Grid list */
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {wishlistItems.map((product) => (
            <StaggerItem key={product.id}>
              <ProductCard
                id={product.id}
                name={product.name}
                price={product.price}
                image={product.image}
                isNew={product.isNew}
              />
            </StaggerItem>
          ))}
        </StaggerContainer>
      )}
    </main>
  );
}
