import { TESTIMONIALS } from '@/lib/data';
import EditTestimonialClient from './EditTestimonialClient';

export const dynamicParams = false;

export async function generateStaticParams() {
  return TESTIMONIALS.map((t) => ({ id: String(t.id) }));
}

export default async function AdminEditTestimonialPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <EditTestimonialClient id={id} />;
}
