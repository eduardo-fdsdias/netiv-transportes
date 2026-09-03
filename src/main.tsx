import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { PrivacyPolicy } from './components/PrivacyPolicy.tsx'

const basePath = import.meta.env.BASE_URL.replace(/\/$/, '')
const currentPath = window.location.pathname.replace(basePath, '').replace(/\/$/, '')
const isPrivacyPage = currentPath === '/politica-de-privacidade'

if (isPrivacyPage) {
  document.title = 'Política de Privacidade | Netiv Transportes'
  document.querySelector('meta[name="description"]')?.setAttribute('content', 'Política de Privacidade da Netiv Transportes e informações sobre o tratamento de dados no site.')
}

const root = document.getElementById('root')!
const application = (
  <StrictMode>
    {isPrivacyPage ? <PrivacyPolicy /> : <App />}
  </StrictMode>
)

if (root.hasChildNodes()) hydrateRoot(root, application)
else createRoot(root).render(application)
