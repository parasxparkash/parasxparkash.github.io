import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPostData, getAllPostIds, getSortedPostsData } from '@/lib/posts'
import Sidebar from '@/components/Sidebar'
import TableOfContents from '@/components/TableOfContents'
import RecentPostsSidebar from '@/components/RecentPostsSidebar'
import MathJaxLoader from '@/components/MathJaxLoader'
import MathJaxTypeset from '@/components/MathJaxTypeset'
import ThemeToggle from '@/components/ThemeToggle'
import Image from 'next/image'

interface PostPageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const posts = getAllPostIds()
  return posts
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  try {
    const postData = await getPostData(params.slug)

    return {
      title: postData.title,
      description: postData.description || postData.content.substring(0, 160),
      openGraph: {
        title: postData.title,
        description: postData.description || postData.content.substring(0, 160),
        url: `https://parasparkash.github.io/posts/${params.slug}`,
        type: 'article',
        publishedTime: postData.date,
        modifiedTime: postData.date,
        authors: [postData.author || 'Paras Parkash'],
        tags: postData.tags,
        images: postData.image ? [postData.image.startsWith('http') ? postData.image : `https://parasparkash.github.io${postData.image}`] : undefined,
      },
      twitter: {
        card: 'summary_large_image',
        title: postData.title,
        description: postData.description || postData.content.substring(0, 160),
        images: postData.image ? [postData.image.startsWith('http') ? postData.image : `https://parasparkash.github.io${postData.image}`] : undefined,
      },
      alternates: {
        canonical: `https://parasparkash.github.io/posts/${params.slug}`,
      },
    }
  } catch {
    return {
      title: 'Post Not Found',
    }
  }
}

export default async function Post({ params }: PostPageProps) {
  let postData

  try {
    postData = await getPostData(params.slug)
  } catch {
    notFound()
  }

  return (
    <>
      {/* JSON-LD Structured Data for Article */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": postData.title,
            "description": postData.description || postData.content.substring(0, 160),
            "image": postData.image ? [postData.image.startsWith('http') ? postData.image : `https://parasparkash.github.io${postData.image}`] : undefined,
            "datePublished": postData.date,
            "dateModified": postData.date,
            "author": {
              "@type": "Person",
              "name": postData.author || "Paras Parkash",
              "url": "https://parasparkash.github.io"
            },
            "publisher": {
              "@type": "Person",
              "name": "Paras Parkash",
              "url": "https://parasparkash.github.io"
            },
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": `https://parasparkash.github.io/posts/${params.slug}`
            },
            "keywords": postData.tags ? postData.tags.join(", ") : undefined,
            "articleSection": "Blog",
            "url": `https://parasparkash.github.io/posts/${params.slug}`
          })
        }}
      />

      {/* Breadcrumb Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://parasparkash.github.io"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Posts",
                "item": "https://parasparkash.github.io/posts"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": postData.title,
                "item": `https://parasparkash.github.io/posts/${params.slug}`
              }
            ]
          })
        }}
      />

      <main className="text-zinc-900 dark:text-zinc-100 max-w-[1400px] mx-auto px-4 py-4 flex flex-col overflow-x-hidden bg-white dark:bg-zinc-900 min-h-screen">
        {/* Load MathJax only on post pages */}
        <MathJaxLoader />
      {/* Mobile Overlay */}
      <div id="mobile-overlay" className="mobile-overlay hidden"></div>

      {/* Back to Home Button at Top */}
      <div className="mb-4">
        <a href="/" className="inline-flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          Back to Home
        </a>
      </div>

      <div className="flex gap-8 flex-1 flex-col lg:flex-row">
        {/* Left Sidebar */}
        <Sidebar />

        {/* Center Content Area - Wider, shifted right */}
        <div className="flex-[2] flex flex-col lg:h-screen">
          {/* Post Content - Shifted to top */}
          <div className="flex-1 overflow-y-auto min-h-0">
            <article className="medium-style-article">
              {/* Header - Simplified, no navigation buttons */}
              <header className="mb-8 pb-6 border-b border-zinc-200 dark:border-zinc-700">
                <div className="mb-6">
                  <div className="flex items-baseline justify-between gap-4 mb-4">
                    <h1 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-zinc-100 leading-tight flex-1">{postData.title}</h1>
                    <div className="flex items-center gap-3">
                      <ThemeToggle />
                      <time dateTime={postData.date} className="text-xs text-zinc-600 dark:text-zinc-400 whitespace-nowrap">
                        {new Date(postData.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </time>
                    </div>
                  </div>

                  {/* Article meta information */}
                  <div className="flex flex-col sm:flex-row items-start gap-2 sm:gap-4 text-xs text-zinc-600 dark:text-zinc-400 mb-4">
                    {postData.reading_time && (
                      <>
                        <span>{postData.reading_time} min read</span>
                      </>
                    )}
                    {postData.author && (
                      <>
                        <span className="hidden sm:inline">•</span>
                        <span>By {postData.author}</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Article description */}
                {postData.description && (
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4 leading-relaxed">{postData.description}</p>
                )}

                {/* Tags */}
                {postData.tags && postData.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {postData.tags.map((tag) => (
                      <span key={tag} className="px-2 py-1 text-xs bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </header>

              {postData.image && (
                <figure className="mb-8">
                  <Image
                    src={postData.image}
                    alt={postData.title}
                    width={800}
                    height={400}
                    className="w-full rounded-lg"
                    priority={false}
                  />
                </figure>
              )}

              {/* Content with MathJax typesetting */}
              <MathJaxTypeset content={postData.contentHtml} />

            </article>
          </div>
        </div>

        {/* Right Sidebar - TOC */}
        <div className="w-64 flex-shrink-0">
          <TableOfContents />
        </div>
      </div>
    </main>
    </>
  )
}