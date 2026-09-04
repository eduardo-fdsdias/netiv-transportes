import "./App.css"
import { useState } from "react"
import regions from "./data/regions.json"
import { Bike, CalendarClock, Car, Clock, MapPin, ShieldCheck, Truck, Wrench, Zap } from "lucide-react"
import heroGuincho from "./assets/atendimento-utilitario.webp"
import atendimentoCarro from "./assets/atendimento-carro.webp"
import atendimentoNoturno from "./assets/atendimento-noturno.webp"
import guinchoFrente from "./assets/guincho-frente-placa-borrada.webp"
import guinchoLateral from "./assets/guincho-lateral-placa-borrada.webp"
import { SiteHeader } from "./components/SiteHeader"
import { Testimonials } from "./components/Testimonials"
import {
  ADDRESS_DISPLAY, CNPJ, INSTAGRAM_HANDLE, INSTAGRAM_URL, MAP_EMBED_URL,
  BASE_PATH, PHONE_DISPLAY, PHONE_TEL, SITE_URL,
} from "./data/site"

const services = [
  { icon: Car, title: "Guincho para carros", text: "Remoção segura de carros para oficina, residência ou destino indicado.", cta: "Chamar guincho" },
  { icon: Bike, title: "Guincho para motos", text: "Transporte cuidadoso de motocicletas com fixação adequada.", cta: "Transportar minha moto" },
  { icon: Wrench, title: "Pane mecânica", text: "Remoção quando o veículo não consegue continuar a viagem. Consulte disponibilidade.", cta: "Resolver pane agora" },
  { icon: Zap, title: "Pane elétrica", text: "Remoção para diagnóstico quando o veículo não liga ou apresenta falha elétrica.", cta: "Pedir assistência" },
  { icon: ShieldCheck, title: "Remoção pós-acidente", text: "Apoio responsável para retirar o veículo após uma ocorrência.", cta: "Preciso de socorro agora" },
  { icon: MapPin, title: "Transporte para oficinas", text: "Leve seu veículo até a oficina ou concessionária de sua confiança.", cta: "Levar para a oficina" },
  { icon: CalendarClock, title: "Remoções programadas", text: "Transporte agendado com origem, horário e destino combinados.", cta: "Agendar transporte" },
  { icon: Truck, title: "Utilitários e veículos leves", text: "Atendimento para veículos compatíveis com nossa plataforma.", cta: "Consultar capacidade" },
]

const localRegions = regions.filter(item => item.slug.startsWith("guincho-24h-") && item.city !== "ABC Paulista")
const cities = localRegions.map(item => item.city)
const coastRegions = regions.filter(item => item.slug.startsWith("guincho-para-"))
const coastAreas = coastRegions.map(item => item.city)
const regionHref = (city: string) => `${BASE_PATH}${regions.find(item => item.city === city)?.slug}/`
const extraCities = ["Poá", "Suzano"]
const faqs = [
  ["Quanto custa um serviço de guincho?", "O valor depende da localização do veículo, destino, distância e tipo de veículo. Envie esses dados pelo WhatsApp para receber um orçamento claro antes da saída do guincho."],
  ["Quanto tempo o guincho demora para chegar?", "O prazo varia conforme trânsito, distância e disponibilidade no momento. No primeiro contato informamos a previsão possível para sua localização, sem prometer um horário que não possa ser cumprido."],
  ["Quais veículos a Netiv transporta?", "Atendemos carros, motos, utilitários e veículos leves compatíveis com a capacidade e dimensões da plataforma. Informe marca e modelo para confirmarmos."],
  ["Quais cidades vocês atendem?", "Atendemos São Bernardo do Campo e cidades do ABC Paulista. Santos, Praia Grande, Guarujá, São Vicente, Cubatão, Serra de Santos e outras regiões são atendidas sob consulta de rota e disponibilidade. Informe origem e destino para confirmar o atendimento."],
  ["Quais formas de pagamento são aceitas?", "Aceitamos cartões de crédito, cartões de débito e Pix. O valor e a condição de pagamento são confirmados diretamente no momento do orçamento, antes da realização do serviço."],
  ["Vocês atendem por seguradoras?", "O atendimento é contratado diretamente com a Netiv. Se você pretende solicitar reembolso à seguradora, confirme antes quais documentos e condições ela exige."],
]

const gallery = [
  [atendimentoCarro, "Guincho plataforma carregando carro em São Bernardo do Campo"],
  [guinchoFrente, "Vista frontal do guincho da Netiv com placa protegida"],
  [atendimentoNoturno, "Atendimento de guincho 24 horas durante a noite"],
  [guinchoLateral, "Vista lateral completa do guincho da Netiv com placa protegida"],
]

const localBusinessSchema = {
  "@context": "https://schema.org", "@type": "AutomotiveBusiness", name: "Netiv Transportes",
  description: "Guincho 24 horas para carros, motos, utilitários e veículos leves em São Bernardo do Campo e ABC Paulista.",
  telephone: "+5511943786869", url: `${SITE_URL}/`,
  address: { "@type": "PostalAddress", streetAddress: "R. José D'Ângelo, 574 - Parque Terra Nova II", addressLocality: "São Bernardo do Campo", addressRegion: "SP", postalCode: "09820-670", addressCountry: "BR" },
  openingHoursSpecification: [{ "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"], opens: "00:00", closes: "23:59" }],
  areaServed: [...cities, ...coastAreas, ...extraCities].map(name => ({ "@type": "Place", name })),
  sameAs: [INSTAGRAM_URL], priceRange: "$$",
}
const makeFaqSchema = (items: string[][]) => ({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: items.map(([name, text]) => ({ "@type": "Question", name, acceptedAnswer: { "@type": "Answer", text } })) })

function WhatsAppIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 3.5A11.8 11.8 0 0 0 12.1 0C5.6 0 .3 5.3.3 11.8c0 2.1.6 4.1 1.6 5.9L0 24l6.5-1.7a11.8 11.8 0 0 0 5.6 1.4h.1C18.7 23.7 24 18.4 24 11.9c0-3.2-1.2-6.2-3.5-8.4ZM12.1 21.7c-1.8 0-3.5-.5-5-1.4l-.4-.2-3.9 1 1-3.8-.2-.4a9.8 9.8 0 1 1 8.5 4.8Zm5.4-7.4c-.3-.2-1.8-.9-2.1-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-1.8-.9-3-1.6-4.2-3.7-.3-.5.3-.5.9-1.6.1-.2.1-.4 0-.6l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.2-1.2 3 0 1.8 1.3 3.5 1.5 3.7.2.3 2.6 4 6.3 5.6 2.3 1 3.2 1.1 4.4.9.7-.1 1.8-.7 2.1-1.5.3-.7.3-1.4.2-1.5-.1-.2-.3-.3-.6-.4Z"/></svg>
}

const waLink = (message: string) => `https://wa.me/5511943786869?text=${encodeURIComponent(message)}`

function App({ pathname = "/" }: { pathname?: string }) {
  const region = regions.find(item => `/${item.slug}` === pathname.replace(/\/$/, ""))
  const [selectedCity, setSelectedCity] = useState("")
  const canPersonalize = !region || region.slug === "guincho-perto-de-mim"
  const city = selectedCity || region?.city || "ABC Paulista"
  const isCoast = coastAreas.includes(city)
  const requestLink = (service = "guincho") => waLink(`Olá, preciso consultar ${service} ${isCoast ? "para" : "em"} ${city}.${isCoast ? " Rota entre o ABC e o litoral, sob consulta de disponibilidade." : ""}\nVeículo (marca/modelo): ____\nLocal de retirada: ____\nDestino: ____`)
  const whatsapp = requestLink()
  const headline = canPersonalize
    ? isCoast ? `Guincho para ${city}` : `Atendimento de guincho 24h ${city === "ABC Paulista" ? "no ABC Paulista" : `em ${city}`}`
    : region.title
  const pageFaqs = region ? [[region.question, region.answer], ...faqs] : faqs
  const faqSchema = makeFaqSchema(pageFaqs)

  return <>
    <script type="application/ld+json">{JSON.stringify(localBusinessSchema)}</script>
    <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
    <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
    <SiteHeader whatsapp={whatsapp} />
    <main id="conteudo" tabIndex={-1}>
      <section id="inicio" className="hero">
        <div className="hero-backdrop" aria-hidden="true" />
        <div className="shell hero-grid">
          <div className="hero-copy">
            <span className="eyebrow"><i /> Atendimento 24 horas • Todos os dias</span>
            <h1>{headline}</h1>
            <p className="hero-lead">{canPersonalize && isCoast ? `Transporte de veículos entre o ABC Paulista e ${city}, sob consulta de rota e disponibilidade. Informe a origem e o destino.` : region?.description || "Carros, motos e utilitários leves. Atendimento direto e orçamento antes do serviço."}</p>

            <div className="hero-actions"><a className="button button-primary" href={whatsapp} target="_blank" rel="noopener noreferrer"><WhatsAppIcon /> {isCoast ? "Consultar rota" : "Pedir guincho"}</a><a className="button button-outline" href={PHONE_TEL}>Ligar agora</a></div>
            <ul className="trust-list"><li><Clock size={15}/> Disponível 24h</li><li><ShieldCheck size={15}/> Atendimento direto</li><li><MapPin size={15}/> Base em São Bernardo</li></ul>
            {canPersonalize && <div className="city-picker"><label htmlFor="cidade">Qual região você precisa atender?</label><select id="cidade" aria-describedby="cidade-ajuda" value={selectedCity} onChange={event => setSelectedCity(event.target.value)}><option value="">ABC Paulista</option><optgroup label="Cidades do ABC">{cities.map(name => <option key={name}>{name}</option>)}</optgroup><optgroup label="Litoral — rotas sob consulta">{coastAreas.map(name => <option key={name}>{name}</option>)}</optgroup></select><small id="cidade-ajuda" role="status">{isCoast ? `Rota para ${city} sob consulta. Base em São Bernardo; confirme origem e destino no WhatsApp.` : selectedCity ? `Solicitação para ${selectedCity}. Confirme o endereço no WhatsApp.` : "Atendimento no ABC e rotas para o litoral sob consulta."}</small><a className="selected-region-link" href={regionHref(city)}>Ver página de {city} →</a></div>}
          </div>
          <div className="hero-media"><img src={heroGuincho} width="760" height="1351" fetchPriority="high" alt="Guincho plataforma da Netiv transportando van sob céu azul no ABC Paulista" /><div className="hero-card"><strong>Atendimento real Netiv</strong><span>Guincho próprio • ABC Paulista</span></div></div>
        </div>
      </section>

      {region && <section className="section regional-intro"><div className="shell"><nav className="breadcrumbs" aria-label="Você está aqui"><a href={BASE_PATH}>Início</a><span aria-hidden="true"> / </span><span>{region.title}</span></nav><h2>{region.heading}</h2>{region.paragraphs.map(text => <p key={text}>{text}</p>)}<a className="text-link" href="#areas-atendidas">Ver regiões e outras rotas →</a></div></section>}

      <section className="proof-strip" aria-labelledby="credibilidade"><div className="shell"><h2 id="credibilidade">Credibilidade que você pode verificar</h2><div className="proof-grid"><div><strong>CNPJ ativo</strong><span>{CNPJ}</span></div><div><strong>Base fixa</strong><span>{ADDRESS_DISPLAY}</span></div><div><strong>Atendimento direto</strong><span>Sem intermediários</span></div><div><strong>Guincho próprio</strong><span>Equipamento real da Netiv</span></div></div></div></section>

      <section id="servicos" className="section services-section"><div className="shell">
        <div className="section-heading"><span className="section-kicker">Serviços de guincho</span><h2>Atendimento para cada tipo de necessidade</h2><p>Escolha sua situação e fale direto pelo WhatsApp.</p></div>
        <div className="services-grid">{services.map(({icon:Icon,title,text,cta}) => <article className="service-card" key={title}><span className="service-icon"><Icon size={23}/></span><h3>{title}</h3><p>{text}</p><a href={requestLink(title.toLowerCase())} target="_blank" rel="noopener noreferrer">{cta} →</a></article>)}</div>
      </div></section>

      <section id="como-funciona" className="section process-section"><div className="shell process-grid">
        <div className="section-heading left"><span className="section-kicker">Como funciona</span><h2>Do chamado ao transporte em 3 passos</h2><p>Sem cadastro e sem formulário longo. Resolva tudo pelo WhatsApp ou telefone.</p><a className="button button-dark" href={whatsapp} target="_blank" rel="noopener noreferrer">Começar atendimento</a></div>
        <ol className="steps"><li><span>01</span><div><h3>Chame agora</h3><p>Um contato direto para verificar disponibilidade sem perder tempo.</p></div></li><li><span>02</span><div><h3>Envie localização e veículo</h3><p>Com origem, destino e modelo, o orçamento fica mais rápido e preciso.</p></div></li><li><span>03</span><div><h3>Confirme o atendimento</h3><p>Você recebe valor e previsão possível antes do deslocamento.</p></div></li></ol>
      </div></section>

      <section id="atendimentos" className="section gallery-section"><div className="shell"><div className="section-heading"><span className="section-kicker">Fotos reais</span><h2>Atendimentos realizados pela Netiv</h2><p>Nosso equipamento e transportes reais no ABC Paulista.</p></div><div className="gallery-grid">{gallery.map(([src,alt],index)=><figure className={index===0?"gallery-featured":""} key={src}><img src={src} alt={alt} loading="lazy" width="760" height="1200"/></figure>)}</div><div className="center-cta"><a className="button button-dark" href={whatsapp} target="_blank" rel="noopener noreferrer">Solicitar meu atendimento</a></div></div></section>

      <Testimonials />

      <section id="areas-atendidas" className="section areas-section"><div className="shell"><div className="section-heading"><span className="section-kicker">Atendimento regional 24 horas</span><h2>Regiões atendidas</h2><p>Atendimento no ABC Paulista e rotas para a Baixada Santista sob consulta. Informe a origem e o destino para confirmar disponibilidade e orçamento.</p></div><nav className="region-links" aria-label="Páginas de regiões e rotas">{regions.map(item => <a key={item.slug} href={`${BASE_PATH}${item.slug}/`}>{item.title} →</a>)}</nav><div className="coverage-label"><span>Base local</span><strong>{ADDRESS_DISPLAY}</strong><small>ABC Paulista e rotas para o litoral</small></div><div className="local-grid">{cities.map(city=><article key={city}><MapPin size={22}/><h3>Guincho em {city}</h3><p>Atendimento 24h para carros, motos e veículos leves.</p><a href={regionHref(city)}>Ver atendimento em {city} →</a></article>)}</div><div className="coast-heading"><span>Rotas para o litoral</span><h2>Atendimento na Serra e Baixada Santista</h2><p>Consulte disponibilidade para remoções, transportes e deslocamentos entre o ABC e o litoral.</p></div><div className="coast-grid">{coastAreas.map(area=><article key={area}><Truck size={21}/><div><h3>Guincho para {area}</h3><p>Atendimento sob consulta de rota e disponibilidade.</p><small>Consulte o tempo estimado de deslocamento ao solicitar.</small></div><a href={regionHref(area)}>Ver rota para {area} →</a></article>)}</div><div className="extra-areas"><strong>Outras regiões sob consulta:</strong><div className="extra-area-links">{extraCities.map(city=><a key={city} href={waLink(`Olá! Preciso consultar um guincho para ${city}. Minha localização é: `)} target="_blank" rel="noopener noreferrer">{city} <span>→</span></a>)}<a href={waLink("Olá! Preciso consultar um guincho para outra região. Minha localização é: ")} target="_blank" rel="noopener noreferrer">Outra região <span>→</span></a></div></div></div></section>

      <section id="sobre" className="section about-section"><div className="shell about-grid"><div className="about-panel"><span>NETIV</span><strong>Transportes</strong><small>Guincho 24 horas</small></div><div className="section-heading left"><span className="section-kicker">Sobre a Netiv</span><h2>Transporte responsável e comunicação clara</h2><p>Com base em São Bernardo do Campo, atendemos situações de urgência e transportes programados em toda a região. Você fala diretamente com nossa equipe desde o orçamento até o destino.</p><ul className="check-list"><li>Orçamento antes do atendimento</li><li>Cuidado no embarque e transporte</li><li>Atendimento 24 horas, todos os dias</li></ul><a className="button button-dark" href={whatsapp} target="_blank" rel="noopener noreferrer">Falar com a Netiv</a></div></div></section>

      <section id="faq" className="section faq-section"><div className="shell"><div className="section-heading"><span className="section-kicker">Perguntas frequentes</span><h2>Dúvidas sobre guincho 24 horas</h2><p>Respostas objetivas para decidir e pedir atendimento com segurança.</p></div><div className="faq-visible">{pageFaqs.map(([question,answer])=><details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div><div className="center-cta"><a className="button button-dark" href={requestLink("informações sobre guincho")} target="_blank" rel="noopener noreferrer">Tirar dúvida no WhatsApp</a></div></div></section>

      <section id="contato" className="section contact-section"><div className="shell contact-grid"><div><span className="section-kicker">Contato e localização</span><h2>Fale com a Netiv Transportes</h2><p className="contact-intro">Envie sua localização para agilizar a consulta de disponibilidade.</p><dl><div><dt>WhatsApp e telefone</dt><dd><a href={PHONE_TEL}>{PHONE_DISPLAY}</a></dd></div><div><dt>Instagram</dt><dd><a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">{INSTAGRAM_HANDLE}</a></dd></div><div><dt>Base operacional</dt><dd>{ADDRESS_DISPLAY}</dd></div><div><dt>Horário</dt><dd>24 horas • 7 dias por semana</dd></div></dl><div className="contact-actions"><a className="button button-primary" href={whatsapp} target="_blank" rel="noopener noreferrer"><WhatsAppIcon/> Pedir atendimento</a><a className="button button-dark" href={PHONE_TEL}>Ligar agora</a></div></div><div className="map-wrap"><iframe title="Localização da Netiv Transportes em São Bernardo do Campo" src={MAP_EMBED_URL} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen /></div></div></section>

      <section className="cta-section"><div className="shell cta-content"><div><span className="section-kicker">Atendimento 24 horas</span><h2>Seu veículo parou? Fale conosco agora.</h2></div><div className="cta-actions"><a className="button button-primary" href={whatsapp} target="_blank" rel="noopener noreferrer"><WhatsAppIcon/> Pedir guincho</a><a className="cta-phone" href={PHONE_TEL}>{PHONE_DISPLAY}</a></div></div></section>
    </main>

    <footer className="site-footer"><div className="shell footer-grid"><div className="footer-brand"><strong>NETIV</strong><span>Transportes</span><p>Guincho e transporte veicular 24 horas em São Bernardo do Campo e ABC Paulista.</p></div><div><h2>Navegação</h2><a href="#servicos">Serviços</a><a href="#como-funciona">Como funciona</a><a href="#areas-atendidas">Regiões atendidas</a>{regions.map(item => <a key={item.slug} href={`${BASE_PATH}${item.slug}/`}>{item.title}</a>)}<a href={`${BASE_PATH}politica-de-privacidade/`}>Política de Privacidade</a></div><div><h2>Contato</h2><a href={PHONE_TEL}>{PHONE_DISPLAY}</a><a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">{INSTAGRAM_HANDLE}</a><span>{ADDRESS_DISPLAY}</span><span>Atendimento 24 horas</span></div></div><div className="shell footer-bottom"><span>© 2026 Netiv Transportes. Todos os direitos reservados.</span><strong>CNPJ: {CNPJ}</strong></div></footer>

    <a className="floating-whatsapp" href={whatsapp} target="_blank" rel="noopener noreferrer" aria-label="Pedir guincho pelo WhatsApp"><WhatsAppIcon/></a>
    <div className="mobile-sticky"><a href={whatsapp} target="_blank" rel="noopener noreferrer"><WhatsAppIcon/> WhatsApp</a><a href={PHONE_TEL}>Ligar agora</a></div>
  </>
}
export default App
