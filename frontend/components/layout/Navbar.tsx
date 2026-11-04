'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X, ArrowLeft, Phone, Lock } from 'lucide-react';
import { useMockDb } from '@/lib/mock/store';

const NAV_LINKS = [
  { label: 'INTERIORS',   href: '/#projects' },
  { label: 'WHO WE ARE',  href: '/#about' },
  { label: 'SERVICES',    href: '/#services' },
  { label: 'ENQUIRE',     href: '/#contact' },
];

export default function Navbar() {
  const pathname   = usePathname();
  const router     = useRouter();
  const isHome     = pathname === '/';
  const { state }  = useMockDb();
  const [scrolled, setScrolled]     = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // Switch to sticky style once scrolled slightly past top of hero
      setScrolled(window.scrollY > 60);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('/#') && isHome) {
      e.preventDefault();
      const id = href.replace('/#', '');
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      setMobileOpen(false);
    }
  };

  // Invisible / transparent on hero section; solid sticky cream on other sections and pages
  const isTransparent = isHome && !scrolled;

  const phoneDisplay = state.settings.phone || '+91 98116 85628';
  const phoneClean = state.settings.phoneClean || '+919811685628';

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          background: isTransparent ? 'transparent' : '#F6F1EA',
          borderBottom: isTransparent ? 'none' : '1px solid rgba(0, 0, 0, 0.07)',
          boxShadow: isTransparent ? 'none' : '0 2px 20px rgba(0, 0, 0, 0.05)',
          transition: 'background-color 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease',
        }}
      >
        {/* Subtle dark gradient overlay only when transparent on hero so white nav text is always crisp */}
        {isTransparent && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              pointerEvents: 'none',
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.15) 60%, transparent 100%)',
              height: '100px',
            }}
          />
        )}

        <div
          style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 clamp(1.5rem, 4vw, 3.5rem)',
            height: '78px',
            maxWidth: '100%',
          }}
        >
          {/* LEFT: Logo (+ back button on subpages) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            {!isHome && (
              <button
                onClick={() => router.back()}
                style={{
                  background: 'none',
                  border: `1px solid ${isTransparent ? 'rgba(255,255,255,0.4)' : 'rgba(26,20,16,0.2)'}`,
                  borderRadius: '6px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.4rem 0.85rem',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  letterSpacing: '0.06em',
                  color: isTransparent ? 'white' : '#1F1713',
                  transition: 'all 0.2s ease',
                }}
              >
                <ArrowLeft size={14} /> BACK
              </button>
            )}

            <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo_transparent.png"
                alt="Iconic Design"
                style={{
                  height: '42px',
                  width: 'auto',
                  filter: isTransparent ? 'brightness(0) invert(1)' : 'none',
                  transition: 'filter 0.3s ease',
                }}
              />
            </Link>
          </div>

          {/* RIGHT-CENTER: Enlarged Nav buttons + Call icon + Admin icon */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(1.5rem, 3.5vw, 3.25rem)' }}>
            <nav className="nav-desktop">
              <ul
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'clamp(1.5rem, 3vw, 2.75rem)',
                  listStyle: 'none',
                  margin: 0,
                  padding: 0,
                }}
              >
                {NAV_LINKS.map(({ label, href }) => (
                  <li key={href}>
                    <a
                      href={href}
                      onClick={(e) => handleNavClick(e, href)}
                      className="nav-btn-enlarged"
                      style={{
                        color: isTransparent ? '#FFFFFF' : '#1F1713',
                        fontSize: '0.92rem',
                        fontWeight: 600,
                        letterSpacing: '0.14em',
                        textTransform: 'uppercase',
                        textDecoration: 'none',
                        fontFamily: 'var(--font-sans)',
                        transition: 'color 0.2s ease, opacity 0.2s ease',
                        padding: '0.5rem 0',
                        position: 'relative',
                        display: 'inline-block',
                      }}
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              {/* Call icon */}
              <a
                href={`tel:${phoneClean}`}
                aria-label="Call Iconic Design"
                title={`Call: ${phoneDisplay}`}
                className="nav-call-btn"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  background: isTransparent ? 'rgba(255,255,255,0.14)' : 'rgba(26,20,16,0.06)',
                  border: isTransparent ? '1px solid rgba(255,255,255,0.3)' : '1px solid rgba(26,20,16,0.12)',
                  color: isTransparent ? '#FFFFFF' : '#1F1713',
                  transition: 'all 0.25s ease',
                  textDecoration: 'none',
                }}
              >
                <Phone size={19} strokeWidth={2} />
              </a>

              {/* Admin Access Link */}
              <Link
                href="/admin/login"
                aria-label="Admin Portal"
                title="Admin Portal"
                className="nav-admin-btn"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  background: isTransparent ? 'rgba(255,255,255,0.14)' : 'rgba(26,20,16,0.06)',
                  border: isTransparent ? '1px solid rgba(255,255,255,0.3)' : '1px solid rgba(26,20,16,0.12)',
                  color: isTransparent ? '#FFFFFF' : '#1F1713',
                  transition: 'all 0.25s ease',
                  textDecoration: 'none',
                }}
              >
                <Lock size={17} strokeWidth={2} />
              </Link>
            </div>

            {/* Mobile hamburger button */}
            <button
              onClick={() => setMobileOpen(true)}
              className="menu-btn"
              aria-label="Open navigation menu"
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                display: 'none',
                padding: '6px',
                color: isTransparent ? '#FFFFFF' : '#1F1713',
              }}
            >
              <Menu size={26} />
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile fullscreen drawer ── */}
      <div className={`mobile-nav ${mobileOpen ? 'open' : ''}`}>
        <button
          onClick={() => setMobileOpen(false)}
          aria-label="Close menu"
          style={{
            position: 'absolute',
            top: '1.5rem',
            right: '1.5rem',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          <X size={32} color="white" />
        </button>

        <div style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
          <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: 'white', fontWeight: 700 }}>
            Iconic Design
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--gold)', letterSpacing: '0.22em', textTransform: 'uppercase', marginTop: '0.35rem' }}>
            Luxury Interior Studio
          </div>
        </div>

        <div style={{ width: '44px', height: '1px', background: 'rgba(201,168,76,0.4)', margin: '0 auto 2.5rem' }} />

        {NAV_LINKS.map(({ label, href }) => (
          <a
            key={href}
            href={href}
            className="mobile-nav-link"
            style={{ fontSize: '1.15rem', fontWeight: 600, letterSpacing: '0.12em' }}
            onClick={(e) => { handleNavClick(e, href); setMobileOpen(false); }}
          >
            {label}
          </a>
        ))}

        <div style={{ marginTop: '2.5rem', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
          <a
            href={`tel:${phoneClean}`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6rem',
              color: 'var(--gold-light)',
              fontWeight: 700,
              fontSize: '1.05rem',
              letterSpacing: '0.05em',
              textDecoration: 'none',
            }}
          >
            <Phone size={19} /> {phoneDisplay}
          </a>

          <Link
            href="/admin/login"
            onClick={() => setMobileOpen(false)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: 'rgba(255,255,255,0.7)',
              fontSize: '0.85rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              textDecoration: 'none',
            }}
          >
            <Lock size={14} /> Admin Portal
          </Link>
        </div>
      </div>

      <style>{`
        .nav-btn-enlarged:hover {
          color: var(--gold) !important;
        }
        .nav-call-btn:hover,
        .nav-admin-btn:hover {
          background: var(--gold) !important;
          color: #0F1E3C !important;
          border-color: var(--gold) !important;
          transform: scale(1.05);
        }
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .menu-btn { display: flex !important; }
        }
      `}</style>
    </>
  );
}
