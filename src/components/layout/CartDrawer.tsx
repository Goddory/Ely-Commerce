"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function CartDrawer() {
  const {
    cartItems,
    cartTotal,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
  } = useCart();

  const drawerRef = useRef<HTMLDivElement>(null);

  // Close drawer on clicking the backdrop overlay
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (drawerRef.current && !drawerRef.current.contains(e.target as Node)) {
      setIsCartOpen(false);
    }
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={handleOverlayClick}
            className="absolute inset-0 bg-black/40 backdrop-blur-xs cursor-pointer"
          />

          {/* Drawer Container Panel */}
          <motion.div
            ref={drawerRef}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="relative z-10 flex flex-col w-full max-w-md h-full bg-brand-bg shadow-2xl border-l border-brand-accent/10"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-brand-accent/10">
              <div className="flex items-center space-x-2">
                <ShoppingBag className="w-6 h-6 text-brand-dark" />
                <h2 className="text-xl font-bold text-brand-dark">Giỏ hàng của bạn</h2>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 rounded-full text-brand-dark hover:bg-brand-accent-light transition-colors"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cartItems.length === 0 ? (
                // Empty Cart State
                <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
                  <div className="w-20 h-20 bg-brand-accent-light rounded-full flex items-center justify-center text-brand-accent">
                    <ShoppingBag className="w-10 h-10" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-brand-dark">Giỏ hàng đang trống</h3>
                    <p className="text-brand-text-secondary mt-1">Hãy lấp đầy giỏ hàng của bạn bằng những items cực chất.</p>
                  </div>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="bg-brand-dark text-white px-6 py-3 rounded-full font-bold hover:bg-brand-accent transition-all cursor-pointer"
                  >
                    Tiếp tục mua sắm
                  </button>
                </div>
              ) : (
                // Active Cart Items List
                cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex bg-white p-3 rounded-2xl border border-brand-accent/5 shadow-xs hover:shadow-md transition-shadow"
                  >
                    {/* Item Image */}
                    <div className="relative w-20 h-24 rounded-xl overflow-hidden bg-brand-bg flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Item Details */}
                    <div className="ml-4 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <h4 className="font-bold text-brand-dark line-clamp-1 text-sm md:text-base">
                            {item.name}
                          </h4>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-gray-400 hover:text-red-500 transition-colors ml-2 cursor-pointer"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        {/* Variant selections */}
                        <div className="flex flex-wrap gap-2 mt-1">
                          {item.color && (
                            <span className="text-[10px] md:text-xs bg-brand-accent-light text-brand-dark font-medium px-2 py-0.5 rounded-md">
                              Màu: {item.color}
                            </span>
                          )}
                          {item.size && (
                            <span className="text-[10px] md:text-xs bg-brand-accent-light text-brand-dark font-medium px-2 py-0.5 rounded-md">
                              Size: {item.size}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Quantity & Price */}
                      <div className="flex justify-between items-end mt-2">
                        {/* Quantity Selector */}
                        <div className="flex items-center border border-gray-200 rounded-lg px-2 py-1 space-x-3">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="text-gray-500 hover:text-brand-accent transition-colors cursor-pointer"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="font-semibold text-sm text-brand-dark w-4 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="text-gray-500 hover:text-brand-accent transition-colors cursor-pointer"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        {/* Price */}
                        <span className="font-bold text-brand-dark text-sm md:text-base">
                          {(item.price * item.quantity).toLocaleString("vi-VN")}₫
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer summary (Only show if cart has items) */}
            {cartItems.length > 0 && (
              <div className="p-6 bg-white border-t border-brand-accent/10 space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-base font-semibold text-brand-text-secondary">
                    <span>Tạm tính</span>
                    <span>{cartTotal.toLocaleString("vi-VN")}₫</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-brand-text-secondary">Phí vận chuyển</span>
                    {cartTotal >= 500000 ? (
                      <span className="text-green-600 font-bold">Miễn phí</span>
                    ) : (
                      <span className="text-brand-text-secondary italic text-xs">Tính khi thanh toán</span>
                    )}
                  </div>
                  {cartTotal < 500000 && (
                    <p className="text-[11px] text-brand-accent font-medium">
                      *Mua thêm {(500000 - cartTotal).toLocaleString("vi-VN")}₫ để được miễn phí giao hàng.
                    </p>
                  )}
                </div>

                <div className="pt-2">
                  <Link
                    href="/checkout"
                    onClick={() => setIsCartOpen(false)}
                    className="w-full bg-brand-dark hover:bg-brand-accent text-white py-4 rounded-xl flex items-center justify-center font-bold transition-colors group cursor-pointer"
                  >
                    <span>Thanh toán ngay</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
