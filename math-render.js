(() => {
  const root = document.querySelector('#modalBody');
  let timer;
  function render() {
    if (!window.renderMathInElement || !root) return;
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
