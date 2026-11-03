// TypeScript interfaces for Iconic Design data models

export interface Project {
  id: number;
  title: string;
  location: string;
  date: string;
  description: string;
  status: string;
  budget: string;
  team_size: string;
  duration: string;
  cover_image: string;
  extended_description?: string;
  scope_of_work?: string;
  scope_heading?: string;
  achievements?: string;
  achievements_heading?: string;
  achievements_subheading?: string;
  is_featured?: number;
}

export interface ProjectImage {
  id: number;
  project_id: number;
  image_path: string;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  text: string;
  stars: number;
  sort_order: number;
  is_active: number;
}

export interface SiteSettings {
  [key: string]: string;
}

export interface StatItem {
  val: string;
  label: string;
}

export interface HomePageData {
  projects: Project[];
  total_projects: number;
  testimonials: Testimonial[];
  stats: {
    stat1_value: string;
    stat1_label: string;
    stat2_value: string;
    stat2_label: string;
    stat3_value: string;
    stat3_label: string;
    stat4_value: string;
    stat4_label: string;
  };
  site_settings: SiteSettings;
}

export interface AllProjectsData {
  projects: Project[];
  current_page: number;
  total_pages: number;
  total_projects: number;
}

export interface ProjectDetailData {
  project: Project | null;
  gallery_images: ProjectImage[];
  related_projects: Project[];
  site_settings: SiteSettings;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  project_type?: string;
  message: string;
}
