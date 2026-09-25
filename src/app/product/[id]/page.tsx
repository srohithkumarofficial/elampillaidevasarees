'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { DEMO_PRODUCTS, CURATED_ENSEMBLE_ITEMS } from '../../../data/products';
import { useAuth } from '../../../context/AuthContext';
import { useCart } from '../../../context/CartContext';
import { useWishlist } from '../../../context/WishlistContext';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const { isAuthenticated, openAuthGate } = useAuth();
  const { items, addToCart, updateProductQuantity, openCartDrawer, showToast } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  // Find product
  const product = DEMO_PRODUCTS.find((p) => p.id === id) || DEMO_PRODUCTS[0];

  // Auth gate enforcement for direct URL entry
  useEffect(() => {
    if (!isAuthenticated) {
      openAuthGate(product.id);
    }
  }, [isAuthenticated, product.id, openAuthGate]);

  // Gallery state
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colorName);

  // Accordion state
  const [openAccordions, setOpenAccordions] = useState<{ [key: string]: boolean }>({
    specs: true,
    heritage: true,
    care: false,
  });

  // Pincode state
  const [pincode, setPincode] = useState('600017');
  const [pincodeVerified, setPincodeVerified] = useState(true);
  const [pincodeError, setPincodeError] = useState(false);

  const relatedRef = useRef<HTMLDivElement>(null);

  const toggleAccordion = (key: string) => {
    setOpenAccordions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleCheckPincode = () => {
    if (pincode.trim().length === 6 && !isNaN(Number(pincode))) {
      setPincodeVerified(true);
      setPincodeError(false);
    } else {
      setPincodeVerified(false);
      setPincodeError(true);
    }
  };

  const handleBuyNow = () => {
    if (!isAuthenticated) {
      openAuthGate(product.id);
      return;
    }
    addToCart(product, 1, selectedColor);
    router.push('/checkout');
  };

  const handleAddToCartClick = () => {
    if (!isAuthenticated) {
      openAuthGate(product.id);
      return;
    }
    addToCart(product, 1, selectedColor);
  };

  const scrollRelated = (direction: number) => {
    if (relatedRef.current) {
      relatedRef.current.scrollBy({ left: direction * 340, behavior: 'smooth' });
    }
  };

  const isFavorited = isInWishlist(product.id);
  const gallery = product.galleryImages && product.galleryImages.length > 0
    ? product.galleryImages
    : [product.image];

  return (
    <div className="flex flex-col w-full">
      {/* Breadcrumb Navigation Bar */}
      <nav className="w-full bg-surface-container-low py-space-sm px-margin-mobile md:px-margin border-b border-surface-container-highest/40">
        <div className="max-w-[1440px] mx-auto flex items-center gap-space-xs text-on-surface-variant font-label-sm uppercase tracking-wider text-xs overflow-x-auto whitespace-nowrap">
          <Link href="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          <Link href="/shop" className="hover:text-primary transition-colors">
            Silk Sarees
          </Link>
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          <Link
            href={`/shop?category=${encodeURIComponent(product.category)}`}
            className="hover:text-primary transition-colors"
          >
            {product.category}
          </Link>
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          <span className="text-primary font-semibold truncate">{product.name}</span>
        </div>
      </nav>

      {/* Main Showcase Workspace */}
      <section className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin py-space-lg lg:py-space-xl w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg lg:gap-gutter">
          {/* Left Editorial Gallery (7 cols on desktop) */}
          <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-space-md">
            {/* Vertical Thumbnails */}
            <div className="flex md:flex-col gap-space-sm overflow-x-auto md:overflow-visible shrink-0 pb-space-xs md:pb-0">
              {gallery.map((imgUrl, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setSelectedImageIndex(index)}
                  className={`group relative w-16 h-20 md:w-20 md:h-28 overflow-hidden bg-surface-container-high transition-all cursor-pointer ${
                    selectedImageIndex === index
                      ? 'ring-2 ring-primary ring-offset-2'
                      : 'opacity-80 hover:opacity-100'
                  }`}
                >
                  <img
                    src={imgUrl}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute inset-0 bg-primary/5 group-hover:bg-transparent transition-colors" />
                </button>
              ))}
            </div>

            {/* Main Viewport Canvas */}
            <div className="relative w-full aspect-[3/4] bg-surface-container-low overflow-hidden group shadow-md border border-surface-container-high/40">
              <img
                src={gallery[selectedImageIndex] || product.image}
                alt={product.name}
                className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-110 cursor-crosshair"
              />

              {/* Badges on main image */}
              <div className="absolute top-4 left-4 flex flex-col gap-2 pointer-events-none">
                <span className="bg-primary text-on-primary font-label-sm uppercase tracking-widest px-space-sm py-1 shadow-md text-[10px]">
                  Heritage Weave
                </span>
                <span className="bg-surface-container-lowest/90 backdrop-blur-sm text-secondary font-label-sm uppercase tracking-widest px-space-sm py-1 shadow-sm flex items-center gap-1 text-[10px]">
                  <span className="material-symbols-outlined text-[14px]">verified</span> Silk Mark
                </span>
              </div>

              {/* Zoom hint */}
              <div className="absolute bottom-4 right-4 bg-surface-container-lowest/90 backdrop-blur-sm px-space-sm py-1 text-on-surface-variant font-label-sm flex items-center gap-space-xs pointer-events-none shadow-md text-[10px]">
                <span className="material-symbols-outlined text-[16px]">zoom_in</span>
                <span className="uppercase tracking-wider">Hover to Inspect Zari</span>
              </div>

              {/* Prev / Next Arrows */}
              <button
                type="button"
                onClick={() =>
                  setSelectedImageIndex((prev) =>
                    prev === 0 ? gallery.length - 1 : prev - 1
                  )
                }
                aria-label="Previous image"
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-surface-container-lowest/80 hover:bg-surface-container-lowest text-on-surface flex items-center justify-center transition-opacity opacity-0 group-hover:opacity-100 shadow-md cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">chevron_left</span>
              </button>
              <button
                type="button"
                onClick={() =>
                  setSelectedImageIndex((prev) =>
                    prev === gallery.length - 1 ? 0 : prev + 1
                  )
                }
                aria-label="Next image"
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-surface-container-lowest/80 hover:bg-surface-container-lowest text-on-surface flex items-center justify-center transition-opacity opacity-0 group-hover:opacity-100 shadow-md cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">chevron_right</span>
              </button>
            </div>
          </div>

          {/* Right Product Suite & Details (5 cols on desktop) */}
          <div className="lg:col-span-5 flex flex-col justify-start">
            {/* Atelier Lineage Marker */}
            <div className="flex items-center gap-space-xs text-secondary mb-space-xs">
              <span className="material-symbols-outlined text-[16px]">workspace_premium</span>
              <span className="font-label-sm uppercase tracking-widest text-xs">
                Master Loom Release • Elampillai Weavers Cluster
              </span>
            </div>

            {/* Saree Title */}
            <h1 className="font-display-md text-primary leading-tight mb-space-xs font-normal text-2xl sm:text-3xl">
              {product.name}
            </h1>

            {/* Heritage Badge & Ratings */}
            <div className="flex flex-wrap items-center gap-space-sm pb-space-sm text-xs">
              <div className="flex items-center gap-1 text-secondary">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className="material-symbols-outlined text-[16px] text-secondary"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                ))}
                <span className="font-label-md text-on-surface ml-1 font-bold">{product.rating}</span>
              </div>
              <span className="font-body-sm text-on-surface-variant">
                ({product.reviewsCount} Bespoke Reviews)
              </span>
              <span className="text-outline-variant">•</span>
              <span className="font-label-sm uppercase tracking-wider text-primary font-semibold">
                SKU: {product.sku}
              </span>
            </div>

            {/* Pricing Card Container */}
            <div className="bg-surface-container-low p-space-md my-space-sm border border-surface-container-high/40">
              <div className="flex items-baseline gap-space-sm flex-wrap">
                <span className="font-display-md text-primary font-semibold text-3xl">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                <span className="font-body-lg text-outline line-through text-base">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
                <span className="bg-primary text-on-primary font-label-sm uppercase px-2 py-0.5 tracking-wider text-[11px] font-bold">
                  {product.discountPercent}% Off
                </span>
              </div>
              <p className="font-body-sm text-on-surface-variant mt-1 text-xs">
                Inclusive of all taxes &amp; complimentary insured doorstep transit
              </p>
              <div className="flex items-center gap-space-xs mt-space-sm pt-space-xs bg-surface-container-lowest p-space-xs px-space-sm border border-secondary/20">
                <span className="material-symbols-outlined text-secondary text-[18px]">verified_user</span>
                <span className="font-body-sm text-on-surface text-xs font-medium">
                  Authentic Elampillai Handloom • Silk Mark Certified
                </span>
              </div>
            </div>

            {/* Color Selection Palette */}
            <div className="my-space-sm">
              <div className="flex items-center justify-between mb-space-xs text-xs">
                <span className="font-label-md uppercase tracking-wider text-on-surface">
                  Color Palette:{' '}
                  <span className="text-primary font-semibold">{selectedColor}</span>
                </span>
                <span className="font-label-sm text-secondary uppercase tracking-wider">
                  {product.availableColors.length} Colorways
                </span>
              </div>
              <div className="flex items-center gap-space-sm">
                {product.availableColors.map((color) => (
                  <button
                    key={color.name}
                    type="button"
                    onClick={() => setSelectedColor(color.name)}
                    style={{ backgroundColor: color.hex }}
                    className={`relative w-10 h-10 shadow-md transition-transform cursor-pointer ${
                      selectedColor === color.name
                        ? 'ring-2 ring-primary ring-offset-2 scale-105'
                        : 'opacity-85 hover:opacity-100'
                    }`}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Pincode Delivery Availability Checker */}
            <div className="my-space-sm bg-surface-container p-space-md border border-surface-container-high/60">
              <label
                htmlFor="pincodeInput"
                className="block font-label-md uppercase tracking-wider text-primary mb-space-xs text-xs font-semibold"
              >
                Estimate Delivery &amp; Availability
              </label>
              <div className="flex gap-space-xs">
                <div className="relative flex-1">
                  <input
                    id="pincodeInput"
                    type="text"
                    maxLength={6}
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    placeholder="Enter 6-digit Pincode"
                    className="w-full bg-surface-container-lowest px-space-md py-2.5 font-body-md text-on-surface placeholder:text-outline focus:outline-none text-xs"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleCheckPincode}
                  className="bg-primary text-on-primary font-label-md uppercase tracking-wider px-space-md hover:bg-primary-container transition-colors shrink-0 text-xs cursor-pointer"
                >
                  Check
                </button>
              </div>

              {pincodeVerified && (
                <div className="mt-space-xs flex items-center gap-space-xs text-on-surface font-body-sm text-xs">
                  <span className="material-symbols-outlined text-secondary text-[18px]">check_circle</span>
                  <span>
                    Express Delivery in 2-4 Days to <strong>{pincode} (Chennai)</strong> | Cash on Delivery Available
                  </span>
                </div>
              )}
              {pincodeError && (
                <div className="mt-space-xs flex items-center gap-space-xs text-error font-body-sm text-xs">
                  <span className="material-symbols-outlined text-[18px]">error</span>
                  <span>Please provide a valid 6-digit postal pincode</span>
                </div>
              )}
            </div>

            {/* Sticky Purchase Suite Actions */}
            <div className="flex flex-col gap-space-xs my-space-md">
              {(() => {
                const cartItem = items.find(
                  (item) => item.product.id === product.id && item.selectedColor === selectedColor
                );
                const quantityInCart = cartItem ? cartItem.quantity : 0;

                if (quantityInCart > 0) {
                  return (
                    <div className="space-y-3">
                      {/* Active Quantity Controller */}
                      <div className="flex items-center justify-between bg-gradient-to-r from-[#FFFDF9] via-[#FAF5EC] to-[#FFFDF9] border-2 border-[#D4AF37] p-2 sm:p-2.5 rounded-xs shadow-xs">
                        <button
                          type="button"
                          onClick={() => updateProductQuantity(product, -1, selectedColor)}
                          aria-label="Decrease quantity"
                          className="w-10 h-10 rounded-xs bg-[#FFFDF9] hover:bg-[#51071D] text-[#51071D] hover:text-white border border-[#E8D5B5] flex items-center justify-center transition-colors cursor-pointer active:scale-95 shadow-2xs"
                          suppressHydrationWarning
                        >
                          <span className="material-symbols-outlined text-[20px]">
                            {quantityInCart === 1 ? 'delete' : 'remove'}
                          </span>
                        </button>

                        <div className="flex flex-col items-center">
                          <span className="font-label-lg font-bold text-sm text-[#51071D] flex items-center gap-1.5 uppercase tracking-wider">
                            <span className="w-2 h-2 rounded-full bg-[#065F46] animate-pulse" />
                            {quantityInCart} Added to Bag
                          </span>
                          <span className="text-xs text-[#8C6D3B] font-semibold">
                            Total: ₹{(product.price * quantityInCart).toLocaleString('en-IN')}
                          </span>
                        </div>

                        <button
                          type="button"
                          onClick={() => updateProductQuantity(product, 1, selectedColor)}
                          aria-label="Increase quantity"
                          className="w-10 h-10 rounded-xs bg-gradient-to-r from-[#51071D] to-[#750A26] hover:from-[#750A26] hover:to-[#51071D] text-[#FDE6B8] flex items-center justify-center transition-colors cursor-pointer active:scale-95 shadow-2xs"
                          suppressHydrationWarning
                        >
                          <span className="material-symbols-outlined text-[20px]">add</span>
                        </button>
                      </div>

                      {/* Dual Action: View Bag & Direct Checkout */}
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={openCartDrawer}
                          suppressHydrationWarning
                          className="flex-1 bg-[#FAF5EC] hover:bg-[#F2E8D5] text-[#51071D] font-label-md uppercase tracking-wider py-3.5 px-space-md shadow-xs transition-all flex items-center justify-center gap-2 border border-[#E8D5B5] cursor-pointer text-xs sm:text-sm font-bold"
                        >
                          <span className="material-symbols-outlined text-[18px]">receipt_long</span>
                          <span>View Bag Details</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => router.push('/checkout')}
                          suppressHydrationWarning
                          className="flex-1 bg-gradient-to-r from-[#51071D] via-[#6D0D26] to-[#51071D] hover:from-[#6D0D26] hover:to-[#51071D] text-[#FDE6B8] font-label-md uppercase tracking-wider py-3.5 px-space-md shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer text-xs sm:text-sm font-bold border border-[#F3C068]/30"
                        >
                          <span className="material-symbols-outlined text-[18px] text-[#F3C068]">lock</span>
                          <span>Checkout Now</span>
                          <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                        </button>
                      </div>
                    </div>
                  );
                }

                return (
                  <>
                    <div className="flex gap-space-xs">
                      {/* Add To Shopping Bag Primary Action */}
                      <button
                        type="button"
                        onClick={handleAddToCartClick}
                        suppressHydrationWarning
                        className="flex-1 bg-primary hover:bg-primary-container text-on-primary font-label-lg uppercase tracking-wider py-4 px-space-md flex items-center justify-center gap-space-xs transition-all shadow-md active:scale-[0.99] cursor-pointer text-xs sm:text-sm font-semibold"
                      >
                        <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
                        <span>Add to Shopping Bag</span>
                      </button>

                      {/* Wishlist Button */}
                      <button
                        type="button"
                        onClick={() => toggleWishlist(product.id)}
                        aria-label="Add to Wishlist"
                        suppressHydrationWarning
                        className="w-14 bg-surface-container-low hover:bg-surface-container text-primary flex items-center justify-center transition-colors border border-surface-container-high/60 cursor-pointer"
                      >
                        <span
                          className="material-symbols-outlined text-[24px]"
                          style={isFavorited ? { fontVariationSettings: "'FILL' 1" } : undefined}
                        >
                          {isFavorited ? 'favorite' : 'favorite_border'}
                        </span>
                      </button>
                    </div>

                    {/* 1-Click Buy Now Secondary Action */}
                    <button
                      type="button"
                      onClick={handleBuyNow}
                      suppressHydrationWarning
                      className="w-full bg-surface-container-lowest hover:bg-surface-container text-primary font-label-lg uppercase tracking-wider py-3.5 px-space-md shadow-sm transition-all flex items-center justify-center gap-space-xs border border-primary/20 cursor-pointer text-xs sm:text-sm font-semibold"
                    >
                      <span className="material-symbols-outlined text-[20px] text-secondary">flash_on</span>
                      <span>Buy Now with 1-Click</span>
                    </button>
                  </>
                );
              })()}
            </div>

            {/* Reassurance Badges Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-space-xs py-space-sm bg-surface-container-low p-space-sm border border-surface-container-high/40">
              <div className="flex flex-col items-center text-center p-space-xs">
                <span className="material-symbols-outlined text-secondary text-[22px] mb-1">handyman</span>
                <span className="font-label-sm uppercase tracking-wider text-on-surface text-[10px]">
                  100% Handcrafted
                </span>
              </div>
              <div className="flex flex-col items-center text-center p-space-xs">
                <span className="material-symbols-outlined text-secondary text-[22px] mb-1">verified</span>
                <span className="font-label-sm uppercase tracking-wider text-on-surface text-[10px]">
                  Silk Mark Certified
                </span>
              </div>
              <div className="flex flex-col items-center text-center p-space-xs">
                <span className="material-symbols-outlined text-secondary text-[22px] mb-1">
                  published_with_changes
                </span>
                <span className="font-label-sm uppercase tracking-wider text-on-surface text-[10px]">
                  7-Day Exchange
                </span>
              </div>
              <div className="flex flex-col items-center text-center p-space-xs">
                <span className="material-symbols-outlined text-secondary text-[22px] mb-1">security</span>
                <span className="font-label-sm uppercase tracking-wider text-on-surface text-[10px]">
                  Insured Shipping
                </span>
              </div>
            </div>

            {/* Craftsmanship Matrix Accordions */}
            <div className="mt-space-lg space-y-space-xs">
              {/* Accordion 1: Specifications */}
              <div className="bg-surface-container-lowest shadow-sm border border-surface-container-high/40">
                <button
                  type="button"
                  onClick={() => toggleAccordion('specs')}
                  className="w-full flex items-center justify-between p-space-md text-left cursor-pointer"
                >
                  <span className="font-headline-sm text-primary text-base">
                    Saree &amp; Blouse Dimensions
                  </span>
                  <span className="material-symbols-outlined text-on-surface-variant transition-transform duration-300">
                    {openAccordions.specs ? 'expand_less' : 'expand_more'}
                  </span>
                </button>
                {openAccordions.specs && (
                  <div className="px-space-md pb-space-md space-y-space-xs text-xs">
                    <div className="flex justify-between py-1 bg-surface-container-low px-space-xs">
                      <span className="text-on-surface-variant">Saree Length:</span>
                      <span className="text-on-surface font-semibold">
                        {product.dimensions.sareeLength}
                      </span>
                    </div>
                    <div className="flex justify-between py-1 px-space-xs">
                      <span className="text-on-surface-variant">Blouse Piece:</span>
                      <span className="text-on-surface font-semibold">
                        {product.dimensions.blousePiece}
                      </span>
                    </div>
                    <div className="flex justify-between py-1 bg-surface-container-low px-space-xs">
                      <span className="text-on-surface-variant">Saree Width:</span>
                      <span className="text-on-surface font-semibold">
                        {product.dimensions.sareeWidth}
                      </span>
                    </div>
                    <div className="flex justify-between py-1 px-space-xs">
                      <span className="text-on-surface-variant">Weight:</span>
                      <span className="text-on-surface font-semibold">
                        {product.dimensions.weight}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Accordion 2: Weave & Origin */}
              <div className="bg-surface-container-lowest shadow-sm border border-surface-container-high/40">
                <button
                  type="button"
                  onClick={() => toggleAccordion('heritage')}
                  className="w-full flex items-center justify-between p-space-md text-left cursor-pointer"
                >
                  <span className="font-headline-sm text-primary text-base">
                    Weave &amp; Technique Heritage
                  </span>
                  <span className="material-symbols-outlined text-on-surface-variant transition-transform duration-300">
                    {openAccordions.heritage ? 'expand_less' : 'expand_more'}
                  </span>
                </button>
                {openAccordions.heritage && (
                  <div className="px-space-md pb-space-md space-y-space-xs font-body-sm text-on-surface-variant text-xs">
                    <p className="leading-relaxed">{product.weaveHeritage.description}</p>
                    <div className="flex justify-between py-1 bg-surface-container-low px-space-xs mt-2">
                      <span>Zari Quality:</span>
                      <span className="text-on-surface font-semibold">
                        {product.weaveHeritage.zariQuality}
                      </span>
                    </div>
                    <div className="flex justify-between py-1 px-space-xs">
                      <span>Origin Loom:</span>
                      <span className="text-on-surface font-semibold">
                        {product.weaveHeritage.originLoom}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Accordion 3: Care Guide */}
              <div className="bg-surface-container-lowest shadow-sm border border-surface-container-high/40">
                <button
                  type="button"
                  onClick={() => toggleAccordion('care')}
                  className="w-full flex items-center justify-between p-space-md text-left cursor-pointer"
                >
                  <span className="font-headline-sm text-primary text-base">
                    Artisanal Saree Care Guide
                  </span>
                  <span className="material-symbols-outlined text-on-surface-variant transition-transform duration-300">
                    {openAccordions.care ? 'expand_less' : 'expand_more'}
                  </span>
                </button>
                {openAccordions.care && (
                  <div className="px-space-md pb-space-md space-y-space-xs font-body-sm text-on-surface-variant text-xs">
                    <ul className="list-disc pl-5 space-y-1">
                      {product.careGuide.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Complete The Royal Ensemble Curation */}
      <section className="w-full bg-surface-container-low py-space-xl my-space-lg border-y border-surface-container-highest/40">
        <div className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-lg">
            <div>
              <span className="font-label-sm uppercase tracking-widest text-secondary block mb-1 text-xs">
                Stylist Recommendation
              </span>
              <h2 className="font-headline-lg text-primary text-2xl font-serif">
                Complete The Royal Ensemble
              </h2>
            </div>
            <p className="font-body-sm text-on-surface-variant max-w-md mt-2 md:mt-0 text-xs sm:text-sm">
              Handcrafted artisanal accents curated by our master drapers to complement your weave.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
            {CURATED_ENSEMBLE_ITEMS.map((item) => (
              <div
                key={item.id}
                className="bg-surface-container-lowest p-space-md flex gap-space-md items-center shadow-sm hover:shadow-md transition-shadow border border-surface-container-high/40"
              >
                <div className="w-24 h-28 bg-surface-container shrink-0 overflow-hidden">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="font-label-sm uppercase tracking-wider text-secondary text-[10px]">
                    {item.category}
                  </span>
                  <h3 className="font-headline-sm text-on-surface truncate text-sm sm:text-base font-semibold">
                    {item.name}
                  </h3>
                  <p className="font-body-md text-primary font-semibold mt-1 text-sm">
                    ₹{item.price.toLocaleString('en-IN')}
                  </p>
                  <button
                    type="button"
                    onClick={() => showToast(item.name, `₹${item.price.toLocaleString('en-IN')}`)}
                    className="mt-space-xs text-secondary hover:text-primary font-label-sm uppercase tracking-wider flex items-center gap-1 transition-colors text-xs font-semibold cursor-pointer"
                  >
                    <span>Add to Set</span>
                    <span className="material-symbols-outlined text-[14px]">add</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Artisanal Archive: You May Also Admire Horizontal Reel */}
      <section className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin py-space-xl w-full">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-space-lg gap-space-sm">
          <div>
            <span className="font-label-sm uppercase tracking-widest text-secondary block mb-1 text-xs">
              Artisanal Archive
            </span>
            <h2 className="font-headline-lg text-primary text-2xl font-serif">You May Also Admire</h2>
          </div>
          <div className="flex items-center gap-space-xs">
            <button
              type="button"
              onClick={() => scrollRelated(-1)}
              aria-label="Scroll left"
              className="w-10 h-10 bg-surface-container-low hover:bg-surface-container text-on-surface flex items-center justify-center transition-colors cursor-pointer border border-surface-container-high/40"
            >
              <span className="material-symbols-outlined text-[20px]">chevron_left</span>
            </button>
            <button
              type="button"
              onClick={() => scrollRelated(1)}
              aria-label="Scroll right"
              className="w-10 h-10 bg-surface-container-low hover:bg-surface-container text-on-surface flex items-center justify-center transition-colors cursor-pointer border border-surface-container-high/40"
            >
              <span className="material-symbols-outlined text-[20px]">chevron_right</span>
            </button>
          </div>
        </div>

        <div
          ref={relatedRef}
          className="flex gap-space-md overflow-x-auto scroll-smooth pb-space-md"
        >
          {DEMO_PRODUCTS.filter((p) => p.id !== product.id).map((related) => (
            <div
              key={related.id}
              className="min-w-[280px] sm:min-w-[320px] max-w-[320px] bg-surface-container-lowest shadow-sm flex flex-col group shrink-0 border border-surface-container-high/40"
            >
              <div
                onClick={() => router.push(`/product/${related.id}`)}
                className="relative aspect-[3/4] overflow-hidden bg-surface-container-high cursor-pointer"
              >
                <img
                  src={related.image}
                  alt={related.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-surface-container-lowest/90 px-2 py-0.5 font-label-sm text-secondary uppercase tracking-wider text-[10px]">
                  {related.category}
                </span>
              </div>
              <div className="p-space-md flex flex-col flex-1 justify-between">
                <div>
                  <h3
                    onClick={() => router.push(`/product/${related.id}`)}
                    className="font-headline-sm text-on-surface group-hover:text-primary transition-colors text-base line-clamp-1 cursor-pointer font-serif"
                  >
                    {related.name}
                  </h3>
                  <p className="font-body-sm text-on-surface-variant mt-1 text-xs">
                    {related.fabric}
                  </p>
                </div>
                <div className="mt-space-md pt-space-xs flex items-center justify-between border-t border-surface-container-high/40">
                  <span className="font-body-md font-semibold text-primary">
                    ₹{related.price.toLocaleString('en-IN')}
                  </span>
                  <button
                    type="button"
                    onClick={() => addToCart(related, 1, related.colorName)}
                    className="text-secondary hover:text-primary font-label-sm uppercase tracking-wider transition-colors text-xs font-semibold cursor-pointer"
                  >
                    Add to Bag
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
