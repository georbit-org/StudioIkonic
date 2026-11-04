'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  FolderKanban,
  MessageSquareQuote,
  Inbox,
  Settings,
  ExternalLink,
  Sparkles,
  Menu,
  X,
  LogOut,
  ShieldAlert,
} from 'lucide-react';
import { useDemo } from '@/components/ui/DemoModal';

const NAV_ITEMS = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Projects', href: '/admin/projects', icon: FolderKanban },
  { label: 'Testimonials', href: '/admin/testimonials', icon: MessageSquareQuote },
  { label: 'Leads & Inquiries', href: '/admin/leads', icon: Inbox },
  { label: 'Site Settings', href: '/admin/settings', icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { showPreview } = useDemo();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // If this is the login page, don't wrap it in the admin shell
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-[#F4EFE6] text-[#1F1713] flex flex-col md:flex-row">
      {/* ── Desktop Sidebar ── */}
      <aside className="hidden md:flex md:w-64 flex-col justify-between border-r border-[#DED4C5] bg-[#FAF7F2] p-6 shadow-sm shrink-0">
        <div>
          {/* Logo / Title */}
          <div className="mb-8 flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo_transparent.png" alt="Iconic Design" className="h-9 w-auto" />
            <div>
              <div className="text-sm font-bold tracking-tight text-[#1F1713]">Iconic Admin</div>
              <div className="text-[10px] font-semibold uppercase tracking-widest text-[#C9A84C]">Studio Control</div>
            </div>
          </div>

          {/* Nav links */}
          <nav className="space-y-1.5">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-xs font-semibold tracking-wide transition ${
                    isActive
                      ? 'bg-[#1F1713] text-white shadow-sm'
                      : 'text-[#635343] hover:bg-[#EFE8DD] hover:text-[#1F1713]'
                  }`}
                >
                  <Icon size={17} className={isActive ? 'text-[#C9A84C]' : 'text-[#8C7B6B]'} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="space-y-3 pt-6 border-t border-[#E7DDCE]">
          <button
            onClick={() => showPreview('Database Backup / Export')}
            className="w-full flex items-center justify-between rounded-xl bg-[#EFE9DF] px-3.5 py-2 text-xs font-semibold text-[#665444] hover:bg-[#E4DCCE] transition"
          >
            <span className="flex items-center gap-2">
              <ShieldAlert size={14} className="text-[#C9A84C]" />
              <span>Database Sync</span>
            </span>
            <span className="text-[10px] bg-white/70 px-1.5 py-0.5 rounded text-[#8A7968]">SANDBOX</span>
          </button>

          <Link
            href="/"
            className="flex items-center justify-center gap-2 rounded-xl border border-[#D5C9B8] px-3.5 py-2 text-xs font-semibold text-[#5A4B3D] hover:bg-white hover:text-[#1F1713] transition"
          >
            <ExternalLink size={14} />
            <span>View Live Site</span>
          </Link>
        </div>
      </aside>

      {/* ── Main Content Area ── */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header Bar */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-[#DED4C5] bg-[#FAF7F2]/95 backdrop-blur-md px-4 sm:px-8">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-[#635343] hover:bg-[#EFE8DD]"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            {/* Preview Banner Pill */}
            <div className="inline-flex items-center gap-2 rounded-full border border-[#C9A84C]/50 bg-[#C9A84C]/15 px-3.5 py-1 text-xs font-bold text-[#7E5E1C] shadow-sm">
              <Sparkles size={14} className="text-[#A67C2E] animate-pulse" />
              <span>PREVIEW MODE • Interactive Client Demo</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-[#6E5D4E] hover:text-[#1F1713] transition px-3 py-1.5 rounded-lg border border-[#DED4C5] bg-white shadow-xs"
            >
              <LogOut size={13} />
              <span>Exit Preview</span>
            </Link>
          </div>
        </header>

        {/* Mobile Dropdown Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-[#DED4C5] bg-[#FAF7F2] p-4 space-y-1.5">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-xs font-semibold tracking-wide transition ${
                    isActive
                      ? 'bg-[#1F1713] text-white shadow-sm'
                      : 'text-[#635343] hover:bg-[#EFE8DD] hover:text-[#1F1713]'
                  }`}
                >
                  <Icon size={17} className={isActive ? 'text-[#C9A84C]' : 'text-[#8C7B6B]'} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
            <div className="pt-2 border-t border-[#E7DDCE]">
              <Link
                href="/"
                className="flex items-center justify-center gap-2 rounded-xl border border-[#D5C9B8] px-3.5 py-2 text-xs font-semibold text-[#5A4B3D] hover:bg-white"
              >
                <LogOut size={14} />
                <span>Exit Preview to Website</span>
              </Link>
            </div>
          </div>
        )}

        {/* Page Inner Content */}
        <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

