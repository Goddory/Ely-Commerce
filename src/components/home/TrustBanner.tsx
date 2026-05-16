import { Truck, RotateCcw, ShieldCheck } from "lucide-react";
import { StaggerContainer, StaggerItem } from "@/components/animations/FadeIn";

export default function TrustBanner() {
  const trustItems = [
    {
      icon: <Truck className="w-5 h-5 text-brand-accent" />,
      text: "Miễn phí ship đơn từ 500k",
    },
    {
      icon: <RotateCcw className="w-5 h-5 text-brand-accent" />,
      text: "Đổi trả 30 ngày",
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-brand-accent" />,
      text: "Thanh toán bảo mật",
    },
  ];

  return (
    <div className="w-full bg-[#F8E4DB] py-3 border-y border-brand-accent/20">
      <StaggerContainer className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center items-center gap-x-8 gap-y-3">
        {trustItems.map((item, index) => (
          <StaggerItem key={index} className="flex items-center space-x-2">
            {item.icon}
            <span className="text-sm font-bold text-brand-dark">
              {item.text}
            </span>
            {/* Add separator if not last item, hidden on small screens for better wrapping */}
            {index < trustItems.length - 1 && (
              <span className="hidden md:inline-block ml-8 text-brand-dark/30">|</span>
            )}
          </StaggerItem>
        ))}
      </StaggerContainer>
    </div>
  );
}
