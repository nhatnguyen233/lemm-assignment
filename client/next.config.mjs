/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/api/(.*)",
        headers: [
          {
            key: "X-Forwarded-For",
            value: ":true", // This ensures the client IP is forwarded to the backend
          },
        ],
      },
    ];
  },
};

export default nextConfig;
