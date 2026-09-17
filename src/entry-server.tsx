import { renderToString } from 'react-dom/server'
import App from './App.tsx'
import { GuinchoLandingPage } from './components/GuinchoLandingPage.tsx'
import { PrivacyPolicy } from './components/PrivacyPolicy.tsx'

export function render(pathname: string) {
  const normalizedPath = pathname.replace(/\/$/, '')
  if (normalizedPath === '/politica-de-privacidade') return renderToString(<PrivacyPolicy />)
  if (normalizedPath === '/guincho-agora') return renderToString(<GuinchoLandingPage />)
  return renderToString(<App pathname={pathname} />)
}
