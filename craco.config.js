module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // Suppress source map warnings for problematic packages
      webpackConfig.module.rules.forEach((rule) => {
        if (rule.use && Array.isArray(rule.use)) {
          rule.use.forEach((use) => {
            if (use.loader && use.loader.includes('source-map-loader')) {
              use.options = {
                ...use.options,
                filterSourceMappingUrl: (url, resourcePath) => {
                  // Ignore source map warnings for these problematic packages
                  const problematicPackages = [
                    'html5-qrcode',
                    '@mediapipe',
                    'zxing-html5-qrcode-decoder',
                    'vision_bundle'
                  ];
                  
                  return !problematicPackages.some(pkg => 
                    resourcePath.includes(pkg) || url.includes(pkg)
                  );
                },
              };
            }
          });
        }
      });

      // Alternative approach: modify ignoreWarnings
      webpackConfig.ignoreWarnings = [
        {
          module: /html5-qrcode/,
        },
        {
          module: /@mediapipe/,
        },
        {
          message: /Failed to parse source map/,
        },
        {
          message: /ENOENT.*\.ts/,
        },
        function(warning) {
          return warning.message && 
                 warning.message.includes('Failed to parse source map') &&
                 (warning.message.includes('html5-qrcode') ||
                  warning.message.includes('@mediapipe') ||
                  warning.message.includes('vision_bundle'));
        }
      ];
      
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
