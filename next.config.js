// next.config.js
module.exports = {
  webpack: (config, { isServer }) => {
    // Exclude fs module from client bundle
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        net: false,
        tls: false,
        child_process: false,
      };
    }
    return config;
  },
};
