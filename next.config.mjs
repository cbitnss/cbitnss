/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true, // disable image optimization for static export
  },
  basePath: '/cbitnss', // <-- update this!
  assetPrefix: '/cbitnss', // <-- update this!
};

module.exports = nextConfig;
