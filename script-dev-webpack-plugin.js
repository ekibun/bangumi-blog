/*
 * @Description: userscript webpack plugin
 * @Author: ekibun
 * @Date: 2020-05-22 14:21:20
 * @LastEditors: ekibun
 * @LastEditTime: 2020-05-22 22:24:28
 */
/**
 * @typedef { object } ScriptConfig
 * @property { string[] } entry
 * @property { { [key:string]: string | string[] } } meta
 * @property { { cdn: string, deps: [String, String, (dev: Boolean) => String][] } } externals
 * @property { import('webpack-dev-server').Configuration } devServer
 */

const { RawSource, ConcatSource } = require('webpack-sources');
const userscriptMeta = require('userscript-meta');
const prettyError = require('html-webpack-plugin/lib/errors.js');
const { CachedChildCompilation } = require('html-webpack-plugin/lib/cached-child-compiler');

/** @type { (config: ScriptConfig, dev: Boolean) => String } */
const getMetadata = (config, dev) => `${userscriptMeta.stringify({
  ...config.meta,
  connect: [dev ? 'localhost' : undefined]
    .concat(...[config.meta.connect])
    .filter((v, i, a) => v && a.indexOf(v) === i),
  require: config.externals.deps.map(([dep,, cdnPath]) => (
    // eslint-disable-next-line import/no-dynamic-require, global-require
    cdnPath && `${config.externals.cdn}/${dep}@${require(`${dep}/package.json`).version}/${cdnPath(dev)}`
  )).filter((v) => v),
})}\n`;

function ScriptDevPlugin(options) {
  this.configPath = options.configPath;
}

/** @type { (compiler: import('webpack').Compiler)=>void } */
// eslint-disable-next-line func-names
ScriptDevPlugin.prototype.apply = function (compiler) {
  const childCompilerPlugin = new CachedChildCompilation(compiler);
  childCompilerPlugin.addEntry(this.configPath);
  const isDev = compiler.options.mode === 'development';
  compiler.hooks.emit.tap('ScriptDevPlugin', (compilation) => {
    const devResult = childCompilerPlugin.getCompilationEntryResult(this.configPath);
    if ('error' in devResult) {
      compilation.errors.push(prettyError(devResult.error, compiler.context).toString());
    }
    try {
      // eslint-disable-next-line no-eval
      eval(devResult.compiledEntry.content);
      // eslint-disable-next-line no-undef
      const scriptConfig = HTML_WEBPACK_PLUGIN_RESULT;

      compilation.chunks.forEach((chunk) => {
        const deps = [];
        const chunkName = chunk.name;
        chunk.modulesIterable.forEach((module) => {
          if (module.external) deps.push(module.userRequest);
        });
        const config = {
          ...scriptConfig,
          meta: {
            name: chunkName,
            ...scriptConfig.meta[chunkName],
          },
          externals: {
            ...scriptConfig.externals,
            deps: scriptConfig.externals.deps.filter((v) => deps.includes(v[0])),
          },
        };
        const meta = getMetadata(config, isDev);
        chunk.files.forEach((fileName) => {
          if (!fileName.endsWith('.user.js')) return;
          compilation.assets[fileName] = new ConcatSource(
            String(meta),
            compilation.assets[fileName],
          );
          if (isDev) {
            compilation.assets[`${chunkName}.dev.user.js`] = new RawSource(
              `${meta}(async () => { eval(await (await fetch('http://localhost:${
                scriptConfig.devServer.port}/${fileName}')).text()); })();`,
            );
          }
        });
      });
    } catch (e) {
      compilation.errors.push(prettyError(e, compiler.context).toString());
    }
  });
};

module.exports = ScriptDevPlugin;
