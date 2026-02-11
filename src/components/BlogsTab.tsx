'use client'

import { usePosts } from '@/hooks/usePosts'

export default function BlogsTab() {
  const { posts } = usePosts(5)

  return (
    <section className="mb-12">
      <div className="space-y-8">
        <ul className="space-y-8">
          {posts.map((post, index) => (
            <div 
              key={post.id} 
              className="transform-x animate-slide-left"
              style={{ animationDelay: `${(index + 1) * 100}ms` }}
            >
              <li className="group hover:translate-x-1 transition-all duration-300 ease-out">
                <div className="flex items-baseline justify-between mb-1">
                  <h3 className="text-md font-medium">- {post.title}</h3>
                  <span className="text-xs text-zinc-500 dark:text-zinc-400">
                    {new Date(post.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                  </span>
                </div>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-2 text-justify">
                  {post.description || post.content.substring(0, 150).replace(/[#*`]/g, '').trim() + '...'}
                </p>
                <div className="flex items-center gap-2">
                  <a href={`/posts/${post.id}`} className="flex items-center gap-1 text-xs text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
                    Read More
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M15 3h6v6"></path>
                      <path d="M10 14 21 3"></path>
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    </svg>
                  </a>
                </div>
              </li>
            </div>
          ))}
        </ul>
      </div>
    </section>
  )
}