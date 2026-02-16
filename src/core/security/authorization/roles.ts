/**
 * ============================================================================
 * FILE: roles.ts
 * LAYER: core
 * TYPE: config
 * ============================================================================
 *
 * PURPOSE:
 * -> Define user roles and their hierarchical relationships.
 * -> Establish the authorization tiers (Admin > Manager > User).
 *
 * RESPONSIBILITY:
 * -> Enumerate available roles.
 * -> Define role weights for hierarchy checks (e.g., hasHigherRole).
 *
 * ARCHITECTURE POSITION:
 * -> Used by RBAC, Middleware, and User Management.
 *
 * DATA FLOW:
 * -> Role String -> Hierarchy Lookup -> Numeric Weight.
 *
 * SECURITY:
 * -> CRITICAL: determines the scope of access for a user.
 *
 * PERFORMANCE:
 * -> O(1) lookup speed.
 *
 * IMPROVEMENTS:
 * -> Allow custom roles defined in the database.
 *
 * STATUS:
 * -> Stable
 *
 * ============================================================================
 */

import { UserRole } from '../types/security.types';

export const ROLES: Record<string, UserRole> = {
    ADMIN: 'admin',
    MANAGER: 'manager',
    AUDITOR: 'auditor',
    USER: 'user',
};

export const ROLE_HIERARCHY: Record<UserRole, number> = {
    'admin': 100,
    'manager': 50,
    'auditor': 30,
    'user': 10,
};

export const hasHigherRole = (roleA: UserRole, roleB: UserRole): boolean => {
    return ROLE_HIERARCHY[roleA] > ROLE_HIERARCHY[roleB];
};
