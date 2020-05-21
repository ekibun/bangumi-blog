/*
 * @Description: 
 * @Author: ekibun
 * @Date: 2020-05-21 20:44:00
 * @LastEditors: ekibun
 * @LastEditTime: 2020-05-22 00:23:45
 */ 
const path = require('path')
const webpack = require('webpack')
const fs = require("fs")

let banner = fs.readFileSync(path.join(__dirname, "dev.user.js")).toString()
banner = banner.substring(0, banner.indexOf('==/UserScript==') + 15)
console.log(banner)

module.exports = {
  optimization: {
    minimize: false
  },
  entry:  {
    'bangumi-image-uploader': path.join(__dirname, "src/bangumi-image-uploader.js")
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].user.js"
  },
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM'
  },
  devServer: {
    port: 2780,
    hot: false,
    contentBase: "./dist",
    disableHostCheck: true,
    headers: {
      "Access-Control-Allow-Origin": "*"
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader'
      }
    ]
  },
  plugins: [
    new webpack.BannerPlugin({
      banner: `${banner}\n`,
      raw: true
    })
  ]
}