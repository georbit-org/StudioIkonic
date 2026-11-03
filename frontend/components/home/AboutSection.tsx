'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Check, Phone, Mail, MapPin } from 'lucide-react';
import { FOUNDER, SITE } from '@/lib/data';

const CHECKLIST = [
  'Bespoke Furniture & Curated Materials',
  'End-to-End Space Planning & Execution',
  'Master Craftsmanship with Guaranteed Timelines',
];

const CONTACT_ITEMS = [
  {
    Icon: Phone,
    label: 'DIRECT LINE',
    value: SITE.phone,
    href: `tel:${SITE.phoneClean}`,
  },
  {
    Icon: Mail,
    label: "FOUNDER'S DESK",
    value: SITE.email,
    href: `mailto:${SITE.email}`,
  },
  {
    Icon: MapPin,
    label: 'STUDIO LOCATION',
    value: SITE.location,
    href: SITE.mapUrl,
  },
];

const TR = { duration: 0.6, ease: [0.22, 1, 0.36, 1] } as const;

export default function AboutSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section
      ref={ref}
      id="about"
      className="relative overflow-hidden py-16 sm:py-24"
      style={{ background: '#FAF6F0' }}
    >
      {/* Decorative luxury gold ribbon curves */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        {/* Top-left golden sweeping arcs */}
        <svg
          className="absolute -top-16 -left-20 w-[420px] h-[420px] text-[#C9A84C]/30 sm:w-[540px] sm:h-[540px]"
          viewBox="0 0 500 500"
          fill="none"
        >
          <path
            d="M -40 260 C 60 90, 240 -10, 480 30"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M -20 320 C 90 140, 290 20, 520 70"
            stroke="currentColor"
            strokeWidth="1"
          />
          <path
            d="M -60 200 C 40 40, 200 -30, 420 10"
            stroke="currentColor"
            strokeWidth="0.75"
            strokeDasharray="4 4"
          />
        </svg>

        {/* Bottom-right golden sweeping arcs */}
        <svg
          className="absolute -bottom-20 -right-20 w-[420px] h-[420px] text-[#C9A84C]/25 sm:w-[560px] sm:h-[560px]"
          viewBox="0 0 500 500"
          fill="none"
        >
          <path
            d="M 540 240 C 420 380, 220 480, -20 440"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M 520 160 C 370 320, 160 440, -40 400"
            stroke="currentColor"
            strokeWidth="1"
          />
        </svg>

        {/* Subtle warm glow circles */}
        <div className="absolute top-1/4 -left-32 w-80 h-80 rounded-full bg-[#E8C97A]/10 blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-80 h-80 rounded-full bg-[#E8C97A]/10 blur-3xl" />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-[1240px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-stretch">
          
          {/* ── LEFT BENTO CARD: Founder Portrait & Badges ────────────── */}
          <motion.div
            className="lg:col-span-5 flex flex-col"
            initial={{ opacity: 0, x: -35 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={TR}
          >
            <div className="relative w-full h-full min-h-[480px] sm:min-h-[540px] lg:min-h-[580px] rounded-[26px] sm:rounded-[30px] overflow-hidden border border-white/80 shadow-[0_12px_40px_rgba(15,30,60,0.06)] bg-white group">
              
              {/* Founder Photo */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={FOUNDER.image}
                alt={`${FOUNDER.name} — ${FOUNDER.title}`}
                className="absolute inset-0 w-full h-full object-cover object-[center_15%] transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />

              {/* Subtle top & bottom photo gradient vignettes */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/15" />

              {/* 25+ Years Experience Badge (Top Right) */}
              <div className="absolute top-4 right-4 sm:top-5 sm:right-5 z-20 w-[68px] h-[68px] sm:w-[76px] sm:h-[76px] rounded-full p-[2px] bg-gradient-to-br from-[#E8CA78] via-[#C9A84C] to-[#987428] shadow-[0_8px_24px_rgba(201,168,76,0.4)]">
                <div className="w-full h-full rounded-full border border-white/50 bg-gradient-to-br from-[#E2B755] to-[#B38D33] flex flex-col items-center justify-center text-center">
                  <span className="font-serif text-xl sm:text-2xl font-black text-[#0B1526] leading-none">
                    25+
                  </span>
                  <span className="text-[9px] sm:text-[10px] font-extrabold tracking-[0.14em] uppercase text-[#0B1526] mt-0.5">
                    YEARS
                  </span>
                </div>
              </div>

              {/* Founder Floating Nameplate Card (Bottom) */}
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-5 sm:left-5 sm:right-5 z-20 rounded-[20px] bg-[#0B1626]/95 backdrop-blur-md border border-[rgba(201,168,76,0.3)] p-4 sm:p-5 shadow-[0_12px_32px_rgba(6,15,31,0.55)]">
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-white tracking-wide">
                  {FOUNDER.name}
                </h3>
                <p className="text-[10px] sm:text-[11px] font-bold tracking-[0.18em] uppercase text-[#C9A84C] mt-1">
                  {FOUNDER.title}
                </p>
                <div className="w-10 h-[2px] bg-[#C9A84C] mt-2.5 rounded-full" />
              </div>

            </div>
          </motion.div>

          {/* ── RIGHT BENTO STACK: 4 Modular Cards ────────────────────── */}
          <div className="lg:col-span-7 flex flex-col gap-4 sm:gap-4.5 justify-between">
            
            {/* Card 1: Title & Philosophy Header */}
            <motion.div
              className="rounded-[22px] sm:rounded-[24px] bg-white/95 backdrop-blur-sm p-6 sm:p-7 border border-[#0f1e3c]/[0.06] shadow-[0_4px_20px_rgba(15,30,60,0.03)] hover:shadow-md transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ ...TR, delay: 0.1 }}
            >
              <div className="flex items-center gap-3">
                <span className="text-[11px] font-bold tracking-[0.22em] uppercase text-[#A07A2A]">
                  DESIGN PHILOSOPHY
                </span>
                <div className="h-[1.5px] w-20 sm:w-32 bg-[#C9A84C]/60 rounded-full" />
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-[2.35rem] font-bold text-[#0F1E3C] mt-2.5 leading-[1.2]">
                Your Trusted{' '}
                <span className="font-serif italic font-normal text-[#C9A84C]">
                  Design
                </span>{' '}
                Partner
              </h2>
            </motion.div>

            {/* Card 2: Narrative / Bio */}
            <motion.div
              className="rounded-[22px] sm:rounded-[24px] bg-white/95 backdrop-blur-sm p-6 sm:p-7 border border-[#0f1e3c]/[0.06] shadow-[0_4px_20px_rgba(15,30,60,0.03)] hover:shadow-md transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ ...TR, delay: 0.18 }}
            >
              <p className="text-sm sm:text-[0.95rem] text-[#374151] leading-[1.8] font-normal">
                {FOUNDER.bio1}
              </p>
            </motion.div>

            {/* Card 3: Key Pillars / Checklist */}
            <motion.div
              className="rounded-[22px] sm:rounded-[24px] bg-white/95 backdrop-blur-sm p-6 sm:p-7 border border-[#0f1e3c]/[0.06] shadow-[0_4px_20px_rgba(15,30,60,0.03)] hover:shadow-md transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ ...TR, delay: 0.26 }}
            >
              <ul className="space-y-3.5">
                {CHECKLIST.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 text-sm sm:text-[0.95rem] font-medium text-[#1F2937]"
                  >
                    <span className="w-6 h-6 rounded-full bg-[#FAF0D7] text-[#A07A2A] flex items-center justify-center shrink-0 shadow-sm">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Card 4: Contact Trio Bento Row */}
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-3.5"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ ...TR, delay: 0.34 }}
            >
              {CONTACT_ITEMS.map(({ Icon, label, value, href }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="group rounded-[20px] bg-white/95 backdrop-blur-sm p-4 sm:p-5 border border-[#0f1e3c]/[0.06] shadow-[0_4px_20px_rgba(15,30,60,0.03)] flex items-center gap-3.5 hover:border-gold/50 hover:shadow-md transition-all duration-300"
                >
                  <div className="w-11 h-11 rounded-2xl bg-[#FAF0D7] text-[#A07A2A] flex items-center justify-center shrink-0 group-hover:bg-[#C9A84C] group-hover:text-white transition-colors duration-300 shadow-sm">
                    <Icon className="w-5 h-5 stroke-[2]" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="block text-[10px] font-bold uppercase tracking-[0.14em] text-[#9CA3AF]">
                      {label}
                    </span>
                    <span className="block text-xs sm:text-[0.85rem] font-bold text-[#0F1E3C] mt-0.5 truncate group-hover:text-gold-dim transition-colors">
                      {value}
                    </span>
                  </div>
                </a>
              ))}
            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
}
