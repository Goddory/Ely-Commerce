import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface TestAttempt {
  testId: string;
  testName: string;
  subject: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  duration: number;
  completedAt: string;
}

export interface StudyGoal {
  schoolName: string;
  department: string;
  targetScore: number;
  maxScore: number;
  examDate: string; // ISO Date string
}

export interface HabitDay {
  dayName: string; // "T2", "T3", etc.
  status: "done" | "partial" | "none";
  duration: number; // minutes
  subjects: string[];
}

export interface HeatmapItem {
  date: string; // "YYYY-MM-DD"
  count: number; // number of questions solved
}

export interface ProgramData {
  recentAttempts: TestAttempt[];
  streakDays: number;
  totalTestsDone: number;
  averageScore: number;
  weakSubjects: string[];
  goal: StudyGoal;
  habits: HabitDay[];
  heatmap: HeatmapItem[];
}

interface DashboardState {
  activeProgram: "thpt" | "dgnl";
  activePeriod: "week" | "month" | "all";
  thpt: ProgramData;
  dgnl: ProgramData;
}

// Generate some realistic heatmap data for the past 90 days
const generateHeatmapData = (seedCount: number): HeatmapItem[] => {
  const data: HeatmapItem[] = [];
  const now = new Date();
  for (let i = 90; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(now.getDate() - i);
    const dateString = d.toISOString().split("T")[0];
    // Create random-like but reproducible counts
    const day = d.getDay();
    let count = 0;
    if (day !== 0 && day !== 5) {
      const hash = (i * seedCount) % 11;
      if (hash > 3) count = hash * 5 + 10;
    }
    data.push({ date: dateString, count });
  }
  return data;
};

const initialState: DashboardState = {
  activeProgram: "thpt",
  activePeriod: "week",
  thpt: {
    recentAttempts: [
      {
        testId: "toan-1",
        testName: "Đề thi thử Toán THPT QG - Đề 5",
        subject: "Toán học",
        score: 8.6,
        totalQuestions: 50,
        correctAnswers: 43,
        duration: 85,
        completedAt: "2026-05-21T10:00:00Z",
      },
      {
        testId: "anh-3",
        testName: "Đề thi thử Anh văn THPT QG - Đề 12",
        subject: "Anh văn",
        score: 7.8,
        totalQuestions: 50,
        correctAnswers: 39,
        duration: 60,
        completedAt: "2026-05-20T14:30:00Z",
      },
      {
        testId: "ly-2",
        testName: "Đề thi thử Vật lý THPT QG - Đề 8",
        subject: "Vật lý",
        score: 6.8,
        totalQuestions: 40,
        correctAnswers: 27,
        duration: 50,
        completedAt: "2026-05-19T09:15:00Z",
      },
      {
        testId: "hoa-1",
        testName: "Đề thi thử Hoá học THPT QG - Đề 3",
        subject: "Hoá học",
        score: 7.0,
        totalQuestions: 40,
        correctAnswers: 28,
        duration: 55,
        completedAt: "2026-05-18T16:45:00Z",
      },
      {
        testId: "su-5",
        testName: "Đề thi thử Lịch sử THPT QG - Đề 2",
        subject: "Lịch sử",
        score: 8.5,
        totalQuestions: 40,
        correctAnswers: 34,
        duration: 45,
        completedAt: "2026-05-17T11:00:00Z",
      },
    ],
    streakDays: 5,
    totalTestsDone: 47,
    averageScore: 7.7,
    weakSubjects: ["Vật lý", "Hoá học"],
    goal: {
      schoolName: "Đại học Bách Khoa Hà Nội",
      department: "Khoa học Máy tính (IT1)",
      targetScore: 28.2,
      maxScore: 30,
      examDate: "2026-06-25T08:00:00Z",
    },
    habits: [
      { dayName: "T2", status: "done", duration: 120, subjects: ["Toán học", "Anh văn"] },
      { dayName: "T3", status: "done", duration: 90, subjects: ["Vật lý"] },
      { dayName: "T4", status: "partial", duration: 45, subjects: ["Hoá học"] },
      { dayName: "T5", status: "done", duration: 110, subjects: ["Toán học", "Anh văn"] },
      { dayName: "T6", status: "none", duration: 0, subjects: [] },
      { dayName: "T7", status: "done", duration: 150, subjects: ["Toán học", "Vật lý", "Hoá học"] },
      { dayName: "CN", status: "done", duration: 60, subjects: ["Lịch sử"] },
    ],
    heatmap: generateHeatmapData(3),
  },
  dgnl: {
    recentAttempts: [
      {
        testId: "dgnl-hcm-1",
        testName: "Đề ôn tập ĐGNL ĐHQG TP.HCM - Số 1",
        subject: "ĐGNL Tổng hợp",
        score: 870,
        totalQuestions: 120,
        correctAnswers: 87,
        duration: 150,
        completedAt: "2026-05-21T08:00:00Z",
      },
      {
        testId: "dgnl-hcm-2",
        testName: "Đề ôn tập ĐGNL ĐHQG TP.HCM - Số 2",
        subject: "ĐGNL Tổng hợp",
        score: 820,
        totalQuestions: 120,
        correctAnswers: 82,
        duration: 140,
        completedAt: "2026-05-18T13:00:00Z",
      },
      {
        testId: "dgnl-hcm-3",
        testName: "Đề thi thử ĐGNL Đại học Quốc gia - Đề 4",
        subject: "ĐGNL Tổng hợp",
        score: 790,
        totalQuestions: 120,
        correctAnswers: 79,
        duration: 150,
        completedAt: "2026-05-14T09:30:00Z",
      },
    ],
    streakDays: 8,
    totalTestsDone: 18,
    averageScore: 826,
    weakSubjects: ["Tư duy logic", "Giải quyết số liệu", "Tiếng Anh"],
    goal: {
      schoolName: "Đại học Quốc gia TP.HCM",
      department: "Khoa học Máy tính (ĐHQG)",
      targetScore: 920,
      maxScore: 1200,
      examDate: "2026-06-07T07:30:00Z",
    },
    habits: [
      { dayName: "T2", status: "done", duration: 90, subjects: ["Tư duy logic"] },
      { dayName: "T3", status: "partial", duration: 30, subjects: ["Tiếng Việt"] },
      { dayName: "T4", status: "done", duration: 100, subjects: ["Giải quyết số liệu"] },
      { dayName: "T5", status: "done", duration: 80, subjects: ["Tư duy logic"] },
      { dayName: "T6", status: "done", duration: 120, subjects: ["Hóa học", "Vật lý"] },
      { dayName: "T7", status: "none", duration: 0, subjects: [] },
      { dayName: "CN", status: "done", duration: 90, subjects: ["Lịch sử", "Địa lý"] },
    ],
    heatmap: generateHeatmapData(7),
  },
};

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setActivePeriod(state, action: PayloadAction<"week" | "month" | "all">) {
      state.activePeriod = action.payload;
    },
    setActiveProgram(state, action: PayloadAction<"thpt" | "dgnl">) {
      state.activeProgram = action.payload;
    },
    addAttempt(state, action: PayloadAction<{ program: "thpt" | "dgnl"; attempt: TestAttempt }>) {
      const { program, attempt } = action.payload;
      const target = state[program];
      target.recentAttempts.unshift(attempt);
      target.totalTestsDone += 1;
      const total = target.recentAttempts.reduce((s, a) => s + a.score, 0);
      target.averageScore = Math.round((total / target.recentAttempts.length) * 10) / 10;
    },
  },
});

export const { setActivePeriod, setActiveProgram, addAttempt } = dashboardSlice.actions;
export default dashboardSlice.reducer;
