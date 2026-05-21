export interface Subject {
  id: string;
  name: string;
  slug: string;
  testCount: number;
  isHot: boolean;
  iconName: string;
}

export interface ExamCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  totalTests: number;
  totalAttempts: string;
}

export interface Testimonial {
  name: string;
  school: string;
  achievement: string;
  achievementType: string;
  quote: string;
}

export interface PlatformFeature {
  iconName: string;
  title: string;
  description: string;
}

export interface ComparisonItem {
  old: string;
  new: string;
}
