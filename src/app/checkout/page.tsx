'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { UserAddress, ResellerDetails } from '../../types';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, discount, shipping, total, appliedPromo, applyPromo, removePromo, createOrder } = useCart();
  const { user } = useAuth();

  // Order Type: 'direct_customer' | 'reseller'
  const [orderType, setOrderType] = useState<'direct_customer' | 'reseller'>('direct_customer');

  // Reseller Details state
  const [resellerDetails, setResellerDetails] = useState<ResellerDetails>({
    resellerName: 'Priya Sharma',
    businessName: 'Priya Fashion Boutique',
    phone: '+91 98401 55678',
    email: 'orders@priyafashion.in',
    city: 'Bengaluru',
    state: 'Karnataka',
    resellerPrice: total,
    customNote: 'Thank you for shopping with us! Please reach out on WhatsApp for any styling queries.',
  });

  // End Customer / Shipping Address state
  const [shippingAddress, setShippingAddress] = useState<UserAddress>({
    id: 'addr-client',
    fullName: 'Ananya Deshmukh',
    street: 'Flat 402, Royal Palms Apartments, 14th Main Road',
    landmark: 'Opposite Metro Station',
    city: 'Hyderabad',
    state: 'Telangana',
    pincode: '500034',
    phone: '+91 98765 43210',
    isDefault: true,
  });

  // Direct Customer default state
  const [directCustomerAddress, setDirectCustomerAddress] = useState<UserAddress>({
    id: 'addr-direct',
    fullName: user?.name || 'Priya Sundaram',
    street: 'No. 42, Rukmani Street, T. Nagar',
    landmark: 'Near Panagal Park',
    city: 'Chennai',
    state: 'Tamil Nadu',
    pincode: '600017',
    phone: user?.phone || '+91 98401 22345',
    isDefault: true,
  });

  // Payment method selection: 'upi' | 'card' | 'netbanking' | 'cod'
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking' | 'cod'>('upi');
  const [vpaId, setVpaId] = useState('priya@okhdfcbank');
  const [isProcessing, setIsProcessing] = useState(false);

  // Promo code
  const [promoInput, setPromoInput] = useState('');
  const [promoMsg, setPromoMsg] = useState('');

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (applyPromo(promoInput)) {
      setPromoMsg('Coupon applied successfully!');
    } else {
      setPromoMsg('Invalid coupon. Try HERITAGE10 for 10% off.');
    }
  };

  const handlePlaceOrder = () => {
    setIsProcessing(true);
    const chosenAddress = orderType === 'reseller' ? shippingAddress : directCustomerAddress;
    setTimeout(() => {
      const order = createOrder(
        paymentMethod,
        chosenAddress,
        orderType,
        orderType === 'reseller' ? resellerDetails : undefined
      );
      router.push(`/order-confirmation?orderId=${order.orderNumber}`);
    }, 800);
  };

  return (
    <div className="flex flex-col w-full bg-[#FAF7F2] min-h-screen">
      {/* Checkout Header */}
      <div className="w-full bg-white py-6 border-b border-stone-200">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex flex-col">
            <span className="text-xs font-bold uppercase tracking-widest text-[#8C6D3B]">
              Secured Checkout Atelier
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl text-stone-900 font-bold">
              Complete Your Saree Order
            </h1>
          </div>
          <div className="flex items-center gap-2 bg-[#FAF5EC] px-4 py-2 rounded-full border border-[#E8D5B5] self-start sm:self-auto">
            <span className="material-symbols-outlined text-[18px] text-[#51071D]">lock</span>
            <span className="text-xs font-semibold text-stone-700">
              256-Bit SSL Encrypted Vault
            </span>
          </div>
        </div>
      </div>

      {/* Main Checkout Container */}
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Order Type, Addresses, & Payment Form */}
          <section className="lg:col-span-8 space-y-6">
            {/* Step 1: Reseller or Direct Customer Selection */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xs border border-stone-200">
              <div className="flex items-center justify-between pb-4 border-b border-stone-100 mb-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-[#8C6D3B]">
                    Step 1
                  </span>
                  <h2 className="font-serif text-xl font-bold text-stone-900 mt-0.5">
                    Are You Ordering as a Customer or Reseller?
                  </h2>
                </div>
                <span className="material-symbols-outlined text-[24px] text-[#51071D]">
                  storefront
                </span>
              </div>

              {/* Selection Radio Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Option 1: Direct Customer */}
                <div
                  onClick={() => setOrderType('direct_customer')}
                  className={`p-5 rounded-xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                    orderType === 'direct_customer'
                      ? 'border-[#51071D] bg-[#FFFDF9] shadow-sm ring-1 ring-[#51071D]/20'
                      : 'border-stone-200 bg-white hover:border-stone-300'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2.5">
                        <input
                          type="radio"
                          name="order_type"
                          value="direct_customer"
                          checked={orderType === 'direct_customer'}
                          onChange={() => setOrderType('direct_customer')}
                          className="accent-[#51071D] h-4 w-4"
                        />
                        <span className="font-bold text-sm text-stone-900">
                          Direct Customer (Self / Family)
                        </span>
                      </div>
                      <span className="text-[10px] font-bold uppercase bg-stone-100 text-stone-700 px-2 py-0.5 rounded">
                        Standard
                      </span>
                    </div>
                    <p className="text-xs text-stone-500 pl-6 leading-relaxed">
                      Ordering for personal use or gifting. Official tax invoice will be issued by <strong>Deva Sarees</strong> directly to your name.
                    </p>
                  </div>
                </div>

                {/* Option 2: Reseller / Dropshipper */}
                <div
                  onClick={() => setOrderType('reseller')}
                  className={`p-5 rounded-xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                    orderType === 'reseller'
                      ? 'border-[#51071D] bg-[#FFFDF9] shadow-sm ring-1 ring-[#51071D]/20'
                      : 'border-stone-200 bg-white hover:border-stone-300'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2.5">
                        <input
                          type="radio"
                          name="order_type"
                          value="reseller"
                          checked={orderType === 'reseller'}
                          onChange={() => setOrderType('reseller')}
                          className="accent-[#51071D] h-4 w-4"
                        />
                        <span className="font-bold text-sm text-[#51071D]">
                          Reseller / Dropshipper
                        </span>
                      </div>
                      <span className="text-[10px] font-bold uppercase bg-[#51071D] text-white px-2 py-0.5 rounded shadow-2xs">
                        B2B Dropship
                      </span>
                    </div>
                    <p className="text-xs text-stone-600 pl-6 leading-relaxed">
                      We dispatch directly to your end customer. Printed invoice will feature <strong>YOUR business/brand name</strong> as the seller, with zero manufacturer pricing.
                    </p>
                  </div>
                </div>
              </div>

              {/* Informative Reseller Dropship Banner */}
              {orderType === 'reseller' && (
                <div className="mt-5 p-4 rounded-xl bg-[#FAF5EC] border border-[#E8D5B5] flex items-start gap-3 text-xs text-stone-700">
                  <span className="material-symbols-outlined text-[20px] text-[#51071D] shrink-0 mt-0.5">
                    verified
                  </span>
                  <div>
                    <span className="font-bold text-[#51071D] block">
                      100% White-Label Reseller Dispatch Guarantee
                    </span>
                    <p className="text-stone-600 mt-0.5 leading-relaxed">
                      Your customer will receive a professionally packaged saree box with a customized invoice displaying your boutique/brand name, contact details, and custom selling price.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Step 2: Address & Details Form */}
            {orderType === 'reseller' ? (
              /* Reseller Mode: 2-Part Form (Reseller Brand Details + End Customer Address) */
              <div className="space-y-6">
                {/* Part A: Reseller Business / Invoice Sender Details */}
                <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xs border border-stone-200">
                  <div className="flex items-center justify-between pb-4 border-b border-stone-100 mb-6">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-widest text-[#8C6D3B]">
                        Step 2A • Reseller Details
                      </span>
                      <h3 className="font-serif text-lg font-bold text-stone-900 mt-0.5">
                        Your Boutique / Brand Information (Prints on Invoice)
                      </h3>
                    </div>
                    <span className="material-symbols-outlined text-[22px] text-[#8C6D3B]">
                      badge
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <label className="font-bold text-stone-700 block mb-1.5">
                        Your Business / Brand Name *
                      </label>
                      <input
                        type="text"
                        value={resellerDetails.businessName}
                        onChange={(e) =>
                          setResellerDetails({ ...resellerDetails, businessName: e.target.value })
                        }
                        placeholder="e.g. Sri Lakshmi Boutiques, Priya Collections"
                        className="w-full p-3 bg-[#FAF5EC] border border-stone-300 rounded-lg text-stone-900 font-semibold focus:outline-none focus:border-[#51071D]"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-stone-700 block mb-1.5">
                        Reseller Contact Name *
                      </label>
                      <input
                        type="text"
                        value={resellerDetails.resellerName}
                        onChange={(e) =>
                          setResellerDetails({ ...resellerDetails, resellerName: e.target.value })
                        }
                        placeholder="e.g. Priya Sharma"
                        className="w-full p-3 bg-[#FAF5EC] border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:border-[#51071D]"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-stone-700 block mb-1.5">
                        Reseller Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        value={resellerDetails.phone}
                        onChange={(e) =>
                          setResellerDetails({ ...resellerDetails, phone: e.target.value })
                        }
                        placeholder="+91 98401 55678"
                        className="w-full p-3 bg-[#FAF5EC] border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:border-[#51071D]"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-stone-700 block mb-1.5">
                        Reseller Email (Optional)
                      </label>
                      <input
                        type="email"
                        value={resellerDetails.email || ''}
                        onChange={(e) =>
                          setResellerDetails({ ...resellerDetails, email: e.target.value })
                        }
                        placeholder="orders@priyaboutique.com"
                        className="w-full p-3 bg-[#FAF5EC] border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:border-[#51071D]"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-stone-700 block mb-1.5">
                        Reseller City / State (Billed From)
                      </label>
                      <input
                        type="text"
                        value={resellerDetails.city || ''}
                        onChange={(e) =>
                          setResellerDetails({ ...resellerDetails, city: e.target.value })
                        }
                        placeholder="e.g. Bengaluru, Karnataka"
                        className="w-full p-3 bg-[#FAF5EC] border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:border-[#51071D]"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-stone-700 block mb-1.5">
                        Your Selling Price to Customer (₹)
                      </label>
                      <input
                        type="number"
                        value={resellerDetails.resellerPrice || total}
                        onChange={(e) =>
                          setResellerDetails({
                            ...resellerDetails,
                            resellerPrice: Number(e.target.value),
                          })
                        }
                        placeholder={`Order Total: ₹${total}`}
                        className="w-full p-3 bg-[#FAF5EC] border border-stone-300 rounded-lg text-stone-900 font-bold focus:outline-none focus:border-[#51071D]"
                      />
                      <span className="text-[11px] text-stone-500 mt-1 block">
                        This custom amount will be printed on the customer invoice.
                      </span>
                    </div>
                  </div>
                </div>

                {/* Part B: End Customer Delivery Address */}
                <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xs border border-stone-200">
                  <div className="flex items-center justify-between pb-4 border-b border-stone-100 mb-6">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-widest text-[#8C6D3B]">
                        Step 2B • Customer Address
                      </span>
                      <h3 className="font-serif text-lg font-bold text-stone-900 mt-0.5">
                        End Customer Delivery Destination (Ship &amp; Bill To)
                      </h3>
                    </div>
                    <span className="material-symbols-outlined text-[22px] text-[#51071D]">
                      local_shipping
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <label className="font-bold text-stone-700 block mb-1.5">
                        Customer Full Name *
                      </label>
                      <input
                        type="text"
                        value={shippingAddress.fullName}
                        onChange={(e) =>
                          setShippingAddress({ ...shippingAddress, fullName: e.target.value })
                        }
                        placeholder="e.g. Ananya Deshmukh"
                        className="w-full p-3 bg-stone-50 border border-stone-300 rounded-lg text-stone-900 font-medium focus:outline-none focus:border-[#51071D]"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-stone-700 block mb-1.5">
                        Customer Mobile Number *
                      </label>
                      <input
                        type="tel"
                        value={shippingAddress.phone}
                        onChange={(e) =>
                          setShippingAddress({ ...shippingAddress, phone: e.target.value })
                        }
                        placeholder="+91 98765 43210"
                        className="w-full p-3 bg-stone-50 border border-stone-300 rounded-lg text-stone-900 font-medium focus:outline-none focus:border-[#51071D]"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="font-bold text-stone-700 block mb-1.5">
                        Flat / House No. / Building / Street Address *
                      </label>
                      <input
                        type="text"
                        value={shippingAddress.street}
                        onChange={(e) =>
                          setShippingAddress({ ...shippingAddress, street: e.target.value })
                        }
                        placeholder="e.g. Flat 402, Royal Palms Apartments, 14th Main Road"
                        className="w-full p-3 bg-stone-50 border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:border-[#51071D]"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-stone-700 block mb-1.5">
                        Area / Landmark (Optional)
                      </label>
                      <input
                        type="text"
                        value={shippingAddress.landmark || ''}
                        onChange={(e) =>
                          setShippingAddress({ ...shippingAddress, landmark: e.target.value })
                        }
                        placeholder="e.g. Opposite Metro Station"
                        className="w-full p-3 bg-stone-50 border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:border-[#51071D]"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-stone-700 block mb-1.5">City *</label>
                      <input
                        type="text"
                        value={shippingAddress.city}
                        onChange={(e) =>
                          setShippingAddress({ ...shippingAddress, city: e.target.value })
                        }
                        placeholder="e.g. Hyderabad"
                        className="w-full p-3 bg-stone-50 border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:border-[#51071D]"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-stone-700 block mb-1.5">State *</label>
                      <input
                        type="text"
                        value={shippingAddress.state}
                        onChange={(e) =>
                          setShippingAddress({ ...shippingAddress, state: e.target.value })
                        }
                        placeholder="e.g. Telangana"
                        className="w-full p-3 bg-stone-50 border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:border-[#51071D]"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-stone-700 block mb-1.5">
                        Postal Pincode *
                      </label>
                      <input
                        type="text"
                        value={shippingAddress.pincode}
                        onChange={(e) =>
                          setShippingAddress({ ...shippingAddress, pincode: e.target.value })
                        }
                        placeholder="e.g. 500034"
                        className="w-full p-3 bg-stone-50 border border-stone-300 rounded-lg text-stone-900 font-mono focus:outline-none focus:border-[#51071D]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* Direct Customer Mode: Customer Delivery Address Form */
              <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xs border border-stone-200">
                <div className="flex items-center justify-between pb-4 border-b border-stone-100 mb-6">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-[#8C6D3B]">
                      Step 2 • Delivery Address
                    </span>
                    <h3 className="font-serif text-lg font-bold text-stone-900 mt-0.5">
                      Shipping &amp; Delivery Destination
                    </h3>
                  </div>
                  <span className="material-symbols-outlined text-[22px] text-[#51071D]">
                    home_pin
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="font-bold text-stone-700 block mb-1.5">Full Name *</label>
                    <input
                      type="text"
                      value={directCustomerAddress.fullName}
                      onChange={(e) =>
                        setDirectCustomerAddress({
                          ...directCustomerAddress,
                          fullName: e.target.value,
                        })
                      }
                      placeholder="e.g. Priya Sundaram"
                      className="w-full p-3 bg-stone-50 border border-stone-300 rounded-lg text-stone-900 font-medium focus:outline-none focus:border-[#51071D]"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-stone-700 block mb-1.5">
                      Mobile Number *
                    </label>
                    <input
                      type="tel"
                      value={directCustomerAddress.phone}
                      onChange={(e) =>
                        setDirectCustomerAddress({
                          ...directCustomerAddress,
                          phone: e.target.value,
                        })
                      }
                      placeholder="+91 98401 22345"
                      className="w-full p-3 bg-stone-50 border border-stone-300 rounded-lg text-stone-900 font-medium focus:outline-none focus:border-[#51071D]"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="font-bold text-stone-700 block mb-1.5">
                      Flat / House No. / Building / Street Address *
                    </label>
                    <input
                      type="text"
                      value={directCustomerAddress.street}
                      onChange={(e) =>
                        setDirectCustomerAddress({
                          ...directCustomerAddress,
                          street: e.target.value,
                        })
                      }
                      placeholder="e.g. No. 42, Rukmani Street, T. Nagar"
                      className="w-full p-3 bg-stone-50 border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:border-[#51071D]"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-stone-700 block mb-1.5">
                      Area / Landmark (Optional)
                    </label>
                    <input
                      type="text"
                      value={directCustomerAddress.landmark || ''}
                      onChange={(e) =>
                        setDirectCustomerAddress({
                          ...directCustomerAddress,
                          landmark: e.target.value,
                        })
                      }
                      placeholder="e.g. Near Panagal Park"
                      className="w-full p-3 bg-stone-50 border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:border-[#51071D]"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-stone-700 block mb-1.5">City *</label>
                    <input
                      type="text"
                      value={directCustomerAddress.city}
                      onChange={(e) =>
                        setDirectCustomerAddress({
                          ...directCustomerAddress,
                          city: e.target.value,
                        })
                      }
                      placeholder="e.g. Chennai"
                      className="w-full p-3 bg-stone-50 border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:border-[#51071D]"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-stone-700 block mb-1.5">State *</label>
                    <input
                      type="text"
                      value={directCustomerAddress.state}
                      onChange={(e) =>
                        setDirectCustomerAddress({
                          ...directCustomerAddress,
                          state: e.target.value,
                        })
                      }
                      placeholder="e.g. Tamil Nadu"
                      className="w-full p-3 bg-stone-50 border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:border-[#51071D]"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-stone-700 block mb-1.5">
                      Postal Pincode *
                    </label>
                    <input
                      type="text"
                      value={directCustomerAddress.pincode}
                      onChange={(e) =>
                        setDirectCustomerAddress({
                          ...directCustomerAddress,
                          pincode: e.target.value,
                        })
                      }
                      placeholder="e.g. 600017"
                      className="w-full p-3 bg-stone-50 border border-stone-300 rounded-lg text-stone-900 font-mono focus:outline-none focus:border-[#51071D]"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Payment Method */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xs border border-stone-200">
              <div className="flex items-center justify-between pb-4 border-b border-stone-100 mb-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-[#8C6D3B]">
                    Step 3
                  </span>
                  <h3 className="font-serif text-lg font-bold text-stone-900 mt-0.5">
                    Select Payment Instrument
                  </h3>
                </div>
                <div className="flex items-center gap-1 text-xs text-stone-500">
                  <span className="material-symbols-outlined text-[16px] text-emerald-600">
                    verified_user
                  </span>
                  <span>Instant Settlement</span>
                </div>
              </div>

              {/* Payment Accordion Options */}
              <div className="space-y-3">
                {/* 1. UPI */}
                <div
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    paymentMethod === 'upi'
                      ? 'border-[#51071D] bg-[#FFFDF9]'
                      : 'border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="payment_method"
                      value="upi"
                      checked={paymentMethod === 'upi'}
                      onChange={() => setPaymentMethod('upi')}
                      className="mt-1 accent-[#51071D] h-4 w-4"
                    />
                    <div className="w-full">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm text-stone-900">Instant UPI</span>
                        <span className="text-[10px] font-bold uppercase bg-amber-100 text-amber-800 px-2 py-0.5 rounded">
                          Fastest
                        </span>
                      </div>
                      <p className="text-xs text-stone-500 mt-0.5">
                        Google Pay, PhonePe, Paytm, BHIM or any UPI App
                      </p>

                      {paymentMethod === 'upi' && (
                        <div className="mt-4 pt-4 border-t border-stone-200 grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="text-xs font-bold text-stone-700 block mb-1">
                              Enter UPI ID / VPA
                            </label>
                            <input
                              type="text"
                              value={vpaId}
                              onChange={(e) => setVpaId(e.target.value)}
                              placeholder="username@okhdfcbank"
                              className="w-full p-2.5 bg-white border border-stone-300 rounded-lg text-xs"
                            />
                          </div>
                          <div className="flex items-center gap-2 flex-wrap sm:self-end">
                            {['GPay', 'PhonePe', 'Paytm', 'BHIM'].map((app) => (
                              <span
                                key={app}
                                className="px-2.5 py-1 bg-stone-100 text-stone-700 text-xs font-semibold rounded border border-stone-200"
                              >
                                {app}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </label>
                </div>

                {/* 2. Cards */}
                <div
                  onClick={() => setPaymentMethod('card')}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    paymentMethod === 'card'
                      ? 'border-[#51071D] bg-[#FFFDF9]'
                      : 'border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="payment_method"
                      value="card"
                      checked={paymentMethod === 'card'}
                      onChange={() => setPaymentMethod('card')}
                      className="mt-1 accent-[#51071D] h-4 w-4"
                    />
                    <div className="w-full">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm text-stone-900">
                          Credit or Debit Card
                        </span>
                        <div className="flex gap-1 text-[10px] text-stone-500 font-bold">
                          <span>VISA</span> • <span>MASTERCARD</span> • <span>RUPAY</span>
                        </div>
                      </div>
                      <p className="text-xs text-stone-500 mt-0.5">
                        Zero surcharge on all domestic cards
                      </p>
                    </div>
                  </label>
                </div>

                {/* 3. Net Banking */}
                <div
                  onClick={() => setPaymentMethod('netbanking')}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    paymentMethod === 'netbanking'
                      ? 'border-[#51071D] bg-[#FFFDF9]'
                      : 'border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="payment_method"
                      value="netbanking"
                      checked={paymentMethod === 'netbanking'}
                      onChange={() => setPaymentMethod('netbanking')}
                      className="mt-1 accent-[#51071D] h-4 w-4"
                    />
                    <div className="w-full">
                      <span className="font-bold text-sm text-stone-900">Net Banking</span>
                      <p className="text-xs text-stone-500 mt-0.5">
                        All major banks supported (HDFC, SBI, ICICI, Axis)
                      </p>
                    </div>
                  </label>
                </div>

                {/* 4. Cash on Delivery */}
                <div
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    paymentMethod === 'cod'
                      ? 'border-[#51071D] bg-[#FFFDF9]'
                      : 'border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="payment_method"
                      value="cod"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                      className="mt-1 accent-[#51071D] h-4 w-4"
                    />
                    <div className="w-full">
                      <span className="font-bold text-sm text-stone-900">Cash on Delivery</span>
                      <p className="text-xs text-stone-500 mt-0.5">
                        Pay on delivery directly to courier partner
                      </p>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </section>

          {/* Right Column: Order Summary & Place Order Action */}
          <aside className="lg:col-span-4 space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xs border border-stone-200 sticky top-24">
              <span className="text-xs font-bold uppercase tracking-widest text-[#8C6D3B] block mb-1">
                Order Summary
              </span>
              <h3 className="font-serif text-xl font-bold text-stone-900 mb-4">
                Cart Items ({items.length})
              </h3>

              {/* Items Breakdown */}
              <div className="space-y-3 pb-4 divide-y divide-stone-100 max-h-64 overflow-y-auto">
                {items.map((item) => (
                  <div
                    key={`${item.product.id}-${item.selectedColor}`}
                    className="flex gap-3 pt-3 items-center"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-14 h-16 object-cover rounded-lg border border-stone-200 shrink-0"
                    />
                    <div className="flex-1 min-w-0 text-xs">
                      <h4 className="font-semibold text-stone-900 truncate">
                        {item.product.name}
                      </h4>
                      <p className="text-stone-500 text-[11px]">
                        Color: {item.selectedColor} • Qty: {item.quantity}
                      </p>
                      <p className="font-bold text-[#51071D] mt-0.5">
                        ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Coupon Applicator */}
              <div className="py-3 border-t border-stone-100">
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    placeholder="Enter coupon (HERITAGE10)"
                    className="flex-1 bg-stone-50 border border-stone-200 px-3 py-2 rounded-lg text-xs uppercase focus:outline-none focus:border-[#51071D]"
                  />
                  <button
                    type="submit"
                    className="bg-[#51071D] hover:bg-[#6E1F32] text-white px-4 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer"
                  >
                    Apply
                  </button>
                </form>
                {promoMsg && <p className="text-[11px] text-[#51071D] font-medium mt-1.5">{promoMsg}</p>}
              </div>

              {/* Price Calculation */}
              <div className="space-y-2 py-3 border-t border-stone-100 text-xs text-stone-600">
                <div className="flex justify-between">
                  <span>Gross Total</span>
                  <span>₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span>Express Insured Shipping</span>
                  <span className="text-emerald-700 font-bold">FREE</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-[#51071D] font-semibold">
                    <span>Discount ({appliedPromo})</span>
                    <span>-₹{discount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between text-base font-serif font-bold text-stone-900 pt-3 border-t border-stone-200">
                  <span>Total Payable:</span>
                  <span className="text-[#51071D]">₹{total.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Order Placement Action Button */}
              <button
                type="button"
                disabled={isProcessing}
                onClick={handlePlaceOrder}
                className="w-full mt-4 bg-[#51071D] hover:bg-[#6E1F32] text-white py-4 rounded-xl font-bold text-sm uppercase tracking-wider transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <span className="material-symbols-outlined text-[18px] animate-spin">
                      progress_activity
                    </span>
                    <span>Processing Order...</span>
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-[18px]">shopping_cart_checkout</span>
                    <span>
                      {orderType === 'reseller'
                        ? 'Place Reseller Order & Print Invoice'
                        : `Place Order (₹${total.toLocaleString('en-IN')})`}
                    </span>
                  </>
                )}
              </button>

              {/* Invoice Preview Note */}
              <div className="mt-4 p-3 rounded-lg bg-stone-50 border border-stone-200 text-center">
                <p className="text-[11px] text-stone-500">
                  {orderType === 'reseller' ? (
                    <span>
                      📄 Invoice will be generated in the name of <strong>{resellerDetails.businessName || 'Your Boutique'}</strong> to customer <strong>{shippingAddress.fullName}</strong>.
                    </span>
                  ) : (
                    <span>
                      📄 Tax invoice will be generated by <strong>Deva Sarees</strong>.
                    </span>
                  )}
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
