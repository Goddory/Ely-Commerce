import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";

interface ProductCardProps {
  id: string;
  name: string;
  price: string;
  image: string;
  isNew?: boolean;
}

export default function ProductCard({ id, name, price, image, isNew }: ProductCardProps) {
  return (
    <div className="group relative flex flex-col bg-white rounded-3xl p-3 shadow-sm hover:shadow-xl transition-all duration-300">
      {/* Image container */}
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-brand-bg mb-4">
        <Link href={`/products/${id}`} className="block h-full w-full">
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
        {/* Hover action */}
        <button 
          aria-label="Add to wishlist"
          className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm p-2 rounded-full text-brand-dark hover:text-brand-accent opacity-0 group-hover:opacity-100 transition-opacity z-10"
        >
          <Heart className="w-4 h-4" />
        </button>
      </div>

      {/* Product Info */}
      <div className="px-2 pb-2">
        <Link href={`/products/${id}`} className="block">
          <h3 className="text-brand-dark font-bold text-lg mb-1 truncate group-hover:text-brand-accent transition-colors">
            {name}
          </h3>
        </Link>
        <p className="text-brand-text-secondary font-medium">{price}</p>
      </div>
    </div>
  );
}
