const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-ts");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
require("dotenv").config({
  path: require("find-config")(".env"),
});

module.exports = (webpackConfigEnv, argv) => {
  const orgName = "samply";
  const defaultConfig = singleSpaDefaults({
    orgName,
    projectName: "root-config",
    webpackConfigEnv,
    argv,
    disableHtmlGeneration: true,
  });

  return merge(defaultConfig, {
    // Add devServer configuration here to ensure static files are served correctly
    devServer: {
      static: {
        directory: path.join(__dirname, 'dist'), // Serve static files from dist directory
      },
      historyApiFallback: {
        rewrites: [
          {
            from: /^\/libs\/.*/,
            to: '/libs/index.html', // Ensure that /libs paths are handled by Webpack
          },
        ],
      },
    },
    plugins: [
      new HtmlWebpackPlugin({
        inject: false,
        template: "src/index.ejs",
        templateParameters: {
          isLocal: webpackConfigEnv && webpackConfigEnv.isLocal,
          orgName,
        },
        favicon: "src/favicon.ico"
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, 'node_modules/regenerator-runtime/runtime.js'),
            to: 'libs/runtime.js'
          },
          {
            from: path.resolve(__dirname, 'node_modules/single-spa/lib/system/single-spa.min.js'),
            to: 'libs/single-spa.min.js'
          },
          {
            from: path.resolve(__dirname, 'node_modules/zone.js/fesm2015/zone.js'),
            to: 'libs/zone.js'
          },
          {
            from: path.resolve(__dirname, 'node_modules/systemjs/dist/system.min.js'),
            to: 'libs/system.min.js'
          },
          {
            from: path.resolve(__dirname, 'node_modules/systemjs/dist/system.js'),
            to: 'libs/system.js'
          },
          {
            from: path.resolve(__dirname, 'node_modules/systemjs/dist/extras/amd.min.js'),
            to: 'libs/amd.min.js'
          },
          {
            from: path.resolve(__dirname, 'node_modules/systemjs/dist/extras/amd.js'),
            to: 'libs/amd.js'
          },
          {
            from: path.resolve(__dirname, 'node_modules/import-map-overrides/dist/import-map-overrides.js'),
            to: 'libs/import-map-overrides.js'
          }
        ]
      }),
      new webpack.DefinePlugin({
        "process.env": JSON.stringify(process.env),
      }),
    ],
  });
};
