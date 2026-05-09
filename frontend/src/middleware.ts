import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const url = req.nextUrl;

  // Get hostname (e.g., 'salil.localhost:3000', 'localhost:3000', 'salil.yourdomain.com')
  const hostname = req.headers.get('host') || '';

  // Define the base domains that don't belong to a tenant
  const isLocalhost = hostname.includes('localhost') || hostname.includes('127.0.0.1');
  
  // Try to extract a subdomain
  let currentHost = hostname.split(':')[0]; // remove port
  let subdomain = '';

  if (isLocalhost) {
    if (currentHost !== 'localhost' && currentHost !== '127.0.0.1') {
      subdomain = currentHost.replace('.localhost', '');
    }
  } else {
    // Basic detection for production, assumes base domain is like `your-app.com`
    // So `username.your-app.com` would yield `username`
    // Adjust logic depending on your actual production domain
    const parts = currentHost.split('.');
    if (parts.length > 2) {
      subdomain = parts[0];
    }
  }

  // Paths that should NOT be rewritten
  const searchParams = req.nextUrl.searchParams.toString();
  const path = `${url.pathname}${searchParams.length > 0 ? `?${searchParams}` : ''}`;

  if (
    url.pathname.startsWith('/api') || 
    url.pathname.startsWith('/_next') || 
    url.pathname.startsWith('/static') ||
    url.pathname.startsWith('/dashboard') ||
    url.pathname.startsWith('/login') ||
    url.pathname.startsWith('/register') ||
    url.pathname === '/'
  ) {
    return NextResponse.next();
  }

  // If there's a valid subdomain (e.g. `salil`), rewrite the URL to `/[subdomain]`
  if (subdomain && subdomain !== 'www') {
    return NextResponse.rewrite(new URL(`/${subdomain}${path === '/' ? '' : path}`, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
