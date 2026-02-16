/**
 * @file constants.ts
 * @description Security-related constants and configuration values.
 * @author Senior Engineer Logic
 */

/**
 * ============================================================================
 * FILE: constants.ts
 * LAYER: core
 * TYPE: config
 * ============================================================================
 *
 * PURPOSE:
 * -> Centralize security-related constants (timeouts, max lengths, salt rounds).
 * -> Eliminate magic numbers in the codebase.
 *
 * RESPONSIBILITY:
 * -> Single source of truth for configuration values.
 *
 * ARCHITECTURE POSITION:
 * -> Imported by auth, encryption, and validation modules.
 *
 * DATA FLOW:
 * -> Static constants consumed by various logic layers.
 *
 * SECURITY:
 * -> Defines critical constraints like password length and token expiry.
 *
 * PERFORMANCE:
 * -> Zero runtime overhead (compile-time constants).
 *
 * IMPROVEMENTS:
 * -> Could be moved to environment variables for greater flexibility.
 *
 * STATUS:
 * -> Stable
 *
 * ============================================================================
 */

export const SECURITY_CONSTANTS = {
    BCRYPT_ROUNDS: 12,
    SESSION_MAX_AGE: 60 * 60 * 24 * 7, // 7 days
    TOKEN_EXPIRY: '15m',
    REFRESH_TOKEN_EXPIRY: '7d',
    PASSWORD_MIN_LENGTH: 12,
    MAX_LOGIN_ATTEMPTS: 5,
    LOCKOUT_DURATION: 60 * 15, // 15 minutes
    CORS_ALLOWED_ORIGINS: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'],
};
