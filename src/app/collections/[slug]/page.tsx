import Link from "next/link";
import { ChevronRight, Filter } from "lucide-react";
import ProductCard from "@/components/shared/ProductCard";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations/FadeIn";

// Dummy data for products
const MOCK_PRODUCTS = [
  {
    id: "1",
    name: "Áo Thun Basic Oversize",
    price: "250.000đ",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800&auto=format&fit=crop",
    isNew: true,
  },
  {
    id: "2",
    name: "Quần Jean Ống Rộng",
    price: "450.000đ",
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "3",
    name: "Áo Hoodie Trơn Form Rộng",
    price: "350.000đ",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=800&auto=format&fit=crop",
    isNew: true,
  },
  {
    id: "4",
    name: "Áo Sơ Mi Tay Ngắn",
    price: "280.000đ",
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80",
  },
  {
    id: "5",
    name: "Chân Váy Xếp Ly",
    price: "220.000đ",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80",
  },
  {
    id: "6",
    name: "Áo Khoác Bomber",
    price: "550.000đ",
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "7",
    name: "Quần Short Kaki",
    price: "190.000đ",
    image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "8",
    name: "Áo Polo Thanh Lịch",
    price: "290.000đ",
    image: "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?q=80&w=800&auto=format&fit=crop",
    isNew: true,
  },
];

const COLLECTION_NAMES: Record<string, string> = {
  "ao-thun": "Áo Thun",
  "ao-khoac": "Áo Khoác",
  "quan-jean": "Quần Jean & Kaki",
  "vay-dam": "Váy & Chân Váy",
  "phu-kien": "Phụ Kiện",
  "new-arrivals": "Sản Phẩm Mới",
};

export default async function CollectionDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  
  // Get collection name, fallback to capitalized slug
  const collectionName = COLLECTION_NAMES[slug] || slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  // For demo, we just use the same mock products, maybe slightly scrambled or sliced
  const displayProducts = [...MOCK_PRODUCTS].sort(() => 0.5 - Math.random()).slice(0, 6);

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
            <p className="text-brand-text-secondary mt-2">Hiển thị {displayProducts.length} kết quả</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center border border-gray-200 rounded-lg px-3 py-2 bg-white">
              <span className="text-sm text-gray-500 mr-2">Sắp xếp:</span>
              <select className="bg-transparent text-sm font-medium text-brand-dark focus:outline-none cursor-pointer">
                <option>Phổ biến nhất</option>
                <option>Mới nhất</option>
                <option>Giá: Thấp đến Cao</option>
                <option>Giá: Cao đến Thấp</option>
              </select>
            </div>
            
            <button className="md:hidden flex items-center justify-center border border-gray-200 rounded-lg p-2 bg-white text-brand-dark">
              <Filter className="w-5 h-5" />
            </button>
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
          
          <FadeIn direction="right" delay={0.2}>
            <div>
              <h3 className="text-lg font-bold text-brand-dark mb-4">Màu sắc</h3>
              <div className="flex flex-wrap gap-3">
                {[
                  { name: "Đen", hex: "#000000" },
                  { name: "Trắng", hex: "#FFFFFF" },
                  { name: "Kem", hex: "#FBF8F3" },
                  { name: "Nâu", hex: "#554841" },
                  { name: "Đỏ Đất", hex: "#C18676" },
                  { name: "Xanh", hex: "#4A5568" },
                ].map((color) => (
                  <button 
                    key={color.name}
                    className="w-8 h-8 rounded-full border border-gray-200 shadow-sm hover:scale-110 transition-transform"
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>
          </FadeIn>

          <FadeIn direction="right" delay={0.3}>
            <div>
              <h3 className="text-lg font-bold text-brand-dark mb-4">Kích thước</h3>
              <div className="flex flex-wrap gap-2">
                {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                  <button 
                    key={size}
                    className="w-10 h-10 rounded border border-gray-200 text-sm font-medium text-gray-600 hover:border-brand-dark hover:text-brand-dark transition-colors"
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Product Grid */}
        <div className="flex-1">
          <StaggerContainer>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {displayProducts.map((product) => (
                <StaggerItem key={product.id}>
                  <ProductCard {...product} />
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>

          {/* Pagination */}
          <div className="mt-12 flex justify-center">
            <nav className="flex items-center space-x-2">
              <button className="w-10 h-10 rounded-lg flex items-center justify-center border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-50" disabled>
                <ChevronRight className="w-5 h-5 rotate-180" />
              </button>
              <button className="w-10 h-10 rounded-lg flex items-center justify-center bg-brand-dark text-white font-medium">
                1
              </button>
              <button className="w-10 h-10 rounded-lg flex items-center justify-center border border-gray-200 text-brand-dark hover:bg-gray-50 font-medium transition-colors">
                2
              </button>
              <button className="w-10 h-10 rounded-lg flex items-center justify-center border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors">
                <ChevronRight className="w-5 h-5" />
              </button>
            </nav>
          </div>
        </div>
      </div>
    </main>
  );
}
