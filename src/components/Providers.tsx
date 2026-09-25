'use client';

import React from 'react';
import { AuthProvider } from '../context/AuthContext';
import { CartProvider } from '../context/CartContext';
import { WishlistProvider } from '../context/WishlistContext';
import { Header } from './Header';
import { Footer } from './Footer';
import { AuthModal } from './AuthModal';
import { CartDrawer } from './CartDrawer';
import { ToastNotification } from './ToastNotification';
import { BottomCartBar } from './BottomCartBar';

export const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <div className="min-h-screen flex flex-col bg-surface text-on-surface antialiased">
            <Header />
            <main className="flex-1 pt-20 pb-16 w-full">{children}</main>
            <Footer />
            <AuthModal />
            <CartDrawer />
            <BottomCartBar />
            <ToastNotification />
          </div>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
};
