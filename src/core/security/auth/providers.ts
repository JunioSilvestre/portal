/**
 * ============================================================================
 * FILE: providers.ts
 * LAYER: core
 * TYPE: config
 * ============================================================================
 *
 * PURPOSE:
 * -> Configuration for OAuth providers (Google, GitHub, etc.).
 * -> Centralize Client IDs and Secrets.
 *
 * RESPONSIBILITY:
 * -> Store provider-specific settings.
 * -> Map environment variables to configuration objects.
 *
 * ARCHITECTURE POSITION:
 * -> Consumed by Auth handling services (e.g., NextAuth or custom OAuth logic).
 *
 * DATA FLOW:
 * -> Env Vars -> Config Object -> Auth Service.
 *
 * SECURITY:
 * -> CRITICAL: Contains sensitive credentials (via env vars).
 * -> Ensure secrets are never exposed to the client bundle.
 *
 * PERFORMANCE:
 * -> Static configuration.
 *
 * IMPROVEMENTS:
 * -> Add support for more providers dynamically.
 *
 * STATUS:
 * -> Stable
 *
 * ============================================================================
 */

export const AUTH_PROVIDERS = {
    GOOGLE: {
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        scope: ['email', 'profile'],
    },
    GITHUB: {
        clientId: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        scope: ['user:email'],
    }
};

export const getProviderAuthUrl = (provider: keyof typeof AUTH_PROVIDERS) => {
    // Logic to generate OAuth URL
    return `https://auth.example.com/${provider.toLowerCase()}`;
};
