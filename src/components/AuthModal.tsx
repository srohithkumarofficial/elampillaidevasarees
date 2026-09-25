'use client';

import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { DEMO_PRODUCTS } from '../data/products';

export const AuthModal: React.FC = () => {
  const { authModalOpen, closeAuthGate, targetProductId, login, register } = useAuth();
  const [tab, setTab] = useState<'signin' | 'signup'>('signin');
  const [identifier, setIdentifier] = useState('priya.sundaram@gmail.com');
  const [fullName, setFullName] = useState('Priya Sundaram');
  const [password, setPassword] = useState('handloom2026');
  const [showPassword, setShowPassword] = useState(false);

  if (!authModalOpen) return null;

  // Selected product details to preview on the left panel
  const selectedProduct =
    DEMO_PRODUCTS.find((p) => p.id === targetProductId) || DEMO_PRODUCTS[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (tab === 'signin') {
      login(identifier || 'priya.sundaram@gmail.com', password, targetProductId || undefined);
    } else {
      register(fullName || 'Priya Sundaram', identifier || 'priya.sundaram@gmail.com', password, targetProductId || undefined);
    }
  };

  const handleGoogleSignIn = () => {
    login('priya.sundaram@gmail.com', 'google-oauth-demo', targetProductId || undefined);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-space-xs sm:p-space-md"
      role="dialog"
      aria-modal="true"
    >
      {/* Dimmed Luxury Backdrop with Warm Tonal Blur */}
      <div
        className="absolute inset-0 bg-inverse-surface/60 backdrop-blur-sm transition-opacity"
        onClick={closeAuthGate}
      />

      {/* Centered High-End Split Modal */}
      <div className="relative w-full max-w-4xl bg-surface-container-lowest shadow-2xl flex flex-col md:flex-row overflow-hidden max-h-[92vh] z-10 border border-secondary/20">
        {/* Modal Close Button */}
        <button
          type="button"
          onClick={closeAuthGate}
          aria-label="Close Authentication Modal"
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-surface-container-lowest/90 text-on-surface hover:text-primary flex items-center justify-center shadow-md transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>

        {/* Left Side: Product Preview Panel */}
        <div className="w-full md:w-5/12 bg-surface-container-low flex flex-col justify-between relative overflow-hidden shrink-0">
          <div className="relative h-64 md:h-full w-full min-h-[300px]">
            <img
              className="w-full h-full object-cover"
              alt={selectedProduct.name}
              src={selectedProduct.image}
            />
            {/* Ambient gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/40 to-transparent" />

            {/* Product Spec Floating Card */}
            <div className="absolute bottom-0 inset-x-0 p-space-md text-on-primary space-y-space-xs">
              <span className="inline-block px-2.5 py-1 bg-secondary text-on-secondary font-label-sm uppercase tracking-wider text-[10px]">
                Selected Saree
              </span>
              <h3 className="font-headline-sm text-on-primary leading-tight font-serif text-lg">
                {selectedProduct.name}
              </h3>
              <p className="font-body-sm text-primary-fixed opacity-90 text-xs">
                {selectedProduct.fabric} • Gold Zari Pallu
              </p>
              <div className="flex items-center gap-space-xs pt-1">
                <span className="font-headline-sm font-semibold text-on-primary text-base">
                  ₹{selectedProduct.price.toLocaleString('en-IN')}
                </span>
                <span className="font-body-sm text-primary-fixed-dim line-through text-xs">
                  ₹{selectedProduct.originalPrice.toLocaleString('en-IN')}
                </span>
                <span className="font-label-sm bg-secondary-fixed text-on-secondary-fixed px-2 py-0.5 uppercase tracking-wide font-bold ml-2 text-[10px]">
                  Special Loom Pricing
                </span>
              </div>
              <div className="pt-space-xs flex items-center gap-2 text-label-sm text-secondary-fixed text-xs">
                <span className="material-symbols-outlined text-[16px]">local_shipping</span>
                <span>Express Insured Shipping across India</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Luxury Authentication Gate */}
        <div className="w-full md:w-7/12 p-space-md sm:p-space-lg flex flex-col justify-between overflow-y-auto">
          <div>
            {/* Welcoming Header */}
            <div className="space-y-space-xs pr-space-md">
              <span className="font-label-sm uppercase tracking-widest text-secondary font-semibold text-xs">
                Deva Atelier Access
              </span>
              <h2 className="font-headline-lg text-primary tracking-tight font-serif leading-snug text-2xl">
                A Little Closer to Your Perfect Saree.
              </h2>
              <p className="font-body-sm text-on-surface-variant text-xs sm:text-sm">
                Sign in or create an account to discover every beautiful detail, view high-res draping, and continue your shopping journey.
              </p>
            </div>

            {/* Auth Tab Switcher */}
            <div className="flex mt-space-md bg-surface-container-high p-1">
              <button
                type="button"
                onClick={() => setTab('signin')}
                className={`flex-1 py-2 font-label-md uppercase tracking-wider text-center text-xs transition-all cursor-pointer ${
                  tab === 'signin'
                    ? 'bg-surface-container-lowest text-primary shadow-sm font-semibold'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => setTab('signup')}
                className={`flex-1 py-2 font-label-md uppercase tracking-wider text-center text-xs transition-all cursor-pointer ${
                  tab === 'signup'
                    ? 'bg-surface-container-lowest text-primary shadow-sm font-semibold'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                Create Account
              </button>
            </div>

            {/* Form Area */}
            <form onSubmit={handleSubmit} className="mt-space-md space-y-space-sm">
              {tab === 'signup' && (
                <div className="space-y-1">
                  <label className="block font-label-sm uppercase tracking-wider text-on-surface font-medium text-xs">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Priya Sundaram"
                    className="w-full bg-surface-container-low px-space-md py-space-sm font-body-sm text-on-surface placeholder:text-outline focus:outline-none focus:bg-surface-container-lowest transition-colors shadow-inner text-sm"
                  />
                </div>
              )}

              {/* Email or Mobile */}
              <div className="space-y-1">
                <label className="block font-label-sm uppercase tracking-wider text-on-surface font-medium text-xs">
                  Email or Mobile Number
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="e.g. priya.sharma@gmail.com or 9842000000"
                    className="w-full bg-surface-container-low px-space-md py-space-sm font-body-sm text-on-surface placeholder:text-outline focus:outline-none focus:bg-surface-container-lowest transition-colors shadow-inner text-sm pr-10"
                  />
                  <span className="material-symbols-outlined absolute right-3 top-2.5 text-[20px] text-outline pointer-events-none">
                    mail
                  </span>
                </div>
              </div>

              {/* Password with Show/Hide Toggle */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="block font-label-sm uppercase tracking-wider text-on-surface font-medium text-xs">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => alert('Demo account reset: Use any password to access.')}
                    className="font-label-sm text-secondary hover:text-primary transition-colors text-xs"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your secret passkey"
                    className="w-full bg-surface-container-low px-space-md py-space-sm font-body-sm text-on-surface placeholder:text-outline focus:outline-none focus:bg-surface-container-lowest transition-colors shadow-inner text-sm pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label="Toggle password visibility"
                    className="absolute right-3 top-2.5 text-outline hover:text-primary flex items-center justify-center cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      {showPassword ? 'visibility_off' : 'visibility'}
                    </span>
                  </button>
                </div>
              </div>

              {/* Primary Action Button */}
              <div className="pt-space-xs">
                <button
                  type="submit"
                  className="w-full bg-primary-container hover:bg-primary text-on-primary font-label-lg uppercase tracking-widest py-3.5 shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-space-xs text-xs sm:text-sm cursor-pointer"
                >
                  <span>
                    {tab === 'signin' ? 'Sign In & View Saree' : 'Create Account & View Saree'}
                  </span>
                  <span className="material-symbols-outlined text-[18px]">lock_open</span>
                </button>
              </div>
            </form>

            {/* Divider */}
            <div className="relative my-space-md text-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full bg-surface-container-highest h-[1px]" />
              </div>
              <span className="relative px-space-sm bg-surface-container-lowest font-label-sm uppercase tracking-wider text-on-surface-variant text-[11px]">
                or continue with
              </span>
            </div>

            {/* Social Button: Google */}
            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="w-full bg-surface-container-low hover:bg-surface-container-high text-on-surface font-label-md tracking-wider py-2.5 flex items-center justify-center gap-space-sm shadow-sm transition-colors cursor-pointer text-xs"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
                  fill="#4285F4"
                />
                <path
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24z"
                  fill="#34A853"
                />
                <path
                  d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.97 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                  fill="#EA4335"
                />
              </svg>
              <span className="font-body-sm font-medium">Continue with Google Account</span>
            </button>
          </div>

          {/* Footer Back Action */}
          <div className="pt-space-md flex items-center justify-between text-on-surface-variant font-label-sm border-t border-surface-container-high/40 mt-4 text-xs">
            <button
              type="button"
              onClick={closeAuthGate}
              className="hover:text-primary transition-colors flex items-center gap-1 font-semibold cursor-pointer"
            >
              <span>←</span> Continue Browsing Collection
            </button>
            <span className="opacity-70 text-[11px]">100% Genuine Handlooms</span>
          </div>
        </div>
      </div>
    </div>
  );
};
