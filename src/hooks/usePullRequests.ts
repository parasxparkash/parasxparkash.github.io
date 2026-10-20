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

  useEffect(() => {
    const fetchPullRequests = async () => {
      try {
        const response = await fetch('/data/pull-requests.json')

        if (response.ok) {
          const data = await response.json()
          setPullRequests(data)
        }
      } catch (err) {
        console.error('Error fetching pull requests:', err)
      }
    }

    fetchPullRequests()
  }, [])

  return { pullRequests }
}
