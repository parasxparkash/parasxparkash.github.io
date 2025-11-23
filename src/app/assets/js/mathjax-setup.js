// MathJax Configuration - Must be loaded BEFORE MathJax
window.MathJax = {
  tex: {
    inlineMath: [['$', '$'], ['\\(', '\\)']],
    displayMath: [['$$', '$$'], ['\\[', '\\]']],
    processEscapes: true,
    processEnvironments: true,
    packages: {'[+]': ['color']}
  },
  loader: {
    load: ['[tex]/color']
  },
  startup: {
    ready: function() {
      console.log('MathJax is ready');
      MathJax.startup.defaultReady();
      // Automatically typeset when ready
      MathJax.typesetPromise?.().catch((err) => {
        console.error('MathJax initial typeset error:', err);
      });
    }
  },
  options: {
    ignoreHtmlClass: 'tex2jax_ignore',
    processHtmlClass: 'tex2jax_process'
  }
};