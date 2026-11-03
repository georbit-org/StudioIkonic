'use client';

import { useRef, useState, useCallback, useEffect } from 'react';

interface BeforeAfterSliderProps {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt?: string;
  afterAlt?: string;
}

export default function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeAlt = 'Before',
  afterAlt = 'After',
}: BeforeAfterSliderProps) {
  const [pos, setPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const calcPos = useCallback((clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setPos((x / rect.width) * 100);
  }, []);

  const onMouseDown = (e: React.MouseEvent) => {
    dragging.current = true;
    calcPos(e.clientX);
  };
  const onTouchStart = (e: React.TouchEvent) => {
    dragging.current = true;
    calcPos(e.touches[0].clientX);
  };

  useEffect(() => {
    const onMove = (e: MouseEvent) => { if (dragging.current) calcPos(e.clientX); };
    const onTouchMove = (e: TouchEvent) => { if (dragging.current) calcPos(e.touches[0].clientX); };
    const onUp = () => { dragging.current = false; };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onUp);
    };
  }, [calcPos]);

  return (
    <div
      ref={containerRef}
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
      style={{
        position: 'relative',
        width: '100%',
        aspectRatio: '4/3',
        overflow: 'hidden',
        cursor: 'ew-resize',
        borderRadius: '12px',
        userSelect: 'none',
      }}
    >
      {/* After image (full width, background) */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={afterSrc}
        alt={afterAlt}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        draggable={false}
      />

      {/* Before image (clipped to left side) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          overflow: 'hidden',
          width: `${pos}%`,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={beforeSrc}
          alt={beforeAlt}
          style={{ position: 'absolute', inset: 0, width: containerRef.current?.offsetWidth ?? 800, height: '100%', maxWidth: 'none', objectFit: 'cover' }}
          draggable={false}
        />
      </div>

      {/* Slider line */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: `${pos}%`,
          transform: 'translateX(-50%)',
          width: '2px',
          height: '100%',
          background: 'rgba(201,168,76,0.9)',
          zIndex: 3,
          pointerEvents: 'none',
        }}
      />

      {/* Drag handle */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: `${pos}%`,
          transform: 'translate(-50%, -50%)',
          width: '44px',
          height: '44px',
          borderRadius: '50%',
          background: 'white',
          border: '2px solid var(--gold)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 4,
          boxShadow: '0 4px 16px rgba(0,0,0,0.25)',
          pointerEvents: 'none',
        }}
      >
        <span style={{ color: 'var(--gold)', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '-1px' }}>◀▶</span>
      </div>

      {/* Labels */}
      <span style={{
        position: 'absolute', top: '0.65rem', left: '0.75rem',
        background: 'rgba(15,30,60,0.82)', color: 'white',
        fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.12em',
        textTransform: 'uppercase', padding: '0.25rem 0.65rem', borderRadius: '4px', zIndex: 5,
      }}>Before</span>
      <span style={{
        position: 'absolute', top: '0.65rem', right: '0.75rem',
        background: 'rgba(201,168,76,0.9)', color: 'white',
        fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.12em',
        textTransform: 'uppercase', padding: '0.25rem 0.65rem', borderRadius: '4px', zIndex: 5,
      }}>After</span>
    </div>
  );
}

