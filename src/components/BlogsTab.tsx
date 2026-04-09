'use client'

import { usePosts } from '@/hooks/usePosts'
import {
  formatPostMonthYear,
  getPostExcerpt,
  getPostHref,
  getPostLinkLabel,
  isExternalPost
} from '@/lib/post-utils'

export default function BlogsTab() {
  const { posts } = usePosts(5)

  return (
    <section className="mb-12">
      <div className="space-y-8">
        <ul className="space-y-8">
          {posts.map((post, index) => (
            <li
              key={post.id}
              className="transform-x animate-slide-left"
              style={{ animationDelay: `${(index + 1) * 100}ms` }}
            >
              <article className="group hover:translate-x-1 transition-all duration-300 ease-out">
                <div className="flex items-baseline justify-between mb-1">
                  <h3 className="text-md font-medium">- {post.title}</h3>
                  <span className="text-xs text-zinc-500 dark:text-zinc-400">
                    {formatPostMonthYear(post.date)}
                  </span>
                </div>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-2 text-justify">
                  {getPostExcerpt(post)}
                </p>
                {post.source && (
                  <p className="text-xs uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500 mb-2">
                    {post.source}
                  </p>
                )}
                <div className="flex items-center gap-2">
                  <a
                    href={getPostHref(post)}
                    target={isExternalPost(post) ? '_blank' : undefined}
                    rel={isExternalPost(post) ? 'noopener noreferrer' : undefined}
                    className="flex items-center gap-1 text-xs text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                  >
                    {getPostLinkLabel(post)}
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M15 3h6v6"></path>
                      <path d="M10 14 21 3"></path>
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    </svg>
                  </a>
                  {isExternalPost(post) && (
                    <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500">
                      External
                    </span>
                  )}
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
