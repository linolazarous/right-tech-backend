const { override, addWebpackPlugin } = require('customize-cra');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

module.exports = override(
  addWebpackPlugin(new NodePolyfillPlugin()),
  
  (config) => {
    // Fix module resolution issues
    config.resolve = {
      ...config.resolve,
      extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
      fallback: {
        "fs": false,
        "path": require.resolve("path-browserify"),
        "stream": require.resolve("stream-browserify"),
        "crypto": require.resolve("crypto-browserify")
      }
    };
    
    return config;
  }
);
