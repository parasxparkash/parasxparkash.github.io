import { useState, useEffect } from 'react'

interface PullRequest {
  number: number
  title: string
  state: string
  date: string
  url: string
  author: string
}

export function usePullRequests() {
  const [pullRequests, setPullRequests] = useState<PullRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchPullRequests = async () => {
      try {
        setLoading(true)
        const response = await fetch('/data/pull-requests.json')

        if (response.ok) {
          const data = await response.json()
          setPullRequests(data)
        }
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch pull requests'))
        console.error('Error fetching pull requests:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchPullRequests()
  }, [])

  return { pullRequests, loading, error }
}
