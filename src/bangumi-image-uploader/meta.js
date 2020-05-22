/*
 * @Description: meta daya
 * @Author: ekibun
 * @Date: 2020-05-22 19:19:42
 * @LastEditors: ekibun
 * @LastEditTime: 2020-05-22 23:22:14
 */

module.exports = {
  namespace: 'https://github.com/ekibun/userscript/blob/master/dist/bangumi-image-uploader.user.js',
  version: '0.0.1',
  description: '替换bgm.tv日志的flash上传功能',
  match: [
    '*://bgm.tv/blog/create',
    '*://bgm.tv/blog/*/edit',
  ],
  'run-at': 'document-end',
};
