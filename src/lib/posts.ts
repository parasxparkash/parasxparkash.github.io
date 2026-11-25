import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import gfm from 'remark-gfm'
import math from 'remark-math'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import rehypeKatex from 'rehype-katex'
import highlight from 'rehype-highlight'
import { BlogPostSummary } from '@/lib/post-types'
import { sortPostsByDate } from '@/lib/post-utils'

const postsDirectory = path.join(process.cwd(), 'content', 'posts')
const externalPostsPath = path.join(process.cwd(), 'public', 'external-posts.json')

export interface PostData extends BlogPostSummary {
  contentHtml: string
}

function getLocalPostsData(): BlogPostSummary[] {
  if (!fs.existsSync(postsDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(postsDirectory)

  return fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, '')
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const matterResult = matter(fileContents)

    return {
      id,
      content: matterResult.content,
      ...(matterResult.data as Omit<BlogPostSummary, 'id' | 'content'>)
    }
  })
}

function getExternalPostsData(): BlogPostSummary[] {
  if (!fs.existsSync(externalPostsPath)) {
    return []
  }

  const fileContents = fs.readFileSync(externalPostsPath, 'utf8')
  const externalPosts = JSON.parse(fileContents) as Array<Omit<BlogPostSummary, 'content'>>

  return externalPosts.map((post) => ({
    content: '',
    tags: [],
    link_text: 'Read article',
    ...post
  }))
}

export function getSortedPostsData(): BlogPostSummary[] {
  return sortPostsByDate([...getLocalPostsData(), ...getExternalPostsData()])
}

export function getPostSummaries(): BlogPostSummary[] {
  return getSortedPostsData().map(({ content: _content, ...post }) => post)
}

export function getAllPostIds() {
  if (!fs.existsSync(postsDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(postsDirectory)
  return fileNames.map((fileName) => {
    return {
      slug: fileName.replace(/\.md$/, '')
    }
  })
}

export async function getPostData(id: string): Promise<PostData> {
  const fullPath = path.join(postsDirectory, `${id}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents)

  const processedContent = await unified()
    .use(remarkParse)
    .use(math)
    .use(gfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(highlight, { plainText: ['math'] })
    .use(rehypeKatex, { throwOnError: false, strict: 'ignore' } as never)
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(matterResult.content)
  const contentHtml = processedContent.toString()

  // Combine the data with the id and contentHtml
  return {
    id,
    content: matterResult.content,
    contentHtml,
    ...(matterResult.data as Omit<PostData, 'id' | 'content' | 'contentHtml'>)
  }
}
