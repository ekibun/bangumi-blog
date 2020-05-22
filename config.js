/* eslint-disable global-require */
/*
 * @Description:
 * @Author: ekibun
 * @Date: 2020-05-22 09:02:42
 * @LastEditors: ekibun
 * @LastEditTime: 2020-05-22 14:11:42
 */
const pkg = require('./package.json');

const entry = 'bangumi-image-uploader';
const config = {
  entry,
  meta: {
    name: entry,
    namespace: `https://github.com/ekibun/userscript/blob/master/dist/${entry}.user.js`,
    version: '0.0.1',
    description: '替换bgm.tv日志的flash上传功能',
    author: pkg.author,
    match: [
      '*://bgm.tv/blog/create',
      '*://bgm.tv/blog/*/edit',
    ],
    'run-at': 'document-end',
  },
  externals: {
    cdn: 'https://unpkg.com',
    deps: [
      ['react', 'React', (dev) => `umd/react.${dev ? 'development' : 'production.min'}.js`],
      ['react-dom', 'ReactDOM', (dev) => `umd/react-dom.${dev ? 'development' : 'react-dom.production.min'}.js`],
      ['jquery', '$'],
    ],
  },
};

config.createMeta = (dev) => require('userscript-meta').stringify({
  ...config.meta,
  connect: [dev ? 'localhost' : undefined].concat(...[config.meta.connect]).filter((v, i, a) => v && a.indexOf(v) === i),
  grant: [dev ? 'GM_xmlhttpRequest' : undefined].concat(...[config.meta.grant]).filter((v, i, a) => v && a.indexOf(v) === i),
  require: config.externals.deps.map(([dep,, path]) => (
    // eslint-disable-next-line import/no-dynamic-require
    path && `${config.externals.cdn}/${dep}@${require(`${dep}/package.json`).version}/${path(dev)}`
  )).filter((v) => v),
});

module.exports = config;
