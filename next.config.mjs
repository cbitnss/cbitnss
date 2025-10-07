// next.config.mjs

/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  output: 'export',
  basePath: isProd ? '/cbitnss' : '',

  assetPrefix: isProd ? 'cbitnss' : '',
images: {
    unoptimized: true,
  },

};

export default nextConfig;
