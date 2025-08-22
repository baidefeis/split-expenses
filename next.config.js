/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    // Fix for module resolution in Vercel
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': require('path').resolve(__dirname, 'src'),
    };
    return config;
  },
  // Output file tracing for better Vercel compatibility
  outputFileTracingRoot: __dirname,
}

module.exports = nextConfig
