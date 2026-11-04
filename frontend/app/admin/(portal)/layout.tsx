'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  FolderKanban,
  MessageSquareQuote,
  Inbox,
  Settings,
  ExternalLink,
  LogOut,
  RotateCcw,
  Sparkles,
  Menu,
  X,
} from 'lucide-react';
import { useMockDb } from '@/lib/mock/store';
import { useFeedback } from '@/lib/mock/feedback';
import { api } from '@/lib/client/api';

const ADMIN_LINKS = [
  { label: 'Dashboard & Projects', href: '/admin', icon: LayoutDashboard },
  { label: 'Client Inquiries', href: '/admin/leads', icon: Inbox },
  { label: 'Testimonials', href: '/admin/testimonials', icon: MessageSquareQuote },
  { label: 'Site Settings', href: '/admin/settings', icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { resetDb } = useMockDb();
  const { toast, confirm } = useFeedback();
  const [authorized, setAuthorized] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // If this is the login page, don't wrap with admin navbar/shell
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  useEffect(() => {
    const session = sessionStorage.getItem('demo_admin_session');
    if (!session) {
      router.replace('/admin/login');
    } else {
      setAuthorized(true);
    }
  }, [pathname, router]);

  const handleLogout = async () => {
    try {
      await api.post('/api/admin/logout');
    } catch {
      // ignore
    }
    sessionStorage.removeItem('demo_admin_session');
    toast('Logged out of Admin Portal', 'info');
    router.push('/admin/login');
  };

  const handleResetData = () => {
    confirm({
      title: 'Reset Demo Data to Initial Seed?',
      message: 'This will restore all projects, reviews, inquiries, and settings back to default factory state.',
      confirmText: 'Reset State',
      onConfirm: async () => {
        try {
          await api.post('/api/admin/reset');
        } catch {
          // ignore
        }
        resetDb();
        toast('Demo database reset to factory state', 'success');
        window.location.reload();
      },
    });
  };

  if (!authorized) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fafafa' }}>
        <div style={{ textAlign: 'center', color: '#64748b', fontSize: '0.9rem' }}>
          Checking administrator authorization...
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#fafafa', display: 'flex', flexDirection: 'column', fontFamily: "'Poppins', sans-serif" }}>
      {/* ── Top Header matching original Flask base.html ── */}
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          backgroundColor: 'rgba(235, 222, 202, 0.96)',
          backdropFilter: 'blur(20px)',
          borderBottom: '3px solid #d4af37',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)',
        }}
      >
        <div
          style={{
            maxWidth: '1240px',
            margin: '0 auto',
            padding: '0.85rem 1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Brand Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Link href="/admin" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo_transparent.png"
                alt="Iconic Design"
                style={{ height: '38px', width: 'auto' }}
              />
            </Link>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                backgroundColor: 'rgba(212, 175, 55, 0.18)',
                border: '1px solid #d4af37',
                padding: '0.2rem 0.6rem',
                borderRadius: '9999px',
                fontSize: '0.68rem',
                fontWeight: 700,
                color: '#856404',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
              <Sparkles size={11} />
              <span>Admin Preview</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="admin-desktop-nav" style={{ alignItems: 'center', gap: '1.5rem' }}>
            {ADMIN_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    fontSize: '0.86rem',
                    fontWeight: isActive ? 700 : 500,
                    color: isActive ? '#0f1e3c' : '#475569',
                    textDecoration: 'none',
                    padding: '0.4rem 0.6rem',
                    borderBottom: isActive ? '2px solid #0f1e3c' : '2px solid transparent',
                    transition: 'all 0.2s',
                  }}
                >
                  <link.icon size={15} color={isActive ? '#d4af37' : '#94a3b8'} />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right utility buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <button
              onClick={handleResetData}
              title="Reset state to initial seed data"
              className="admin-utility-btn"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.45rem 0.75rem',
                borderRadius: '6px',
                backgroundColor: '#ffffff',
                border: '1px solid #cbd5e1',
                color: '#475569',
                fontSize: '0.78rem',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              <RotateCcw size={13} />
              <span className="hidden sm:inline">Reset</span>
            </button>

            <Link
              href="/"
              target="_blank"
              title="Open public website in new tab"
              className="admin-utility-btn"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                padding: '0.45rem 0.75rem',
                borderRadius: '6px',
                backgroundColor: '#ffffff',
                border: '1px solid #cbd5e1',
                color: '#0f1e3c',
                fontSize: '0.78rem',
                fontWeight: 600,
                textDecoration: 'none',
              }}
            >
              <ExternalLink size={13} />
              <span className="hidden sm:inline">Live Site</span>
            </Link>

            <button
              onClick={handleLogout}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                padding: '0.45rem 0.75rem',
                borderRadius: '6px',
                backgroundColor: 'rgba(220, 53, 69, 0.1)',
                border: '1px solid rgba(220, 53, 69, 0.25)',
                color: '#dc2626',
                fontSize: '0.78rem',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              <LogOut size={13} />
              <span className="hidden xs:inline">Logout</span>
            </button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="admin-mobile-menu-btn"
              aria-label="Toggle navigation menu"
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#0f1e3c',
                padding: '4px',
                display: 'none',
              }}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div
            style={{
              padding: '1rem 1.25rem 1.5rem',
              backgroundColor: 'rgba(235, 222, 202, 0.98)',
              borderTop: '1px solid rgba(0,0,0,0.06)',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.6rem',
              boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
            }}
          >
            {ADMIN_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  padding: '0.65rem 0.75rem',
                  borderRadius: '6px',
                  backgroundColor: pathname === link.href ? 'rgba(15, 30, 60, 0.08)' : 'transparent',
                  fontSize: '0.92rem',
                  fontWeight: pathname === link.href ? 700 : 600,
                  color: pathname === link.href ? '#0f1e3c' : '#475569',
                  textDecoration: 'none',
                }}
              >
                <link.icon size={17} color={pathname === link.href ? '#d4af37' : '#64748b'} />
                <span>{link.label}</span>
              </Link>
            ))}
          </div>
        )}
      </header>

      {/* ── Page Content ── */}
      <main style={{ flex: 1, maxWidth: '1240px', width: '100%', margin: '0 auto', padding: 'clamp(1rem, 3vw, 2rem) clamp(1rem, 2.5vw, 1.5rem)' }}>
        {children}
      </main>

      <style>{`
        .admin-desktop-nav {
          display: flex;
        }
        @media (max-width: 860px) {
          .admin-desktop-nav {
            display: none !important;
          }
          .admin-mobile-menu-btn {
            display: flex !important;
          }
        }
      `}</style>
    </div>
  );
}
