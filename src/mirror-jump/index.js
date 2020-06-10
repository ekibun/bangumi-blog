/*
 * @Description:
 * @Author: ekibun
 * @Date: 2020-06-10 19:21:30
 * @LastEditors: ekibun
 * @LastEditTime: 2020-06-11 00:39:34
 */
import $ from 'jquery';

const googleMirror = ['g.wangcb.com', 'g.menss.me'];

const jumpMap = [
  [/\/\/(\S+).wikipedia.org\//, '//$1.wikipedia.wikimirror.org/'],
];

function replaceUrl(url) {
  // eslint-disable-next-line no-restricted-syntax
  for (const [reg, rep] of jumpMap) {
    if (reg.test(url)) return url.replace(reg, rep);
  }
  return url;
}

function isGoogleMirror() {
  // eslint-disable-next-line no-restricted-syntax
  for (const mirror of googleMirror) {
    if (window.location.hostname.endsWith(mirror)) return true;
  }
  return false;
}

function wrapSearch(url, element) {
  if (isGoogleMirror()) {
    if (element) element.removeAttr('onmousedown');
    return url && url.replace(/^\/url?.*url=([^&]+).*/,
      (_, matchUrl) => decodeURIComponent(matchUrl));
  }
  return url;
}

function inject() {
  if (!document.body) {
    requestAnimationFrame(inject);
    return;
  }
  new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      $(mutation.target).add('a[href]', mutation.target).each((_, element) => {
        const $$ = $(element);
        const href = replaceUrl(wrapSearch($$.attr('mirror-href'), $$));
        const newHref = $$.attr('href');
        if (href !== newHref) {
          const wrapHref = replaceUrl(wrapSearch(newHref));
          $$.attr('mirror-href', newHref);
          if (newHref === wrapHref) return;
          // eslint-disable-next-line no-console
          console.log(`${newHref} => ${wrapHref}`);
          $$.attr('rel', 'noreferrer');
          $$.attr('href', wrapHref);
        }
      });
    });
  }).observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['href'],
  });
}

inject();
