'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useCart } from './CartContext';
import { DEMO_PRODUCTS } from '../data/products';

interface WishlistContextType {
  wishlistIds: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  wishlistCount: number;
  moveToCart: (productId: string) => void;
  removeFromWishlist: (productId: string) => void;
  clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wishlistIds, setWishlistIds] = useState<string[]>([
    'peacock-blue-soft-silk',
    'emerald-temple-pattu',
  ]);
  const [isLoaded, setIsLoaded] = useState(false);

  const { addToCart } = useCart();

  useEffect(() => {
    try {
      const saved = localStorage.getItem('deva_sarees_wishlist');
      if (saved) setWishlistIds(JSON.parse(saved));
    } catch {
      // ignore
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem('deva_sarees_wishlist', JSON.stringify(wishlistIds));
    } catch {
      // ignore
    }
  }, [wishlistIds, isLoaded]);

  const toggleWishlist = (productId: string) => {
    setWishlistIds((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  const isInWishlist = (productId: string) => {
    return wishlistIds.includes(productId);
  };

  const removeFromWishlist = (productId: string) => {
    setWishlistIds((prev) => prev.filter((id) => id !== productId));
  };

  const clearWishlist = () => {
    setWishlistIds([]);
  };

  const moveToCart = (productId: string) => {
    const product = DEMO_PRODUCTS.find((p) => p.id === productId);
    if (product) {
      addToCart(product, 1, product.colorName);
      removeFromWishlist(productId);
    }
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistIds,
        toggleWishlist,
        isInWishlist,
        wishlistCount: wishlistIds.length,
        moveToCart,
        removeFromWishlist,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
