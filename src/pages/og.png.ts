import type { APIRoute } from 'astro';
import { generateOgImageForSite } from '@/utils/ogImage/generate';

export const GET: APIRoute = async () =>
  new Response((await generateOgImageForSite()) as BodyInit, {
    headers: { 'Content-Type': 'image/png' },
  });
