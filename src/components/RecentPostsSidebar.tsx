'use client'

import { usePosts } from '@/hooks/usePosts'
import { BlogPostSummary } from '@/lib/post-types'
import { getPostHref, isExternalPost } from '@/lib/post-utils'

interface RecentPostsSidebarProps {
  topPosts?: BlogPostSummary[]
}

export default function RecentPostsSidebar({ topPosts = [] }: RecentPostsSidebarProps) {
  const { posts } = usePosts()
  const pinnedPostIds = new Set(topPosts.map((post) => post.id))
  const recentPosts = posts.filter((post) => !pinnedPostIds.has(post.id))
  const renderPostItem = (post: Pick<BlogPostSummary, 'id' | 'title' | 'tags' | 'external_url'>) => (
    <div key={post.id}>
      <a
        href={getPostHref(post)}
        target={isExternalPost(post) ? '_blank' : undefined}
        rel={isExternalPost(post) ? 'noopener noreferrer' : undefined}
        className="block text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors mb-1"
      >
        {post.title}
      </a>
      {post.tags && post.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-2">
          {post.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="px-1.5 py-0.5 text-[10px] bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 rounded">
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  )

  return (
    <div className="w-72 flex-shrink-0 flex flex-col bg-zinc-50 dark:bg-zinc-800/30 lg:p-4 lg:rounded-lg">
      {/* Pinned Post Section */}
      {topPosts.length > 0 && (
        <div>
          <div className="flex items-center justify-end mb-3">
            <h4 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">Pinned Post</h4>
          </div>
          <div className="space-y-4">
            {topPosts.map((post) => renderPostItem(post))}
          </div>
        </div>
      )}

      <div className={topPosts.length > 0 ? 'mt-6 pt-6 border-t border-zinc-200 dark:border-zinc-700' : ''}>
        <div className="flex items-center justify-end mb-4">
          <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">Recent Posts</h3>
        </div>

        {/* Posts List */}
        <div className="space-y-4">
          {recentPosts.slice(0, 5).map((post) => renderPostItem(post))}
        </div>
      </div>

      {/* Bottom action */}
      <div className="mt-6 pt-4 border-t border-zinc-200 dark:border-zinc-700">
        <div className="flex justify-end">
          <a
            href="/posts"
            className="inline-flex items-center gap-1 text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
          >
            View All Posts
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </a>
        </div>
      </div>

      {/* Footer - Email and Design credit */}
      <div className="border-t border-zinc-200 dark:border-zinc-700 mt-6 pt-4">
        <footer className="text-sm text-zinc-400 dark:text-zinc-500">
          <div className="flex justify-between items-start mb-3">
            <div></div>
            <div className="text-right">
              <div className="mb-1">parasparkash@quantedx.com</div>
              <div>Design with nicotine and chai</div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
