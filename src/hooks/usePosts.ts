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
        // For static export, directly fetch from JSON file
        const response = await fetch('/posts.json')
        
        if (!response.ok) {
          throw new Error('Failed to fetch posts')
        }
        
        const data = await response.json()
        setPosts(limit ? data.slice(0, limit) : data)
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch posts'))
        console.error('Error fetching posts:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [limit])

  return { posts, loading, error }
}
