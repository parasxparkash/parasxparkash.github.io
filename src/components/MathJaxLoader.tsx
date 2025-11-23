'use client'

import { useEffect } from 'react'

declare global {
  interface Window {
    MathJax?: any
    MathJaxConfig?: boolean
  }
}

export default function MathJaxLoader() {
  useEffect(() => {
    if (typeof window === 'undefined') return

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

    // Set up configuration inline to ensure it's set before MathJax loads
    if (!window.MathJaxConfig) {
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
            console.log('MathJax is ready')
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
      window.MathJaxConfig = true
    }

    // Load MathJax library
    const script = document.createElement('script')
    script.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js'
    script.async = true
    script.id = 'MathJax-script'
    
    script.onload = () => {
      // Wait for MathJax to be fully initialized
      const checkReady = () => {
        if (window.MathJax && window.MathJax.typesetPromise) {
          // Trigger typeset on the entire document
          window.MathJax.typesetPromise().catch((err: Error) => {
            console.error('MathJax typeset error:', err)
          })
        } else {
          setTimeout(checkReady, 100)
        }
      }
      setTimeout(checkReady, 100)
    }
    
    document.head.appendChild(script)
  }, [])

  return null
}

