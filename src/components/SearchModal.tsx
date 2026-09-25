'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { DEMO_PRODUCTS } from '../data/products';
import { SareeProduct } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const POPULAR_SEARCHES = [
  'Kanchipuram Silk',
  'Bridal Red Pattu',
  'Soft Silk',
  'Salem Cotton',
  'Golden Tissue',
  'Temple Border',
  'Haldi Saffron',
  'Rani Pink',
];

const QUICK_CATEGORIES = [
  { name: 'Kanchipuram Silk', icon: 'diamond', color: 'bg-rose-50 text-rose-800 border-rose-200' },
  { name: 'Soft Silk', icon: 'filter_vintage', color: 'bg-pink-50 text-pink-800 border-pink-200' },
  { name: 'Bridal Pattu', icon: 'workspace_premium', color: 'bg-amber-50 text-amber-800 border-amber-200' },
  { name: 'Traditional Cotton', icon: 'spa', color: 'bg-emerald-50 text-emerald-800 border-emerald-200' },
  { name: 'Organza Tussar', icon: 'grain', color: 'bg-orange-50 text-orange-800 border-orange-200' },
  { name: 'Festive Edit', icon: 'celebration', color: 'bg-red-50 text-red-800 border-red-200' },
];

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsContainerRef = useRef<HTMLDivElement>(null);

  // Auto-focus input on open and reset query
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      setSelectedIndex(-1);
    } else {
      setQuery('');
      setSelectedIndex(-1);
    }
  }, [isOpen]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Live filter results
  const trimmedQuery = query.trim().toLowerCase();

  const matchingProducts = useMemo(() => {
    if (!trimmedQuery) return [];
    return DEMO_PRODUCTS.filter((product) => {
      const q = trimmedQuery;
      return (
        product.name.toLowerCase().includes(q) ||
        product.category.toLowerCase().includes(q) ||
        product.fabric.toLowerCase().includes(q) ||
        product.colorName.toLowerCase().includes(q) ||
        product.occasion.toLowerCase().includes(q) ||
        product.sku.toLowerCase().includes(q) ||
        product.description.toLowerCase().includes(q) ||
        product.weaveHeritage.technique.toLowerCase().includes(q)
      );
    });
  }, [trimmedQuery]);

  // Matching categories based on current query
  const matchingCategories = useMemo(() => {
    if (!trimmedQuery) return [];
    const set = new Set<string>();
    DEMO_PRODUCTS.forEach((p) => {
      if (
        p.category.toLowerCase().includes(trimmedQuery) ||
        p.name.toLowerCase().includes(trimmedQuery)
      ) {
        set.add(p.category);
      }
    });
    return Array.from(set).map((cat) => {
      const count = DEMO_PRODUCTS.filter((p) => p.category === cat).length;
      return { category: cat, count };
    });
  }, [trimmedQuery]);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (selectedIndex >= 0 && matchingProducts[selectedIndex]) {
      router.push(`/product/${matchingProducts[selectedIndex].id}`);
      onClose();
      return;
    }
    if (trimmedQuery) {
      router.push(`/shop?search=${encodeURIComponent(trimmedQuery)}`);
      onClose();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev < matchingProducts.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > -1 ? prev - 1 : -1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }
  };

  const highlightMatch = (text: string, highlight: string) => {
    if (!highlight.trim()) return text;
    const parts = text.split(new RegExp(`(${highlight.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi'));
    return parts.map((part, i) =>
      part.toLowerCase() === highlight.toLowerCase() ? (
        <span key={i} className="bg-[#D4AF37]/30 text-[#51071D] font-bold px-0.5 rounded-xs">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-start items-center p-3 sm:p-6 md:p-10">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#2A0510]/60 backdrop-blur-md transition-opacity duration-300 animate-fadeIn"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-3xl bg-[#FFFDF9] border-2 border-[#D4AF37] rounded-xl shadow-[0_25px_60px_-15px_rgba(81,7,29,0.35)] overflow-hidden flex flex-col max-h-[88vh] z-10 animate-scaleUp">
        {/* Top Header Strip */}
        <div className="bg-gradient-to-r from-[#51071D] via-[#700E2B] to-[#51071D] px-5 py-3 flex items-center justify-between border-b border-[#D4AF37]/40">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px] text-[#F3C068]">
              search_spark
            </span>
            <span className="font-serif text-sm font-bold tracking-[0.14em] text-[#FDE6B8] uppercase">
              Predictive Heirloom Search
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-block text-[10px] text-[#FDE6B8]/70 font-label-sm uppercase tracking-wider">
              Press <kbd className="bg-black/30 px-1.5 py-0.5 rounded-xs border border-white/20 text-[#F3C068]">ESC</kbd> to exit
            </span>
            <button
              type="button"
              onClick={onClose}
              className="w-7 h-7 rounded-full flex items-center justify-center text-[#FDE6B8] hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Close search"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>
        </div>

        {/* Search Input Bar */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-5 border-b border-[#E8D5B5] bg-[#FAF5EC]/70 relative">
          <div className="relative flex items-center">
            <span className="material-symbols-outlined absolute left-4 text-[24px] text-[#8C6D3B] pointer-events-none">
              search
            </span>
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSelectedIndex(-1);
              }}
              onKeyDown={handleKeyDown}
              placeholder="Search by weave, fabric, color, occasion, zari, SKU (e.g. Kanchipuram, Bridal, Red)..."
              className="w-full bg-[#FFFDF9] pl-12 pr-24 py-3.5 text-[#2A2623] placeholder:text-[#8C837A] text-sm sm:text-base border-2 border-[#E8D5B5] focus:border-[#51071D] rounded-lg shadow-inner focus:outline-none transition-all font-body-md"
            />
            {query && (
              <button
                type="button"
                onClick={() => {
                  setQuery('');
                  setSelectedIndex(-1);
                  inputRef.current?.focus();
                }}
                className="absolute right-14 text-[#8C837A] hover:text-[#51071D] p-1 rounded-full hover:bg-[#FAF5EC] cursor-pointer"
                title="Clear search query"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            )}
            <button
              type="submit"
              className="absolute right-2 bg-gradient-to-r from-[#51071D] to-[#750A26] text-[#FDE6B8] px-3.5 py-2 rounded-md font-label-sm uppercase tracking-wider text-xs font-bold hover:from-[#750A26] hover:to-[#51071D] transition-all cursor-pointer shadow-xs"
            >
              Go
            </button>
          </div>
        </form>

        {/* Suggestions & Results Body */}
        <div ref={resultsContainerRef} className="p-4 sm:p-5 overflow-y-auto flex-1 space-y-5 custom-scrollbar">
          {/* STATE 1: Empty Query - Show Popular Searches & Category Badges */}
          {!trimmedQuery && (
            <div className="space-y-5">
              {/* Popular Search Keywords */}
              <div>
                <div className="flex items-center gap-2 mb-2.5">
                  <span className="material-symbols-outlined text-[16px] text-[#B8001F]">
                    trending_up
                  </span>
                  <span className="font-label-sm uppercase tracking-widest text-xs font-bold text-[#51071D]">
                    Trending Handloom Searches
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {POPULAR_SEARCHES.map((term) => (
                    <button
                      key={term}
                      type="button"
                      onClick={() => {
                        setQuery(term);
                        inputRef.current?.focus();
                      }}
                      className="px-3 py-1.5 rounded-full bg-[#FAF5EC] hover:bg-[#FAF2E6] text-[#51071D] hover:text-[#7A0C2E] border border-[#E8D5B5] hover:border-[#D4AF37] text-xs font-semibold tracking-wider transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs group"
                    >
                      <span className="material-symbols-outlined text-[14px] text-[#8C6D3B] group-hover:text-[#51071D]">
                        search
                      </span>
                      <span>{term}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Categories Filter */}
              <div>
                <div className="flex items-center gap-2 mb-2.5">
                  <span className="material-symbols-outlined text-[16px] text-[#8C6D3B]">
                    category
                  </span>
                  <span className="font-label-sm uppercase tracking-widest text-xs font-bold text-[#51071D]">
                    Explore By Weave Category
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {QUICK_CATEGORIES.map((cat) => (
                    <Link
                      key={cat.name}
                      href={`/shop?category=${encodeURIComponent(cat.name)}`}
                      onClick={onClose}
                      className="p-2.5 rounded-lg bg-[#FAF5EC] hover:bg-[#FFF9F0] border border-[#E8D5B5] hover:border-[#D4AF37] transition-all flex items-center gap-2.5 group shadow-2xs"
                    >
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 border ${cat.color}`}>
                        <span className="material-symbols-outlined text-[15px]">
                          {cat.icon}
                        </span>
                      </div>
                      <span className="font-label-md text-xs font-bold text-[#2A2623] group-hover:text-[#51071D] transition-colors truncate">
                        {cat.name}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Featured Curated Picks Preview */}
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[16px] text-[#D4AF37]">
                      star
                    </span>
                    <span className="font-label-sm uppercase tracking-widest text-xs font-bold text-[#51071D]">
                      Masterpiece Highlights
                    </span>
                  </div>
                  <Link
                    href="/shop"
                    onClick={onClose}
                    className="text-[11px] font-bold text-[#8C6D3B] hover:text-[#51071D] underline tracking-wider uppercase"
                  >
                    View All
                  </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {DEMO_PRODUCTS.slice(0, 4).map((product) => (
                    <Link
                      key={product.id}
                      href={`/product/${product.id}`}
                      onClick={onClose}
                      className="flex items-center gap-3 p-2 rounded-lg bg-[#FAF5EC] hover:bg-[#FFF9F0] border border-[#E8D5B5] hover:border-[#D4AF37] transition-all group"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-12 h-14 object-cover rounded-sm shrink-0 border border-[#E8D5B5]"
                      />
                      <div className="flex-1 min-w-0">
                        <span className="text-[9.5px] font-bold uppercase tracking-wider text-[#8C6D3B] block">
                          {product.category}
                        </span>
                        <h4 className="font-label-md text-xs font-bold text-[#2A2623] group-hover:text-[#51071D] transition-colors truncate">
                          {product.name}
                        </h4>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="font-bold text-xs text-[#51071D]">
                            ₹{product.price.toLocaleString('en-IN')}
                          </span>
                          <span className="text-[10px] text-[#8C837A] line-through">
                            ₹{product.originalPrice.toLocaleString('en-IN')}
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STATE 2: Has Query - Live Predictive Suggestions */}
          {trimmedQuery && (
            <div className="space-y-4">
              {/* Category Quick Pills */}
              {matchingCategories.length > 0 && (
                <div className="flex flex-wrap items-center gap-2 pb-2 border-b border-[#E8D5B5]/60">
                  <span className="font-label-sm uppercase tracking-wider text-[11px] text-[#8C6D3B] font-bold">
                    Filter by:
                  </span>
                  {matchingCategories.map(({ category, count }) => (
                    <Link
                      key={category}
                      href={`/shop?category=${encodeURIComponent(category)}`}
                      onClick={onClose}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF2E6] hover:bg-[#51071D] text-[#51071D] hover:text-[#FDE6B8] border border-[#E8D5B5] text-xs font-bold tracking-wider transition-all shadow-2xs"
                    >
                      <span>{category}</span>
                      <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-black/10">
                        {count}
                      </span>
                    </Link>
                  ))}
                </div>
              )}

              {/* Product Match Count Header */}
              <div className="flex items-center justify-between">
                <span className="font-label-sm uppercase tracking-widest text-xs font-bold text-[#51071D]">
                  {matchingProducts.length}{' '}
                  {matchingProducts.length === 1 ? 'Saree Match Found' : 'Sarees Matched'}
                </span>
                {matchingProducts.length > 0 && (
                  <button
                    type="button"
                    onClick={() => handleSubmit()}
                    className="text-[11px] font-bold text-[#8C6D3B] hover:text-[#51071D] underline tracking-wider uppercase cursor-pointer"
                  >
                    View All in Catalogue &rarr;
                  </button>
                )}
              </div>

              {/* Saree Suggestions List */}
              {matchingProducts.length > 0 ? (
                <div className="space-y-2">
                  {matchingProducts.map((product, idx) => {
                    const isSelected = selectedIndex === idx;
                    return (
                      <Link
                        key={product.id}
                        href={`/product/${product.id}`}
                        onClick={onClose}
                        onMouseEnter={() => setSelectedIndex(idx)}
                        className={`flex items-center gap-3.5 p-2.5 rounded-lg border transition-all ${
                          isSelected
                            ? 'bg-[#FAF2E6] border-[#51071D] shadow-sm'
                            : 'bg-[#FFFDF9] border-[#E8D5B5]/70 hover:bg-[#FAF5EC] hover:border-[#D4AF37]'
                        }`}
                      >
                        {/* Saree High-Res Thumbnail */}
                        <div className="relative w-14 h-18 shrink-0 rounded-sm overflow-hidden bg-[#FAF5EC] border border-[#E8D5B5]">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                          {product.badge && (
                            <span className="absolute bottom-0 inset-x-0 bg-[#51071D]/90 text-[#FDE6B8] text-[7.5px] font-bold text-center uppercase py-0.5 truncate">
                              {product.badge}
                            </span>
                          )}
                        </div>

                        {/* Details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C6D3B]">
                              {highlightMatch(product.category, trimmedQuery)}
                            </span>
                            <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-[#ECFDF5] text-[#065F46] font-semibold border border-[#A7F3D0]">
                              {product.occasion}
                            </span>
                            <span className="text-[9px] text-[#8C837A] font-mono">
                              {highlightMatch(product.sku, trimmedQuery)}
                            </span>
                          </div>

                          <h3 className="font-label-md text-sm font-bold text-[#2A2623] hover:text-[#51071D] transition-colors truncate mt-0.5">
                            {highlightMatch(product.name, trimmedQuery)}
                          </h3>

                          <p className="text-[11px] text-[#6E6760] font-body-sm line-clamp-1 mt-0.5">
                            {highlightMatch(product.description, trimmedQuery)}
                          </p>

                          <div className="flex items-center gap-2 mt-1">
                            <span className="font-bold text-sm text-[#51071D]">
                              ₹{product.price.toLocaleString('en-IN')}
                            </span>
                            <span className="text-xs text-[#8C837A] line-through">
                              ₹{product.originalPrice.toLocaleString('en-IN')}
                            </span>
                            <span className="text-[10px] font-bold text-[#B8001F] bg-[#FFF1F2] px-1.5 py-0.2 rounded-full border border-[#FECDD3]">
                              {product.discountPercent}% OFF
                            </span>
                          </div>
                        </div>

                        {/* Navigation Arrow */}
                        <div className="shrink-0 pl-2">
                          <span
                            className={`material-symbols-outlined text-[20px] transition-all ${
                              isSelected
                                ? 'text-[#51071D] translate-x-1'
                                : 'text-[#8C6D3B]/40'
                            }`}
                          >
                            chevron_right
                          </span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              ) : (
                /* No Results State with Helpful Alternatives */
                <div className="py-8 px-4 text-center space-y-3 bg-[#FAF5EC] rounded-lg border border-[#E8D5B5]">
                  <span className="material-symbols-outlined text-[44px] text-[#8C6D3B]">
                    search_off
                  </span>
                  <h3 className="font-serif text-lg font-bold text-[#51071D]">
                    No Sarees Found for &ldquo;{query}&rdquo;
                  </h3>
                  <p className="text-xs text-[#6E6760] max-w-md mx-auto leading-relaxed">
                    We couldn&apos;t find an exact match. Try searching for &ldquo;Kanchipuram&rdquo;, &ldquo;Soft Silk&rdquo;, &ldquo;Bridal&rdquo;, or explore our popular categories below.
                  </p>
                  <div className="pt-2 flex flex-wrap justify-center gap-2">
                    {QUICK_CATEGORIES.slice(0, 4).map((c) => (
                      <Link
                        key={c.name}
                        href={`/shop?category=${encodeURIComponent(c.name)}`}
                        onClick={onClose}
                        className="px-3 py-1.5 rounded-full bg-[#FFFDF9] text-[#51071D] border border-[#E8D5B5] hover:border-[#51071D] text-xs font-semibold transition-all shadow-2xs"
                      >
                        {c.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer CTA */}
        {trimmedQuery && matchingProducts.length > 0 && (
          <div className="bg-[#FAF5EC] border-t border-[#E8D5B5] px-5 py-3 flex items-center justify-between">
            <span className="text-xs text-[#6E6760]">
              Showing top {matchingProducts.length} suggestions
            </span>
            <button
              type="button"
              onClick={() => handleSubmit()}
              className="bg-gradient-to-r from-[#51071D] to-[#750A26] text-[#FDE6B8] px-5 py-2 rounded-md font-label-sm uppercase tracking-wider text-xs font-bold hover:from-[#750A26] hover:to-[#51071D] transition-all cursor-pointer shadow-xs flex items-center gap-1.5"
            >
              <span>View All Results</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
