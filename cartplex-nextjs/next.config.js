/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  images : {
    domains: ['localhost:8000' , 'localhost'],
  }
}

module.exports = nextConfig
