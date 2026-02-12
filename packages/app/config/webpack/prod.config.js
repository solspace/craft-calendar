/* eslint-disable @typescript-eslint/no-require-imports */
const TerserPlugin = require("terser-webpack-plugin");

const { merge } = require("webpack-merge");
const baseConfig = require("./base.config.js");

module.exports = merge(baseConfig, {
  performance: {
    maxAssetSize: 1024 * 1024 * 5,
    maxEntrypointSize: 1024 * 1024 * 5,
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [{ loader: "ts-loader" }],
      },
    ],
  },

  optimization: {
    sideEffects: true,
    providedExports: true,
    usedExports: true,
    innerGraph: true,
    concatenateModules: true,
    mangleExports: "deterministic",
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
        extractComments: false,
        terserOptions: {
          compress: {
            passes: 2,
            pure_getters: true,
          },
          ecma: 2018,
          module: true,
          mangle: true,
          toplevel: true,
          format: {
            comments: false,
          },
        },
      }),
    ],
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          chunks: "initial",
          name: "vendor",
          enforce: true,
        },
      },
    },
  },
});
