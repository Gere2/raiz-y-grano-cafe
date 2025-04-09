/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export", // Generates static HTML files
    basePath: "/raiz-y-grano-cafe/pedidos", // Full path including repository name
    trailingSlash: true, // Add trailing slashes to all URLs
    images: {
      unoptimized: true, // Required for static export
    },
    // Ensure environment variables are available
    env: {
      NEXT_PUBLIC_FIREBASE_API_KEY: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      NEXT_PUBLIC_FIREBASE_PROJECT_ID: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      NEXT_PUBLIC_FIREBASE_APP_ID: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
      NEXT_PUBLIC_BASE_PATH: "/raiz-y-grano-cafe/pedidos", // Make base path available to client
    },
  }
  
  module.exports = nextConfig
  