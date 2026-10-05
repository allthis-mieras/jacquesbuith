import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ request, cookies, redirect }) => {
  const url = new URL(request.url);
  const slug = url.searchParams.get('slug') || '/';
  
  // Check if request comes from Sanity Studio (optional, for extra security)
  const referer = request.headers.get('referer');
  const isFromStudio = referer && (
    referer.includes('/admin') ||
    referer.includes('sanity.studio') ||
    referer.includes('sanity.io')
  );
  
  // Set preview cookie for Astro SSR
  // This enables Visual Editing automatically
  cookies.set('sanity-preview', 'true', {
    httpOnly: true,
    secure: import.meta.env.PROD, // Only secure in production
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 // 24 hours
  });

  // Redirect to the preview page
  // Visual Editing will be enabled automatically via the cookie and referer header
  return redirect(slug);
};