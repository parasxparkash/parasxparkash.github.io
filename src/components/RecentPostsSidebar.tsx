'use client'

import { useState, useEffect } from 'react'

interface Post {
  id: string
  title: string
  date: string
  tags?: string[]
}

interface RecentPostsSidebarProps {
  topPosts?: Array<{ id: string; title: string; tags?: string[] }>
}

export default function RecentPostsSidebar({ topPosts = [] }: RecentPostsSidebarProps) {
  const [posts, setPosts] = useState<Post[]>([])
  const [allTags, setAllTags] = useState<string[]>([])
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

  useEffect(() => {
    // Fetch posts on client side
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/posts')
        const data = await response.json()
        setPosts(data)
        
        // Extract all unique tags
        const tags = new Set<string>()
        data.forEach((post: Post) => {
          if (post.tags) {
            post.tags.forEach((tag) => tags.add(tag))
          }
        })
        setAllTags(Array.from(tags).sort())
      } catch (error) {
        console.error('Error fetching posts:', error)
      }
    }
    fetchPosts()
  }, [])

  const filteredPosts = selectedTag
    ? posts.filter((post) => post.tags?.includes(selectedTag))
    : posts

  return (
    <div className="w-72 flex-shrink-0 sticky top-4 h-[calc(100vh-2rem)] overflow-y-auto">
      <div className="flex items-center justify-end mb-4">
        <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-100">- Recent Posts</h3>
      </div>

      {/* Filter Tags with View All Posts inline */}
      {allTags.length > 0 && (
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wide">Filter by Tag</h4>
            <a
              href="/posts"
              className="inline-flex items-center gap-1 text-xs text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
            >
              View All Posts
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </a>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedTag(null)}
              className={`px-2 py-1 text-xs rounded-full transition-colors ${
                selectedTag === null
                  ? 'bg-blue-500 text-white dark:bg-blue-400 dark:text-white'
                  : 'bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-300 dark:hover:bg-zinc-600'
              }`}
            >
              All
            </button>
            {allTags.slice(0, 5).map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-2 py-1 text-xs rounded-full transition-colors ${
                  selectedTag === tag
                    ? 'bg-blue-500 text-white dark:bg-blue-400 dark:text-white'
                    : 'bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-300 dark:hover:bg-zinc-600'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Posts List */}
      <div className="space-y-2">
        {filteredPosts.slice(0, 2).map((post) => (
          <div key={post.id}>
            <a
              href={`/posts/${post.id}`}
              className="block text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors mb-1"
            >
              {post.title}
            </a>
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-2">
                {post.tags.slice(0, 1).map((tag) => (
                  <span key={tag} className="px-1.5 py-0.5 text-xs bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300 rounded">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Pinned Post Section */}
      {topPosts.length > 0 && (
        <div className="mt-6 pt-6 border-t border-zinc-200 dark:border-zinc-700">
          <div className="flex items-center justify-end mb-3">
            <h4 className="text-sm font-medium text-zinc-900 dark:text-zinc-100">- Pinned Post</h4>
          </div>
          <div className="space-y-2">
            {topPosts.map((post) => (
              <div key={post.id}>
                <a
                  href={`/posts/${post.id}`}
                  className="block text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors mb-1"
                >
                  {post.title}
                </a>
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-2">
                    {post.tags.slice(0, 1).map((tag) => (
                      <span key={tag} className="px-1.5 py-0.5 text-xs bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Footer - Email and Design credit */}
      <div className="border-t border-zinc-200 dark:border-zinc-700 mt-6 pt-4">
        <footer className="text-xs text-zinc-400 dark:text-zinc-500">
          <div className="flex justify-between items-start mb-3">
            <div></div>
            <div className="text-right">
              <div className="mb-1">parasxparkash@gmail.com</div>
              <div>Design with nicotine and chai</div>
            </div>
          </div>
          <div className="flex justify-end items-center text-[10px] text-zinc-500 dark:text-zinc-500">
            <div id="user-info">Detecting system... • Detecting location...</div>
          </div>
        </footer>
      </div>
    </div>
  )
}

