import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import dotenv from "dotenv";
import ReactRefreshTypeScript from "react-refresh-typescript";
import createStyledComponentsTransformer from "typescript-plugin-styled-components";
import { merge } from "webpack-merge";

import baseConfig from "./base.config.js";

// Load environment variables from root .env file
dotenv.config({
  path: resolve(dirname(fileURLToPath(import.meta.url)), "../../../../.env"),
});

const host = process.env.APP_HOST || "127.0.0.1";
const port = process.env.APP_PORT || 8080;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let serverOptions;
if (existsSync(resolve(__dirname, "certs/key.pem"))) {
  serverOptions = {
    key: readFileSync(resolve(__dirname, "certs/key.pem")),
    cert: readFileSync(resolve(__dirname, "certs/cert.pem")),
  };
}

const clientDir = resolve(__dirname, "../../../plugin/src/Resources/js/app");

export default merge(baseConfig, {
  mode: "development",

  output: {
    filename: "[name].js",
    chunkFilename: "[name].js",
    publicPath: `https://${host}:${port}/`,
    path: clientDir,
  },

  devServer: {
    host,
    port,
    allowedHosts: "all",
    hot: true,
    server: {
      type: "https",
      options: serverOptions,
    },
    client: {
      webSocketURL: `https://${host}:${port}/ws`,
    },
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers":
        "X-Requested-With, content-type, Authorization",
    },
    static: {
      directory: clientDir,
    },
  },

  plugins: [new ReactRefreshWebpackPlugin()],

  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "ts-loader",
            options: {
              getCustomTransformers: () => ({
                before: [
                  ReactRefreshTypeScript(),
                  createStyledComponentsTransformer.default(),
                ],
              }),
              configFile: resolve(__dirname, "../../tsconfig.build.json"),
              transpileOnly: true,
            },
          },
        ],
      },
    ],
  },

  devtool: "eval-source-map",
});
