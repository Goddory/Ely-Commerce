"use client";

import Link from "next/link";
import {
  BarChart3, BookOpen, Calendar, ChevronRight, Clock,
  Flame, Target, TrendingUp, Trophy, Zap, Sparkles
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setActivePeriod, setActiveProgram } from "@/lib/features/dashboardSlice";
import { FadeIn, StaggerContainer, StaggerItem, ScaleOnScroll, TextReveal } from "@/components/animations/FadeIn";
import { motion, AnimatePresence } from "framer-motion";

// Custom components
import StickyNav from "@/components/dashboard/StickyNav";
import GreetingWidget from "@/components/dashboard/GreetingWidget";
import HabitGrid from "@/components/dashboard/HabitGrid";
import Heatmap from "@/components/dashboard/Heatmap";
import SkillAnalytics from "@/components/dashboard/SkillAnalytics";

function ScoreRing({ score, maxScore = 10, size = 120, activeProgram }: { score: number; maxScore?: number; size?: number; activeProgram: "thpt" | "dgnl" }) {
  const percentage = (score / maxScore) * 100;
  const r = (size - 12) / 2;
  const circumference = 2 * Math.PI * r;
  const offset = circumference - (percentage / 100) * circumference;
  
  const isThpt = activeProgram === "thpt";
  const defaultAccent = isThpt ? "#C18676" : "#0d9488";
  const color = score >= (maxScore * 0.8) ? (isThpt ? "#22c55e" : "#0f766e") : score >= (maxScore * 0.65) ? defaultAccent : "#ef4444";

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#F5EBE8" strokeWidth={10} />
        <motion.circle
          cx={size / 2} cy={size / 2} r={r}
          fill="none" stroke={color} strokeWidth={10}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          whileInView={{ strokeDashoffset: offset }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-bold text-brand-dark">{score}</span>
        <span className="text-xs text-brand-text-secondary">/{maxScore}</span>
      </div>
    </div>
  );
}

function ProgressBar({ value, max, label, activeProgram }: { value: number; max: number; label: string; activeProgram: "thpt" | "dgnl" }) {
  const pct = Math.round((value / max) * 100);
  const isThpt = activeProgram === "thpt";
  const barColor = isThpt ? "from-brand-accent to-brand-accent/70" : "from-teal-600 to-emerald-500/70";
  
  return (
    <div>
      <div className="flex justify-between text-sm mb-1.5">
        <span className="font-semibold text-brand-dark">{label}</span>
        <span className="text-brand-text-secondary">{pct}%</span>
      </div>
      <div className="h-2.5 bg-brand-bg rounded-full overflow-hidden">
        <motion.div
          className={`h-full rounded-full bg-gradient-to-r ${barColor}`}
          initial={{ width: 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        />
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const dispatch = useAppDispatch();
  const activeProgram = useAppSelector((s) => s.dashboard.activeProgram);
  const activePeriod = useAppSelector((s) => s.dashboard.activePeriod);
  
  // Dynamic stats selection based on active program
  const programData = useAppSelector((s) => s.dashboard.activeProgram === "thpt" ? s.dashboard.thpt : s.dashboard.dgnl);
  const { recentAttempts, streakDays, totalTestsDone, averageScore, weakSubjects, goal, habits, heatmap } = programData;

  const periods = [
    { key: "week" as const, label: "7 ngày" },
    { key: "month" as const, label: "30 ngày" },
    { key: "all" as const, label: "Tất cả" },
  ];

  const isThpt = activeProgram === "thpt";
  
  // Theme styling mapping
  const headerGradient = isThpt
    ? "from-brand-accent-light/60 via-brand-bg to-brand-bg"
    : "from-teal-50/60 via-brand-bg to-brand-bg";
  const accentBlob = isThpt ? "bg-brand-accent/5" : "bg-teal-500/5";
  const accentText = isThpt ? "text-brand-accent" : "text-teal-600";
  const accentHoverBg = isThpt ? "hover:bg-brand-accent/10" : "hover:bg-teal-50";
  
  const statsTheme = [
    { icon: Trophy, label: "Bài đã làm", value: totalTestsDone.toString(), accent: isThpt ? "bg-amber-50 text-amber-600" : "bg-teal-50 text-teal-600" },
    { icon: Flame, label: "Streak", value: `${streakDays} ngày`, accent: "bg-orange-50 text-orange-600" },
    { icon: Target, label: "Điểm trung bình", value: averageScore.toString(), accent: isThpt ? "bg-green-50 text-green-600" : "bg-emerald-50 text-emerald-600" },
    { icon: Zap, label: "Mức độ", value: isThpt ? (averageScore >= 8 ? "Xuất sắc" : averageScore >= 6.5 ? "Khá" : "Cần cố gắng") : (averageScore >= 850 ? "Xuất sắc" : averageScore >= 700 ? "Khá" : "Cần cố gắng"), accent: "bg-blue-50 text-blue-600" },
  ];

  return (
    <main className="flex-1 w-full bg-brand-bg min-h-screen pb-16">
      {/* Header Banner */}
      <section className="relative py-12 md:py-16 px-4 overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-br ${headerGradient} transition-colors duration-500`} />
        <div className={`absolute top-10 right-20 w-72 h-72 ${accentBlob} rounded-full blur-3xl transition-colors duration-500`} />

        <div className="max-w-7xl mx-auto relative z-10">
          <nav className="flex text-sm text-brand-text-secondary mb-6" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li><Link href="/" className="hover:text-brand-accent transition-colors">Trang chủ</Link></li>
              <li>
                <div className="flex items-center">
                  <ChevronRight className="w-4 h-4 mx-1" />
                  <span className="text-brand-dark font-medium">Quản lý luyện tập</span>
                </div>
              </li>
            </ol>
          </nav>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <FadeIn direction="up">
              <h1 className="text-3xl md:text-4xl font-black text-brand-dark mb-2 tracking-tight flex items-center gap-2">
                <TextReveal text="Quản lý luyện tập" />
                <Sparkles className={`w-6 h-6 animate-pulse ${accentText}`} />
              </h1>
              <p className="text-brand-text-secondary text-base md:text-lg">
                Theo dõi tiến độ, xây dựng lộ trình học thông minh dựa trên AI.
              </p>
            </FadeIn>

            {/* Dual Program Switcher */}
            <FadeIn direction="up" delay={0.15}>
              <div className="flex items-center bg-white/80 backdrop-blur-sm border border-brand-accent-light p-1 rounded-full shadow-sm">
                <button
                  onClick={() => dispatch(setActiveProgram("thpt"))}
                  className="flex-1 text-center py-2.5 px-6 rounded-full text-xs font-black transition-all cursor-pointer relative min-w-[130px]"
                >
                  {isThpt && (
                    <motion.div
                      layoutId="activeProgramPill"
                      className="absolute inset-0 bg-brand-accent rounded-full -z-10"
                      transition={{ type: "spring", stiffness: 350, damping: 25 }}
                    />
                  )}
                  <span className={isThpt ? "text-white" : "text-brand-text-secondary"}>THPT QUỐC GIA</span>
                </button>
                <button
                  onClick={() => dispatch(setActiveProgram("dgnl"))}
                  className="flex-1 text-center py-2.5 px-6 rounded-full text-xs font-black transition-all cursor-pointer relative min-w-[130px]"
                >
                  {!isThpt && (
                    <motion.div
                      layoutId="activeProgramPill"
                      className="absolute inset-0 bg-teal-600 rounded-full -z-10"
                      transition={{ type: "spring", stiffness: 350, damping: 25 }}
                    />
                  )}
                  <span className={!isThpt ? "text-white" : "text-brand-text-secondary"}>ĐGNL ĐHQG</span>
                </button>
              </div>
            </FadeIn>
          </div>

          {/* Period Filter */}
          <FadeIn direction="up" delay={0.25}>
            <div className="flex gap-2 mt-8">
              {periods.map((p) => (
                <button
                  key={p.key}
                  onClick={() => dispatch(setActivePeriod(p.key))}
                  className={`px-5 py-2 rounded-full text-sm font-bold transition-all cursor-pointer ${
                    activePeriod === p.key
                      ? "bg-brand-dark text-white shadow-sm"
                      : "bg-white text-brand-text-secondary hover:text-brand-dark"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Sticky Secondary Nav */}
      <StickyNav activeProgram={activeProgram} />

      {/* Section 1: Overview Dashboard & Target Card */}
      <section id="tong-quan" className="px-4 py-8 max-w-7xl mx-auto space-y-6">
        <GreetingWidget
          streakDays={streakDays}
          goal={goal}
          activeProgram={activeProgram}
        />

        {/* Quick Stats Grid */}
        <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {statsTheme.map((stat, i) => (
            <StaggerItem key={i}>
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-brand-accent-light/20 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-default">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${stat.accent}`}>
                  <stat.icon className="w-5 h-5" />
                </div>
                <p className="text-2xl font-black text-brand-dark tracking-tight">{stat.value}</p>
                <p className="text-xs font-bold text-brand-text-secondary mt-0.5 uppercase tracking-wide">{stat.label}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* Section 2: Progress & Weak Areas */}
      <section id="tien-do" className="px-4 py-8 max-w-7xl mx-auto scroll-mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Score Analytics Ring */}
          <div className="lg:col-span-1 space-y-6">
            <ScaleOnScroll>
              <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-brand-accent-light/40">
                <h3 className="font-extrabold text-brand-dark mb-6 flex items-center gap-2 text-lg">
                  <BarChart3 className={`w-5 h-5 ${accentText}`} /> Điểm trung bình
                </h3>
                <div className="flex justify-center mb-6">
                  <ScoreRing
                    score={averageScore}
                    maxScore={goal.maxScore}
                    size={140}
                    activeProgram={activeProgram}
                  />
                </div>
                <div className="text-center">
                  <p className="text-brand-text-secondary text-sm font-medium leading-relaxed">
                    {isThpt ? (
                      averageScore >= 8
                        ? "Tuyệt vời! Bạn đang trên đà đỗ nguyện vọng 1 🎉"
                        : averageScore >= 6.5
                        ? "Khá tốt, cần nỗ lực thêm các môn phân hóa!"
                        : "Cần tích cực giải đề và xem lại lý thuyết!"
                    ) : (
                      averageScore >= 850
                        ? "Điểm ĐGNL của bạn cực kỳ triển vọng rồi đó!"
                        : averageScore >= 700
                        ? "Rần triển vọng, luyện thêm tư duy logic nhé!"
                        : "Luyện thêm kỹ năng xử lý số liệu & logic!"
                    )}
                  </p>
                </div>
              </div>
            </ScaleOnScroll>

            {/* Weak Areas Needs improvement */}
            <FadeIn direction="up">
              <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-brand-accent-light/40">
                <h3 className="font-extrabold text-brand-dark mb-4 flex items-center gap-2 text-lg">
                  <TrendingUp className="w-5 h-5 text-red-500" /> Cần cải thiện gấp
                </h3>
                <div className="space-y-3">
                  {weakSubjects.map((subject, i) => (
                    <Link
                      key={i}
                      href={isThpt ? "/tot-nghiep-thpt" : "/dgnl"}
                      className="flex items-center justify-between p-3.5 bg-red-50/50 rounded-xl hover:bg-red-50 transition-colors group cursor-pointer border border-red-100/50"
                    >
                      <span className="text-sm font-extrabold text-red-700">{subject}</span>
                      <ChevronRight className="w-4 h-4 text-red-400 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  ))}
                </div>
                <Link
                  href={isThpt ? "/tot-nghiep-thpt" : "/dgnl"}
                  className={`inline-flex items-center gap-1 text-sm font-black mt-5 transition-all cursor-pointer ${accentText}`}
                >
                  Luyện tập thêm ngay <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </FadeIn>
          </div>

          {/* Progress by Subjects */}
          <div className="lg:col-span-2">
            <FadeIn direction="up">
              <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-brand-accent-light/40 h-full">
                <h3 className="font-extrabold text-brand-dark mb-6 flex items-center gap-2 text-lg">
                  <BarChart3 className={`w-5 h-5 ${accentText}`} /> Tiến độ hoàn thành chương trình
                </h3>
                <div className="space-y-6">
                  {isThpt ? (
                    <>
                      <ProgressBar value={48} max={155} label="Toán học (Đại số & Giải tích)" activeProgram={activeProgram} />
                      <ProgressBar value={41} max={144} label="Anh văn (Ngữ pháp & Từ vựng)" activeProgram={activeProgram} />
                      <ProgressBar value={22} max={84} label="Vật lý (Cơ, Điện, Sóng)" activeProgram={activeProgram} />
                      <ProgressBar value={15} max={122} label="Hoá học (Vô cơ & Hữu cơ)" activeProgram={activeProgram} />
                      <ProgressBar value={18} max={83} label="Lịch sử (Việt Nam & Thế giới)" activeProgram={activeProgram} />
                    </>
                  ) : (
                    <>
                      <ProgressBar value={78} max={120} label="Tư duy định lượng" activeProgram={activeProgram} />
                      <ProgressBar value={62} max={100} label="Tư duy định tính" activeProgram={activeProgram} />
                      <ProgressBar value={35} max={80} label="Khoa học Tự nhiên" activeProgram={activeProgram} />
                      <ProgressBar value={42} max={60} label="Khoa học Xã hội" activeProgram={activeProgram} />
                    </>
                  )}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Section 3: History & Diligence Grids */}
      <section id="lich-su" className="px-4 py-8 max-w-7xl mx-auto scroll-mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Diligence Tracking Column (Habits & Heatmap) */}
          <div className="lg:col-span-2 space-y-6">
            <HabitGrid habits={habits} activeProgram={activeProgram} />
            <Heatmap data={heatmap} activeProgram={activeProgram} />
          </div>

          {/* Recent Attempts List */}
          <div className="lg:col-span-1">
            <FadeIn direction="up" className="h-full">
              <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-brand-accent-light/40 h-full flex flex-col">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-extrabold text-brand-dark flex items-center gap-2 text-lg">
                    <BookOpen className={`w-5 h-5 ${accentText}`} /> Bài làm gần đây
                  </h3>
                  <span className="text-xs font-bold text-brand-text-secondary bg-brand-bg px-2.5 py-1 rounded-full">
                    {recentAttempts.length} bài đã nộp
                  </span>
                </div>

                <div className="space-y-4 overflow-y-auto no-scrollbar flex-1 max-h-[460px] pr-1">
                  {recentAttempts.map((attempt, i) => {
                    const pct = Math.round((attempt.correctAnswers / attempt.totalQuestions) * 100);
                    
                    // Program-specific color levels
                    const isExcellent = isThpt ? attempt.score >= 8 : attempt.score >= 800;
                    const isGood = isThpt ? attempt.score >= 6.5 : attempt.score >= 650;
                    const color = isExcellent
                      ? "text-green-600 bg-green-50"
                      : isGood
                      ? (isThpt ? "text-brand-accent bg-brand-accent-light" : "text-teal-600 bg-teal-50")
                      : "text-red-600 bg-red-50";

                    return (
                      <motion.div
                        key={attempt.testId}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.08, duration: 0.3 }}
                        className="flex items-center gap-4 p-3.5 rounded-2xl bg-brand-bg/40 hover:bg-brand-bg transition-all duration-200 group cursor-pointer border border-transparent hover:border-brand-accent-light/40"
                      >
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-extrabold text-sm flex-shrink-0 ${color}`}>
                          {attempt.score}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-brand-dark text-sm truncate group-hover:text-brand-accent transition-colors">
                            {attempt.testName}
                          </p>
                          <div className="flex items-center gap-3 text-[10px] text-brand-text-secondary mt-1 font-semibold">
                            <span className="flex items-center gap-0.5">
                              <Target className="w-3 h-3" /> {attempt.correctAnswers}/{attempt.totalQuestions} ({pct}%)
                            </span>
                            <span className="flex items-center gap-0.5">
                              <Clock className="w-3 h-3" /> {attempt.duration}m
                            </span>
                          </div>
                        </div>

                        <div className="flex flex-col items-end flex-shrink-0">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${isThpt ? "bg-orange-50 text-orange-600" : "bg-teal-50 text-teal-600"}`}>
                            {attempt.subject}
                          </span>
                          <span className="text-[9px] text-brand-text-secondary mt-1 flex items-center gap-0.5 font-bold">
                            <Calendar className="w-2.5 h-2.5" />
                            {new Date(attempt.completedAt).toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit" })}
                          </span>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Section 4: Detailed Question Structures & Formats */}
      <section id="thong-ke" className="px-4 py-8 max-w-7xl mx-auto scroll-mt-24">
        <FadeIn direction="up">
          <SkillAnalytics activeProgram={activeProgram} />
        </FadeIn>
      </section>

      {/* Quick Action Practice Banner */}
      <section className="px-4 py-8 max-w-7xl mx-auto">
        <FadeIn direction="up">
          <div className={`bg-gradient-to-r ${isThpt ? "from-brand-dark to-brand-accent/90" : "from-brand-dark to-teal-700/90"} rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl transition-all duration-500`}>
            <div>
              <h3 className="text-2xl font-extrabold text-white mb-2 tracking-tight">Tiếp tục giải đề và bứt phá điểm số!</h3>
              <p className="text-white/80 text-sm font-medium">Hoàn thành bài luyện tập hôm nay để củng cố vững chắc chuỗi chuyên cần {streakDays} ngày.</p>
            </div>
            <Link
              href={isThpt ? "/tot-nghiep-thpt" : "/dgnl"}
              className="bg-white text-brand-dark px-8 py-3.5 rounded-full font-black hover:bg-brand-bg transition-all shadow-lg hover:scale-105 active:scale-95 cursor-pointer flex-shrink-0 text-sm"
            >
              Luyện thi ngay
            </Link>
          </div>
        </FadeIn>
      </section>
    </main>
  );
}
