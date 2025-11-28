import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ request, cookies, redirect }) => {
  const url = new URL(request.url);
  const slug = url.searchParams.get('slug') || '/';
  
  // Set preview cookie for Astro SSR
  cookies.set('sanity-preview', 'true', {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 // 24 hours
  });

  // Redirect to the preview page
  return redirect(`${slug}?preview=true`);
};