import { Trophy, FileText, Sparkles, Users } from "lucide-react";
import { StaggerContainer, StaggerItem } from "@/components/animations/FadeIn";

export default function StatsBar() {
  const stats = [
    {
      icon: <Trophy className="w-5 h-5 text-brand-accent" />,
      text: "TOP 1 Luyện thi Online",
    },
    {
      icon: <FileText className="w-5 h-5 text-brand-accent" />,
      text: "784+ Bài test online",
    },
    {
      icon: <Sparkles className="w-5 h-5 text-brand-accent" />,
      text: "100% Miễn phí",
    },
    {
      icon: <Users className="w-5 h-5 text-brand-accent" />,
      text: "5,333+ Học viên mỗi ngày",
    },
  ];

  return (
    <div className="w-full bg-[#F8E4DB] py-3.5 border-y border-brand-accent/20">
      <StaggerContainer className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center items-center gap-x-8 gap-y-3">
        {stats.map((item, index) => (
          <StaggerItem key={index} className="flex items-center space-x-2">
            {item.icon}
            <span className="text-sm font-bold text-brand-dark">
              {item.text}
            </span>
            {index < stats.length - 1 && (
              <span className="hidden md:inline-block ml-8 text-brand-dark/30">|</span>
            )}
          </StaggerItem>
        ))}
      </StaggerContainer>
    </div>
  );
}
