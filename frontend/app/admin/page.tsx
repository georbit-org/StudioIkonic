'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  FolderKanban,
  Star,
  Users,
  Eye,
  Plus,
  ArrowUpRight,
  TrendingUp,
  Clock,
  Sparkles,
  Phone,
  Mail,
  CheckCircle,
} from 'lucide-react';
import { PROJECTS, TESTIMONIALS, INITIAL_LEADS, Lead } from '@/lib/data';
import { useDemo } from '@/components/ui/DemoModal';

export default function AdminDashboardPage() {
  const { showPreview } = useDemo();
  const [leads, setLeads] = useState<Lead[]>(INITIAL_LEADS);

  useEffect(() => {
    // Read session leads if client submitted test inquiries
    try {
      const stored = sessionStorage.getItem('demo_leads');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setLeads([...parsed, ...INITIAL_LEADS]);
        }
      }
    } catch {
      // ignore
    }
  }, []);

  const featuredCount = PROJECTS.filter((p) => p.is_featured).length;

  return (
    <div className="space-y-8">
      {/* Top Banner / Heading */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1
            className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1F1713]"
            style={{ fontFamily: 'var(--font-serif, "Playfair Display", serif)' }}
          >
            Studio Overview
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-[#786757]">
            Live preview of your interior design portfolio management metrics and inquiries.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => showPreview('New Project Creation', 'Opens the modal to upload hero images, input square footage, budget, and project details.')}
            className="inline-flex items-center gap-2 rounded-xl bg-[#1F1713] px-4 py-2.5 text-xs font-bold text-white shadow hover:bg-[#342721] transition cursor-pointer"
          >
            <Plus size={15} />
            <span>Add New Project</span>
          </button>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-[#DED4C5] bg-[#FAF7F2] p-5 shadow-xs">
          <div className="flex items-center justify-between text-[#8A7968]">
            <span className="text-xs font-bold uppercase tracking-wider">Portfolio Items</span>
            <div className="h-9 w-9 rounded-xl bg-[#EFE8DD] flex items-center justify-center text-[#1F1713]">
              <FolderKanban size={18} />
            </div>
          </div>
          <div className="mt-3 text-3xl font-extrabold text-[#1F1713]">{PROJECTS.length}</div>
          <div className="mt-1 flex items-center gap-1.5 text-xs text-[#2E7D32]">
            <TrendingUp size={14} />
            <span>{featuredCount} featured on homepage</span>
          </div>
        </div>

        <div className="rounded-2xl border border-[#DED4C5] bg-[#FAF7F2] p-5 shadow-xs">
          <div className="flex items-center justify-between text-[#8A7968]">
            <span className="text-xs font-bold uppercase tracking-wider">Client Inquiries</span>
            <div className="h-9 w-9 rounded-xl bg-[#EFE8DD] flex items-center justify-center text-[#1F1713]">
              <Users size={18} />
            </div>
          </div>
          <div className="mt-3 text-3xl font-extrabold text-[#1F1713]">{leads.length}</div>
          <div className="mt-1 flex items-center gap-1.5 text-xs text-[#C9A84C]">
            <Clock size={14} />
            <span>Active leads awaiting reply</span>
          </div>
        </div>

        <div className="rounded-2xl border border-[#DED4C5] bg-[#FAF7F2] p-5 shadow-xs">
          <div className="flex items-center justify-between text-[#8A7968]">
            <span className="text-xs font-bold uppercase tracking-wider">Reviews & Ratings</span>
            <div className="h-9 w-9 rounded-xl bg-[#EFE8DD] flex items-center justify-center text-[#1F1713]">
              <Star size={18} />
            </div>
          </div>
          <div className="mt-3 text-3xl font-extrabold text-[#1F1713]">{TESTIMONIALS.length}</div>
          <div className="mt-1 flex items-center gap-1.5 text-xs text-[#2E7D32]">
            <CheckCircle size={14} />
            <span>100% 5-Star verified reviews</span>
          </div>
        </div>

        <div className="rounded-2xl border border-[#DED4C5] bg-[#FAF7F2] p-5 shadow-xs">
          <div className="flex items-center justify-between text-[#8A7968]">
            <span className="text-xs font-bold uppercase tracking-wider">Site Performance</span>
            <div className="h-9 w-9 rounded-xl bg-[#EFE8DD] flex items-center justify-center text-[#1F1713]">
              <Eye size={18} />
            </div>
          </div>
          <div className="mt-3 text-3xl font-extrabold text-[#1F1713]">99.8%</div>
          <div className="mt-1 flex items-center gap-1.5 text-xs text-[#2E7D32]">
            <span>Fast CDN static response</span>
          </div>
        </div>
      </div>

      {/* Recent Inquiries Table */}
      <div className="rounded-2xl border border-[#DED4C5] bg-[#FAF7F2] shadow-xs overflow-hidden">
        <div className="p-5 sm:p-6 border-b border-[#E7DDCE] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-[#1F1713]">Recent Client Inquiries</h2>
            <p className="text-xs text-[#786757]">
              Any enquiry sent through the website contact form updates here in real-time.
            </p>
          </div>
          <Link
            href="/admin/leads"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#8A6A24] hover:text-[#5E4714] transition"
          >
            <span>View All Leads ({leads.length})</span>
            <ArrowUpRight size={14} />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#EFE9DF] text-[#695847] uppercase font-bold tracking-wider">
              <tr>
                <th className="py-3 px-5">Client</th>
                <th className="py-3 px-5">Contact</th>
                <th className="py-3 px-5">Service / Scope</th>
                <th className="py-3 px-5">Budget</th>
                <th className="py-3 px-5">Status</th>
                <th className="py-3 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAE1D3]">
              {leads.slice(0, 5).map((lead) => (
                <tr key={lead.id} className="hover:bg-[#F3EDE3] transition">
                  <td className="py-3.5 px-5">
                    <div className="font-bold text-[#1F1713] text-sm">{lead.name}</div>
                    <div className="text-[11px] text-[#8C7B6B]">{lead.created_at}</div>
                  </td>
                  <td className="py-3.5 px-5 space-y-1">
                    <div className="flex items-center gap-1.5 text-[#4E3F31]">
                      <Phone size={12} className="text-[#C9A84C]" />
                      <span>{lead.phone}</span>
                    </div>
                    {lead.email && (
                      <div className="flex items-center gap-1.5 text-[#736353]">
                        <Mail size={12} className="text-[#8C7B6B]" />
                        <span>{lead.email}</span>
                      </div>
                    )}
                  </td>
                  <td className="py-3.5 px-5 text-[#4E3F31] font-medium">
                    {lead.service || 'Interior Consultation'}
                  </td>
                  <td className="py-3.5 px-5">
                    <span className="font-semibold text-[#1F1713]">{lead.budget || 'Flexible'}</span>
                  </td>
                  <td className="py-3.5 px-5">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        lead.status === 'new'
                          ? 'bg-[#C9A84C]/20 text-[#8C6B1C]'
                          : lead.status === 'contacted'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {lead.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-5 text-right space-x-2">
                    <button
                      onClick={() => showPreview(`Follow-up with ${lead.name}`, `In production, this triggers an instant WhatsApp chat or dialer directly to ${lead.phone}.`)}
                      className="px-2.5 py-1 rounded-lg border border-[#D5C9B8] bg-white font-semibold text-[#524436] hover:bg-[#FAF7F2] transition"
                    >
                      Follow Up
                    </button>
                    <button
                      onClick={() => showPreview(`Delete lead #${lead.id}`, 'Deletes this inquiry record from the database.')}
                      className="px-2.5 py-1 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Showcase Actions */}
      <div className="rounded-2xl border border-[#C9A84C]/30 bg-gradient-to-r from-[#FAF7F2] to-[#F5ECE0] p-6 shadow-xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#937123]">
            <Sparkles size={15} />
            <span>Client Demonstration Sandbox</span>
          </div>
          <h3 className="mt-1 text-base font-bold text-[#1F1713]">
            Test drive every admin feature without fear
          </h3>
          <p className="mt-0.5 text-xs text-[#736353]">
            All toggle switches, project editors, and deletion dialogs demonstrate their exact workflow with zero risk of database corruption.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/admin/projects"
            className="rounded-xl border border-[#C9A84C] bg-white px-4 py-2 text-xs font-bold text-[#8C6D27] shadow-xs hover:bg-[#FAF7F2] transition"
          >
            Manage Projects
          </Link>
          <Link
            href="/admin/settings"
            className="rounded-xl bg-[#1F1713] px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-[#342721] transition"
          >
            Site Settings
          </Link>
        </div>
      </div>
    </div>
  );
}

