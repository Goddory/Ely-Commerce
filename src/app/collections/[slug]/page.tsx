"use client";

import Link from "next/link";
import { useParams, useSearchParams, useRouter, usePathname } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { ChevronRight, Loader2 } from "lucide-react";
import ProductCard from "@/components/shared/ProductCard";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations/FadeIn";
import { apiFetch } from "@/utils/api";

interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  originalPrice: number;
  imageUrl: string;
  stock: number;
  isNew: boolean;
  categoryId: string;
  averageRating?: number;
  reviewsCount?: number;
}

interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

function CollectionContent() {
  const { slug } = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [products, setProducts] = useState<Product[]>([]);
  const [categoryInfo, setCategoryInfo] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const priceRange = searchParams.get("priceRange") || "";
  const sort = searchParams.get("sort") || "newest";
  const pageStr = searchParams.get("page") || "1";
  const page = parseInt(pageStr, 10) || 1;

  useEffect(() => {
    if (!slug) return;
    // Fetch category details
    apiFetch<Category[]>("/categories")
      .then((data) => {
        const found = data.find((c) => c.id === slug || c.slug === slug);
        if (found) {
          setCategoryInfo(found);
        }
      })
      .catch((err) => console.error("Error loading categories:", err));
  }, [slug]);

  useEffect(() => {
    if (!slug) return;
    Promise.resolve().then(() => setLoading(true));

    let minPrice: number | null = null;
    let maxPrice: number | null = null;

    if (priceRange === "price-1") {
      maxPrice = 200000;
    } else if (priceRange === "price-2") {
      minPrice = 200000;
      maxPrice = 500000;
    } else if (priceRange === "price-3") {
      minPrice = 500000;
      maxPrice = 1000000;
    } else if (priceRange === "price-4") {
      minPrice = 1000000;
    }

    const queryParams = new URLSearchParams();
    queryParams.append("category", slug as string);
    if (minPrice !== null) queryParams.append("minPrice", minPrice.toString());
    if (maxPrice !== null) queryParams.append("maxPrice", maxPrice.toString());
    queryParams.append("sort", sort);
    queryParams.append("page", page.toString());
    queryParams.append("limit", "8");

    apiFetch<{ products: Product[]; total: number; page: number; pages: number }>(
      `/products?${queryParams.toString()}`
    )
      .then((data) => {
        setProducts(data.products);
        setTotal(data.total);
        setTotalPages(data.pages);
      })
      .catch((err) => console.error("Error loading collection products:", err))
      .finally(() => setLoading(false));
  }, [slug, priceRange, sort, page]);

  const updateQueryParam = (updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === "") {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });
    if (!updates.hasOwnProperty("page")) {
      params.delete("page");
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  const collectionName = categoryInfo?.name || (typeof slug === "string" ? slug.toUpperCase() : "Bộ sưu tập");

  return (
    <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 w-full">
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
              <Link href="/collections" className="hover:text-brand-accent transition-colors">
                Bộ sưu tập
              </Link>
            </div>
          </li>
          <li aria-current="page">
            <div className="flex items-center">
              <ChevronRight className="w-4 h-4 mx-1" />
              <span className="text-brand-dark font-medium">{collectionName}</span>
            </div>
          </li>
        </ol>
      </nav>

      <FadeIn direction="up">
        <div className="flex flex-col md:flex-row justify-between items-end md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-brand-dark">{collectionName}</h1>
            {categoryInfo?.description && (
              <p className="text-brand-text-secondary mt-2 max-w-xl">{categoryInfo.description}</p>
            )}
            <p className="text-brand-text-secondary mt-2">Hiển thị {total} kết quả</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center border border-gray-200 rounded-lg px-3 py-2 bg-white">
              <span className="text-sm text-gray-500 mr-2">Sắp xếp:</span>
              <select 
                value={sort}
                onChange={(e) => updateQueryParam({ sort: e.target.value })}
                className="bg-transparent text-sm font-medium text-brand-dark focus:outline-none cursor-pointer"
              >
                <option value="newest">Mới nhất</option>
                <option value="price-asc">Giá: Thấp đến Cao</option>
                <option value="price-desc">Giá: Cao đến Thấp</option>
              </select>
            </div>
          </div>
        </div>
      </FadeIn>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Filters - Desktop Only */}
        <div className="hidden md:block w-64 flex-shrink-0 space-y-8">
          <FadeIn direction="right" delay={0.1}>
            <div>
              <h3 className="text-lg font-bold text-brand-dark mb-4">Mức giá</h3>
              <ul className="space-y-3">
                {[
                  { id: 'price-1', label: 'Dưới 200.000đ' },
                  { id: 'price-2', label: '200.000đ - 500.000đ' },
                  { id: 'price-3', label: '500.000đ - 1.000.000đ' },
                  { id: 'price-4', label: 'Trên 1.000.000đ' },
                ].map((price) => (
                  <li key={price.id} className="flex items-center">
                    <input 
                      type="checkbox" 
                      id={price.id} 
                      checked={priceRange === price.id}
                      onChange={() => updateQueryParam({ priceRange: priceRange === price.id ? null : price.id })}
                      className="w-4 h-4 rounded border-gray-300 text-brand-dark focus:ring-brand-dark cursor-pointer"
                    />
                    <label htmlFor={price.id} className="ml-2 text-sm text-gray-600 cursor-pointer hover:text-brand-dark">
                      {price.label}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        </div>

        {/* Product Grid */}
        <div className="flex-1">
          {loading ? (
            <div className="flex justify-center items-center min-h-[400px]">
              <Loader2 className="animate-spin w-10 h-10 text-brand-accent" />
            </div>
          ) : products.length === 0 ? (
            <div className="flex flex-col justify-center items-center min-h-[400px] text-gray-500">
              <p className="text-lg font-medium mb-2">Không tìm thấy sản phẩm nào</p>
              <p className="text-sm">Hãy thử thay đổi bộ lọc</p>
            </div>
          ) : (
            <>
              <StaggerContainer>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                  {products.map((product) => (
                    <StaggerItem key={product.id}>
                      <ProductCard 
                        id={product.id}
                        name={product.name}
                        image={product.imageUrl}
                        price={`${product.price.toLocaleString("vi-VN")}₫`}
                        isNew={product.isNew}
                        rating={product.averageRating}
                        reviewsCount={product.reviewsCount}
                      />
                    </StaggerItem>
                  ))}
                </div>
              </StaggerContainer>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-12 flex justify-center">
                  <nav className="flex items-center space-x-2">
                    <button 
                      onClick={() => updateQueryParam({ page: (page - 1).toString() })}
                      className="w-10 h-10 rounded-lg flex items-center justify-center border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-50" 
                      disabled={page <= 1}
                    >
                      <ChevronRight className="w-5 h-5 rotate-180" />
                    </button>
                    {[...Array(totalPages)].map((_, index) => {
                      const pageNum = index + 1;
                      return (
                        <button 
                          key={pageNum}
                          onClick={() => updateQueryParam({ page: pageNum.toString() })}
                          className={`w-10 h-10 rounded-lg flex items-center justify-center font-medium transition-colors ${
                            page === pageNum 
                              ? "bg-brand-dark text-white" 
                              : "border border-gray-200 text-brand-dark hover:bg-gray-50"
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                    <button 
                      onClick={() => updateQueryParam({ page: (page + 1).toString() })}
                      className="w-10 h-10 rounded-lg flex items-center justify-center border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors"
                      disabled={page >= totalPages}
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </nav>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </main>
  );
}

export default function CollectionDetailPage() {
  return (
    <Suspense fallback={
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-dark"></div>
      </div>
    }>
      <CollectionContent />
    </Suspense>
  );
}
