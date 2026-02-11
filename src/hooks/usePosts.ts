import { useState, useEffect } from 'react'

interface Post {
  id: string
  title: string
  date: string
  description?: string
  content: string
  tags?: string[]
}

export function usePosts(limit?: number) {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/posts')
        
        if (response.ok) {
          const data = await response.json()
          setPosts(limit ? data.slice(0, limit) : data)
        } else {
          // Fallback to static JSON if API fails
          const jsonResponse = await fetch('/posts.json')
          const data = await jsonResponse.json()
          setPosts(limit ? data.slice(0, limit) : data)
        }
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch posts'))
        // Try fallback to static JSON
        try {
          const jsonResponse = await fetch('/posts.json')
          const data = await jsonResponse.json()
          setPosts(limit ? data.slice(0, limit) : data)
        } catch (fallbackErr) {
          console.error('Error fetching posts:', fallbackErr)
        }
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [limit])

  return { posts, loading, error }
}
