import Link from 'next/link';
import { Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="not-found">
      {/* Subtle background pattern */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(201,168,76,0.08) 1px, transparent 0)',
          backgroundSize: '48px 48px',
          zIndex: 0,
        }}
      />
      <div style={{ position: 'relative', zIndex: 1, padding: '2rem' }}>
        <div
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(5rem, 18vw, 10rem)',
            fontWeight: 800,
            color: 'var(--gold)',
            lineHeight: 1,
            opacity: 0.9,
          }}
        >
          404
        </div>
        <h1
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(1.4rem, 4vw, 2.2rem)',
            color: 'white',
            fontWeight: 600,
            marginTop: '0.5rem',
            marginBottom: '1rem',
          }}
        >
          Page Not Found
        </h1>
        <p
          style={{
            color: 'rgba(255,255,255,0.55)',
            fontSize: '1rem',
            maxWidth: '380px',
            lineHeight: 1.7,
            margin: '0 auto 2.5rem',
          }}
        >
          The space you&apos;re looking for doesn&apos;t exist in our portfolio.
          Let&apos;s guide you back home.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/" className="btn btn-gold">
            <Home size={15} /> Back to Home
          </Link>
          <Link href="/projects" className="btn btn-outline-white">
            View Projects
          </Link>
        </div>

        {/* Decorative gold line */}
        <div
          style={{
            width: '60px',
            height: '3px',
            background: 'linear-gradient(90deg, var(--gold), transparent)',
            margin: '3rem auto 0',
            borderRadius: '2px',
          }}
        />
      </div>
    </div>
  );
}
