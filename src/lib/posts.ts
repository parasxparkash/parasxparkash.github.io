import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'
import gfm from 'remark-gfm'
import math from 'remark-math'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import highlight from 'rehype-highlight'

const postsDirectory = path.join(process.cwd(), 'public', 'posts')

export interface PostData {
  id: string
  title: string
  date: string
  description?: string
  content: string
  contentHtml: string
  tags?: string[]
  author?: string
  reading_time?: number
  image?: string
}

export function getSortedPostsData(): PostData[] {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '')

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)

    // Combine the data with the id
    return {
      id,
      content: matterResult.content,
      contentHtml: '',
      ...(matterResult.data as Omit<PostData, 'id' | 'content' | 'contentHtml'>)
    }
  })
  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

export function getAllPostIds() {
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

  // Use remark with math support - convert math nodes to raw LaTeX for MathJax
  const processedContent = await unified()
    .use(remarkParse)
    .use(math)
    .use(gfm)
    .use(remarkRehype, { 
      allowDangerousHtml: true,
      handlers: {
        // Custom handler for math nodes to preserve raw LaTeX
        math: (h: any, node: any) => {
          return {
            type: 'element',
            tagName: 'div',
            properties: { className: ['math', 'math-display'] },
            children: [{ type: 'text', value: node.value }]
          }
        },
        inlineMath: (h: any, node: any) => {
          return {
            type: 'element',
            tagName: 'span',
            properties: { className: ['math', 'math-inline'] },
            children: [{ type: 'text', value: node.value }]
          }
        }
      }
    })
    .use(highlight)
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(matterResult.content)
  let contentHtml = processedContent.toString()
  
  // Convert the HTML math elements back to raw LaTeX format for MathJax
  // Replace <span class="math math-inline">content</span> with $content$
  contentHtml = contentHtml.replace(/<span class="math math-inline">(.*?)<\/span>/g, (match, p1) => `$${p1}$`)
  // Replace <div class="math math-display">content</div> with $$content$$
  // Use [\s\S] instead of . with s flag for better compatibility
  contentHtml = contentHtml.replace(/<div class="math math-display">([\s\S]*?)<\/div>/g, (match, p1) => `$$${p1}$$`)

  // Combine the data with the id and contentHtml
  return {
    id,
    content: matterResult.content,
    contentHtml,
    ...(matterResult.data as Omit<PostData, 'id' | 'content' | 'contentHtml'>)
  }
}

export function getAllTags(): string[] {
  const allPosts = getSortedPostsData()
  const tagSet = new Set<string>()
  
  allPosts.forEach((post) => {
    if (post.tags) {
      post.tags.forEach((tag) => tagSet.add(tag))
    }
  })
  
  return Array.from(tagSet).sort()
}