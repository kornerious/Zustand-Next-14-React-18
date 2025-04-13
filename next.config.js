/** @type {import('next').NextConfig} */
const nextConfig = {
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
    },
};

module.exports = nextConfig; 