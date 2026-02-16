/**
 * ============================================================================
 * FILE: sanitization.ts
 * LAYER: core
 * TYPE: validation
 * ============================================================================
 *
 * PURPOSE:
 * -> Core logic for string sanitization (HTML escaping).
 * -> Recursively sanitize objects to ensure deep cleaning.
 *
 * RESPONSIBILITY:
 * -> Escape HTML entities (&, <, >, ", ').
 * -> Traverse objects to sanitize all string values.
 *
 * ARCHITECTURE POSITION:
 * -> Low-level utility used by XSS protection and other modules.
 *
 * DATA FLOW:
 * -> String -> [Replace Regex] -> Safe String.
 *
 * SECURITY:
 * -> CRITICAL: The actual implementation of the sanitization mechanism.
 *
 * PERFORMANCE:
 * -> Regex replacement is fast.
 * -> Object traversal complexity depends on object depth.
 *
 * IMPROVEMENTS:
 * -> Use a compiled library for more robust HTML stripping if needed.
 *
 * STATUS:
 * -> Stable
 *
 * ============================================================================
 */

// import { escape } from 'querystring';

/**
 * Basic HTML escape to prevent XSS.
 * For robust sanitization, use a library like DOMPurify or sanitize-html.
 */
export const sanitizeInput = (input: string): string => {
    return input
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
};

export const sanitizeObject = (obj: Record<string, unknown>): Record<string, unknown> => {
    const newObj: Record<string, unknown> = {};
    for (const key in obj) {
        if (typeof obj[key] === 'string') {
            newObj[key] = sanitizeInput(obj[key] as string);
        } else if (typeof obj[key] === 'object' && obj[key] !== null) {
            newObj[key] = sanitizeObject(obj[key] as Record<string, unknown>);
        } else {
            newObj[key] = obj[key];
        }
    }
    return newObj;
};
