'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '../../context/CartContext';
import { ShoppingBag, ArrowLeft, ArrowRight, Trash2, Plus, Minus, ShieldCheck, Sparkles, Tag } from 'lucide-react';

export default function CartPage() {
  const router = useRouter();
  const {
    items,
    removeFromCart,
    updateQuantity,
    subtotal,
    discount,
    shipping,
    total,
    appliedPromo,
    applyPromo,
    removePromo,
    clearCart,
  } = useCart();

  const [promoInput, setPromoInput] = useState('');
  const [promoMsg, setPromoMsg] = useState('');

  const freeShippingThreshold = 2999;
  const remainingForFree = Math.max(0, freeShippingThreshold - subtotal);
  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (applyPromo(promoInput)) {
      setPromoMsg('Coupon applied successfully!');
    } else {
      setPromoMsg('Invalid coupon. Try HERITAGE10 for 10% off.');
    }
  };

  if (items.length === 0) {
    return (
      <div className="bg-[#FAF7F2] min-h-screen py-16 px-4">
        <div className="max-w-md mx-auto bg-white p-10 rounded-2xl border border-[#E8E2D9] text-center shadow-sm">
          <div className="w-16 h-16 bg-[#51071D]/10 rounded-full flex items-center justify-center mx-auto mb-4 text-[#51071D]">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h1 className="font-serif text-2xl text-[#1F1916] mb-2">Your Shopping Bag is Empty</h1>
          <p className="text-xs text-stone-500 mb-6 leading-relaxed">
            Discover exquisite handwoven sarees direct from Salem master weavers.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#51071D] text-white rounded-lg text-xs font-semibold uppercase tracking-wider hover:bg-[#6E1F32]"
          >
            Explore Handlooms <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FAF7F2] min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-stone-500 mb-6">
          <Link href="/" className="hover:text-[#51071D] flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Atelier
          </Link>
          <span>/</span>
          <span>Shopping Bag ({items.length} items)</span>
        </div>

        <h1 className="font-serif text-3xl text-[#1F1916] mb-8 font-medium">Shopping Bag</h1>

        {/* Free Shipping Tracker */}
        <div className="bg-white rounded-xl p-4 sm:p-5 border border-[#E8E2D9] mb-8 shadow-sm">
          <div className="flex justify-between text-xs mb-2">
            <span className="font-medium text-stone-700">
              {remainingForFree === 0 ? (
                <span className="text-emerald-700 font-semibold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> You have unlocked Complimentary Express Shipping!
                </span>
              ) : (
                <span>
                  Add <strong className="text-[#51071D]">₹{remainingForFree.toLocaleString('en-IN')}</strong> more for Complimentary Express Shipping
                </span>
              )}
            </span>
            <span className="text-stone-500 font-mono">{progressPercent}%</span>
          </div>
          <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#51071D] transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Items Column */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-4 sm:p-6 border border-[#E8E2D9] shadow-sm flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center"
              >
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-20 h-26 sm:w-24 sm:h-32 object-cover rounded-xl border border-stone-200"
                />

                <div className="flex-1 min-w-0">
                  <span className="text-[10px] uppercase tracking-wider text-[#C5A059] font-bold">
                    {item.product.category}
                  </span>
                  <Link
                    href={`/product/${item.product.id}`}
                    className="font-serif text-base text-[#1F1916] hover:text-[#51071D] block mt-0.5 font-medium"
                  >
                    {item.product.name}
                  </Link>
                  <p className="text-xs text-stone-500 mt-1">
                    Fabric: {item.product.fabric} • Color: {item.selectedColor}
                  </p>

                  <div className="flex items-center gap-4 mt-3">
                    {/* Quantity controls */}
                    <div className="flex items-center border border-[#E8E2D9] rounded-lg overflow-hidden">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.selectedColor, item.quantity - 1)}
                        className="px-2.5 py-1 text-stone-600 hover:bg-stone-50"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-3 py-1 text-xs font-mono font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.selectedColor, item.quantity + 1)}
                        className="px-2.5 py-1 text-stone-600 hover:bg-stone-50"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.product.id, item.selectedColor)}
                      className="text-xs text-stone-400 hover:text-rose-600 flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Remove
                    </button>
                  </div>
                </div>

                <div className="sm:text-right w-full sm:w-auto flex sm:flex-col justify-between items-baseline sm:items-end pt-2 sm:pt-0 border-t sm:border-t-0 border-stone-100">
                  <div className="font-serif text-lg font-bold text-[#51071D]">
                    ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                  </div>
                  <div className="text-xs text-stone-400 line-through">
                    ₹{(item.product.originalPrice * item.quantity).toLocaleString('en-IN')}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary Column */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E8E2D9] shadow-sm">
              <h2 className="font-serif text-lg text-[#1F1916] font-medium mb-6">Order Summary</h2>

              {/* Promo input */}
              <form onSubmit={handleApplyCoupon} className="mb-6">
                <label className="block text-xs font-medium text-stone-600 mb-1.5 flex items-center gap-1">
                  <Tag className="w-3 h-3 text-[#C5A059]" /> Promo Coupon
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    placeholder="e.g. HERITAGE10"
                    className="flex-1 px-3 py-2 border border-[#E8E2D9] rounded-lg text-xs font-mono uppercase bg-[#FAF7F2] focus:outline-none focus:border-[#51071D]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#51071D] text-white rounded-lg text-xs font-medium hover:bg-[#6E1F32]"
                  >
                    Apply
                  </button>
                </div>
                {promoMsg && <p className="text-[11px] text-emerald-700 mt-1.5">{promoMsg}</p>}
                {appliedPromo && (
                  <div className="flex justify-between items-center bg-emerald-50 text-emerald-800 px-2.5 py-1 rounded text-xs mt-2 border border-emerald-200">
                    <span>Coupon '{appliedPromo}' Active</span>
                    <button type="button" onClick={removePromo} className="text-rose-600 font-bold ml-2">×</button>
                  </div>
                )}
              </form>

              <div className="space-y-3 text-xs sm:text-sm text-stone-600 pb-6 border-b border-stone-100">
                <div className="flex justify-between">
                  <span>Bag Subtotal:</span>
                  <span className="font-mono">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Patron Discount:</span>
                    <span className="font-mono">-₹{discount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Express Transit:</span>
                  <span>{shipping === 0 ? <strong className="text-emerald-700 uppercase text-xs">Free</strong> : `₹${shipping}`}</span>
                </div>
              </div>

              <div className="pt-6 flex justify-between items-baseline mb-6">
                <span className="font-serif text-base font-bold text-stone-900">Total Payable:</span>
                <span className="font-serif text-2xl font-bold text-[#51071D]">
                  ₹{total.toLocaleString('en-IN')}
                </span>
              </div>

              <Link
                href="/checkout"
                className="w-full py-3.5 bg-[#51071D] text-white rounded-xl text-xs font-semibold uppercase tracking-wider hover:bg-[#6E1F32] flex items-center justify-center gap-2 shadow-sm transition-colors"
              >
                Proceed to Checkout <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="bg-[#FAF2EB] rounded-2xl p-5 border border-[#E3D0BE] text-xs text-stone-600 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-[#51071D] shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-[#51071D]">Silk Mark Certified Dispatch</p>
                <p className="mt-0.5 text-stone-500 leading-relaxed">
                  All sarees undergo multi-point weaver inspection in Salem and ship in weather-proof ceremonial gift boxes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
