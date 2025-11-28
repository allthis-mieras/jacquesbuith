import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ request, cookies, redirect }) => {
  const url = new URL(request.url);
  const slug = url.searchParams.get('slug') || '/';
  
  // Set preview cookie
  cookies.set('__prerender_bypass', '', {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    maxAge: 60 * 60 * 24 // 24 hours
  });

  cookies.set('__next_preview_data', '', {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    maxAge: 60 * 60 * 24 // 24 hours
  });

  // Redirect to the preview page
  return redirect(`${slug}?preview=true`);
};