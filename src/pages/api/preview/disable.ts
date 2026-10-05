import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ cookies, redirect }) => {
  // Clear preview cookie
  cookies.delete('sanity-preview');

  // Redirect to home page
  return redirect('/');
};