import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import { GuinchoLandingPage } from './components/GuinchoLandingPage.tsx'
import { PrivacyPolicy } from './components/PrivacyPolicy.tsx'
import regions from './data/regions.json'

const basePath = import.meta.env.BASE_URL.replace(/\/$/, '')
const currentPath = window.location.pathname.replace(basePath, '').replace(/\/$/, '')
const isPrivacyPage = currentPath === '/politica-de-privacidade'
const currentRegion = regions.find((item) => `/${item.slug}` === currentPath)

if (isPrivacyPage) {
  document.title = 'Política de Privacidade | Netiv Transportes'
  document.querySelector('meta[name="description"]')?.setAttribute('content', 'Política de Privacidade da Netiv Transportes e informações sobre o tratamento de dados no site.')
}

if (!isPrivacyPage) {
  document.title = currentRegion ? `${currentRegion.title} | Netiv Transportes` : 'Guincho 24h em São Bernardo e ABC | Netiv Transportes'
  document.querySelector('meta[name="description"]')?.setAttribute('content', currentRegion?.description || 'Guincho 24 horas para carros, motos e utilitários leves em São Bernardo do Campo e ABC Paulista. Consulte a Netiv Transportes pelo WhatsApp.')
}

const root = document.getElementById('root')!
const application = (
  <StrictMode>
    {isPrivacyPage ? <PrivacyPolicy /> : <GuinchoLandingPage pathname={currentPath || '/'} />}
  </StrictMode>
)

if (root.hasChildNodes()) hydrateRoot(root, application)
else createRoot(root).render(application)
