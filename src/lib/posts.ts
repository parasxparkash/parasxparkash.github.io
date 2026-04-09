import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import gfm from 'remark-gfm'
import math from 'remark-math'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import highlight from 'rehype-highlight'
import { BlogPostSummary } from '@/lib/post-types'
import { sortPostsByDate } from '@/lib/post-utils'

const postsDirectory = path.join(process.cwd(), 'public', 'posts')
const externalPostsPath = path.join(process.cwd(), 'public', 'external-posts.json')

export interface PostData extends BlogPostSummary {
  contentHtml: string
}

function getLocalPostsData(): PostData[] {
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
      contentHtml: '',
      isExternal: false,
      ...(matterResult.data as Omit<PostData, 'id' | 'content' | 'contentHtml'>)
    }
  })
}

function getExternalPostsData(): PostData[] {
  if (!fs.existsSync(externalPostsPath)) {
    return []
  }

  const fileContents = fs.readFileSync(externalPostsPath, 'utf8')
  const externalPosts = JSON.parse(fileContents) as Array<Omit<BlogPostSummary, 'content'>>

  return externalPosts.map((post) => ({
    content: '',
    contentHtml: '',
    tags: [],
    isExternal: true,
    link_text: 'Read article',
    ...post
  }))
}

export function getSortedPostsData(): PostData[] {
  return sortPostsByDate([...getLocalPostsData(), ...getExternalPostsData()])
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
  type MathNode = { value: string }

  // Use remark with math support - convert math nodes to raw LaTeX for MathJax
  const processedContent = await unified()
    .use(remarkParse)
    .use(math)
    .use(gfm)
    .use(remarkRehype, { 
      allowDangerousHtml: true,
      handlers: {
        // Custom handler for math nodes to preserve raw LaTeX
        math: (_h: unknown, node: MathNode) => {
          return {
            type: 'element',
            tagName: 'div',
            properties: { className: ['math', 'math-display'] },
            children: [{ type: 'text', value: node.value }]
          }
        },
        inlineMath: (_h: unknown, node: MathNode) => {
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
  contentHtml = contentHtml.replace(/<span class="math math-inline">(.*?)<\/span>/g, (_match, p1) => `$${p1}$`)
  // Replace <div class="math math-display">content</div> with $$content$$
  // Use [\s\S] instead of . with s flag for better compatibility
  contentHtml = contentHtml.replace(/<div class="math math-display">([\s\S]*?)<\/div>/g, (_match, p1) => `$$${p1}$$`)

  // Combine the data with the id and contentHtml
  return {
    id,
    content: matterResult.content,
    contentHtml,
    ...(matterResult.data as Omit<PostData, 'id' | 'content' | 'contentHtml'>)
  }
}
