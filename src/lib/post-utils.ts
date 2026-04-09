import { BlogPostSummary } from '@/lib/post-types'

const postMonthYearFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  year: 'numeric'
})

const postMonthDayFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric'
})

const postFullDateFormatter = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'short'
})

export function sortPostsByDate<T extends Pick<BlogPostSummary, 'date'>>(posts: T[]) {
  return [...posts].sort((a, b) => {
    if (a.date < b.date) {
      return 1
    }

    return -1
  })
}

export function getPostHref(post: Pick<BlogPostSummary, 'id' | 'external_url'>) {
  return post.external_url || `/posts/${post.id}`
}

export function isExternalPost(post: Pick<BlogPostSummary, 'external_url'>) {
  return Boolean(post.external_url)
}

export function getPostLinkLabel(post: Pick<BlogPostSummary, 'external_url' | 'link_text'>) {
  if (post.link_text) {
    return post.link_text
  }

  return post.external_url ? 'Read article' : 'Read more'
}

export function getPostExcerpt(post: Pick<BlogPostSummary, 'description' | 'content'>) {
  if (post.description) {
    return post.description
  }

  return `${post.content.substring(0, 150).replace(/[#*`]/g, '').trim()}...`
}

export function formatPostMonthYear(date: string) {
  return postMonthYearFormatter.format(new Date(date))
}

export function formatPostMonthDay(date: string) {
  return postMonthDayFormatter.format(new Date(date))
}

export function formatPostFullDate(date: string) {
  return postFullDateFormatter.format(new Date(date))
}
