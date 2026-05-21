"use client";

import { HabitDay } from "@/lib/features/dashboardSlice";
import { CheckCircle2, AlertCircle, Circle, BookOpen, Clock } from "lucide-react";
import { motion } from "framer-motion";

interface HabitGridProps {
  habits: HabitDay[];
  activeProgram: "thpt" | "dgnl";
}

export default function HabitGrid({ habits, activeProgram }: HabitGridProps) {
  const isThpt = activeProgram === "thpt";

  const totalMinutes = habits.reduce((acc, curr) => acc + curr.duration, 0);
  const totalHours = (totalMinutes / 60).toFixed(1);

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-brand-accent-light/40">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="font-bold text-brand-dark flex items-center gap-2 text-lg">
            <CheckCircle2 className={`w-5 h-5 ${isThpt ? "text-brand-accent" : "text-teal-600"}`} />
            Tính chuyên cần tuần này
          </h3>
          <p className="text-sm text-brand-text-secondary mt-0.5">
            Duy trì thói quen học tập hàng ngày để gia tăng trí nhớ.
          </p>
        </div>
        <div className="flex items-center gap-4 bg-brand-bg px-4 py-2.5 rounded-2xl">
          <div className="flex items-center gap-1.5 text-brand-dark">
            <Clock className="w-4 h-4 text-brand-text-secondary" />
            <span className="font-bold text-sm">{totalHours} giờ</span>
          </div>
          <div className="w-px h-4 bg-brand-accent-light" />
          <div className="flex items-center gap-1.5 text-brand-dark">
            <BookOpen className="w-4 h-4 text-brand-text-secondary" />
            <span className="font-bold text-sm">
              {habits.filter((h) => h.status !== "none").length}/7 ngày
            </span>
          </div>
        </div>
      </div>

      {/* Week Grid */}
      <div className="grid grid-cols-7 gap-3">
        {habits.map((habit, idx) => {
          let bgClass = "bg-gray-50 border-gray-100 hover:bg-gray-100";
          let textClass = "text-gray-400";
          let borderIndicator = "border-gray-200";
          let icon = <Circle className="w-4 h-4 text-gray-300" />;

          if (habit.status === "done") {
            bgClass = isThpt 
              ? "bg-brand-accent-light/50 border-brand-accent/20 hover:bg-brand-accent-light" 
              : "bg-teal-50 border-teal-100 hover:bg-teal-100/70";
            textClass = isThpt ? "text-brand-accent" : "text-teal-600";
            borderIndicator = isThpt ? "border-brand-accent" : "border-teal-500";
            icon = <CheckCircle2 className={`w-4 h-4 ${isThpt ? "text-brand-accent" : "text-teal-600"}`} />;
          } else if (habit.status === "partial") {
            bgClass = "bg-amber-50 border-amber-100 hover:bg-amber-100/70";
            textClass = "text-amber-600";
            borderIndicator = "border-amber-400";
            icon = <AlertCircle className="w-4 h-4 text-amber-500" />;
          }

          return (
            <motion.div
              key={habit.dayName}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05, duration: 0.3 }}
              className={`flex flex-col items-center p-3 rounded-2xl border text-center transition-all duration-200 group relative ${bgClass}`}
            >
              {/* Day Name */}
              <span className="text-xs font-bold text-brand-dark mb-2">{habit.dayName}</span>

              {/* Status Icon */}
              <div className="mb-2">{icon}</div>

              {/* Duration */}
              <span className={`text-[10px] font-bold ${habit.duration > 0 ? "text-brand-dark" : "text-brand-text-secondary"}`}>
                {habit.duration > 0 ? `${habit.duration}m` : "-"}
              </span>

              {/* Hover tooltip for studied subjects */}
              {habit.subjects.length > 0 && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-32 p-2 bg-brand-dark text-white rounded-xl text-[10px] text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-lg z-20">
                  <div className="font-bold border-b border-white/20 pb-1 mb-1">Đã học:</div>
                  <div className="space-y-0.5">
                    {habit.subjects.map((sub, sIdx) => (
                      <div key={sIdx} className="truncate">{sub}</div>
                    ))}
                  </div>
                  <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-brand-dark" />
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
