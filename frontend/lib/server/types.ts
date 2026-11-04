export interface GalleryImage {
  id: number;
  url: string;
  caption?: string;
}

export interface Project {
  id: number;
  title: string;
  location: string;
  date: string;
  category: string;
  status: string;
  budget: string;
  area: string;
  desc: string;
  cover_image: string;
  gallery: GalleryImage[];
  is_featured: boolean;
  highlights: string[];
}

export interface Testimonial {
  id: number;
  stars: number;
  text: string;
  name: string;
  role: string;
  initials: string;
  published: boolean;
}

export interface Lead {
  id: number;
  name: string;
  phone: string;
  email: string;
  service?: string;
  budget?: string;
  message: string;
  created_at: string;
  status: 'new' | 'contacted' | 'scheduled';
}

export interface SiteSettings {
  name: string;
  tagline: string;
  phone: string;
  phoneClean: string;
  whatsapp: string;
  email: string;
  location: string;
  mapUrl: string;
  instagram: string;
  facebook: string;
  linkedin: string;

  // Stats
  stat1_value: string;
  stat1_label: string;
  stat2_value: string;
  stat2_label: string;
  stat3_value: string;
  stat3_label: string;
  stat4_value: string;
  stat4_label: string;

  // Founder
  founder_name: string;
  founder_title: string;
  founder_phone: string;
  founder_email: string;
  founder_location: string;
  founder_image: string;

  // Hero & About text
  hero_badge: string;
  hero_title: string;
  hero_desc: string;
  about_subtitle: string;
  about_desc1: string;
  about_desc2: string;
  about_bullet1: string;
  about_bullet2: string;
  about_bullet3: string;
}

export interface SandboxStore {
  projects: Project[];
  testimonials: Testimonial[];
  leads: Lead[];
  settings: SiteSettings;
}

