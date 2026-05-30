"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Heart } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";
import QuickViewModal from "./QuickViewModal";

interface ProductCardProps {
  id: string;
  name: string;
  price: string;
  image: string;
  isNew?: boolean;
  rating?: number;
  reviewsCount?: number;
}

export default function ProductCard({ id, name, price, image, isNew, rating, reviewsCount }: ProductCardProps) {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const favorited = isInWishlist(id);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist({ id, name, price, image, isNew });
  };

  const handleQuickViewClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsQuickViewOpen(true);
  };

  return (
    <div className="group relative flex flex-col bg-white rounded-3xl p-3 shadow-sm hover:shadow-xl transition-all duration-300">
      {/* Image container */}
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-brand-bg mb-4">
        <Link href={`/products/${id}`} className="relative block h-full w-full">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </Link>
        {/* Badges */}
        {isNew && (
          <div className="absolute top-3 left-3 bg-brand-accent text-white text-xs font-bold px-3 py-1 rounded-full z-10">
            MỚI
          </div>
        )}
        
        {/* Hover action - Quick View Button overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
          <button 
            onClick={handleQuickViewClick}
            className="bg-[#FBF8F3]/95 text-brand-dark text-xs font-extrabold px-5 py-2.5 rounded-full hover:bg-brand-accent hover:text-white transition-all transform translate-y-2 group-hover:translate-y-0 duration-300 shadow-md cursor-pointer"
          >
            Xem nhanh
          </button>
        </div>

        {/* Hover action - Wishlist Button */}
        <button 
          onClick={handleWishlistClick}
          aria-label={favorited ? "Remove from wishlist" : "Add to wishlist"}
          className={`absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-2 rounded-full hover:scale-110 active:scale-95 transition-all duration-200 z-20 shadow-sm ${
            favorited 
              ? "opacity-100 text-brand-accent bg-white" 
              : "opacity-0 group-hover:opacity-100 text-brand-dark hover:text-brand-accent"
          }`}
        >
          <Heart className={`w-4 h-4 transition-colors ${favorited ? "fill-brand-accent text-brand-accent" : ""}`} />
        </button>
      </div>

      {/* Product Info */}
      <div className="px-2 pb-2">
        <Link href={`/products/${id}`} className="block">
          <h3 className="text-brand-dark font-bold text-lg mb-1 truncate group-hover:text-brand-accent transition-colors">
            {name}
          </h3>
        </Link>
        <div className="flex items-center justify-between mt-1">
          <p className="text-brand-text-secondary font-medium">{price}</p>
          {rating !== undefined && rating > 0 ? (
            <div className="flex items-center gap-0.5 text-amber-500 font-bold text-xs" title={`${rating} / 5 stars`}>
              <span className="text-sm">★</span>
              <span>{rating}</span>
              {reviewsCount !== undefined && reviewsCount > 0 && (
                <span className="text-gray-400 font-medium">({reviewsCount})</span>
              )}
            </div>
          ) : null}
        </div>
      </div>

      {/* Quick View Modal */}
      <QuickViewModal 
        productId={id}
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
      />
    </div>
  );
}

