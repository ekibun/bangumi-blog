/*
 * @Description:
 * @Author: ekibun
 * @Date: 2020-06-10 19:18:57
 * @LastEditors: ekibun
 * @LastEditTime: 2020-06-11 00:03:44
 */

module.exports = {
  namespace: 'https://github.com/ekibun/userscript/blob/master/dist/mirror-jump.user.js',
  version: '0.0.1',
  description: '网页跳转到镜像站',
  match: [
    '*://g.wangcb.com/search?*',
    '*://g.menss.me/search?*',
    '*://cn.bing.com/search?*',
  ],
  'run-at': 'document-start',
};
