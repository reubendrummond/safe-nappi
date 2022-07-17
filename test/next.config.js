const {nappiPlugin} = require("safe-nappi/plugin");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = nappiPlugin(nextConfig);
