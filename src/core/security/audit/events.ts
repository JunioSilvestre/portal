/**
 * ============================================================================
 * FILE: events.ts
 * LAYER: core
 * TYPE: config
 * ============================================================================
 *
 * PURPOSE:
 * -> Define a taxonomy of security-relevant system events.
 * -> Ensure consistency in audit logs (no magic strings).
 *
 * RESPONSIBILITY:
 * -> Registry of all possible audit event types (LOGIN, LOGOUT, ACCESS_DENIED).
 *
 * ARCHITECTURE POSITION:
 * -> Imported by Logger and Tracking modules.
 *
 * DATA FLOW:
 * -> Constant String -> Logger -> Audit Trail.
 *
 * SECURITY:
 * -> Ensures we can reliably query logs for specific security incidents.
 *
 * PERFORMANCE:
 * -> Static constants.
 *
 * IMPROVEMENTS:
 * -> Group events by category (Auth, Data, System).
 *
 * STATUS:
 * -> Stable
 *
 * ============================================================================
 */

export const AUDIT_EVENTS = {
    LOGIN_SUCCESS: 'auth.login.success',
    LOGIN_FAILURE: 'auth.login.failure',
    LOGOUT: 'auth.logout',
    USER_CREATED: 'user.created',
    USER_DELETED: 'user.deleted',
    PASSWORD_CHANGED: 'user.password_changed',
    ACCESS_DENIED: 'security.access_denied',
    SENSITIVE_DATA_ACCESSED: 'security.sensitive_data_accessed',
};
