import { MetadataRoute } from 'next'
import { getSortedPostsData } from '@/lib/posts'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://parasparkash.github.io'
  const posts = getSortedPostsData()

  const postUrls: MetadataRoute.Sitemap = posts
    .map((post) => {
      try {
        const date = new Date(post.date)
        // Check if date is valid
        if (isNaN(date.getTime())) {
          console.warn(`Invalid date for post ${post.id}: ${post.date}`)
          // Return a valid entry with current date as fallback
          return {
            url: `${baseUrl}/posts/${post.id}`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.8,
          }
        }
        return {
          url: `${baseUrl}/posts/${post.id}`,
          lastModified: date,
          changeFrequency: 'monthly' as const,
          priority: 0.8,
        }
      } catch (error) {
        console.warn(`Error processing post ${post.id}:`, error)
        // Return a valid entry with current date as fallback
        return {
          url: `${baseUrl}/posts/${post.id}`,
          lastModified: new Date(),
          changeFrequency: 'monthly' as const,
          priority: 0.8,
        }
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

