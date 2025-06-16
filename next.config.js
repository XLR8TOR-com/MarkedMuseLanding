/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  // Ensure compatibility with Cloudflare Workers
  experimental: {
    optimizePackageImports: ['@radix-ui/react-icons', 'lucide-react'],
  },
};

// Add Cloudflare Pages/Workers compatibility
if (process.env.NODE_ENV === 'production') {
  // Handle Cloudflare Pages/Workers specific configuration
  console.log('Building for Cloudflare Pages/Workers');
}

module.exports = nextConfig;
