export interface BlogPostSummary {
  id: string
  title: string
  date: string
  description?: string
  content: string
  tags?: string[]
  author?: string
  reading_time?: number
  image?: string
  external_url?: string
  source?: string
  link_text?: string
  isExternal?: boolean
}
