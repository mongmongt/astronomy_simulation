(() => {
  const root = document.querySelector('#modalBody');
  let timer, attempts = 0;
  function render() {
    if (!root) return;
    if (!window.renderMathInElement) {
      if (attempts++ < 20) timer = setTimeout(render, 100);
      return;
    }
    attempts = 0;
    window.renderMathInElement(root, {
      delimiters: [
        { left: '$$', right: '$$', display: true },
        { left: '$', right: '$', display: false }
      ],
      throwOnError: false,
      strict: 'ignore'
    });
  }
  new MutationObserver(() => {
    clearTimeout(timer);
    timer = setTimeout(render, 0);
  }).observe(root, { childList: true, subtree: true });
})();
