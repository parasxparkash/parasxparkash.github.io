import { Metadata } from 'next'
import { getSortedPostsData } from '@/lib/posts'
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'

export const metadata: Metadata = {
  title: 'Posts',
  description: 'Blog posts and articles on quantitative finance, derivatives, risk management, AI, and machine learning by Paras Parkash',
  openGraph: {
    title: 'Posts | Paras Parkash',
    description: 'Blog posts and articles on quantitative finance, derivatives, risk management, AI, and machine learning',
    url: 'https://parasparkash.github.io/posts',
  },
}

export default function Posts() {
  const allPostsData = getSortedPostsData()

  return (
    <main className="text-zinc-900 dark:text-zinc-100 max-w-7xl mx-auto px-4 py-10 flex flex-col overflow-x-hidden bg-white dark:bg-zinc-900 min-h-screen">
      {/* Mobile Overlay */}
      <div id="mobile-overlay" className="mobile-overlay hidden"></div>

      <div className="flex gap-12 flex-1 flex-col lg:flex-row">
        {/* Left Sidebar */}
        <Sidebar />

        {/* Center Content Area */}
        <div className="flex-1 flex flex-col lg:h-screen">
          {/* Header Section */}
          <Header />

          {/* Posts Content */}
          <div className="flex-1 overflow-y-auto min-h-0">
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-8 text-zinc-900 dark:text-zinc-100">All Posts</h2>

              <div className="space-y-8">
                {allPostsData.map((post) => (
                  <article key={post.id} className="border-b border-zinc-200 dark:border-zinc-700 pb-8 last:border-b-0">
                    <div className="flex items-baseline justify-between mb-2">
                      <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                        <a href={`/posts/${post.id}`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                          {post.title}
                        </a>
                      </h3>
                      <time className="text-sm text-zinc-500 dark:text-zinc-400">
                        {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
                      </time>
                    </div>

                    {post.description && (
                      <p className="text-zinc-600 dark:text-zinc-400 mb-4">{post.description}</p>
                    )}

                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="px-2 py-1 text-xs bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    <a href={`/posts/${post.id}`} className="inline-flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
                      Read more
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                      </svg>
                    </a>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar - Placeholder */}
        <div className="hidden lg:block w-72 flex-shrink-0 sticky top-4 h-[calc(100vh-2rem)] overflow-y-auto border-l border-zinc-200 dark:border-zinc-700 pl-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Recent Posts</h3>
          </div>
          <div className="space-y-4">
            {allPostsData.slice(0, 5).map((post) => (
              <div key={post.id} className="p-3 rounded hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors">
                <h4 className="font-medium text-zinc-900 dark:text-zinc-100 text-sm mb-2">
                  <a href={`/posts/${post.id}`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    {post.title}
                  </a>
                </h4>
                <time className="text-xs text-zinc-500 dark:text-zinc-400">
                  {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </time>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}