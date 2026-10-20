import { useState, useEffect } from 'react'
import { BlogPostSummary } from '@/lib/post-types'

export function usePosts(limit?: number) {
  const [posts, setPosts] = useState<BlogPostSummary[]>([])

  useEffect(() => {
    const controller = new AbortController()

    const fetchPosts = async () => {
      try {
        // For static export, directly fetch from JSON file
        const response = await fetch('/posts.json', { signal: controller.signal })

        if (!response.ok) {
          throw new Error('Failed to fetch posts')
        }

        const data = (await response.json()) as BlogPostSummary[]
        if (!controller.signal.aborted) {
          setPosts(limit ? data.slice(0, limit) : data)
        }
      } catch (err) {
        if (controller.signal.aborted) {
          return
        }
        console.error('Error fetching posts:', err)
      }
    }

    fetchPosts()

    return () => {
      controller.abort()
    }
  }, [limit])

  return { posts }
}
