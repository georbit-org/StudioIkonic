'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save } from 'lucide-react';
import { useMockDb } from '@/lib/mock/store';
import { useFeedback } from '@/lib/mock/feedback';

export default function EditTestimonialClient({ id }: { id: string }) {
  const testimonialId = Number(id);
  const router = useRouter();
  const { state, upsertTestimonial } = useMockDb();
  const { toast } = useFeedback();

  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [stars, setStars] = useState(5);
  const [text, setText] = useState('');

  useEffect(() => {
    const item = state.testimonials.find((t) => t.id === testimonialId);
    if (item) {
      setName(item.name);
      setRole(item.role);
      setStars(item.stars);
      setText(item.text);
    }
  }, [testimonialId, state.testimonials]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    upsertTestimonial({
      id: testimonialId,
      name,
      role,
      stars,
      text,
    });
    toast(`Review from "${name}" updated successfully (demo)`, 'success');
    router.push('/admin/testimonials');
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link
          href="/admin/testimonials"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            color: '#0f1e3c',
            fontWeight: 700,
            fontSize: '0.86rem',
            textDecoration: 'none',
          }}
        >
          <ArrowLeft size={16} /> Back to Testimonials
        </Link>
        <span style={{ fontSize: '0.78rem', color: '#94a3b8' }}>Editing Review #{testimonialId}</span>
      </div>

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
        <div style={{ padding: '1.5rem 2rem', borderBottom: '1px solid #f1f5f9' }}>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.4rem', fontWeight: 700, color: '#0f1e3c', margin: 0 }}>
            Edit Testimonial
          </h1>
          <p style={{ margin: '0.2rem 0 0', fontSize: '0.82rem', color: '#64748b' }}>
            Amend the quote text or client attribution details.
          </p>
        </div>

        <form onSubmit={handleSave} style={{ padding: '2rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
            <div>
              <label style={labelStyle}>Client Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>Client Designation / Location</label>
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                style={inputStyle}
              />
            </div>
          </div>

          <div style={{ marginTop: '1.25rem' }}>
            <label style={labelStyle}>Rating (Stars)</label>
            <select
              value={stars}
              onChange={(e) => setStars(Number(e.target.value))}
              style={{ ...inputStyle, width: '200px', cursor: 'pointer' }}
            >
              <option value={5}>5 Stars</option>
              <option value={4}>4 Stars</option>
              <option value={3}>3 Stars</option>
            </select>
          </div>

          <div style={{ marginTop: '1.25rem' }}>
            <label style={labelStyle}>Testimonial Quote</label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={4}
              required
              style={{ ...inputStyle, resize: 'vertical' }}
            />
          </div>

          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
            <Link
              href="/admin/testimonials"
              style={{
                padding: '0.7rem 1.4rem',
                borderRadius: '8px',
                border: '1px solid #cbd5e1',
                backgroundColor: '#ffffff',
                color: '#475569',
                fontWeight: 600,
                fontSize: '0.88rem',
                textDecoration: 'none',
              }}
            >
              Cancel
            </Link>

            <button
              type="submit"
              style={{
                padding: '0.7rem 1.6rem',
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
              <Save size={15} /> Save Changes
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

