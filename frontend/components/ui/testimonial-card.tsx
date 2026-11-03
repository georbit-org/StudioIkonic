import { cn } from "@/lib/utils";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Star } from "lucide-react";

export interface TestimonialAuthor {
  name: string;
  handle: string;
  avatar: string;
}

export interface TestimonialCardProps {
  author: TestimonialAuthor;
  text: string;
  href?: string;
  className?: string;
}

export function TestimonialCard({ 
  author,
  text,
  href,
  className
}: TestimonialCardProps) {
  const Card = href ? 'a' : 'div';
  
  return (
    <Card
      {...(href ? { href, target: "_blank", rel: "noopener noreferrer" } : {})}
      className={cn(
        "flex flex-col justify-between rounded-[20px]",
        // Solid white background with luxury warm gold border and soft shadow — completely free of dark-mode corruption
        "bg-white border border-[rgba(201,168,76,0.22)] shadow-[0_4px_20px_rgba(15,30,60,0.06)]",
        "p-5 sm:p-6 text-start",
        "hover:border-[#c9a84c] hover:shadow-[0_10px_30px_rgba(15,30,60,0.12)]",
        "w-[320px] sm:w-[380px] shrink-0 select-none",
        "transition-all duration-300",
        className
      )}
      style={{
        backgroundColor: '#FFFFFF',
        color: '#0F1E3C',
      }}
    >
      <div>
        {/* Top Header: Avatar + Author Info + 5 Star Rating */}
        <div className="flex items-center gap-3.5 pb-3.5 border-b border-[rgba(15,30,60,0.08)]">
          <Avatar className="h-11 w-11 rounded-full border-2 border-[#c9a84c]/50 shadow-sm shrink-0">
            <AvatarImage src={author.avatar} alt={author.name} className="object-cover" />
            <AvatarFallback className="bg-[#0f1e3c] text-[#c9a84c] text-xs font-bold">
              {author.name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex flex-col items-start min-w-0 flex-1">
            <h3 className="font-serif text-[1rem] sm:text-[1.05rem] font-bold text-[#0f1e3c] leading-snug truncate max-w-full">
              {author.name}
            </h3>
            <p className="text-[0.7rem] sm:text-[0.72rem] font-semibold text-[#a07a2a] truncate max-w-full uppercase tracking-wider mt-0.5">
              {author.handle}
            </p>
          </div>

          {/* 5 Gold Stars */}
          <div className="flex items-center gap-0.5 shrink-0 ml-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={13} className="fill-[#c9a84c] text-[#c9a84c]" />
            ))}
          </div>
        </div>

        {/* Testimonial Quote Body */}
        <p className="text-[0.88rem] sm:text-[0.92rem] text-[#334155] leading-relaxed italic mt-3.5 line-clamp-4">
          &ldquo;{text}&rdquo;
        </p>
      </div>
    </Card>
  );
}

export default TestimonialCard;
