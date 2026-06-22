import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { marked } from 'marked'

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog')
const WORDS_PER_MINUTE = 200

marked.setOptions({ gfm: true, breaks: false })

export interface BlogHero {
  src: string
  alt: string
  credit: string
}

export interface BlogFaqItem {
  question: string
  answer: string
}

export interface BlogPostMeta {
  slug: string
  title: string
  description: string
  keyword: string
  category: string
  date: string
  updated: string
  hero: BlogHero
  audioProjectId: string
  readingMinutes: number
}

export interface BlogPost extends BlogPostMeta {
  /** Raw markdown body (frontmatter stripped). */
  content: string
  /** Rendered HTML body. */
  html: string
  /** Q&A pairs parsed from the FAQ section, for FAQPage schema. */
  faq: BlogFaqItem[]
}

function readRaw(slug: string): { data: Record<string, unknown>; content: string } {
  const full = path.join(BLOG_DIR, `${slug}.md`)
  const file = fs.readFileSync(full, 'utf8')
  const parsed = matter(file)
  return { data: parsed.data as Record<string, unknown>, content: parsed.content }
}

function toMeta(slug: string, data: Record<string, unknown>, content: string): BlogPostMeta {
  const hero = (data.hero ?? {}) as Partial<BlogHero>
  const words = content.split(/\s+/).filter(Boolean).length
  return {
    slug,
    title: String(data.title ?? ''),
    description: String(data.description ?? ''),
    keyword: String(data.keyword ?? ''),
    category: String(data.category ?? ''),
    date: String(data.date ?? ''),
    updated: String(data.updated ?? data.date ?? ''),
    hero: {
      src: String(hero.src ?? ''),
      alt: String(hero.alt ?? ''),
      credit: String(hero.credit ?? ''),
    },
    audioProjectId: String(data.audioProjectId ?? ''),
    readingMinutes: Math.max(1, Math.round(words / WORDS_PER_MINUTE)),
  }
}

/** Strip inline markdown so schema values are clean plain text. */
function stripInline(s: string): string {
  return s
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // links -> text
    .replace(/\*\*([^*]+)\*\*/g, '$1') // bold
    .replace(/\*([^*]+)\*/g, '$1') // italic
    .replace(/`([^`]+)`/g, '$1') // inline code
    .trim()
}

/**
 * Parse the FAQ section (## Frequently asked questions / ## FAQ) into Q&A pairs.
 * Each ### heading is a question; the paragraph(s) until the next heading is the answer.
 */
function parseFaq(markdown: string): BlogFaqItem[] {
  const lines = markdown.split('\n')
  const items: BlogFaqItem[] = []
  let inFaq = false
  let question: string | null = null
  let answer: string[] = []

  const flush = () => {
    if (question && answer.length) {
      items.push({ question: question.trim(), answer: stripInline(answer.join(' ').trim()) })
    }
    question = null
    answer = []
  }

  for (const line of lines) {
    const h2 = line.match(/^##\s+(.*)$/)
    if (h2) {
      flush()
      inFaq = /frequently asked questions|^faq\b/i.test(h2[1].trim())
      continue
    }
    if (!inFaq) continue
    const h3 = line.match(/^###\s+(.*)$/)
    if (h3) {
      flush()
      question = h3[1]
      continue
    }
    if (question && line.trim()) answer.push(line.trim())
  }
  flush()
  return items
}

export function getPostSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return []
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith('.md'))
    .map((f) => f.replace(/\.md$/, ''))
}

export function getPostMeta(slug: string): BlogPostMeta {
  const { data, content } = readRaw(slug)
  return toMeta(slug, data, content)
}

export function getPost(slug: string): BlogPost {
  const { data, content } = readRaw(slug)
  const meta = toMeta(slug, data, content)
  const html = marked.parse(content, { async: false }) as string
  return { ...meta, content, html, faq: parseFaq(content) }
}

/** All posts, newest first. */
export function getAllPosts(): BlogPostMeta[] {
  return getPostSlugs()
    .map(getPostMeta)
    .sort((a, b) => (a.date < b.date ? 1 : -1))
}
