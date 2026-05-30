"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { X, Star, Minus, Plus, ShoppingBag, Loader2, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { apiFetch } from "@/utils/api";

interface ColorOption {
  name: string;
  hex: string;
}

interface ProductDetails {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  description: string;
  imageUrl: string;
  stock: number;
  isNew: boolean;
  categoryId: string;
  colors: ColorOption[];
  sizes: string[];
  images: string[];
  rating: number;
  reviews: number;
}

interface ApiProductResponse {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  description: string;
  imageUrl: string;
  stock: number;
  isNew: boolean;
  categoryId: string;
  colorOptions?: string;
  sizeOptions?: string;
  averageRating?: number;
  reviewsCount?: number;
  images?: { id: string; imageUrl: string; displayOrder: number }[];
}

const getColorHex = (name: string): string => {
  switch (name.trim().toLowerCase()) {
    case "kem": return "#FBF8F3";
    case "nâu sẫm": return "#554841";
    case "đất nung": return "#C18676";
    case "đen": return "#000000";
    case "trắng": return "#FFFFFF";
    case "denim": return "#4F6F8F";
    case "xám": return "#8E8E93";
    default: return "#A0AEC0";
  }
};

interface QuickViewModalProps {
  productId: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function QuickViewModal({ productId, isOpen, onClose }: QuickViewModalProps) {
  const { addToCart, setIsCartOpen } = useCart();
  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Modal interaction states
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState(0);
  const [quantity, setQuantity] = useState(1);

  // Zoom position
  const [zoomPos, setZoomPos] = useState({ x: 0, y: 0 });
  const [isZoomed, setIsZoomed] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPos({ x, y });
  };

  useEffect(() => {
    if (!isOpen || !productId) return;
    
    const loadProduct = async () => {
      setLoading(true);
      setProduct(null);
      setActiveImageIndex(0);
      setSelectedColor(0);
      setSelectedSize(0);
      setQuantity(1);

      try {
        const data = await apiFetch<ApiProductResponse>(`/products/${productId}`);
        const colors = data.colorOptions 
          ? data.colorOptions.split(",").map((c: string) => ({ name: c.trim(), hex: getColorHex(c) }))
          : [{ name: "Trắng", hex: "#FFFFFF" }];
        
        const sizes = data.sizeOptions 
          ? data.sizeOptions.split(",").map((s: string) => s.trim())
          : ["S", "M", "L", "XL"];

        const imagesList = data.images && data.images.length > 0
          ? [...data.images]
              .sort((a, b) => a.displayOrder - b.displayOrder)
              .map((img) => img.imageUrl)
          : [data.imageUrl];

        setProduct({
          ...data,
          colors,
          sizes,
          images: imagesList,
          rating: data.averageRating || 0,
          reviews: data.reviewsCount || 0
        });
      } catch (err) {
        console.error("Error loading quickview details:", err);
      } finally {
        setLoading(false);
      }
    };

    Promise.resolve().then(loadProduct);
  }, [productId, isOpen]);

  const handleAddToCart = () => {
    if (!product) return;
    addToCart(
      {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.imageUrl,
      },
      quantity,
      product.colors[selectedColor]?.name || "Default",
      product.sizes[selectedSize] || "M"
    );
    setIsCartOpen(true);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
      {/* Backdrop Close Click */}
      <div className="absolute inset-0" onClick={onClose}></div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative bg-[#FBF8F3] w-full max-w-4xl rounded-[32px] shadow-2xl p-6 md:p-8 max-h-[90vh] overflow-y-auto border border-brand-accent/10 z-10 text-brand-dark"
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-brand-dark p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer z-20"
        >
          <X className="w-5 h-5" />
        </button>

        {loading ? (
          <div className="flex flex-col justify-center items-center py-20 min-h-[400px]">
            <Loader2 className="animate-spin w-10 h-10 text-brand-accent mb-4" />
            <p className="text-sm font-semibold text-gray-500">Đang tải thông tin sản phẩm...</p>
          </div>
        ) : !product ? (
          <div className="text-center py-16 text-gray-500">
            <p className="text-lg font-medium mb-4">Không tìm thấy sản phẩm</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mt-4">
            {/* Left Column: Images Gallery */}
            <div className="space-y-4">
              <div 
                className="relative aspect-[4/5] bg-gray-100 rounded-2xl overflow-hidden cursor-zoom-in group border border-brand-accent/5"
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsZoomed(true)}
                onMouseLeave={() => setIsZoomed(false)}
              >
                <motion.div
                  className="w-full h-full relative"
                  animate={{
                    scale: isZoomed ? 1.8 : 1,
                    transformOrigin: isZoomed ? `${zoomPos.x}% ${zoomPos.y}%` : "center center"
                  }}
                  transition={{ type: "tween", duration: 0.1 }}
                >
                  <Image 
                    src={product.images[activeImageIndex]} 
                    alt={product.name}
                    fill
                    className="object-cover"
                    priority
                  />
                </motion.div>
              </div>

              {/* Thumbnails */}
              <div className="flex gap-3 overflow-x-auto pb-1">
                {product.images.map((img, index) => (
                  <button 
                    key={index} 
                    onClick={() => setActiveImageIndex(index)}
                    className={`relative w-16 h-16 flex-shrink-0 rounded-xl overflow-hidden border-2 transition-colors ${
                      index === activeImageIndex ? "border-brand-dark" : "border-transparent hover:border-brand-accent/50"
                    }`}
                  >
                    <Image 
                      src={img} 
                      alt={`Thumbnail ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Right Column: Info & Actions */}
            <div className="flex flex-col justify-between">
              <div>
                <h2 className="text-2xl md:text-3xl font-extrabold text-brand-dark mb-2">
                  {product.name}
                </h2>

                {/* Rating */}
                <div className="flex items-center text-amber-500 gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? "fill-current" : "fill-transparent"}`} />
                  ))}
                  <span className="ml-1 text-xs text-gray-600 font-medium">({product.reviews} đánh giá)</span>
                </div>

                {/* Price */}
                <div className="flex items-baseline space-x-3 mb-4">
                  <span className="text-2xl font-bold text-brand-dark">
                    {product.price.toLocaleString('vi-VN')}đ
                  </span>
                  {product.originalPrice > product.price && (
                    <span className="text-base text-gray-400 line-through">
                      {product.originalPrice.toLocaleString('vi-VN')}đ
                    </span>
                  )}
                  {product.originalPrice > product.price && (
                    <span className="px-2 py-0.5 bg-brand-accent/10 text-brand-accent text-xs font-bold rounded">
                      -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                    </span>
                  )}
                </div>

                {/* Description */}
                <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-4">
                  {product.description}
                </p>

                {/* Color selection */}
                <div className="mb-4">
                  <h3 className="text-xs font-bold text-brand-dark mb-2">Màu sắc: {product.colors[selectedColor]?.name}</h3>
                  <div className="flex space-x-2.5">
                    {product.colors.map((color, index) => (
                      <button 
                        key={index}
                        onClick={() => setSelectedColor(index)}
                        className={`w-8 h-8 rounded-full border-2 focus:outline-none transition-transform hover:scale-110 ${
                          index === selectedColor ? "border-brand-dark" : "border-transparent ring-1 ring-gray-200"
                        }`}
                        style={{ backgroundColor: color.hex }}
                        title={color.name}
                        aria-label={`Select ${color.name}`}
                      />
                    ))}
                  </div>
                </div>

                {/* Size selection */}
                <div className="mb-6">
                  <h3 className="text-xs font-bold text-brand-dark mb-2">Kích thước</h3>
                  <div className="grid grid-cols-4 gap-2">
                    {product.sizes.map((size, index) => (
                      <button 
                        key={size}
                        onClick={() => setSelectedSize(index)}
                        className={`py-2 text-xs rounded-xl border font-semibold transition-colors ${
                          index === selectedSize 
                            ? "bg-brand-dark border-brand-dark text-white" 
                            : "bg-white border-gray-200 text-gray-700 hover:border-brand-dark"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Add to cart section */}
              <div className="space-y-4 border-t border-gray-100 pt-4">
                <div className="flex gap-4">
                  {/* Quantity selector */}
                  <div className="flex items-center justify-between border-2 border-gray-200 rounded-xl px-3 py-2 w-1/3">
                    <button 
                      onClick={() => setQuantity(q => q > 1 ? q - 1 : 1)}
                      className="text-gray-500 hover:text-brand-accent transition-colors cursor-pointer"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="font-semibold text-sm text-brand-dark">{quantity}</span>
                    <button 
                      onClick={() => setQuantity(q => q + 1)}
                      className="text-gray-500 hover:text-brand-accent transition-colors cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Add Button */}
                  <button 
                    onClick={handleAddToCart}
                    className="flex-1 bg-brand-dark text-white rounded-xl flex items-center justify-center font-bold py-2 hover:bg-brand-accent transition-colors cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4 mr-2" />
                    Thêm vào giỏ
                  </button>
                </div>

                {/* Link to detail page */}
                <Link 
                  href={`/products/${product.id}`}
                  onClick={onClose}
                  className="flex items-center justify-center text-xs font-bold text-brand-accent hover:underline gap-1.5 py-1.5 w-full text-center"
                >
                  Xem chi tiết sản phẩm <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
