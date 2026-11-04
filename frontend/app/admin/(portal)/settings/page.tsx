'use client';

import React, { useState, useEffect } from 'react';
import {
  Settings,
  Save,
  KeyRound,
  Building,
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
} from 'lucide-react';
import { useMockDb } from '@/lib/mock/store';
import { useFeedback } from '@/lib/mock/feedback';

export default function AdminSettingsPage() {
  const { state, updateSettings } = useMockDb();
  const { toast } = useFeedback();

  // Settings form state
  const [name, setName] = useState('');
  const [tagline, setTagline] = useState('');
  const [phone, setPhone] = useState('');
  const [phoneClean, setPhoneClean] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('');

  // Password state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    if (state.settings) {
      setName(state.settings.name || 'Iconic Design');
      setTagline(state.settings.tagline || '');
      setPhone(state.settings.phone || '');
      setPhoneClean(state.settings.phoneClean || '');
      setEmail(state.settings.email || '');
      setLocation(state.settings.location || '');
    }
  }, [state.settings]);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({
      name,
      tagline,
      phone,
      phoneClean: phoneClean || phone.replace(/\s+/g, ''),
      email,
      location,
    });
    toast('Studio settings updated successfully (demo)', 'success');
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword || newPassword.length < 6) {
      toast('New password must be at least 6 characters long', 'error');
      return;
    }
    if (newPassword !== confirmPassword) {
      toast('New passwords do not match', 'error');
      return;
    }

    toast('Admin password updated successfully (demo)', 'success');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '960px' }}>
      {/* Header */}
      <div>
        <h1
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '1.85rem',
            fontWeight: 700,
            color: '#0f1e3c',
            margin: 0,
          }}
        >
          Studio &amp; System Settings
        </h1>
        <p style={{ margin: '0.25rem 0 0', fontSize: '0.84rem', color: '#64748b' }}>
          Configure studio contact channels, office location, and administrative credentials.
        </p>
      </div>

      {/* Card 1: Studio Contact Details */}
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
          borderTop: '4px solid #d4af37',
          borderLeft: '1px solid rgba(0,0,0,0.06)',
          borderRight: '1px solid rgba(0,0,0,0.06)',
          borderBottom: '1px solid rgba(0,0,0,0.06)',
          overflow: 'hidden',
        }}
      >
        <div style={{ padding: '1.25rem 1.75rem', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <Building size={18} color="#d4af37" />
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.2rem', fontWeight: 700, color: '#0f1e3c', margin: 0 }}>
            Studio Business &amp; Contact Details
          </h2>
        </div>

        <form onSubmit={handleSaveSettings} style={{ padding: '1.75rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(240px, 100%), 1fr))', gap: '1.25rem' }}>
            <div>
              <label style={labelStyle}>Brand Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>Tagline</label>
              <input
                type="text"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>Contact Phone</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>Inquiry Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={inputStyle}
              />
            </div>

            <div style={{ gridColumn: '1 / -1' }}>
              <label style={labelStyle}>Office Address &amp; Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                style={inputStyle}
              />
            </div>
          </div>

          <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end' }}>
            <button
              type="submit"
              style={{
                padding: '0.75rem 1.75rem',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #0f1e3c 0%, #1e40af 100%)',
                color: '#ffffff',
                border: 'none',
                fontWeight: 700,
                fontSize: '0.9rem',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              <Save size={15} /> Save Studio Settings
            </button>
          </div>
        </form>
      </div>

      {/* Card 2: Password Update */}
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
          border: '1px solid rgba(0,0,0,0.06)',
          overflow: 'hidden',
        }}
      >
        <div style={{ padding: '1.25rem 1.75rem', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <KeyRound size={18} color="#d4af37" />
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.2rem', fontWeight: 700, color: '#0f1e3c', margin: 0 }}>
            Change Administrator Password
          </h2>
        </div>

        <form onSubmit={handleChangePassword} style={{ padding: '1.75rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(220px, 100%), 1fr))', gap: '1.25rem' }}>
            <div>
              <label style={labelStyle}>Current Password</label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="••••••••••••"
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="••••••••••••"
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>Confirm New Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••••••"
                style={inputStyle}
              />
            </div>
          </div>

          <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#16a34a', fontSize: '0.78rem', fontWeight: 600 }}>
              <ShieldCheck size={14} /> Password hashing enabled in production
            </div>

            <button
              type="submit"
              style={{
                padding: '0.75rem 1.75rem',
                borderRadius: '8px',
                border: '1.5px solid #0f1e3c',
                backgroundColor: '#ffffff',
                color: '#0f1e3c',
                fontWeight: 700,
                fontSize: '0.9rem',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              Update Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '0.8rem',
  fontWeight: 700,
  color: '#334155',
  marginBottom: '0.35rem',
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '0.65rem 0.85rem',
  borderRadius: '6px',
  border: '1.5px solid #cbd5e1',
  fontSize: '0.88rem',
  fontFamily: "'Poppins', sans-serif",
  outline: 'none',
  backgroundColor: '#ffffff',
};
