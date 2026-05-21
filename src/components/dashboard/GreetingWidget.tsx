"use client";

import { useEffect, useState } from "react";
import { Flame, Target, Trophy, Clock, School } from "lucide-react";
import { StudyGoal } from "@/lib/features/dashboardSlice";
import { motion } from "framer-motion";

interface GreetingWidgetProps {
  userName?: string;
  streakDays: number;
  goal: StudyGoal;
  activeProgram: "thpt" | "dgnl";
}

export default function GreetingWidget({
  userName = "Sĩ tử Ely",
  streakDays,
  goal,
  activeProgram,
}: GreetingWidgetProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const calculateTimeLeft = () => {
      const difference = +new Date(goal.examDate) - +new Date();
      if (difference <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    };

    // Initial calculation
    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [goal.examDate]);

  const isThpt = activeProgram === "thpt";
  const themeAccent = isThpt ? "text-brand-accent bg-brand-accent-light" : "text-teal-600 bg-teal-50";
  const themeFill = isThpt ? "bg-brand-accent" : "bg-teal-600";
  const themeGradient = isThpt 
    ? "from-brand-accent-light/50 via-brand-bg to-brand-bg border-brand-accent/20"
    : "from-teal-50/50 via-brand-bg to-brand-bg border-teal-500/20";
  const themeText = isThpt ? "text-brand-accent" : "text-teal-600";

  return (
    <div className={`relative overflow-hidden rounded-3xl p-6 md:p-8 border bg-gradient-to-br ${themeGradient} shadow-sm`}>
      {/* Decorative Sun & Cloud SVG Animation */}
      <div className="absolute right-4 top-4 md:right-8 md:top-8 w-24 h-24 md:w-32 md:h-32 opacity-10 md:opacity-20 pointer-events-none">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {/* Sun */}
          <circle cx="50" cy="40" r="18" fill={isThpt ? "#f97316" : "#0d9488"} className="animate-spin-slow" style={{ transformOrigin: "50px 40px" }} />
          {/* Cloud */}
          <path d="M30 65 a10 10 0 0 1 10 -10 a15 15 0 0 1 28 -5 a12 12 0 0 1 12 12 a10 10 0 0 1 -10 10 z" fill={isThpt ? "#C18676" : "#2dd4bf"} />
        </svg>
      </div>

      <div className="max-w-4xl relative z-10 flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
        {/* Left: Welcomes and Streak */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full ${themeAccent}`}>
              {isThpt ? "THPT Quốc Gia" : "Đánh giá năng lực"}
            </span>
            <div className="flex items-center gap-1 bg-orange-50 text-orange-600 px-3 py-1 rounded-full text-xs font-bold">
              <Flame className="w-4 h-4 fill-current animate-bounce-slow" />
              <span>{streakDays} ngày học liên tiếp</span>
            </div>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-brand-dark">
            Chào mừng trở lại, <span className={themeText}>{userName}</span>!
          </h2>
          
          <div className="flex items-center gap-4 text-sm text-brand-text-secondary">
            <span className="flex items-center gap-1.5">
              <School className="w-4 h-4 text-brand-text-secondary" />
              {goal.schoolName}
            </span>
            <span className="flex items-center gap-1.5">
              <Target className="w-4 h-4 text-brand-text-secondary" />
              {goal.department}
            </span>
          </div>
        </div>

        {/* Right: Countdown */}
        <div className="w-full md:w-auto bg-white/60 backdrop-blur-sm border border-white/80 rounded-2xl p-4 shadow-inner flex flex-col items-center min-w-[220px]">
          <span className="text-xs font-bold text-brand-text-secondary uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" /> Đếm ngược kỳ thi
          </span>
          <div className="flex gap-2 text-center">
            {mounted ? (
              <>
                <div className="flex flex-col">
                  <span className="text-2xl font-black text-brand-dark px-1.5">{timeLeft.days}</span>
                  <span className="text-[10px] text-brand-text-secondary uppercase font-bold">Ngày</span>
                </div>
                <span className="text-xl font-bold text-brand-dark/50 self-start mt-0.5">:</span>
                <div className="flex flex-col">
                  <span className="text-2xl font-black text-brand-dark px-1.5">
                    {String(timeLeft.hours).padStart(2, "0")}
                  </span>
                  <span className="text-[10px] text-brand-text-secondary uppercase font-bold">Giờ</span>
                </div>
                <span className="text-xl font-bold text-brand-dark/50 self-start mt-0.5">:</span>
                <div className="flex flex-col">
                  <span className="text-2xl font-black text-brand-dark px-1.5">
                    {String(timeLeft.minutes).padStart(2, "0")}
                  </span>
                  <span className="text-[10px] text-brand-text-secondary uppercase font-bold">Phút</span>
                </div>
                <span className="text-xl font-bold text-brand-dark/50 self-start mt-0.5">:</span>
                <div className="flex flex-col">
                  <span className="text-2xl font-black text-brand-dark px-1.5 text-brand-accent">
                    {String(timeLeft.seconds).padStart(2, "0")}
                  </span>
                  <span className="text-[10px] text-brand-text-secondary uppercase font-bold">Giây</span>
                </div>
              </>
            ) : (
              <span className="text-sm font-semibold text-brand-text-secondary py-1">Đang tính toán...</span>
            )}
          </div>
        </div>
      </div>

      {/* Bottom: School Goal target score progress bar */}
      <div className="mt-6 pt-4 border-t border-brand-accent-light/40 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="flex-1 w-full">
          <div className="flex justify-between text-xs font-bold text-brand-dark mb-1.5">
            <span>Mục tiêu điểm số:</span>
            <span>{goal.targetScore} / {goal.maxScore} điểm</span>
          </div>
          <div className="h-2 bg-brand-accent-light/50 rounded-full overflow-hidden">
            <motion.div
              className={`h-full rounded-full ${themeFill}`}
              initial={{ width: 0 }}
              animate={{ width: `${(goal.targetScore / goal.maxScore) * 100}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>
        </div>
        <div className="flex items-center gap-1.5 bg-green-50 text-green-700 px-3 py-1.5 rounded-xl text-xs font-bold border border-green-200/50 self-end">
          <Trophy className="w-4 h-4 fill-current" />
          <span>Còn {(goal.maxScore - goal.targetScore).toFixed(1)} điểm để đạt điểm tối đa</span>
        </div>
      </div>
    </div>
  );
}
