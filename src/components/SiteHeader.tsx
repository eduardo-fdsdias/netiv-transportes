import { useEffect, useState } from "react"
import { Clock, Menu, X } from "lucide-react"

import {
  INSTAGRAM_URL,
  NAV_LINKS,
  PHONE_DISPLAY,
  PHONE_TEL,
  WHATSAPP_ORCAMENTO,
} from "../data/site"

export function SiteHeader({ whatsapp = WHATSAPP_ORCAMENTO }: { whatsapp?: string }) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setOpen(false); document.querySelector<HTMLButtonElement>(".menu-button")?.focus() }
    }
    document.addEventListener("keydown", closeOnEscape)

    return () => {
      document.removeEventListener("keydown", closeOnEscape)
    }
  }, [open])

  return (
    <header className="site-header">
      <div className="topbar">
        <div className="header-container topbar-content">
          <span className="topbar-status">
            <Clock size={15} />
            Atendimento 24 horas • Todos os dias
          </span>

          <div className="topbar-links">
            <a href={PHONE_TEL}>
              {PHONE_DISPLAY}
            </a>

            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram da Netiv Transportes"
            >
              <svg
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="header-container navbar">
        <a
          href="/"
          className="brand"
          aria-label="Netiv Transportes - início"
        >
          <strong>NETIV</strong>
          <span>Transportes</span>
        </a>

        <nav className="desktop-nav" aria-label="Menu principal">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <a
            href={whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="header-whatsapp"
          >
            WhatsApp
          </a>

          <button
            type="button"
            className="menu-button"
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? <X size={23} /> : <Menu size={23} />}
          </button>
        </div>
      </div>

      {(
        <nav id="mobile-menu" hidden={!open} className="mobile-nav" aria-label="Menu móvel">
          <div className="header-container mobile-nav-content">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}

            <a
              href={PHONE_TEL}
              className="mobile-phone"
              onClick={() => setOpen(false)}
            >
              Ligar {PHONE_DISPLAY}
            </a>
          </div>
        </nav>
      )}
    </header>
  )
}
