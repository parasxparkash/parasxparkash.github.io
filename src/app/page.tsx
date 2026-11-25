import HomePage from '@/components/HomePage'
import { getPostSummaries } from '@/lib/posts'
import commits from '@/data/github/commits.json'
import pullRequests from '@/data/github/pull-requests.json'

export default function Page() {
  return (
    <HomePage
      posts={getPostSummaries()}
      commits={commits}
      pullRequests={pullRequests}
    />
  )
}
