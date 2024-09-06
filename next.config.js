module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets.tina.io",
        port: "",
      },
    ],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  async rewrites() {
    return [
      {
        source: "/",
        destination: "/home",
      },
      {
        source: "/admin",
        destination: "/admin/index.html",
      },
    ];
  },
  async redirects() {
    // Only apply redirects in production
    // if (process.env.NODE_ENV === "production") {
    return [
      {
        source: "https://assets.tina.io/a5107ffd-adb0-45bd-8212-0bf50351d198/:image*", // Match paths like /UUID/IMAGE-FILE.JPG
        destination: "https://assets.tina.io/a5107ffd-adb0-45bd-8212-0bf50351d198/public/uploads/:image*", // Redirect to /UUID/public/uploads/IMAGE-FILE.JPG
        permanent: false, // Use a 302 temporary redirect
      },
    ];
    // }

    // No redirects when not in production (e.g., localhost or development environment)
    return [];
  },
};
