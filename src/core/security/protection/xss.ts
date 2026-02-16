/**
 * ============================================================================
 * FILE: xss.ts
 * LAYER: core
 * TYPE: protection
 * ============================================================================
 *
 * PURPOSE:
 * -> Provide utilities to sanitize input against Cross-Site Scripting (XSS).
 * -> Recursively clean objects and strings.
 *
 * RESPONSIBILITY:
 * -> Detect and escape dangerous characters in user input.
 * -> Serve as a middleware utility for payload sanitization.
 *
 * ARCHITECTURE POSITION:
 * -> Used by Middleware and Validation layers.
 *
 * DATA FLOW:
 * -> Dirty Input -> [Recursion + Escape] -> Clean Input.
 *
 * SECURITY:
 * -> CRITICAL: Prevents attackers from injecting malicious scripts.
 *
 * PERFORMANCE:
 * -> Recursive, so depth must be limited (though JSON bodies are usually shallow).
 *
 * IMPROVEMENTS:
 * -> Integrate DOMPurify for HTML content if rich text is allowed.
 *
 * STATUS:
 * -> Stable
 *
 * ============================================================================
 */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { sanitizeInput } from '../validation/sanitization';

/**
 * Middleware-like function to sanitize request body.
 * In a real Next.js middleware, this might involve parsing and re-serializing 
 * (which is complex in Edge runtime), so this is often used in API routes.
 */
export const xssFilter = (input: Record<string, unknown>): Record<string, unknown> => {
    const output: Record<string, unknown> = {};
    for (const key in input) {
        if (typeof input[key] === 'string') {
            output[key] = sanitizeInput(input[key] as string);
        } else if (typeof input[key] === 'object' && input[key] !== null) {
            output[key] = xssFilter(input[key] as Record<string, unknown>);
        } else {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            output[key] = input[key];
        }
    }
    return output;
};
