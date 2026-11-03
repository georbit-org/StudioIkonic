'use client';

import Link from 'next/link';
import { Phone, Mail, MapPin } from 'lucide-react';
import { SITE } from '@/lib/data';

// Inline SVG social icons (lucide-react doesn't bundle brand icons)
const IgIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);
const FbIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);
const LiIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

const SOCIAL = [
  { Icon: IgIcon, href: SITE.instagram, label: 'Instagram' },
  { Icon: FbIcon, href: SITE.facebook,  label: 'Facebook' },
  { Icon: LiIcon, href: SITE.linkedin,  label: 'LinkedIn' },
];

const NAV_LINKS = [
  { label: 'Home',         href: '/' },
  { label: 'Our Projects', href: '/projects' },
  { label: 'About Us',     href: '/#about' },
  { label: 'Services',     href: '/#services' },
  { label: 'Contact Us',   href: '/#contact' },
];

const CONTACT = [
  { Icon: Phone,  label: 'Call / WhatsApp', value: SITE.phone,    href: `tel:${SITE.phoneClean}` },
  { Icon: Mail,   label: "Founder's Desk",  value: SITE.email,    href: `mailto:${SITE.email}` },
  { Icon: MapPin, label: 'Office',          value: SITE.location, href: SITE.mapUrl },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      {/* ─── CSS-only hover rules ─── */}
      <style>{`
        .footer-social-link {
          width: 40px; height: 40px; border-radius: 10px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.10);
          display: flex; align-items: center; justify-content: center;
          color: rgba(255,255,255,0.55);
          transition: all 0.2s ease;
          text-decoration: none;
        }
        .footer-social-link:hover {
          background: rgba(201,168,76,0.15);
          border-color: rgba(201,168,76,0.30);
          color: var(--gold-light);
        }
        .footer-contact-row {
          display: flex; align-items: flex-start; gap: 0.75rem;
          text-decoration: none;
        }
        .footer-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1.5fr;
          gap: 3rem;
        }
        @media (max-width: 900px) { .footer-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 560px) { .footer-grid { grid-template-columns: 1fr !important; } }
      `}</style>

      <div className="container">
        <div className="footer-grid">

          {/* ── Brand column ── */}
          <div>
            <div className="footer-logo-text">Iconic Design</div>
            <div className="footer-tagline">Luxury Interior Studio · Est. 1999</div>
            <p style={{ fontSize: '0.88rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.8, marginTop: '1.25rem', maxWidth: '320px' }}>
              India&apos;s premier luxury interior design studio. Crafting iconic spaces for
              discerning clients across Delhi NCR with timeless elegance and meticulous craftsmanship.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.75rem' }}>
              {SOCIAL.map(({ Icon, href, label }) => (
                <a key={label} href={href} aria-label={label} className="footer-social-link">
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* ── Quick Links ── */}
          <div>
            <div className="footer-heading">Quick Links</div>
            <nav style={{ display: 'flex', flexDirection: 'column' }}>
              {NAV_LINKS.map(({ label, href }) => (
                <Link key={href} href={href} className="footer-link">{label}</Link>
              ))}
            </nav>
          </div>

          {/* ── Contact ── */}
          <div>
            <div className="footer-heading">Get in Touch</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {CONTACT.map(({ Icon, label, value, href }) => (
                <a key={label} href={href} className="footer-contact-row">
                  <div style={{
                    width: '36px', height: '36px', borderRadius: '9px',
                    background: 'rgba(201,168,76,0.10)', border: '1px solid rgba(201,168,76,0.20)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0, color: 'var(--gold)',
                  }}>
                    <Icon size={15} />
                  </div>
                  <div>
                    <span style={{ fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', display: 'block' }}>
                      {label}
                    </span>
                    <span style={{ fontSize: '0.88rem', fontWeight: 700, color: 'rgba(255,255,255,0.85)', marginTop: '0.2rem', display: 'block' }}>
                      {value}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* ── Bottom bar ── */}
        <div className="footer-bottom">
          <span>© {year} Iconic Design. All rights reserved.</span>
          <span>Designed for Excellence · Gurgaon, India</span>
        </div>
      </div>
    </footer>
  );
}
