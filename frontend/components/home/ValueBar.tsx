'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, Users, Box, ArrowRight } from 'lucide-react';

const BENEFITS = [
  {
    Icon: ShieldCheck,
    title: 'SAVE UP TO 30% OFF',
    desc: 'Exclusive trade discounts at 200+ luxury brands — passed directly to you, no mark-ups.',
  },
  {
    Icon: Users,
    title: '2 SENIOR DESIGNERS',
    desc: 'Receive multiple tailored concepts from our expert senior design team, not juniors.',
  },
  {
    Icon: Box,
    title: '3D VISUALIZATIONS',
    desc: 'See your dream space in photorealistic 3D before a single nail is hammered.',
  },
];

const TR = { duration: 0.55, ease: 'easeOut' } as const;

export default function ValueBar() {
  return (
    <section style={{ background: 'var(--cream)', padding: '3.5rem 0', borderBottom: '1px solid var(--cream-dark)' }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '0',
          position: 'relative',
        }}>
          {BENEFITS.map(({ Icon, title, desc }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ ...TR, delay: i * 0.1 }}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '1.1rem',
                padding: '1.5rem 2rem',
                borderRight: i < 2 ? '1px solid var(--cream-dark)' : 'none',
              }}
            >
              {/* Icon circle */}
              <div style={{
                flexShrink: 0,
                width: '50px',
                height: '50px',
                borderRadius: '12px',
                background: 'var(--navy)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Icon size={22} color="var(--gold)" />
              </div>

              <div>
                <div style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  color: 'var(--navy)',
                  letterSpacing: '0.06em',
                  marginBottom: '0.35rem',
                }}>
                  {title}
                </div>
                <p style={{
                  fontSize: '0.83rem',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.55,
                  margin: 0,
                }}>
                  {desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA row */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ ...TR, delay: 0.35 }}
          style={{ textAlign: 'center', marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid var(--cream-dark)' }}
        >
          <a href="/#contact" className="btn btn-navy" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
            Schedule a Consultation <ArrowRight size={16} />
          </a>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .vbar-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 900px) {
          .vbar-item-border { border-right: none !important; border-bottom: 1px solid var(--cream-dark); }
        }
      `}</style>
    </section>
  );
}

