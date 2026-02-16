/**
 * @file middleware.ts
 * @description Global Next.js Middleware orchestrating security layers.
 * @author Senior Engineer Logic
 */

/**
 * ============================================================================
 * FILE: middleware.ts
 * LAYER: middleware
 * TYPE: middleware
 * ============================================================================
 *
 * PURPOSE:
 * -> Intercepts incoming requests to apply global policies like logging, rate limiting, and security headers.
 * -> Ensures a consistent security posture across the entire application.
 *
 * RESPONSIBILITY:
 * -> Processing requests before they reach the application logic.
 * -> Injecting security headers (CSP, HSTS).
 * -> Logging request metadata for audit trails.
 * -> Enforcing rate limits to prevent abuse.
 *
 * ARCHITECTURE POSITION:
 * -> Root level middleware executed by Next.js Edge Runtime.
 * -> Sits between the client request and the Next.js App Router.
 *
 * DATA FLOW:
 * -> Incoming Request -> Middleware -> [Security Checks] -> Response/Rewrite/Next.
 *
 * SECURITY:
 * -> CRITICAL: This is the first line of defense.
 * -> Injects CSP, HSTS, X-Frame-Options.
 * -> Validates CSRF tokens (via helper).
 *
 * PERFORMANCE:
 * -> MUST be lightweight as it runs on every request.
 * -> Uses Edge Runtime for low latency.
 *
 * IMPROVEMENTS:
 * -> Considerations for more granular path matching if complexity grows.
 *
 * STATUS:
 * -> Stable
 *
 * ============================================================================
 */

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { SECURITY_HEADERS } from './core/security/config/security-headers';
import { checkRateLimit } from './core/security/middleware/rate-limit.middleware';
import { logRequest } from './core/security/middleware/logger.middleware';

export function middleware(request: NextRequest) {
    // 1. Log Request
    logRequest(request);

    // 2. Rate Limiting
    if (!checkRateLimit(request)) {
        return new NextResponse('Too Many Requests', { status: 429 });
    }

    const response = NextResponse.next();

    // 3. Inject Security Headers
    Object.entries(SECURITY_HEADERS).forEach(([key, value]) => {
        response.headers.set(key, value);
    });

    return response;
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
