import { PROJECTS } from '@/lib/data';
import EditProjectClient from './EditProjectClient';

export const dynamicParams = false;

export async function generateStaticParams() {
  return PROJECTS.map((p) => ({ id: String(p.id) }));
}

export default async function AdminEditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <EditProjectClient id={id} />;
}
