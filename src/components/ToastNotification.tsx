import React from 'react';
import { useCart } from '../context/CartContext';

export const ToastNotification: React.FC = () => {
  const { toast, dismissToast, openCartDrawer } = useCart();

  if (!toast.visible) return null;

  return (
    <div
      className="fixed top-24 right-4 sm:right-8 z-50 transform transition-all duration-500 ease-out max-w-md w-full bg-surface-container-lowest text-on-surface shadow-2xl p-space-md flex items-center justify-between gap-space-md border border-secondary/20"
      role="status"
      aria-live="polite"
    >
      <div className="flex items-center gap-space-sm min-w-0">
        <div className="w-10 h-10 bg-primary-container text-on-primary flex items-center justify-center shrink-0">
          <span className="material-symbols-outlined text-[20px]">check</span>
        </div>
        <div className="min-w-0">
          <p className="font-label-md uppercase tracking-wider text-primary">Added to your Shopping Bag</p>
          <p className="font-body-sm text-on-surface-variant truncate">
            {toast.title} ({toast.price})
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={openCartDrawer}
          className="text-xs font-semibold text-secondary hover:text-primary uppercase tracking-wider underline cursor-pointer"
        >
          View Bag
        </button>
        <button
          onClick={dismissToast}
          aria-label="Dismiss toast"
          className="text-on-surface-variant hover:text-primary transition-colors p-space-xs cursor-pointer"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>
      </div>
    </div>
  );
};
