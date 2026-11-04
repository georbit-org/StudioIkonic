import { NextRequest } from 'next/server';
import { getSandboxIdFromCookies, isRequestAdminAuthorized } from '@/lib/server/session';
import { getSandbox } from '@/lib/server/sandbox';
import { jsonOk, jsonFail } from '@/lib/server/http';
import { GalleryImage } from '@/lib/server/types';

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function POST(req: NextRequest, ctx: RouteContext) {
  if (!(await isRequestAdminAuthorized())) {
    return jsonFail('Unauthorized', 401, 'UNAUTHORIZED');
  }

  const { id } = await ctx.params;
  const projectId = parseInt(id, 10);
  const { sandboxId } = await getSandboxIdFromCookies();
  const store = getSandbox(sandboxId);

  const project = store.projects.find((p) => p.id === projectId);
  if (!project) {
    return jsonFail('Project not found', 404, 'NOT_FOUND');
  }

  let imageUrl = '';
  const contentType = req.headers.get('content-type') || '';
  if (contentType.includes('multipart/form-data')) {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    if (file) {
      const buffer = await file.arrayBuffer();
      const base64 = Buffer.from(buffer).toString('base64');
      const mime = file.type || 'image/jpeg';
      imageUrl = `data:${mime};base64,${base64}`;
    }
  } else {
    const body = await req.json();
    imageUrl = body.url;
  }

  if (!imageUrl) {
    return jsonFail('No image data provided', 400, 'NO_IMAGE');
  }

  const nextImageId = Math.max(...project.gallery.map((g) => g.id), 0) + 1;
  const newImage: GalleryImage = {
    id: nextImageId,
    url: imageUrl,
    caption: `${project.title} detail ${nextImageId}`,
  };

  project.gallery.push(newImage);

  return jsonOk(newImage, 'Image added to gallery (dummy upload preview)', { status: 201 });
}
