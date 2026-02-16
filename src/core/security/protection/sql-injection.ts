/**
 * ============================================================================
 * FILE: sql-injection.ts
 * LAYER: core
 * TYPE: protection
 * ============================================================================
 *
 * PURPOSE:
 * -> Helpers to prevent SQL Injection in dynamic queries (e.g., sorting).
 * -> Detect obvious SQL keywords in input (Pattern Matching).
 *
 * RESPONSIBILITY:
 * -> Whitelist allowed columns for sorting/filtering.
 * -> Flag inputs containing dangerous SQL keywords.
 *
 * ARCHITECTURE POSITION:
 * -> Used by Data Access Layer or Service Layer before query construction.
 *
 * DATA FLOW:
 * -> Input Column -> [Whitelist Check] -> Safe Column / Error.
 *
 * SECURITY:
 * -> CRITICAL: Prevents database compromise via injection.
 * -> COMPLEMENTARY to ORM/Parameterized queries (does not replace them).
 *
 * PERFORMANCE:
 * -> Simple string checks / regex.
 *
 * IMPROVEMENTS:
 * -> None needed if ORM is used correctly.
 *
 * STATUS:
 * -> Stable
 *
 * ============================================================================
 */

/**
 * Validates that a sort column is allowed.
 * useful for dynamic 'ORDER BY' clauses which are common injection points.
 */
export const validateSortColumn = (column: string, allowedColumns: string[]): string => {
    if (!allowedColumns.includes(column)) {
        throw new Error(`Invalid sort column: ${column}`);
    }
    return column;
};

/**
 * Basic pattern matcher for SQL keywords in input (Primitive detection).
 * Prefer using ORM/Parameterized queries instead of this manual check.
 */
export const detectSqlInjection = (input: string): boolean => {
    const sqlPattern = /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|UNION|ALTER)\b)|(['"])/i;
    return sqlPattern.test(input);
};
