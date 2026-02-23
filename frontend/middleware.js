import { NextResponse } from 'next/server';

export function middleware(request) {
    const url = request.nextUrl.clone();

    // If Vercel edge routes this via /frontend/..., strip it so Next.js App Router matches dynamic routes
    if (url.pathname.startsWith('/frontend/')) {
        url.pathname = url.pathname.replace(/^\/frontend/, '');
        return NextResponse.rewrite(url);
    }

    return NextResponse.next();
}

export const config = {
    // Only run on frontend paths, ignoring api and static assets
    matcher: ['/frontend/:path*', '/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
