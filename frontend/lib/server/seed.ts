import { PROJECTS, TESTIMONIALS, SITE, FOUNDER, INITIAL_LEADS } from '@/lib/data';
import { SandboxStore, Project, Testimonial, Lead, SiteSettings } from './types';

export function createInitialSeed(): SandboxStore {
  const seededProjects: Project[] = PROJECTS.map((p) => ({
    id: p.id,
    title: p.title,
    location: p.location,
    date: p.date,
    category: p.category,
    status: p.status,
    budget: p.budget,
    area: p.area,
    desc: p.desc,
    cover_image: p.cover_image,
    gallery: (p.gallery || []).map((url, idx) => ({
      id: idx + 1,
      url,
      caption: `${p.title} view ${idx + 1}`,
    })),
    is_featured: Boolean(p.is_featured),
    highlights: [...(p.highlights || [])],
  }));

  const seededTestimonials: Testimonial[] = TESTIMONIALS.map((t) => ({
    id: t.id,
    stars: t.stars,
    text: t.text,
    name: t.name,
    role: t.role,
    initials: t.initials,
    published: true,
  }));

  const seededLeads: Lead[] = INITIAL_LEADS.map((l, idx) => ({
    id: typeof l.id === 'number' ? l.id : idx + 1,
    name: l.name,
    phone: l.phone,
    email: l.email || '',
    service: l.service || 'Residential',
    budget: l.budget || 'Flexible',
    message: l.message || '',
    created_at: l.created_at,
    status: l.status,
  }));

  const seededSettings: SiteSettings = {
    name: SITE.name,
    tagline: SITE.tagline,
    phone: SITE.phone,
    phoneClean: SITE.phoneClean,
    whatsapp: SITE.whatsapp,
    email: SITE.email,
    location: SITE.location,
    mapUrl: SITE.mapUrl,
    instagram: SITE.instagram,
    facebook: SITE.facebook,
    linkedin: SITE.linkedin,

    stat1_value: '100+',
    stat1_label: 'Projects Delivered',
    stat2_value: '25',
    stat2_label: 'Years of Mastery',
    stat3_value: '50+',
    stat3_label: 'Expert Designers',
    stat4_value: '99%',
    stat4_label: 'Client Satisfaction',

    founder_name: FOUNDER.name,
    founder_title: FOUNDER.title,
    founder_phone: SITE.phone,
    founder_email: SITE.email,
    founder_location: SITE.location,
    founder_image: FOUNDER.image,

    hero_badge: "India's Premier Interior Designers",
    hero_title: 'Crafting Iconic Interiors',
    hero_desc:
      'With over 25 years of experience, Iconic Design delivers premium interior design, luxury decoration, and bespoke residential environments tailored to your lifestyle.',
    about_subtitle: 'Your Trusted Design Partner',
    about_desc1: FOUNDER.bio1,
    about_desc2: FOUNDER.bio2,
    about_bullet1: 'Bespoke Furniture & Material Curation',
    about_bullet2: 'End-to-End Space Planning & Execution',
    about_bullet3: 'Immaculate Craftsmanship & Finishing',
  };

  return {
    projects: seededProjects,
    testimonials: seededTestimonials,
    leads: seededLeads,
    settings: seededSettings,
  };
}

