/*
 * @Description: user-script config
 * @Author: ekibun
 * @Date: 2020-05-22 09:02:42
 * @LastEditors: ekibun
 * @LastEditTime: 2020-05-22 22:20:58
 */
const pkg = require('./package.json');

/** @type { import('./script-dev-webpack-plugin').ScriptConfig } */
const config = {
  entry: ['bangumi-image-uploader'],
  meta: {
    author: pkg.author,
    license: pkg.license,
  },
  externals: {
    cdn: 'https://unpkg.com',
    deps: [
      ['react', 'React', (dev) => `umd/react.${dev ? 'development' : 'production.min'}.js`],
      ['react-dom', 'ReactDOM', (dev) => `umd/react-dom.${dev ? 'development' : 'production.min'}.js`],
      ['jquery', '$'],
    ],
  },
  devServer: {
    port: 2785,
  },
};

module.exports = {
  ...config,
  meta: Object.assign({}, ...config.entry.map((entry) => {
    let meta = {};
    try {
      // eslint-disable-next-line global-require, import/no-dynamic-require
      meta = require(`${__dirname}/src/${entry}/meta.js`);
    } catch (e) { /** no-op */ }
    return {
      [entry]: {
        ...config.meta,
        ...meta,
      },
    };
  })),
};
