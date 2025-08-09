/*
Copyright © 2025 Defend I.T. Solutions LLC. All Rights Reserved.

This software and its source code are the proprietary property of
Defend I.T. Solutions LLC and are protected by United States and
international copyright laws. Unauthorized reproduction, distribution,
modification, display, or use of this software, in whole or in part, without the
prior written permission of Defend I.T. Solutions LLC, is strictly prohibited.

This software is provided for use only by authorized employees, contractors, or
licensees of Defend I.T. Solutions LLC and may not be disclosed to any third
party without express written consent.
*/

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
  connect-src 'self' https://ipwho.is https://ipapi.co;
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
