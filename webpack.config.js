/*
 * @Description: webpack configuration
 * @Author: ekibun
 * @Date: 2020-05-21 20:44:00
 * @LastEditors: ekibun
 * @LastEditTime: 2020-05-22 22:18:19
 */
const path = require('path');
const webpack = require('webpack');
const config = require('./config');
const ScriptDevPlugin = require('./script-dev-webpack-plugin');

const cssLoaderConfig = [
  'style-loader',
  {
    loader: 'css-loader',
    options: {
      modules: true,
    },
  },
];

/** @type { webpack.Configuration } */
module.exports = {
  entry: Object.assign({}, ...config.entry.map((entry) => ({
    [entry]: path.join(__dirname, `src/${entry}/index.js`),
  }))),
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].user.js',
  },
  externals: Object.assign({}, ...config.externals.deps.map(
    ([dep, variable]) => ({ [dep]: variable }),
  )),
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.less$/,
        use: [
          ...cssLoaderConfig,
          'less-loader',
        ],
      },
      {
        test: /\.css$/,
        loaders: cssLoaderConfig,
      },
    ],
  },
  devServer: {
    hot: false,
    disableHostCheck: true,
    contentBase: './dist',
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    ...config.devServer,
  },
  plugins: [
    new webpack.HashedModuleIdsPlugin(),
    new ScriptDevPlugin({
      configPath: path.join(__dirname, 'config'),
    }),
  ],
};
