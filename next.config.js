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
  env:{
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL
  },
}

module.exports = nextConfig

const removeImports = require('next-remove-imports')();
module.exports = removeImports({});