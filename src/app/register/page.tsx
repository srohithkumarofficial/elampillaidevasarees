'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import { ArrowRight, ShieldCheck } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const { register, targetProductId } = useAuth();
  const [name, setName] = useState('Ananya Raman');
  const [email, setEmail] = useState('ananya.raman@example.com');
  const [phone, setPhone] = useState('+91 98401 99887');
  const [password, setPassword] = useState('••••••••');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    register(name, email, phone, password, targetProductId || undefined);
    if (!targetProductId) {
      router.push('/shop');
    }
  };

  return (
    <div className="bg-[#FAF7F2] min-h-screen py-16 px-4 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-2xl p-8 border border-[#E8E2D9] shadow-sm">
        <div className="text-center mb-6">
          <img
            src="/logo.png"
            alt="Deva Sarees"
            className="h-12 w-auto mx-auto object-contain mb-2"
          />
          <h1 className="font-serif text-2xl text-[#1F1916] mt-1 font-medium">Create Patron Account</h1>
          <p className="text-xs text-stone-500 mt-1">Unlock weaver-direct pricing and heirloom reservations</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-stone-600 mb-1">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-3.5 py-2.5 rounded-lg border border-[#E8E2D9] bg-[#FAF7F2] text-xs text-stone-800 focus:outline-none focus:border-[#51071D]"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-stone-600 mb-1">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3.5 py-2.5 rounded-lg border border-[#E8E2D9] bg-[#FAF7F2] text-xs text-stone-800 focus:outline-none focus:border-[#51071D]"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-stone-600 mb-1">Mobile Number (for BlueDart updates)</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="w-full px-3.5 py-2.5 rounded-lg border border-[#E8E2D9] bg-[#FAF7F2] text-xs text-stone-800 focus:outline-none focus:border-[#51071D]"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-stone-600 mb-1">Create Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3.5 py-2.5 rounded-lg border border-[#E8E2D9] bg-[#FAF7F2] text-xs text-stone-800 focus:outline-none focus:border-[#51071D]"
            />
          </div>

          <div className="bg-[#FAF2EB] rounded-lg p-3 text-[11px] text-stone-600 flex items-center gap-2 border border-[#E3D0BE]">
            <ShieldCheck className="w-4 h-4 text-[#51071D] shrink-0" />
            <span>Includes 10% welcome privilege credit on your first order.</span>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#51071D] text-white rounded-lg text-xs font-semibold uppercase tracking-wider hover:bg-[#6E1F32] flex items-center justify-center gap-2 transition-colors mt-2"
          >
            Register & Continue <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-stone-100 text-center text-xs text-stone-600">
          <span>Already registered? </span>
          <Link href="/login" className="text-[#51071D] font-semibold hover:underline">
            Sign In here
          </Link>
        </div>
      </div>
    </div>
  );
}
