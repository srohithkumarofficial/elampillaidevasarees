'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useCart } from '../context/CartContext';

export const BottomCartBar: React.FC = () => {
  const { cartCount, total, discount, openCartDrawer, items } = useCart();
  const pathname = usePathname();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Do not show on checkout, order confirmation or invoice pages
  if (!mounted || cartCount === 0) return null;
  if (
    pathname === '/checkout' ||
    pathname?.startsWith('/order-confirmation') ||
    pathname?.startsWith('/invoice')
  ) {
    return null;
  }

  // Get last added item for thumbnail preview
  const lastItem = items[items.length - 1];

  return (
    <aside
      aria-label="Sticky shopping bag summary"
      className="fixed bottom-0 left-0 right-0 z-40 bg-gradient-to-r from-[#FFFDF9]/95 via-[#FAF5EC]/98 to-[#FFFDF9]/95 backdrop-blur-md border-t-2 border-[#D4AF37] shadow-[0_-12px_40px_rgba(81,7,29,0.16)] transition-all duration-300 animate-in slide-in-from-bottom"
    >
      <div className="max-w-[1440px] mx-auto px-3 sm:px-6 md:px-8 py-2.5 sm:py-3.5 flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Left: Cart Info & Saree Thumbnail Preview */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
          <div className="flex items-center gap-2.5">
            {/* Thumbnail of recent saree or bag icon */}
            {lastItem?.product?.image ? (
              <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-xs overflow-hidden border border-[#D4AF37] shrink-0 bg-[#FAF5EC] shadow-2xs">
                <img
                  src={lastItem.product.image}
                  alt={lastItem.product.name}
                  className="w-full h-full object-cover"
                />
                <span className="absolute -top-1 -right-1 bg-gradient-to-tr from-[#9B111E] to-[#E63946] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center ring-1 ring-white">
                  {cartCount}
                </span>
              </div>
            ) : (
              <div className="relative w-10 h-10 rounded-full bg-gradient-to-tr from-[#51071D] to-[#750A26] flex items-center justify-center text-[#FDE6B8] shadow-xs">
                <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
                <span className="absolute -top-1 -right-1 bg-gradient-to-tr from-[#D4AF37] to-[#F3C068] text-[#3A2200] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center ring-1 ring-white">
                  {cartCount}
                </span>
              </div>
            )}

            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-label-md uppercase tracking-wider text-xs font-bold text-[#51071D]">
                  {cartCount} {cartCount === 1 ? 'Saree' : 'Sarees'} in Vault
                </span>
                <span className="hidden md:inline-flex items-center gap-1 text-[10px] text-[#065F46] bg-[#ECFDF5] px-1.5 py-0.2 rounded-full border border-[#A7F3D0] font-semibold">
                  <span className="material-symbols-outlined text-[12px]">verified</span>
                  GI Certified Weaves
                </span>
              </div>
              <span className="text-[11px] text-[#8C6D3B] font-medium hidden xs:block">
                Complimentary Express Shipping Across India
              </span>
            </div>
          </div>

          {/* Mobile Total Display */}
          <div className="sm:hidden text-right">
            <span className="block text-[10px] text-[#8C6D3B] font-label-sm uppercase tracking-wider">
              Total Amount
            </span>
            <span className="font-headline-sm font-bold text-[#51071D] text-base leading-tight">
              ₹{total.toLocaleString('en-IN')}
            </span>
          </div>
        </div>

        {/* Center: Desktop Total Amount & Savings */}
        <div className="hidden sm:flex flex-col items-center justify-center text-center px-4">
          <span className="text-[10px] text-[#8C6D3B] font-label-sm uppercase tracking-widest font-semibold">
            Vault Total Amount
          </span>
          <div className="flex items-baseline gap-2">
            <span className="font-serif text-xl sm:text-2xl font-bold text-[#51071D] tracking-tight">
              ₹{total.toLocaleString('en-IN')}
            </span>
            {discount > 0 && (
              <span className="text-[11px] text-[#065F46] font-bold">
                (Save ₹{discount.toLocaleString('en-IN')})
              </span>
            )}
          </div>
          <span className="text-[10px] text-[#6E6760]">
            Inclusive of all taxes & doorstep transit
          </span>
        </div>

        {/* Right: Dual Action Buttons (View Cart Details & Checkout) */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          {/* View Cart Details Button */}
          <button
            type="button"
            onClick={openCartDrawer}
            suppressHydrationWarning
            className="flex-1 sm:flex-initial bg-[#FFFDF9] hover:bg-[#FAF2E6] text-[#51071D] border border-[#51071D]/40 font-label-md uppercase tracking-wider text-xs font-bold py-2.5 px-3 sm:px-4 rounded-xs transition-all shadow-2xs flex items-center justify-center gap-1.5 cursor-pointer active:scale-98"
          >
            <span className="material-symbols-outlined text-[17px]">receipt_long</span>
            <span className="whitespace-nowrap">View Cart Details</span>
          </button>

          {/* Checkout Button */}
          <Link
            href="/checkout"
            suppressHydrationWarning
            className="flex-1 sm:flex-initial bg-gradient-to-r from-[#51071D] via-[#6D0D26] to-[#51071D] hover:from-[#6D0D26] hover:to-[#51071D] text-[#FDE6B8] font-label-md uppercase tracking-wider text-xs sm:text-sm font-bold py-2.5 sm:py-3 px-4 sm:px-6 rounded-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98 border border-[#F3C068]/40"
          >
            <span className="material-symbols-outlined text-[17px] text-[#F3C068]">lock</span>
            <span className="whitespace-nowrap">Checkout</span>
            <span className="material-symbols-outlined text-[17px]">arrow_forward</span>
          </Link>
        </div>
      </div>
    </aside>
  );
};
