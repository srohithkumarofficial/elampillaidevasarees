'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import { ShieldCheck, ArrowRight, User } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { login, targetProductId } = useAuth();
  const [email, setEmail] = useState('priya.sundaram@example.com');
  const [password, setPassword] = useState('••••••••');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, password, targetProductId || undefined);
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
          <h1 className="font-serif text-2xl text-[#1F1916] mt-1 font-medium">Patron Sign In</h1>
          <p className="text-xs text-stone-500 mt-1">Access curated handlooms and order tracking</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
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
            <label className="block text-xs font-medium text-stone-600 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3.5 py-2.5 rounded-lg border border-[#E8E2D9] bg-[#FAF7F2] text-xs text-stone-800 focus:outline-none focus:border-[#51071D]"
            />
          </div>

          <div className="flex justify-between items-center text-xs">
            <label className="flex items-center gap-1.5 text-stone-600">
              <input type="checkbox" defaultChecked className="rounded accent-[#51071D]" /> Remember atelier login
            </label>
            <span className="text-[#51071D] hover:underline cursor-pointer">Forgot passcode?</span>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#51071D] text-white rounded-lg text-xs font-semibold uppercase tracking-wider hover:bg-[#6E1F32] flex items-center justify-center gap-2 transition-colors mt-2"
          >
            Sign In to Atelier <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-stone-100 text-center text-xs text-stone-600">
          <span>New to Deva Sarees? </span>
          <Link href="/register" className="text-[#51071D] font-semibold hover:underline">
            Create Patron Account
          </Link>
        </div>
      </div>
    </div>
  );
}
