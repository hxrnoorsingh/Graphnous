/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    const rules = [
      // Fix for Vercel vercel.json routing which prefixes dynamic requests with /frontend
      {
        source: '/frontend/:path*',
        destination: '/:path*',
      }
    ];
    // Only proxy to local backend during development
    if (process.env.NODE_ENV === 'development') {
      rules.push({
        source: '/api/:path*',
        destination: 'http://localhost:8000/:path*',
      });
    }
    return rules;
  },
};

module.exports = nextConfig;
