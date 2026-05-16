import ProductCard from "@/components/shared/ProductCard";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations/FadeIn";

export default function NewArrivals() {
  const products = [
    {
      id: "1",
      name: "Áo Thun Basic Oversize",
      price: "250.000₫",
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80",
      isNew: true,
    },
    {
      id: "2",
      name: "Áo Khoác Denim Vintage",
      price: "650.000₫",
      image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&q=80",
      isNew: true,
    },
    {
      id: "3",
      name: "Quần Ống Rộng Minimalist",
      price: "420.000₫",
      image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500&q=80",
      isNew: false,
    },
    {
      id: "4",
      name: "Sơ Mi Tay Ngắn Họa Tiết",
      price: "350.000₫",
      image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=500&q=80",
      isNew: true,
    },
  ];

  return (
    <section className="py-24 px-4 max-w-7xl mx-auto">
      <FadeIn className="flex justify-between items-end mb-10">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-2">Hàng Mới Về</h2>
          <p className="text-brand-text-secondary">Những items cực "cháy" vừa cập bến.</p>
        </div>
        <button className="hidden md:block text-brand-accent font-bold hover:underline underline-offset-4 transition-all">
          Xem tất cả &rarr;
        </button>
      </FadeIn>

      <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <StaggerItem key={product.id}>
            <ProductCard {...product} />
          </StaggerItem>
        ))}
      </StaggerContainer>
      
      <div className="mt-8 text-center md:hidden">
        <button className="text-brand-accent font-bold hover:underline underline-offset-4 transition-all">
          Xem tất cả &rarr;
        </button>
      </div>
    </section>
  );
}
