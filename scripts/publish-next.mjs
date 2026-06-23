#!/usr/bin/env node
/**
 * Publishes the next queued blog post.
 *
 * Picks the lexicographically-first file in content/queue/ (prefix files with
 * 01-, 02-, ... to control order), stamps it with today's date, moves it into
 * content/blog/<slug>.md (slug read from frontmatter), and deletes the queue
 * file. Prints the published slug to GITHUB_OUTPUT so the workflow can deploy
 * and ping IndexNow. No-ops cleanly when the queue is empty.
 *
 * Dependency-free (node:fs only) so it runs in CI without npm install.
 * Set DRY_RUN=1 to report the choice without changing any files.
 */
import fs from 'node:fs'
import path from 'node:path'

const ROOT = process.cwd()
const QUEUE = path.join(ROOT, 'content', 'queue')
const BLOG = path.join(ROOT, 'content', 'blog')
const DRY = process.env.DRY_RUN === '1'

function out(key, value) {
  if (process.env.GITHUB_OUTPUT) {
    fs.appendFileSync(process.env.GITHUB_OUTPUT, `${key}=${value}\n`)
  }
}

function today() {
  return new Date().toISOString().slice(0, 10) // YYYY-MM-DD (UTC)
}

if (!fs.existsSync(QUEUE)) {
  console.log('No content/queue directory; nothing to publish.')
  out('published', '')
  process.exit(0)
}

const queued = fs
  .readdirSync(QUEUE)
  .filter((f) => f.endsWith('.md'))
  .sort()

if (queued.length === 0) {
  console.log('Queue is empty; nothing to publish.')
  out('published', '')
  process.exit(0)
}

const file = queued[0]
const src = path.join(QUEUE, file)
let content = fs.readFileSync(src, 'utf8')

const slugMatch = content.match(/^slug:\s*"?([^"\n]+)"?\s*$/m)
if (!slugMatch) {
  console.error(`Queued file ${file} has no slug in frontmatter. Aborting.`)
  process.exit(1)
}
const slug = slugMatch[1].trim()

const d = today()
content = content.replace(/^date:\s*.*$/m, `date: "${d}"`)
content = content.replace(/^updated:\s*.*$/m, `updated: "${d}"`)

const dest = path.join(BLOG, `${slug}.md`)

if (DRY) {
  console.log(`[dry-run] would publish "${slug}" from ${file} dated ${d}`)
  console.log(`[dry-run] ${queued.length - 1} post(s) would remain in the queue`)
  process.exit(0)
}

fs.writeFileSync(dest, content)
fs.rmSync(src)

console.log(`Published "${slug}" from ${file} (dated ${d}).`)
console.log(`${queued.length - 1} post(s) remain in the queue.`)
out('published', slug)
out('remaining', String(queued.length - 1))
