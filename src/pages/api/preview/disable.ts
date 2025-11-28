import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ cookies, redirect }) => {
  // Clear preview cookies
  cookies.delete('__prerender_bypass');
  cookies.delete('__next_preview_data');

  // Redirect to home page
  return redirect('/');
};