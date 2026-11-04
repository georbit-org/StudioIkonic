'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminProjectsRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/admin');
  }, [router]);

  return (
    <div style={{ padding: '2rem', textAlign: 'center', color: '#64748b' }}>
      Redirecting to dashboard...
    </div>
  );
}
