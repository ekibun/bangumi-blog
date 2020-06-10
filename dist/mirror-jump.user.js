// ==UserScript==
// @name mirror-jump
// @author ekibun
// @license MIT
// @namespace https://github.com/ekibun/userscript/blob/master/dist/mirror-jump.user.js
// @version 0.0.1
// @description 网页跳转到镜像站
// @match *://g.wangcb.com/search?*
// @match *://g.menss.me/search?*
// @match *://cn.bing.com/search?*
// @run-at document-start
// @require https://unpkg.com/jquery@3.5.1/dist/jquery.min.js
// ==/UserScript==

!function(e){var r={};function t(n){if(r[n])return r[n].exports;var o=r[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,t),o.l=!0,o.exports}t.m=e,t.c=r,t.d=function(e,r,n){t.o(e,r)||Object.defineProperty(e,r,{enumerable:!0,get:n})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,r){if(1&r&&(e=t(e)),8&r)return e;if(4&r&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(t.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&r&&"string"!=typeof e)for(var o in e)t.d(n,o,function(r){return e[r]}.bind(null,o));return n},t.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(r,"a",r),r},t.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)},t.p="",t(t.s="9Ro+")}({"9Ro+":function(e,r,t){"use strict";t.r(r);var n=t("xeH2"),o=t.n(n);const i=["g.wangcb.com","g.menss.me"],u=[[/\/\/(\S+).wikipedia.org\//,"//$1.wikipedia.wikimirror.org/"]];function f(e){for(const[r,t]of u)if(r.test(e))return e.replace(r,t);return e}function c(e,r){return function(){for(const e of i)if(window.location.hostname.endsWith(e))return!0;return!1}()?(r&&r.removeAttr("onmousedown"),e&&e.replace(/^\/url?.*url=([^&]+).*/,(e,r)=>decodeURIComponent(r))):e}!function e(){document.body?new MutationObserver(e=>{e.forEach(e=>{o()(e.target).add("a[href]",e.target).each((e,r)=>{const t=o()(r),n=f(c(t.attr("mirror-href"),t)),i=t.attr("href");if(n!==i){const e=f(c(i));if(t.attr("mirror-href",i),i===e)return;console.log(`${i} => ${e}`),t.attr("rel","noreferrer"),t.attr("href",e)}})})}).observe(document.body,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["href"]}):requestAnimationFrame(e)}()},xeH2:function(e,r){e.exports=$}});