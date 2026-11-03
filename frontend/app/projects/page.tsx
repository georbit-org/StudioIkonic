import type { Metadata } from 'next';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import ProjectCard from '../../components/projects/ProjectCard';
import { PROJECTS } from '@/lib/data';
import { Layers } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Our Portfolio — All Projects',
  description:
    'Explore our full collection of luxury interior design projects across Delhi NCR. Residential, commercial and hospitality spaces by Iconic Design.',
};

export default function AllProjectsPage() {
  const categories = ['All', ...Array.from(new Set(PROJECTS.map((p) => p.category)))];

  return (
    <>
      <Navbar />

      <main>
        {/* Page header */}
        <div className="page-header">
          <div className="container">
            {/* Breadcrumb */}
            <nav className="breadcrumb">
              <a href="/">Home</a>
              <span className="breadcrumb-sep">/</span>
              <span className="breadcrumb-current">Projects</span>
            </nav>

            <h1 className="page-header-title" style={{ marginTop: '1.25rem' }}>
              Our Complete Portfolio
            </h1>
            <p className="page-header-sub">
              {PROJECTS.length} luxury projects crafted across Delhi NCR
            </p>
          </div>
        </div>

        {/* Projects section */}
        <section className="section">
          <div className="container">
            {/* Top bar */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '2.5rem',
                background: 'var(--cream)',
                padding: '1rem 1.5rem',
                borderRadius: '12px',
                border: '1px solid var(--border-light)',
                borderLeft: '4px solid var(--gold)',
                flexWrap: 'wrap',
                gap: '0.75rem',
              }}
            >
              <div
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.92rem' }}
              >
                <Layers size={16} color="var(--gold-dim)" />
                Showing <strong style={{ color: 'var(--navy)' }}>&nbsp;{PROJECTS.length}&nbsp;</strong> projects
              </div>
              <div
                style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', letterSpacing: '0.04em', textTransform: 'uppercase' }}
              >
                Sorted by Date · Newest First
              </div>
            </div>

            {/* Grid */}
            <div className="project-grid">
              {PROJECTS.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  showStatus
                  showBudget
                  showArea
                />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
