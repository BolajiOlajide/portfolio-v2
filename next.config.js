const path = require("path");
const withMDX = require("@next/mdx")();

const nextConfig = {
  pageExtensions: ["mdx", "ts", "tsx"],

  reactStrictMode: true,
  swcMinify: true,

  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
      };
    }

    return config;
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
};

module.exports = withMDX(nextConfig);
