'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { SareeProduct } from '../types';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: SareeProduct;
  featured?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const router = useRouter();
  const { isAuthenticated, openAuthGate } = useAuth();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { items, addToCart, updateProductQuantity } = useCart();

  const handleProductClick = () => {
    if (!isAuthenticated) {
      openAuthGate(product.id);
    } else {
      router.push(`/product/${product.id}`);
    }
  };

  const isFavorited = isInWishlist(product.id);

  // Check if this saree is currently in cart
  const cartItem = items.find((item) => item.product.id === product.id);
  const quantityInCart = cartItem ? cartItem.quantity : 0;

  return (
    <article className="bg-[#FFFDF9] flex flex-col shadow-sm group hover:shadow-xl transition-all duration-300 relative border border-[#E8D5B5]/60 hover:border-[#D4AF37]/80 rounded-xs">
      {/* Saree Image Container */}
      <div
        onClick={handleProductClick}
        className="relative w-full aspect-[3/4] bg-[#FAF5EC] overflow-hidden cursor-pointer"
      >
        <img
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          alt={product.name}
          src={product.image}
        />

        {/* Badge if present */}
        {product.badge && (
          <span className="absolute top-3 left-3 bg-[#51071D] text-[#FDE6B8] font-label-sm px-2.5 py-1 tracking-widest uppercase text-[10px] font-bold shadow-xs border border-[#F3C068]/30">
            {product.badge}
          </span>
        )}

        {/* Wishlist Action Button */}
        <button
          type="button"
          aria-label={isFavorited ? 'Remove from Wishlist' : 'Add to Wishlist'}
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          suppressHydrationWarning
          className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-colors shadow-sm cursor-pointer ${
            isFavorited
              ? 'bg-[#9B111E] text-white ring-1 ring-white'
              : 'bg-[#FFFDF9]/90 text-[#51071D] hover:bg-[#51071D] hover:text-white'
          }`}
        >
          <span
            className="material-symbols-outlined text-[18px]"
            style={isFavorited ? { fontVariationSettings: "'FILL' 1" } : undefined}
          >
            favorite
          </span>
        </button>

        {/* Hover Quick Preview Pill Bar */}
        <div className="absolute inset-x-0 bottom-0 p-space-sm bg-gradient-to-t from-[#51071D]/90 via-[#51071D]/40 to-transparent flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="font-label-sm uppercase tracking-widest text-[#FDE6B8] flex items-center gap-1.5 text-[11px] font-semibold">
            <span className="material-symbols-outlined text-[16px] text-[#F3C068]">visibility</span>
            Quick Draping Inspection
          </span>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-space-md flex-1 flex flex-col justify-between space-y-space-sm">
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <span className="font-label-sm text-[#8C6D3B] uppercase tracking-widest text-[10px] font-bold">
              {product.category}
            </span>
            <span className="text-[10px] text-[#065F46] font-semibold bg-[#ECFDF5] px-1.5 py-0.2 rounded-full border border-[#A7F3D0]">
              GI Handloom
            </span>
          </div>
          <h2
            onClick={handleProductClick}
            className="font-headline-sm text-[#51071D] tracking-tight font-medium group-hover:text-[#7A0C2E] transition-colors line-clamp-1 cursor-pointer text-base"
          >
            {product.name}
          </h2>
          <p className="font-body-sm text-[#6E6760] text-xs">
            {product.fabric} • Tested Gold Zari
          </p>
        </div>

        <div className="space-y-space-sm pt-space-xs">
          <div className="flex items-baseline gap-space-xs">
            <span className="font-headline-sm font-bold text-[#2A2623] text-lg">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            <span className="font-body-sm text-[#8C837A] line-through text-xs">
              ₹{product.originalPrice.toLocaleString('en-IN')}
            </span>
            <span className="font-label-sm text-[#51071D] font-bold ml-auto bg-[#FDF2F8] border border-[#FBCFE8] px-1.5 py-0.5 text-[10px]">
              {product.discountPercent}% Off
            </span>
          </div>

          {/* Interactive Dynamic Action: Add to Cart OR Quantity Counter */}
          {quantityInCart === 0 ? (
            <div className="flex items-center gap-2 pt-1">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart(product, 1);
                }}
                suppressHydrationWarning
                className="flex-1 bg-gradient-to-r from-[#51071D] via-[#6D0D26] to-[#51071D] hover:from-[#6D0D26] hover:to-[#51071D] text-[#FDE6B8] font-label-md uppercase tracking-wider py-2.5 px-3 transition-all flex items-center justify-center gap-1.5 shadow-xs cursor-pointer text-xs font-bold rounded-xs border border-[#F3C068]/30 active:scale-[0.98]"
              >
                <span className="material-symbols-outlined text-[17px] text-[#F3C068]">shopping_bag</span>
                <span>Add to Bag</span>
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleProductClick();
                }}
                title="View saree details"
                aria-label="View Saree Details"
                suppressHydrationWarning
                className="w-9 h-9 bg-[#FAF5EC] hover:bg-[#51071D] text-[#51071D] hover:text-[#FDE6B8] border border-[#E8D5B5] flex items-center justify-center transition-colors cursor-pointer rounded-xs shrink-0"
              >
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            </div>
          ) : (
            <div className="pt-1">
              <div
                onClick={(e) => e.stopPropagation()}
                className="w-full bg-gradient-to-r from-[#FFFDF9] via-[#FAF5EC] to-[#FFFDF9] border border-[#D4AF37] rounded-xs p-1 flex items-center justify-between shadow-xs"
              >
                {/* Decrement Button */}
                <button
                  type="button"
                  onClick={() => updateProductQuantity(product, -1, cartItem?.selectedColor)}
                  aria-label="Decrease quantity"
                  className="w-8 h-8 rounded-xs bg-[#FFFDF9] hover:bg-[#51071D] text-[#51071D] hover:text-white border border-[#E8D5B5] flex items-center justify-center transition-colors cursor-pointer active:scale-95 shadow-2xs"
                  suppressHydrationWarning
                >
                  <span className="material-symbols-outlined text-[16px]">
                    {quantityInCart === 1 ? 'delete' : 'remove'}
                  </span>
                </button>

                {/* Counter Details */}
                <div className="flex flex-col items-center leading-tight px-2 select-none">
                  <span className="font-label-md font-bold text-xs text-[#51071D] tracking-wide flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#065F46] animate-pulse" />
                    {quantityInCart} in Bag
                  </span>
                  <span className="text-[10px] text-[#8C6D3B] font-semibold">
                    ₹{(product.price * quantityInCart).toLocaleString('en-IN')}
                  </span>
                </div>

                {/* Increment Button */}
                <button
                  type="button"
                  onClick={() => updateProductQuantity(product, 1, cartItem?.selectedColor)}
                  aria-label="Increase quantity"
                  className="w-8 h-8 rounded-xs bg-gradient-to-r from-[#51071D] to-[#750A26] hover:from-[#750A26] hover:to-[#51071D] text-[#FDE6B8] flex items-center justify-center transition-colors cursor-pointer active:scale-95 shadow-2xs"
                  suppressHydrationWarning
                >
                  <span className="material-symbols-outlined text-[16px]">add</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </article>
  );
};
