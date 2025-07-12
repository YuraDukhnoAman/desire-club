const withNextIntl = require("next-intl/plugin")("./src/i18n.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath:
    process.env.NODE_ENV === "production" ? "/disire-music-club-website" : "",
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ["images.unsplash.com", "via.placeholder.com"],
    unoptimized: true,
  },
  env: {
    _next_intl_trailing_slash: "1",
  },
};

module.exports = withNextIntl(nextConfig);
