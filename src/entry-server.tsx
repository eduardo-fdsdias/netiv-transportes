import { renderToString } from 'react-dom/server'
import { GuinchoLandingPage } from './components/GuinchoLandingPage.tsx'
import { PrivacyPolicy } from './components/PrivacyPolicy.tsx'

export function render(pathname: string) {
  const normalizedPath = pathname.replace(/\/$/, '')
  if (normalizedPath === '/politica-de-privacidade') return renderToString(<PrivacyPolicy />)
  return renderToString(<GuinchoLandingPage pathname={normalizedPath || '/'} />)
}
