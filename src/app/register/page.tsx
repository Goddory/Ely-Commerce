"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Loader2, Lock, Mail, User } from "lucide-react";
import { FadeIn } from "@/components/animations/FadeIn";

export default function RegisterPage() {
  const { register } = useAuth();
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!username || !email || !password) {
      setError("Vui lòng điền đầy đủ thông tin");
      return;
    }
    setLoading(true);
    try {
      await register(username, email, password);
      router.push("/profile");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Đăng ký thất bại. Vui lòng thử lại.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-brand-bg min-h-[75vh]">
      <FadeIn className="max-w-md w-full space-y-8 bg-white p-8 md:p-10 rounded-[32px] shadow-xl border border-brand-accent/5">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-brand-dark tracking-tight">
            Tạo tài khoản mới
          </h2>
          <p className="mt-2 text-center text-sm text-brand-text-secondary">
            Hoặc{" "}
            <Link href="/login" className="font-bold text-brand-accent hover:underline">
              đăng nhập tài khoản cũ
            </Link>
          </p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 px-4 py-3 rounded-2xl text-sm font-medium border border-red-100">
            {error}
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-semibold text-brand-dark mb-1">
                Tên đăng nhập
              </label>
              <div className="relative">
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="appearance-none block w-full pl-10 pr-4 py-3 border border-gray-200 rounded-2xl text-brand-dark placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-accent focus:border-transparent transition-all text-sm"
                  placeholder="username"
                />
                <User className="absolute left-3.5 top-3.5 h-4 w-4 text-gray-400" />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-brand-dark mb-1">
                Địa chỉ Email
              </label>
              <div className="relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full pl-10 pr-4 py-3 border border-gray-200 rounded-2xl text-brand-dark placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-accent focus:border-transparent transition-all text-sm"
                  placeholder="name@example.com"
                />
                <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-gray-400" />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-brand-dark mb-1">
                Mật khẩu
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full pl-10 pr-4 py-3 border border-gray-200 rounded-2xl text-brand-dark placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-accent focus:border-transparent transition-all text-sm"
                  placeholder="••••••••"
                />
                <Lock className="absolute left-3.5 top-3.5 h-4 w-4 text-gray-400" />
              </div>
            </div>
          </div>

          <div className="flex items-center text-sm">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              required
              className="h-4 w-4 text-brand-dark focus:ring-brand-dark border-gray-300 rounded cursor-pointer"
            />
            <label htmlFor="terms" className="ml-2 block text-gray-600 cursor-pointer">
              Tôi đồng ý với{" "}
              <a href="#" className="font-bold text-brand-accent hover:underline">
                Điều khoản dịch vụ
              </a>{" "}
              và{" "}
              <a href="#" className="font-bold text-brand-accent hover:underline">
                Chính sách bảo mật
              </a>
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="group relative w-full flex justify-center py-3.5 px-4 border border-transparent font-bold rounded-2xl text-white bg-brand-dark hover:bg-brand-accent focus:outline-none transition-colors shadow-lg active:scale-[0.98] disabled:opacity-50 text-sm cursor-pointer"
          >
            {loading ? (
              <Loader2 className="animate-spin h-5 w-5 text-white" />
            ) : (
              "Đăng ký tài khoản"
            )}
          </button>
        </form>
      </FadeIn>
    </main>
  );
}
