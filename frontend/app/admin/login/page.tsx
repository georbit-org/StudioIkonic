'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Lock, ArrowRight, ShieldCheck, Sparkles, Loader2, ArrowLeft, AlertCircle } from 'lucide-react';
import { useDemo } from '@/components/ui/DemoModal';

export default function AdminLoginPage() {
  const router = useRouter();
  const { showError } = useDemo();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    setTimeout(() => {
      setLoading(false);
      const msg = 'Wrong credentials. Direct authentication is disabled in this preview version.';
      setErrorMessage(msg);
      showError(msg, 'Wrong Credentials');
    }, 850);
  };

  return (
    <div className="min-h-screen bg-[#F6F1EA] text-[#1F1713] flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background aesthetics */}
      <div className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(#C9A84C_1px,transparent_1px)] [background-size:24px_24px]" />
      
      {/* Top back button */}
      <div className="absolute top-6 left-6 z-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#6B5A49] hover:text-[#1F1713] transition-colors bg-white/70 backdrop-blur-sm px-3.5 py-2 rounded-lg border border-[#C9A84C]/20 shadow-sm"
        >
          <ArrowLeft size={14} /> Back to Website
        </Link>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4">
        {/* Logo / Brand Header */}
        <div className="text-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo_transparent.png"
            alt="Iconic Design"
            className="mx-auto h-12 w-auto mb-3"
          />
          <h2
            className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1F1713]"
            style={{ fontFamily: 'var(--font-serif, "Playfair Display", serif)' }}
          >
            Admin Management Portal
          </h2>
          <p className="mt-2 text-sm text-[#736353]">
            Studio Ikonic Content & Portfolio Administration
          </p>
        </div>

        {/* Main Card */}
        <div className="mt-8 bg-[#FAF7F2] py-8 px-6 sm:px-10 shadow-[0_16px_50px_rgba(26,20,16,0.08)] rounded-3xl border border-[#C9A84C]/25">
          {errorMessage && (
            <div className="mb-6 rounded-xl border border-red-200 bg-red-50/90 p-3.5 text-xs text-red-700 flex items-start gap-2.5">
              <AlertCircle size={16} className="mt-0.5 shrink-0 text-red-600" />
              <div>
                <p className="font-semibold">Authentication Notice</p>
                <p className="mt-0.5">{errorMessage}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#5C4D3E] mb-1.5">
                Username / Email
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin@iconicdesign.in"
                className="w-full rounded-xl border border-[#D5C9B8] bg-white px-4 py-2.5 text-sm text-[#1F1713] placeholder-[#A89886] focus:border-[#C9A84C] focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/20 transition"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#5C4D3E] mb-1.5">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full rounded-xl border border-[#D5C9B8] bg-white px-4 py-2.5 text-sm text-[#1F1713] placeholder-[#A89886] focus:border-[#C9A84C] focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/20 transition"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#1F1713] px-4 py-3 text-sm font-semibold text-white shadow-md hover:bg-[#342721] transition disabled:opacity-70 cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 size={16} className="animate-spin text-[#C9A84C]" />
                    <span>Verifying Credentials...</span>
                  </>
                ) : (
                  <>
                    <Lock size={15} />
                    <span>Sign In to Admin</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Divider */}
          <div className="mt-8 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#DED4C5]" />
            </div>
            <div className="relative flex justify-center text-xs uppercase tracking-widest font-semibold">
              <span className="bg-[#FAF7F2] px-3 text-[#8A7968]">
                Instant Client Access
              </span>
            </div>
          </div>

          {/* Preview as Admin Button */}
          <div className="mt-6">
            <Link
              href="/admin"
              className="w-full flex items-center justify-center gap-2.5 rounded-xl border-2 border-[#C9A84C] bg-gradient-to-r from-[#C9A84C]/15 to-[#FAF7F2] px-5 py-3.5 text-sm font-bold text-[#6F5218] shadow-sm hover:bg-[#C9A84C]/25 hover:border-[#B59239] transition-all group"
            >
              <Sparkles size={18} className="text-[#A67C2E] group-hover:scale-110 transition-transform" />
              <span>Preview as Admin</span>
              <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Demo disclaimer badge */}
          <div className="mt-6 rounded-xl bg-[#EFE9DF]/70 p-3 text-center border border-[#E3D9C9]">
            <p className="text-[11px] leading-relaxed text-[#736353]">
              <ShieldCheck size={14} className="inline mr-1 text-[#C9A84C]" />
              <strong>Interactive Demo:</strong> Live databases & password verification are disabled for security. Click <strong>Preview as Admin</strong> to explore the full dashboard, leads, and portfolio controls.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

