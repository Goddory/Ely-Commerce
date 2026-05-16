import Image from "next/image";
import Link from "next/link";
import { StaggerContainer, StaggerItem } from "@/components/animations/FadeIn";

export default function Categories() {
  const categories = [
    {
      title: "Áo Thun",
      image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80",
      link: "/collections/ao-thun",
    },
    {
      title: "Áo Khoác",
      image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80",
      link: "/collections/ao-khoac",
    },
    {
      title: "Phụ Kiện",
      image: "https://images.unsplash.com/photo-1523206489230-c012c64b2b48?w=800&q=80",
      link: "/collections/phu-kien",
    },
  ];

  return (
    <section className="py-12 px-4 max-w-7xl mx-auto">
      <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map((category, index) => (
          <StaggerItem key={index}>
            <Link href={category.link} className="group relative block aspect-[4/5] overflow-hidden rounded-3xl bg-brand-bg shadow-sm">
              <Image
                src={category.image}
                alt={category.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
              
              <div className="absolute bottom-0 left-0 p-8 w-full">
                <h3 className="text-white text-3xl font-bold tracking-tight mb-2">
                  {category.title}
                </h3>
                <span className="inline-flex items-center text-white/90 font-medium group-hover:text-brand-accent-light transition-colors">
                  Khám phá ngay &rarr;
                </span>
              </div>
            </Link>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
}
