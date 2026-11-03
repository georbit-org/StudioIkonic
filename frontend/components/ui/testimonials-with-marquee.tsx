import { cn } from "@/lib/utils";
import { TestimonialCard, TestimonialAuthor } from "@/components/ui/testimonial-card";

export interface TestimonialItem {
  author: TestimonialAuthor;
  text: string;
  href?: string;
}

export interface TestimonialsSectionProps {
  title: React.ReactNode;
  description?: React.ReactNode;
  testimonials: Array<TestimonialItem>;
  className?: string;
  duration?: string;
}

export function TestimonialsSection({ 
  title,
  description,
  testimonials,
  className,
  duration = "80s"
}: TestimonialsSectionProps) {
  return (
    <section 
      className={cn(
        "w-full overflow-hidden",
        "bg-[#FAF6F0] text-[#0f1e3c]",
        // Generous vertical breathing room between above (Process) and below (CTA) sections
        "my-8 sm:my-14 py-8 sm:py-12",
        className
      )}
    >
      <div 
        style={{
          width: '100%',
          padding: '0 clamp(1.5rem, 4vw, 4rem)',
        }}
        className="flex flex-col items-center text-center"
      >
        
        {/* ── Compact Optimized Header (Saves vertical space) ── */}
        <div className="flex flex-col items-center px-4 mb-6 sm:mb-8 max-w-[760px]">
          <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#a07a2a] mb-1.5">
            Client Endorsements
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-[2.2rem] font-bold text-[#0f1e3c] leading-tight">
            {title}
          </h2>
          {description && (
            <p className="text-xs sm:text-[0.88rem] text-[#4b5563] mt-2 max-w-[580px] leading-relaxed">
              {description}
            </p>
          )}
        </div>

        {/* ── Infinite Seamless Marquee Track ── */}
        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
          <div 
            className="group flex overflow-hidden p-2 [--gap:1.5rem] [gap:var(--gap)] flex-row w-full select-none"
            style={{
              '--duration': duration,
              '--gap': '1.5rem',
            } as React.CSSProperties}
          >
            {/* Track 1: Smooth continuous animation */}
            <div 
              className="flex shrink-0 justify-around [gap:var(--gap)] animate-marquee flex-row group-hover:[animation-play-state:paused]"
              style={{
                animationDuration: duration,
                animationTimingFunction: 'linear',
                animationIterationCount: 'infinite',
              }}
            >
              {[...Array(2)].map((_, setIndex) => (
                testimonials.map((testimonial, i) => (
                  <TestimonialCard 
                    key={`track1-${setIndex}-${i}`}
                    {...testimonial}
                  />
                ))
              ))}
            </div>

            {/* Track 2: Duplicate sibling running in lockstep to eliminate any gaps or resets */}
            <div 
              aria-hidden="true"
              className="flex shrink-0 justify-around [gap:var(--gap)] animate-marquee flex-row group-hover:[animation-play-state:paused]"
              style={{
                animationDuration: duration,
                animationTimingFunction: 'linear',
                animationIterationCount: 'infinite',
              }}
            >
              {[...Array(2)].map((_, setIndex) => (
                testimonials.map((testimonial, i) => (
                  <TestimonialCard 
                    key={`track2-${setIndex}-${i}`}
                    {...testimonial}
                  />
                ))
              ))}
            </div>
          </div>

          {/* Luxury soft edge gradient masks */}
          <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-28 bg-gradient-to-r from-[#FAF6F0] to-transparent sm:block z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-28 bg-gradient-to-l from-[#FAF6F0] to-transparent sm:block z-10" />
        </div>

      </div>
    </section>
  );
}

export default TestimonialsSection;
