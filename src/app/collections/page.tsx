import Image from "next/image";
import Link from "next/link";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations/FadeIn";

const COLLECTIONS = [
  {
    id: "ao-thun",
    title: "Áo Thun",
    description: "Khám phá bộ sưu tập áo thun năng động, trẻ trung và thoáng mát cho mọi hoạt động thường ngày.",
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=1000&q=80",
    itemCount: 24,
  },
  {
    id: "ao-khoac",
    title: "Áo Khoác",
    description: "Những chiếc áo khoác với thiết kế hiện đại, giữ ấm tốt và cực kỳ thời trang.",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=1000&q=80",
    itemCount: 15,
  },
  {
    id: "quan-jean",
    title: "Quần Jean & Kaki",
    description: "Đa dạng các mẫu quần jean ống rộng, kaki năng động tôn dáng hoàn hảo.",
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=1000&q=80",
    itemCount: 18,
  },
  {
    id: "vay-dam",
    title: "Váy & Chân Váy",
    description: "Dịu dàng, thanh lịch nhưng không kém phần phá cách với các thiết kế mới nhất.",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1000&q=80",
    itemCount: 12,
  },
  {
    id: "phu-kien",
    title: "Phụ Kiện",
    description: "Tạo điểm nhấn cho outfit của bạn với các phụ kiện độc đáo từ Ely.",
    image: "https://images.unsplash.com/photo-1523206489230-c012c64b2b48?w=1000&q=80",
    itemCount: 36,
  },
];

export default function CollectionsPage() {
  return (
    <main className="flex-1 w-full bg-white">
      {/* Hero Section */}
      <section className="bg-brand-bg py-16 md:py-24 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <FadeIn direction="up">
            <h1 className="text-4xl md:text-5xl font-bold text-brand-dark mb-4">Bộ Sưu Tập</h1>
            <p className="text-brand-text-secondary text-lg">
              Duyệt qua các bộ sưu tập thời trang theo từng danh mục. Tìm kiếm phong cách phù hợp nhất với cá tính của riêng bạn.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Collections Grid */}
      <section className="py-16 md:py-24 px-4 max-w-7xl mx-auto">
        <StaggerContainer className="flex flex-col gap-12 md:gap-20">
          {COLLECTIONS.map((collection, index) => {
            const isEven = index % 2 === 0;
            return (
              <StaggerItem key={collection.id}>
                <div className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8 md:gap-16`}>
                  
                  {/* Image */}
                  <div className="w-full md:w-1/2 aspect-[4/3] relative rounded-3xl overflow-hidden group shadow-lg">
                    <Image
                      src={collection.image}
                      alt={collection.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
                  </div>

                  {/* Content */}
                  <div className="w-full md:w-1/2 text-center md:text-left flex flex-col justify-center">
                    <span className="text-brand-accent font-semibold tracking-wider uppercase mb-2 text-sm">
                      {collection.itemCount} Sản Phẩm
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-4">
                      {collection.title}
                    </h2>
                    <p className="text-brand-text-secondary text-lg mb-8 max-w-lg mx-auto md:mx-0">
                      {collection.description}
                    </p>
                    <div>
                      <Link 
                        href={`/collections/${collection.id}`}
                        className="inline-block bg-brand-dark text-white px-8 py-3 rounded-full font-medium hover:bg-brand-accent hover:shadow-lg transition-all hover:-translate-y-1"
                      >
                        Khám phá bộ sưu tập
                      </Link>
                    </div>
                  </div>

                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </section>
    </main>
  );
}
