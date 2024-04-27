/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    fastRefresh: true,
    concurrentFeatures: true,
    eslint: {
        ignoreDuringBuilds: true,
    },
};

module.exports = nextConfig;
