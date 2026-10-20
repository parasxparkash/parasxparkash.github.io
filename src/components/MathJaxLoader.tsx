'use client'

import { useEffect } from 'react'

declare global {
  interface Window {
    MathJax?: any
  }
}

export default function MathJaxLoader() {
  useEffect(() => {
    // Check if MathJax script is already in the DOM
    const existingScript = document.getElementById('MathJax-script')
    if (existingScript) {
      // Script is loading or loaded, wait for it
      if (window.MathJax && window.MathJax.typesetPromise) {
        window.MathJax.typesetPromise().catch((err: Error) => {
          console.error('MathJax typeset error:', err)
        })
      }
      return
    }

    // Set up configuration before MathJax loads
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
          if (window.MathJax?.startup?.defaultReady) {
            window.MathJax.startup.defaultReady()
          }
          // Automatically typeset when ready
          window.MathJax?.typesetPromise?.().catch((err: Error) => {
            console.error('MathJax initial typeset error:', err)
          })
        }
      },
      options: {
        ignoreHtmlClass: 'tex2jax_ignore',
        processHtmlClass: 'tex2jax_process'
      }
    }

    // Load MathJax library
    const script = document.createElement('script')
    script.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js'
    script.async = true
    script.id = 'MathJax-script'
    document.head.appendChild(script)
  }, [])

  return null
}
