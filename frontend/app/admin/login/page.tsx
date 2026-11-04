'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Lock, ArrowRight, Sparkles, Loader2, ArrowLeft, AlertCircle } from 'lucide-react';
import { useFeedback } from '@/lib/mock/feedback';

export default function AdminLoginPage() {
  const router = useRouter();
  const { toast } = useFeedback();
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    setTimeout(() => {
      setLoading(false);
      const msg = 'Wrong credentials. Please try again.';
      setErrorMessage(msg);
      toast(msg, 'error', 'Authentication Failed');
    }, 700);
  };

  const handlePreviewAsAdmin = () => {
    sessionStorage.setItem('demo_admin_session', '1');
    toast('Logged in as Administrator (Demo Preview)', 'success');
    router.push('/admin');
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#fafafa',
        backgroundImage: 'radial-gradient(circle at 50% 0%, rgba(212, 175, 55, 0.08) 0%, transparent 60%)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '2rem 1rem',
        position: 'relative',
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      {/* Back link */}
      <div style={{ position: 'absolute', top: '1.5rem', left: '1.5rem', zIndex: 10 }}>
        <Link
          href="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.5rem 1rem',
            borderRadius: '8px',
            backgroundColor: 'rgba(235, 222, 202, 0.8)',
            border: '1px solid rgba(0,0,0,0.08)',
            color: '#0f1e3c',
            fontSize: '0.82rem',
            fontWeight: 600,
            textDecoration: 'none',
            transition: 'all 0.2s',
          }}
        >
          <ArrowLeft size={14} /> Back to Website
        </Link>
      </div>

      <div style={{ maxWidth: '480px', width: '100%', margin: '0 auto' }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo_transparent.png"
            alt="Iconic Design"
            style={{ height: '48px', width: 'auto', margin: '0 auto 0.75rem' }}
          />
          <div style={{ fontSize: '0.8rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 600 }}>
            Luxury Interior Studio
          </div>
        </div>

        {/* Card */}
        <div
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '14px',
            overflow: 'hidden',
            boxShadow: '0 15px 40px rgba(0, 0, 0, 0.08)',
            border: '1px solid rgba(0, 0, 0, 0.06)',
          }}
        >
          {/* Card Header matching original Flask template */}
          <div
            style={{
              backgroundColor: 'rgba(235, 222, 202, 0.96)',
              borderBottom: '4px solid #d4af37',
              padding: '1.5rem',
              textAlign: 'center',
            }}
          >
            <h3
              style={{
                margin: 0,
                color: '#0f1e3c',
                fontFamily: "'Playfair Display', serif",
                fontSize: '1.45rem',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.6rem',
              }}
            >
              <Lock size={22} color="#d4af37" /> Admin Access
            </h3>
          </div>

          <div style={{ padding: '2rem' }}>
            {errorMessage && (
              <div
                style={{
                  marginBottom: '1.25rem',
                  padding: '0.85rem 1rem',
                  borderRadius: '8px',
                  backgroundColor: '#fef2f2',
                  border: '1px solid #fecaca',
                  color: '#991b1b',
                  fontSize: '0.85rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}
              >
                <AlertCircle size={16} color="#dc2626" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#475569', marginBottom: '0.4rem' }}>
                  Admin Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter administrator password"
                  required
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    borderRadius: '8px',
                    border: '1.5px solid #cbd5e1',
                    fontSize: '0.95rem',
                    outline: 'none',
                    transition: 'border-color 0.2s',
                  }}
                />
                <div style={{ fontSize: '0.76rem', color: '#94a3b8', marginTop: '0.45rem' }}>
                  Contact your administrator if you have forgotten your password.
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                style={{
                  width: '100%',
                  padding: '0.85rem',
                  borderRadius: '8px',
                  backgroundColor: 'rgba(235, 222, 202, 0.96)',
                  color: '#0f1e3c',
                  border: '1px solid rgba(0,0,0,0.12)',
                  fontWeight: 700,
                  fontSize: '1rem',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  transition: 'all 0.2s',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.04)',
                }}
              >
                {loading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" /> Verifying...
                  </>
                ) : (
                  'Login to Dashboard'
                )}
              </button>
            </form>

            {/* Divider */}
            <div style={{ position: 'relative', margin: '2rem 0' }}>
              <div style={{ borderTop: '1px solid #e2e8f0' }} />
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  backgroundColor: '#ffffff',
                  padding: '0 0.75rem',
                  fontSize: '0.75rem',
                  color: '#94a3b8',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                }}
              >
                Client Test Drive
              </div>
            </div>

            {/* Preview As Admin Button (Pattern from school-dummy) */}
            <button
              onClick={handlePreviewAsAdmin}
              type="button"
              style={{
                width: '100%',
                padding: '0.9rem 1.25rem',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #0f1e3c 0%, #1e40af 100%)',
                color: '#ffffff',
                border: 'none',
                fontWeight: 700,
                fontSize: '0.95rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.6rem',
                boxShadow: '0 4px 14px rgba(15, 30, 60, 0.25)',
                transition: 'transform 0.15s ease, box-shadow 0.15s ease',
              }}
            >
              <Sparkles size={17} color="#d4af37" />
              <span>Preview as Admin</span>
              <ArrowRight size={16} />
            </button>

            <div
              style={{
                marginTop: '1.25rem',
                padding: '0.75rem',
                borderRadius: '8px',
                backgroundColor: '#f8fafc',
                border: '1px solid #e2e8f0',
                textAlign: 'center',
                fontSize: '0.75rem',
                color: '#64748b',
                lineHeight: 1.5,
              }}
            >
              <strong>Interactive Demo:</strong> Submitting credentials simulates validation. Click <strong>Preview as Admin</strong> to explore the full dashboard with zero backend dependencies.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
