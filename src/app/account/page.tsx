'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { User, Package, MapPin, Award, LogOut, Plus, Edit2, Trash2, ExternalLink, Printer, Truck, ArrowRight } from 'lucide-react';

export default function AccountPage() {
  const router = useRouter();
  const { user, isAuthenticated, logout, openAuthGate } = useAuth();
  const { orders } = useCart();

  const [activeTab, setActiveTab] = useState<'orders' | 'addresses' | 'profile' | 'lineage'>('orders');

  if (!isAuthenticated || !user) {
    return (
      <div className="bg-[#FAF7F2] min-h-screen py-16 px-4 text-center">
        <div className="max-w-md mx-auto bg-white p-8 rounded-2xl border border-[#E8E2D9] shadow-sm">
          <div className="w-16 h-16 bg-[#51071D]/10 rounded-full flex items-center justify-center mx-auto mb-4 text-[#51071D]">
            <User className="w-8 h-8" />
          </div>
          <h1 className="font-serif text-2xl text-[#1F1916] mb-2">Atelier Account Access</h1>
          <p className="text-xs text-stone-500 mb-6 leading-relaxed">
            Sign in to view your bespoke saree orders, consignment dispatches, saved addresses, and master weaver lineage.
          </p>
          <button
            onClick={() => openAuthGate()}
            className="w-full py-3 bg-[#51071D] text-white rounded-lg text-xs font-semibold uppercase tracking-wider hover:bg-[#6E1F32]"
          >
            Sign In / Register
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FAF7F2] min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* User Hero Banner */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-[#E8E2D9] mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-[#51071D] text-white flex items-center justify-center font-serif text-2xl font-bold border-2 border-[#C5A059]">
              {user.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif text-2xl text-[#1F1916] font-medium">{user.name}</h1>
                <span className="bg-[#C5A059]/20 text-[#8F7035] text-[10px] font-semibold px-2 py-0.5 rounded uppercase tracking-wider">
                  Patron Member
                </span>
              </div>
              <p className="text-xs text-stone-500 mt-0.5">{user.email} • {user.phone}</p>
            </div>
          </div>

          <button
            onClick={() => {
              logout();
              router.push('/');
            }}
            className="inline-flex items-center gap-2 px-4 py-2 border border-[#E8E2D9] rounded-lg text-xs font-medium text-stone-600 hover:text-[#51071D] hover:border-[#51071D] transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" /> Sign Out
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 border-b border-[#E8E2D9] mb-8 overflow-x-auto pb-px">
          <button
            onClick={() => setActiveTab('orders')}
            className={`flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'orders'
                ? 'border-[#51071D] text-[#51071D] font-semibold'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <Package className="w-4 h-4" /> Order History ({orders.length})
          </button>
          <button
            onClick={() => setActiveTab('addresses')}
            className={`flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'addresses'
                ? 'border-[#51071D] text-[#51071D] font-semibold'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <MapPin className="w-4 h-4" /> Saved Addresses ({user.addresses.length})
          </button>
          <button
            onClick={() => setActiveTab('lineage')}
            className={`flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'lineage'
                ? 'border-[#51071D] text-[#51071D] font-semibold'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <Award className="w-4 h-4" /> Artisan Lineage & Certificates
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'profile'
                ? 'border-[#51071D] text-[#51071D] font-semibold'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <User className="w-4 h-4" /> Profile Preferences
          </button>
        </div>

        {/* Tab 1: Orders */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            {orders.map((ord) => (
              <div key={ord.id} className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-[#E8E2D9]">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center pb-6 border-b border-stone-100 gap-4">
                  <div>
                    <span className="text-[11px] text-stone-400 font-mono uppercase tracking-wider">
                      Order Reference
                    </span>
                    <p className="font-serif text-lg text-[#1F1916] font-bold">{ord.orderNumber}</p>
                    <p className="text-xs text-stone-500 mt-0.5">Placed on {ord.orderDate}</p>
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                      {ord.status.toUpperCase()}
                    </span>
                    <Link
                      href={`/tracking?orderId=${ord.orderNumber}`}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#FAF7F2] border border-[#E8E2D9] rounded-lg text-xs font-medium text-stone-700 hover:text-[#51071D] hover:border-[#51071D]"
                    >
                      <Truck className="w-3.5 h-3.5" /> Track Consignment
                    </Link>
                    <Link
                      href={`/invoice?orderId=${ord.orderNumber}`}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#FAF7F2] border border-[#E8E2D9] rounded-lg text-xs font-medium text-stone-700 hover:text-[#51071D] hover:border-[#51071D]"
                    >
                      <Printer className="w-3.5 h-3.5" /> Tax Invoice
                    </Link>
                  </div>
                </div>

                <div className="py-4 divide-y divide-stone-100">
                  {ord.items.map((item, idx) => (
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
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-stone-100 flex justify-between items-center text-xs text-stone-600">
                  <span>Delivered to: {ord.shippingAddress.city}, {ord.shippingAddress.state}</span>
                  <span className="font-serif text-base font-bold text-[#51071D]">
                    Total: ₹{ord.total.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Addresses */}
        {activeTab === 'addresses' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {user.addresses.map((addr) => (
              <div key={addr.id} className="bg-white rounded-2xl p-6 shadow-sm border border-[#E8E2D9] relative">
                {addr.isDefault && (
                  <span className="absolute top-6 right-6 bg-[#C5A059]/20 text-[#8F7035] text-[10px] font-semibold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                    Default Address
                  </span>
                )}
                <h3 className="font-serif text-base font-semibold text-[#1F1916] mb-2">{addr.fullName}</h3>
                <p className="text-xs text-stone-600 leading-relaxed mb-4">
                  {addr.street}
                  {addr.landmark && <><br /><span className="text-stone-400">Landmark: {addr.landmark}</span></>}
                  <br />
                  {addr.city}, {addr.state} - {addr.pincode}
                  <br />
                  Phone: {addr.phone}
                </p>

                <div className="flex items-center gap-3 pt-4 border-t border-stone-100 text-xs">
                  <button className="text-stone-600 hover:text-[#51071D] inline-flex items-center gap-1 font-medium">
                    <Edit2 className="w-3 h-3" /> Edit
                  </button>
                  <span className="text-stone-300">|</span>
                  <button className="text-rose-600 hover:text-rose-800 inline-flex items-center gap-1 font-medium">
                    <Trash2 className="w-3 h-3" /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Lineage & Certificates */}
        {activeTab === 'lineage' && (
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-[#E8E2D9] space-y-6">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#C5A059] font-semibold">
                Deva Family Lineage Since 1948
              </span>
              <h2 className="font-serif text-2xl text-[#1F1916] font-medium mt-1">
                Salem & Elampillai Handloom Registry
              </h2>
            </div>
            <p className="text-stone-600 text-sm leading-relaxed max-w-3xl">
              Elampillai Deva Sarees operates 120 pit-looms and jacquard shuttle frames across Salem and Elampillai weaving hamlets. All silk sourced is unadulterated mulberry cocoon filament reeled in Dharmapuri and twisted in Coimbatore.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
              <div className="p-4 bg-[#FAF7F2] rounded-xl border border-[#E8E2D9]">
                <p className="font-serif font-bold text-lg text-[#51071D]">Silk Mark #SM-9482</p>
                <p className="text-xs text-stone-500 mt-1">Verified pure natural silk certification issued by Silk Mark Organisation of India.</p>
              </div>
              <div className="p-4 bg-[#FAF7F2] rounded-xl border border-[#E8E2D9]">
                <p className="font-serif font-bold text-lg text-[#51071D]">GI Registry #142</p>
                <p className="text-xs text-stone-500 mt-1">Geographical Indication certified authentic traditional Salem handloom cluster provenance.</p>
              </div>
              <div className="p-4 bg-[#FAF7F2] rounded-xl border border-[#E8E2D9]">
                <p className="font-serif font-bold text-lg text-[#51071D]">Zero-Carbon Weave</p>
                <p className="text-xs text-stone-500 mt-1">100% manual foot-pedal pit-loom operations powered purely by master artisan human artistry.</p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Profile */}
        {activeTab === 'profile' && (
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-[#E8E2D9] max-w-xl">
            <h2 className="font-serif text-xl text-[#1F1916] font-medium mb-6">Personal Details</h2>
            <div className="space-y-4 text-xs sm:text-sm">
              <div>
                <label className="block text-stone-500 text-xs mb-1">Full Name</label>
                <input
                  type="text"
                  defaultValue={user.name}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#E8E2D9] bg-[#FAF7F2] text-stone-800"
                />
              </div>
              <div>
                <label className="block text-stone-500 text-xs mb-1">Email Address</label>
                <input
                  type="email"
                  defaultValue={user.email}
                  disabled
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#E8E2D9] bg-stone-100 text-stone-500 cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block text-stone-500 text-xs mb-1">Phone Number</label>
                <input
                  type="tel"
                  defaultValue={user.phone}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#E8E2D9] bg-[#FAF7F2] text-stone-800"
                />
              </div>
              <button
                type="button"
                className="mt-4 px-6 py-2.5 bg-[#51071D] text-white rounded-lg text-xs font-semibold hover:bg-[#6E1F32]"
              >
                Save Changes
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
