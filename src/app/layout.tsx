import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import StoreProvider from "@/lib/StoreProvider";

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin", "vietnamese"],
});

export const metadata: Metadata = {
  title: "ely_edu | Luyện thi Tốt Nghiệp THPT & ĐGNL Online",
  description: "Nền tảng luyện thi TN THPT và ĐGNL online miễn phí. 784+ bài test, mô phỏng chuẩn format đề thi thật, phân tích chi tiết kết quả.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={`${quicksand.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-brand-bg text-brand-dark">
        <StoreProvider>
          <Navbar />
          {children}
          <Footer />
        </StoreProvider>
      </body>
    </html>
  );
}
