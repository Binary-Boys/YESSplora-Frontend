module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // Suppress source map warnings for html5-qrcode and mediapipe
      webpackConfig.module.rules.forEach((rule) => {
        if (rule.use && Array.isArray(rule.use)) {
          rule.use.forEach((use) => {
            if (use.loader && use.loader.includes('source-map-loader')) {
              use.options = {
                ...use.options,
                filterSourceMappingUrl: (url, resourcePath) => {
                  // Ignore source map warnings for html5-qrcode and mediapipe
                  if (resourcePath.includes('html5-qrcode') || 
                      resourcePath.includes('@mediapipe') ||
                      resourcePath.includes('zxing-html5-qrcode-decoder')) {
                    return false;
                  }
                  return true;
                },
              };
            }
          });
        }
      });
      
      return webpackConfig;
    },
  },
  // Disable source maps entirely for development
  devServer: {
    devMiddleware: {
      writeToDisk: false,
    },
  },
};
