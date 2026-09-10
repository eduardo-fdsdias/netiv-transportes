const host = 'netivtransportes.com.br'
const key = 'a83f864c4395424199aeb6f07cbf2f2f'
const keyLocation = `https://${host}/${key}.txt`
const sitemapUrl = `https://${host}/sitemap.xml`

const sitemapResponse = await fetch(sitemapUrl)
if (!sitemapResponse.ok) {
  throw new Error(`Nao foi possivel ler o sitemap: ${sitemapResponse.status}`)
}

const sitemap = await sitemapResponse.text()
const urlList = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1])

if (urlList.length === 0) {
  throw new Error('Nenhuma URL encontrada no sitemap')
}

const response = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'content-type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host, key, keyLocation, urlList }),
})

if (!response.ok && response.status !== 202) {
  throw new Error(`IndexNow recusou o envio: ${response.status} ${await response.text()}`)
}

console.log(`IndexNow notificado sobre ${urlList.length} URLs (${response.status}).`)
