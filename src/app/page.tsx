'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { DEMO_PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';

export default function HomePage() {
  const router = useRouter();

  // Highlight tabs state
  const [activeHighlightTab, setActiveHighlightTab] = useState('ALL RELEASES');

  // Interactive Concierge state
  const [selectedOccasion, setSelectedOccasion] = useState('WEDDING MUHURTHAM');
  const [selectedFabric, setSelectedFabric] = useState('PURE KANCHIPURAM SILK');
  const [selectedColor, setSelectedColor] = useState('#51071D');

  const highlightTabs = [
    'ALL RELEASES',
    'NEW ARRIVALS',
    'BESTSELLERS',
    'WEDDING TROUSSEAU',
    'FESTIVE CELEBRATIONS',
  ];

  const getFilteredHighlightProducts = () => {
    switch (activeHighlightTab) {
      case 'NEW ARRIVALS':
        return DEMO_PRODUCTS.filter((p) => p.isNewArrival || p.badge?.includes('New')).slice(0, 4);
      case 'BESTSELLERS':
        return DEMO_PRODUCTS.filter((p) => p.isBestseller).slice(0, 4);
      case 'WEDDING TROUSSEAU':
        return DEMO_PRODUCTS.filter((p) => p.occasion === 'Bridal' || p.category === 'Bridal Pattu').slice(0, 4);
      case 'FESTIVE CELEBRATIONS':
        return DEMO_PRODUCTS.filter((p) => p.category === 'Festive Edit' || p.occasion === 'Festive').slice(0, 4);
      default:
        return DEMO_PRODUCTS.slice(0, 4);
    }
  };

  const handleConciergeSubmit = () => {
    let cat = '';
    if (selectedFabric.includes('KANCHIPURAM')) cat = 'Kanchipuram Silk';
    else if (selectedFabric.includes('SOFT SILK')) cat = 'Soft Silk';
    else if (selectedFabric.includes('COTTON')) cat = 'Traditional Cotton';
    else if (selectedFabric.includes('ORGANZA')) cat = 'Organza Tussar';

    router.push(`/shop?category=${encodeURIComponent(cat)}`);
  };

  return (
    <div className="flex flex-col w-full">
      {/* Authentic Handloom Sub-Bar */}
      <section className="w-full bg-surface-container-high/60 border-b border-surface-container-highest/60 py-2.5 px-margin-mobile md:px-margin">
        <div className="max-w-[1440px] mx-auto flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[11px] sm:text-xs font-label-sm uppercase tracking-widest text-secondary text-center">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
            AUTHENTIC SALEM CLUSTERS
          </span>
          <span className="opacity-40">•</span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
            CERTIFIED HANDLOOM GUILD
          </span>
          <span className="opacity-40">•</span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
            DIRECT LOOM PRICING
          </span>
          <span className="opacity-40">•</span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
            SILK MARK GUARANTEED
          </span>
        </div>
      </section>

      {/* Hero Section */}
      <section className="w-full py-space-lg lg:py-space-xl px-margin-mobile md:px-margin">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-space-lg lg:gap-gutter items-center">
          {/* Hero Left Content */}
          <div className="lg:col-span-6 space-y-space-md">
            <div className="inline-flex items-center gap-1.5 bg-surface-container px-3 py-1 border border-secondary/20">
              <span className="material-symbols-outlined text-[16px] text-secondary">verified</span>
              <span className="font-label-sm uppercase tracking-widest text-secondary font-semibold text-[10px]">
                HAUTE HANDLOOMS OF TAMIL NADU
              </span>
            </div>

            <div className="space-y-space-xs">
              <h1 className="font-display-lg text-primary tracking-tight font-serif leading-[1.1]">
                A Legacy Woven in Every Thread.
              </h1>
              <p className="font-body-lg text-on-surface-variant max-w-xl text-base sm:text-lg leading-relaxed pt-2">
                Discover timeless sarees for every celebration, every tradition, and every beautiful moment. Handcrafted with revered precision in the heritage looms of Elampillai.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-space-sm pt-space-xs">
              <Link
                href="/shop"
                className="bg-primary hover:bg-primary-container text-on-primary font-label-md uppercase tracking-wider px-8 py-3.5 transition-colors flex items-center gap-2 shadow-md text-xs sm:text-sm font-semibold"
              >
                <span>EXPLORE THE COLLECTION</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </Link>
              <Link
                href="#weaver-roots"
                className="bg-surface-container-high hover:bg-surface-container-highest text-primary font-label-md uppercase tracking-wider px-6 py-3.5 transition-colors text-xs sm:text-sm font-semibold"
              >
                DISCOVER OUR STORY
              </Link>
            </div>

            {/* Trust Markers */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-space-md border-t border-surface-container-high/60">
              <div className="flex items-center gap-2 text-xs text-on-surface-variant">
                <span className="material-symbols-outlined text-secondary text-[18px]">verified</span>
                <span>100% Authentic Handloom</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-on-surface-variant">
                <span className="material-symbols-outlined text-secondary text-[18px]">handyman</span>
                <span>Direct from Elampillai Weavers</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-on-surface-variant">
                <span className="material-symbols-outlined text-secondary text-[18px]">public</span>
                <span>Worldwide Insured Delivery</span>
              </div>
            </div>
          </div>

          {/* Hero Right Showcase Portrait */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/5] bg-surface-container overflow-hidden shadow-2xl border border-secondary/20">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAguo_E-cezIOLFLmux2vGYw8kzm2ruoZ3kWNTxWtpUH8pOmSDUFYCPaMEScV6kSxdap8TKbFSbJ9RSKNRsakroScipU6LM9pbgISP0ZRex9C0PFGeyv6H7qzTClvHwRIMYuyi8NPI8DuR2Yg8pOl71mOKhQT34iKVcrllEnw_Y1TSe_AhlDo3SsrvjpkvYbjCytieRQzwlZ-d8D5JUcetAS3tAoL5WEaHtZQLsv8hDk51_ykhhFDy1"
                alt="Masterpiece Thanga Mayil Pallu Saree"
                className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
              />

              {/* Top Zari Pallu Preview Tile */}
              <div className="absolute top-4 left-4 w-20 h-20 bg-surface-container-lowest/90 backdrop-blur-sm p-1 shadow-md border border-secondary/30 hidden sm:block">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuD6-6V4dUks3BdR0qQtUzI6wTIas9dSKKrRl2GoucXjGRJJpPkTWMJIvjPxzKcZ3r5Bg8_fJzYwU11ebC7cBB6uR__uqvXq8j7Hs1-5x_Mtf5fvyNSQC6tIC6YE5xFrrRPHAm7s6iI7-OROyLKpJVnsuInty58S2d-mz_gNzv29pMB_HJBjZV9gkFExMKnQrOOHU0hiCWFxxBN5qY7VZ82qGWnR4JVI706RCiQwpCku8g1caPBXr3K5"
                  alt="Zari macro weave"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Floating Bottom Card: Masterpiece Edit */}
              <div className="absolute bottom-6 inset-x-6 bg-surface-container-lowest/95 backdrop-blur-md p-space-md shadow-xl flex items-center justify-between border border-secondary/20">
                <div>
                  <span className="font-label-sm uppercase tracking-widest text-secondary font-semibold text-[10px]">
                    MASTERPIECE EDIT
                  </span>
                  <h3 className="font-headline-sm text-primary text-base sm:text-lg font-serif">
                    The Thanga Mayil Pallu Saree
                  </h3>
                  <p className="font-body-sm text-on-surface-variant text-xs">
                    Pure Zari Warp • 14-day Artisan Handcraft
                  </p>
                </div>
                <Link
                  href="/shop"
                  className="w-10 h-10 bg-primary text-on-primary rounded-full flex items-center justify-center hover:bg-primary-container transition-colors shrink-0 shadow-md"
                >
                  <span className="material-symbols-outlined text-[18px]">north_east</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Crafted Curations (6 Categories) */}
      <section className="w-full bg-surface-container-low py-space-xl px-margin-mobile md:px-margin border-y border-surface-container-highest/40">
        <div className="max-w-[1440px] mx-auto space-y-space-lg">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-space-xs">
            <div>
              <span className="font-label-sm uppercase tracking-widest text-secondary block mb-1 text-xs">
                CRAFTED CURATIONS
              </span>
              <h2 className="font-headline-lg text-primary">Find Your Perfect Saree</h2>
              <p className="font-body-md text-on-surface-variant max-w-xl text-sm mt-1">
                From luminous bridal pure silks to feather-light everyday cottons, explore hand-loomed heritage categorized for every chapter.
              </p>
            </div>
            <Link
              href="/shop"
              className="font-label-md text-secondary hover:text-primary uppercase tracking-wider flex items-center gap-1 transition-colors text-xs font-semibold"
            >
              <span>BROWSE ALL CATEGORIES</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
            {/* Category 1 */}
            <Link
              href="/shop?category=Kanchipuram%20Silk"
              className="group bg-surface-container-lowest shadow-sm hover:shadow-lg transition-all border border-surface-container-high/40 overflow-hidden flex flex-col"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-surface-container">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCTYFR5IcWaViA-ep9AlhB1PDdB15mERebOWb2gM3NUbF6LDpoy9RRRXYh3nK3CzTKq3lR5yRIV6nZSw--pkCLCGspRs_y-cdOpzVbzVTD3FlTOi6MJbjLQ93o6BiGEIUQni7jrnVLEHYxnzcuN6ZjoTNfYskNGtHEU--8BrjMbMUeud9OjgOUS7J213eOccjoy_jMMiUjPXE8sFXzWGD-kp6Gx8Td3kQXpYMv7UgE02xhEzOH3fDmM"
                  alt="Kanchipuram Silk"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-space-md flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="font-headline-sm text-primary group-hover:text-secondary transition-colors text-lg">
                      Kanchipuram Silk
                    </h3>
                    <span className="material-symbols-outlined text-secondary text-[20px] group-hover:translate-x-1 transition-transform">
                      arrow_forward
                    </span>
                  </div>
                  <p className="font-body-sm text-on-surface-variant text-xs mt-1">
                    Heirloom grade pure mulberry silk with korvai borders and solid woven pallus.
                  </p>
                </div>
                <span className="font-label-sm uppercase tracking-wider text-secondary font-semibold mt-3 block text-xs">
                  FROM ₹8,990
                </span>
              </div>
            </Link>

            {/* Category 2 */}
            <Link
              href="/shop?category=Soft%20Silk"
              className="group bg-surface-container-lowest shadow-sm hover:shadow-lg transition-all border border-surface-container-high/40 overflow-hidden flex flex-col"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-surface-container">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDUAMsktER4A6sm6_ikJWu8qiZeMunejXqapdO12ElryWVIrvcLIyQT1fknmliRoQwcvfQcPp3uA1h-zKm1g65Rf0PpHpxo4OsqWWNEqZZAx_zAV5WAP2zND549K00-JWZYr8ijWJSsaQxTyQuE4SRw_Nt59vHkiLu3HHvRktB3MxUhJJOxeW_wnEVtl-PI5Yi-X814xpyOxaEW9vdbG8x65i6-b0uGku3u4gA2ZxTwPBmORGW3zmKn"
                  alt="Soft Silk"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-space-md flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="font-headline-sm text-primary group-hover:text-secondary transition-colors text-lg">
                      Soft Silk
                    </h3>
                    <span className="material-symbols-outlined text-secondary text-[20px] group-hover:translate-x-1 transition-transform">
                      arrow_forward
                    </span>
                  </div>
                  <p className="font-body-sm text-on-surface-variant text-xs mt-1">
                    Featherlight draping silk with subtle antique sheen for receptions and dinners.
                  </p>
                </div>
                <span className="font-label-sm uppercase tracking-wider text-secondary font-semibold mt-3 block text-xs">
                  FROM ₹4,450
                </span>
              </div>
            </Link>

            {/* Category 3 */}
            <Link
              href="/shop?category=Traditional%20Cotton"
              className="group bg-surface-container-lowest shadow-sm hover:shadow-lg transition-all border border-surface-container-high/40 overflow-hidden flex flex-col"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-surface-container">
                <img
                  src="https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=1000&auto=format&fit=crop"
                  alt="Pure Handloom Cotton"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-space-md flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="font-headline-sm text-primary group-hover:text-secondary transition-colors text-lg">
                      Pure Handloom Cotton
                    </h3>
                    <span className="material-symbols-outlined text-secondary text-[20px] group-hover:translate-x-1 transition-transform">
                      arrow_forward
                    </span>
                  </div>
                  <p className="font-body-sm text-on-surface-variant text-xs mt-1">
                    Salem breathable 80s &amp; 100s count cottons crafted for tropical grace.
                  </p>
                </div>
                <span className="font-label-sm uppercase tracking-wider text-secondary font-semibold mt-3 block text-xs">
                  FROM ₹1,850
                </span>
              </div>
            </Link>

            {/* Category 4 */}
            <Link
              href="/shop?category=Bridal%20Pattu"
              className="group bg-surface-container-lowest shadow-sm hover:shadow-lg transition-all border border-surface-container-high/40 overflow-hidden flex flex-col"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-surface-container">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBm87ffGSReQzGw0UcobpqaFZldUQUkPPHUT4OctYd0yE6-x1Bx_yiUoN5rowUBslYd1w1PEEQdqX9bxX2O1yPFi75IfanNHD09t1TFcAWo4nxc3FhT2a7-UDBuzrZ2d4ifLdYRno0CqIm0RiltoRF7Vk9sbbArGEYYcRNKrXJpbFfGmmrXml1OROxY2Vdd0oX0HYP6nC20FfEcqW8LJdLL6C-DHktmrA3hsE79PXmeZgpiAmSfzgnr"
                  alt="Bridal & Wedding Sarees"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-space-md flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="font-headline-sm text-primary group-hover:text-secondary transition-colors text-lg">
                      Bridal &amp; Wedding Sarees
                    </h3>
                    <span className="material-symbols-outlined text-secondary text-[20px] group-hover:translate-x-1 transition-transform">
                      arrow_forward
                    </span>
                  </div>
                  <p className="font-body-sm text-on-surface-variant text-xs mt-1">
                    Opulent trousseau silks woven with heavy zari borders for monumental ceremonies.
                  </p>
                </div>
                <span className="font-label-sm uppercase tracking-wider text-secondary font-semibold mt-3 block text-xs">
                  FROM ₹12,500
                </span>
              </div>
            </Link>

            {/* Category 5 */}
            <Link
              href="/shop?category=Festive%20Edit"
              className="group bg-surface-container-lowest shadow-sm hover:shadow-lg transition-all border border-surface-container-high/40 overflow-hidden flex flex-col"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-surface-container">
                <img
                  src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1000&auto=format&fit=crop"
                  alt="Festive Edit"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-space-md flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="font-headline-sm text-primary group-hover:text-secondary transition-colors text-lg">
                      Festive Edit
                    </h3>
                    <span className="material-symbols-outlined text-secondary text-[20px] group-hover:translate-x-1 transition-transform">
                      arrow_forward
                    </span>
                  </div>
                  <p className="font-body-sm text-on-surface-variant text-xs mt-1">
                    Vibrant jewel-tone weaves designed for Diwali, Pongal, and family festivities.
                  </p>
                </div>
                <span className="font-label-sm uppercase tracking-wider text-secondary font-semibold mt-3 block text-xs">
                  FROM ₹3,900
                </span>
              </div>
            </Link>

            {/* Category 6 */}
            <Link
              href="/shop"
              className="group bg-surface-container-lowest shadow-sm hover:shadow-lg transition-all border border-surface-container-high/40 overflow-hidden flex flex-col"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-surface-container">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBcVjp_cb7OFfxAD65gVejnvIFpmIK7ei_0blAKeDOAuK-hCZhjh3DpjsJ7bXG6rxovQqqU1Z5VVqqrGejHZqVwvO1k8w6Fvg9wp6KpIoQPCPQc2nu70Mdl7zLk8_itDDg-ebDbQEUaN03_9S8EN__A2l7LJnogUtBDtr6ZeKRAdlseW3L-3zqQjrYHcVOZk7xgBl9w5Z0x8vcK7-AoXuEftk57JcgQAkTeV3zCqdg2v17kIXypkv83"
                  alt="Daily Elegance"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-space-md flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="font-headline-sm text-primary group-hover:text-secondary transition-colors text-lg">
                      Daily Elegance
                    </h3>
                    <span className="material-symbols-outlined text-secondary text-[20px] group-hover:translate-x-1 transition-transform">
                      arrow_forward
                    </span>
                  </div>
                  <p className="font-body-sm text-on-surface-variant text-xs mt-1">
                    Understated minimal drapes engineered for seamless corporate and cultural days.
                  </p>
                </div>
                <span className="font-label-sm uppercase tracking-wider text-secondary font-semibold mt-3 block text-xs">
                  FROM ₹2,450
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Artisanal Highlights: Featured Curations & Bestsellers */}
      <section className="w-full py-space-xl px-margin-mobile md:px-margin">
        <div className="max-w-[1440px] mx-auto space-y-space-md">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-sm pb-space-sm border-b border-surface-container-high">
            <div>
              <span className="font-label-sm uppercase tracking-widest text-secondary text-xs">
                ARTISANAL HIGHLIGHTS
              </span>
              <h2 className="font-headline-md text-primary text-2xl font-serif">
                Featured Curations &amp; Bestsellers
              </h2>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto pb-1">
              {highlightTabs.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  suppressHydrationWarning
                  onClick={() => setActiveHighlightTab(tab)}
                  className={`px-3 py-1.5 font-label-sm uppercase tracking-wider text-xs transition-colors cursor-pointer ${
                    activeHighlightTab === tab
                      ? 'bg-primary text-on-primary font-semibold shadow-sm'
                      : 'bg-surface-container-high text-on-surface hover:bg-surface-container-highest'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* 4 Product Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter pt-space-xs">
            {getFilteredHighlightProducts().map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Our Weaver Roots Section */}
      <section
        id="weaver-roots"
        className="w-full bg-surface-container-low py-space-xl px-margin-mobile md:px-margin border-t border-surface-container-highest/40"
      >
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center">
          {/* Collage of 4 loom photos */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-3">
            <div className="space-y-3">
              <div className="aspect-[4/5] bg-surface-container overflow-hidden shadow-sm">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBtbHgRiejKBNlOAaruXWAEH1cBuC9LavCZcVTr1KVtJnNWAwreTk_V2tYeUzUARzyMdjyH15aNhQ7V4pGTUEJ2BRuwdRaVZxrEJ3TjvtYH9QvoBIRkaLUh3u_IAZvm8tP7MLvfoaX9RLro5e0NpQdF4fcrNl20aSkrj8YBijbCqnmUtg42T__FvNCd0RIOk6jBUex72tcU-llU1SOxfdmtPsfksrYRy41XgigAvkdja3XXEOAoR-PQ"
                  alt="Master weaver Thiru Devarajan at pit loom"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-square bg-surface-container overflow-hidden shadow-sm">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBL7bY8-0-fRNxaHjPxxJD9F0L7sWhzSt-j-NJbN9AUO3Rw5l3nqY9fs3gjREme9Mw8qs8iA_Wbvod5-zBm3Ll9nl9wrIX05ikjlB8T_qGkzFcVoZXXJHRIb-yuKSqi_v4EZicErQKwpKmSUk7wl-QvBtlFHtE0yJ5FIHpzXNkpCwmdP0gRe953kI-EzvyW2pQCB1gygDEo6bEQLTPKHKMftsGoTtGUF8zRueN0gUzvoqY7Ki00Frne"
                  alt="Handloom silk warping"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="space-y-3 pt-6">
              <div className="aspect-square bg-surface-container overflow-hidden shadow-sm">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCRajiWUBDeAiOfLcx4vX7bLcF09j4Uh0yMPJoIAF-udiZrOMxkK-TvvpHwF0JDa68n7bxNnzR1g2wTm4CeXguXHLWEZzEtyxtZshhtbwdJORHuH5_1XaPTtmdJ9sF10gu7nPnE6P0SCi-JXvt7VCj5LBW5KrH0Ioa_VO074mRQvVim66YIMjZTKwmYx0Pv_R6d-9OaxTfRmKnfjnwt0aG-mX9nuCu2u_FYSuzMpwvflnND1oqnc8v6"
                  alt="Gold zari shuttle pass"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-[4/5] bg-surface-container overflow-hidden shadow-sm">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC3D7BaYwBi42oPuUhWYCGnK_fLSGbrKZNpuGMsIvppq40TMCWyldIwRS3Lv__yu0prd0LwWJVtuq4wu5kd-cNEpsGvchpWQvT-Tg8jg_OksyBL4r8sLZaT0tWfM_J-DmCIwgbd_Iprptvh-rVGOvFLahmimtZ_-ufwPtyDDBqBSyIprlnLV78n7JHtNvqDoIrBsiIuxdb2b3sX5DhFgQiteFXQnuVsNPiY0jxIiv21h-KaiVhkVHf2"
                  alt="Pure mulberry silk dyed threads"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Chronicle Story */}
          <div className="lg:col-span-6 space-y-space-md lg:pl-space-md">
            <div>
              <span className="font-label-sm uppercase tracking-widest text-secondary font-semibold text-xs">
                OUR WEAVER ROOTS
              </span>
              <h2 className="font-display-md text-primary font-serif leading-tight mt-1 text-3xl">
                Tradition, Beautifully Woven Into Today.
              </h2>
            </div>

            <p className="font-body-md text-on-surface-variant leading-relaxed text-sm">
              Nestled at the foothills of Salem, the weavers of Elampillai have spent generations perfecting the synchronization of warp and weft. Here, time is measured not in hours, but in shuttle passes and the cadence of foot pedals.
            </p>
            <p className="font-body-md text-on-surface-variant leading-relaxed text-sm">
              At Elampillai Deva Sarees, we bypass middlemen to ensure master weavers receive righteous honor and patrons across the globe gain direct access to genuine artisanal luxury. Each drape carries centuries of cultural identity, reimagined for modern celebratory life.
            </p>

            {/* Metrics Row */}
            <div className="grid grid-cols-3 gap-space-sm pt-space-xs border-y border-surface-container-high py-space-sm">
              <div>
                <span className="font-headline-lg text-primary font-serif block">350+</span>
                <span className="font-label-sm uppercase tracking-wider text-secondary text-[11px]">
                  ARTISAN LOOMS
                </span>
              </div>
              <div>
                <span className="font-headline-lg text-primary font-serif block">40+</span>
                <span className="font-label-sm uppercase tracking-wider text-secondary text-[11px]">
                  YEARS LEGACY
                </span>
              </div>
              <div>
                <span className="font-headline-lg text-primary font-serif block">100%</span>
                <span className="font-label-sm uppercase tracking-wider text-secondary text-[11px]">
                  SILK MARK VERIFIED
                </span>
              </div>
            </div>

            <Link
              href="/shop"
              className="inline-flex items-center gap-2 font-label-md uppercase tracking-wider text-secondary hover:text-primary transition-colors text-xs font-semibold underline underline-offset-4"
            >
              <span>READ THE WEAVER CHRONICLE</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Interactive Concierge: Discover Your Ideal Drape */}
      <section className="w-full py-space-xl px-margin-mobile md:px-margin">
        <div className="max-w-[1000px] mx-auto bg-surface-container-lowest p-space-md sm:p-space-lg shadow-xl border border-secondary/20">
          <div className="text-center space-y-1 mb-space-md">
            <span className="font-label-sm uppercase tracking-widest text-secondary font-semibold text-xs">
              INTERACTIVE CONCIERGE
            </span>
            <h2 className="font-headline-lg text-primary">Discover Your Ideal Drape</h2>
            <p className="font-body-sm text-on-surface-variant text-xs sm:text-sm">
              Select your preferences to instantly reveal curated weaves suited for your momentous occasion.
            </p>
          </div>

          <div className="space-y-space-md pt-space-xs">
            {/* 1. Occasion */}
            <div>
              <label className="font-label-md uppercase tracking-wider text-on-surface font-semibold text-xs block mb-2">
                1. SELECT OCCASION
              </label>
              <div className="flex flex-wrap gap-2">
                {[
                  'WEDDING MUHURTHAM',
                  'SANGEET & RECEPTION',
                  'FESTIVE PUJA',
                  'OFFICE & SUBTLE GRACE',
                ].map((occ) => (
                  <button
                    key={occ}
                    type="button"
                    suppressHydrationWarning
                    onClick={() => setSelectedOccasion(occ)}
                    className={`px-3 py-1.5 text-xs transition-colors cursor-pointer ${
                      selectedOccasion === occ
                        ? 'bg-primary text-on-primary font-semibold shadow-sm'
                        : 'bg-surface-container-high text-on-surface hover:bg-surface-container-highest'
                    }`}
                  >
                    {occ}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Fabric */}
            <div>
              <label className="font-label-md uppercase tracking-wider text-on-surface font-semibold text-xs block mb-2">
                2. PREFERRED FABRIC
              </label>
              <div className="flex flex-wrap gap-2">
                {[
                  'PURE KANCHIPURAM SILK',
                  'ELAMPILLAI SOFT SILK',
                  'SALEM LINEN COTTON',
                  'TISSUE ORGANZA SILK',
                ].map((fab) => (
                  <button
                    key={fab}
                    type="button"
                    suppressHydrationWarning
                    onClick={() => setSelectedFabric(fab)}
                    className={`px-3 py-1.5 text-xs transition-colors cursor-pointer ${
                      selectedFabric === fab
                        ? 'bg-primary text-on-primary font-semibold shadow-sm'
                        : 'bg-surface-container-high text-on-surface hover:bg-surface-container-highest'
                    }`}
                  >
                    {fab}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Color Palette */}
            <div>
              <label className="font-label-md uppercase tracking-wider text-on-surface font-semibold text-xs block mb-2">
                3. COLOR PALETTE
              </label>
              <div className="flex items-center gap-3">
                {[
                  { name: 'Crimson Burgundy', hex: '#51071D' },
                  { name: 'Antique Gold', hex: '#745A29' },
                  { name: 'Emerald Forest', hex: '#1B4332' },
                  { name: 'Royal Peacock', hex: '#0D284A' },
                ].map((c) => (
                  <button
                    key={c.name}
                    type="button"
                    suppressHydrationWarning
                    onClick={() => setSelectedColor(c.hex)}
                    style={{ backgroundColor: c.hex }}
                    className={`w-9 h-9 rounded-full shadow-sm flex items-center justify-center transition-transform hover:scale-110 cursor-pointer ${
                      selectedColor === c.hex ? 'ring-2 ring-secondary ring-offset-2' : ''
                    }`}
                    title={c.name}
                  >
                    {selectedColor === c.hex && (
                      <span className="material-symbols-outlined text-[16px] text-white">check</span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Concierge Action Bar */}
            <div className="pt-space-sm flex flex-col sm:flex-row items-center justify-between gap-space-sm border-t border-surface-container-high mt-space-sm">
              <span className="font-body-sm text-on-surface text-xs flex items-center gap-1.5">
                <span className="material-symbols-outlined text-secondary text-[18px]">auto_awesome</span>
                <span>Found <strong>48 Handcrafted Sarees</strong> matching your tailored search</span>
              </span>

              <button
                type="button"
                suppressHydrationWarning
                onClick={handleConciergeSubmit}
                className="w-full sm:w-auto bg-primary-container hover:bg-primary text-on-primary font-label-md uppercase tracking-wider px-6 py-3 transition-colors text-xs font-semibold cursor-pointer shadow-md"
              >
                VIEW CURATED RESULTS
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Grand Festive Season 2025 Banner */}
      <section className="w-full relative py-space-xl px-margin-mobile md:px-margin bg-primary text-center text-on-primary overflow-hidden">
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#ffdea6_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="relative max-w-2xl mx-auto space-y-space-sm z-10">
          <span className="font-label-sm uppercase tracking-widest text-secondary-fixed text-xs font-semibold">
            GRAND FESTIVE SEASON 2026
          </span>
          <h2 className="font-headline-lg text-3xl font-serif">
            Make Every Celebration Unforgettable
          </h2>
          <p className="font-body-md text-primary-fixed opacity-90 text-sm">
            Wrap yourself in the luminous glory of pure zari drapes crafted by master hands to illuminate family gatherings, sacred pujas, and weddings.
          </p>
          <div className="pt-space-xs">
            <Link
              href="/shop?category=Festive%20Edit"
              className="inline-block bg-secondary hover:bg-secondary-container hover:text-on-secondary-container text-on-secondary font-label-md uppercase tracking-wider px-8 py-3.5 transition-colors text-xs font-semibold shadow-lg"
            >
              EXPLORE FESTIVE COLLECTION
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials: Voices of Our Cherished Patrons */}
      <section className="w-full bg-surface-container-low py-space-xl px-margin-mobile md:px-margin">
        <div className="max-w-[1440px] mx-auto space-y-space-lg">
          <div className="text-center space-y-1">
            <span className="font-label-sm uppercase tracking-widest text-secondary font-semibold text-xs">
              TESTIMONIALS
            </span>
            <h2 className="font-headline-lg text-primary">Voices of Our Cherished Patrons</h2>
            <p className="font-body-sm text-on-surface-variant text-xs">
              Over 10,000+ brides and handloom lovers across 24 countries draped in Elampillai Deva perfection.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            {/* Review 1 */}
            <div className="bg-surface-container-lowest p-space-md sm:p-space-lg shadow-sm border border-surface-container-high/40 flex flex-col justify-between space-y-space-sm">
              <div className="space-y-space-xs">
                <div className="flex text-secondary gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                      star
                    </span>
                  ))}
                </div>
                <p className="font-body-md text-on-surface italic text-sm leading-relaxed">
                  "I ordered my bridal muhurtham saree all the way from London. The craftsmanship of the peacock zari pallu is simply unmatched. You can physically feel the artisan's dedication."
                </p>
              </div>
              <div className="flex items-center gap-space-xs pt-space-xs border-t border-surface-container-high">
                <div className="w-9 h-9 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold text-xs">
                  D
                </div>
                <div>
                  <p className="font-label-sm uppercase tracking-wider text-on-surface font-semibold text-xs">
                    Dr. Deepika Sundaram
                  </p>
                  <p className="font-body-sm text-on-surface-variant text-[11px]">
                    London, United Kingdom • Verified Bride
                  </p>
                </div>
              </div>
            </div>

            {/* Review 2 */}
            <div className="bg-surface-container-lowest p-space-md sm:p-space-lg shadow-sm border border-surface-container-high/40 flex flex-col justify-between space-y-space-sm">
              <div className="space-y-space-xs">
                <div className="flex text-secondary gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                      star
                    </span>
                  ))}
                </div>
                <p className="font-body-md text-on-surface italic text-sm leading-relaxed">
                  "The drape and weightlessness of their Elampillai Soft Silks are remarkable. I wore it for 12 hours straight during a family reception with zero fuss. Elegant and royal."
                </p>
              </div>
              <div className="flex items-center gap-space-xs pt-space-xs border-t border-surface-container-high">
                <div className="w-9 h-9 rounded-full bg-secondary text-on-secondary flex items-center justify-center font-bold text-xs">
                  M
                </div>
                <div>
                  <p className="font-label-sm uppercase tracking-wider text-on-surface font-semibold text-xs">
                    Meera Ranganathan
                  </p>
                  <p className="font-body-sm text-on-surface-variant text-[11px]">
                    Bengaluru, India • Textile Connoisseur
                  </p>
                </div>
              </div>
            </div>

            {/* Review 3 */}
            <div className="bg-surface-container-lowest p-space-md sm:p-space-lg shadow-sm border border-surface-container-high/40 flex flex-col justify-between space-y-space-sm">
              <div className="space-y-space-xs">
                <div className="flex text-secondary gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                      star
                    </span>
                  ))}
                </div>
                <p className="font-body-md text-on-surface italic text-sm leading-relaxed">
                  "Direct weaver pricing with Silk Mark guarantee gave me supreme peace of mind. Delivery was prompt and packaging was akin to a luxury French fashion house."
                </p>
              </div>
              <div className="flex items-center gap-space-xs pt-space-xs border-t border-surface-container-high">
                <div className="w-9 h-9 rounded-full bg-primary-container text-on-primary flex items-center justify-center font-bold text-xs">
                  A
                </div>
                <div>
                  <p className="font-label-sm uppercase tracking-wider text-on-surface font-semibold text-xs">
                    Ananya Subramanian
                  </p>
                  <p className="font-body-sm text-on-surface-variant text-[11px]">
                    Chennai, India • Diwali Patron
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Diary: Follow The Beauty of Every Thread */}
      <section className="w-full py-space-xl px-margin-mobile md:px-margin">
        <div className="max-w-[1440px] mx-auto space-y-space-md">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-space-xs pb-space-sm border-b border-surface-container-high">
            <div>
              <span className="font-label-sm uppercase tracking-widest text-secondary font-semibold text-xs">
                VISUAL DIARY
              </span>
              <h2 className="font-headline-lg text-primary">Follow the Beauty of Every Thread</h2>
              <p className="font-body-sm text-on-surface-variant text-xs mt-0.5">
                Real celebrations, styling reels, and loom updates from @elampillai_deva._.sarees
              </p>
            </div>
            <a
              href="https://instagram.com/elampillai_deva._.sarees"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 border border-secondary text-secondary hover:bg-secondary hover:text-on-secondary font-label-md uppercase tracking-wider transition-colors text-xs font-semibold"
            >
              <span className="material-symbols-outlined text-[16px]">photo_camera</span>
              <span>FOLLOW ON INSTAGRAM</span>
            </a>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {[
              'https://lh3.googleusercontent.com/aida-public/AB6AXuBP3eMuOGP3_Rw3JceEzxLePpchQpFi-trelqjT3A9_uDVA6CEf5aFH_zVXam46wbHJdxEuXXA3P9Q_MI9SNaV7zgNUdAoJoVVnM3Pl9n4SwI0HSvudj0VQOK6HXYz0v51aR2F-E1cAa1Mb7ktOHQatRkZlR6TjoLmUJpfJFyHi1dXqHqIdsB6gjrfvign3p_O2oHJ3R1nYUSKeQaf722U6J1ub0YrKWQ5Bnfztahx86xDy65u4uqu-',
              'https://lh3.googleusercontent.com/aida-public/AB6AXuAguo_E-cezIOLFLmux2vGYw8kzm2ruoZ3kWNTxWtpUH8pOmSDUFYCPaMEScV6kSxdap8TKbFSbJ9RSKNRsakroScipU6LM9pbgISP0ZRex9C0PFGeyv6H7qzTClvHwRIMYuyi8NPI8DuR2Yg8pOl71mOKhQT34iKVcrllEnw_Y1TSe_AhlDo3SsrvjpkvYbjCytieRQzwlZ-d8D5JUcetAS3tAoL5WEaHtZQLsv8hDk51_ykhhFDy1',
              'https://lh3.googleusercontent.com/aida-public/AB6AXuDEVlD7jxMyiNw5pymnCKYUduPfDyl3NTRQ8IVkwQQ2NRIVoM1PKOFLezpDzBLO_uXmlLSK-HETxGGY6jAVcl80o6InMkgIAvpHyu-50qyVxfUlGb4tJypXPOl_ZB6e_u9WBXNNTKZ0iBg693cemZaYdbqIBaFh41eqeRM7K3O6OVFRUC_87p4UyiLfGXV8b-ajEMVnV9B2PNmFZ-W-7Nu3jWflIRGP5QwpFEnpVhGOSJ4liTWPhWsr',
              'https://lh3.googleusercontent.com/aida-public/AB6AXuBm87ffGSReQzGw0UcobpqaFZldUQUkPPHUT4OctYd0yE6-x1Bx_yiUoN5rowUBslYd1w1PEEQdqX9bxX2O1yPFi75IfanNHD09t1TFcAWo4nxc3FhT2a7-UDBuzrZ2d4ifLdYRno0CqIm0RiltoRF7Vk9sbbArGEYYcRNKrXJpbFfGmmrXml1OROxY2Vdd0oX0HYP6nC20FfEcqW8LJdLL6C-DHktmrA3hsE79PXmeZgpiAmSfzgnr',
              'https://lh3.googleusercontent.com/aida-public/AB6AXuDmVXYRJeFkiMbsfDluy-pOOFldDsXsNd6_IAxUe_xYqzkroKx6pVKO_ZL4ZvGjdCL0tiOuYo51yeupvqkCThU4LxlfF5-B_H-5-z8Fve4HXHsU-Lx9Q1BlEeo5cfNVVYvPyyxcvBpGUTZOn-CBiqHXLJKomQjiAPsMcs-7BK0GGjwBuyykR1JZdMvell6UVvzCrCPOKHiyFAsAMPewGynAHQqmjT_J82fUusJ-DmFRjxfSzo1d2N_O',
            ].map((imgUrl, idx) => (
              <div
                key={idx}
                className="group relative aspect-square overflow-hidden bg-surface-container shadow-sm"
              >
                <img
                  src={imgUrl}
                  alt={`Instagram highlight ${idx + 1}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-on-primary">
                  <span className="material-symbols-outlined text-[24px]">photo_camera</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Silk Society Newsletter Card */}
      <section className="w-full bg-surface-container-high/40 py-space-xl px-margin-mobile md:px-margin border-t border-surface-container-highest">
        <div className="max-w-[700px] mx-auto text-center space-y-space-sm bg-surface-container-lowest p-space-md sm:p-space-lg shadow-sm border border-secondary/20">
          <span className="font-label-sm uppercase tracking-widest text-secondary font-semibold text-xs">
            THE SILK SOCIETY
          </span>
          <h2 className="font-headline-lg text-primary text-2xl font-serif">
            Private Invitations &amp; Rare Loom Drops
          </h2>
          <p className="font-body-sm text-on-surface-variant text-xs sm:text-sm">
            Join our inner circle to receive first previews of limited-run festive editions, master weaver documentaries, and bespoke styling advice.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert('Welcome to The Silk Society!');
            }}
            className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto pt-2"
          >
            <input
              type="email"
              required
              placeholder="Enter your email address"
              suppressHydrationWarning
              className="flex-1 bg-surface-container-low px-4 py-2.5 font-body-sm text-on-surface placeholder:text-outline focus:outline-none focus:ring-1 focus:ring-secondary text-xs sm:text-sm"
            />
            <button
              type="submit"
              suppressHydrationWarning
              className="bg-primary hover:bg-primary-container text-on-primary font-label-md uppercase tracking-wider px-6 py-2.5 transition-colors text-xs font-semibold cursor-pointer shrink-0"
            >
              JOIN SOCIETY
            </button>
          </form>
          <div className="flex items-center justify-center gap-4 text-outline font-label-sm text-[10px] pt-1">
            <span>✓ No Spam, Ever</span>
            <span>✓ Complimentary First Order Gift</span>
          </div>
        </div>
      </section>
    </div>
  );
}
