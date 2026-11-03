import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Iconic Design — Luxury Interior Design Studio, Gurgaon',
    template: '%s | Iconic Design',
  },
  description:
    "India's premier luxury interior design studio based in Gurgaon. Crafting iconic spaces for discerning clients across Delhi NCR since 1999. Founded by Shakir Ali.",
  keywords: [
    'luxury interior design gurgaon',
    'interior designer delhi ncr',
    'premium home decor',
    'bespoke furniture gurgaon',
    'iconic design',
    'shakir ali interior designer',
  ],
  authors: [{ name: 'Iconic Design' }],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    siteName: 'Iconic Design',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,700&family=Poppins:wght@300;400;500;600;700&family=Great+Vibes&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
