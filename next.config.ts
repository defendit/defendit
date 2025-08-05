// next.config.js

/** @type {import('next').NextConfig} */
const cspHeader = `
  default-src 'self';
  img-src 'self';
  script-src 'self';
  script-src-elem 'self';
  style-src 'self' ;
  frame-src 'self';
  font-src 'self';
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  connect-src 'self' https://get.geojs.io;
  frame-ancestors 'self';
`
  .replace(/\n/g, "")
  .trim();

const nextConfig = {
  // reactStrictMode: true,
  devIndicators: false,
  headers: async () => {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: cspHeader,
          },
        ],
      },
    ];
  },
};

export default nextConfig;
