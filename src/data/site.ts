export const PHONE_DISPLAY = "(11) 94378-6869"

export const PHONE_TEL = "tel:+5511943786869"

export const WHATSAPP_NUMBER = "5511943786869"

export const WHATSAPP_ORCAMENTO =
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    "Olá, preciso de um guincho no ABC Paulista. Veículo: ____; Local de retirada: ____; Destino: ____."
  )}`

export const BASE_CIDADE =
  "São Bernardo do Campo e ABC Paulista"

export const ADDRESS_DISPLAY =
  "R. José D'Ângelo, 574 - Parque Terra Nova II, São Bernardo do Campo - SP, CEP 09820-670"

export const CNPJ = "64.751.310/0001-20"

export const MAP_EMBED_URL =
  "https://www.google.com/maps?q=R.%20Jos%C3%A9%20D%27%C3%82ngelo%2C%20574%20-%20Parque%20Terra%20Nova%20II%2C%20S%C3%A3o%20Bernardo%20do%20Campo%20-%20SP%2C%2009820-670&output=embed"

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
