"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Tab {
  id: string;
  label: string;
}

export default function StickyNav({ activeProgram }: { activeProgram: "thpt" | "dgnl" }) {
  const tabs: Tab[] = [
    { id: "tong-quan", label: "Tổng quan" },
    { id: "tien-do", label: "Báo cáo tiến độ" },
    { id: "lich-su", label: "Lịch sử luyện tập" },
    { id: "thong-ke", label: "Thống kê chi tiết" },
  ];

  const [activeTab, setActiveTab] = useState("tong-quan");
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Determine if sticky
      if (window.scrollY > 250) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }

      // Simple scroll spy
      const sections = tabs.map((tab) => document.getElementById(tab.id));
      const scrollPosition = window.scrollY + 150; // offset for sticky nav

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveTab(tabs[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleTabClick = (id: string) => {
    setActiveTab(id);
    const element = document.getElementById(id);
    if (element) {
      const offset = 100; // offset height
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const isThpt = activeProgram === "thpt";
  const activeBg = isThpt ? "bg-brand-accent text-white" : "bg-teal-600 text-white";
  const hoverText = isThpt ? "hover:text-brand-accent" : "hover:text-teal-600";

  return (
    <div
      className={`w-full z-40 transition-all duration-300 ${
        isSticky
          ? "sticky top-0 bg-white/80 backdrop-blur-md shadow-md border-b border-brand-accent-light py-2"
          : "relative py-4 border-b border-brand-accent-light/40"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex overflow-x-auto no-scrollbar gap-1 py-1">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`relative px-5 py-2.5 rounded-full text-sm font-bold transition-all cursor-pointer whitespace-nowrap z-10 ${
                  isActive ? "text-white" : `text-brand-text-secondary ${hoverText}`
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeStickyTab"
                    className={`absolute inset-0 rounded-full -z-10 ${
                      isThpt ? "bg-brand-accent" : "bg-teal-600"
                    }`}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
