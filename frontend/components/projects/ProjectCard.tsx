import Link from 'next/link';
import { MapPin, Calendar, Eye } from 'lucide-react';
import { PROJECTS } from '@/lib/data';

type Project = typeof PROJECTS[0];

interface ProjectCardProps {
  project: Project;
  showStatus?: boolean;
  showBudget?: boolean;
  showArea?: boolean;
}

export default function ProjectCard({ project, showStatus, showBudget, showArea }: ProjectCardProps) {
  return (
    <Link href={`/projects/${project.id}`} className="project-card">
      <div className="project-card-img">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={project.cover_image} alt={project.title} loading="lazy" />
        <div className="project-card-overlay">
          <div className="project-card-overlay-text">
            <Eye size={14} /> View Details →
          </div>
        </div>
        <span className="project-badge">{project.category}</span>
        {showStatus && project.status && (
          <span
            style={{
              position: 'absolute',
              top: '1rem',
              left: '1rem',
              background: project.status === 'Completed' ? 'rgba(34,197,94,0.85)' : 'rgba(245,158,11,0.85)',
              color: 'white',
              fontSize: '0.65rem',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              padding: '0.25rem 0.65rem',
              borderRadius: '50px',
              backdropFilter: 'blur(4px)',
            }}
          >
            {project.status}
          </span>
        )}
      </div>

      <div className="project-card-body">
        <h3 className="project-card-title">{project.title}</h3>
        <div className="project-card-meta">
          <span><MapPin size={13} /> {project.location}</span>
          <span><Calendar size={13} /> {project.date}</span>
        </div>
        {(showBudget || showArea) && (
          <div
            style={{
              display: 'flex',
              gap: '1rem',
              marginTop: '0.75rem',
              fontSize: '0.8rem',
              color: 'var(--text-muted)',
            }}
          >
            {showArea && project.area && (
              <span style={{ fontWeight: 600, color: 'var(--navy)' }}>{project.area}</span>
            )}
            {showBudget && project.budget && (
              <span
                style={{
                  fontWeight: 700,
                  color: 'var(--gold-dim)',
                  background: 'rgba(201,168,76,0.1)',
                  padding: '0.15rem 0.5rem',
                  borderRadius: '4px',
                  fontSize: '0.78rem',
                }}
              >
                {project.budget}
              </span>
            )}
          </div>
        )}
      </div>
    </Link>
  );
}
