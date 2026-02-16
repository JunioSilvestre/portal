/**
 * @file cors.ts
 * @description CORS (Cross-Origin Resource Sharing) Configuration.
 * @author Senior Engineer Logic
 */

import { SECURITY_CONSTANTS } from './constants';

/**
 * ============================================================================
 * FILE: cors.ts
 * LAYER: core
 * TYPE: config
 * ============================================================================
 *
 * PURPOSE:
 * -> Define Cross-Origin Resource Sharing (CORS) policies.
 * -> Control which domains can access the API.
 *
 * RESPONSIBILITY:
 * -> Whitelist allowed origins, methods, and headers.
 * -> Prevent unauthorized cross-origin requests.
 *
 * ARCHITECTURE POSITION:
 * -> Imported by API routes or middleware to enforce access control.
 *
 * DATA FLOW:
 * -> Request Origin -> CORS Check -> Allow/Block.
 *
 * SECURITY:
 * -> CRITICAL: Prevents malicious sites from making requests on behalf of users.
 *
 * PERFORMANCE:
 * -> Slight overhead on preflight OPTIONS requests if complex logic is used.
 *
 * IMPROVEMENTS:
 * -> Dynamic origin checking for multi-tenant environments.
 *
 * STATUS:
 * -> Stable
 *
 * ============================================================================
 */

export const CORS_OPTIONS = {
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    credentials: true,
    origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
        if (!origin || SECURITY_CONSTANTS.CORS_ALLOWED_ORIGINS.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
};
