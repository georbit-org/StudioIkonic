'use client';

import React from 'react';
import {
  MessageSquareQuote,
  Plus,
  Star,
  Pencil,
  Trash2,
  Eye,
  ArrowUpDown,
} from 'lucide-react';
import { TESTIMONIALS } from '@/lib/data';
import { useDemo } from '@/components/ui/DemoModal';

export default function AdminTestimonialsPage() {
  const { showPreview } = useDemo();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1
            className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1F1713]"
            style={{ fontFamily: 'var(--font-serif, "Playfair Display", serif)' }}
          >
            Client Reviews & Testimonials
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-[#786757]">
            Curate luxury homeowner feedback displayed in the marquee and homepage trust section.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={() =>
              showPreview(
                'Reorder Testimonials',
                'Enables drag-and-drop handles to prioritize specific high-profile celebrity or villa testimonials.'
              )
            }
            className="inline-flex items-center gap-2 rounded-xl border border-[#D5C9B8] bg-white px-3.5 py-2.5 text-xs font-bold text-[#5C4B3C] shadow-xs hover:bg-[#FAF7F2] transition"
          >
            <ArrowUpDown size={14} />
            <span>Reorder</span>
          </button>

          <button
            onClick={() =>
              showPreview(
                'Add Testimonial',
                'Adds a new client review with star rating, client name, luxury location or designation, and custom quote.'
              )
            }
            className="inline-flex items-center gap-2 rounded-xl bg-[#1F1713] px-4 py-2.5 text-xs font-bold text-white shadow hover:bg-[#342721] transition"
          >
            <Plus size={16} />
            <span>Add Testimonial</span>
          </button>
        </div>
      </div>

      {/* Testimonials List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {TESTIMONIALS.map((item) => (
          <div
            key={item.id}
            className="rounded-2xl border border-[#DED4C5] bg-[#FAF7F2] p-5 shadow-xs flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between">
                {/* 5 Stars */}
                <div className="flex items-center gap-1 text-[#C9A84C]">
                  {Array.from({ length: item.stars }).map((_, i) => (
                    <Star key={i} size={14} className="fill-[#C9A84C]" />
                  ))}
                </div>

                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                  Published
                </span>
              </div>

              <blockquote className="mt-3 text-xs leading-relaxed text-[#4A3C2F] italic">
                "{item.text}"
              </blockquote>
            </div>

            <div className="mt-5 pt-4 border-t border-[#EAE1D3] flex items-center justify-between">
              <div>
                <div className="font-bold text-xs text-[#1F1713]">{item.name}</div>
                <div className="text-[11px] text-[#8C7B6B]">{item.role}</div>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() =>
                    showPreview(
                      `Toggle Visibility: ${item.name}`,
                      'Temporarily hides or reveals this review on the public homepage marquee.'
                    )
                  }
                  className="p-1.5 rounded-lg border border-[#D5C9B8] bg-white text-[#635343] hover:text-[#1F1713] transition"
                  title="Toggle visibility"
                >
                  <Eye size={13} />
                </button>

                <button
                  onClick={() =>
                    showPreview(
                      `Edit Review: ${item.name}`,
                      'Opens review editor to amend text, client role, or avatar initials.'
                    )
                  }
                  className="p-1.5 rounded-lg border border-[#D5C9B8] bg-white text-[#635343] hover:text-[#1F1713] transition"
                  title="Edit testimonial"
                >
                  <Pencil size={13} />
                </button>

                <button
                  onClick={() =>
                    showPreview(
                      `Delete Review: ${item.name}`,
                      'Removes this testimonial from the database.'
                    )
                  }
                  className="p-1.5 rounded-lg border border-red-200 bg-white text-red-600 hover:bg-red-50 transition"
                  title="Delete testimonial"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

