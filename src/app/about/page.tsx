import Image from "next/image";
import Link from "next/link";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations/FadeIn";
import { Leaf, Heart, ShieldCheck, Zap } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="flex-1 w-full bg-white">
      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[400px] w-full flex items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1445205170230-053b83016050?w=1600&q=80"
          alt="Ely Commerce Fashion"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 text-center px-4">
          <FadeIn direction="up">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">Về Ely.</h1>
            <p className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto font-medium">
              Định hình phong cách, tôn vinh cá tính của riêng bạn.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 md:py-32 px-4 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-24">
          <FadeIn direction="right" className="w-full md:w-1/2">
            <div className="relative aspect-[4/5] w-full max-w-md mx-auto rounded-[40px] overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&q=80"
                alt="Câu chuyện của Ely"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-brand-dark/10" />
            </div>
          </FadeIn>
          
          <FadeIn direction="left" delay={0.2} className="w-full md:w-1/2 text-center md:text-left">
            <h2 className="text-brand-accent text-sm md:text-base font-bold tracking-widest uppercase mb-4">
              Câu Chuyện Của Chúng Tôi
            </h2>
            <h3 className="text-3xl md:text-5xl font-bold text-brand-dark mb-6 leading-tight">
              Khởi nguồn từ <br className="hidden md:block" />
              đam mê thời trang
            </h3>
            <div className="space-y-4 text-brand-text-secondary text-lg">
              <p>
                Được thành lập vào năm 2023, Ely ra đời với mong muốn mang đến những sản phẩm thời trang chất lượng cao với mức giá dễ tiếp cận nhất cho giới trẻ Việt Nam.
              </p>
              <p>
                Chúng tôi tin rằng thời trang không chỉ là những món đồ khoác lên người, mà còn là ngôn ngữ không lời để bạn thể hiện cá tính, tâm trạng và cách bạn nhìn nhận thế giới.
              </p>
              <p>
                Từ những bản phác thảo đầu tiên đến đường kim mũi chỉ cuối cùng, mỗi sản phẩm tại Ely đều được chăm chút tỉ mỉ để đảm bảo sự thoải mái và tự tin tuyệt đối cho người mặc.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 md:py-32 px-4 bg-brand-bg relative overflow-hidden">
        {/* Decor */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-accent-light/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/60 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

        <div className="max-w-7xl mx-auto relative z-10">
          <FadeIn direction="up" className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-4">Giá Trị Cốt Lõi</h2>
            <p className="text-brand-text-secondary text-lg max-w-2xl mx-auto">
              Những nguyên tắc nền tảng định hướng cho mọi hoạt động và sản phẩm của Ely.
            </p>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Heart,
                title: "Tận Tâm",
                description: "Khách hàng là trung tâm trong mọi quyết định. Chúng tôi phục vụ bằng cả trái tim."
              },
              {
                icon: ShieldCheck,
                title: "Chất Lượng",
                description: "Cam kết mang đến những sản phẩm bền bỉ, an toàn và tinh tế trong từng chi tiết."
              },
              {
                icon: Zap,
                title: "Sáng Tạo",
                description: "Không ngừng đổi mới, bắt kịp xu hướng và tạo ra những phong cách độc đáo."
              },
              {
                icon: Leaf,
                title: "Bền Vững",
                description: "Hướng tới thời trang xanh, sử dụng chất liệu thân thiện với môi trường."
              }
            ].map((value, idx) => (
              <StaggerItem key={idx}>
                <div className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 h-full">
                  <div className="w-14 h-14 bg-brand-bg rounded-2xl flex items-center justify-center text-brand-accent mb-6">
                    <value.icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-brand-dark mb-3">{value.title}</h3>
                  <p className="text-brand-text-secondary leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Store Location */}
      <section className="py-20 md:py-32 px-4 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row-reverse items-center gap-12 md:gap-24">
          <FadeIn direction="left" className="w-full md:w-1/2">
            <div className="relative aspect-video md:aspect-square w-full rounded-3xl overflow-hidden shadow-lg">
              <Image
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80"
                alt="Không gian cửa hàng Ely"
                fill
                className="object-cover"
              />
            </div>
          </FadeIn>
          
          <FadeIn direction="right" delay={0.2} className="w-full md:w-1/2 text-center md:text-left">
            <h2 className="text-3xl md:text-5xl font-bold text-brand-dark mb-6">
              Ghé thăm <br className="hidden md:block" /> Không gian Ely
            </h2>
            <p className="text-brand-text-secondary text-lg mb-8">
              Trải nghiệm mua sắm trực tiếp tại không gian mang đậm chất nghệ thuật và phong cách sống hiện đại.
            </p>
            
            <div className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                <h4 className="font-bold text-brand-dark mb-2">Store Quận 1</h4>
                <p className="text-gray-600 mb-1">123 Nguyễn Huệ, Phường Bến Nghé, Quận 1, TP.HCM</p>
                <p className="text-gray-500 text-sm">Mở cửa: 09:00 - 22:00 (T2 - CN)</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                <h4 className="font-bold text-brand-dark mb-2">Store Cầu Giấy</h4>
                <p className="text-gray-600 mb-1">456 Cầu Giấy, Phường Dịch Vọng, Quận Cầu Giấy, Hà Nội</p>
                <p className="text-gray-500 text-sm">Mở cửa: 09:00 - 22:00 (T2 - CN)</p>
              </div>
            </div>

            <div className="mt-8">
              <Link 
                href="/products"
                className="inline-block bg-brand-dark text-white px-8 py-4 rounded-full font-bold hover:bg-brand-accent transition-colors shadow-lg"
              >
                Khám phá sản phẩm trực tuyến
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}
