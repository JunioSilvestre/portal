/**
 * ============================================================================
 * FILE: logger.ts
 * LAYER: core
 * TYPE: util
 * ============================================================================
 *
 * PURPOSE:
 * -> Centralize logging structure and destination.
 * -> Ensure all logs contain necessary context (User ID, IP, Role).
 *
 * RESPONSIBILITY:
 * -> Format log entries (JSON).
 * -> Mask sensitive data (PII) before logging (if implemented).
 * -> Transport logs to correct output (Console, File, External Service).
 *
 * ARCHITECTURE POSITION:
 * -> Key Infrastructure Utility used by the entire backend/core.
 *
 * DATA FLOW:
 * -> Log Call -> [Context Enrichment] -> [Formatting] -> Output.
 *
 * SECURITY:
 * -> FAILURE TO LOG is a security risk (non-repudiation).
 * -> LOGGING TOO MUCH is a risk (PII leakage).
 *
 * PERFORMANCE:
 * -> Must be non-blocking (especially for remote transports).
 *
 * IMPROVEMENTS:
 * -> Integrate with Datadog/Splunk/ELK.
 * -> Add log rotation.
 *
 * STATUS:
 * -> Stable (Console Output)
 *
 * ============================================================================
 */

import { SecurityContext } from '../types/security.types';

type LogLevel = 'info' | 'warn' | 'error' | 'audit';

export const logSecurityEvent = (level: LogLevel, message: string, context?: SecurityContext, metadata?: Record<string, unknown>) => {
    const timestamp = new Date().toISOString();

    // In production, this would ship to ELK/Datadog/CloudWatch
    console.log(JSON.stringify({
        timestamp,
        level,
        message,
        userId: context?.userId || 'anonymous',
        ip: context?.ip || 'unknown',
        role: context?.role || 'none',
        ...metadata
    }));
};
