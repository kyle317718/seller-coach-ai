/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    experimental: {
        // appDir is enabled by default in Next.js 13+
    },
    webpack: (config) => {
        config.resolve.alias = {
            ...config.resolve.alias,
            '@components': './components'
        };
        return config;
    }
};

module.exports = nextConfig; 