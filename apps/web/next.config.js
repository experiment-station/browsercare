/** @type {import('next').NextConfig} */
const nextConfig = {
  beforeFiles: [
    {
      source: "/:path*",
      has: [
        {
          type: "host",
          value: "cdn.browser.care",
        },
      ],
      destination: "/cdn/:path*",
    },
  ],
};

module.exports = nextConfig;
