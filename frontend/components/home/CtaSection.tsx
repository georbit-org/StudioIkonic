'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, CheckCircle, Send, Calendar } from 'lucide-react';
import { useMockDb } from '@/lib/mock/store';

export default function CtaSection() {
  const { addLead } = useMockDb();
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading]     = useState(false);
  const [success, setSuccess]     = useState(false);
  const [error, setError]         = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const fd = new FormData(e.currentTarget);
    const name = (fd.get('name') as string) || '';
    const phone = (fd.get('phone') as string) || '';
    const email = (fd.get('email') as string) || '';
    const service = (fd.get('service') as string) || 'Residential Villa / Apartment';
    const message = (fd.get('message') as string) || '';

    // Record in mock database
    addLead({
      name,
      phone,
      email,
      service,
      budget: 'Flexible',
      message,
      status: 'new',
    });

    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 600);
  };

  const closeModal = () => { setModalOpen(false); setTimeout(() => { setSuccess(false); setError(''); }, 400); };

  return (
    <>
      {/* ── CTA Section — Framed Container with Margins ────────────── */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1240px] my-10 sm:my-14 mb-16 sm:mb-24">
        <div className="flex flex-col md:flex-row min-h-[420px] lg:min-h-[460px] rounded-[24px] sm:rounded-[32px] overflow-hidden border border-white/80 shadow-[0_12px_40px_rgba(15,30,60,0.07)] bg-[#f5f0e8]">
          
          {/* Left — interior image */}
          <div className="flex-1 relative overflow-hidden min-h-[300px] md:min-h-[420px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/uploads/interior2.jpg"
              alt="Luxury interior — living space"
              className="w-full h-full object-cover object-center transition-transform duration-700 ease-out hover:scale-105"
            />
          </div>

          {/* Right — text + CTA */}
          <div className="flex-1 bg-[#f5f0e8] flex flex-col items-center justify-center p-8 sm:p-12 lg:p-16 text-center cta-right-panel">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(1.35rem, 2.4vw, 1.95rem)',
                  fontStyle: 'italic',
                  fontWeight: 400,
                  color: '#2a2218',
                  lineHeight: 1.55,
                  marginBottom: '2.25rem',
                  letterSpacing: '0.01em',
                }}
              >
                Think you can&apos;t afford<br />
                beautiful interior design?<br />
                Think again.
              </p>

              <button
                onClick={() => setModalOpen(true)}
                style={{
                  display: 'inline-block',
                  padding: '0.9rem 2.5rem',
                  border: '1.5px solid #a89060',
                  borderRadius: '25px',
                  background: 'transparent',
                  color: 'var(--text-primary)',
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-sans)',
                  transition: 'all 0.25s ease',
                }}
                className="cta-split-btn"
              >
                Schedule a Consultation
              </button>
            </motion.div>
          </div>

        </div>
      </section>

      {/* ── Contact Modal ─────────────────────────────────── */}
      {modalOpen && (
        <div
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: 'rgba(6,15,31,0.75)',
            backdropFilter: 'blur(8px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '1rem',
          }}
          onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              background: 'white', borderRadius: '20px',
              width: '100%', maxWidth: '520px',
              overflow: 'hidden', boxShadow: '0 30px 80px rgba(0,0,0,0.35)',
            }}
          >
            {/* Modal header */}
            <div style={{
              background: 'linear-gradient(135deg, var(--navy-deep), var(--navy))',
              padding: '1.75rem 2rem', position: 'relative',
            }}>
              <button
                onClick={closeModal}
                style={{
                  position: 'absolute', top: '1rem', right: '1rem',
                  background: 'rgba(255,255,255,0.1)', border: 'none',
                  borderRadius: '50%', width: '32px', height: '32px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'white', cursor: 'pointer',
                }}
              >
                <X size={16} />
              </button>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
                <Calendar size={14} color="var(--gold)" />
                <span style={{ color: 'var(--gold)', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase' }}>
                  Complimentary Design Session
                </span>
              </div>
              <h3 style={{ fontFamily: 'var(--font-serif)', color: 'white', fontSize: '1.4rem', fontWeight: 700, margin: 0 }}>
                Schedule a Consultation
              </h3>
              <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.84rem', margin: '0.35rem 0 0' }}>
                Connect with Shakir Ali &amp; the Iconic Design team.
              </p>
            </div>

            {/* Modal body */}
            <div style={{ padding: '2rem' }}>
              {success ? (
                <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
                  <CheckCircle size={48} color="var(--gold)" style={{ margin: '0 auto 1rem' }} />
                  <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: 'var(--navy)', marginBottom: '0.5rem' }}>
                    Consultation Request Received
                  </h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                    Thank you! Shakir Ali will personally review your project details and contact you within 24 hours.
                  </p>
                  <button onClick={closeModal} className="btn btn-navy" style={{ margin: '0 auto' }}>
                    Close
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label style={labelStyle}>Your Name *</label>
                      <input style={inputStyle} name="name" required placeholder="Mr. / Ms. Name" />
                    </div>
                    <div>
                      <label style={labelStyle}>Phone Number *</label>
                      <input style={inputStyle} name="phone" type="tel" required placeholder="+91 98765 43210" />
                    </div>
                  </div>

                  <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label style={labelStyle}>Email Address</label>
                      <input style={inputStyle} name="email" type="email" placeholder="you@example.com" />
                    </div>
                    <div>
                      <label style={labelStyle}>Project Type</label>
                      <select style={{ ...inputStyle, cursor: 'pointer' }} name="service">
                        <option value="Residential">Residential Villa / Apartment</option>
                        <option value="Commercial">Commercial Office / HQ</option>
                        <option value="Renovation">Complete Renovation</option>
                        <option value="Hospitality">Hospitality / Restaurant</option>
                        <option value="Other">Other Bespoke Requirement</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label style={labelStyle}>Project Details &amp; Location</label>
                    <textarea
                      name="message" required rows={4}
                      placeholder="Tell us about your project, space size, budget range, timeline..."
                      style={{ ...inputStyle, resize: 'vertical', minHeight: '100px' }}
                    />
                  </div>
                  {error && <p style={{ color: '#e53e3e', fontSize: '0.85rem', margin: 0 }}>{error}</p>}
                  <button type="submit" className="btn btn-gold" disabled={loading}
                    style={{ justifyContent: 'center', opacity: loading ? 0.7 : 1 }}>
                    {loading ? 'Sending…' : <><Send size={15} /> Submit Inquiry</>}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}

      <style>{`
        .cta-split-btn:hover {
          background: #a89060 !important;
          color: white !important;
        }
        @media (max-width: 768px) {
          .cta-right-panel { padding: 3rem 1.5rem !important; }
          .form-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}

const labelStyle: React.CSSProperties = {
  display: 'block', fontSize: '0.78rem', fontWeight: 700,
  color: 'var(--navy)', letterSpacing: '0.04em',
  textTransform: 'uppercase', marginBottom: '0.4rem',
};
const inputStyle: React.CSSProperties = {
  width: '100%', padding: '0.7rem 1rem',
  border: '1.5px solid rgba(15,30,60,0.12)', borderRadius: '10px',
  fontSize: '0.92rem', fontFamily: 'var(--font-sans)',
  color: 'var(--navy)', background: 'var(--cream)', outline: 'none',
  transition: 'border-color 0.2s',
};
