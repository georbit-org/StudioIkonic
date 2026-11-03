'use client';

import { TestimonialsSection as MarqueeTestimonials } from '@/components/ui/testimonials-with-marquee';
import { TESTIMONIALS } from '@/lib/data';

const clientAvatars: Record<number, string> = {
  1: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
  2: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
  3: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
  4: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
  5: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  6: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
};

const formattedTestimonials = TESTIMONIALS.map((t) => ({
  author: {
    name: t.name,
    handle: t.role,
    avatar: clientAvatars[t.id] || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
  },
  text: t.text,
}));

export default function TestimonialsSection() {
  return (
    <div id="testimonials" className="relative my-8 sm:my-14">
      <MarqueeTestimonials
        title={
          <>
            Words from <span className="font-serif italic font-normal text-[#a07a2a]">Homeowners</span>
          </>
        }
        description="Crafting iconic spaces across Delhi NCR with timeless elegance and bespoke craftsmanship."
        duration="85s"
        testimonials={formattedTestimonials}
      />
    </div>
  );
}
