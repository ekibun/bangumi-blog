/*
 * @Description:
 * @Author: ekibun
 * @Date: 2020-05-21 20:44:00
 * @LastEditors: ekibun
 * @LastEditTime: 2020-05-22 14:35:47
 */
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const config = require('./config');

module.exports = (_env, argv) => {
  const isDev = argv.mode === 'development';
  const uglifyJsPlugin = new UglifyJsPlugin({
    uglifyOptions: {
      output: {
        preamble: config.createMeta(isDev),
      },
    },
  });
  const webpackConfig = [{
    optimization: {
      minimizer: [uglifyJsPlugin],
    },
    entry: path.join(__dirname, 'src', `${config.entry}.js`),
    output: {
      path: path.join(__dirname, 'dist'),
      filename: `${isDev ? 'index' : config.entry}.user.js`,
    },
    externals: Object.assign({}, ...config.externals.deps.map(
      ([dep, variable]) => ({ [dep]: variable }),
    )),
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules|bower_components/,
          loader: 'babel-loader',
        },
      ],
    },
    devServer: {
      port: 2780,
      hot: false,
      disableHostCheck: true,
      contentBase: 'dist',
    },
  }];
  if (isDev) {
    webpackConfig.push({
      optimization: {
        minimize: true,
        minimizer: [uglifyJsPlugin],
      },
      target: 'node',
      entry: path.join(__dirname, 'src/dev.user.js'),
      output: {
        path: path.join(__dirname, 'dist'),
        filename: 'dev.user.js',
      },
    });
  }
  return webpackConfig;
};
