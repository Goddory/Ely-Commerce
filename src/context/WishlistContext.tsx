"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface WishlistItem {
  id: string;
  name: string;
  price: string;
  image: string;
  isNew?: boolean;
}

interface WishlistContextType {
  wishlistItems: WishlistItem[];
  wishlistCount: number;
  toggleWishlist: (product: WishlistItem) => void;
  isInWishlist: (productId: string) => boolean;
  removeFromWishlist: (productId: string) => void;
  clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load wishlist from localStorage on mount
  useEffect(() => {
    try {
      const storedWishlist = localStorage.getItem("ely_wishlist");
      if (storedWishlist) {
        const parsed = JSON.parse(storedWishlist);
        // Avoid hydration warning
        setTimeout(() => {
          setWishlistItems(parsed);
          setIsInitialized(true);
        }, 0);
      } else {
        setTimeout(() => {
          setIsInitialized(true);
        }, 0);
      }
    } catch (error) {
      console.error("Failed to load wishlist from localStorage", error);
      setTimeout(() => {
        setIsInitialized(true);
      }, 0);
    }
  }, []);

  // Save wishlist to localStorage on changes
  useEffect(() => {
    if (isInitialized) {
      try {
        localStorage.setItem("ely_wishlist", JSON.stringify(wishlistItems));
      } catch (error) {
        console.error("Failed to save wishlist to localStorage", error);
      }
    }
  }, [wishlistItems, isInitialized]);

  const toggleWishlist = (product: WishlistItem) => {
    setWishlistItems((prevItems) => {
      const exists = prevItems.some((item) => item.id === product.id);
      if (exists) {
        return prevItems.filter((item) => item.id !== product.id);
      } else {
        return [...prevItems, product];
      }
    });
  };

  const isInWishlist = (productId: string) => {
    return wishlistItems.some((item) => item.id === productId);
  };

  const removeFromWishlist = (productId: string) => {
    setWishlistItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  };

  const clearWishlist = () => {
    setWishlistItems([]);
  };

  const wishlistCount = wishlistItems.length;

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        wishlistCount,
        toggleWishlist,
        isInWishlist,
        removeFromWishlist,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
}
