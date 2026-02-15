/**
 * @file next.config.mjs
 * @description Next.js configuration file for the Portal application.
 * Handles build settings, webpack configuration (including Windows file watcher fixes),
 * security headers, image optimization, and performance tuning.
 */

/** @type {import('next').NextConfig} */
const nextConfig = {
    // ============================================
    // PERFORMANCE
    // ============================================
    reactStrictMode: true,
    swcMinify: true,

    // ============================================
    // WEBPACK CONFIG
    // ============================================
    webpack: (config, { dev, isServer }) => {
        // Watch options - otimizado para Windows
        config.watchOptions = {
            poll: dev ? 1000 : undefined, // Polling apenas em dev
            aggregateTimeout: 300,
            ignored: [
                '**/node_modules/**',
                '**/.git/**',
                '**/.next/**',
                '**/out/**',
                // Arquivos do sistema Windows
                'C:/*.sys',
                'C:/*.tmp',
                'C:/*.log',
                '**/*.sys',
                '**/*.tmp',
                '**/*.log',
            ],
        }

        // Fallbacks para evitar erros de módulos Node.js no browser
        if (!isServer) {
            config.resolve.fallback = {
                ...config.resolve.fallback,
                fs: false,
                net: false,
                tls: false,
            }
        }

        return config
    },

    // ============================================
    // HEADERS DE SEGURANÇA
    // ============================================
    async headers() {
        return [
            {
                source: '/:path*',
                headers: [
                    {
                        key: 'X-DNS-Prefetch-Control',
                        value: 'on',
                    },
                    {
                        key: 'X-Frame-Options',
                        value: 'SAMEORIGIN',
                    },
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff',
                    },
                    {
                        key: 'X-XSS-Protection',
                        value: '1; mode=block',
                    },
                    {
                        key: 'Referrer-Policy',
                        value: 'origin-when-cross-origin',
                    },
                ],
            },
        ]
    },

    // ============================================
    // IMAGENS
    // ============================================
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**',
            },
        ],
        formats: ['image/avif', 'image/webp'],
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    },

    // ============================================
    // EXPERIMENTAL (Next.js 15+)
    // ============================================
    experimental: {
        optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
    },
}

export default nextConfig