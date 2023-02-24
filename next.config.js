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
    API_URL: 'https://ug-mern-blog.onrender.com'
  },
}

module.exports = nextConfig