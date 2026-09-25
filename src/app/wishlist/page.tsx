'use client';

import React from 'react';
import Link from 'next/link';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import { DEMO_PRODUCTS } from '../../data/products';
import { Heart, ShoppingBag, Trash2, ArrowLeft, ArrowRight } from 'lucide-react';

export default function WishlistPage() {
  const { wishlistIds, toggleWishlist, clearWishlist, moveToCart } = useWishlist();
  const { openCartDrawer } = useCart();

  const wishlistedProducts = DEMO_PRODUCTS.filter((p) => wishlistIds.includes(p.id));

  return (
    <div className="bg-[#FAF7F2] min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs text-stone-500 mb-6">
          <Link href="/" className="hover:text-[#51071D] flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Atelier
          </Link>
          <span>/</span>
          <span>My Curated Wishlist</span>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-6 border-b border-[#E8E2D9] mb-8 gap-4">
          <div>
            <span className="text-[11px] uppercase tracking-widest text-[#C5A059] font-semibold">
              Curated Heirlooms
            </span>
            <h1 className="font-serif text-3xl text-[#1F1916] mt-1 font-medium">
              Saved Masterpieces ({wishlistedProducts.length})
            </h1>
          </div>

          {wishlistedProducts.length > 0 && (
            <div className="flex items-center gap-3">
              <button
                onClick={clearWishlist}
                className="text-xs text-stone-500 hover:text-rose-600 transition-colors"
              >
                Clear All
              </button>
              <button
                onClick={() => {
                  wishlistedProducts.forEach((p) => moveToCart(p.id));
                  openCartDrawer();
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#51071D] text-white rounded-lg text-xs font-medium hover:bg-[#6E1F32] shadow-sm"
              >
                <ShoppingBag className="w-3.5 h-3.5" /> Move All to Bag
              </button>
            </div>
          )}
        </div>

        {/* Empty State */}
        {wishlistedProducts.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-[#E8E2D9] max-w-lg mx-auto">
            <div className="w-16 h-16 bg-[#51071D]/10 rounded-full flex items-center justify-center mx-auto mb-4 text-[#51071D]">
              <Heart className="w-8 h-8" />
            </div>
            <h2 className="font-serif text-2xl text-[#1F1916] mb-2">Your Wishlist is Empty</h2>
            <p className="text-xs text-stone-500 mb-6 leading-relaxed">
              Explore our handpicked collection of pure Kanchipuram silk, soft silk, and bridal pattu sarees to reserve your favorite weaves.
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#51071D] text-white rounded-lg text-xs font-semibold uppercase tracking-wider hover:bg-[#6E1F32]"
            >
              Browse Catalog <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlistedProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl overflow-hidden border border-[#E8E2D9] shadow-sm flex flex-col group"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-stone-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-rose-600 hover:scale-110 transition-transform shadow-sm"
                    title="Remove from wishlist"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm text-white text-[10px] uppercase tracking-wider px-2 py-1 rounded">
                    {product.fabric}
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#C5A059] font-bold">
                      {product.category}
                    </span>
                    <h3 className="font-serif text-base text-[#1F1916] mt-1 font-medium line-clamp-2">
                      {product.name}
                    </h3>
                    <div className="flex items-baseline gap-2 mt-2">
                      <span className="font-serif text-lg font-bold text-[#51071D]">
                        ₹{product.price.toLocaleString('en-IN')}
                      </span>
                      <span className="text-xs text-stone-400 line-through">
                        ₹{product.originalPrice.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-stone-100 flex gap-2">
                    <button
                      onClick={() => moveToCart(product.id)}
                      className="flex-1 py-2.5 bg-[#51071D] text-white rounded-lg text-xs font-medium hover:bg-[#6E1F32] flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" /> Move to Bag
                    </button>
                    <Link
                      href={`/product/${product.id}`}
                      className="px-3 py-2.5 border border-[#E8E2D9] rounded-lg text-xs text-stone-700 hover:text-[#51071D] hover:border-[#51071D] transition-colors"
                    >
                      View
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
