/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    domains: ['images.unsplash.com', 'res.cloudinary.com'], // Keeping your image domains
  },
}

module.exports = nextConfig