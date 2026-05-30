"use client";

import React, { useState, useEffect } from "react";
import { X, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

interface Category {
  id: string;
  name: string;
  slug?: string;
  description?: string;
  imageUrl?: string;
}

interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  category: Category | null;
}

export default function CategoryModal({ isOpen, onClose, onSave, category }: CategoryModalProps) {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const initData = () => {
      if (category) {
        setName(category.name);
        setSlug(category.slug || "");
        setDescription(category.description || "");
        setImageUrl(category.imageUrl || "");
      } else {
        setName("");
        setSlug("");
        setDescription("");
        setImageUrl("");
      }
      setError("");
    };

    Promise.resolve().then(initData);
  }, [category, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name) {
      setError("Vui lòng điền tên danh mục.");
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("ely_token");
      const url = category 
        ? `http://localhost:5066/api/categories/${category.id}`
        : "http://localhost:5066/api/categories";
      const method = category ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          name,
          slug: slug || undefined,
          description,
          imageUrl: imageUrl || undefined
        })
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.message || "Không thể lưu danh mục");
      }

      onSave();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Đã xảy ra lỗi khi lưu danh mục");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative bg-white w-full max-w-lg rounded-[32px] shadow-2xl p-6 md:p-8 max-h-[90vh] overflow-y-auto border border-brand-accent/10"
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-brand-dark p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-2xl font-extrabold text-brand-dark mb-6">
          {category ? "Cập nhật danh mục" : "Thêm danh mục mới"}
        </h2>

        {error && (
          <div className="bg-red-50 text-red-600 px-4 py-3 rounded-2xl text-sm font-semibold border border-red-100 mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-brand-dark mb-1">
              Tên danh mục <span className="text-brand-accent">*</span>
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-2xl text-brand-dark text-sm focus:outline-none focus:ring-2 focus:ring-brand-accent"
              placeholder="Ví dụ: Áo Sơ Mi, Quần Tây..."
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-brand-dark mb-1">
              Slug / Liên kết (Không bắt buộc)
            </label>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              disabled={!!category}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-2xl text-brand-dark text-sm focus:outline-none focus:ring-2 focus:ring-brand-accent disabled:opacity-50 disabled:bg-gray-50"
              placeholder={category ? category.slug : "Ví dụ: ao-so-mi (Tự động tạo nếu để trống)"}
            />
            {category && (
              <p className="text-[10px] text-gray-400 mt-1 pl-1">
                Không thể sửa đổi liên kết (slug) của danh mục sau khi tạo để tránh hỏng URL SEO.
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-brand-dark mb-1">
              Đường dẫn hình ảnh (URL)
            </label>
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-2xl text-brand-dark text-sm focus:outline-none focus:ring-2 focus:ring-brand-accent"
              placeholder="https://images.unsplash.com/photo-..."
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-brand-dark mb-1">
              Mô tả danh mục
            </label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-2xl text-brand-dark text-sm focus:outline-none focus:ring-2 focus:ring-brand-accent resize-none"
              placeholder="Nhập mô tả cho danh mục này..."
            />
          </div>

          <div className="flex justify-end gap-3 border-t border-gray-100 pt-5">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 border border-gray-200 rounded-2xl text-brand-dark text-sm font-bold hover:bg-gray-50 transition-colors cursor-pointer"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 bg-brand-dark text-white rounded-2xl text-sm font-bold hover:bg-brand-accent transition-colors flex items-center justify-center min-w-[100px] cursor-pointer"
            >
              {loading ? <Loader2 className="animate-spin w-4 h-4" /> : "Lưu"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
