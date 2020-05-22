(async () => {
  // eslint-disable-next-line no-eval
  eval(await (await fetch('http://localhost:2780/index.user.js')).text());
})();
