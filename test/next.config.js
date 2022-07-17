const { nappiPlugin } = require("safe-nappi");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = nappiPlugin(nextConfig);
