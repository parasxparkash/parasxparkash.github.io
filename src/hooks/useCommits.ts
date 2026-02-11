import { useState, useEffect } from 'react'

interface Commit {
  sha: string
  message: string
  date: string
  url: string
  author: string
}

export function useCommits() {
  const [commits, setCommits] = useState<Commit[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchCommits = async () => {
      try {
        setLoading(true)
        // Fetch from static JSON file (GitHub Pages compatible)
        const response = await fetch('/data/commits.json')
        
        if (response.ok) {
          const data = await response.json()
          setCommits(data)
        }
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch commits'))
        console.error('Error fetching commits:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchCommits()
  }, [])

  return { commits, loading, error }
}
