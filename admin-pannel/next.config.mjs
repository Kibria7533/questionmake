/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export', // Enable static export
    trailingSlash: true, // Ensures all paths end with a slash (important for S3 hosting)
};

export default nextConfig;
