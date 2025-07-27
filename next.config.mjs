// next.config.mjs

/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  // Required for static HTML export
  output: 'export',

  // Optional: Set basePath if your GitHub Pages URL will be like
  // 'https://<your-username>.github.io/your-repo-name/'
  // Replace 'your-repo-name' with the actual name of your GitHub repository.
  // If deploying to the root of a custom domain or 'yourusername.github.io' (no repo name),
  // you can set basePath to '' or remove this line.
  basePath: isProd ? '/your-repo-name' : '',

  // Optional: Configure assetPrefix if you use a CDN or need specific asset paths.
  // This should usually match basePath, but with a trailing slash.
  assetPrefix: isProd ? '/your-repo-name/' : '',

  // Crucial for static export if you are using Next.js <Image> component.
  // GitHub Pages does not support Next.js's default Image Optimization (which requires a server).
  images: {
    unoptimized: true,
  },

  // You can add other Next.js configurations here if needed
  // For example, if you're using the App Router and need to configure experimental features:
  // experimental: {
  //   serverActions: true,
  // },
};

export default nextConfig;
