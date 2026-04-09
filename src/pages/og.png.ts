import type { APIRoute } from 'astro';
import { generateOgImageForSite } from '@/utils/ogImage/generate';

export const GET: APIRoute = async () => {
  const buffer = await generateOgImageForSite();
  return new Response(new Uint8Array(buffer), {
    headers: { 'Content-Type': 'image/png' },
  });
};
