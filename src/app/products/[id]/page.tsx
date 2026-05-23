"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Star, Heart, Minus, Plus, ShoppingBag, ChevronDown, Loader2 } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations/FadeIn";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
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
  category?: {
    name: string;
  };
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
  category?: {
    name: string;
  };
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

export default function ProductDetailPage() {
  const { id } = useParams();
  const { addToCart, setIsCartOpen } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  
  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [loading, setLoading] = useState(true);

  const isFavorite = product ? isInWishlist(product.id) : false;
  
  // Client state for interactivity
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [openAccordion, setOpenAccordion] = useState<string | null>("details");

  useEffect(() => {
    if (!id) return;
    Promise.resolve().then(() => setLoading(true));
    apiFetch<ApiProductResponse>(`/products/${id}`)
      .then((data) => {
        const colors = data.colorOptions 
          ? data.colorOptions.split(",").map((c: string) => ({ name: c.trim(), hex: getColorHex(c) }))
          : [{ name: "Trắng", hex: "#FFFFFF" }];
        
        const sizes = data.sizeOptions 
          ? data.sizeOptions.split(",").map((s: string) => s.trim())
          : ["S", "M", "L", "XL"];

        setProduct({
          ...data,
          colors,
          sizes,
          images: [
            data.imageUrl,
            "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop"
          ],
          rating: 4.8,
          reviews: 124
        });
      })
      .catch((err) => console.error("Error loading product details:", err))
      .finally(() => setLoading(false));
  }, [id]);

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

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
  };

  const toggleAccordion = (section: string) => {
    setOpenAccordion(openAccordion === section ? null : section);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 className="animate-spin w-12 h-12 text-brand-accent" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[60vh] text-gray-500">
        <p className="text-xl font-medium mb-4">Không tìm thấy sản phẩm</p>
        <Link href="/products" className="bg-brand-dark text-white px-6 py-2 rounded-lg font-semibold hover:bg-brand-accent transition-colors">
          Quay lại cửa hàng
        </Link>
      </div>
    );
  }

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
          <li>
            <div className="flex items-center">
              <ChevronRight className="w-4 h-4 mx-1" />
              <Link href={`/collections/${product.categoryId}`} className="hover:text-brand-accent transition-colors">
                {product.category?.name || "Danh mục"}
              </Link>
            </div>
          </li>
          <li aria-current="page">
            <div className="flex items-center">
              <ChevronRight className="w-4 h-4 mx-1" />
              <span className="text-brand-dark font-medium line-clamp-1">{product.name}</span>
            </div>
          </li>
        </ol>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left Column: Images */}
        <FadeIn direction="up" delay={0.1}>
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-[4/5] bg-gray-100 rounded-2xl overflow-hidden group">
              <Image 
                src={product.images[activeImageIndex]} 
                alt={product.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                priority
              />
            </div>
            
            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((img, index) => (
                <button 
                  key={index} 
                  onClick={() => setActiveImageIndex(index)}
                  className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-colors ${
                    index === activeImageIndex ? "border-brand-dark" : "border-transparent hover:border-brand-accent/50"
                  }`}
                >
                  <Image 
                    src={img} 
                    alt={`${product.name} view ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Right Column: Product Info */}
        <StaggerContainer className="flex flex-col">
          <StaggerItem>
            <h1 className="text-3xl md:text-4xl font-bold text-brand-dark mb-2">
              {product.name}
            </h1>
          </StaggerItem>
          
          <StaggerItem>
            <div className="flex items-center space-x-4 mb-6">
              <div className="flex items-center text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-5 h-5 ${i < Math.floor(product.rating) ? "fill-current" : "fill-transparent"}`} />
                ))}
                <span className="ml-2 text-sm text-gray-600 font-medium">{product.rating} ({product.reviews} đánh giá)</span>
              </div>
            </div>
          </StaggerItem>

          <StaggerItem>
            <div className="flex items-baseline space-x-3 mb-6 border-b border-gray-100 pb-6">
              <span className="text-3xl font-bold text-brand-dark">
                {product.price.toLocaleString('vi-VN')}đ
              </span>
              {product.originalPrice > product.price && (
                <span className="text-lg text-gray-400 line-through">
                  {product.originalPrice.toLocaleString('vi-VN')}đ
                </span>
              )}
              {product.originalPrice > product.price && (
                <span className="px-2 py-1 bg-brand-accent/10 text-brand-accent text-xs font-bold rounded">
                  -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                </span>
              )}
            </div>
          </StaggerItem>

          <StaggerItem>
            <p className="text-gray-600 mb-8 leading-relaxed">
              {product.description}
            </p>
          </StaggerItem>

          {/* Color Selection */}
          <StaggerItem>
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-brand-dark mb-3">Màu sắc: {product.colors[selectedColor].name}</h3>
              <div className="flex space-x-3">
                {product.colors.map((color, index) => (
                  <button 
                    key={index}
                    onClick={() => setSelectedColor(index)}
                    className={`w-10 h-10 rounded-full border-2 focus:outline-none transition-transform hover:scale-110 ${
                      index === selectedColor ? "border-brand-dark" : "border-transparent ring-1 ring-gray-200"
                    }`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                    aria-label={`Chọn màu ${color.name}`}
                  />
                ))}
              </div>
            </div>
          </StaggerItem>

          {/* Size Selection */}
          <StaggerItem>
            <div className="mb-8">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-sm font-semibold text-brand-dark">Kích thước</h3>
                <button className="text-sm text-brand-accent hover:underline">Hướng dẫn chọn size</button>
              </div>
              <div className="grid grid-cols-4 gap-3">
                {product.sizes.map((size, index) => (
                  <button 
                    key={size}
                    onClick={() => setSelectedSize(index)}
                    className={`py-3 rounded-xl border font-medium transition-colors ${
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
          </StaggerItem>

          {/* Action Buttons */}
          <StaggerItem>
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              {/* Quantity */}
              <div className="flex items-center justify-between border-2 border-gray-200 rounded-xl px-4 py-3 sm:w-1/3">
                <button 
                  onClick={decrementQuantity}
                  className="text-gray-500 hover:text-brand-accent transition-colors"
                >
                  <Minus className="w-5 h-5" />
                </button>
                <span className="font-semibold text-lg text-brand-dark">{quantity}</span>
                <button 
                  onClick={incrementQuantity}
                  className="text-gray-500 hover:text-brand-accent transition-colors"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
              
              {/* Add to cart */}
              <button 
                onClick={handleAddToCart}
                className="flex-1 bg-brand-dark text-white rounded-xl flex items-center justify-center font-bold py-3 hover:bg-brand-dark/90 transition-colors cursor-pointer"
              >
                <ShoppingBag className="w-5 h-5 mr-2" />
                Thêm vào giỏ
              </button>

              {/* Wishlist */}
              <button 
                onClick={() => {
                  if (product) {
                    toggleWishlist({
                      id: product.id,
                      name: product.name,
                      price: `${product.price.toLocaleString('vi-VN')}đ`,
                      image: product.imageUrl,
                      isNew: product.isNew
                    });
                  }
                }}
                aria-label={isFavorite ? "Xóa khỏi danh sách yêu thích" : "Thêm vào danh sách yêu thích"}
                className={`sm:w-14 w-full h-14 sm:h-auto border-2 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 ${
                  isFavorite 
                    ? "border-brand-accent text-brand-accent bg-white shadow-sm" 
                    : "border-gray-200 text-gray-500 hover:border-brand-accent hover:text-brand-accent"
                }`}
              >
                <Heart className={`w-6 h-6 transition-colors ${isFavorite ? "fill-brand-accent text-brand-accent" : ""}`} />
              </button>
            </div>
          </StaggerItem>

          {/* Product Details Accordion */}
          <StaggerItem>
            <div className="border-t border-gray-100 pt-6 space-y-2">
              
              {/* Details Section */}
              <div className="border-b border-gray-100 pb-2">
                <button 
                  onClick={() => toggleAccordion("details")}
                  className="w-full flex justify-between items-center py-2 hover:text-brand-accent transition-colors"
                >
                  <h4 className="font-semibold text-brand-dark">Chi tiết sản phẩm</h4>
                  <ChevronDown className={`w-5 h-5 text-brand-dark transition-transform duration-300 ${openAccordion === "details" ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {openAccordion === "details" && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="pt-2 pb-4 text-gray-600 text-sm leading-relaxed space-y-1">
                        <p><span className="font-medium text-brand-dark">Chất liệu:</span> Cotton 100% thoáng mát</p>
                        <p><span className="font-medium text-brand-dark">Form dáng:</span> Oversize thoải mái</p>
                        <p><span className="font-medium text-brand-dark">Độ dày:</span> Vừa phải, không bị lộ</p>
                        <p><span className="font-medium text-brand-dark">Mùa phù hợp:</span> Xuân, Hè, Thu</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Shipping Section */}
              <div className="border-b border-gray-100 pb-2">
                <button 
                  onClick={() => toggleAccordion("shipping")}
                  className="w-full flex justify-between items-center py-2 hover:text-brand-accent transition-colors"
                >
                  <h4 className="font-semibold text-brand-dark">Chính sách giao hàng</h4>
                  <ChevronDown className={`w-5 h-5 text-brand-dark transition-transform duration-300 ${openAccordion === "shipping" ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {openAccordion === "shipping" && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="pt-2 pb-4 text-gray-600 text-sm leading-relaxed">
                        <p>Giao hàng toàn quốc. Miễn phí vận chuyển cho đơn hàng từ <strong>500.000đ</strong>.</p>
                        <p>Thời gian giao hàng dự kiến từ <strong>2-5 ngày làm việc</strong> tùy khu vực.</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Return Section */}
              <div className="border-b border-gray-100 pb-2">
                <button 
                  onClick={() => toggleAccordion("returns")}
                  className="w-full flex justify-between items-center py-2 hover:text-brand-accent transition-colors"
                >
                  <h4 className="font-semibold text-brand-dark">Chính sách đổi trả</h4>
                  <ChevronDown className={`w-5 h-5 text-brand-dark transition-transform duration-300 ${openAccordion === "returns" ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {openAccordion === "returns" && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="pt-2 pb-4 text-gray-600 text-sm leading-relaxed">
                        <p>Đổi trả <strong>miễn phí trong vòng 7 ngày</strong> nếu lỗi do nhà sản xuất hoặc giao sai mẫu.</p>
                        <p>Sản phẩm đổi trả phải còn nguyên tem mác, chưa qua sử dụng và chưa giặt ủi.</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </div>
          </StaggerItem>
        </StaggerContainer>
      </div>
    </main>
  );
}
