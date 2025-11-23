'use client'

import { useEffect, useState } from 'react'

interface Heading {
  id: string
  text: string
  level: number
}

export default function TableOfContents() {
  const [headings, setHeadings] = useState<Heading[]>([])
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    // Wait for content to be rendered
    const timer = setTimeout(() => {
      // Extract headings from the post content
      const postContent = document.querySelector('.post-content')
      if (!postContent) return

      const headingElements = postContent.querySelectorAll('h1, h2')
      const headingData: Heading[] = []

      headingElements.forEach((element) => {
        let id = element.id
        if (!id) {
          id = element.textContent?.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') || ''
          if (id) {
            element.id = id
          }
        }
        if (id) {
          headingData.push({
            id,
            text: element.textContent?.trim() || '',
            level: parseInt(element.tagName.charAt(1)),
          })
        }
      })

      setHeadings(headingData)

    // Intersection Observer for highlighting active heading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      {
        rootMargin: '-20% 0% -35% 0%',
        threshold: 0,
      }
    )

    headingElements.forEach((element) => {
      observer.observe(element)
    })

      return () => {
        headingElements.forEach((element) => {
          observer.unobserve(element)
        })
      }
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  if (headings.length === 0) return null

  return (
    <div className="sticky top-4">
      <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-4">Table of Contents</h3>
      <nav className="space-y-1">
        {headings.map((heading) => (
          <a
            key={heading.id}
            href={`#${heading.id}`}
            className={`block text-xs py-1 px-2 rounded transition-colors ${
              activeId === heading.id
                ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-medium'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800'
            }`}
            style={{ paddingLeft: `${(heading.level - 1) * 0.75 + 0.5}rem` }}
          >
            {heading.text}
          </a>
        ))}
      </nav>
    </div>
  )
}

