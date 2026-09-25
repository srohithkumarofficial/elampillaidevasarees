'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '../context/CartContext';

export const CartDrawer: React.FC = () => {
  const {
    items,
    isCartDrawerOpen,
    closeCartDrawer,
    updateQuantity,
    removeFromCart,
    subtotal,
    cartCount,
  } = useCart();
  const router = useRouter();

  if (!isCartDrawerOpen) return null;

  const handleCheckoutClick = () => {
    closeCartDrawer();
    router.push('/checkout');
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-inverse-surface/60 backdrop-blur-sm transition-opacity"
        onClick={closeCartDrawer}
      />

      {/* Slide-over panel */}
      <div className="relative w-full max-w-md bg-surface-container-lowest h-full shadow-2xl flex flex-col z-10 border-l border-surface-container-high/40">
        {/* Drawer Header */}
        <div className="p-space-md bg-surface-container-low flex items-center justify-between border-b border-surface-container-high">
          <div className="flex items-center gap-space-xs">
            <span className="material-symbols-outlined text-primary text-[24px]">shopping_bag</span>
            <h2 className="font-headline-sm text-primary text-lg">Shopping Bag ({cartCount})</h2>
          </div>
          <button
            type="button"
            onClick={closeCartDrawer}
            aria-label="Close cart drawer"
            className="p-1 text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[22px]">close</span>
          </button>
        </div>

        {/* Free shipping progress indicator */}
        <div className="bg-primary-container px-4 py-2 text-secondary-fixed text-xs flex items-center justify-between">
          <span className="flex items-center gap-1 font-medium">
            <span className="material-symbols-outlined text-[16px]">local_shipping</span>
            {subtotal >= 2999
              ? 'Complimentary Express Shipping Unlocked!'
              : `Add ₹${(2999 - subtotal).toLocaleString('en-IN')} for Free Express Delivery`}
          </span>
          <span className="font-bold text-[10px]">₹2,999 GOAL</span>
        </div>

        {/* Cart items list */}
        <div className="flex-1 overflow-y-auto p-space-md space-y-space-md">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-3">
              <span className="material-symbols-outlined text-outline text-[48px]">shopping_bag</span>
              <h3 className="font-headline-sm text-on-surface">Your Bag is Empty</h3>
              <p className="font-body-sm text-on-surface-variant text-xs">
                Explore our master loom creations and select an heirloom drape.
              </p>
              <button
                type="button"
                onClick={() => {
                  closeCartDrawer();
                  router.push('/shop');
                }}
                className="bg-primary text-on-primary font-label-md uppercase tracking-wider px-6 py-2.5 text-xs hover:bg-primary-container transition-colors cursor-pointer"
              >
                Browse Collections
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={`${item.product.id}-${item.selectedColor}`}
                className="bg-surface-container-low p-space-sm flex gap-space-sm border border-surface-container-high/40 shadow-sm"
              >
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-20 h-24 object-cover shrink-0 bg-surface-container"
                />
                <div className="flex-1 flex flex-col justify-between min-w-0">
                  <div>
                    <h4 className="font-headline-sm text-primary text-sm line-clamp-1">
                      {item.product.name}
                    </h4>
                    <p className="font-body-sm text-on-surface-variant text-xs mt-0.5">
                      Palette: <span className="font-medium text-on-surface">{item.selectedColor}</span>
                    </p>
                    <p className="font-headline-sm text-primary text-sm font-semibold mt-1">
                      ₹{item.product.price.toLocaleString('en-IN')}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-2 pt-1 border-t border-surface-container-high/30">
                    <div className="flex items-center border border-surface-container-highest bg-surface-container-lowest">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.product.id, item.selectedColor, -1)}
                        className="w-7 h-7 flex items-center justify-center text-on-surface hover:bg-surface-container transition-colors cursor-pointer"
                      >
                        -
                      </button>
                      <span className="w-8 text-center text-xs font-semibold">{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.product.id, item.selectedColor, 1)}
                        className="w-7 h-7 flex items-center justify-center text-on-surface hover:bg-surface-container transition-colors cursor-pointer"
                      >
                        +
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeFromCart(item.product.id, item.selectedColor)}
                      className="text-on-surface-variant hover:text-error transition-colors p-1 cursor-pointer"
                      title="Remove item"
                    >
                      <span className="material-symbols-outlined text-[18px]">delete</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer */}
        {items.length > 0 && (
          <div className="p-space-md bg-surface-container-low border-t border-surface-container-high space-y-space-sm">
            <div className="flex items-baseline justify-between">
              <span className="font-label-md uppercase tracking-wider text-on-surface-variant text-xs">
                Estimated Subtotal
              </span>
              <span className="font-headline-sm text-primary text-xl font-bold">
                ₹{subtotal.toLocaleString('en-IN')}
              </span>
            </div>
            <p className="font-body-sm text-on-surface-variant text-[11px]">
              Taxes and insured delivery calculated during secure checkout.
            </p>

            <button
              type="button"
              onClick={handleCheckoutClick}
              className="w-full bg-primary hover:bg-primary-container text-on-primary font-label-lg uppercase tracking-wider py-3.5 transition-colors flex items-center justify-center gap-space-xs shadow-md cursor-pointer text-xs"
            >
              <span>Proceed to Checkout</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>

            <div className="flex gap-2">
              <Link
                href="/cart"
                onClick={closeCartDrawer}
                className="flex-1 py-2 text-center text-xs font-semibold text-secondary hover:text-primary uppercase tracking-wider underline"
              >
                View Full Cart
              </Link>
              <button
                type="button"
                onClick={closeCartDrawer}
                className="flex-1 py-2 text-center text-xs font-semibold text-on-surface-variant hover:text-on-surface uppercase tracking-wider cursor-pointer"
              >
                Continue Browsing
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
