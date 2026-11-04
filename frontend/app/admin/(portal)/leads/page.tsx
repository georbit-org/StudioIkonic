'use client';

import React, { useState } from 'react';
import {
  Inbox,
  Phone,
  Mail,
  Calendar,
  Trash2,
  Download,
  Search,
  Sparkles,
  Clock,
} from 'lucide-react';
import { useMockDb, Lead } from '@/lib/mock/store';
import { useFeedback } from '@/lib/mock/feedback';

export default function AdminLeadsPage() {
  const { state, deleteLead, addLead, exportLeadsCsv } = useMockDb();
  const { toast, confirm } = useFeedback();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const filtered = state.leads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.phone.includes(searchTerm) ||
      (lead.email && lead.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (lead.message && lead.message.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === 'All' || lead.status === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const handleDelete = (lead: Lead) => {
    confirm({
      title: `Delete Inquiry from "${lead.name}"?`,
      message: 'This lead record will be permanently deleted from your demo storage.',
      confirmText: 'Delete Inquiry',
      onConfirm: () => {
        deleteLead(lead.id);
        toast(`Lead from "${lead.name}" deleted (demo)`, 'info');
      },
    });
  };

  const handleSimulateLead = () => {
    const created = addLead({
      name: 'Aditya Birla Group Penthouse',
      phone: '+91 98111 22334',
      email: 'aditya.corp@luxuryestates.in',
      service: 'Complete Renovation',
      budget: '₹1.8Cr',
      message: 'Looking for turnkey luxury execution for 6,200 sq ft duplex in Camellias, Gurgaon.',
      status: 'new',
    });
    toast(`Simulated enquiry from "${created.name}" received!`, 'success');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Header */}
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
            Client Inquiries &amp; Leads ({state.leads.length})
          </h1>
          <p style={{ margin: '0.25rem 0 0', fontSize: '0.84rem', color: '#64748b' }}>
            Prospective clients requesting luxury consultations through your website contact forms.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button
            type="button"
            onClick={handleSimulateLead}
            style={{
              padding: '0.55rem 1rem',
              borderRadius: '8px',
              backgroundColor: 'rgba(212, 175, 55, 0.15)',
              border: '1px solid #d4af37',
              color: '#856404',
              fontSize: '0.82rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
            }}
          >
            <Sparkles size={14} color="#d4af37" /> Simulate Lead
          </button>

          <button
            type="button"
            onClick={exportLeadsCsv}
            style={{
              padding: '0.55rem 1.15rem',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #0f1e3c 0%, #1e40af 100%)',
              color: '#ffffff',
              border: 'none',
              fontSize: '0.82rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              boxShadow: '0 3px 10px rgba(15, 30, 60, 0.15)',
            }}
          >
            <Download size={14} /> Export CSV
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '10px',
          padding: '1rem 1.25rem',
          border: '1px solid #e2e8f0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        <div style={{ position: 'relative', width: '280px' }}>
          <Search size={15} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
          <input
            type="text"
            placeholder="Search inquiries..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '0.5rem 0.75rem 0.5rem 2rem',
              borderRadius: '6px',
              border: '1.5px solid #cbd5e1',
              fontSize: '0.82rem',
              outline: 'none',
            }}
          />
        </div>

        <div style={{ display: 'flex', gap: '0.4rem' }}>
          {['All', 'New', 'Contacted', 'Scheduled'].map((status) => (
            <button
              key={status}
              type="button"
              onClick={() => setStatusFilter(status)}
              style={{
                padding: '0.4rem 0.8rem',
                borderRadius: '6px',
                border: statusFilter === status ? '1.5px solid #0f1e3c' : '1px solid #cbd5e1',
                backgroundColor: statusFilter === status ? '#0f1e3c' : '#ffffff',
                color: statusFilter === status ? '#ffffff' : '#475569',
                fontSize: '0.78rem',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
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
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.84rem' }}>
            <thead style={{ backgroundColor: 'rgba(235, 222, 202, 0.4)', borderBottom: '1px solid #e2e8f0', color: '#475569' }}>
              <tr>
                <th style={{ padding: '0.85rem 1.25rem', fontWeight: 700 }}>Client &amp; Date</th>
                <th style={{ padding: '0.85rem 1.25rem', fontWeight: 700 }}>Contact Info</th>
                <th style={{ padding: '0.85rem 1.25rem', fontWeight: 700 }}>Service &amp; Requirements</th>
                <th style={{ padding: '0.85rem 1.25rem', fontWeight: 700 }}>Status</th>
                <th style={{ padding: '0.85rem 1.25rem', fontWeight: 700, textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((lead) => (
                <tr
                  key={lead.id}
                  style={{ borderBottom: '1px solid #f1f5f9', verticalAlign: 'top', transition: 'background-color 0.15s' }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#fafafa')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  <td style={{ padding: '1rem 1.25rem' }}>
                    <div style={{ fontWeight: 700, color: '#0f1e3c', fontSize: '0.9rem' }}>{lead.name}</div>
                    <div style={{ fontSize: '0.74rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '0.3rem', marginTop: '0.2rem' }}>
                      <Clock size={11} /> {lead.created_at}
                    </div>
                    {lead.budget && (
                      <span style={{ display: 'inline-block', marginTop: '0.35rem', padding: '0.15rem 0.45rem', borderRadius: '4px', backgroundColor: 'rgba(212, 175, 55, 0.15)', color: '#856404', fontSize: '0.7rem', fontWeight: 700 }}>
                        Budget: {lead.budget}
                      </span>
                    )}
                  </td>

                  <td style={{ padding: '1rem 1.25rem' }}>
                    <a
                      href={`tel:${lead.phone}`}
                      style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#0f1e3c', fontWeight: 600, textDecoration: 'none' }}
                    >
                      <Phone size={12} color="#d4af37" /> {lead.phone}
                    </a>
                    {lead.email && (
                      <a
                        href={`mailto:${lead.email}`}
                        style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#64748b', fontSize: '0.78rem', textDecoration: 'none', marginTop: '0.25rem' }}
                      >
                        <Mail size={12} color="#94a3b8" /> {lead.email}
                      </a>
                    )}
                  </td>

                  <td style={{ padding: '1rem 1.25rem', maxWidth: '340px' }}>
                    {lead.service && (
                      <div style={{ fontWeight: 600, color: '#0f1e3c', fontSize: '0.8rem', marginBottom: '0.25rem' }}>
                        {lead.service}
                      </div>
                    )}
                    <p style={{ margin: 0, fontSize: '0.8rem', color: '#475569', lineHeight: 1.5 }}>
                      {lead.message || 'No additional message.'}
                    </p>
                  </td>

                  <td style={{ padding: '1rem 1.25rem' }}>
                    <span
                      style={{
                        display: 'inline-block',
                        padding: '0.2rem 0.6rem',
                        borderRadius: '9999px',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        backgroundColor:
                          lead.status === 'new'
                            ? 'rgba(212, 175, 55, 0.15)'
                            : lead.status === 'contacted'
                            ? 'rgba(30, 64, 175, 0.1)'
                            : 'rgba(22, 163, 74, 0.1)',
                        color:
                          lead.status === 'new'
                            ? '#856404'
                            : lead.status === 'contacted'
                            ? '#1e40af'
                            : '#16a34a',
                      }}
                    >
                      {lead.status}
                    </span>
                  </td>

                  <td style={{ padding: '1rem 1.25rem', textAlign: 'right' }}>
                    <button
                      type="button"
                      onClick={() => handleDelete(lead)}
                      title="Delete lead"
                      style={{
                        padding: '0.4rem 0.65rem',
                        borderRadius: '6px',
                        border: '1px solid #fecaca',
                        backgroundColor: '#ffffff',
                        color: '#dc2626',
                        cursor: 'pointer',
                      }}
                    >
                      <Trash2 size={13} />
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
