import type { Subject, ExamCategory, Testimonial, PlatformFeature, ComparisonItem } from "@/types";

export const THPT_SUBJECTS: Subject[] = [
  { id: "1", name: "Anh văn", slug: "anh", testCount: 144, isHot: true, iconName: "BookOpen" },
  { id: "2", name: "Toán học", slug: "toan", testCount: 155, isHot: true, iconName: "Calculator" },
  { id: "3", name: "Văn học", slug: "van", testCount: 41, isHot: false, iconName: "PenTool" },
  { id: "4", name: "Vật lý", slug: "ly", testCount: 84, isHot: true, iconName: "Atom" },
  { id: "5", name: "Hoá học", slug: "hoa", testCount: 122, isHot: false, iconName: "FlaskConical" },
  { id: "6", name: "Sinh học", slug: "sinh", testCount: 30, isHot: false, iconName: "Dna" },
  { id: "7", name: "Lịch sử", slug: "su", testCount: 83, isHot: true, iconName: "Clock" },
  { id: "8", name: "Địa lý", slug: "dia", testCount: 52, isHot: false, iconName: "Globe" },
  { id: "9", name: "Tin học", slug: "tin", testCount: 24, isHot: false, iconName: "Monitor" },
  { id: "10", name: "GD KT-PL", slug: "gd-kt-pl", testCount: 23, isHot: false, iconName: "Scale" },
  { id: "11", name: "Công nghiệp", slug: "cong-nghiep", testCount: 21, isHot: false, iconName: "Factory" },
  { id: "12", name: "Nông nghiệp", slug: "nong-nghiep", testCount: 5, isHot: false, iconName: "Tractor" },
];

export const DGNL_CATEGORIES: ExamCategory[] = [
  {
    id: "dgnl-1",
    name: "Đại học Quốc gia TP.HCM",
    slug: "dai-hoc-quoc-gia-tphcm",
    description: "Đề thi ĐGNL ĐHQG TP.HCM mô phỏng chuẩn format",
    totalTests: 195,
    totalAttempts: "120.5k",
  },
  {
    id: "dgnl-2",
    name: "Đại học Quốc gia Hà Nội",
    slug: "dai-hoc-quoc-gia-ha-noi",
    description: "Đề thi ĐGNL ĐHQG Hà Nội cập nhật mới nhất",
    totalTests: 125,
    totalAttempts: "95.2k",
  },
  {
    id: "dgnl-3",
    name: "Đại học Bách Khoa Hà Nội",
    slug: "dai-hoc-bach-khoa-hn",
    description: "Đề thi ĐGTD Bách Khoa Hà Nội toàn diện",
    totalTests: 88,
    totalAttempts: "45.1k",
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Đỗ Minh Thành Danh",
    school: "THPT Nguyễn Thượng Hiền",
    achievement: "8.0",
    achievementType: "IELTS",
    quote: "Sau khi học, em đã nắm được tư duy làm bài. Kỹ năng Reading được cải thiện rõ rệt cho kỳ thi TN THPT.",
  },
  {
    name: "Huỳnh Anh Tú",
    school: "THPT Mạc Đĩnh Chi",
    achievement: "7.5",
    achievementType: "IELTS",
    quote: "Phương pháp giúp em đọc thông suốt, dễ hiểu hơn và đạt được điểm cao hơn trong đề thi thử THPTQG tiếng Anh.",
  },
  {
    name: "Nguyễn Đức Duy Long",
    school: "Phổ thông Năng khiếu",
    achievement: "9.75",
    achievementType: "Tiếng Anh THPTQG",
    quote: "Em đã áp dụng vào đề TN THPT Quốc gia vừa rồi. Phần Reading em trả lời được đúng hết, đạt 9.75/10.",
  },
  {
    name: "Trần Tiểu Nhật",
    school: "Phổ thông Năng khiếu",
    achievement: "1530",
    achievementType: "SAT",
    quote: "Em tìm được ý nhanh hơn và không tốn thời gian cho những phần không quan trọng.",
  },
];

export const PLATFORM_FEATURES: PlatformFeature[] = [
  {
    iconName: "TrendingUp",
    title: "Đón đầu xu hướng ra đề",
    description: "Ngân hàng đề được cập nhật liên tục, bám sát 100% cấu trúc và ma trận kiến thức mới nhất.",
  },
  {
    iconName: "Monitor",
    title: "Thực chiến chuẩn format thi thật",
    description: "Mô phỏng chính xác giao diện thi, giúp làm quen thao tác và rèn tâm lý dưới áp lực thời gian.",
  },
  {
    iconName: "Library",
    title: "Kho 1.000+ đề thi thử",
    description: "Bao phủ mọi môn học từ luyện chuyên đề đến đề thi thử toàn quốc và đề minh hoạ từ Bộ GD&ĐT.",
  },
  {
    iconName: "Target",
    title: "Cá nhân hoá lộ trình học",
    description: "Theo sát tiến độ, phân tích điểm yếu và tự động đề xuất bài tập để lấp lỗ hổng, tối ưu điểm số.",
  },
];

export const COMPARISONS: ComparisonItem[] = [
  { old: "Luyện đề trên giấy", new: "Trải nghiệm thi máy tiên phong" },
  { old: "Thiếu thống kê bài đã làm", new: "Kho đề online khổng lồ" },
  { old: "Không cá nhân hoá luyện tập", new: "Mode làm bài linh động" },
  { old: "Không giải thích chuyên sâu", new: "Giải thích sâu từng câu" },
  { old: "Nội dung test chưa đa dạng", new: "Quản lý luyện tập & thống kê" },
];

export const PLATFORM_STATS = {
  totalTests: 784,
  totalStudentsDaily: "5,333+",
  totalReviews: "41,278+",
  rating: 4.9,
  totalAttempts: "475.8k",
};
