export const PHONE_DISPLAY = "(11) 94378-6869"

export const PHONE_TEL = "tel:+5511943786869"

export const WHATSAPP_NUMBER = "5511943786869"

export const WHATSAPP_ORCAMENTO =
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    "Olá, preciso de um guincho no ABC Paulista.\n\nVeículo (marca/modelo): ____\nLocal de retirada: ____\nDestino: ____\nCondição do veículo (funciona, rodas travadas, garagem/subsolo): ____\nAtendimento (agora ou agendar): ____"
  )}`

export const BASE_CIDADE =
  "São Bernardo do Campo e ABC Paulista"

export const ADDRESS_DISPLAY =
  "São Bernardo do Campo"

export const CNPJ = "64.751.310/0001-20"

export const MAP_EMBED_URL =
  "https://www.google.com/maps?q=S%C3%A3o%20Bernardo%20do%20Campo%20-%20SP&z=11&output=embed"

export const INSTAGRAM_URL =
  "https://www.instagram.com/netiv.transportes/"

export const INSTAGRAM_HANDLE =
  "@netiv.transportes"

export const BASE_PATH = import.meta.env.BASE_URL

export const SITE_URL =
  (import.meta.env.VITE_SITE_URL || "https://netivtransportes.com.br").replace(/\/$/, "")

export const NAV_LINKS = [
  {
    label: "Início",
    href: "#inicio",
  },
  {
    label: "Serviços",
    href: "#servicos",
  },
  {
    label: "Regiões atendidas",
    href: "#areas-atendidas",
  },
  {
    label: "Contato",
    href: "#contato",
  },
] as const
