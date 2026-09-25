'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useCart } from '../../context/CartContext';
import { Printer, ArrowLeft, ShieldCheck, CheckCircle } from 'lucide-react';

function InvoiceContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId') || 'EDS-2026-89421';
  const { orders } = useCart();

  const order =
    orders.find((o) => o.orderNumber.toLowerCase() === orderId.trim().toLowerCase()) || orders[0];

  const handlePrint = () => {
    window.print();
  };

  const isReseller = order?.orderType === 'reseller';
  const reseller = order?.resellerDetails;

  // Amount calculation
  const invoiceTotal = isReseller && reseller?.resellerPrice ? reseller.resellerPrice : order.total;
  const gstAmount = Math.round(invoiceTotal * 0.05); // 5% GST
  const baseAmount = invoiceTotal - gstAmount;

  return (
    <div className="bg-[#FAF7F2] min-h-screen py-10 px-4 sm:px-6 lg:px-8 print:bg-white print:p-0">
      <div className="max-w-3xl mx-auto">
        {/* Print & Return Navigation */}
        <div className="flex justify-between items-center mb-6 print:hidden">
          <Link
            href={`/order-confirmation?orderId=${order.orderNumber}`}
            className="inline-flex items-center gap-1.5 text-xs text-stone-600 hover:text-[#51071D]"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Order Confirmation
          </Link>
          <div className="flex items-center gap-3">
            {isReseller && (
              <span className="hidden sm:inline-block text-xs font-semibold bg-[#51071D]/10 text-[#51071D] px-3 py-1.5 rounded-full">
                Reseller-to-Customer Invoice
              </span>
            )}
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#51071D] text-white rounded-lg text-xs font-bold hover:bg-[#6E1F32] shadow-sm cursor-pointer transition-colors"
            >
              <Printer className="w-4 h-4" /> Print / Save as PDF
            </button>
          </div>
        </div>

        {/* Invoice Canvas */}
        <div className="bg-white rounded-2xl p-8 sm:p-12 shadow-sm border border-stone-200 print:border-none print:shadow-none print:p-0">
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row justify-between items-start pb-8 border-b-2 border-stone-800 gap-6">
            <div>
              {isReseller ? (
                /* Reseller Header: In the name of the Reseller */
                <>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#51071D] uppercase">
                      {reseller?.businessName || 'BOUTIQUE HANDLOOM FASHIONS'}
                    </span>
                  </div>
                  <p className="text-xs text-stone-500 uppercase tracking-widest font-semibold">
                    Curated Sarees &amp; Artisanal Apparel
                  </p>
                  <p className="text-xs text-stone-600 mt-2 max-w-xs leading-relaxed">
                    Represented by: <strong>{reseller?.resellerName || 'Authorized Partner'}</strong>
                    <br />
                    {reseller?.city && `${reseller.city}, `}
                    {reseller?.state || 'India'}
                  </p>
                  <p className="text-xs text-stone-600 mt-1">
                    Contact: {reseller?.phone}
                    {reseller?.email && ` • ${reseller.email}`}
                  </p>
                </>
              ) : (
                /* Direct Customer Header: Deva Sarees */
                <>
                  <div className="flex items-center gap-3 mb-2">
                    <img
                      src="/logo.png"
                      alt="Deva Sarees"
                      className="h-14 w-auto object-contain"
                    />
                  </div>
                  <p className="text-xs text-stone-500 uppercase tracking-widest font-semibold">
                    Haute Handlooms &amp; Master Weaver Atelier
                  </p>
                  <p className="text-xs text-stone-600 mt-2 max-w-xs leading-relaxed">
                    Weavers Heritage Complex, Salem District, Tamil Nadu - 637502, India
                  </p>
                  <p className="text-xs text-stone-500 mt-1 font-mono">
                    GSTIN: 33AAACD9823P1Z8 • GI Registered Atelier
                  </p>
                </>
              )}
            </div>

            <div className="sm:text-right">
              <span className="inline-block bg-[#51071D] text-white text-[11px] font-semibold tracking-widest px-3 py-1 uppercase rounded">
                {isReseller ? 'Customer Tax Invoice & Packing Slip' : 'Tax Invoice / Bill of Supply'}
              </span>
              <p className="font-mono text-sm font-bold text-stone-900 mt-3">#{order.orderNumber}</p>
              <p className="text-xs text-stone-500 mt-1">Invoice Date: {order.orderDate || order.date}</p>
              <p className="text-xs text-stone-500 font-mono">HSN Code: 5007 20 10 (Silk Sarees)</p>
            </div>
          </div>

          {/* Billing & Shipping Destination */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 py-8 border-b border-stone-200 text-xs">
            <div>
              <p className="text-[11px] uppercase tracking-wider text-stone-400 font-bold mb-2">
                Billed To &amp; Shipped To (Customer)
              </p>
              <p className="font-serif text-sm font-semibold text-stone-900">
                {order.shippingAddress.fullName}
              </p>
              <p className="text-stone-600 mt-1">{order.shippingAddress.street}</p>
              {order.shippingAddress.landmark && (
                <p className="text-stone-500">Landmark: {order.shippingAddress.landmark}</p>
              )}
              <p className="text-stone-600">
                {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}
              </p>
              <p className="text-stone-700 font-medium mt-1">
                Contact: {order.shippingAddress.phone}
              </p>
            </div>

            <div>
              <p className="text-[11px] uppercase tracking-wider text-stone-400 font-bold mb-2">
                Dispatch &amp; Consignment Details
              </p>
              <p className="text-stone-700">
                <strong className="text-stone-900">Carrier:</strong> BlueDart Express Air Priority
              </p>
              <p className="text-stone-700 font-mono mt-0.5">
                <strong className="text-stone-900 font-sans">AWB Consignment:</strong> {order.awbNumber || 'BD-982143098'}
              </p>
              <p className="text-stone-700 mt-0.5">
                <strong className="text-stone-900">Payment Status:</strong>{' '}
                <span className="text-emerald-700 font-semibold">{order.paymentStatus}</span> ({order.paymentMethod.toUpperCase()})
              </p>
              {isReseller && (
                <p className="text-stone-700 mt-0.5">
                  <strong className="text-stone-900">Fulfilled on behalf of:</strong> {reseller?.businessName}
                </p>
              )}
            </div>
          </div>

          {/* Itemized Table */}
          <div className="py-6 border-b border-stone-200">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-stone-200 text-stone-400 uppercase tracking-wider text-[11px]">
                  <th className="pb-3 font-semibold">Item &amp; Description</th>
                  <th className="pb-3 font-semibold text-center">HSN</th>
                  <th className="pb-3 font-semibold text-center">Qty</th>
                  <th className="pb-3 font-semibold text-right">Unit Rate</th>
                  <th className="pb-3 font-semibold text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {order.items.map((item, idx) => {
                  const unitPrice = isReseller && reseller?.resellerPrice
                    ? Math.round(reseller.resellerPrice / order.items.reduce((a, b) => a + b.quantity, 0))
                    : item.product.price;
                  const lineTotal = unitPrice * item.quantity;
                  return (
                    <tr key={idx} className="py-3">
                      <td className="py-3 pr-4">
                        <p className="font-serif font-medium text-stone-900">{item.product.name}</p>
                        <p className="text-[11px] text-stone-500">
                          {item.product.fabric} • Color: {item.selectedColor} • Handloom Verified
                        </p>
                      </td>
                      <td className="py-3 text-center font-mono text-stone-600">500720</td>
                      <td className="py-3 text-center text-stone-700">{item.quantity}</td>
                      <td className="py-3 text-right font-mono text-stone-700">
                        ₹{unitPrice.toLocaleString('en-IN')}
                      </td>
                      <td className="py-3 text-right font-mono font-semibold text-stone-900">
                        ₹{lineTotal.toLocaleString('en-IN')}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Calculation Breakdown */}
          <div className="py-6 flex flex-col sm:flex-row justify-between items-start gap-4">
            <div className="text-xs text-stone-500 max-w-sm">
              {isReseller && reseller?.customNote ? (
                <div className="p-3 bg-stone-50 rounded-lg border border-stone-200">
                  <p className="font-bold text-stone-700 mb-0.5">Note from {reseller.businessName}:</p>
                  <p className="italic text-stone-600 leading-relaxed">{reseller.customNote}</p>
                </div>
              ) : (
                <p className="leading-relaxed">
                  Thank you for cherishing pure authentic handlooms. All pieces are inspected for authentic pure warp, tested zari, and flawless finishing.
                </p>
              )}
            </div>

            <div className="w-full sm:w-72 space-y-2 text-xs">
              <div className="flex justify-between text-stone-600">
                <span>Subtotal (Excl. Tax):</span>
                <span className="font-mono">₹{baseAmount.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Integrated GST (5%):</span>
                <span className="font-mono">₹{gstAmount.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Shipping &amp; Insured Transit:</span>
                <span className="text-emerald-700 font-semibold uppercase text-[11px]">Free Delivery</span>
              </div>
              <div className="flex justify-between text-base font-serif font-bold text-[#51071D] pt-3 border-t border-stone-800">
                <span>Total Invoice Value:</span>
                <span className="font-mono">₹{invoiceTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>

          {/* Certification Stamp & Signoff */}
          <div className="pt-8 border-t border-stone-200 flex flex-col sm:flex-row justify-between items-center gap-6 text-xs text-stone-500">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border-2 border-[#51071D] flex items-center justify-center text-[#51071D] font-serif text-[9px] text-center leading-tight font-bold">
                PURE<br />SILK
              </div>
              <div>
                <p className="font-semibold text-stone-800">100% Authentic Handloom Verified</p>
                <p className="text-[11px]">Silk Mark Organization Registered Standard</p>
              </div>
            </div>

            <div className="text-center sm:text-right">
              <p className="font-serif italic text-stone-700">
                {isReseller
                  ? `For ${reseller?.businessName || 'Boutique Partner'}`
                  : 'For Deva Sarees'}
              </p>
              <div className="h-8 flex items-center justify-center sm:justify-end text-[#51071D] font-serif italic text-xs font-semibold">
                {isReseller
                  ? `${reseller?.resellerName || 'Authorized Partner'} (Seller Signature)`
                  : 'Deva Sarees (Authorized Signatory)'}
              </div>
              <p className="text-[10px] text-stone-400">
                Computer generated invoice. No physical signature required.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function InvoicePage() {
  return (
    <Suspense
      fallback={
        <div className="p-12 text-center text-stone-500 font-serif">Generating invoice...</div>
      }
    >
      <InvoiceContent />
    </Suspense>
  );
}
