import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'cdn.21st.dev' },
    ],
  },
  // Proxy /api/contact to Flask for the contact form submission
  // All other content is static — no Flask dependency
  async rewrites() {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5001';
    return [
      {
        source: '/api/contact',
        destination: `${backendUrl}/api/contact`,
      },
    ];
  },
};

export default nextConfig;
