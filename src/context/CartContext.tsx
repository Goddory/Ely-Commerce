"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface CartItem {
  id: string; // Unique string composite: productId_color_size
  productId: string;
  name: string;
  price: number; // Standardized numeric price
  image: string;
  color?: string;
  size?: string;
  quantity: number;
}

export interface CartProductInput {
  id: string;
  name: string;
  price: string | number;
  image: string;
}

interface CartContextType {
  cartItems: CartItem[];
  cartCount: number;
  cartTotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  addToCart: (product: CartProductInput, quantity: number, color?: string, size?: string) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, newQuantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const parsePrice = (priceVal: string | number): number => {
  if (typeof priceVal === "number") return priceVal;
  const cleaned = priceVal.replace(/[^\d]/g, "");
  return parseInt(cleaned, 10) || 0;
};

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const storedCart = localStorage.getItem("ely_cart");
      if (storedCart) {
        const parsed = JSON.parse(storedCart);
        setTimeout(() => {
          setCartItems(parsed);
          setIsInitialized(true);
        }, 0);
      } else {
        setTimeout(() => {
          setIsInitialized(true);
        }, 0);
      }
    } catch (error) {
      console.error("Failed to load cart from localStorage", error);
      setTimeout(() => {
        setIsInitialized(true);
      }, 0);
    }
  }, []);

  // Save cart to localStorage on changes
  useEffect(() => {
    if (isInitialized) {
      try {
        localStorage.setItem("ely_cart", JSON.stringify(cartItems));
      } catch (error) {
        console.error("Failed to save cart to localStorage", error);
      }
    }
  }, [cartItems, isInitialized]);

  const addToCart = (
    product: CartProductInput,
    quantity: number,
    color?: string,
    size?: string
  ) => {
    const numericPrice = parsePrice(product.price);
    const cartItemId = `${product.id}_${color || ""}_${size || ""}`;

    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex((item) => item.id === cartItemId);

      if (existingItemIndex > -1) {
        // Update quantity of existing item
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += quantity;
        return updatedItems;
      } else {
        // Add new item
        return [
          ...prevItems,
          {
            id: cartItemId,
            productId: product.id,
            name: product.name,
            price: numericPrice,
            image: product.image,
            color,
            size,
            quantity,
          },
        ];
      }
    });
  };

  const removeFromCart = (cartItemId: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === cartItemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        cartTotal,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
