const withNextIntl = require("next-intl/plugin")("./src/i18n.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ["images.unsplash.com", "via.placeholder.com"],
  },
  env: {
    _next_intl_trailing_slash: "1",
  },
};

module.exports = withNextIntl(nextConfig);
