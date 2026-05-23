"use client";

import React, { useState, useEffect } from "react";
import { X, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  description: string;
  imageUrl: string;
  stock: number;
  colorOptions?: string;
  sizeOptions?: string;
  isNew: boolean;
  categoryId: string;
}

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  product: Product | null;
  categories: { id: string; name: string }[];
}

export default function ProductModal({ isOpen, onClose, onSave, product, categories }: ProductModalProps) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [stock, setStock] = useState("");
  const [colorOptions, setColorOptions] = useState("");
  const [sizeOptions, setSizeOptions] = useState("");
  const [isNew, setIsNew] = useState(false);
  const [categoryId, setCategoryId] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const initData = () => {
      if (product) {
        setName(product.name);
        setPrice(product.price.toString());
        setOriginalPrice(product.originalPrice.toString());
        setDescription(product.description || "");
        setImageUrl(product.imageUrl);
        setStock(product.stock.toString());
        setColorOptions(product.colorOptions || "");
        setSizeOptions(product.sizeOptions || "");
        setIsNew(product.isNew);
        setCategoryId(product.categoryId);
      } else {
        setName("");
        setPrice("");
        setOriginalPrice("");
        setDescription("");
        setImageUrl("");
        setStock("");
        setColorOptions("Kem, Nâu sẫm, Đất nung, Đen, Trắng");
        setSizeOptions("S, M, L, XL");
        setIsNew(true);
        setCategoryId(categories[0]?.id || "ao-thun");
      }
      setError("");
    };

    Promise.resolve().then(initData);
  }, [product, isOpen, categories]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name || !price || !imageUrl || !categoryId) {
      setError("Vui lòng điền đầy đủ các thông tin bắt buộc.");
      return;
    }

    const priceNum = parseFloat(price);
    const origPriceNum = originalPrice ? parseFloat(originalPrice) : 0;
    const stockNum = stock ? parseInt(stock, 10) : 0;

    if (isNaN(priceNum) || priceNum < 0) {
      setError("Giá sản phẩm phải là số hợp lệ.");
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("ely_token");
      const url = product 
        ? `http://localhost:5066/api/products/${product.id}`
        : "http://localhost:5066/api/products";
      const method = product ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          name,
          description,
          price: priceNum,
          originalPrice: origPriceNum || priceNum,
          imageUrl,
          stock: stockNum,
          colorOptions,
          sizeOptions,
          isNew,
          categoryId
        })
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.message || "Không thể lưu sản phẩm");
      }

      onSave();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Đã xảy ra lỗi khi lưu sản phẩm");
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
        className="relative bg-white w-full max-w-2xl rounded-[32px] shadow-2xl p-6 md:p-8 max-h-[90vh] overflow-y-auto border border-brand-accent/10"
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-brand-dark p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-2xl font-extrabold text-brand-dark mb-6">
          {product ? "Cập nhật sản phẩm" : "Thêm sản phẩm mới"}
        </h2>

        {error && (
          <div className="bg-red-50 text-red-600 px-4 py-3 rounded-2xl text-sm font-semibold border border-red-100 mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-brand-dark mb-1">
                Tên sản phẩm <span className="text-brand-accent">*</span>
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-2xl text-brand-dark text-sm focus:outline-none focus:ring-2 focus:ring-brand-accent"
                placeholder="Áo thun..."
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-brand-dark mb-1">
                Danh mục <span className="text-brand-accent">*</span>
              </label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-2xl text-brand-dark text-sm focus:outline-none focus:ring-2 focus:ring-brand-accent"
              >
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold text-brand-dark mb-1">
                Giá bán (₫) <span className="text-brand-accent">*</span>
              </label>
              <input
                type="number"
                required
                min="0"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-2xl text-brand-dark text-sm focus:outline-none focus:ring-2 focus:ring-brand-accent"
                placeholder="250000"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-brand-dark mb-1">
                Giá gốc (₫)
              </label>
              <input
                type="number"
                min="0"
                value={originalPrice}
                onChange={(e) => setOriginalPrice(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-2xl text-brand-dark text-sm focus:outline-none focus:ring-2 focus:ring-brand-accent"
                placeholder="350000"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-brand-dark mb-1">
                Số lượng tồn kho
              </label>
              <input
                type="number"
                min="0"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-2xl text-brand-dark text-sm focus:outline-none focus:ring-2 focus:ring-brand-accent"
                placeholder="100"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-brand-dark mb-1">
              Đường dẫn hình ảnh (URL) <span className="text-brand-accent">*</span>
            </label>
            <input
              type="url"
              required
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-2xl text-brand-dark text-sm focus:outline-none focus:ring-2 focus:ring-brand-accent"
              placeholder="https://..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-brand-dark mb-1">
                Màu sắc (phân cách bằng dấu phẩy)
              </label>
              <input
                type="text"
                value={colorOptions}
                onChange={(e) => setColorOptions(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-2xl text-brand-dark text-sm focus:outline-none focus:ring-2 focus:ring-brand-accent"
                placeholder="Trắng, Đen, Xám"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-brand-dark mb-1">
                Kích cỡ (phân cách bằng dấu phẩy)
              </label>
              <input
                type="text"
                value={sizeOptions}
                onChange={(e) => setSizeOptions(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-2xl text-brand-dark text-sm focus:outline-none focus:ring-2 focus:ring-brand-accent"
                placeholder="S, M, L, XL"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-brand-dark mb-1">
              Mô tả chi tiết
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-2xl text-brand-dark text-sm focus:outline-none focus:ring-2 focus:ring-brand-accent resize-none"
              placeholder="Nhập mô tả sản phẩm..."
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="isNew"
              checked={isNew}
              onChange={(e) => setIsNew(e.target.checked)}
              className="w-4 h-4 rounded border-gray-300 text-brand-dark focus:ring-brand-dark cursor-pointer"
            />
            <label htmlFor="isNew" className="ml-2 text-sm font-semibold text-brand-dark cursor-pointer">
              Đánh dấu là sản phẩm Mới
            </label>
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
