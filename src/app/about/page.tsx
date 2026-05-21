import Link from "next/link";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations/FadeIn";
import { Target, BookOpen, Monitor, Heart, GraduationCap, BarChart3, Users } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="flex-1 w-full bg-white">
      {/* Hero Section — gradient instead of broken external image */}
      <section className="relative h-[40vh] min-h-[400px] w-full flex items-center justify-center overflow-hidden bg-gradient-to-br from-brand-accent-light via-brand-bg to-white">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-accent/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-brand-accent-light/40 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 text-center px-4">
          <FadeIn direction="up">
            <h1 className="text-4xl md:text-6xl font-bold text-brand-dark mb-4 tracking-tight">Về ely_edu.</h1>
            <p className="text-brand-text-secondary text-lg md:text-xl max-w-2xl mx-auto font-medium">
              Nền tảng luyện thi trực tuyến, đồng hành cùng bạn chinh phục kỳ thi.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-20 md:py-32 px-4 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-24">
          <FadeIn direction="right" className="w-full md:w-1/2">
            <div className="relative aspect-[4/5] w-full max-w-md mx-auto rounded-[40px] overflow-hidden bg-gradient-to-br from-brand-accent-light to-brand-bg flex items-center justify-center shadow-2xl">
              <div className="text-center p-8">
                <div className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center text-brand-accent mx-auto mb-6 shadow-lg">
                  <BookOpen className="w-12 h-12" />
                </div>
                <p className="text-3xl font-bold text-brand-dark mb-2">784+</p>
                <p className="text-brand-text-secondary font-medium">Bài test online</p>
                <div className="mt-6 flex justify-center gap-4">
                  <div className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
                    <p className="text-lg font-bold text-brand-accent">100%</p>
                    <p className="text-xs text-brand-text-secondary">Miễn phí</p>
                  </div>
                  <div className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
                    <p className="text-lg font-bold text-brand-accent">4.9</p>
                    <p className="text-xs text-brand-text-secondary">Đánh giá</p>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn direction="left" delay={0.2} className="w-full md:w-1/2 text-center md:text-left">
            <h2 className="text-brand-accent text-sm md:text-base font-bold tracking-widest uppercase mb-4">
              Sứ Mệnh Của Chúng Tôi
            </h2>
            <h3 className="text-3xl md:text-5xl font-bold text-brand-dark mb-6 leading-tight">
              Giúp mọi học sinh <br className="hidden md:block" />
              tự tin đi thi
            </h3>
            <div className="space-y-4 text-brand-text-secondary text-lg">
              <p>
                Ely Edu ra đời với mong muốn mang đến cho học sinh trên toàn quốc một nền tảng
                luyện thi online miễn phí, chất lượng và dễ tiếp cận.
              </p>
              <p>
                Chúng tôi tin rằng mọi học sinh đều xứng đáng được ôn tập với tài liệu tốt nhất,
                mô phỏng sát thực tế thi thật, để bước vào phòng thi với tâm lý vững vàng.
              </p>
              <p>
                Từ kho đề thi được biên soạn kỹ lưỡng đến hệ thống phân tích điểm yếu thông minh,
                mỗi tính năng của Ely Edu đều hướng tới một mục tiêu: giúp bạn đạt điểm cao nhất.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Core Values — emojis replaced with Lucide icons */}
      <section className="py-20 md:py-32 px-4 bg-brand-bg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-accent-light/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/60 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

        <div className="max-w-7xl mx-auto relative z-10">
          <FadeIn direction="up" className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-4">Giá Trị Cốt Lõi</h2>
            <p className="text-brand-text-secondary text-lg max-w-2xl mx-auto">
              Những nguyên tắc nền tảng định hướng cho mọi hoạt động và sản phẩm của Ely Edu.
            </p>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Target,
                title: "Chất Lượng Đề",
                description: "Mỗi đề thi đều được biên soạn kỹ lưỡng, bám sát cấu trúc và ma trận kiến thức mới nhất."
              },
              {
                icon: Monitor,
                title: "Trải Nghiệm Thi Máy",
                description: "Mô phỏng chính xác giao diện thi, giúp quen thuộc thao tác trước ngày thi."
              },
              {
                icon: BookOpen,
                title: "Phân Tích Thông Minh",
                description: "Hệ thống tự động phân tích điểm yếu, đề xuất lộ trình ôn tập cá nhân hoá."
              },
              {
                icon: Heart,
                title: "Miễn Phí Cho Cộng Đồng",
                description: "100% miễn phí, không quảng cáo. Cam kết đồng hành với mọi học sinh."
              }
            ].map((value, idx) => (
              <StaggerItem key={idx}>
                <div className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 h-full cursor-pointer">
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

      {/* Target Audience — emojis replaced with Lucide icons */}
      <section className="py-20 md:py-32 px-4 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row-reverse items-center gap-12 md:gap-24">
          <FadeIn direction="left" className="w-full md:w-1/2">
            <div className="relative w-full aspect-video md:aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-brand-accent-light/60 to-brand-bg flex items-center justify-center shadow-lg">
              <div className="grid grid-cols-2 gap-4 p-8">
                <div className="bg-white/90 backdrop-blur-sm p-4 rounded-2xl shadow-sm text-center">
                  <GraduationCap className="w-8 h-8 text-brand-accent mx-auto mb-2" />
                  <p className="text-2xl font-bold text-brand-dark">12</p>
                  <p className="text-xs text-brand-text-secondary">Môn THPT</p>
                </div>
                <div className="bg-white/90 backdrop-blur-sm p-4 rounded-2xl shadow-sm text-center">
                  <BarChart3 className="w-8 h-8 text-brand-accent mx-auto mb-2" />
                  <p className="text-2xl font-bold text-brand-dark">3</p>
                  <p className="text-xs text-brand-text-secondary">Trường ĐGNL</p>
                </div>
                <div className="bg-white/90 backdrop-blur-sm p-4 rounded-2xl shadow-sm text-center col-span-2">
                  <Users className="w-8 h-8 text-brand-accent mx-auto mb-2" />
                  <p className="text-2xl font-bold text-brand-dark">5,333+</p>
                  <p className="text-xs text-brand-text-secondary">Học viên mỗi ngày</p>
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn direction="right" delay={0.2} className="w-full md:w-1/2 text-center md:text-left">
            <h2 className="text-3xl md:text-5xl font-bold text-brand-dark mb-6">
              Ely Edu phù hợp <br className="hidden md:block" /> với ai?
            </h2>
            <p className="text-brand-text-secondary text-lg mb-8">
              Dù bạn là ai, Ely Edu đều có lộ trình phù hợp để giúp bạn chinh phục mục tiêu.
            </p>

            <div className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 flex items-start gap-4">
                <div className="w-10 h-10 bg-brand-accent-light rounded-xl flex items-center justify-center text-brand-accent flex-shrink-0">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-brand-dark mb-1">Học sinh lớp 12</h4>
                  <p className="text-gray-600">Ôn thi Tốt nghiệp THPT với hàng trăm đề thi thử chuẩn format.</p>
                </div>
              </div>
              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 flex items-start gap-4">
                <div className="w-10 h-10 bg-brand-accent-light rounded-xl flex items-center justify-center text-brand-accent flex-shrink-0">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-brand-dark mb-1">Thí sinh ĐGNL & ĐGTD</h4>
                  <p className="text-gray-600">Luyện đề ĐGNL các trường ĐH hàng đầu: ĐHQG TP.HCM, ĐHQG HN, Bách Khoa.</p>
                </div>
              </div>
              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 flex items-start gap-4">
                <div className="w-10 h-10 bg-brand-accent-light rounded-xl flex items-center justify-center text-brand-accent flex-shrink-0">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-brand-dark mb-1">Giáo viên & Phụ huynh</h4>
                  <p className="text-gray-600">Theo dõi tiến độ, giao bài tập và đánh giá năng lực học sinh hiệu quả.</p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <Link
                href="/tot-nghiep-thpt"
                className="inline-block bg-brand-dark text-white px-8 py-4 rounded-full font-bold hover:bg-brand-accent transition-colors shadow-lg cursor-pointer"
              >
                Bắt đầu luyện thi ngay
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}
