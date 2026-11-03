'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  LayoutGrid, 
  Home, 
  Sofa, 
  Palette, 
  Lightbulb, 
  Building2, 
  ArrowRight 
} from 'lucide-react';
import { SERVICES } from '@/lib/data';

const ICON_MAP: Record<string, React.FC<{ size?: number; className?: string }>> = {
  LayoutGrid, 
  Home, 
  Sofa, 
  Palette, 
  Lightbulb, 
  Building2,
};

const TR = { duration: 0.45, ease: 'easeOut' } as const;

export default function ServicesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section 
      ref={ref}
      id="services"
      className="relative overflow-hidden py-10 sm:py-14 lg:py-16 font-sans"
      style={{ 
        background: '#FAF6F0',
        fontFamily: 'var(--font-sans)',
      }}
    >
      <div 
        style={{
          width: '100%',
          padding: '0 clamp(1.5rem, 4vw, 4rem)',
        }}
      >

        {/* ── 1:3 Main Grid: Left Column (1/4) + Right 3x2 Grid (3/4) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8 items-center w-full">
          
          {/* ── Left Column (1 Part): Title, Quote & CTA ── */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={TR}
            className="lg:col-span-1 flex flex-col justify-center"
          >
            <span 
              className="block text-[0.68rem] font-bold uppercase tracking-[0.22em] text-[#a07a2a] mb-2"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              Full-Suite Expertise
            </span>
            
            <h2 
              className="text-2xl sm:text-3xl lg:text-[2.25rem] font-bold text-[#0f1e3c] leading-[1.15] m-0 tracking-[0.04em] uppercase"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              Our <span className="text-[#a07a2a]">Services</span>
            </h2>

            <div className="w-12 h-[2px] bg-[#c9a84c] my-4 rounded-full" />

            <p 
              className="text-xs sm:text-[0.86rem] text-[#4b5563] leading-relaxed m-0 pr-2 font-normal"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              From spatial ergonomics to bespoke millwork — every facet of your interior transformation is handled with meticulous precision.
            </p>

            <div className="mt-6">
              <a
                href="/#contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[rgba(201,168,76,0.5)] bg-white text-[#0f1e3c] text-[11px] font-bold uppercase tracking-[0.14em] hover:bg-[#c9a84c] hover:text-white hover:border-[#c9a84c] transition-all duration-300 shadow-sm"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                <span>Schedule Visit</span>
                <ArrowRight size={13} />
              </a>
            </div>
          </motion.div>

          {/* ── Right Column (3 Parts): Compact 3x2 Grid (Navbar-styled Font) ── */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
              {SERVICES.map((s, i) => {
                const Icon = ICON_MAP[s.icon] ?? LayoutGrid;

                return (
                  <motion.div
                    key={s.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ ...TR, delay: i * 0.05 }}
                    whileHover={{ y: -4 }}
                    className="group relative flex flex-col justify-between rounded-[18px] bg-white p-5 border border-[rgba(201,168,76,0.2)] shadow-[0_4px_16px_rgba(15,30,60,0.04)] hover:shadow-[0_12px_28px_rgba(15,30,60,0.09)] hover:border-[#c9a84c] transition-all duration-300 overflow-hidden cursor-default min-h-[160px]"
                    style={{
                      backgroundColor: '#FFFFFF',
                      color: 'var(--text-primary)',
                      fontFamily: 'var(--font-sans)',
                    }}
                  >
                    {/* Expanding Top Gold Accent on Hover */}
                    <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-transparent via-[#c9a84c] to-transparent w-0 group-hover:w-full transition-all duration-300" />

                    <div>
                      {/* Top Header: Icon + Number */}
                      <div className="flex items-center justify-between mb-2.5">
                        <div className="w-9 h-9 rounded-xl bg-[#FAF0D7] text-[#a07a2a] flex items-center justify-center group-hover:bg-[#c9a84c] group-hover:text-white transition-all duration-300 shadow-sm">
                          <Icon size={18} />
                        </div>
                        <span 
                          className="text-xs font-bold tracking-wider text-[#c9a84c]/50 group-hover:text-[#a07a2a] transition-colors"
                          style={{ fontFamily: 'var(--font-sans)' }}
                        >
                          0{i + 1}
                        </span>
                      </div>

                      {/* Title styled with clean sans font matching navbar */}
                      <h3 
                        className="text-[0.92rem] sm:text-[0.98rem] font-bold text-[#0f1e3c] group-hover:text-[#0b1526] transition-colors leading-snug tracking-[0.03em] uppercase"
                        style={{ fontFamily: 'var(--font-sans)' }}
                      >
                        {s.title}
                      </h3>

                      {/* Concise Description */}
                      <p 
                        className="text-[0.78rem] sm:text-[0.82rem] text-[#4b5563] leading-relaxed mt-1.5 line-clamp-3 font-normal"
                        style={{ fontFamily: 'var(--font-sans)' }}
                      >
                        {s.desc}
                      </p>
                    </div>

                    {/* Bottom Accent Indicator */}
                    <div className="mt-3 pt-2.5 border-t border-[rgba(15,30,60,0.05)] flex items-center justify-between">
                      <span 
                        className="text-[10px] font-bold tracking-[0.14em] uppercase text-[#a07a2a] opacity-85 group-hover:opacity-100 transition-opacity"
                        style={{ fontFamily: 'var(--font-sans)' }}
                      >
                        Interior Craft
                      </span>
                      <ArrowRight 
                        size={12} 
                        className="text-[#c9a84c] transition-transform duration-300 group-hover:translate-x-1" 
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
