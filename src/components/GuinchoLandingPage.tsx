import { useEffect, useMemo, useState } from 'react'
import {
  BadgeCheck,
  Banknote,
  CarFront,
  Check,
  Clock3,
  CreditCard,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  ShieldCheck,
  Truck,
  X,
} from 'lucide-react'
import '../GuinchoLandingPage.css'
import atendimentoCarro from '../assets/atendimento-carro.webp'
import atendimentoNoturno from '../assets/atendimento-noturno.webp'
import atendimentoUtilitario from '../assets/atendimento-utilitario.webp'
import regions from '../data/regions.json'
import {
  BASE_PATH,
  CNPJ,
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
  PHONE_DISPLAY,
  PHONE_TEL,
  WHATSAPP_NUMBER,
} from '../data/site'
import {
  readTrafficAttribution,
  whatsAppSourceMessage,
  type TrafficAttribution,
} from '../lib/attribution'

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

const DEFAULT_ATTRIBUTION: TrafficAttribution = {
  reference: 'SITE',
  analyticsValue: 'site_or_other',
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="18" height="18" x="3" y="3" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.4" cy="6.6" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

const faqItems = [
  {
    question: 'O atendimento funciona 24 horas?',
    answer: 'Sim. A Netiv Transportes recebe solicitações 24 horas por dia, todos os dias, conforme disponibilidade no momento do chamado.',
  },
  {
    question: 'Quais veículos o guincho transporta?',
    answer: 'Atendemos carros, motos e veículos utilitários leves. Informe o modelo e a condição do veículo para confirmarmos o atendimento.',
  },
  {
    question: 'Quais são as formas de pagamento?',
    answer: 'Aceitamos Pix, cartão de crédito e cartão de débito.',
  },
  {
    question: 'Quais regiões são atendidas?',
    answer: 'Atendemos São Bernardo do Campo e cidades do ABC Paulista. Rotas para outras regiões e litoral são avaliadas sob consulta.',
  },
]

type GuinchoLandingPageProps = {
  pathname?: string
}

const localRegionPages = regions.filter((item) => item.slug.startsWith('guincho-24h-') && item.city !== 'ABC Paulista')
const coastRegionPages = regions.filter((item) => item.slug.startsWith('guincho-para-'))

export function GuinchoLandingPage({ pathname = '/guincho-agora' }: GuinchoLandingPageProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [attribution, setAttribution] = useState<TrafficAttribution>(DEFAULT_ATTRIBUTION)
  const normalizedPath = pathname.replace(/\/$/, '')
  const region = regions.find((item) => `/${item.slug}` === normalizedPath)
  const isCoastRoute = Boolean(region?.slug.startsWith('guincho-para-'))
  const isAbcPage = region?.slug === 'guincho-24h-abc-paulista' || region?.slug === 'guincho-perto-de-mim'
  const heroTitle = region
    ? isCoastRoute
      ? `Guincho para ${region.city} e região`
      : isAbcPage
        ? 'Guincho no ABC Paulista e região'
        : `Guincho em ${region.city} e região`
    : 'Guincho 24h em São Bernardo e região'
  const heroLead = region?.description || 'Atendimento para carros, motos e utilitários leves no ABC Paulista. Consulte agora a disponibilidade e o valor do seu trajeto.'
  const pageFaqItems = region
    ? [{ question: region.question, answer: region.answer }, ...faqItems]
    : faqItems

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setAttribution(readTrafficAttribution()))
    return () => window.cancelAnimationFrame(frame)
  }, [])

  const whatsappHref = useMemo(
    () => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsAppSourceMessage(attribution))}`,
    [attribution],
  )

  const trackContact = (channel: 'whatsapp' | 'phone', position: string) => {
    if (!window.gtag) return

    window.gtag('event', `${channel}_click`, {
      traffic_source: attribution.analyticsValue,
      campaign_id: attribution.campaignId || 'not_informed',
      button_position: position,
    })

    if (channel === 'whatsapp') {
      window.gtag('event', 'conversion', {
        send_to: 'AW-18419198979/XYYjCJWx5PAcEIPY-s5E',
      })
    }
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'AutomotiveBusiness',
        name: 'Netiv Transportes',
        url: `https://netivtransportes.com.br${normalizedPath || '/'}`,
        telephone: '+55 11 94378-6869',
        areaServed: [
          'São Bernardo do Campo',
          'Santo André',
          'São Caetano do Sul',
          'Diadema',
          'Mauá',
          'Ribeirão Pires',
          'Rio Grande da Serra',
        ],
        openingHours: 'Mo-Su 00:00-23:59',
        paymentAccepted: 'Pix, cartão de crédito, cartão de débito',
      },
      {
        '@type': 'FAQPage',
        mainEntity: pageFaqItems.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: { '@type': 'Answer', text: item.answer },
        })),
      },
    ],
  }

  return (
    <div className="tow-landing">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <a className="tow-skip" href="#conteudo">Ir para o conteúdo</a>

      <div className="tow-topbar">
        <div className="tow-shell tow-topbar-inner">
          <span><Clock3 aria-hidden="true" /> Atendimento 24 horas • todos os dias</span>
          <div>
            <a href={PHONE_TEL} onClick={() => trackContact('phone', 'topbar')}><Phone aria-hidden="true" /> {PHONE_DISPLAY}</a>
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer"><InstagramIcon /> {INSTAGRAM_HANDLE}</a>
          </div>
        </div>
      </div>

      <header className="tow-header">
        <div className="tow-shell tow-header-inner">
          <a className="tow-brand" href={BASE_PATH} aria-label="Netiv Transportes — página inicial">
            <span className="tow-brand-mark"><Truck aria-hidden="true" /></span>
            <span><strong>NETIV</strong><small>TRANSPORTES</small></span>
          </a>

          <button className="tow-menu-button" type="button" aria-expanded={menuOpen} aria-controls="tow-navigation" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
            <span className="sr-only">Abrir menu</span>
          </button>

          <nav id="tow-navigation" className={menuOpen ? 'is-open' : ''} aria-label="Navegação principal">
            <a href="#servicos" onClick={() => setMenuOpen(false)}>Serviços</a>
            <a href="#regioes" onClick={() => setMenuOpen(false)}>Regiões</a>
            <a href="#duvidas" onClick={() => setMenuOpen(false)}>Dúvidas</a>
          </nav>

          <a className="tow-button tow-button-header" href={whatsappHref} target="_blank" rel="noopener noreferrer" onClick={() => trackContact('whatsapp', 'header')}>
            <MessageCircle aria-hidden="true" /> Pedir orçamento
          </a>
        </div>
      </header>

      <main id="conteudo">
        <section className="tow-hero">
          <div className="tow-shell tow-hero-grid">
            <div className="tow-hero-copy">
              <p className="tow-eyebrow"><span /> Atendimento 24 horas • Netiv Transportes</p>
              <h1><em>{heroTitle}</em><br />Fale direto com a Netiv.</h1>
              <p className="tow-hero-lead">{heroLead}</p>

              <ul className="tow-check-list" aria-label="Diferenciais">
                <li><Check aria-hidden="true" /> Atendimento 24 horas</li>
                <li><Check aria-hidden="true" /> Guincho próprio</li>
                <li><Check aria-hidden="true" /> Contato direto pelo WhatsApp</li>
              </ul>

              <div className="tow-hero-actions">
                <a className="tow-button tow-button-primary" href={whatsappHref} target="_blank" rel="noopener noreferrer" onClick={() => trackContact('whatsapp', 'hero')}>
                  <MessageCircle aria-hidden="true" /> Chamar no WhatsApp
                </a>
                <a className="tow-button tow-button-secondary" href={PHONE_TEL} onClick={() => trackContact('phone', 'hero')}>
                  <Phone aria-hidden="true" /> Ligar agora
                </a>
              </div>
              <p className="tow-help-text">Informe veículo, retirada e destino para agilizar o orçamento.</p>
            </div>

            <div className="tow-hero-visual">
              <div className="tow-photo-frame">
                <img src={atendimentoUtilitario} alt="Guincho da Netiv Transportes realizando o transporte de um veículo utilitário" width="900" height="1160" fetchPriority="high" />
              </div>
              <div className="tow-proof-card">
                <BadgeCheck aria-hidden="true" />
                <span><strong>Atendimento real Netiv</strong><small>São Bernardo do Campo • ABC</small></span>
              </div>
            </div>
          </div>
        </section>

        <section className="tow-trust-strip" aria-label="Informações rápidas">
          <div className="tow-shell tow-trust-grid">
            <div><Clock3 aria-hidden="true" /><span><strong>24 horas</strong><small>Todos os dias</small></span></div>
            <div><MapPin aria-hidden="true" /><span><strong>Base em SBC</strong><small>Atendimento no ABC</small></span></div>
            <div><CreditCard aria-hidden="true" /><span><strong>Cartões e Pix</strong><small>Crédito e débito</small></span></div>
            <div><ShieldCheck aria-hidden="true" /><span><strong>Empresa ativa</strong><small>CNPJ verificável</small></span></div>
          </div>
        </section>

        {region && (
          <section className="tow-section tow-regional-detail">
            <div className="tow-shell tow-regional-grid">
              <div>
                <p className="tow-kicker">Atendimento regional</p>
                <h2>{region.heading}</h2>
              </div>
              <div>
                {region.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                <a className="tow-text-link" href={whatsappHref} target="_blank" rel="noopener noreferrer" onClick={() => trackContact('whatsapp', 'regional_detail')}>Consultar atendimento em {region.city} <span aria-hidden="true">→</span></a>
              </div>
            </div>
          </section>
        )}

        <section id="servicos" className="tow-section tow-services">
          <div className="tow-shell">
            <div className="tow-section-heading">
              <p className="tow-kicker">Atendimento sob medida</p>
              <h2>Guincho para o veículo que você precisa transportar</h2>
              <p>Conte a situação pelo WhatsApp para confirmarmos compatibilidade, disponibilidade e orçamento.</p>
            </div>

            <div className="tow-service-grid">
              <article><CarFront aria-hidden="true" /><h3>Carros</h3><p>Pane, veículo sem funcionamento e transporte programado.</p></article>
              <article><span className="tow-moto-icon" aria-hidden="true">M</span><h3>Motos</h3><p>Remoção e transporte com confirmação das condições do veículo.</p></article>
              <article><Truck aria-hidden="true" /><h3>Utilitários leves</h3><p>Atendimento sujeito às dimensões, peso e condição do veículo.</p></article>
            </div>
          </div>
        </section>

        <section className="tow-section tow-real-work">
          <div className="tow-shell tow-real-grid">
            <div className="tow-real-copy">
              <p className="tow-kicker">Fotos de atendimentos reais</p>
              <h2>O guincho que aparece aqui é o que vai atender você.</h2>
              <p>Sem imagens genéricas de banco. A Netiv trabalha com equipamento próprio e atendimento direto.</p>
              <a className="tow-text-link" href={whatsappHref} target="_blank" rel="noopener noreferrer" onClick={() => trackContact('whatsapp', 'real_work')}>
                Consultar disponibilidade <span aria-hidden="true">→</span>
              </a>
            </div>
            <div className="tow-gallery">
              <figure className="tow-gallery-main"><img src={atendimentoCarro} alt="Guincho Netiv transportando um carro no ABC Paulista" loading="lazy" /></figure>
              <figure><img src={atendimentoNoturno} alt="Atendimento noturno realizado pelo guincho Netiv" loading="lazy" /></figure>
              <figure><img src={atendimentoUtilitario} alt="Transporte de utilitário realizado pela Netiv Transportes" loading="lazy" /></figure>
            </div>
          </div>
        </section>

        <section id="regioes" className="tow-section tow-areas">
          <div className="tow-shell tow-area-grid">
            <div>
              <p className="tow-kicker">Regiões atendidas</p>
              <h2>São Bernardo do Campo e ABC Paulista</h2>
              <p>Atendimento local em raio aproximado de 18 km, conforme disponibilidade. Para litoral e outras regiões, consulte o deslocamento.</p>
            </div>
            <div>
              <ul>
                {localRegionPages.map((item) => <li key={item.slug}><a href={`${BASE_PATH}${item.slug}/`}><MapPin aria-hidden="true" /> {item.city}</a></li>)}
                <li><a href={whatsappHref} target="_blank" rel="noopener noreferrer" onClick={() => trackContact('whatsapp', 'other_region')}><MapPin aria-hidden="true" /> Outras regiões sob consulta</a></li>
              </ul>
              <div className="tow-route-links" aria-label="Rotas para o litoral">
                <strong>Rotas para o litoral:</strong>
                {coastRegionPages.map((item) => <a key={item.slug} href={`${BASE_PATH}${item.slug}/`}>{item.city}</a>)}
              </div>
            </div>
          </div>
        </section>

        <section className="tow-section tow-confidence">
          <div className="tow-shell tow-confidence-grid">
            <div>
              <p className="tow-kicker">Credibilidade que você pode verificar</p>
              <h2>Informação clara antes do atendimento</h2>
            </div>
            <div className="tow-confidence-items">
              <div><ShieldCheck aria-hidden="true" /><span><strong>CNPJ ativo</strong><small>{CNPJ}</small></span></div>
              <div><Truck aria-hidden="true" /><span><strong>Guincho próprio</strong><small>Fotos reais no site</small></span></div>
              <div><Banknote aria-hidden="true" /><span><strong>Formas de pagamento</strong><small>Pix, crédito e débito</small></span></div>
            </div>
          </div>
        </section>

        <section id="duvidas" className="tow-section tow-faq">
          <div className="tow-shell tow-faq-grid">
            <div>
              <p className="tow-kicker">Dúvidas rápidas</p>
              <h2>Antes de chamar o guincho</h2>
              <p>Tenha em mãos o modelo do veículo, local de retirada, destino e condição atual. Isso agiliza a consulta.</p>
            </div>
            <div className="tow-accordions">
              {pageFaqItems.map((item) => (
                <details key={item.question}>
                  <summary>{item.question}<span aria-hidden="true">+</span></summary>
                  <p>{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="tow-final-cta">
          <div className="tow-shell tow-final-inner">
            <div>
              <p className="tow-kicker">Precisa de atendimento?</p>
              <h2>Consulte agora seu guincho.</h2>
              <p>Envie a localização, o destino e o modelo do veículo pelo WhatsApp.</p>
            </div>
            <div>
              <a className="tow-button tow-button-primary" href={whatsappHref} target="_blank" rel="noopener noreferrer" onClick={() => trackContact('whatsapp', 'final')}>
                <MessageCircle aria-hidden="true" /> Solicitar orçamento
              </a>
              <small>Resposta conforme disponibilidade</small>
            </div>
          </div>
        </section>
      </main>

      <footer className="tow-footer">
        <div className="tow-shell tow-footer-grid">
          <div className="tow-brand tow-brand-footer"><span className="tow-brand-mark"><Truck aria-hidden="true" /></span><span><strong>NETIV</strong><small>TRANSPORTES</small></span></div>
          <p>{region ? heroTitle : 'Guincho 24 horas em São Bernardo do Campo e região.'}</p>
          <div><a href={`${BASE_PATH}politica-de-privacidade/`}>Política de Privacidade</a><span>•</span><span>CNPJ {CNPJ}</span></div>
        </div>
      </footer>

      <a className="tow-floating-whatsapp" href={whatsappHref} target="_blank" rel="noopener noreferrer" aria-label="Solicitar orçamento pelo WhatsApp" onClick={() => trackContact('whatsapp', 'floating')}>
        <MessageCircle aria-hidden="true" /><span>Chamar no WhatsApp</span>
      </a>
    </div>
  )
}
