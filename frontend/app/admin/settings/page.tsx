'use client';

import React, { useState } from 'react';
import {
  Settings,
  Save,
  KeyRound,
  RefreshCw,
  Phone,
  Mail,
  MapPin,
  Building,
  ShieldCheck,
} from 'lucide-react';
import { SITE, FOUNDER } from '@/lib/data';
import { useDemo } from '@/components/ui/DemoModal';

export default function AdminSettingsPage() {
  const { showPreview } = useDemo();
  const [siteName, setSiteName] = useState(SITE.name);
  const [phone, setPhone] = useState(SITE.phone);
  const [email, setEmail] = useState(SITE.email);
  const [address, setAddress] = useState(SITE.location);
  const [tagline, setTagline] = useState(SITE.tagline);

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Header */}
      <div>
        <h1
          className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1F1713]"
          style={{ fontFamily: 'var(--font-serif, "Playfair Display", serif)' }}
        >
          Studio & System Settings
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-[#786757]">
          Configure studio contact channels, footer information, business hours, and security keys.
        </p>
      </div>

      {/* General Settings Card */}
      <div className="rounded-2xl border border-[#DED4C5] bg-[#FAF7F2] p-6 shadow-xs space-y-6">
        <div className="border-b border-[#EAE1D3] pb-4 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-[#1F1713]">Business & Contact Details</h2>
            <p className="text-xs text-[#786757]">Updates the website header, footer, and inquiry routing.</p>
          </div>
          <Building size={20} className="text-[#C9A84C]" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#5C4D3E] mb-1.5">
              Studio Brand Name
            </label>
            <input
              type="text"
              value={siteName}
              onChange={(e) => setSiteName(e.target.value)}
              className="w-full rounded-xl border border-[#D5C9B8] bg-white px-3.5 py-2.5 text-xs text-[#1F1713] focus:border-[#C9A84C] focus:outline-none transition"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#5C4D3E] mb-1.5">
              Tagline / Subheading
            </label>
            <input
              type="text"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              className="w-full rounded-xl border border-[#D5C9B8] bg-white px-3.5 py-2.5 text-xs text-[#1F1713] focus:border-[#C9A84C] focus:outline-none transition"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#5C4D3E] mb-1.5 flex items-center gap-1.5">
              <Phone size={12} className="text-[#C9A84C]" />
              <span>Contact Phone / WhatsApp</span>
            </label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full rounded-xl border border-[#D5C9B8] bg-white px-3.5 py-2.5 text-xs text-[#1F1713] focus:border-[#C9A84C] focus:outline-none transition"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#5C4D3E] mb-1.5 flex items-center gap-1.5">
              <Mail size={12} className="text-[#C9A84C]" />
              <span>Inquiry Notification Email</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-[#D5C9B8] bg-white px-3.5 py-2.5 text-xs text-[#1F1713] focus:border-[#C9A84C] focus:outline-none transition"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#5C4D3E] mb-1.5 flex items-center gap-1.5">
              <MapPin size={12} className="text-[#C9A84C]" />
              <span>Studio Address & Location</span>
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full rounded-xl border border-[#D5C9B8] bg-white px-3.5 py-2.5 text-xs text-[#1F1713] focus:border-[#C9A84C] focus:outline-none transition"
            />
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            onClick={() =>
              showPreview(
                'Save Business Settings',
                'Updates the production database and invalidates edge CDN cache across all regional nodes.'
              )
            }
            className="inline-flex items-center gap-2 rounded-xl bg-[#1F1713] px-5 py-2.5 text-xs font-bold text-white shadow hover:bg-[#342721] transition"
          >
            <Save size={15} />
            <span>Save Settings</span>
          </button>
        </div>
      </div>

      {/* Security & Password Card */}
      <div className="rounded-2xl border border-[#DED4C5] bg-[#FAF7F2] p-6 shadow-xs space-y-6">
        <div className="border-b border-[#EAE1D3] pb-4 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-[#1F1713]">Admin Security & Password</h2>
            <p className="text-xs text-[#786757]">Update your master login password or review audit logs.</p>
          </div>
          <KeyRound size={20} className="text-[#C9A84C]" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#5C4D3E] mb-1.5">
              Current Password
            </label>
            <input
              type="password"
              placeholder="••••••••••••"
              className="w-full rounded-xl border border-[#D5C9B8] bg-white px-3.5 py-2.5 text-xs text-[#1F1713] focus:border-[#C9A84C] focus:outline-none transition"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#5C4D3E] mb-1.5">
              New Password
            </label>
            <input
              type="password"
              placeholder="••••••••••••"
              className="w-full rounded-xl border border-[#D5C9B8] bg-white px-3.5 py-2.5 text-xs text-[#1F1713] focus:border-[#C9A84C] focus:outline-none transition"
            />
          </div>
        </div>

        <div className="pt-2 flex items-center justify-between">
          <div className="text-[11px] text-[#7A6A5A] flex items-center gap-1.5">
            <ShieldCheck size={14} className="text-[#C9A84C]" />
            <span>Encrypted with bcrypt (12 rounds) in production</span>
          </div>

          <button
            onClick={() =>
              showPreview(
                'Change Admin Password',
                'Stores the new password hash securely with instant session revocation.'
              )
            }
            className="inline-flex items-center gap-2 rounded-xl border border-[#C9A84C] bg-white px-4 py-2 text-xs font-bold text-[#8C6D27] shadow-xs hover:bg-[#FAF7F2] transition"
          >
            <span>Update Password</span>
          </button>
        </div>
      </div>
    </div>
  );
}

