'use client'

import { useEffect, useRef } from 'react'

declare global {
  interface Window {
    MathJax?: any
  }
}

interface MathJaxTypesetProps {
  content: string
}

export default function MathJaxTypeset({ content }: MathJaxTypesetProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!content) return

    let retryCount = 0
    const maxRetries = 50 // Maximum 5 seconds of retries

    const typesetMath = () => {
      if (typeof window === 'undefined') return

      if (window.MathJax && window.MathJax.typesetPromise && containerRef.current) {
        // Typeset the specific container
        window.MathJax.typesetPromise([containerRef.current]).catch((err: Error) => {
          console.error('MathJax typeset error:', err)
        })
      } else if (retryCount < maxRetries) {
        // MathJax not ready yet, retry after a delay
        retryCount++
        setTimeout(typesetMath, 100)
      }
    }

    // Start attempting to typeset after content is rendered
    // Use a small delay to ensure DOM is ready
    const timeoutId = setTimeout(typesetMath, 200)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [content])

  return (
    <div 
      ref={containerRef}
      className="post-content max-w-none" 
      dangerouslySetInnerHTML={{ __html: content }}
    />
  )
}

