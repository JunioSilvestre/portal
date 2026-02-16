/**
 * ============================================================================
 * FILE: permissions.ts
 * LAYER: core
 * TYPE: config
 * ============================================================================
 *
 * PURPOSE:
 * -> Define granular permissions (Resource + Action) for the entire system.
 * -> Act as the single source of truth for potential user actions.
 *
 * RESPONSIBILITY:
 * -> Map abstract actions (e.g., READ, WRITE) to concrete resources.
 * -> Provide constants for RBAC checks.
 *
 * ARCHITECTURE POSITION:
 * -> Imported by RBAC logic and UI components (for conditional rendering).
 *
 * DATA FLOW:
 * -> Static Definitions -> RBAC Service -> Boolean Decision.
 *
 * SECURITY:
 * -> CRITICAL: Defines the vocabulary of the authorization system.
 *
 * PERFORMANCE:
 * -> Zero runtime overhead (static objects).
 *
 * IMPROVEMENTS:
 * -> Move to database if permissions need to be dynamic per tenant.
 *
 * STATUS:
 * -> Stable
 *
 * ============================================================================
 */

import { Permission } from '../types/security.types';

export const PERMISSIONS = {
    USERS: {
        CREATE: { resource: 'user', action: 'create' } as Permission,
        READ: { resource: 'user', action: 'read' } as Permission,
        UPDATE: { resource: 'user', action: 'update' } as Permission,
        DELETE: { resource: 'user', action: 'delete' } as Permission,
    },
    REPORTS: {
        READ: { resource: 'report', action: 'read' } as Permission,
    },
};
