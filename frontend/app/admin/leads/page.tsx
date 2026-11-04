'use client';

import React, { useState, useEffect } from 'react';
import {
  Inbox,
  Phone,
  Mail,
  Calendar,
  Trash2,
  Download,
  CheckCircle,
  Clock,
  Sparkles,
  Search,
  MessageSquare,
} from 'lucide-react';
import { INITIAL_LEADS, Lead } from '@/lib/data';
import { useDemo } from '@/components/ui/DemoModal';

export default function AdminLeadsPage() {
  const { showPreview, showSuccess } = useDemo();
  const [leads, setLeads] = useState<Lead[]>(INITIAL_LEADS);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  useEffect(() => {
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

  const filtered = leads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.phone.includes(searchTerm) ||
      (lead.email && lead.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (lead.message && lead.message.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === 'All' || lead.status === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const handleSimulateQuickLead = () => {
    const sampleLead: Lead = {
      id: Date.now(),
      name: 'Pooja Singhal',
      phone: '+91 98101 23456',
      email: 'pooja.s@gmail.com',
      service: 'Bespoke Furniture & Lighting',
      budget: '₹75L',
      message: 'Need bespoke teakwood dining set and ambient lighting for our Sector 42 terrace penthouse.',
      created_at: new Date().toISOString().replace('T', ' ').substring(0, 16),
      status: 'new',
    };

    const updated = [sampleLead, ...leads];
    setLeads(updated);
    try {
      const stored = sessionStorage.getItem('demo_leads');
      const curr = stored ? JSON.parse(stored) : [];
      sessionStorage.setItem('demo_leads', JSON.stringify([sampleLead, ...curr]));
    } catch {
      // ignore
    }
    showSuccess('Test Lead Generated', 'Added a simulated client enquiry to your leads table!');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1
            className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1F1713]"
            style={{ fontFamily: 'var(--font-serif, "Playfair Display", serif)' }}
          >
            Client Enquiries & Leads
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-[#786757]">
            Prospective clients requesting luxury design consultations, renovations, and site visits.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={handleSimulateQuickLead}
            className="inline-flex items-center gap-2 rounded-xl border border-[#C9A84C] bg-[#C9A84C]/10 px-3.5 py-2.5 text-xs font-bold text-[#805D17] hover:bg-[#C9A84C]/20 transition"
          >
            <Sparkles size={14} className="text-[#C9A84C]" />
            <span>Simulate Lead</span>
          </button>

          <button
            onClick={() =>
              showPreview(
                'Export Leads (CSV)',
                'Downloads a clean CSV spreadsheet with full contact details, time stamps, budgets, and lead notes for your CRM or sales team.'
              )
            }
            className="inline-flex items-center gap-2 rounded-xl bg-[#1F1713] px-4 py-2.5 text-xs font-bold text-white shadow hover:bg-[#342721] transition"
          >
            <Download size={15} />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 rounded-2xl border border-[#DED4C5] bg-[#FAF7F2] p-4 shadow-xs">
        <div className="relative w-full sm:w-80">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8C7B6B]" />
          <input
            type="text"
            placeholder="Search leads by name, phone or note..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-xl border border-[#D5C9B8] bg-white py-2 pl-10 pr-4 text-xs text-[#1F1713] placeholder-[#A89886] focus:border-[#C9A84C] focus:outline-none transition"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          {['All', 'New', 'Contacted', 'Scheduled'].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold transition shrink-0 ${
                statusFilter === status
                  ? 'bg-[#1F1713] text-white shadow-xs'
                  : 'bg-white border border-[#D5C9B8] text-[#635343] hover:bg-[#EFE8DD]'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Leads List / Table */}
      <div className="rounded-2xl border border-[#DED4C5] bg-[#FAF7F2] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#EFE9DF] text-[#695847] uppercase font-bold tracking-wider">
              <tr>
                <th className="py-3 px-5">Client Info</th>
                <th className="py-3 px-5">Contact Details</th>
                <th className="py-3 px-5">Design Requirements & Message</th>
                <th className="py-3 px-5">Status</th>
                <th className="py-3 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAE1D3]">
              {filtered.map((lead) => (
                <tr key={lead.id} className="hover:bg-[#F3EDE3] transition align-top">
                  <td className="py-4 px-5">
                    <div className="font-bold text-[#1F1713] text-sm">{lead.name}</div>
                    <div className="text-[11px] text-[#8C7B6B] flex items-center gap-1 mt-0.5">
                      <Clock size={11} />
                      <span>{lead.created_at}</span>
                    </div>
                    {lead.budget && (
                      <span className="inline-block mt-1.5 px-2 py-0.5 rounded bg-[#C9A84C]/15 text-[#7E5E1C] font-semibold text-[10px]">
                        Budget: {lead.budget}
                      </span>
                    )}
                  </td>

                  <td className="py-4 px-5 space-y-1.5">
                    <a
                      href={`tel:${lead.phone}`}
                      className="flex items-center gap-1.5 text-[#3D3025] font-semibold hover:text-[#C9A84C] transition"
                    >
                      <Phone size={12} className="text-[#C9A84C]" />
                      <span>{lead.phone}</span>
                    </a>
                    {lead.email && (
                      <a
                        href={`mailto:${lead.email}`}
                        className="flex items-center gap-1.5 text-[#736353] hover:text-[#1F1713] transition"
                      >
                        <Mail size={12} className="text-[#8C7B6B]" />
                        <span>{lead.email}</span>
                      </a>
                    )}
                  </td>

                  <td className="py-4 px-5 max-w-sm">
                    {lead.service && (
                      <div className="font-semibold text-[#1F1713] mb-1">
                        Service: {lead.service}
                      </div>
                    )}
                    <p className="text-xs text-[#5C4D3E] leading-relaxed line-clamp-3">
                      {lead.message || 'No specific notes entered.'}
                    </p>
                  </td>

                  <td className="py-4 px-5">
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

                  <td className="py-4 px-5 text-right space-x-1.5 whitespace-nowrap">
                    <button
                      onClick={() =>
                        showPreview(
                          `Mark Contacted: ${lead.name}`,
                          'Updates client status to Contacted and logs timestamped notes.'
                        )
                      }
                      className="px-2.5 py-1 rounded-lg border border-[#D5C9B8] bg-white font-semibold text-[#524436] hover:bg-[#FAF7F2] transition"
                    >
                      Update
                    </button>

                    <button
                      onClick={() =>
                        showPreview(
                          `Delete Inquiry #${lead.id}`,
                          'Permanently removes this inquiry from the database.'
                        )
                      }
                      className="p-1 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 transition"
                      title="Delete inquiry"
                    >
                      <Trash2 size={13} className="inline" />
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

