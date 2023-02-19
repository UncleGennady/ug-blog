/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ug-mern-blog.onrender.com',
        port: '',
        pathname: '/uploads/**',
      },
    ],
  },
}

module.exports = nextConfig