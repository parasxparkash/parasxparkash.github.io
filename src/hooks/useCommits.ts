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

  useEffect(() => {
    const fetchCommits = async () => {
      try {
        // Fetch from static JSON file (GitHub Pages compatible)
        const response = await fetch(`/data/commits.json?ts=${Date.now()}`, {
          cache: 'no-store',
        })
        
        if (response.ok) {
          const data = await response.json()
          setCommits(data)
        }
      } catch (err) {
        console.error('Error fetching commits:', err)
      }
    }

    fetchCommits()
  }, [])

  return { commits }
}
