'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useCart } from '../../context/CartContext';
import { CheckCircle2, Package, Printer, ArrowRight, ShieldCheck, Truck, Clock, Sparkles } from 'lucide-react';

function OrderConfirmationContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId') || 'EDS-2026-89421';
  const { currentOrder, orders } = useCart();

  const order = currentOrder || orders.find((o) => o.orderNumber === orderId) || orders[0];

  return (
    <div className="bg-[#FAF7F2] min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Celebration Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-[#E8E2D9] p-8 text-center mb-8 relative overflow-hidden">
          <div className="absolute -top-12 -right-12 w-40 h-40 bg-[#C5A059]/10 rounded-full blur-2xl pointer-events-none" />
          <div className="inline-flex items-center justify-center w-20 h-20 bg-[#51071D]/10 rounded-full text-[#51071D] mb-6">
            <CheckCircle2 className="w-10 h-10 text-[#51071D]" />
          </div>

          <span className="inline-block text-xs uppercase tracking-[0.25em] text-[#C5A059] font-medium mb-2">
            {order?.orderType === 'reseller'
              ? 'Reseller Dropship Order Confirmed'
              : 'Handloom Heirloom Order Confirmed'}
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#1F1916] mb-3">
            {order?.orderType === 'reseller'
              ? 'Client Order Successfully Queued'
              : 'Thank You for Your Patronage'}
          </h1>
          <p className="text-stone-600 max-w-lg mx-auto text-sm sm:text-base mb-6 leading-relaxed">
            {order?.orderType === 'reseller' ? (
              <span>
                Your client dropship order has been queued. We will dispatch directly to{' '}
                <strong>{order.shippingAddress?.fullName}</strong> with the invoice issued under{' '}
                <strong>{order.resellerDetails?.businessName || 'Your Boutique'}</strong>.
              </span>
            ) : (
              'Your authentic handloom order has been received by our master weaver atelier. A confirmation receipt has been dispatched to your email.'
            )}
          </p>

          <div className="inline-flex items-center gap-3 bg-[#FAF7F2] border border-[#E8E2D9] px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium text-[#1F1916]">
            <span>Order Reference:</span>
            <span className="font-mono text-[#51071D] font-bold tracking-wider">{order.orderNumber}</span>
          </div>
        </div>

        {/* Order Details & Summary Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-[#E8E2D9] p-6 sm:p-8 mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-6 border-b border-stone-100 gap-4">
            <div>
              <p className="text-xs text-stone-500 uppercase tracking-wider">Estimated Dispatch</p>
              <p className="font-serif text-lg text-[#1F1916] font-medium">Tomorrow, 11:00 AM IST</p>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href={`/invoice?orderId=${order.orderNumber}`}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#51071D] text-white rounded-lg text-xs font-bold hover:bg-[#6E1F32] transition-colors shadow-sm"
              >
                <Printer className="w-3.5 h-3.5" />
                {order?.orderType === 'reseller'
                  ? 'Print Customer Invoice (Reseller)'
                  : 'Download Tax Invoice'}
              </Link>
              <Link
                href={`/tracking?orderId=${order.orderNumber}`}
                className="inline-flex items-center gap-2 px-4 py-2.5 border border-[#E8E2D9] rounded-lg text-xs font-medium text-stone-700 hover:border-[#51071D] hover:text-[#51071D] transition-colors"
              >
                <Truck className="w-3.5 h-3.5" />
                Live Tracking
              </Link>
            </div>
          </div>

          {/* Itemized List */}
          <div className="py-6 border-b border-stone-100 divide-y divide-stone-100">
            <h2 className="text-xs uppercase tracking-wider text-stone-400 font-semibold mb-4">
              Reserved Handloom Items ({order.items.length})
            </h2>
            {order.items.map((item, idx) => (
              <div key={idx} className="flex gap-4 py-4 items-center">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-16 h-20 object-cover rounded-lg border border-stone-200"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-[#C5A059] font-medium tracking-wide uppercase">{item.product.category}</p>
                  <p className="font-serif text-sm sm:text-base text-[#1F1916] truncate font-medium">{item.product.name}</p>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Color: {item.selectedColor} • Qty: {item.quantity}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-serif font-semibold text-sm sm:text-base text-[#51071D]">
                    ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                  </p>
                  <p className="text-[11px] text-stone-400 line-through">
                    ₹{(item.product.originalPrice * item.quantity).toLocaleString('en-IN')}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Destination & Payment Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 text-xs sm:text-sm">
            <div>
              <p className="font-semibold text-stone-900 mb-1 flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-[#C5A059]" /> Delivery Destination
              </p>
              <p className="text-stone-700 font-medium">{order.shippingAddress.fullName}</p>
              <p className="text-stone-500 leading-relaxed">
                {order.shippingAddress.street}, {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}
              </p>
              <p className="text-stone-500 mt-1">Phone: {order.shippingAddress.phone}</p>
            </div>
            <div>
              <p className="font-semibold text-stone-900 mb-1 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#51071D]" /> Payment Settlement
              </p>
              <p className="text-stone-700 uppercase font-medium">Method: {order.paymentMethod}</p>
              <p className="text-stone-500">Status: Settled & Confirmed</p>
              <div className="mt-2 pt-2 border-t border-stone-100 flex justify-between font-serif text-sm font-bold text-[#51071D]">
                <span>Total Amount:</span>
                <span>₹{order.total.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Atelier Commitment Card */}
        <div className="bg-[#FAF2EB] border border-[#E3D0BE] rounded-xl p-6 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left mb-8">
          <div className="w-12 h-12 rounded-full bg-[#51071D] text-white flex items-center justify-center shrink-0">
            <Sparkles className="w-6 h-6 text-[#E0A96D]" />
          </div>
          <div className="flex-1">
            <h3 className="font-serif text-base text-[#51071D] font-medium">Authenticity Guarantee & Silk Mark Certified</h3>
            <p className="text-xs text-stone-600 mt-0.5 leading-relaxed">
              Every saree in this parcel carries the government-sanctioned Silk Mark certification and GI authentication tag directly from the Salem weaver cooperative.
            </p>
          </div>
          <Link
            href="/shop"
            className="px-5 py-2.5 bg-[#51071D] text-white rounded-lg text-xs font-medium hover:bg-[#6E1F32] whitespace-nowrap"
          >
            Explore More Weaves
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-stone-500 font-serif">Loading order confirmation...</div>}>
      <OrderConfirmationContent />
    </Suspense>
  );
}
