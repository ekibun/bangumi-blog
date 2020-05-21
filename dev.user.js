// ==UserScript==
// @name        bangumi-image-uploader
// @namespace   https://ekibun.gitee.io/
// @version     0.0.1
// @author      ekibun
// @include     *://bgm.tv/blog/create
// @include     *://bgm.tv/blog/*/edit
// @require     https://unpkg.com/react@16/umd/react.development.js
// @require     https://unpkg.com/react-dom@16/umd/react-dom.development.js
// @grant       GM_xmlhttpRequest
// @connect     httpbin.org
// @run-at      document-end
// ==/UserScript==

(async () => {
  eval(await (await fetch("http://localhost:2780/index.user.js", {
    method: 'GET',
    mode: 'cors'
  })).text())
})();
