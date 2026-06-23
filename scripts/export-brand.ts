/**
 * Export brand SVGs to PNG at retina resolution.
 *
 *   npm run brand:export
 *
 * Renders each SVG inside a headless Chromium page that loads Space Grotesk
 * + Chivo Mono from Google Fonts, waits for fonts to settle, then screenshots.
 */
import { chromium } from 'playwright'
import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')
const BRAND_DIR = resolve(ROOT, 'public/brand')

const ASSETS: Array<{
  svg: string
  png: string
  width: number
  height: number
  bg: string
  scale?: number
}> = [
  { svg: 'wordmark-light.svg', png: 'wordmark-light.png', width: 470, height: 140, bg: '#f3ecda', scale: 4 },
  { svg: 'wordmark-dark.svg',  png: 'wordmark-dark.png',  width: 470, height: 140, bg: '#1f2624', scale: 4 },
  { svg: 'wordmark-mono.svg',  png: 'wordmark-mono.png',  width: 470, height: 140, bg: '#f3ecda', scale: 4 },
  { svg: 'mark.svg',           png: 'mark.png',           width: 120, height: 120, bg: '#f3ecda', scale: 8 },
  { svg: 'mark.svg',           png: 'favicon-512.png',    width: 120, height: 120, bg: '#f3ecda', scale: 512 / 120 },
  { svg: 'linkedin-banner.svg', png: 'linkedin-banner.png', width: 1584, height: 396, bg: '#1f2624', scale: 2 },
  // LinkedIn company-page cover crops the right pillar column — render at 1128x191 for that use.
  { svg: 'linkedin-banner.svg', png: 'linkedin-banner-company.png', width: 1128, height: 191, bg: '#1f2624', scale: 2 },
]

function pageHtml(svgInline: string, width: number, height: number, bg: string) {
  return `<!doctype html>
<html>
<head>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Chivo+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>
  html, body { margin: 0; padding: 0; background: ${bg}; }
  #frame { width: ${width}px; height: ${height}px; }
  #frame svg { width: 100%; height: 100%; display: block; }
</style>
</head>
<body>
<div id="frame">${svgInline}</div>
</body>
</html>`
}

async function exportOne(
  browser: Awaited<ReturnType<typeof chromium.launch>>,
  asset: (typeof ASSETS)[number],
) {
  const svgPath = resolve(BRAND_DIR, asset.svg)
  const pngPath = resolve(BRAND_DIR, asset.png)
  const svgInline = await readFile(svgPath, 'utf8')

  const scale = asset.scale ?? 2
  const context = await browser.newContext({
    viewport: { width: asset.width, height: asset.height },
    deviceScaleFactor: scale,
  })
  const page = await context.newPage()
  await page.setContent(pageHtml(svgInline, asset.width, asset.height, asset.bg), { waitUntil: 'load' })
  await page.evaluate(() => (document as Document & { fonts?: { ready: Promise<unknown> } }).fonts?.ready)
  await page.waitForTimeout(150)

  const frame = await page.$('#frame')
  if (!frame) throw new Error('frame not found')
  const buffer = await frame.screenshot({ type: 'png', omitBackground: false })
  await writeFile(pngPath, buffer)
  await context.close()

  console.log(`  ✓ ${asset.png}  (${asset.width}x${asset.height} @${scale}x)`)
}

async function main() {
  await mkdir(BRAND_DIR, { recursive: true })
  const browser = await chromium.launch({ headless: true })
  console.log(`Exporting ${ASSETS.length} assets to public/brand/`)
  for (const asset of ASSETS) {
    try {
      await exportOne(browser, asset)
    } catch (err) {
      console.error(`  ✗ ${asset.png}:`, err instanceof Error ? err.message : err)
    }
  }
  await browser.close()
  console.log('Done.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
