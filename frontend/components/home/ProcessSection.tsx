'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Play, Pause, Volume2, VolumeX } from 'lucide-react';

const TR = { duration: 0.5, ease: 'easeOut' } as const;

export default function ProcessSection() {
  const ref = useRef(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <section
      ref={ref}
      id="process"
      className="py-16 sm:py-24"
      style={{
        background: '#FAF6F0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1240px]">
        {/* ── Section Header (Consistent with About, Projects, and Services) ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={TR}
          className="flex justify-between items-end flex-wrap gap-5 pb-7"
        >
          <div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[2.6rem] font-bold text-[#0f1e3c] m-0 leading-tight">
              Our <span className="font-serif italic font-normal text-[#a07a2a]">Process</span> in Motion
            </h2>
          </div>

          <a
            href="/#contact"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-[rgba(201,168,76,0.5)] bg-white/90 text-[#0f1e3c] text-xs font-bold uppercase tracking-wider hover:bg-[#c9a84c] hover:text-white hover:border-[#c9a84c] transition-all duration-300 shadow-sm"
          >
            Get a Quote <ArrowRight size={14} />
          </a>
        </motion.div>

        {/* ── Framed Video Container (Preserves Aspect Ratio, No Crop) ── */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ ...TR, delay: 0.15 }}
          className="relative w-full rounded-[14px] sm:rounded-[22px] overflow-hidden bg-[#0B1526] group"
        >
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="w-full h-auto block"
            style={{
              maxHeight: 'none',
              objectFit: 'contain',
            }}
          >
            <source src="/uploads/process-video.mp4" type="video/mp4" />
          </video>

          {/* Interactive Controls Overlay */}
          <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 z-20 flex items-center gap-2 opacity-80 group-hover:opacity-100 transition-opacity">
            <button
              onClick={togglePlay}
              type="button"
              aria-label={isPlaying ? "Pause Video" : "Play Video"}
              className="w-10 h-10 rounded-full bg-[#0B1526]/85 text-[#c9a84c] hover:text-white hover:bg-[#c9a84c] backdrop-blur-md border border-[rgba(201,168,76,0.3)] flex items-center justify-center transition-all shadow-md cursor-pointer"
            >
              {isPlaying ? <Pause size={16} /> : <Play size={16} className="ml-0.5" />}
            </button>
            <button
              onClick={toggleMute}
              type="button"
              aria-label={isMuted ? "Unmute Video" : "Mute Video"}
              className="w-10 h-10 rounded-full bg-[#0B1526]/85 text-[#c9a84c] hover:text-white hover:bg-[#c9a84c] backdrop-blur-md border border-[rgba(201,168,76,0.3)] flex items-center justify-center transition-all shadow-md cursor-pointer"
            >
              {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>
          </div>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #process { padding-top: 3.5rem !important; padding-bottom: 3.5rem !important; }
        }
      `}</style>
    </section>
  );
}
