/**
 * ============================================================================
 * FILE: rbac.ts
 * LAYER: core
 * TYPE: service
 * ============================================================================
 *
 * PURPOSE:
 * -> Implement Role-Based Access Control reasoning.
 * -> Decide if a user with Role X can perform Action Y on Resource Z.
 *
 * RESPONSIBILITY:
 * -> Map Roles to a set of Permissions.
 * -> Evaluate permission requests against the mapping.
 *
 * ARCHITECTURE POSITION:
 * -> The central Authorization Engine.
 * -> Called by Middleware, API Routes, and Directives.
 *
 * DATA FLOW:
 * -> (UserRole, RequiredPermission) -> [Logic] -> Boolean.
 *
 * SECURITY:
 * -> CRITICAL: The Gatekeeper. Bugs here lead to privilege escalation.
 *
 * PERFORMANCE:
 * -> Must be extremely fast as it runs frequently (directives, route guards).
 * -> Uses array lookups (optimize to Set for large permission sets).
 *
 * IMPROVEMENTS:
 * -> Cache permissions per role to avoid re-calculation.
 * -> Support "Deny" permissions (exceptions).
 *
 * STATUS:
 * -> Stable
 *
 * ============================================================================
 */

import { UserRole, Permission } from '../types/security.types';
import { PERMISSIONS } from './permissions';

// Map roles to permissions
const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
    admin: Object.values(PERMISSIONS.USERS), // Admin has all user permissions
    manager: [PERMISSIONS.USERS.READ, PERMISSIONS.USERS.UPDATE],
    auditor: [PERMISSIONS.USERS.READ, PERMISSIONS.REPORTS.READ],
    user: [],
};

export const hasPermission = (role: UserRole, requiredPermission: Permission): boolean => {
    const permissions = ROLE_PERMISSIONS[role] || [];
    return permissions.some(
        (p) => p.resource === requiredPermission.resource && p.action === requiredPermission.action
    );
};
