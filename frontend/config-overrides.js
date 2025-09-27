const { override, addWebpackPlugin } = require('customize-cra');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

// This configuration is necessary to prevent Webpack from enforcing strict
// extension resolution when the project is running inside certain CI/CD environments.
// It allows imports like `import App from './App'` to work correctly.

module.exports = override(
  // 1. Adds polyfills for Node core modules, often necessary in environments like Vercel
  addWebpackPlugin(new NodePolyfillPlugin()),

  // 2. Adjusts Webpack resolution to allow missing extensions for local modules
  (config) => {
    config.resolve = {
      ...config.resolve,
      // Temporarily disable the enforceExtension rule if it is present
      enforceExtension: false,
    };
    return config;
  }
);
