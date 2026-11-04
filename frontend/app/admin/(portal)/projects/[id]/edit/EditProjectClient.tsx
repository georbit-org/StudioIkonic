'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Save,
  Trash2,
  Upload,
  Image as ImageIcon,
  CheckCircle,
  Plus,
} from 'lucide-react';
import { useMockDb, Project } from '@/lib/mock/store';
import { useFeedback } from '@/lib/mock/feedback';

export default function EditProjectClient({ id }: { id: string }) {
  const projectId = Number(id);
  const router = useRouter();
  const { state, upsertProject } = useMockDb();
  const { toast, confirm } = useFeedback();

  const [project, setProject] = useState<Project | null>(null);

  // Form fields
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [budget, setBudget] = useState('');
  const [area, setArea] = useState('');
  const [status, setStatus] = useState('Completed');
  const [desc, setDesc] = useState('');
  const [isFeatured, setIsFeatured] = useState(false);
  const [gallery, setGallery] = useState<string[]>([]);

  useEffect(() => {
    const found = state.projects.find((p) => p.id === projectId);
    if (found) {
      setProject(found);
      setTitle(found.title);
      setCategory(found.category);
      setLocation(found.location);
      setDate(found.date);
      setBudget(found.budget);
      setArea(found.area);
      setStatus(found.status || 'Completed');
      setDesc(found.desc);
      setIsFeatured(Boolean(found.is_featured));
      setGallery(found.gallery || []);
    }
  }, [projectId, state.projects]);

  if (!project) {
    return (
      <div style={{ padding: '3rem 0', textAlign: 'center' }}>
        <h2 style={{ fontFamily: "'Playfair Display', serif", color: '#0f1e3c' }}>Project Not Found</h2>
        <p style={{ color: '#64748b', fontSize: '0.9rem' }}>The requested project ID #{projectId} does not exist.</p>
        <Link href="/admin" style={{ display: 'inline-block', marginTop: '1rem', color: '#1e40af', fontWeight: 600 }}>
          ← Back to Projects
        </Link>
      </div>
    );
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    upsertProject({
      id: projectId,
      title,
      category,
      location,
      date,
      budget,
      area,
      status,
      desc,
      is_featured: isFeatured,
      gallery,
    });

    toast(`Changes saved to "${title}" (demo)`, 'success');
  };

  const handleDeleteImage = (index: number) => {
    confirm({
      title: 'Remove Photo from Gallery?',
      message: 'This photo will be removed from this project showcase.',
      confirmText: 'Remove Photo',
      onConfirm: () => {
        const updated = gallery.filter((_, i) => i !== index);
        setGallery(updated);
        upsertProject({ id: projectId, gallery: updated });
        toast('Photo removed from project gallery (demo)', 'info');
      },
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      const url = URL.createObjectURL(files[0]);
      const updated = [...gallery, url];
      setGallery(updated);
      upsertProject({ id: projectId, gallery: updated });
      toast('Photo added to project gallery (local preview)', 'success');
    }
  };

  return (
    <div style={{ maxWidth: '960px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Top back navigation */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link
          href="/admin"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            color: '#0f1e3c',
            fontWeight: 700,
            fontSize: '0.86rem',
            textDecoration: 'none',
          }}
        >
          <ArrowLeft size={16} /> Back to Dashboard
        </Link>

        <span style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
          Editing Project ID #{projectId}
        </span>
      </div>

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
        <div style={{ padding: '1.5rem 2rem', borderBottom: '1px solid #f1f5f9' }}>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.5rem', fontWeight: 700, color: '#0f1e3c', margin: 0 }}>
            Edit Project: {project.title}
          </h1>
          <p style={{ margin: '0.25rem 0 0', fontSize: '0.84rem', color: '#64748b' }}>
            Update project metadata, status, spatial specs, and photo gallery.
          </p>
        </div>

        <form onSubmit={handleSave} style={{ padding: '2rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(240px, 100%), 1fr))', gap: '1.5rem' }}>
            <div>
              <label style={labelStyle}>Project Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
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
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>Year</label>
              <input
                type="text"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>Budget</label>
              <input
                type="text"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>Area</label>
              <input
                type="text"
                value={area}
                onChange={(e) => setArea(e.target.value)}
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                style={{ ...inputStyle, cursor: 'pointer' }}
              >
                <option value="Completed">Completed</option>
                <option value="In Progress">In Progress</option>
                <option value="Concept">Concept</option>
              </select>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', paddingTop: '1.75rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600, color: '#0f1e3c' }}>
                <input
                  type="checkbox"
                  checked={isFeatured}
                  onChange={(e) => setIsFeatured(e.target.checked)}
                  style={{ width: '18px', height: '18px', accentColor: '#d4af37' }}
                />
                <span>Feature on Homepage Carousel</span>
              </label>
            </div>
          </div>

          <div style={{ marginTop: '1.5rem' }}>
            <label style={labelStyle}>Detailed Description</label>
            <textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              rows={4}
              style={{ ...inputStyle, resize: 'vertical' }}
            />
          </div>

          {/* Gallery Photos section matching original delete_image feature */}
          <div style={{ marginTop: '2rem', borderTop: '1px solid #f1f5f9', paddingTop: '1.75rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.15rem', fontWeight: 700, color: '#0f1e3c', margin: 0 }}>
                  Project Photo Gallery ({gallery.length} Images)
                </h3>
                <p style={{ margin: '0.2rem 0 0', fontSize: '0.78rem', color: '#64748b' }}>
                  Manage interior views and spatial photographs.
                </p>
              </div>

              <label
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.45rem 0.9rem',
                  borderRadius: '6px',
                  backgroundColor: 'rgba(235, 222, 202, 0.7)',
                  border: '1px solid #d4af37',
                  color: '#0f1e3c',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                <Upload size={14} /> Add Image
                <input type="file" accept="image/*" onChange={handleFileUpload} style={{ display: 'none' }} />
              </label>
            </div>

            {gallery.length === 0 ? (
              <div style={{ padding: '2rem', backgroundColor: '#f8fafc', borderRadius: '8px', textAlign: 'center', color: '#94a3b8', fontSize: '0.85rem' }}>
                No gallery images added yet. Click &quot;Add Image&quot; to upload photography.
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '1rem' }}>
                {gallery.map((imgUrl, idx) => (
                  <div
                    key={idx}
                    style={{
                      position: 'relative',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                      border: '1px solid #e2e8f0',
                      height: '110px',
                    }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={imgUrl}
                      alt={`Gallery ${idx + 1}`}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <button
                      type="button"
                      onClick={() => handleDeleteImage(idx)}
                      title="Remove image"
                      style={{
                        position: 'absolute',
                        top: '6px',
                        right: '6px',
                        backgroundColor: 'rgba(220, 38, 38, 0.85)',
                        border: 'none',
                        borderRadius: '4px',
                        color: 'white',
                        padding: '4px',
                        cursor: 'pointer',
                      }}
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div style={{ marginTop: '2.5rem', display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
            <Link
              href="/admin"
              style={{
                padding: '0.75rem 1.5rem',
                borderRadius: '8px',
                border: '1px solid #cbd5e1',
                backgroundColor: '#ffffff',
                color: '#475569',
                fontWeight: 600,
                fontSize: '0.9rem',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
              }}
            >
              Cancel
            </Link>

            <button
              type="submit"
              style={{
                padding: '0.75rem 1.75rem',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #0f1e3c 0%, #1e40af 100%)',
                color: '#ffffff',
                border: 'none',
                fontWeight: 700,
                fontSize: '0.92rem',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                boxShadow: '0 4px 12px rgba(15, 30, 60, 0.2)',
              }}
            >
              <Save size={15} /> Save Changes
            </button>
          </div>
        </form>
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

