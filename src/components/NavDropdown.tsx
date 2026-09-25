'use client';

import React from 'react';
import Link from 'next/link';
import { NavDropdownConfig } from '../data/navigation';

interface NavDropdownProps {
  config: NavDropdownConfig;
  isOpen: boolean;
  onClose: () => void;
}

export const NavDropdown: React.FC<NavDropdownProps> = ({ config, isOpen, onClose }) => {
  return (
    <div
      className={`absolute top-full left-1/2 -translate-x-1/2 pt-2 transition-all duration-200 z-50 ${
        config.featuredCard ? 'w-[740px]' : config.columns === 2 ? 'w-[580px]' : 'w-72'
      } ${
        isOpen
          ? 'opacity-100 visible translate-y-0 pointer-events-auto'
          : 'opacity-0 invisible -translate-y-1 pointer-events-none'
      }`}
      role="menu"
      aria-label={config.title}
    >
      <div className="bg-white border border-stone-200 shadow-xl rounded-xl p-5 overflow-hidden">
        {/* Header Title */}
        <div className="flex items-center justify-between pb-3 border-b border-stone-100 mb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-stone-600">
            {config.title}
          </span>
          <Link
            href="/shop"
            onClick={onClose}
            className="text-xs font-medium text-[#51071D] hover:underline"
          >
            View All &rarr;
          </Link>
        </div>

        {/* Content Body */}
        <div className="flex gap-6">
          {/* Main Links Grid */}
          <div
            className={`flex-1 grid gap-2 ${
              config.columns === 2 ? 'grid-cols-2' : 'grid-cols-1'
            }`}
          >
            {config.items.map((item) => (
              <Link
                key={item.path + item.label}
                href={item.path}
                onClick={onClose}
                className="group flex items-start gap-3 p-2 rounded-lg hover:bg-stone-50 transition-colors"
              >
                <div className="w-8 h-8 rounded-md bg-stone-100 flex items-center justify-center text-stone-600 group-hover:bg-[#51071D]/10 group-hover:text-[#51071D] transition-colors shrink-0 mt-0.5">
                  <span className="material-symbols-outlined text-[18px]">
                    {item.icon}
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-stone-800 group-hover:text-[#51071D] transition-colors">
                      {item.label}
                    </span>
                    {item.tag && (
                      <span className="text-[10px] font-medium bg-stone-100 text-stone-600 px-1.5 py-0.5 rounded">
                        {item.tag}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-stone-500 line-clamp-1 mt-0.5">
                    {item.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {/* Optional Featured Card */}
          {config.featuredCard && (
            <div className="w-56 shrink-0 border-l border-stone-100 pl-5">
              <Link
                href={config.featuredCard.path}
                onClick={onClose}
                className="group block rounded-lg overflow-hidden border border-stone-200 bg-stone-50 hover:shadow-md transition-all"
              >
                <div className="aspect-[4/3] w-full overflow-hidden bg-stone-200">
                  <img
                    src={config.featuredCard.image}
                    alt={config.featuredCard.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#51071D]">
                    {config.featuredCard.tag}
                  </span>
                  <h4 className="text-xs font-semibold text-stone-800 mt-1 line-clamp-1 group-hover:text-[#51071D]">
                    {config.featuredCard.title}
                  </h4>
                  <p className="text-[11px] text-stone-500 mt-1 line-clamp-2 leading-tight">
                    {config.featuredCard.description}
                  </p>
                </div>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
