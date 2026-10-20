import { MetadataRoute } from 'next'
import { getSortedPostsData } from '@/lib/posts'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://parasparkash.github.io'
  const posts = getSortedPostsData()

  const postUrls: MetadataRoute.Sitemap = posts.map((post) => {
    const date = new Date(post.date)
    if (isNaN(date.getTime())) {
      console.warn(`Invalid date for post ${post.id}: ${post.date}`)
    }

    return {
      url: `${baseUrl}/posts/${post.id}`,
      lastModified: isNaN(date.getTime()) ? new Date() : date,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }
  })

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/posts`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...postUrls,
  ]
}

