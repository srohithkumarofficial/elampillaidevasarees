'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { MAIN_NAV_ITEMS, NavItem } from '../data/navigation';
import { NavDropdown } from './NavDropdown';
import { SearchModal } from './SearchModal';

export const Header: React.FC = () => {
  const { isAuthenticated, openAuthGate } = useAuth();
  const { cartCount, openCartDrawer } = useCart();
  const { wishlistCount } = useWishlist();
  const pathname = usePathname();

  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  // Active desktop dropdown ID (null if none)
  const [activeDropdownId, setActiveDropdownId] = useState<string | null>(null);

  // Mobile accordion open states: dynamic mapping of item.id -> boolean
  const [mobileOpenSections, setMobileOpenSections] = useState<Record<string, boolean>>({
    shop: true,
    collections: true,
  });

  const toggleMobileSection = (id: string) => {
    setMobileOpenSections((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  // Keyboard shortcut: Pressing Ctrl+K or / opens search modal
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || (e.key === '/' && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA')) {
        e.preventDefault();
        setSearchModalOpen(true);
      }
    };
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

  const isLinkActive = (item: NavItem) => {
    if (item.path === '/') return pathname === '/';
    if (item.path.startsWith('/shop')) {
      return pathname.startsWith('/shop');
    }
    return pathname === item.path;
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40">
        {/* Main Navbar: Warm Luminous Silk Ivory with Jewel Accents and Royal Crimson Branding */}
        <div className="h-20 bg-gradient-to-b from-[#FFFDF9] via-[#FAF5EC] to-[#F6EFE3] backdrop-blur-md shadow-[0_10px_30px_rgba(81,7,29,0.08)] border-b border-[#E8D5B5] relative">
          {/* Micro Gold Filament Accent at Bottom Edge */}
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37]/80 to-transparent" />

          <div className="max-w-[1440px] h-full mx-auto px-margin-mobile md:px-margin flex items-center justify-between gap-4 lg:gap-8">
            {/* Left: Brand Logo */}
            <div className="flex items-center gap-3 sm:gap-4 shrink-0 mr-2 md:mr-6 lg:mr-8">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="xl:hidden p-2 -ml-2 text-[#51071D] hover:bg-[#51071D]/10 rounded-full transition-colors cursor-pointer"
                aria-label="Open mobile menu"
                suppressHydrationWarning
              >
                <span className="material-symbols-outlined text-[26px]">menu</span>
              </button>

              {/* Logo Image */}
              <Link href="/" className="flex items-center py-1 select-none">
                <img
                  src="/logo.png"
                  alt="Deva Sarees"
                  className="h-12 sm:h-14 w-auto object-contain hover:opacity-95 transition-opacity"
                />
              </Link>
            </div>

            {/* Center: Generic Desktop Navigation with Dynamic Dropdowns */}
            <nav className="hidden xl:flex items-center gap-6 lg:gap-8 h-full">
              {MAIN_NAV_ITEMS.map((item) => {
                const active = isLinkActive(item);
                const hasDropdown = Boolean(item.dropdown);
                const isDropdownOpen = activeDropdownId === item.id;

                if (!hasDropdown) {
                  return (
                    <Link
                      key={item.id}
                      href={item.path}
                      className={`font-label-md uppercase tracking-wider transition-colors py-2 text-xs font-semibold relative flex items-center ${
                        active ? 'text-[#51071D]' : 'text-[#4A4540] hover:text-[#51071D]'
                      }`}
                    >
                      <span>{item.label}</span>
                      {item.isNewBadge && (
                        <span className="ml-1.5 px-2 py-0.5 text-[9px] font-bold tracking-widest uppercase rounded-full bg-gradient-to-r from-[#B8001F] via-[#D4145A] to-[#E63946] text-white shadow-xs ring-1 ring-[#B8001F]/40 animate-pulse">
                          New
                        </span>
                      )}
                      {active && (
                        <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-6 h-[2.5px] bg-gradient-to-r from-[#D4AF37] via-[#8C6D3B] to-[#D4AF37] rounded-full shadow-xs" />
                      )}
                    </Link>
                  );
                }

                return (
                  <div
                    key={item.id}
                    className="relative h-full flex items-center group/navitem"
                    onMouseEnter={() => setActiveDropdownId(item.id)}
                    onMouseLeave={() => setActiveDropdownId(null)}
                  >
                    <Link
                      href={item.path}
                      className={`font-label-md uppercase tracking-wider transition-colors py-2 text-xs font-semibold flex items-center gap-1 cursor-pointer relative ${
                        active ? 'text-[#51071D]' : 'text-[#4A4540] hover:text-[#51071D]'
                      }`}
                    >
                      <span>{item.label}</span>
                      <span
                        className={`material-symbols-outlined text-[16px] text-[#8C6D3B] transition-transform duration-200 ${
                          isDropdownOpen ? 'rotate-180 text-[#51071D]' : 'group-hover/navitem:rotate-180'
                        }`}
                      >
                        expand_more
                      </span>
                      {active && (
                        <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-6 h-[2.5px] bg-gradient-to-r from-[#D4AF37] via-[#8C6D3B] to-[#D4AF37] rounded-full shadow-xs" />
                      )}
                    </Link>

                    {/* Generic Nav Dropdown */}
                    {item.dropdown && (
                      <NavDropdown
                        config={item.dropdown}
                        isOpen={isDropdownOpen}
                        onClose={() => setActiveDropdownId(null)}
                      />
                    )}
                  </div>
                );
              })}
            </nav>

            {/* Right: Predictive Search Trigger, Wishlist, Cart, Account */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              {/* Regional Heritage GI Seal (Desktop) */}
              <div className="hidden 2xl:flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-[#FFF8E7] to-[#FDF2F8] border border-[#E8D5B5] shadow-2xs text-[11px] font-semibold text-[#51071D]">
                <span className="material-symbols-outlined text-[15px] text-[#D4AF37]">verified</span>
                <span>GI Certified Looms</span>
              </div>

              {/* Predictive Live Search Trigger Button */}
              <button
                type="button"
                onClick={() => setSearchModalOpen(true)}
                aria-label="Search Catalog"
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FAF5EC] hover:bg-[#FFF9F0] text-[#51071D] hover:text-[#7A0C2E] border border-[#E8D5B5] hover:border-[#D4AF37] transition-all cursor-pointer shadow-2xs group"
                suppressHydrationWarning
              >
                <span className="material-symbols-outlined text-[20px] text-[#8C6D3B] group-hover:text-[#51071D]">
                  search
                </span>
                <span className="hidden md:inline-block text-xs font-semibold text-[#6E6760] group-hover:text-[#51071D]">
                  Search sarees...
                </span>
                <kbd className="hidden lg:inline-flex items-center text-[9px] bg-white px-1.5 py-0.5 rounded border border-[#E8D5B5] text-[#8C6D3B] font-mono shadow-2xs">
                  /
                </kbd>
              </button>

              {/* Wishlist Link with Ruby Badge */}
              <Link
                href="/wishlist"
                aria-label="Wishlist"
                className="relative w-10 h-10 rounded-full flex items-center justify-center text-[#51071D] hover:bg-[#51071D]/10 hover:text-[#7A0C2E] transition-all"
                suppressHydrationWarning
              >
                <span className="material-symbols-outlined text-[22px]">favorite</span>
                {wishlistCount > 0 && (
                  <span className="absolute top-1 right-1 bg-gradient-to-tr from-[#9B111E] to-[#E63946] text-white font-label-sm w-4 h-4 rounded-full flex items-center justify-center text-[10px] leading-none font-bold shadow-sm ring-1 ring-white">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Shopping Bag Button with Royal Gold Zari Badge */}
              <button
                type="button"
                onClick={openCartDrawer}
                aria-label="Shopping Bag"
                className="relative w-10 h-10 rounded-full flex items-center justify-center text-[#51071D] hover:bg-[#51071D]/10 hover:text-[#7A0C2E] transition-all cursor-pointer"
                suppressHydrationWarning
              >
                <span className="material-symbols-outlined text-[22px]">shopping_bag</span>
                {cartCount > 0 && (
                  <span className="absolute top-1 right-1 bg-gradient-to-tr from-[#D4AF37] to-[#F3C068] text-[#3A2200] font-label-sm w-4 h-4 rounded-full flex items-center justify-center text-[10px] leading-none font-black shadow-sm ring-1 ring-white">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* User Account / Login Jewel Avatar Button */}
              {mounted && isAuthenticated ? (
                <Link
                  href="/account"
                  className="flex items-center p-1 rounded-full hover:scale-105 transition-transform group"
                  title="My Account"
                  suppressHydrationWarning
                >
                  <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#51071D] via-[#750A26] to-[#8A0F30] flex items-center justify-center shadow-md text-[#FDE6B8] ring-2 ring-[#D4AF37]/80 group-hover:ring-[#D4AF37] transition-all">
                    <span className="material-symbols-outlined text-[19px]">person</span>
                  </div>
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={() => openAuthGate()}
                  className="flex items-center p-1 rounded-full hover:scale-105 transition-transform group cursor-pointer"
                  title="Deva Atelier Sign In"
                  suppressHydrationWarning
                >
                  <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#51071D] via-[#750A26] to-[#8A0F30] flex items-center justify-center shadow-md text-[#FDE6B8] ring-2 ring-[#D4AF37]/80 group-hover:ring-[#D4AF37] transition-all">
                    <span className="material-symbols-outlined text-[19px]">person</span>
                  </div>
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Live Predictive Search Modal */}
      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
      />

      {/* Mobile Drawer Menu (Generic Dynamic Structure) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer Container */}
          <div className="relative w-4/5 max-w-sm bg-gradient-to-b from-[#FFFDF9] via-[#FAF5EC] to-[#F5EFE3] h-full shadow-2xl flex flex-col z-10 overflow-y-auto border-r border-[#E8D5B5]">
            {/* Drawer Header */}
            <div className="p-4 flex items-center justify-between border-b border-[#E8D5B5] bg-[#FAF5EC]">
              <Link href="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center">
                <img
                  src="/logo.png"
                  alt="Deva Sarees"
                  className="h-10 w-auto object-contain"
                />
              </Link>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-[#51071D] hover:bg-[#51071D]/10 rounded-full cursor-pointer"
                aria-label="Close mobile menu"
                suppressHydrationWarning
              >
                <span className="material-symbols-outlined text-[22px]">close</span>
              </button>
            </div>

            {/* Mobile Quick Search Bar */}
            <div className="p-3 border-b border-[#E8D5B5]/60 bg-[#FFFDF9]">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setSearchModalOpen(true);
                }}
                className="w-full py-2.5 px-3 rounded-lg bg-[#FAF5EC] border border-[#E8D5B5] text-[#6E6760] text-xs flex items-center gap-2 cursor-pointer text-left"
              >
                <span className="material-symbols-outlined text-[18px] text-[#8C6D3B]">
                  search
                </span>
                <span>Instant search pure silk, bridal...</span>
              </button>
            </div>

            {/* Drawer Body - Generic Dynamic Navigation */}
            <nav className="p-4 space-y-2">
              {MAIN_NAV_ITEMS.map((item) => {
                if (!item.dropdown) {
                  return (
                    <Link
                      key={item.id}
                      href={item.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block py-3 px-3 font-label-md uppercase tracking-wider text-xs font-semibold text-[#2A2623] hover:bg-[#FAF2E6] hover:text-[#51071D] transition-colors rounded-sm"
                    >
                      <div className="flex items-center justify-between">
                        <span>{item.label}</span>
                        {item.isNewBadge && (
                          <span className="px-2 py-0.5 text-[9px] font-bold tracking-widest uppercase rounded-full bg-gradient-to-r from-[#B8001F] to-[#E63946] text-white">
                            New
                          </span>
                        )}
                      </div>
                    </Link>
                  );
                }

                const isSectionOpen = mobileOpenSections[item.id] ?? true;

                return (
                  <div key={item.id} className="border-t border-[#E8D5B5]/60 pt-2">
                    <div className="flex items-center justify-between py-2 px-3">
                      <Link
                        href={item.path}
                        onClick={() => setMobileMenuOpen(false)}
                        className="font-label-md uppercase tracking-wider text-xs font-bold text-[#51071D] flex items-center gap-1.5"
                      >
                        {item.dropdown.headerIcon && (
                          <span className="material-symbols-outlined text-[16px] text-[#8C6D3B]">
                            {item.dropdown.headerIcon}
                          </span>
                        )}
                        <span>{item.label}</span>
                      </Link>
                      <button
                        type="button"
                        onClick={() => toggleMobileSection(item.id)}
                        className="p-1 text-[#8C6D3B] hover:text-[#51071D] cursor-pointer"
                        aria-label={`Toggle ${item.label}`}
                        suppressHydrationWarning
                      >
                        <span
                          className={`material-symbols-outlined text-[20px] transition-transform duration-200 ${
                            isSectionOpen ? 'rotate-180' : ''
                          }`}
                        >
                          expand_more
                        </span>
                      </button>
                    </div>

                    {isSectionOpen && (
                      <div className="pl-2 pr-1 space-y-0.5 mt-1 border-l-2 border-[#D4AF37]/50 ml-3">
                        {item.dropdown.items.map((subItem) => (
                          <Link
                            key={subItem.path + subItem.label}
                            href={subItem.path}
                            onClick={() => setMobileMenuOpen(false)}
                            className="flex items-center justify-between gap-2 py-1.5 px-2.5 uppercase text-[11px] font-medium text-[#4A4540] hover:text-[#51071D] hover:bg-[#FAF2E6] transition-colors rounded-md"
                          >
                            <span className="flex items-center gap-2 min-w-0">
                              <span className={`material-symbols-outlined text-[15px] shrink-0 ${subItem.iconColor}`}>
                                {subItem.icon}
                              </span>
                              <span className="whitespace-nowrap truncate">{subItem.label}</span>
                            </span>
                            {subItem.tag && (
                              <span className={`text-[8px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded-full border whitespace-nowrap shrink-0 ${subItem.tagColor}`}>
                                {subItem.tag}
                              </span>
                            )}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Extra Account & Wishlist links in mobile drawer */}
              <div className="border-t border-[#E8D5B5]/60 pt-3 space-y-1">
                <Link
                  href="/wishlist"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between py-2.5 px-3 font-label-md uppercase tracking-wider text-xs text-[#51071D] hover:bg-[#FAF2E6] rounded-sm"
                >
                  <span className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px]">favorite</span>
                    <span>Wishlist ({wishlistCount})</span>
                  </span>
                </Link>
                <Link
                  href="/account"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between py-2.5 px-3 font-label-md uppercase tracking-wider text-xs text-[#51071D] hover:bg-[#FAF2E6] rounded-sm"
                >
                  <span className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px]">person</span>
                    <span>My Account / Orders</span>
                  </span>
                </Link>
              </div>
            </nav>

            {/* Mobile Footer Stamp */}
            <div className="mt-auto p-4 border-t border-[#E8D5B5] bg-[#FAF5EC] text-center">
              <span className="text-[11px] font-semibold text-[#8C6D3B] flex items-center justify-center gap-1">
                <span className="material-symbols-outlined text-[15px] text-[#D4AF37]">verified</span>
                Certified GI Salem Pit-Looms
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
