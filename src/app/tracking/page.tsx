'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useCart } from '../../context/CartContext';
import { Truck, CheckCircle2, Clock, MapPin, Package, Phone, ArrowLeft, ShieldCheck, ExternalLink } from 'lucide-react';

function TrackingContent() {
  const searchParams = useSearchParams();
  const initialOrderId = searchParams.get('orderId') || 'EDS-2026-89421';
  const { orders } = useCart();

  const [inputOrderNumber, setInputOrderNumber] = useState(initialOrderId);
  const activeOrder = orders.find((o) => o.orderNumber.toLowerCase() === inputOrderNumber.trim().toLowerCase()) || orders[0];

  const steps = [
    {
      id: 'step-1',
      title: 'Order Confirmed & Atelier Assigned',
      desc: 'Salem master weaver cooperative allocated your handloom piece for order preparation.',
      time: '24 Sep, 11:30 AM',
      done: true,
      current: false,
    },
    {
      id: 'step-2',
      title: 'Handloom Quality Inspection & Zari Verification',
      desc: 'Passed rigorous warp, weft, and pure silver-dipped zari quality calibration.',
      time: '24 Sep, 03:45 PM',
      done: true,
      current: false,
    },
    {
      id: 'step-3',
      title: 'Silk Mark Certification & Tamper-Evident Packaging',
      desc: 'Affixed GI registry tag and sealed in handcrafted moisture-shielded ceremonial box.',
      time: '24 Sep, 06:15 PM',
      done: true,
      current: true,
    },
    {
      id: 'step-4',
      title: 'Handed to BlueDart Express Air Courier',
      desc: 'Consignment AWB #7890432165 booked for overnight priority transit.',
      time: 'Expected Tomorrow, 09:00 AM',
      done: false,
      current: false,
    },
    {
      id: 'step-5',
      title: 'Delivered to Doorstep',
      desc: `Direct handover at ${activeOrder.shippingAddress.city}, ${activeOrder.shippingAddress.state}.`,
      time: 'Expected 26 Sep',
      done: false,
      current: false,
    },
  ];

  return (
    <div className="bg-[#FAF7F2] min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-stone-500 mb-6">
          <Link href="/" className="hover:text-[#51071D] flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Atelier
          </Link>
          <span>/</span>
          <span>Order Consignment Tracking</span>
        </div>

        {/* Search / Status Top Banner */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-[#E8E2D9] mb-8">
          <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 pb-6 border-b border-stone-100">
            <div>
              <span className="text-[11px] uppercase tracking-widest text-[#C5A059] font-semibold">
                Live Consignment Telemetry
              </span>
              <h1 className="font-serif text-2xl sm:text-3xl text-[#1F1916] mt-1 font-medium">
                Tracking Order #{activeOrder.orderNumber}
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={inputOrderNumber}
                onChange={(e) => setInputOrderNumber(e.target.value)}
                placeholder="Enter Order # (e.g. EDS-2026-89421)"
                className="px-3.5 py-2 border border-[#E8E2D9] rounded-lg text-xs bg-[#FAF7F2] focus:outline-none focus:border-[#51071D] font-mono"
              />
              <button
                type="button"
                className="px-4 py-2 bg-[#51071D] text-white rounded-lg text-xs font-medium hover:bg-[#6E1F32]"
              >
                Track
              </button>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6">
            <div>
              <p className="text-xs text-stone-400">Status</p>
              <p className="text-xs sm:text-sm font-semibold text-[#51071D] mt-0.5 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                In Atelier Prep
              </p>
            </div>
            <div>
              <p className="text-xs text-stone-400">Carrier</p>
              <p className="text-xs sm:text-sm font-semibold text-stone-800 mt-0.5">BlueDart Express Air</p>
            </div>
            <div>
              <p className="text-xs text-stone-400">AWB Number</p>
              <p className="text-xs sm:text-sm font-mono font-medium text-stone-800 mt-0.5">BD-982143098</p>
            </div>
            <div>
              <p className="text-xs text-stone-400">Estimated Delivery</p>
              <p className="text-xs sm:text-sm font-semibold text-[#1F1916] mt-0.5">Sep 26, 2026</p>
            </div>
          </div>
        </div>

        {/* Timeline & Details Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Tracking Timeline Column */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-[#E8E2D9]">
            <h2 className="font-serif text-lg text-[#1F1916] font-medium mb-6 flex items-center gap-2">
              <Truck className="w-4 h-4 text-[#51071D]" /> Dispatch & Transit Log
            </h2>

            <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-2.5 sm:before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#E8E2D9]">
              {steps.map((st, i) => (
                <div key={st.id} className="relative">
                  <div
                    className={`absolute -left-[27px] sm:-left-[35px] top-1 w-6 h-6 rounded-full flex items-center justify-center border-2 ${
                      st.done
                        ? 'bg-[#51071D] border-[#51071D] text-white'
                        : st.current
                        ? 'bg-white border-[#51071D] text-[#51071D]'
                        : 'bg-white border-stone-300 text-stone-300'
                    }`}
                  >
                    {st.done ? (
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    ) : st.current ? (
                      <span className="w-2 h-2 rounded-full bg-[#51071D] animate-ping" />
                    ) : (
                      <Clock className="w-3 h-3" />
                    )}
                  </div>
                  <div>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <h3
                        className={`text-sm font-semibold ${
                          st.current ? 'text-[#51071D]' : st.done ? 'text-stone-900' : 'text-stone-400'
                        }`}
                      >
                        {st.title}
                      </h3>
                      <span className="text-[11px] font-mono text-stone-400">{st.time}</span>
                    </div>
                    <p className="text-xs text-stone-600 mt-1 leading-relaxed">{st.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery Destination & Support Column */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#E8E2D9]">
              <h3 className="font-serif text-sm text-[#1F1916] font-semibold mb-4 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#C5A059]" /> Delivery Destination
              </h3>
              <div className="text-xs text-stone-600 space-y-1">
                <p className="font-semibold text-stone-800">{activeOrder.shippingAddress.fullName}</p>
                <p>{activeOrder.shippingAddress.street}</p>
                {activeOrder.shippingAddress.landmark && <p className="text-stone-400">Landmark: {activeOrder.shippingAddress.landmark}</p>}
                <p>
                  {activeOrder.shippingAddress.city}, {activeOrder.shippingAddress.state} - {activeOrder.shippingAddress.pincode}
                </p>
                <p className="pt-2 text-stone-500">Contact: {activeOrder.shippingAddress.phone}</p>
              </div>
            </div>

            <div className="bg-[#FAF2EB] rounded-2xl p-6 border border-[#E3D0BE]">
              <h3 className="font-serif text-sm text-[#51071D] font-semibold mb-2 flex items-center gap-1.5">
                <Phone className="w-4 h-4" /> Concierge Dispatch Support
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed mb-4">
                Need to reschedule delivery or add gate instructions for the BlueDart courier?
              </p>
              <a
                href="tel:+914272445890"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#51071D] hover:underline"
              >
                Call Elampillai Atelier Concierge (+91 427 244 5890)
              </a>
            </div>

            <div className="text-center">
              <Link
                href={`/invoice?orderId=${activeOrder.orderNumber}`}
                className="inline-flex items-center gap-1.5 text-xs text-stone-500 hover:text-[#51071D]"
              >
                <ExternalLink className="w-3.5 h-3.5" /> View Printable Tax Invoice
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TrackingPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-stone-500 font-serif">Loading tracking info...</div>}>
      <TrackingContent />
    </Suspense>
  );
}
