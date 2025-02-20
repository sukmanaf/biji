/** @type {import('next').NextConfig} */
const nextConfig = {};

// next.config.mjs
export default {
  typescript: {
    ignoreBuildErrors: true,
  },
  async redirects() {
    return [
      {
        source: '/', // Rute root
        destination: '/dashboard', // Rute default yang diinginkan
        permanent: true, // Gunakan true jika redirect bersifat permanen (HTTP 308)
      },
    ];
  },
  images: {
    unoptimized: true, // Biarkan Next.js membaca gambar langsung tanpa optimasi
  },
};

