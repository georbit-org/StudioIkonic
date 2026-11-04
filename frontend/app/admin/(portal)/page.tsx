'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  FolderKanban,
  Star,
  Plus,
  Pencil,
  Trash2,
  ExternalLink,
  Upload,
  AlertCircle,
  TrendingUp,
} from 'lucide-react';
import { useMockDb, Project } from '@/lib/mock/store';
import { useFeedback } from '@/lib/mock/feedback';

export default function AdminProjectsDashboard() {
  const { state, toggleFeatured, deleteProject, upsertProject } = useMockDb();
  const { toast, confirm } = useFeedback();

  // Add project form state
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Residential');
  const [location, setLocation] = useState('Sector 56, Gurgaon');
  const [date, setDate] = useState(String(new Date().getFullYear()));
  const [budget, setBudget] = useState('₹75L');
  const [area, setArea] = useState('3,500 sq ft');
  const [desc, setDesc] = useState('');
  const [coverUrl, setCoverUrl] = useState('/uploads/interior3.jpg');

  const featuredCount = state.projects.filter((p) => p.is_featured).length;

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      toast('Project title is required', 'error');
      return;
    }

    const created = upsertProject({
      title,
      category,
      location,
      date,
      budget,
      area,
      desc: desc || `${title} crafted with bespoke finishes and architectural detail.`,
      cover_image: coverUrl,
      is_featured: false,
      status: 'Completed',
    });

    toast(`Project "${created.title}" created successfully (demo)`, 'success');
    setTitle('');
    setDesc('');
  };

  const handleToggleFeature = (project: Project) => {
    const res = toggleFeatured(project.id);
    if (res.success) {
      toast(res.message || 'Featured status updated', 'success');
    } else {
      toast(res.message || 'Cannot feature project', 'error');
    }
  };

  const handleDeleteProject = (project: Project) => {
    confirm({
      title: `Delete "${project.title}"?`,
      message: 'Are you sure you want to delete this project? It will be removed from your portfolio showcase.',
      confirmText: 'Delete Project',
      onConfirm: () => {
        deleteProject(project.id);
        toast(`Project "${project.title}" deleted (demo)`, 'info');
      },
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Header bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '1.85rem',
              fontWeight: 700,
              color: '#0f1e3c',
              margin: 0,
            }}
          >
            Portfolio & Project Management
          </h1>
          <p style={{ margin: '0.25rem 0 0', fontSize: '0.84rem', color: '#64748b' }}>
            Manage the project showcase, homepage carousel highlights, and spatial photography.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div
            style={{
              padding: '0.4rem 0.85rem',
              borderRadius: '8px',
              backgroundColor: featuredCount >= 6 ? 'rgba(220, 53, 69, 0.1)' : 'rgba(212, 175, 55, 0.15)',
              border: `1px solid ${featuredCount >= 6 ? '#fca5a5' : '#d4af37'}`,
              color: featuredCount >= 6 ? '#dc2626' : '#856404',
              fontSize: '0.8rem',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
            }}
          >
            <Star size={14} className={featuredCount > 0 ? 'fill-current' : ''} />
            <span>Featured: {featuredCount} / 6 max</span>
          </div>
        </div>
      </div>

      {/* Card 1: Add New Project Form matching original Flask admin.html */}
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
          borderTop: '4px solid #d4af37',
          borderLeft: '1px solid rgba(0,0,0,0.06)',
          borderRight: '1px solid rgba(0,0,0,0.06)',
          borderBottom: '1px solid rgba(0,0,0,0.06)',
          overflow: 'hidden',
        }}
      >
        <div style={{ padding: '1.25rem 1.75rem', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <Plus size={18} color="#d4af37" />
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.2rem', fontWeight: 700, color: '#0f1e3c', margin: 0 }}>
            Add New Project
          </h2>
        </div>

        <form onSubmit={handleCreateProject} style={{ padding: '1.75rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
            <div>
              <label style={labelStyle}>Project Title *</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Magnolias Golf Villa"
                required
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                style={{ ...inputStyle, cursor: 'pointer' }}
              >
                <option value="Residential">Residential</option>
                <option value="Commercial">Commercial</option>
                <option value="Retail">Retail</option>
                <option value="Hospitality">Hospitality</option>
              </select>
            </div>

            <div>
              <label style={labelStyle}>Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="DLF Phase 5, Gurgaon"
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>Year</label>
              <input
                type="text"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                placeholder="2024"
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>Budget (Estimated)</label>
              <input
                type="text"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                placeholder="₹85L"
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>Area (Sq Ft)</label>
              <input
                type="text"
                value={area}
                onChange={(e) => setArea(e.target.value)}
                placeholder="4,200 sq ft"
                style={inputStyle}
              />
            </div>
          </div>

          <div style={{ marginTop: '1.25rem' }}>
            <label style={labelStyle}>Cover Image (Choose or enter path)</label>
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
              <input
                type="text"
                value={coverUrl}
                onChange={(e) => setCoverUrl(e.target.value)}
                style={{ ...inputStyle, flex: 1 }}
              />
              <select
                onChange={(e) => setCoverUrl(e.target.value)}
                value={coverUrl}
                style={{ ...inputStyle, width: 'auto', cursor: 'pointer' }}
              >
                <option value="/uploads/interior0.jpg">Interior Sample 0</option>
                <option value="/uploads/interior1.jpg">Interior Sample 1</option>
                <option value="/uploads/interior2.jpg">Interior Sample 2</option>
                <option value="/uploads/interior3.jpg">Interior Sample 3</option>
                <option value="/uploads/interior4.jpg">Interior Sample 4</option>
              </select>
            </div>
          </div>

          <div style={{ marginTop: '1.25rem' }}>
            <label style={labelStyle}>Short Description (For Project Detail & Cards)</label>
            <textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="Full architectural description, bespoke finishes, and custom styling narrative..."
              rows={3}
              style={{ ...inputStyle, resize: 'vertical' }}
            />
          </div>

          <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end' }}>
            <button
              type="submit"
              style={{
                padding: '0.8rem 2rem',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #0f1e3c 0%, #1e40af 100%)',
                color: '#ffffff',
                border: 'none',
                fontWeight: 700,
                fontSize: '0.95rem',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                boxShadow: '0 4px 12px rgba(15, 30, 60, 0.2)',
              }}
            >
              <Plus size={16} /> Create Project
            </button>
          </div>
        </form>
      </div>

      {/* Card 2: Existing Projects Table matching original Flask admin.html */}
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
          border: '1px solid rgba(0,0,0,0.06)',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            padding: '1.25rem 1.75rem',
            borderBottom: '1px solid #f1f5f9',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <FolderKanban size={18} color="#d4af37" />
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.2rem', fontWeight: 700, color: '#0f1e3c', margin: 0 }}>
              Existing Portfolio Projects ({state.projects.length})
            </h2>
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.84rem' }}>
            <thead style={{ backgroundColor: 'rgba(235, 222, 202, 0.4)', borderBottom: '1px solid #e2e8f0', color: '#475569' }}>
              <tr>
                <th style={{ padding: '0.85rem 1.25rem', fontWeight: 700 }}>Project</th>
                <th style={{ padding: '0.85rem 1.25rem', fontWeight: 700 }}>Category & Location</th>
                <th style={{ padding: '0.85rem 1.25rem', fontWeight: 700 }}>Budget</th>
                <th style={{ padding: '0.85rem 1.25rem', fontWeight: 700 }}>Featured on Home</th>
                <th style={{ padding: '0.85rem 1.25rem', fontWeight: 700, textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {state.projects.map((project) => (
                <tr
                  key={project.id}
                  style={{ borderBottom: '1px solid #f1f5f9', transition: 'background-color 0.15s' }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#fafafa')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  <td style={{ padding: '1rem 1.25rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={project.cover_image}
                        alt={project.title}
                        style={{
                          height: '46px',
                          width: '64px',
                          borderRadius: '6px',
                          objectFit: 'cover',
                          border: '1px solid #e2e8f0',
                        }}
                      />
                      <div>
                        <div style={{ fontWeight: 700, color: '#0f1e3c', fontSize: '0.9rem' }}>{project.title}</div>
                        <div style={{ fontSize: '0.74rem', color: '#94a3b8' }}>ID: #{project.id} • {project.date}</div>
                      </div>
                    </div>
                  </td>

                  <td style={{ padding: '1rem 1.25rem' }}>
                    <span
                      style={{
                        display: 'inline-block',
                        padding: '0.2rem 0.55rem',
                        borderRadius: '4px',
                        backgroundColor: '#f1f5f9',
                        color: '#475569',
                        fontSize: '0.72rem',
                        fontWeight: 600,
                        marginBottom: '0.25rem',
                      }}
                    >
                      {project.category}
                    </span>
                    <div style={{ fontSize: '0.78rem', color: '#64748b' }}>{project.location}</div>
                  </td>

                  <td style={{ padding: '1rem 1.25rem' }}>
                    <div style={{ fontWeight: 700, color: '#0f1e3c' }}>{project.budget}</div>
                    <div style={{ fontSize: '0.74rem', color: '#16a34a' }}>{project.status}</div>
                  </td>

                  <td style={{ padding: '1rem 1.25rem' }}>
                    <button
                      onClick={() => handleToggleFeature(project)}
                      style={{
                        padding: '0.35rem 0.75rem',
                        borderRadius: '9999px',
                        border: project.is_featured ? '1px solid #d4af37' : '1px solid #cbd5e1',
                        backgroundColor: project.is_featured ? 'rgba(212, 175, 55, 0.15)' : '#f8fafc',
                        color: project.is_featured ? '#856404' : '#64748b',
                        fontWeight: 700,
                        fontSize: '0.75rem',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                        transition: 'all 0.2s',
                      }}
                    >
                      <Star size={13} className={project.is_featured ? 'fill-current' : ''} />
                      <span>{project.is_featured ? 'Featured' : 'Standard'}</span>
                    </button>
                  </td>

                  <td style={{ padding: '1rem 1.25rem', textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                      <Link
                        href={`/projects/${project.id}`}
                        target="_blank"
                        title="View live page"
                        style={actionBtnStyle}
                      >
                        <ExternalLink size={13} />
                      </Link>

                      <Link
                        href={`/admin/projects/${project.id}/edit`}
                        title="Edit project details"
                        style={{ ...actionBtnStyle, color: '#1e40af' }}
                      >
                        <Pencil size={13} />
                      </Link>

                      <button
                        onClick={() => handleDeleteProject(project)}
                        title="Delete project"
                        style={{ ...actionBtnStyle, color: '#dc2626' }}
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '0.8rem',
  fontWeight: 700,
  color: '#334155',
  marginBottom: '0.35rem',
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '0.65rem 0.85rem',
  borderRadius: '6px',
  border: '1.5px solid #cbd5e1',
  fontSize: '0.88rem',
  fontFamily: "'Poppins', sans-serif",
  outline: 'none',
  backgroundColor: '#ffffff',
};

const actionBtnStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '0.4rem 0.65rem',
  borderRadius: '6px',
  border: '1px solid #cbd5e1',
  backgroundColor: '#ffffff',
  color: '#475569',
  cursor: 'pointer',
  textDecoration: 'none',
};
