'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  Crown,
  Phone,
  ArrowRight,
  Award,
  Sparkles,
  Users,
  ShieldCheck,
} from 'lucide-react';

const SLIDES = [
  { src: '/uploads/interior0.jpg', label: 'THE GRAND DLF VILLA' },
  { src: '/uploads/interior1.jpg', label: 'SECTOR 56 PENTHOUSE' },
  { src: '/uploads/interior3.jpg', label: 'TECHVENTURES HQ' },
  { src: '/uploads/interior4.jpg', label: 'AMBIENCE ISLAND RESIDENCE' },
  { src: '/uploads/interior5.jpg', label: 'THE OLIVE GARDEN RESTAURANT' },
  { src: '/uploads/interior6.jpg', label: 'GOLF COURSE ROAD BUNGALOW' },
  { src: '/uploads/interior7.jpg', label: 'SOHNA ROAD MODERN VILLA' },
  { src: '/uploads/interior8.jpg', label: 'MANESAR CAMPUS' },
  { src: '/uploads/interior9.jpg', label: 'MG ROAD BOUTIQUE' },
];

const STATS_DATA = [
  { value: 100, suffix: '+', label: 'Projects Delivered', icon: Award },
  { value: 25, suffix: '', label: 'Years of Mastery', icon: Sparkles },
  { value: 50, suffix: '+', label: 'Expert Designers', icon: Users },
  { value: 99, suffix: '%', label: 'Client Satisfaction', icon: ShieldCheck },
];

// Smooth requestAnimationFrame Counter Animation
function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    const duration = 2000;
    let frameId: number;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOut * target));

      if (progress < 1) {
        frameId = requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };

    frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, [target]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [transitioning, setTransitioning] = useState(false);

  const go = useCallback((next: number) => {
    if (transitioning) return;
    setTransitioning(true);
    setTimeout(() => {
      setCurrent((next + SLIDES.length) % SLIDES.length);
      setTransitioning(false);
    }, 450);
  }, [transitioning]);

  useEffect(() => {
    const timer = setInterval(() => go(current + 1), 6500);
    return () => clearInterval(timer);
  }, [current, go]);

  return (
    <section
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        overflow: 'hidden',
        background: '#070D18',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {/* ── Background Carousel Slides ── */}
      {SLIDES.map((slide, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={slide.src}
          src={slide.src}
          alt={slide.label}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: i === current ? (transitioning ? 0.35 : 1) : 0,
            transition: 'opacity 0.8s ease, transform 6s ease',
            transform: i === current ? 'scale(1.03)' : 'scale(1)',
            zIndex: i === current ? 1 : 0,
          }}
        />
      ))}

      {/* ── Seamless Environmental Vignettes for Contrast ── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to right, rgba(6,15,31,0.7) 0%, rgba(6,15,31,0.35) 45%, rgba(6,15,31,0.12) 100%)',
          zIndex: 2,
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '180px',
          background: 'linear-gradient(to top, rgba(6,15,31,0.75) 0%, transparent 100%)',
          zIndex: 2,
          pointerEvents: 'none',
        }}
      />

      {/* ── Overlay Content Shifted Left (Full-Width Bleed Aligned with Logo) ── */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          paddingLeft: 'clamp(1.5rem, 4vw, 3.5rem)',
          paddingRight: 'clamp(1.5rem, 4vw, 3.5rem)',
          paddingTop: '6rem',
          paddingBottom: '3rem',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: -40 }}
          transition={{ duration: 1.8, ease: 'easeOut' }}
          className="hero-clear-content"
          style={{
            maxWidth: '450px',
            width: '100%',
            background: 'transparent',
            border: 'none',
            boxShadow: 'none',
            padding: 0,
          }}
        >
          {/* Badge: Crown + India's Premier Interior Designers (Clean, Minimal, Small Font) */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              marginBottom: '0.9rem',
            }}
          >
            <Crown size={14} color="var(--gold-light)" />
            <span
              style={{
                color: '#FFFFFF',
                fontSize: '0.7rem',
                fontWeight: 600,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                fontFamily: 'var(--font-sans)',
                textShadow: '0 2px 8px rgba(0,0,0,0.7)',
              }}
            >
              India&apos;s Premier Interior Designers
            </span>
          </div>

          {/* Headline (Minimized Font Size as Requested) */}
          <h1
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(1.9rem, 3.3vw, 2.85rem)',
              fontWeight: 700,
              color: '#FFFFFF',
              lineHeight: 1.15,
              margin: '0 0 0.95rem',
              letterSpacing: '0.03em',
              textShadow: '0 3px 18px rgba(0, 0, 0, 0.8)',
            }}
          >
            Crafting <span style={{ color: 'var(--gold-light)' }}>Iconic</span><br />Interiors
          </h1>

          {/* Description (Minimized a Bit, Clean Sans Font) */}
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(0.86rem, 1.05vw, 0.95rem)',
              color: 'rgba(255, 255, 255, 0.9)',
              lineHeight: 1.7,
              margin: '0 0 1.6rem',
              fontWeight: 400,
              textShadow: '0 2px 12px rgba(0, 0, 0, 0.75)',
              maxWidth: '500px',
            }}
          >
            With over 25 years of experience, Iconic Design delivers premium interior design,
            luxury decoration, and bespoke residential environments tailored to your lifestyle.
          </p>

          {/* Action Buttons: Both transparent 2px solid white borders with color fill on hover */}
          <div style={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap', marginBottom: '2.25rem' }}>
            <a
              href="/#projects"
              style={{
                background: 'transparent',
                border: '2px solid #FFFFFF',
                color: '#FFFFFF',
                fontWeight: 600,
                fontSize: '0.78rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                padding: '0.75rem 1.7rem',
                borderRadius: '8px',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                fontFamily: 'var(--font-sans)',
                transition: 'all 0.25s ease',
                textShadow: '0 2px 8px rgba(0,0,0,0.5)',
              }}
              className="hero-btn-portfolio"
            >
              View Portfolio <ArrowRight size={14} />
            </a>

            <a
              href="tel:+919811685628"
              style={{
                background: 'transparent',
                border: '2px solid #FFFFFF',
                color: '#FFFFFF',
                fontWeight: 600,
                fontSize: '0.78rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                padding: '0.75rem 1.7rem',
                borderRadius: '8px',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                fontFamily: 'var(--font-sans)',
                transition: 'all 0.25s ease',
                textShadow: '0 2px 8px rgba(0,0,0,0.5)',
              }}
              className="hero-btn-call"
            >
              <Phone size={14} /> Call Us Now
            </a>
          </div>

          {/* ── Stats Row (Separating Line Removed as Requested) ── */}
          <div
            className="hero-stats-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '1.25rem',
            }}
          >
            {STATS_DATA.map((s) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.label}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    textAlign: 'left',
                  }}
                >
                  <div style={{ color: 'var(--gold-light)', marginBottom: '0.35rem' }}>
                    <Icon size={16} strokeWidth={2.2} />
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '1.35rem',
                      fontWeight: 700,
                      color: '#FFFFFF',
                      lineHeight: 1.1,
                      marginBottom: '0.2rem',
                      textShadow: '0 2px 10px rgba(0,0,0,0.7)',
                    }}
                  >
                    <AnimatedCounter target={s.value} suffix={s.suffix} />
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.62rem',
                      fontWeight: 600,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: 'rgba(255, 255, 255, 0.88)',
                      lineHeight: 1.3,
                      textShadow: '0 1px 6px rgba(0,0,0,0.6)',
                    }}
                  >
                    {s.label}
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* ── Slide Controls (Bottom Right to avoid collision) ── */}
      <div
        style={{
          position: 'absolute',
          bottom: '2rem',
          right: 'clamp(1.5rem, 4vw, 3.5rem)',
          zIndex: 15,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          gap: '0.85rem',
        }}
      >
        {/* Project Label */}
        <div
          style={{
            color: 'white',
            fontSize: '0.72rem',
            fontWeight: 700,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            opacity: transitioning ? 0 : 0.9,
            transition: 'opacity 0.4s ease',
            textShadow: '0 2px 10px rgba(0,0,0,0.7)',
            fontFamily: 'var(--font-sans)',
          }}
        >
          {SLIDES[current].label}
        </div>

        {/* Carousel Arrows + Indicators */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button
            onClick={() => go(current - 1)}
            aria-label="Previous slide"
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: 'transparent',
              border: '2px solid #FFFFFF',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'background 0.2s',
            }}
          >
            <ChevronLeft size={18} />
          </button>

          {/* Dots */}
          <div style={{ display: 'flex', gap: '0.35rem', alignItems: 'center' }}>
            {SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => go(i)}
                aria-label={`Slide ${i + 1}`}
                style={{
                  width: i === current ? '22px' : '6px',
                  height: '6px',
                  borderRadius: '3px',
                  background: i === current ? 'var(--gold)' : 'rgba(255,255,255,0.45)',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  transition: 'all 0.3s ease',
                }}
              />
            ))}
          </div>

          <button
            onClick={() => go(current + 1)}
            aria-label="Next slide"
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: 'transparent',
              border: '2px solid #FFFFFF',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'background 0.2s',
            }}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <style>{`
        /* View Portfolio button: white outline -> fills with Gold on hover */
        .hero-btn-portfolio:hover {
          background: var(--gold-light) !important;
          border-color: var(--gold-light) !important;
          color: #0F1E3C !important;
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(232, 201, 122, 0.45) !important;
          text-shadow: none !important;
        }

        /* Call Us Now button: white outline -> fills with White on hover */
        .hero-btn-call:hover {
          background: #FFFFFF !important;
          border-color: #FFFFFF !important;
          color: #0F1E3C !important;
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(255, 255, 255, 0.35) !important;
          text-shadow: none !important;
        }

        @media (max-width: 640px) {
          .hero-stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 1rem !important;
          }
        }
      `}</style>
    </section>
  );
}
