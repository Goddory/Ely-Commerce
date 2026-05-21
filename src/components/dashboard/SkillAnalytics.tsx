"use client";

import { BarChart3, PieChart, CheckCircle2, Circle } from "lucide-react";
import { motion } from "framer-motion";

interface SkillAnalyticsProps {
  activeProgram: "thpt" | "dgnl";
}

interface SkillItem {
  name: string;
  accuracy: number;
  total: number;
  solved: number;
}

export default function SkillAnalytics({ activeProgram }: SkillAnalyticsProps) {
  const isThpt = activeProgram === "thpt";
  const accentColor = isThpt ? "text-brand-accent" : "text-teal-600";
  const bgAccent = isThpt ? "bg-brand-accent-light" : "bg-teal-50";
  const fillAccent = isThpt ? "bg-brand-accent" : "bg-teal-600";

  // Mock structures and formats
  const questionStructures: SkillItem[] = isThpt
    ? [
        { name: "Lý thuyết cơ bản", accuracy: 88, total: 200, solved: 176 },
        { name: "Tính toán & Vận dụng", accuracy: 74, total: 150, solved: 111 },
        { name: "Vận dụng cao (Phân hóa)", accuracy: 52, total: 80, solved: 41 },
        { name: "Đọc hiểu & Phân tích", accuracy: 82, total: 100, solved: 82 },
      ]
    : [
        { name: "Tư duy Định lượng (Toán, Logic)", accuracy: 78, total: 300, solved: 234 },
        { name: "Tư duy Định tính (Văn học, Ngôn ngữ)", accuracy: 84, total: 250, solved: 210 },
        { name: "Khoa học Tự nhiên (Lý, Hóa, Sinh)", accuracy: 65, total: 200, solved: 130 },
        { name: "Khoa học Xã hội (Sử, Địa)", accuracy: 89, total: 150, solved: 133 },
      ];

  const questionFormats: SkillItem[] = isThpt
    ? [
        { name: "Trắc nghiệm 4 lựa chọn (Nhiều lựa chọn)", accuracy: 84, total: 320, solved: 268 },
        { name: "Trắc nghiệm Đúng / Sai (Mới)", accuracy: 68, total: 120, solved: 81 },
        { name: "Trắc nghiệm Trả lời ngắn (Điền số)", accuracy: 58, total: 90, solved: 52 },
      ]
    : [
        { name: "Trắc nghiệm đơn (Lựa chọn đơn)", accuracy: 85, total: 600, solved: 510 },
        { name: "Đọc hiểu đi kèm nhóm câu hỏi", accuracy: 76, total: 200, solved: 152 },
        { name: "Câu hỏi suy luận logic/số liệu", accuracy: 71, total: 100, solved: 71 },
      ];

  const renderColumn = (title: string, items: SkillItem[], icon: React.ReactNode) => (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-brand-accent-light/40 flex-1">
      <div className="flex items-center gap-2 mb-6 border-b border-brand-accent-light/30 pb-3">
        <div className={`p-2 rounded-xl ${bgAccent} ${accentColor}`}>
          {icon}
        </div>
        <h4 className="font-extrabold text-brand-dark text-base">{title}</h4>
      </div>

      <div className="space-y-5">
        {items.map((item, idx) => (
          <div key={item.name} className="group">
            <div className="flex justify-between items-center text-xs mb-1.5 font-bold text-brand-dark">
              <span className="truncate max-w-[200px]">{item.name}</span>
              <span className={accentColor}>{item.accuracy}%</span>
            </div>
            
            <div className="h-2 bg-brand-bg rounded-full overflow-hidden relative">
              <motion.div
                className={`h-full rounded-full ${fillAccent}`}
                initial={{ width: 0 }}
                whileInView={{ width: `${item.accuracy}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: idx * 0.1, ease: "easeOut" }}
              />
            </div>

            <div className="flex justify-between text-[10px] text-brand-text-secondary mt-1">
              <span>Đã làm: {item.solved}/{item.total} câu</span>
              <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                Đúng: {Math.round(item.solved)} câu
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col md:flex-row gap-6">
      {renderColumn("Theo cấu trúc câu hỏi", questionStructures, <BarChart3 className="w-5 h-5" />)}
      {renderColumn("Theo định dạng câu hỏi", questionFormats, <PieChart className="w-5 h-5" />)}
    </div>
  );
}
