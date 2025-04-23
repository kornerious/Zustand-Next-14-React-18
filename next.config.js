/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
    // Optimize image loading
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'fakestoreapi.com',
                pathname: '/img/**',
            },
            {
                protocol: 'https',
                hostname: 'images.pexels.com',
                pathname: '/photos/**',
            },
            {
                protocol: 'https',
                hostname: 'cdn.pixabay.com',
                pathname: '/photo/**',
            },
            {
                protocol: 'https',
                hostname: '**',
                pathname: '/**',
            }
        ],
        formats: ['image/avif', 'image/webp'],
        minimumCacheTTL: 60,
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    },
    
    // Performance optimizations
    reactStrictMode: true,
    
    // Compile-time optimizations
    compiler: {
        removeConsole: process.env.NODE_ENV === 'production',
    },
    
    // Improve response headers for better performance
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=31536000',
                    },
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff',
                    },
                ],
            },
            {
                source: '/(.*)\\.(jpg|jpeg|png|webp|avif|ico|svg)',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=31536000, immutable',
                    },
                ],
            },
        ];
    },
    
    // Enable webpack optimizations for production
    webpack: (config, { dev, isServer }) => {
        // Enable tree shaking and optimizations only for production builds
        if (!dev && !isServer) {
            config.optimization.runtimeChunk = 'single';
            config.optimization.splitChunks = {
                chunks: 'all',
                maxInitialRequests: 25,
                minSize: 20000,
                cacheGroups: {
                    default: false,
                    vendors: false,
                    framework: {
                        name: 'framework',
                        test: /[\\/]node_modules[\\/](@mui|react|react-dom|zustand)[\\/]/,
                        priority: 40,
                        enforce: true,
                    },
                    lib: {
                        test: /[\\/]node_modules[\\/]/,
                        name(module) {
                            const match = module.context.match(/[\\/]node_modules[\\/](.+?)(?:[\\/]|$)/);
                            if (match && match[1]) {
                                const packageName = match[1];
                                return `npm.${packageName.replace('@', '')}`;
                            }
                            // Provide a fallback name if the pattern doesn't match
                            return 'npm.unknown';
                        },
                        priority: 30,
                    },
                    commons: {
                        name: 'commons',
                        minChunks: 2,
                        priority: 20,
                    },
                    shared: {
                        name: false,
                        priority: 10,
                        minChunks: 2,
                        reuseExistingChunk: true,
                    },
                },
            };
        }
        return config;
    },
};

module.exports = withBundleAnalyzer(nextConfig);