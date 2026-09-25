'use client';

import React, { useState, useMemo, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { DEMO_PRODUCTS } from '../../data/products';
import { ProductCard } from '../../components/ProductCard';

function ShopContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || '';
  const initialSearch = searchParams.get('search') || '';

  // Filter states
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    initialCategory ? [initialCategory] : []
  );
  const [selectedFabrics, setSelectedFabrics] = useState<string[]>([]);
  const [selectedPalette, setSelectedPalette] = useState<string | null>(null);
  const [maxPrice, setMaxPrice] = useState<number>(25000);
  const [selectedOccasion, setSelectedOccasion] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<string>('curated');
  const [displayCount, setDisplayCount] = useState<number>(12);

  const [mobileFilterOpen, setMobileFilterOpen] = useState<boolean>(false);

  // Toggle Category
  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  // Toggle Fabric
  const toggleFabric = (fab: string) => {
    setSelectedFabrics((prev) =>
      prev.includes(fab) ? prev.filter((f) => f !== fab) : [...prev, fab]
    );
  };

  // Reset All
  const handleResetFilters = () => {
    setSelectedCategories([]);
    setSelectedFabrics([]);
    setSelectedPalette(null);
    setMaxPrice(25000);
    setSelectedOccasion(null);
    setDisplayCount(12);
  };

  const activeFilterCount =
    selectedCategories.length +
    selectedFabrics.length +
    (selectedPalette ? 1 : 0) +
    (maxPrice < 25000 ? 1 : 0) +
    (selectedOccasion ? 1 : 0);

  // Filtered & Sorted Products
  const filteredProducts = useMemo(() => {
    return DEMO_PRODUCTS.filter((product) => {
      // Search
      if (initialSearch) {
        const query = initialSearch.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesCategory = product.category.toLowerCase().includes(query);
        const matchesFabric = product.fabric.toLowerCase().includes(query);
        if (!matchesName && !matchesCategory && !matchesFabric) return false;
      }

      // Category
      if (selectedCategories.length > 0 && !selectedCategories.includes(product.category)) {
        return false;
      }

      // Fabric
      if (selectedFabrics.length > 0) {
        const hasFabric = selectedFabrics.some((f) =>
          product.fabric.toLowerCase().includes(f.toLowerCase())
        );
        if (!hasFabric) return false;
      }

      // Palette
      if (selectedPalette && product.colorHex !== selectedPalette) {
        return false;
      }

      // Price
      if (product.price > maxPrice) {
        return false;
      }

      // Occasion
      if (selectedOccasion && product.occasion !== selectedOccasion) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'newest') return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // curated
    });
  }, [
    initialSearch,
    selectedCategories,
    selectedFabrics,
    selectedPalette,
    maxPrice,
    selectedOccasion,
    sortBy,
  ]);

  const visibleProducts = filteredProducts.slice(0, displayCount);

  // Reusable Filter Panel Component
  const renderFilterControls = () => (
    <>
      {/* Category Filter */}
      <div className="space-y-space-xs pt-space-xs">
        <h3 className="font-label-md uppercase tracking-wider text-on-surface font-semibold text-xs">
          Category
        </h3>
        <div className="space-y-space-xs pt-space-xs text-xs">
          {[
            'Kanchipuram Silk',
            'Soft Silk',
            'Bridal Pattu',
            'Traditional Cotton',
            'Organza Tussar',
            'Festive Edit',
          ].map((catName) => {
            const count = DEMO_PRODUCTS.filter((p) => p.category === catName).length;
            const isChecked = selectedCategories.includes(catName);
            return (
              <label
                key={catName}
                className={`flex items-center justify-between py-1 text-on-surface-variant hover:text-on-surface cursor-pointer ${
                  isChecked ? 'text-primary font-medium' : ''
                }`}
              >
                <span className="flex items-center gap-space-xs">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => toggleCategory(catName)}
                    className="accent-primary w-4 h-4 cursor-pointer"
                  />
                  <span>{catName}</span>
                </span>
                <span className="font-label-sm text-outline">{count}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Fabric & Weave */}
      <div className="space-y-space-xs pt-space-sm border-t border-surface-container-high">
        <h3 className="font-label-md uppercase tracking-wider text-on-surface font-semibold text-xs">
          Fabric &amp; Weave
        </h3>
        <div className="space-y-space-xs pt-space-xs text-xs">
          {[
            'Pure Mulberry Silk',
            'Tissue Zari Brocade',
            'Combed Cotton 100s',
            'Jacquard Butta Weave',
          ].map((fab) => {
            const isChecked = selectedFabrics.includes(fab);
            return (
              <label
                key={fab}
                className="flex items-center gap-space-xs py-1 text-on-surface-variant hover:text-on-surface cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggleFabric(fab)}
                  className="accent-primary w-4 h-4 cursor-pointer"
                />
                <span>{fab}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Color Swatches */}
      <div className="space-y-space-xs pt-space-sm border-t border-surface-container-high">
        <div className="flex items-center justify-between">
          <h3 className="font-label-md uppercase tracking-wider text-on-surface font-semibold text-xs">
            Palette
          </h3>
          {selectedPalette && (
            <button
              type="button"
              onClick={() => setSelectedPalette(null)}
              className="text-[10px] text-secondary underline cursor-pointer"
            >
              Clear
            </button>
          )}
        </div>
        <div className="grid grid-cols-6 gap-2 pt-space-xs">
          {[
            { hex: '#6E1F32', name: 'Burgundy' },
            { hex: '#745A29', name: 'Antique Gold' },
            { hex: '#1B4332', name: 'Emerald Green' },
            { hex: '#0D284A', name: 'Royal Blue' },
            { hex: '#9D174D', name: 'Rani Pink' },
            { hex: '#B58D3D', name: 'Mustard Gold' },
          ].map((c) => (
            <button
              key={c.name}
              type="button"
              onClick={() => setSelectedPalette(selectedPalette === c.hex ? null : c.hex)}
              style={{ backgroundColor: c.hex }}
              className={`w-8 h-8 rounded-full shadow-sm transform hover:scale-110 transition-transform relative flex items-center justify-center cursor-pointer ${
                selectedPalette === c.hex ? 'ring-2 ring-primary ring-offset-2' : ''
              }`}
              title={c.name}
            >
              {selectedPalette === c.hex && (
                <span className="material-symbols-outlined text-[14px] text-white">check</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Price Slider */}
      <div className="space-y-space-xs pt-space-sm border-t border-surface-container-high">
        <div className="flex items-center justify-between">
          <h3 className="font-label-md uppercase tracking-wider text-on-surface font-semibold text-xs">
            Price Bracket
          </h3>
          <span className="font-label-sm text-secondary font-medium text-[11px]">
            ₹1,500 - ₹25,000
          </span>
        </div>
        <div className="pt-space-xs">
          <input
            type="range"
            min="1500"
            max="25000"
            step="500"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-full accent-primary cursor-pointer"
          />
          <div className="flex justify-between font-label-sm text-on-surface-variant pt-1 text-[11px]">
            <span>₹1.5k</span>
            <span className="text-primary font-semibold">
              Cap: ₹{maxPrice.toLocaleString('en-IN')}
            </span>
            <span>₹25k</span>
          </div>
        </div>
      </div>

      {/* Occasion */}
      <div className="space-y-space-xs pt-space-sm border-t border-surface-container-high">
        <h3 className="font-label-md uppercase tracking-wider text-on-surface font-semibold text-xs">
          Occasion
        </h3>
        <div className="flex flex-wrap gap-1.5 pt-space-xs">
          {['Bridal', 'Festive', 'Casual Grace', 'Reception'].map((occ) => {
            const isSelected = selectedOccasion === occ;
            return (
              <button
                key={occ}
                type="button"
                onClick={() => setSelectedOccasion(isSelected ? null : occ)}
                className={`px-2.5 py-1 text-label-sm font-medium transition-colors cursor-pointer text-xs ${
                  isSelected
                    ? 'bg-primary text-on-primary'
                    : 'bg-surface-container-high text-on-surface hover:bg-secondary-fixed'
                }`}
              >
                {occ}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );

  return (
    <div className="flex flex-col w-full">
      {/* Editorial Page Header & Breadcrumbs */}
      <section className="w-full bg-surface-container-low py-space-lg px-margin-mobile md:px-margin border-b border-surface-container-highest/40">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row md:items-end justify-between gap-space-md">
          <div className="space-y-space-xs">
            <nav aria-label="Breadcrumb" className="flex items-center gap-space-xs font-label-md tracking-wider uppercase text-on-surface-variant text-xs">
              <Link href="/" className="hover:text-primary transition-colors">
                Home
              </Link>
              <span className="opacity-40">/</span>
              <span className="opacity-70">Sarees</span>
              <span className="opacity-40">/</span>
              <span className="text-primary font-semibold">
                {selectedCategories.length === 1 ? selectedCategories[0] : 'All Collections'}
              </span>
            </nav>
            <h1 className="font-display-md text-primary tracking-tight font-headline-lg text-3xl sm:text-4xl">
              Curated Handloom Sarees
            </h1>
            <p className="font-body-md text-on-surface-variant max-w-2xl text-sm leading-relaxed">
              Directly loomed by generational master weavers. Rich golden zari pallus, pure mulberry silk threads, and timeless ceremonial motifs.
            </p>
          </div>
          <div className="flex items-center gap-space-sm bg-surface px-space-md py-space-xs shadow-sm self-start md:self-end border border-secondary/20">
            <span className="w-2 h-2 rounded-full bg-secondary" />
            <span className="font-label-md uppercase tracking-wider text-on-surface font-semibold text-xs">
              {filteredProducts.length} Handcrafted Pieces
            </span>
          </div>
        </div>
      </section>

      {/* Main Catalog Hub with Filters & 3-Column Grid */}
      <section className="w-full py-space-xl px-margin-mobile md:px-margin">
        <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row gap-gutter">
          {/* Desktop Left Filter Sidebar (Hidden on Mobile) */}
          <aside className="hidden lg:block lg:w-72 shrink-0 space-y-space-lg">
            <div className="bg-surface-container-lowest p-space-md shadow-sm space-y-space-md border border-surface-container-high/40">
              <div className="flex items-center justify-between pb-space-xs border-b border-surface-container-high">
                <span className="font-headline-sm text-primary tracking-wide text-base">Refine Loom</span>
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="font-label-md text-secondary uppercase hover:text-primary transition-colors underline underline-offset-4 text-xs cursor-pointer"
                >
                  Reset
                </button>
              </div>

              {renderFilterControls()}
            </div>

            {/* Artisan Seal Card */}
            <div className="bg-surface-container p-space-md space-y-space-xs text-center shadow-sm border border-secondary/20">
              <span className="material-symbols-outlined text-[32px] text-secondary">verified</span>
              <h4 className="font-headline-sm text-primary text-base">Deva Silk Mark Certified</h4>
              <p className="font-body-sm text-on-surface-variant text-xs">
                Each warp thread is spun using certified pure mulberry silk with authentic tested gold electroplated zari.
              </p>
            </div>
          </aside>

          {/* Main Product Canvas */}
          <div className="flex-1 space-y-space-md">
            {/* Mobile Filter & Sort Bar (Visible only on mobile/tablet) */}
            <div className="lg:hidden flex items-center justify-between gap-2.5 p-3 bg-white border border-stone-200 rounded-xl shadow-xs">
              <button
                type="button"
                onClick={() => setMobileFilterOpen(true)}
                className="flex-1 flex items-center justify-center gap-2 py-2 px-3 bg-[#FAF5EC] hover:bg-[#F5EDE0] border border-[#E8D5B5] rounded-lg text-xs font-bold text-[#51071D] transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">tune</span>
                <span>Filters</span>
                {activeFilterCount > 0 && (
                  <span className="w-5 h-5 rounded-full bg-[#51071D] text-white text-[10px] font-bold flex items-center justify-center">
                    {activeFilterCount}
                  </span>
                )}
              </button>

              <div className="flex-1 relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full bg-[#FAF5EC] border border-[#E8D5B5] rounded-lg py-2 pl-3 pr-7 text-xs font-semibold text-[#51071D] focus:outline-none appearance-none cursor-pointer"
                >
                  <option value="curated">Sort: Curated</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="newest">Newest Drops</option>
                  <option value="rating">Top Rated</option>
                </select>
                <span className="material-symbols-outlined absolute right-2 top-2 text-[18px] pointer-events-none text-[#8C6D3B]">
                  expand_more
                </span>
              </div>
            </div>

            {/* Desktop Active Filter Bar & Sorting Row */}
            <div className="hidden lg:flex bg-surface-container-lowest p-space-sm shadow-sm flex-col sm:flex-row sm:items-center justify-between gap-space-sm border border-surface-container-high/40">
              {/* Filter Chips */}
              <div className="flex flex-wrap items-center gap-space-xs">
                <span className="font-label-sm uppercase tracking-wider text-on-surface-variant mr-1 text-xs">
                  Active:
                </span>
                {selectedCategories.map((cat) => (
                  <span
                    key={cat}
                    className="inline-flex items-center gap-1.5 px-3 py-1 bg-surface-container text-primary font-label-sm font-semibold shadow-sm text-xs"
                  >
                    {cat}
                    <button
                      type="button"
                      onClick={() => toggleCategory(cat)}
                      className="hover:text-error cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[14px]">close</span>
                    </button>
                  </span>
                ))}
                {maxPrice < 25000 && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-surface-container text-primary font-label-sm font-semibold shadow-sm text-xs">
                    Under ₹{maxPrice.toLocaleString('en-IN')}
                    <button
                      type="button"
                      onClick={() => setMaxPrice(25000)}
                      className="hover:text-error cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[14px]">close</span>
                    </button>
                  </span>
                )}
                {selectedOccasion && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-surface-container text-primary font-label-sm font-semibold shadow-sm text-xs">
                    {selectedOccasion}
                    <button
                      type="button"
                      onClick={() => setSelectedOccasion(null)}
                      className="hover:text-error cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[14px]">close</span>
                    </button>
                  </span>
                )}
                {activeFilterCount > 0 && (
                  <button
                    type="button"
                    onClick={handleResetFilters}
                    className="text-label-sm text-secondary hover:text-primary uppercase tracking-wider underline ml-2 text-xs cursor-pointer"
                  >
                    Clear All
                  </button>
                )}
              </div>

              {/* Sort Dropdown */}
              <div className="flex items-center gap-space-xs self-end sm:self-auto">
                <label
                  htmlFor="catalog-sort"
                  className="font-label-sm text-on-surface-variant uppercase tracking-wider text-xs"
                >
                  Sort by:
                </label>
                <div className="relative">
                  <select
                    id="catalog-sort"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-surface-container-low font-body-sm text-on-surface py-1.5 pl-3 pr-8 focus:outline-none appearance-none cursor-pointer text-xs"
                  >
                    <option value="curated">Curated &amp; Recommended</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="newest">Newest Loom Drops</option>
                    <option value="rating">Patron Reviews</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-2 top-2 text-[18px] pointer-events-none text-on-surface-variant">
                    expand_more
                  </span>
                </div>
              </div>
            </div>

            {/* Saree Grid (Immediate on mobile!) */}
            {visibleProducts.length === 0 ? (
              <div className="bg-surface-container-lowest p-12 text-center space-y-3 border border-surface-container-high">
                <span className="material-symbols-outlined text-outline text-[48px]">search_off</span>
                <h3 className="font-headline-sm text-on-surface">No Sarees Matched Your Refinement</h3>
                <p className="font-body-sm text-on-surface-variant text-xs">
                  Try adjusting the price slider, changing fabric choices, or clearing active filters.
                </p>
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="bg-primary text-on-primary font-label-md uppercase tracking-wider px-6 py-2.5 text-xs hover:bg-primary-container transition-colors cursor-pointer mt-2"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-gutter">
                {visibleProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}

            {/* Pagination / Load More */}
            {visibleProducts.length < filteredProducts.length && (
              <div className="pt-space-xl flex flex-col items-center justify-center space-y-space-sm">
                <p className="font-label-sm uppercase tracking-widest text-on-surface-variant text-xs">
                  Showing {visibleProducts.length} of {filteredProducts.length} Heirloom Creations
                </p>
                <div className="w-48 h-1 bg-surface-container-highest overflow-hidden">
                  <div
                    className="h-full bg-secondary transition-all duration-300"
                    style={{
                      width: `${(visibleProducts.length / filteredProducts.length) * 100}%`,
                    }}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setDisplayCount((prev) => prev + 3)}
                  className="px-8 py-3 bg-surface-container-high hover:bg-surface-container-highest text-primary font-label-md uppercase tracking-wider shadow-sm transition-colors text-xs font-semibold cursor-pointer"
                >
                  Load More Masterpieces
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Mobile Filter Drawer Modal */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            onClick={() => setMobileFilterOpen(false)}
          />

          {/* Bottom Sheet Drawer */}
          <div className="relative bg-white w-full max-h-[85vh] rounded-t-2xl shadow-2xl flex flex-col z-10 overflow-hidden animate-in slide-in-from-bottom duration-300">
            {/* Drawer Header */}
            <div className="p-4 border-b border-stone-200 flex items-center justify-between bg-stone-50">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px] text-[#51071D]">tune</span>
                <span className="font-bold text-sm text-stone-900">Filter Sarees</span>
                {activeFilterCount > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-[#51071D] text-white text-[10px] font-bold">
                    {activeFilterCount} Active
                  </span>
                )}
              </div>
              <div className="flex items-center gap-3">
                {activeFilterCount > 0 && (
                  <button
                    type="button"
                    onClick={handleResetFilters}
                    className="text-xs text-[#51071D] font-semibold underline cursor-pointer"
                  >
                    Reset All
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setMobileFilterOpen(false)}
                  className="p-1.5 text-stone-500 hover:text-stone-800 rounded-full cursor-pointer"
                  aria-label="Close filters"
                >
                  <span className="material-symbols-outlined text-[20px]">close</span>
                </button>
              </div>
            </div>

            {/* Drawer Body Scrollable */}
            <div className="p-5 overflow-y-auto space-y-5">
              {renderFilterControls()}
            </div>

            {/* Drawer Footer Action Bar */}
            <div className="p-4 border-t border-stone-200 bg-stone-50 flex items-center gap-3">
              <button
                type="button"
                onClick={handleResetFilters}
                className="flex-1 py-3 px-4 border border-stone-300 rounded-xl text-xs font-bold text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer text-center"
              >
                Clear Filters
              </button>
              <button
                type="button"
                onClick={() => setMobileFilterOpen(false)}
                className="flex-2 py-3 px-4 bg-[#51071D] text-white rounded-xl text-xs font-bold hover:bg-[#6E1F32] transition-colors cursor-pointer text-center shadow-md"
              >
                Show {filteredProducts.length} Sarees
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[50vh] flex items-center justify-center p-12">
          <div className="text-secondary font-headline-sm animate-pulse">
            Loading Loom Collections...
          </div>
        </div>
      }
    >
      <ShopContent />
    </Suspense>
  );
}
