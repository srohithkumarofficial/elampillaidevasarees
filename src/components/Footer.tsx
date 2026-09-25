'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export const Footer: React.FC = () => {
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="w-full bg-surface-container-low text-on-surface pt-space-xl pb-space-lg shadow-[0_-4px_24px_-8px_rgba(41,37,34,0.04)] border-t border-surface-container-high/40">
      <div className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-space-lg pb-space-xl">
          {/* Col 1: Brand Info */}
          <div className="space-y-space-md lg:pr-space-sm">
            <div className="flex items-center gap-space-xs">
              <img
                alt="Deva Sarees"
                className="h-12 w-auto object-contain"
                src="/logo.png"
              />
            </div>
            <p className="font-body-sm text-on-surface-variant leading-relaxed">
              Dedicated to preserving the master handloom traditions. Creating heirloom drapes for cherished celebrations.
            </p>
            <div className="pt-space-xs">
              <a
                className="inline-flex items-center gap-space-xs text-secondary hover:text-primary font-label-sm uppercase tracking-wider transition-colors"
                href="https://instagram.com/elampillai_deva._.sarees"
                rel="noopener noreferrer"
                target="_blank"
              >
                <span className="material-symbols-outlined text-[16px]">photo_camera</span>
                <span>@elampillai_deva._.sarees</span>
              </a>
            </div>
          </div>

          {/* Col 2: Curated Collections */}
          <div>
            <h4 className="font-label-lg uppercase tracking-wider text-primary mb-space-md">
              Curated Collections
            </h4>
            <ul className="space-y-space-xs font-body-sm text-on-surface-variant">
              <li>
                <Link href="/shop" className="hover:text-primary transition-colors">
                  Pure Silk Sarees
                </Link>
              </li>
              <li>
                <Link href="/shop?category=Soft%20Silk" className="hover:text-primary transition-colors">
                  Traditional Soft Silk
                </Link>
              </li>
              <li>
                <Link href="/shop?category=Traditional%20Cotton" className="hover:text-primary transition-colors">
                  Handloom Cotton
                </Link>
              </li>
              <li>
                <Link href="/shop?category=Bridal%20Pattu" className="hover:text-primary transition-colors">
                  Bridal Zari Pattu
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-primary transition-colors">
                  Temple Border Drapes
                </Link>
              </li>
              <li>
                <Link href="/shop?category=Festive%20Edit" className="hover:text-primary transition-colors">
                  Festive Party Wear
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Customer Care */}
          <div>
            <h4 className="font-label-lg uppercase tracking-wider text-primary mb-space-md">
              Customer Care
            </h4>
            <ul className="space-y-space-xs font-body-sm text-on-surface-variant">
              <li>
                <Link href="/order-tracking" className="hover:text-primary transition-colors">
                  Track Your Order
                </Link>
              </li>
              <li>
                <Link href="/order-tracking" className="hover:text-primary transition-colors">
                  Shipping &amp; Delivery
                </Link>
              </li>
              <li>
                <Link href="/order-tracking" className="hover:text-primary transition-colors">
                  Return &amp; Exchange Policy
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-primary transition-colors">
                  Saree Care Guide
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-primary transition-colors">
                  Authenticity Guarantee
                </Link>
              </li>
              <li>
                <Link href="/order-tracking" className="hover:text-primary transition-colors">
                  FAQs &amp; Help
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Boutique Atelier */}
          <div>
            <h4 className="font-label-lg uppercase tracking-wider text-primary mb-space-md">
              Boutique Atelier
            </h4>
            <address className="not-italic font-body-sm text-on-surface-variant space-y-space-xs leading-relaxed">
              <p>
                Elampillai Weavers Cluster,<br />
                Salem District,<br />
                Tamil Nadu - 637502
              </p>
              <div className="pt-space-xs">
                <p className="text-on-surface font-semibold">Contact &amp; Concierge</p>
                <a
                  href="https://wa.me/919842000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-secondary hover:underline block"
                >
                  WhatsApp: +91 98420 00000
                </a>
                <p className="text-on-surface-variant text-xs">Mon - Sat: 9:30 AM - 7:30 PM IST</p>
              </div>
            </address>
          </div>

          {/* Col 5: The Silk Chronicle */}
          <div className="space-y-space-sm">
            <h4 className="font-label-lg uppercase tracking-wider text-primary">
              The Silk Chronicle
            </h4>
            <p className="font-body-sm text-on-surface-variant leading-relaxed">
              Receive private invitations to artisanal loom releases and bespoke festive previews.
            </p>
            {subscribed ? (
              <div className="p-3 bg-primary-container text-secondary-fixed text-xs font-medium">
                Thank you for joining The Silk Society. Private invitations will be sent to your inbox.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-space-xs pt-space-xs">
                <div className="flex flex-col gap-space-xs">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    suppressHydrationWarning
                    className="w-full bg-surface-container-lowest px-space-md py-space-sm font-body-sm text-on-surface placeholder:text-outline border-0 focus:outline-none focus:ring-1 focus:ring-secondary"
                  />
                  <button
                    type="submit"
                    suppressHydrationWarning
                    className="w-full bg-primary-container hover:bg-primary text-on-primary font-label-md uppercase tracking-wider py-space-sm transition-colors cursor-pointer text-xs"
                  >
                    Subscribe
                  </button>
                </div>
              </form>
            )}
            <p className="font-label-sm text-on-surface-variant pt-space-xs opacity-75 text-[11px]">
              We honor your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>

        {/* Bottom Bar: Payment Badges & Copyright */}
        <div className="pt-space-lg border-t border-surface-container-highest/60 flex flex-col md:flex-row items-center justify-between gap-space-md font-body-sm text-on-surface-variant">
          <div className="flex flex-wrap items-center gap-space-sm">
            <span className="font-label-sm uppercase tracking-wider text-secondary">
              Secure Payment:
            </span>
            <span className="px-space-sm py-1 bg-surface-container-highest text-on-surface font-label-sm text-xs">
              UPI
            </span>
            <span className="px-space-sm py-1 bg-surface-container-highest text-on-surface font-label-sm text-xs">
              RuPay
            </span>
            <span className="px-space-sm py-1 bg-surface-container-highest text-on-surface font-label-sm text-xs">
              Visa
            </span>
            <span className="px-space-sm py-1 bg-surface-container-highest text-on-surface font-label-sm text-xs">
              Mastercard
            </span>
            <span className="px-space-sm py-1 bg-surface-container-highest text-on-surface font-label-sm text-xs">
              NetBanking
            </span>
          </div>
          <div className="text-center md:text-right font-body-sm text-xs">
            © 2026 Deva Sarees. All Rights Reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};
