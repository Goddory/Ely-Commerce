import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin", "vietnamese"],
});

export const metadata: Metadata = {
  title: "Ely-Commerce | Thời trang Gen Z",
  description: "Ely-Commerce - Nơi thể hiện phong cách của bạn.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={`${quicksand.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-brand-bg text-brand-dark">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
