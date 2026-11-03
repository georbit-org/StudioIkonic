import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Navbar from '../../../components/layout/Navbar';
import Footer from '../../../components/layout/Footer';
import ProjectCard from '../../../components/projects/ProjectCard';
import { PROJECTS } from '@/lib/data';
import { MapPin, Calendar, Building2, CheckCircle, Home, Phone, Mail, LayoutGrid } from 'lucide-react';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return PROJECTS.map((p) => ({ id: String(p.id) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const project = PROJECTS.find((p) => p.id === Number(id));
  if (!project) return { title: 'Project Not Found' };
  return {
    title: `${project.title} — ${project.location}`,
    description: project.desc,
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { id } = await params;
  const project = PROJECTS.find((p) => p.id === Number(id));
  if (!project) notFound();

  const related = PROJECTS.filter((p) => p.category === project.category && p.id !== project.id).slice(0, 3);

  const META_ITEMS = [
    { icon: MapPin,     label: 'Location',  value: project.location },
    { icon: Calendar,   label: 'Year',       value: project.date },
    { icon: Building2,  label: 'Category',   value: project.category },
    { icon: CheckCircle,label: 'Status',     value: project.status },
    { icon: LayoutGrid, label: 'Area',       value: project.area },
    { icon: Home,       label: 'Budget',     value: project.budget },
  ];

  return (
    <>
      <Navbar />

      <main>
        {/* Page header */}
        <div className="page-header">
          <div className="container">
            <nav className="breadcrumb">
              <a href="/">Home</a>
              <span className="breadcrumb-sep">/</span>
              <a href="/projects">Projects</a>
              <span className="breadcrumb-sep">/</span>
              <span className="breadcrumb-current">{project.title}</span>
            </nav>
            <h1 className="page-header-title" style={{ marginTop: '1.25rem' }}>
              {project.title}
            </h1>
            <p className="page-header-sub">{project.location} · {project.date}</p>
          </div>
        </div>

        {/* Content */}
        <section className="section">
          <div className="container">
            {/* Hero image */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={project.cover_image}
              alt={project.title}
              className="project-hero-img"
            />

            {/* Meta grid */}
            <div className="project-meta-grid" style={{ marginTop: '2rem' }}>
              {META_ITEMS.map(({ icon: Icon, label, value }) => (
                <div key={label} className="project-meta-item">
                  <span className="project-meta-label">
                    <Icon size={12} style={{ display: 'inline', marginRight: '4px' }} />
                    {label}
                  </span>
                  <span className="project-meta-value">{value}</span>
                </div>
              ))}
            </div>

            {/* Two-column layout: description + highlights */}
            <div
              style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '3rem', marginTop: '3rem' }}
              className="detail-grid"
            >
              {/* Description */}
              <div>
                <h2
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.6rem',
                    color: 'var(--navy)',
                    marginBottom: '0.5rem',
                    paddingBottom: '0.75rem',
                    borderBottom: '2px solid var(--gold)',
                  }}
                >
                  About This Project
                </h2>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.9, marginTop: '1.25rem', fontSize: '1rem' }}>
                  {project.desc}
                </p>
              </div>

              {/* Highlights */}
              {project.highlights && project.highlights.length > 0 && (
                <div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '1.3rem',
                      color: 'var(--navy)',
                      marginBottom: '0.5rem',
                      paddingBottom: '0.75rem',
                      borderBottom: '2px solid var(--gold)',
                    }}
                  >
                    Key Highlights
                  </h3>
                  <ul style={{ listStyle: 'none', marginTop: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                    {project.highlights.map((h) => (
                      <li key={h} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <CheckCircle size={17} color="var(--gold-dim)" style={{ flexShrink: 0 }} />
                        <span style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', fontWeight: 500 }}>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Gallery */}
            {project.gallery && project.gallery.length > 0 && (
              <div style={{ marginTop: '3rem' }}>
                <h3
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.4rem',
                    color: 'var(--navy)',
                    marginBottom: '1.25rem',
                    paddingBottom: '0.75rem',
                    borderBottom: '2px solid var(--gold)',
                  }}
                >
                  Project Gallery
                </h3>
                <div className="gallery-grid">
                  {project.gallery.map((src, i) => (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img key={i} src={src} alt={`${project.title} — Gallery ${i + 1}`} className="gallery-img" />
                  ))}
                </div>
              </div>
            )}

            {/* CTA box */}
            <div
              style={{
                marginTop: '3.5rem',
                padding: '2.5rem',
                background: 'var(--cream)',
                borderRadius: '20px',
                border: '1px solid var(--border-medium)',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
              }}
            >
              <div>
                <span className="badge-gold" style={{ marginBottom: '0.75rem', display: 'inline-flex' }}>
                  Interested?
                </span>
                <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: 'var(--navy)', margin: '0.5rem 0' }}>
                  Start Your Next Project With Us
                </h4>
                <p style={{ color: 'var(--text-secondary)', margin: 0, lineHeight: 1.7 }}>
                  Inspired by this project? We&apos;d love to understand your vision and craft a space uniquely yours.
                </p>
              </div>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <a href="mailto:shakirali1203@gmail.com" className="btn btn-navy">
                  <Mail size={15} /> shakirali1203@gmail.com
                </a>
                <a href="tel:+919811685628" className="btn btn-outline">
                  <Phone size={15} /> +91 98116 85628
                </a>
                <Link href="/projects" className="btn btn-outline">
                  ← Back to All Projects
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Related projects */}
        {related.length > 0 && (
          <section style={{ paddingBottom: '5rem' }}>
            <div className="container">
              <h2
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.8rem',
                  color: 'var(--navy)',
                  marginBottom: '2rem',
                  borderBottom: '2px solid var(--border-light)',
                  paddingBottom: '1rem',
                }}
              >
                Similar Projects
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1.5rem' }} className="related-grid">
                {related.map((p) => (
                  <ProjectCard key={p.id} project={p} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />

      <style>{`
        @media (max-width: 900px) {
          .detail-grid { grid-template-columns: 1fr !important; }
          .related-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
