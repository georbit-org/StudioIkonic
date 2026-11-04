'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  MessageSquareQuote,
  Plus,
  Star,
  Pencil,
  Trash2,
  Eye,
  EyeOff,
  ChevronUp,
  ChevronDown,
} from 'lucide-react';
import { useMockDb, Testimonial } from '@/lib/mock/store';
import { useFeedback } from '@/lib/mock/feedback';

export default function AdminTestimonialsPage() {
  const { state, toggleTestimonial, deleteTestimonial, reorderTestimonial, upsertTestimonial } = useMockDb();
  const { toast, confirm } = useFeedback();

  // Add testimonial form state
  const [name, setName] = useState('');
  const [role, setRole] = useState('Villa Owner, Gurgaon');
  const [stars, setStars] = useState(5);
  const [text, setText] = useState('');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !text.trim()) {
      toast('Client name and review text are required', 'error');
      return;
    }

    upsertTestimonial({
      name,
      role,
      stars,
      text,
      published: true,
    });

    toast(`Review from "${name}" added successfully (demo)`, 'success');
    setName('');
    setText('');
  };

  const handleDelete = (item: Testimonial) => {
    confirm({
      title: `Delete Review by "${item.name}"?`,
      message: 'This testimonial will be removed from your website marquee and trust section.',
      confirmText: 'Delete Review',
      onConfirm: () => {
        deleteTestimonial(item.id);
        toast(`Review by "${item.name}" deleted (demo)`, 'info');
      },
    });
  };

  const handleToggle = (item: Testimonial) => {
    toggleTestimonial(item.id);
    const newStatus = item.published !== false ? 'hidden' : 'published';
    toast(`Review by "${item.name}" is now ${newStatus} (demo)`, 'success');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
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
          Testimonials &amp; Client Feedback
        </h1>
        <p style={{ margin: '0.25rem 0 0', fontSize: '0.84rem', color: '#64748b' }}>
          Curate homeowner testimonials, reorder priority quotes, and manage public marquee visibility.
        </p>
      </div>

      {/* Card 1: Add New Testimonial */}
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
          <Plus size={18} color="#d4af37" />
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.2rem', fontWeight: 700, color: '#0f1e3c', margin: 0 }}>
            Add New Testimonial
          </h2>
        </div>

        <form onSubmit={handleCreate} style={{ padding: '1.75rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
            <div>
              <label style={labelStyle}>Client Name *</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Rajiv Mehta"
                required
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>Client Title / Location</label>
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="Villa Owner, DLF Phase 4"
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>Rating (Stars)</label>
              <select
                value={stars}
                onChange={(e) => setStars(Number(e.target.value))}
                style={{ ...inputStyle, cursor: 'pointer' }}
              >
                <option value={5}>5 Stars - Exceptional</option>
                <option value={4}>4 Stars - Great</option>
                <option value={3}>3 Stars - Good</option>
              </select>
            </div>
          </div>

          <div style={{ marginTop: '1.25rem' }}>
            <label style={labelStyle}>Client Review Quote *</label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Shakir Ali and his team transformed our space with extraordinary attention to detail..."
              rows={3}
              required
              style={{ ...inputStyle, resize: 'vertical' }}
            />
          </div>

          <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end' }}>
            <button
              type="submit"
              style={{
                padding: '0.8rem 2rem',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #0f1e3c 0%, #1e40af 100%)',
                color: '#ffffff',
                border: 'none',
                fontWeight: 700,
                fontSize: '0.95rem',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                boxShadow: '0 4px 12px rgba(15, 30, 60, 0.2)',
              }}
            >
              <Plus size={16} /> Add Testimonial
            </button>
          </div>
        </form>
      </div>

      {/* Card 2: Existing Testimonials list */}
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
          border: '1px solid rgba(0,0,0,0.06)',
          overflow: 'hidden',
        }}
      >
        <div style={{ padding: '1.25rem 1.75rem', borderBottom: '1px solid #f1f5f9' }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.2rem', fontWeight: 700, color: '#0f1e3c', margin: 0 }}>
            Published Client Reviews ({state.testimonials.length})
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {state.testimonials.map((item, idx) => (
            <div
              key={item.id}
              style={{
                padding: '1.5rem 1.75rem',
                borderBottom: '1px solid #f1f5f9',
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                gap: '1.5rem',
                backgroundColor: item.published !== false ? '#ffffff' : '#f8fafc',
              }}
            >
              {/* Left review details */}
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                  <div style={{ display: 'flex', color: '#d4af37' }}>
                    {Array.from({ length: item.stars }).map((_, i) => (
                      <Star key={i} size={15} className="fill-current" />
                    ))}
                  </div>

                  <span
                    style={{
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      padding: '0.15rem 0.5rem',
                      borderRadius: '4px',
                      backgroundColor: item.published !== false ? 'rgba(22, 163, 74, 0.1)' : 'rgba(100, 116, 139, 0.1)',
                      color: item.published !== false ? '#16a34a' : '#64748b',
                      textTransform: 'uppercase',
                    }}
                  >
                    {item.published !== false ? 'Visible' : 'Hidden'}
                  </span>
                </div>

                <p style={{ margin: '0.4rem 0', fontSize: '0.88rem', color: '#334155', fontStyle: 'italic', lineHeight: 1.6 }}>
                  &ldquo;{item.text}&rdquo;
                </p>

                <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#0f1e3c', marginTop: '0.4rem' }}>
                  {item.name} <span style={{ fontWeight: 400, color: '#64748b' }}>— {item.role}</span>
                </div>
              </div>

              {/* Right action controls */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexShrink: 0 }}>
                {/* Reorder Buttons */}
                <button
                  type="button"
                  onClick={() => reorderTestimonial(item.id, 'up')}
                  disabled={idx === 0}
                  title="Move review up"
                  style={{ ...btnStyle, opacity: idx === 0 ? 0.35 : 1 }}
                >
                  <ChevronUp size={14} />
                </button>
                <button
                  type="button"
                  onClick={() => reorderTestimonial(item.id, 'down')}
                  disabled={idx === state.testimonials.length - 1}
                  title="Move review down"
                  style={{ ...btnStyle, opacity: idx === state.testimonials.length - 1 ? 0.35 : 1 }}
                >
                  <ChevronDown size={14} />
                </button>

                {/* Toggle Visibility */}
                <button
                  type="button"
                  onClick={() => handleToggle(item)}
                  title={item.published !== false ? 'Hide from public marquee' : 'Show in public marquee'}
                  style={btnStyle}
                >
                  {item.published !== false ? <Eye size={14} color="#16a34a" /> : <EyeOff size={14} color="#94a3b8" />}
                </button>

                {/* Edit Link */}
                <Link
                  href={`/admin/testimonials/${item.id}/edit`}
                  title="Edit testimonial"
                  style={{ ...btnStyle, color: '#1e40af' }}
                >
                  <Pencil size={14} />
                </Link>

                {/* Delete */}
                <button
                  type="button"
                  onClick={() => handleDelete(item)}
                  title="Delete review"
                  style={{ ...btnStyle, color: '#dc2626' }}
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
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

const btnStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '0.4rem 0.65rem',
  borderRadius: '6px',
  border: '1.5px solid #cbd5e1',
  backgroundColor: '#ffffff',
  color: '#475569',
  cursor: 'pointer',
  textDecoration: 'none',
};
