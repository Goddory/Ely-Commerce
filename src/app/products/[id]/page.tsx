"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, Star, Heart, Minus, Plus, ShoppingBag, ChevronDown, Loader2, MessageSquare, Calendar, CheckCircle, X } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations/FadeIn";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useAuth } from "@/context/AuthContext";
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

export default function ProductDetailPage() {
  const { id } = useParams();
  const { addToCart, setIsCartOpen } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { user } = useAuth();
  
  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [loading, setLoading] = useState(true);

  const isFavorite = product ? isInWishlist(product.id) : false;
  
  // Client state for interactivity
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [openAccordion, setOpenAccordion] = useState<string | null>("details");

  // Zoom and Lightbox states
  const [zoomPos, setZoomPos] = useState({ x: 0, y: 0 });
  const [isZoomed, setIsZoomed] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPos({ x, y });
  };

  // Reviews state
  interface Review {
    id: string;
    productId: string;
    rating: number;
    comment: string | null;
    createdAt: string;
    user: {
      id: string;
      username: string;
      email: string;
    };
  }

  const [reviewsList, setReviewsList] = useState<Review[]>([]);
  const [canUserReview, setCanUserReview] = useState(false);
  const [loadingReviews, setLoadingReviews] = useState(true);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [userRating, setUserRating] = useState(5);
  const [userComment, setUserComment] = useState("");
  const [submittingReview, setSubmittingReview] = useState(false);
  const [reviewError, setReviewError] = useState("");

  const fetchReviews = useCallback(() => {
    if (!id) return;
    setLoadingReviews(true);
    apiFetch<{ reviews: Review[]; averageRating: number; reviewsCount: number; canReview: boolean }>(`/reviews/product/${id}`)
      .then((data) => {
        setReviewsList(data.reviews);
        setCanUserReview(data.canReview);
        setProduct(prev => prev ? {
          ...prev,
          rating: data.averageRating,
          reviews: data.reviewsCount
        } : null);
      })
      .catch((err) => console.error("Error loading reviews:", err))
      .finally(() => setLoadingReviews(false));
  }, [id]);

  useEffect(() => {
    if (!id) return;
    Promise.resolve().then(() => fetchReviews());
  }, [id, user, fetchReviews]);

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
      })
      .catch((err) => console.error("Error loading product details:", err))
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    if (!isLightboxOpen || !product) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        setLightboxIndex((prev) => (prev + 1) % product.images.length);
      } else if (e.key === "ArrowLeft") {
        setLightboxIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
      } else if (e.key === "Escape") {
        setIsLightboxOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isLightboxOpen, product]);

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    setReviewError("");

    if (userRating < 1 || userRating > 5) {
      setReviewError("Vui lòng chọn số sao đánh giá.");
      return;
    }

    setSubmittingReview(true);
    try {
      await apiFetch(`/reviews`, {
        method: "POST",
        body: JSON.stringify({
          productId: id,
          rating: userRating,
          comment: userComment
        })
      });

      setUserComment("");
      setUserRating(5);
      setShowReviewForm(false);
      fetchReviews();
    } catch (err) {
      setReviewError(err instanceof Error ? err.message : "Đã xảy ra lỗi khi gửi đánh giá");
    } finally {
      setSubmittingReview(false);
    }
  };

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
            {/* Main Image with Zoom-on-Hover */}
            <div 
              className="relative aspect-[4/5] bg-gray-100 rounded-2xl overflow-hidden cursor-zoom-in group border border-brand-accent/5"
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsZoomed(true)}
              onMouseLeave={() => setIsZoomed(false)}
              onClick={() => {
                setLightboxIndex(activeImageIndex);
                setIsLightboxOpen(true);
              }}
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

      {/* Product Reviews Section */}
      <section className="mt-16 border-t border-gray-100 pt-16">
        <h2 className="text-2xl font-bold text-brand-dark mb-8 flex items-center">
          <MessageSquare className="w-6 h-6 mr-2 text-brand-accent" />
          Đánh giá từ khách hàng ({product.reviews || 0})
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Summary */}
          <div className="bg-brand-bg/30 rounded-3xl p-8 border border-brand-accent/5 flex flex-col items-center justify-center text-center h-fit">
            <p className="text-5xl font-black text-brand-dark mb-2">
              {product.rating > 0 ? product.rating.toFixed(1) : "0.0"}
            </p>
            <div className="flex items-center text-amber-500 gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`w-6 h-6 ${i < Math.floor(product.rating || 0) ? "fill-current" : "fill-transparent"}`} 
                />
              ))}
            </div>
            <p className="text-sm text-gray-500 font-medium mb-6">
              Dựa trên {product.reviews || 0} đánh giá thực tế
            </p>
            
            {canUserReview && (
              <button
                onClick={() => setShowReviewForm(!showReviewForm)}
                className="w-full bg-brand-dark text-white font-bold py-3 px-6 rounded-2xl shadow-md hover:bg-brand-accent transition-all hover:scale-105 active:scale-95 text-sm cursor-pointer"
              >
                {showReviewForm ? "Đóng form viết đánh giá" : "Viết đánh giá sản phẩm"}
              </button>
            )}
            
            {!canUserReview && !user && (
              <div className="text-xs text-brand-text-secondary border border-brand-accent/10 rounded-xl p-3 bg-white w-full">
                Bạn cần <Link href="/login" className="text-brand-accent font-bold hover:underline">đăng nhập</Link> và mua sản phẩm này để có thể viết đánh giá.
              </div>
            )}

            {!canUserReview && user && reviewsList.every(r => r.user.id !== user.id) && (
              <div className="text-xs text-brand-text-secondary border border-brand-accent/10 rounded-xl p-3 bg-white w-full">
                Bạn chỉ có thể đánh giá sản phẩm này sau khi đơn hàng của bạn được giao thành công.
              </div>
            )}

            {!canUserReview && user && reviewsList.some(r => r.user.id === user.id) && (
              <div className="text-xs text-brand-text-secondary border border-brand-accent/10 rounded-xl p-3 bg-white w-full flex items-center justify-center gap-1.5 font-semibold text-emerald-600">
                <CheckCircle className="w-4 h-4" /> Bạn đã đánh giá sản phẩm này.
              </div>
            )}
          </div>

          {/* Reviews List & Write Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Review Form */}
            <AnimatePresence>
              {showReviewForm && canUserReview && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden bg-white border border-gray-100 rounded-3xl p-6 md:p-8 shadow-sm space-y-4"
                >
                  <h3 className="text-lg font-bold text-brand-dark">Chia sẻ trải nghiệm của bạn</h3>
                  
                  {reviewError && (
                    <div className="bg-red-50 text-red-600 p-3.5 rounded-2xl text-xs font-semibold border border-red-100">
                      {reviewError}
                    </div>
                  )}

                  <form onSubmit={handleSubmitReview} className="space-y-4">
                    {/* Stars Select */}
                    <div>
                      <label className="block text-sm font-semibold text-brand-dark mb-1.5">
                        Đánh giá của bạn <span className="text-brand-accent">*</span>
                      </label>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            type="button"
                            key={star}
                            onClick={() => setUserRating(star)}
                            className="text-amber-500 hover:scale-110 transition-transform focus:outline-none cursor-pointer"
                          >
                            <Star 
                              className={`w-7 h-7 ${star <= userRating ? "fill-current" : "fill-transparent"}`} 
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Comment */}
                    <div>
                      <label htmlFor="comment-textarea" className="block text-sm font-semibold text-brand-dark mb-1.5">
                        Nhận xét chi tiết
                      </label>
                      <textarea
                        id="comment-textarea"
                        rows={4}
                        value={userComment}
                        onChange={(e) => setUserComment(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded-2xl text-brand-dark text-sm focus:outline-none focus:ring-2 focus:ring-brand-accent resize-none"
                        placeholder="Hãy chia sẻ cảm nhận của bạn về chất liệu, form dáng, màu sắc..."
                      />
                    </div>

                    <div className="flex justify-end gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => setShowReviewForm(false)}
                        className="px-5 py-2.5 border border-gray-200 rounded-2xl text-brand-dark text-sm font-bold hover:bg-gray-50 transition-colors cursor-pointer"
                      >
                        Hủy
                      </button>
                      <button
                        type="submit"
                        disabled={submittingReview}
                        className="px-6 py-2.5 bg-brand-dark text-white rounded-2xl text-sm font-bold hover:bg-brand-accent transition-colors flex items-center justify-center min-w-[120px] cursor-pointer"
                      >
                        {submittingReview ? <Loader2 className="animate-spin w-4 h-4" /> : "Gửi đánh giá"}
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>

            {/* List */}
            {loadingReviews ? (
              <div className="flex justify-center items-center py-12">
                <Loader2 className="animate-spin w-8 h-8 text-brand-accent" />
              </div>
            ) : reviewsList.length === 0 ? (
              <div className="text-center py-12 bg-gray-50/50 border border-dashed border-gray-200 rounded-3xl text-gray-500">
                Chưa có đánh giá nào. Hãy là người đầu tiên mua sản phẩm và chia sẻ cảm nhận!
              </div>
            ) : (
              <div className="space-y-6">
                {reviewsList.map((review) => (
                  <div key={review.id} className="bg-white border border-gray-50 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-3 gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-brand-dark">{review.user.username}</span>
                          <span className="inline-flex items-center gap-1 bg-emerald-50 border border-emerald-100 text-emerald-600 text-[10px] font-bold px-2 py-0.5 rounded-full">
                            <CheckCircle className="w-3 h-3 fill-emerald-600 text-white" /> Đã mua hàng
                          </span>
                        </div>
                        <div className="flex items-center text-amber-500 gap-0.5 mt-1">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`w-4 h-4 ${i < review.rating ? "fill-current" : "fill-transparent"}`} 
                            />
                          ))}
                        </div>
                      </div>
                      
                      <span className="text-xs text-gray-400 font-medium flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(review.createdAt).toLocaleDateString("vi-VN", {
                          year: "numeric",
                          month: "short",
                          day: "numeric"
                        })}
                      </span>
                    </div>
                    {review.comment && (
                      <p className="text-gray-600 text-sm leading-relaxed mt-2 pl-0.5">
                        {review.comment}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {isLightboxOpen && product && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/95 backdrop-blur-md p-4"
          >
            {/* Close Button */}
            <button 
              onClick={() => setIsLightboxOpen(false)}
              className="absolute top-6 right-6 text-white/70 hover:text-white p-2 hover:bg-white/10 rounded-full transition-colors z-50 cursor-pointer"
            >
              <X className="w-8 h-8" />
            </button>

            {/* Carousel Container */}
            <div className="relative w-full max-w-4xl aspect-[4/5] md:aspect-video flex items-center justify-center">
              {/* Left Arrow */}
              <button 
                onClick={() => setLightboxIndex((prev) => (prev - 1 + product.images.length) % product.images.length)}
                className="absolute left-4 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-colors z-10 cursor-pointer"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Main Image */}
              <div className="relative w-full h-full max-h-[80vh] flex items-center justify-center overflow-hidden">
                <motion.div
                  key={lightboxIndex}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="relative w-full h-full"
                >
                  <Image 
                    src={product.images[lightboxIndex]} 
                    alt={`${product.name} view`}
                    fill
                    className="object-contain"
                  />
                </motion.div>
              </div>

              {/* Right Arrow */}
              <button 
                onClick={() => setLightboxIndex((prev) => (prev + 1) % product.images.length)}
                className="absolute right-4 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-colors z-10 cursor-pointer"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Thumbnails at the Bottom */}
            <div className="flex gap-3 mt-6 overflow-x-auto max-w-full pb-2">
              {product.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setLightboxIndex(index)}
                  className={`relative w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                    index === lightboxIndex ? "border-brand-accent scale-105" : "border-transparent opacity-65 hover:opacity-100"
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
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

