'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { PROJECTS as INITIAL_PROJECTS, TESTIMONIALS as INITIAL_TESTIMONIALS, SITE as INITIAL_SITE, INITIAL_LEADS, Lead } from '@/lib/data';

export type { Lead };

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
  gallery: string[];
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
  published?: boolean;
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
}

export interface MockDbState {
  projects: Project[];
  testimonials: Testimonial[];
  leads: Lead[];
  settings: SiteSettings;
}

const STORAGE_KEY = 'ikonic_demo_db_v2';

function getInitialState(): MockDbState {
  return {
    projects: INITIAL_PROJECTS.map((p) => ({ ...p })),
    testimonials: INITIAL_TESTIMONIALS.map((t) => ({ ...t, published: true })),
    leads: [...INITIAL_LEADS],
    settings: { ...INITIAL_SITE },
  };
}

interface MockDbContextType {
  state: MockDbState;
  isLoaded: boolean;
  toggleFeatured: (id: number) => { success: boolean; message?: string };
  deleteProject: (id: number) => void;
  upsertProject: (project: Partial<Project> & { id?: number }) => Project;
  toggleTestimonial: (id: number) => void;
  deleteTestimonial: (id: number) => void;
  reorderTestimonial: (id: number, direction: 'up' | 'down') => void;
  upsertTestimonial: (testimonial: Partial<Testimonial> & { id?: number }) => Testimonial;
  addLead: (lead: Omit<Lead, 'id' | 'created_at'>) => Lead;
  deleteLead: (id: string | number) => void;
  updateSettings: (newSettings: Partial<SiteSettings>) => void;
  resetDb: () => void;
  exportLeadsCsv: () => void;
}

const MockDbContext = createContext<MockDbContextType | null>(null);

export function MockDbProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<MockDbState>(getInitialState);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.projects && parsed.testimonials && parsed.leads && parsed.settings) {
          setState(parsed);
        }
      }
    } catch {
      // Fallback to initial
    }
    setIsLoaded(true);
  }, []);

  const saveState = useCallback((newState: MockDbState) => {
    setState(newState);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
    } catch {
      // ignore
    }
  }, []);

  const toggleFeatured = useCallback((id: number) => {
    const project = state.projects.find((p) => p.id === id);
    if (!project) return { success: false, message: 'Project not found' };

    const currentFeatured = state.projects.filter((p) => p.is_featured);
    if (!project.is_featured && currentFeatured.length >= 6) {
      return {
        success: false,
        message: 'Cannot feature more than 6 projects on homepage. Please unfeature another project first.',
      };
    }

    const updatedProjects = state.projects.map((p) =>
      p.id === id ? { ...p, is_featured: !p.is_featured } : p
    );
    saveState({ ...state, projects: updatedProjects });
    return {
      success: true,
      message: !project.is_featured ? `"${project.title}" is now featured on homepage.` : `"${project.title}" unfeatured.`,
    };
  }, [state, saveState]);

  const deleteProject = useCallback((id: number) => {
    const updated = state.projects.filter((p) => p.id !== id);
    saveState({ ...state, projects: updated });
  }, [state, saveState]);

  const upsertProject = useCallback((data: Partial<Project> & { id?: number }) => {
    let saved: Project;
    if (data.id && state.projects.some((p) => p.id === data.id)) {
      saved = {
        ...(state.projects.find((p) => p.id === data.id)!),
        ...data,
      } as Project;
      const updated = state.projects.map((p) => (p.id === data.id ? saved : p));
      saveState({ ...state, projects: updated });
    } else {
      const newId = Math.max(...state.projects.map((p) => p.id), 0) + 1;
      saved = {
        id: newId,
        title: data.title || 'Untitled Project',
        location: data.location || 'Gurgaon, Haryana',
        date: data.date || String(new Date().getFullYear()),
        category: data.category || 'Residential',
        status: data.status || 'Completed',
        budget: data.budget || '₹50L',
        area: data.area || '3,000 sq ft',
        desc: data.desc || 'Bespoke interior design project crafted by Iconic Design.',
        cover_image: data.cover_image || '/uploads/interior1.jpg',
        gallery: data.gallery || ['/uploads/interior1.jpg', '/uploads/interior2.jpg'],
        is_featured: Boolean(data.is_featured),
        highlights: data.highlights || ['Luxury Finishes', 'Custom Millwork'],
      };
      saveState({ ...state, projects: [saved, ...state.projects] });
    }
    return saved;
  }, [state, saveState]);

  const toggleTestimonial = useCallback((id: number) => {
    const updated = state.testimonials.map((t) =>
      t.id === id ? { ...t, published: !(t.published !== false) } : t
    );
    saveState({ ...state, testimonials: updated });
  }, [state, saveState]);

  const deleteTestimonial = useCallback((id: number) => {
    const updated = state.testimonials.filter((t) => t.id !== id);
    saveState({ ...state, testimonials: updated });
  }, [state, saveState]);

  const reorderTestimonial = useCallback((id: number, direction: 'up' | 'down') => {
    const index = state.testimonials.findIndex((t) => t.id === id);
    if (index === -1) return;
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === state.testimonials.length - 1) return;

    const list = [...state.testimonials];
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    const temp = list[index];
    list[index] = list[targetIdx];
    list[targetIdx] = temp;
    saveState({ ...state, testimonials: list });
  }, [state, saveState]);

  const upsertTestimonial = useCallback((data: Partial<Testimonial> & { id?: number }) => {
    let saved: Testimonial;
    if (data.id && state.testimonials.some((t) => t.id === data.id)) {
      saved = {
        ...(state.testimonials.find((t) => t.id === data.id)!),
        ...data,
      } as Testimonial;
      const updated = state.testimonials.map((t) => (t.id === data.id ? saved : t));
      saveState({ ...state, testimonials: updated });
    } else {
      const newId = Math.max(...state.testimonials.map((t) => t.id), 0) + 1;
      const initials = (data.name || 'Client')
        .split(' ')
        .map((n) => n[0])
        .slice(0, 2)
        .join('')
        .toUpperCase();
      saved = {
        id: newId,
        stars: data.stars || 5,
        text: data.text || 'Flawless design and execution.',
        name: data.name || 'New Client',
        role: data.role || 'Homeowner, Gurgaon',
        initials: data.initials || initials,
        published: true,
      };
      saveState({ ...state, testimonials: [saved, ...state.testimonials] });
    }
    return saved;
  }, [state, saveState]);

  const addLead = useCallback((leadData: Omit<Lead, 'id' | 'created_at'>) => {
    const newLead: Lead = {
      ...leadData,
      id: Date.now(),
      created_at: new Date().toISOString().replace('T', ' ').substring(0, 16),
      status: 'new',
    };
    saveState({ ...state, leads: [newLead, ...state.leads] });
    return newLead;
  }, [state, saveState]);

  const deleteLead = useCallback((id: string | number) => {
    const updated = state.leads.filter((l) => String(l.id) !== String(id));
    saveState({ ...state, leads: updated });
  }, [state, saveState]);

  const updateSettings = useCallback((newSettings: Partial<SiteSettings>) => {
    saveState({
      ...state,
      settings: { ...state.settings, ...newSettings },
    });
  }, [state, saveState]);

  const resetDb = useCallback(() => {
    const fresh = getInitialState();
    saveState(fresh);
  }, [saveState]);

  const exportLeadsCsv = useCallback(() => {
    const headers = ['ID', 'Date', 'Client Name', 'Phone', 'Email', 'Service', 'Budget', 'Status', 'Message'];
    const rows = state.leads.map((l) => [
      String(l.id),
      `"${l.created_at}"`,
      `"${l.name.replace(/"/g, '""')}"`,
      `"${l.phone}"`,
      `"${l.email || ''}"`,
      `"${(l.service || '').replace(/"/g, '""')}"`,
      `"${(l.budget || '').replace(/"/g, '""')}"`,
      `"${l.status}"`,
      `"${(l.message || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `iconic_design_leads_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, [state.leads]);

  return (
    <MockDbContext.Provider
      value={{
        state,
        isLoaded,
        toggleFeatured,
        deleteProject,
        upsertProject,
        toggleTestimonial,
        deleteTestimonial,
        reorderTestimonial,
        upsertTestimonial,
        addLead,
        deleteLead,
        updateSettings,
        resetDb,
        exportLeadsCsv,
      }}
    >
      {children}
    </MockDbContext.Provider>
  );
}

export function useMockDb() {
  const ctx = useContext(MockDbContext);
  if (!ctx) {
    throw new Error('useMockDb must be used within MockDbProvider');
  }
  return ctx;
}
