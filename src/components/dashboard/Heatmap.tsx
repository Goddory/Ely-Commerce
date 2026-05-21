"use client";

import { HeatmapItem } from "@/lib/features/dashboardSlice";
import { Calendar, Info } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

interface HeatmapProps {
  data: HeatmapItem[];
  activeProgram: "thpt" | "dgnl";
}

export default function Heatmap({ data, activeProgram }: HeatmapProps) {
  const isThpt = activeProgram === "thpt";
  const [hoveredDay, setHoveredDay] = useState<HeatmapItem | null>(null);

  // Align data so it starts on a Monday
  const prepareHeatmapGrid = () => {
    if (!data || data.length === 0) return [];
    
    // Copy data
    const list = [...data];
    
    // Find the day of the week of the first item
    const firstDate = new Date(list[0].date);
    // getDay() is 0 for Sun, 1 for Mon, etc.
    // We want Monday (1) to be index 0, Tuesday (2) to be 1... Sunday (0) to be 6.
    const firstDayIndex = (firstDate.getDay() + 6) % 7;
    
    // Pad the beginning with dummy items if it doesn't start on Monday
    const paddedList: (HeatmapItem & { isDummy?: boolean })[] = [];
    for (let i = 0; i < firstDayIndex; i++) {
      const dummyDate = new Date(firstDate);
      dummyDate.setDate(firstDate.getDate() - (firstDayIndex - i));
      paddedList.push({
        date: dummyDate.toISOString().split("T")[0],
        count: -1, // representing empty/inactive dummy day
        isDummy: true,
      });
    }
    
    // Add real items
    paddedList.push(...list);
    
    // Pad the end to complete the last week (multiple of 7)
    const totalSlots = Math.ceil(paddedList.length / 7) * 7;
    const lastDate = new Date(paddedList[paddedList.length - 1].date);
    const needed = totalSlots - paddedList.length;
    for (let i = 1; i <= needed; i++) {
      const dummyDate = new Date(lastDate);
      dummyDate.setDate(lastDate.getDate() + i);
      paddedList.push({
        date: dummyDate.toISOString().split("T")[0],
        count: -1,
        isDummy: true,
      });
    }
    
    return paddedList;
  };

  const gridItems = prepareHeatmapGrid();
  
  // Calculate total questions solved in the last 90 days
  const totalSolved = data.reduce((acc, curr) => acc + (curr.count > 0 ? curr.count : 0), 0);

  // Helper to determine the color level
  const getColorLevel = (count: number) => {
    if (count === -1) return "bg-transparent"; // dummy padded cell
    if (count === 0) return "bg-gray-100 hover:bg-gray-200";
    
    if (isThpt) {
      // Orange levels
      if (count <= 15) return "bg-orange-200 hover:bg-orange-300";
      if (count <= 30) return "bg-orange-300 hover:bg-orange-400";
      if (count <= 45) return "bg-brand-accent hover:bg-brand-accent/90";
      return "bg-orange-700 hover:bg-orange-800";
    } else {
      // Teal levels
      if (count <= 15) return "bg-teal-200 hover:bg-teal-300";
      if (count <= 30) return "bg-teal-300 hover:bg-teal-400";
      if (count <= 45) return "bg-teal-500 hover:bg-teal-600";
      return "bg-teal-700 hover:bg-teal-800";
    }
  };

  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString("vi-VN", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  const activeColor = isThpt ? "text-brand-accent" : "text-teal-600";
  const activeBg = isThpt ? "bg-brand-accent" : "bg-teal-600";

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-brand-accent-light/40">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="font-bold text-brand-dark flex items-center gap-2 text-lg">
            <Calendar className={`w-5 h-5 ${activeColor}`} />
            Lịch sử chăm chỉ (90 ngày qua)
          </h3>
          <p className="text-sm text-brand-text-secondary mt-0.5">
            Tổng cộng: <span className="font-extrabold text-brand-dark">{totalSolved} câu hỏi</span> đã được giải.
          </p>
        </div>
        
        {/* Legend */}
        <div className="flex items-center gap-1.5 text-xs text-brand-text-secondary">
          <span>Ít</span>
          <div className="w-3 h-3 bg-gray-100 rounded-sm" />
          <div className={`w-3 h-3 rounded-sm ${isThpt ? "bg-orange-200" : "bg-teal-200"}`} />
          <div className={`w-3 h-3 rounded-sm ${isThpt ? "bg-orange-300" : "bg-teal-300"}`} />
          <div className={`w-3 h-3 rounded-sm ${isThpt ? "bg-brand-accent" : "bg-teal-500"}`} />
          <div className={`w-3 h-3 rounded-sm ${isThpt ? "bg-orange-700" : "bg-teal-700"}`} />
          <span>Nhiều</span>
        </div>
      </div>

      <div className="relative">
        {/* Heatmap Grid */}
        <div className="flex">
          {/* Day of week labels */}
          <div className="flex flex-col justify-between text-[10px] text-brand-text-secondary pr-2 py-0.5 select-none w-6 h-[116px]">
            <span>T2</span>
            <span>T4</span>
            <span>T6</span>
            <span>CN</span>
          </div>
          
          {/* Heatmap Squares */}
          <div className="flex-1 overflow-x-auto no-scrollbar pb-2">
            <div className="grid grid-rows-7 grid-flow-col gap-1 w-max h-[116px]">
              {gridItems.map((item, idx) => {
                const isDummy = item.isDummy;
                const levelColor = getColorLevel(item.count);
                
                return (
                  <div
                    key={idx}
                    onMouseEnter={() => !isDummy && setHoveredDay(item)}
                    onMouseLeave={() => setHoveredDay(null)}
                    className={`w-3 h-3 rounded-[2px] transition-colors cursor-pointer ${levelColor} ${
                      isDummy ? "pointer-events-none opacity-20" : ""
                    }`}
                  />
                );
              })}
            </div>
          </div>
        </div>

        {/* Floating Tooltip details */}
        <div className="mt-4 min-h-[38px] flex items-center justify-center bg-brand-bg rounded-xl p-2 border border-brand-accent-light/30">
          {hoveredDay ? (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 text-xs font-bold text-brand-dark"
            >
              <Info className={`w-4 h-4 ${activeColor}`} />
              <span>
                {formatDate(hoveredDay.date)}:
              </span>
              <span className={`px-2 py-0.5 rounded-full text-white text-[10px] ${activeBg}`}>
                {hoveredDay.count === 0 ? "Không có câu nào" : `${hoveredDay.count} câu hỏi`}
              </span>
            </motion.div>
          ) : (
            <span className="text-xs text-brand-text-secondary flex items-center gap-1.5">
              Hover chuột lên các ô vuông để xem số câu hỏi đã giải quyết trong ngày.
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
