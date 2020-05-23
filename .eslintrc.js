/*
 * @Description: eslint
 * @Author: ekibun
 * @Date: 2020-05-22 09:18:58
 * @LastEditors: ekibun
 * @LastEditTime: 2020-05-23 10:38:26
 */ 
module.exports = {
  "env": {
    "browser": true,
    "es6": true
  },
  "extends": [
    "plugin:react/recommended",
    "airbnb"
  ],
  "globals": {
    "Atomics": "readonly",
    "SharedArrayBuffer": "readonly"
  },
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": 2018,
    "sourceType": "module"
  },
  "plugins": [
    "react"
  ],
  "rules": {
    "no-param-reassign": 0,
    "jsx-a11y/anchor-is-valid": 0,
    "jsx-a11y/no-static-element-interactions": 0,
    "jsx-a11y/click-events-have-key-events": 0,
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }]
  }
};