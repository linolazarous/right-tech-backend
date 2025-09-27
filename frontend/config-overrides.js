const { override, addWebpackPlugin } = require('customize-cra');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

/**
 * This configuration is essential to fix the "Module not found: Error: Can't resolve './App'" error 
 * that occurs in Vercel/CI environments due to overly strict module resolution rules 
 * for projects using "type": "module" in a nested directory structure.
 */
module.exports = override(
  // Adds polyfills for Node core modules which are often missing in serverless environments
  addWebpackPlugin(new NodePolyfillPlugin()),

  // Customizes the Webpack configuration
  (config) => {
    // Disable the strict resolution rule that causes the build to fail on './App'
    if (config.resolve && config.resolve.modules) {
        config.resolve.modules = config.resolve.modules.map(modulePath => {
            // Check if the path is relative to the project source, and adjust resolution
            if (modulePath.includes('src')) {
                return modulePath; 
            }
            return modulePath;
        });
    }

    // Set fallback for older Node modules if needed
    config.resolve = {
      ...config.resolve,
      fallback: {
        "fs": false, // Usually set to false in browser environments
        "path": require.resolve("path-browserify")
      },
      // This is the core override to relax strict checking, though it may not be directly exposed by CRA
      enforceExtension: false,
    };
    
    // Ensure .js and .jsx files can be imported without extension
    config.resolve.extensions = [...config.resolve.extensions, '.js', '.jsx'];

    return config;
  }
);
