/**
 * On Vercel the site runs as a normal Next.js app (with image optimisation).
 * `npm run export` sets STATIC_EXPORT=1 and produces a plain static site in /out
 * that can be hosted anywhere.
 */
const isExport = process.env.STATIC_EXPORT === "1";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  ...(isExport
    ? { output: "export", images: { unoptimized: true }, trailingSlash: true }
    : {}),
};

export default nextConfig;
