/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Skip certain routes during build
    skipTrailingSlashRedirect: true,
  },
  // or use this:
  exportPathMap: async function (defaultPathMap) {
    const pathMap = { ...defaultPathMap };
    delete pathMap['/admin/blog'];
    return pathMap;
  },
}

module.exports = nextConfig;