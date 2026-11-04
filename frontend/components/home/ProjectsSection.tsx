'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, ArrowRight, Maximize2, X, Sparkles } from 'lucide-react';
import { FEATURED_PROJECTS, PROJECTS } from '@/lib/data';
import BeforeAfterSlider from './BeforeAfterSlider';

const FILTERS = ['All', 'Residential', 'Commercial', 'Hospitality', 'Retail'];

// Before/After image pairs for key projects
const BEFORE_AFTER: Record<number, { before: string; after: string }> = {
  1: {
    before: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80',
    after:  'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&q=80',
  },
  2: {
    before: 'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=800&q=80',
    after:  'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80',
  },
  3: {
    before: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=80',
    after:  'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
  },
};

export default function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState<typeof FEATURED_PROJECTS[0] | null>(null);
  const [modalShowSlider, setModalShowSlider] = useState(false);

  const filtered = activeFilter === 'All'
    ? FEATURED_PROJECTS
    : FEATURED_PROJECTS.filter((p) => p.category === activeFilter);

  // Keep active index in bounds when filter changes
  useEffect(() => {
    setActiveIndex(0);
  }, [activeFilter]);

  // Modal ESC key listener & body lock
  useEffect(() => {
    if (selectedProject) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
      setModalShowSlider(false);
    }

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedProject(null);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [selectedProject]);

  return (
    <section
      style={{
        background: '#FAF6F0',
        padding: '4.5rem 0 5rem',
        width: '100%',
        overflow: 'hidden',
      }}
      id="projects"
    >
      {/* ── Top Header Bar with Synced Filters (100% Span) ── */}
      <div
        style={{
          width: '100%',
          padding: '0 clamp(1.5rem, 4vw, 4rem)',
          marginBottom: '2rem',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            flexWrap: 'wrap',
            gap: '1.25rem',
          }}
        >
          <div>
            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2rem, 3.2vw, 2.75rem)',
                fontWeight: 700,
                color: 'var(--navy)',
                margin: 0,
                lineHeight: 1.1,
              }}
            >
              Featured <span style={{ color: 'var(--gold-dim)', fontStyle: 'italic', fontWeight: 400 }}>Projects</span>
            </h2>
          </div>

          {/* Category Filter Pills */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {FILTERS.map((f) => {
              const active = activeFilter === f;
              return (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  style={{
                    padding: '0.45rem 1.15rem',
                    borderRadius: '999px',
                    border: active ? '1.5px solid var(--navy)' : '1px solid rgba(15,30,60,0.18)',
                    background: active ? 'var(--navy)' : 'transparent',
                    color: active ? 'white' : 'var(--navy)',
                    fontSize: '0.74rem',
                    fontWeight: 600,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {f}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── 100% Full-Width Horizontal Accordion Gallery ── */}
      <div
        style={{
          width: '100%',
          padding: '0 clamp(1.5rem, 4vw, 4rem)',
        }}
      >
        <div className="accordion-strip">
          {filtered.map((project, i) => {
            const isActive = activeIndex === i;

            return (
              <div
                key={project.id}
                onMouseEnter={() => setActiveIndex(i)}
                onClick={() => {
                  setActiveIndex(i);
                  setSelectedProject(project);
                }}
                className={`accordion-pane ${isActive ? 'is-active' : ''}`}
              >
                {/* Background Photo */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={project.cover_image}
                  alt={project.title}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    filter: isActive ? 'brightness(0.95)' : 'brightness(0.6)',
                    transition: 'filter 0.4s ease, transform 0.6s ease',
                    transform: isActive ? 'scale(1.03)' : 'scale(1)',
                  }}
                />

                {/* Vignette Gradient Overlay */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: isActive
                      ? 'linear-gradient(to top, rgba(6,15,31,0.95) 0%, rgba(6,15,31,0.35) 55%, rgba(6,15,31,0.2) 100%)'
                      : 'linear-gradient(to top, rgba(6,15,31,0.85) 0%, rgba(6,15,31,0.4) 100%)',
                    zIndex: 2,
                    pointerEvents: 'none',
                    transition: 'background 0.4s ease',
                  }}
                />

                {/* ── Active State Content (Only Visible when Hovered / Active) ── */}
                {isActive ? (
                  <>
                    {/* Top Row: Clean Category Badge (Left) + Expand Icon (Right) */}
                    <div
                      style={{
                        position: 'absolute',
                        top: '1.25rem',
                        left: '1.25rem',
                        right: '1.25rem',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        zIndex: 4,
                        pointerEvents: 'none',
                      }}
                    >
                      <span
                        style={{
                          background: 'rgba(15,30,60,0.85)',
                          color: 'white',
                          fontSize: '0.64rem',
                          fontWeight: 700,
                          letterSpacing: '0.14em',
                          textTransform: 'uppercase',
                          padding: '0.35rem 0.85rem',
                          borderRadius: '6px',
                          backdropFilter: 'blur(8px)',
                          border: '1px solid rgba(255,255,255,0.25)',
                        }}
                      >
                        {project.category}
                      </span>

                      <span
                        style={{
                          background: 'rgba(255,255,255,0.2)',
                          color: 'white',
                          borderRadius: '8px',
                          padding: '0.45rem',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          backdropFilter: 'blur(8px)',
                          border: '1px solid rgba(255,255,255,0.35)',
                        }}
                        title="Click to view full case study"
                      >
                        <Maximize2 size={15} />
                      </span>
                    </div>

                    {/* Bottom Area: Specs, Title, Location, Action */}
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.08 }}
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        padding: 'clamp(1.25rem, 2.5vw, 2rem)',
                        zIndex: 3,
                        pointerEvents: 'none',
                      }}
                    >
                      <div style={{ marginBottom: '0.35rem' }}>
                        <span
                          style={{
                            fontSize: '0.68rem',
                            fontWeight: 700,
                            color: 'var(--gold-light)',
                            letterSpacing: '0.14em',
                            textTransform: 'uppercase',
                          }}
                        >
                          {project.date} · {project.area}
                        </span>
                      </div>

                      <h3
                        style={{
                          fontFamily: 'var(--font-serif)',
                          fontSize: 'clamp(1.2rem, 1.8vw, 1.55rem)',
                          fontWeight: 700,
                          color: 'white',
                          margin: '0 0 0.45rem',
                          lineHeight: 1.25,
                        }}
                      >
                        {project.title}
                      </h3>

                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '1rem',
                          color: 'rgba(255,255,255,0.75)',
                          fontSize: '0.8rem',
                        }}
                      >
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                          <MapPin size={13} color="var(--gold-light)" /> {project.location}
                        </span>
                        {project.budget && (
                          <span style={{ color: 'var(--gold-light)', fontWeight: 600 }}>
                            {project.budget}
                          </span>
                        )}
                      </div>

                      <div
                        style={{
                          marginTop: '0.9rem',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.4rem',
                          fontSize: '0.74rem',
                          fontWeight: 700,
                          letterSpacing: '0.08em',
                          textTransform: 'uppercase',
                          color: 'var(--gold-light)',
                        }}
                      >
                        Click to Open Full View <ArrowRight size={13} />
                      </div>
                    </motion.div>
                  </>
                ) : (
                  /* ── Inactive Portrait Card: Centered Vertical Text (Never Cut Off) ── */
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      zIndex: 3,
                      pointerEvents: 'none',
                      padding: '1.5rem 0',
                    }}
                  >
                    <span
                      style={{
                        writingMode: 'vertical-rl',
                        transform: 'rotate(180deg)',
                        color: 'rgba(255, 255, 255, 0.88)',
                        fontSize: '0.76rem',
                        fontWeight: 700,
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase',
                        whiteSpace: 'nowrap',
                        textShadow: '0 2px 10px rgba(0, 0, 0, 0.85)',
                        maxHeight: '82%',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {project.title}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Bottom Section Action Buttons ── */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '1rem',
          marginTop: '2.5rem',
          flexWrap: 'wrap',
          padding: '0 1.5rem',
        }}
      >
        <Link href="/projects" className="btn btn-navy" style={{ fontSize: '0.82rem', padding: '0.75rem 2rem' }}>
          View All {PROJECTS.length} Projects <ArrowRight size={15} />
        </Link>
        <a href="/#contact" className="btn btn-gold" style={{ fontSize: '0.82rem', padding: '0.75rem 2rem' }}>
          Schedule a Consultation <ArrowRight size={15} />
        </a>
      </div>

      {/* ── Full View Modal (Before/After Comparison lives here) ── */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            key="project-modal-backdrop"
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 9999,
              background: 'rgba(6, 15, 31, 0.82)',
              backdropFilter: 'blur(14px)',
              WebkitBackdropFilter: 'blur(14px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 'clamp(1rem, 3vw, 2.5rem)',
            }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ type: 'spring', damping: 26, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                width: '100%',
                maxWidth: '980px',
                maxHeight: '92vh',
                background: 'white',
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: '0 30px 90px rgba(0,0,0,0.5)',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
              }}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                aria-label="Close modal"
                style={{
                  position: 'absolute',
                  top: '1.25rem',
                  right: '1.25rem',
                  zIndex: 30,
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  background: 'rgba(15,30,60,0.85)',
                  border: '1px solid rgba(255,255,255,0.3)',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  backdropFilter: 'blur(8px)',
                  transition: 'background 0.2s',
                }}
              >
                <X size={20} />
              </button>

              {/* Modal Content Layout */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1.25fr 1fr',
                  height: '100%',
                  overflowY: 'auto',
                }}
                className="modal-grid-layout"
              >
                {/* Left: Full View Image or Interactive Before/After Slider */}
                <div
                  style={{
                    position: 'relative',
                    minHeight: '420px',
                    background: '#070D18',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {modalShowSlider && BEFORE_AFTER[selectedProject.id] ? (
                    <div style={{ width: '100%', height: '100%' }}>
                      <BeforeAfterSlider
                        beforeSrc={BEFORE_AFTER[selectedProject.id].before}
                        afterSrc={BEFORE_AFTER[selectedProject.id].after}
                        beforeAlt={`${selectedProject.title} Before`}
                        afterAlt={`${selectedProject.title} After`}
                      />
                    </div>
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={selectedProject.cover_image}
                      alt={selectedProject.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block',
                      }}
                    />
                  )}

                  {/* Before / After toggle Button in Full View Mode */}
                  {BEFORE_AFTER[selectedProject.id] && (
                    <button
                      onClick={() => setModalShowSlider(!modalShowSlider)}
                      style={{
                        position: 'absolute',
                        bottom: '1.25rem',
                        left: '1.25rem',
                        background: modalShowSlider ? 'var(--navy)' : 'var(--gold)',
                        color: modalShowSlider ? 'white' : 'var(--navy-deep)',
                        fontWeight: 700,
                        fontSize: '0.74rem',
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        padding: '0.55rem 1.2rem',
                        borderRadius: '8px',
                        border: 'none',
                        cursor: 'pointer',
                        zIndex: 15,
                        boxShadow: '0 6px 20px rgba(0,0,0,0.35)',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.45rem',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      <Sparkles size={14} />
                      {modalShowSlider ? 'View Finished Photo' : 'Compare Before / After'}
                    </button>
                  )}
                </div>

                {/* Right: Detailed Information */}
                <div
                  style={{
                    padding: '2.5rem 2.25rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    background: '#FFFFFF',
                  }}
                >
                  <div>
                    {/* Category pill & Year */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.85rem' }}>
                      <span
                        style={{
                          background: 'rgba(201,168,76,0.15)',
                          color: 'var(--gold-dim)',
                          fontSize: '0.68rem',
                          fontWeight: 700,
                          letterSpacing: '0.12em',
                          textTransform: 'uppercase',
                          padding: '0.35rem 0.85rem',
                          borderRadius: '6px',
                        }}
                      >
                        {selectedProject.category}
                      </span>
                      <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                        {selectedProject.date} · {selectedProject.status}
                      </span>
                    </div>

                    <h3
                      style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: '1.85rem',
                        fontWeight: 700,
                        color: 'var(--navy)',
                        margin: '0 0 0.85rem',
                        lineHeight: 1.2,
                      }}
                    >
                      {selectedProject.title}
                    </h3>

                    {/* Metadata chips */}
                    <div
                      style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '1rem',
                        fontSize: '0.84rem',
                        color: 'var(--text-secondary)',
                        marginBottom: '1.25rem',
                        paddingBottom: '1rem',
                        borderBottom: '1px solid rgba(15,30,60,0.08)',
                      }}
                    >
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        <MapPin size={14} color="var(--gold)" /> {selectedProject.location}
                      </span>
                      {selectedProject.area && (
                        <span style={{ fontWeight: 600, color: 'var(--navy)' }}>
                          Size: {selectedProject.area}
                        </span>
                      )}
                      {selectedProject.budget && (
                        <span style={{ fontWeight: 600, color: 'var(--gold-dim)' }}>
                          Budget: {selectedProject.budget}
                        </span>
                      )}
                    </div>

                    <p
                      style={{
                        color: 'var(--text-secondary)',
                        fontSize: '0.92rem',
                        lineHeight: 1.75,
                        marginBottom: '1.5rem',
                      }}
                    >
                      {selectedProject.desc}
                    </p>

                    {/* Highlights tags */}
                    {selectedProject.highlights && selectedProject.highlights.length > 0 && (
                      <div style={{ marginBottom: '1.75rem' }}>
                        <span
                          style={{
                            fontSize: '0.68rem',
                            fontWeight: 700,
                            letterSpacing: '0.14em',
                            textTransform: 'uppercase',
                            color: 'var(--navy)',
                            display: 'block',
                            marginBottom: '0.5rem',
                          }}
                        >
                          Key Highlights
                        </span>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                          {selectedProject.highlights.map((tag) => (
                            <span
                              key={tag}
                              style={{
                                background: '#F6F1EA',
                                color: 'var(--navy)',
                                fontSize: '0.74rem',
                                padding: '0.35rem 0.75rem',
                                borderRadius: '6px',
                                fontWeight: 500,
                              }}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Modal Action Buttons */}
                  <div
                    style={{
                      display: 'flex',
                      gap: '0.85rem',
                      flexWrap: 'wrap',
                      paddingTop: '1.5rem',
                      borderTop: '1px solid rgba(15,30,60,0.08)',
                    }}
                  >
                    <Link
                      href={`/projects/${selectedProject.id}`}
                      className="btn btn-navy"
                      style={{
                        fontSize: '0.8rem',
                        padding: '0.75rem 1.4rem',
                        flex: 1,
                        justifyContent: 'center',
                      }}
                      onClick={() => setSelectedProject(null)}
                    >
                      Case Study Page <ArrowRight size={14} />
                    </Link>
                    <a
                      href="/#contact"
                      className="btn btn-gold"
                      style={{
                        fontSize: '0.8rem',
                        padding: '0.75rem 1.4rem',
                        flex: 1,
                        justifyContent: 'center',
                      }}
                      onClick={() => setSelectedProject(null)}
                    >
                      Inquire About Space
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        /* Full-Width Accordion Container & Flex Panes */
        .accordion-strip {
          display: flex;
          width: 100%;
          gap: 0.85rem;
          height: 500px;
          align-items: stretch;
        }

        .accordion-pane {
          position: relative;
          border-radius: 20px;
          overflow: hidden;
          cursor: pointer;
          flex: 1;
          min-width: 70px;
          height: 100%;
          background: #0B1526;
          box-shadow: 0 6px 20px rgba(15, 30, 60, 0.08);
          transition: flex 0.5s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.3s ease;
        }

        .accordion-pane.is-active {
          flex: 4.5;
          min-width: 360px;
          box-shadow: 0 20px 50px rgba(15, 30, 60, 0.28);
        }

        @media (max-width: 960px) {
          .modal-grid-layout {
            grid-template-columns: 1fr !important;
          }
          .accordion-strip {
            height: 440px !important;
          }
          .accordion-pane {
            min-width: 55px !important;
          }
          .accordion-pane.is-active {
            flex: 3.5 !important;
            min-width: 280px !important;
          }
        }

        @media (max-width: 640px) {
          .accordion-strip {
            overflow-x: auto;
            scroll-snap-type: x mandatory;
            padding-bottom: 0.5rem;
            height: 420px !important;
          }
          .accordion-pane {
            flex: none !important;
            width: 60px !important;
            scroll-snap-align: start;
          }
          .accordion-pane.is-active {
            width: min(280px, calc(100vw - 3rem)) !important;
          }
        }
      `}</style>
    </section>
  );
}
