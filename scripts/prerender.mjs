import { mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

const distDir = resolve('dist')
const serverDir = resolve('dist-server')
const siteUrl = (process.env.VITE_SITE_URL || 'https://netivtransportes.com.br').replace(/\/$/, '')
const regions = JSON.parse(await readFile(resolve('src/data/regions.json'), 'utf8'))
const template = await readFile(resolve(distDir, 'index.html'), 'utf8')
const { render } = await import(pathToFileURL(resolve(serverDir, 'entry-server.js')).href)
const pages = [
  { path: '/', output: resolve(distDir, 'index.html') },
  { path: '/politica-de-privacidade', output: resolve(distDir, 'politica-de-privacidade', 'index.html'), title: 'Política de Privacidade | Netiv Transportes', description: 'Política de Privacidade da Netiv Transportes e informações sobre o tratamento de dados no site.' },
]
pages.push(...regions.map(region => ({ path: `/${region.slug}`, output: resolve(distDir, region.slug, 'index.html'), title: `${region.title} | Netiv Transportes`, description: region.description })))

for (const page of pages) {
  let html = template.replace('<div id="root"></div>', () => `<div id="root">${render(page.path)}</div>`)
  const canonicalUrl = `${siteUrl}${page.path === '/' ? '/' : `${page.path}/`}`
  html = html.replace(/<link rel="canonical" href="[^"]*"\s*\/>/, `<link rel="canonical" href="${canonicalUrl}" />`)
  html = html.replace(/<meta property="og:url" content="[^"]*"\s*\/>/, `<meta property="og:url" content="${canonicalUrl}" />`)
  if (page.title) html = html.replace(/<title>.*?<\/title>/, `<title>${page.title}</title>`)
  if (page.description) html = html.replace(/<meta name="description" content="[^"]*"\s*\/>/, `<meta name="description" content="${page.description}" />`)
  if (page.title) html = html.replace(/<meta property="og:title" content="[^"]*"\s*\/>/, `<meta property="og:title" content="${page.title}" />`)
  if (page.description) html = html.replace(/<meta property="og:description" content="[^"]*"\s*\/>/, `<meta property="og:description" content="${page.description}" />`)
  await mkdir(dirname(page.output), { recursive: true })
  await writeFile(page.output, html)
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(page => `  <url><loc>${siteUrl}${page.path === '/' ? '/' : `${page.path}/`}</loc></url>`).join('\n')}
</urlset>\n`
await writeFile(resolve(distDir, 'sitemap.xml'), sitemap)
await writeFile(resolve(distDir, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`)

await rm(serverDir, { recursive: true, force: true })
