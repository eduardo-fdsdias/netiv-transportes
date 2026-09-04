import { renderToString } from 'react-dom/server'
import App from './App.tsx'
import { PrivacyPolicy } from './components/PrivacyPolicy.tsx'

export function render(pathname: string) {
  const normalizedPath = pathname.replace(/\/$/, '')
  return renderToString(normalizedPath === '/politica-de-privacidade' ? <PrivacyPolicy /> : <App pathname={pathname} />)
}
