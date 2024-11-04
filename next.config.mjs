/** @type {import('next').NextConfig} */
const nextConfig = {};
nextConfig.images = {
    remotePatterns: [
        {
            protocol: "https",
            hostname: "placehold.co",
        },
    ],
};
export default nextConfig;
