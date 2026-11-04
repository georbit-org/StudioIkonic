'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  FolderKanban,
  Plus,
  Pencil,
  Trash2,
  Star,
  Image as ImageIcon,
  ExternalLink,
  Search,
} from 'lucide-react';
import { PROJECTS } from '@/lib/data';
import { useDemo } from '@/components/ui/DemoModal';

export default function AdminProjectsPage() {
  const { showPreview } = useDemo();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  const filtered = PROJECTS.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || p.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1
            className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1F1713]"
            style={{ fontFamily: 'var(--font-serif, "Playfair Display", serif)' }}
          >
            Portfolio Management
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-[#786757]">
            Add, update, feature, or manage media galleries for your residential and commercial projects.
          </p>
        </div>

        <button
          onClick={() =>
            showPreview(
              'Add New Project',
              'Launches the project builder wizard: upload high-res photography, specify category, budget, sq ft area, and client description.'
            )
          }
          className="inline-flex items-center gap-2 rounded-xl bg-[#1F1713] px-4 py-2.5 text-xs font-bold text-white shadow hover:bg-[#342721] transition cursor-pointer self-start sm:self-auto"
        >
          <Plus size={16} />
          <span>Add New Project</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 rounded-2xl border border-[#DED4C5] bg-[#FAF7F2] p-4 shadow-xs">
        <div className="relative w-full sm:w-80">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8C7B6B]" />
          <input
            type="text"
            placeholder="Search projects by name or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-xl border border-[#D5C9B8] bg-white py-2 pl-10 pr-4 text-xs text-[#1F1713] placeholder-[#A89886] focus:border-[#C9A84C] focus:outline-none transition"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          {['All', 'Residential', 'Commercial', 'Retail'].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold transition shrink-0 ${
                categoryFilter === cat
                  ? 'bg-[#1F1713] text-white shadow-xs'
                  : 'bg-white border border-[#D5C9B8] text-[#635343] hover:bg-[#EFE8DD]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Table */}
      <div className="rounded-2xl border border-[#DED4C5] bg-[#FAF7F2] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#EFE9DF] text-[#695847] uppercase font-bold tracking-wider">
              <tr>
                <th className="py-3 px-5">Project Details</th>
                <th className="py-3 px-5">Category & Area</th>
                <th className="py-3 px-5">Budget</th>
                <th className="py-3 px-5">Featured</th>
                <th className="py-3 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAE1D3]">
              {filtered.map((project) => (
                <tr key={project.id} className="hover:bg-[#F3EDE3] transition">
                  <td className="py-3.5 px-5">
                    <div className="flex items-center gap-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={project.cover_image}
                        alt={project.title}
                        className="h-12 w-16 rounded-lg object-cover border border-[#D5C9B8] shrink-0"
                      />
                      <div>
                        <div className="font-bold text-[#1F1713] text-sm">{project.title}</div>
                        <div className="text-[11px] text-[#8C7B6B]">
                          {project.location} • {project.date}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="py-3.5 px-5">
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#1F1713]/10 text-[#524436] mb-1">
                      {project.category}
                    </span>
                    <div className="text-[11px] text-[#786757]">{project.area}</div>
                  </td>

                  <td className="py-3.5 px-5">
                    <span className="font-bold text-[#1F1713]">{project.budget}</span>
                    <div className="text-[10px] text-[#2E7D32] font-semibold">{project.status}</div>
                  </td>

                  <td className="py-3.5 px-5">
                    <button
                      onClick={() =>
                        showPreview(
                          `Toggle Featured: ${project.title}`,
                          project.is_featured
                            ? 'Will remove this project from the high-visibility homepage carousel.'
                            : 'Will highlight this project prominently on the homepage hero portfolio.'
                        )
                      }
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold transition ${
                        project.is_featured
                          ? 'bg-[#C9A84C]/25 text-[#7E5E1C] border border-[#C9A84C]/50'
                          : 'bg-[#EAE1D3] text-[#8C7B6B] hover:text-[#524436]'
                      }`}
                    >
                      <Star size={12} className={project.is_featured ? 'fill-[#C9A84C] text-[#C9A84C]' : ''} />
                      <span>{project.is_featured ? 'Featured' : 'Standard'}</span>
                    </button>
                  </td>

                  <td className="py-3.5 px-5 text-right space-x-1.5">
                    <Link
                      href={`/projects/${project.id}`}
                      target="_blank"
                      className="inline-flex p-1.5 rounded-lg border border-[#D5C9B8] bg-white text-[#635343] hover:text-[#1F1713] transition"
                      title="View on site"
                    >
                      <ExternalLink size={14} />
                    </Link>

                    <button
                      onClick={() =>
                        showPreview(
                          `Manage Gallery: ${project.title}`,
                          'Allows drag-and-drop batch image uploads with automatic WebP conversion and responsive thumbnail generation.'
                        )
                      }
                      className="inline-flex p-1.5 rounded-lg border border-[#D5C9B8] bg-white text-[#635343] hover:text-[#1F1713] transition"
                      title="Manage gallery"
                    >
                      <ImageIcon size={14} />
                    </button>

                    <button
                      onClick={() =>
                        showPreview(
                          `Edit Details: ${project.title}`,
                          'Edits title, description, highlights, architectural specifications, and client tags.'
                        )
                      }
                      className="inline-flex p-1.5 rounded-lg border border-[#D5C9B8] bg-white text-[#635343] hover:text-[#1F1713] transition"
                      title="Edit project"
                    >
                      <Pencil size={14} />
                    </button>

                    <button
                      onClick={() =>
                        showPreview(
                          `Delete: ${project.title}`,
                          'Safe deletion dialog: permanently archives the project and deletes media references.'
                        )
                      }
                      className="inline-flex p-1.5 rounded-lg border border-red-200 bg-white text-red-600 hover:bg-red-50 transition"
                      title="Delete project"
                    >
                      <Trash2 size={14} />
                    </button>
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

