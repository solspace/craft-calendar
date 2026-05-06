/* eslint-disable @typescript-eslint/no-require-imports */
const path = require("node:path");
const webpack = require("webpack");

module.exports = {
  mode: "production",
  target: ["web", "es5"],

  entry: {
    app: path.resolve(__dirname, "../../src/index.tsx"),
    "event-builder": path.resolve(__dirname, "../../src/standalone/event-builder/index.tsx"),
    "widget-agenda": path.resolve(__dirname, "../../src/standalone/widgets/agenda/index.tsx"),
    "widget-mini": path.resolve(__dirname, "../../src/standalone/widgets/mini/index.tsx"),
  },
  output: {
    filename: "[name].js",
    chunkFilename: "[name].js",
    publicPath: "/",
    path: path.resolve(__dirname, "../../../plugin/src/Resources/js/app"),
  },

  module: {
    rules: [
      {
        test: /\.jsx$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                [
                  "@babel/preset-env",
                  {
                    modules: false,
                    bugfixes: true,
                  },
                ],
                "@babel/preset-react",
              ],
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: ["style-loader", { loader: "css-loader" }],
      },
      {
        test: /\.svg$/,
        loader: "@svgr/webpack",
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/i,
        use: [{ loader: "url-loader" }],
      },
    ],
  },

  devtool: false,
  plugins: [
    new webpack.DefinePlugin({
      "process.env.DEBUG_MODE": JSON.stringify(process.env.NODE_ENV === "development"),
    }),
    new webpack.ProvidePlugin({ React: "react" }),
  ],

  ignoreWarnings: [
    {
      module: /react-datepicker\/dist\/index\.es\.js$/,
      message: /Critical dependency: the request of a dependency is an expression/,
    },
  ],

  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
    alias: {
      "@cal": path.resolve(__dirname, "../../src/"),
      "@config": path.resolve(__dirname, "../../config/"),
      "@widgets": path.resolve(__dirname, "../../src/standalone/widgets/"),
      "@event-builder": path.resolve(__dirname, "../../src/standalone/event-builder/"),
    },
  },
};
