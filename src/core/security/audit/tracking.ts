/**
 * ============================================================================
 * FILE: tracking.ts
 * LAYER: core
 * TYPE: service
 * ============================================================================
 *
 * PURPOSE:
 * -> High-level abstraction for tracking user activity and business events.
 * -> Bridge between application logic and audit logging.
 *
 * RESPONSIBILITY:
 * -> Offer simple API (trackActivity) for business logic.
 * -> Enforce context requirements.
 *
 * ARCHITECTURE POSITION:
 * -> Used by Feature Modules (e.g., "User updated profile").
 *
 * DATA FLOW:
 * -> App Action -> tracking.ts -> logger.ts -> Output.
 *
 * SECURITY:
 * -> Ensures accountability for user actions.
 *
 * PERFORMANCE:
 * -> Minimal wrapper around logger.
 *
 * IMPROVEMENTS:
 * -> Add batching for high-volume events.
 *
 * STATUS:
 * -> Stable
 *
 * ============================================================================
 */

import { logSecurityEvent } from './logger';
import { SecurityContext } from '../types/security.types';

export const trackActivity = (event: string, context: SecurityContext, details?: Record<string, unknown>) => {
    logSecurityEvent('audit', `Activity: ${event}`, context, details);
};
