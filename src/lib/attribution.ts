export type TrafficAttribution = {
  reference: string
  analyticsValue: string
  campaignId?: string
}

const STORAGE_KEY = "netiv_traffic_attribution"

const DEFAULT_ATTRIBUTION: TrafficAttribution = {
  reference: "SITE",
  analyticsValue: "site_or_other",
}

const CAMPAIGNS: Record<string, TrafficAttribution> = {
  "24208487663": {
    reference: "ADS-PMAX",
    analyticsValue: "google_ads_pmax",
    campaignId: "24208487663",
  },
  "24219404331": {
    reference: "ADS-PESQUISA",
    analyticsValue: "google_ads_search",
    campaignId: "24219404331",
  },
}

const attributionFromUrl = (url: URL): TrafficAttribution | undefined => {
  const campaignId = url.searchParams.get("campaign_id") || url.searchParams.get("utm_id") || undefined
  if (campaignId && CAMPAIGNS[campaignId]) return CAMPAIGNS[campaignId]

  const origin = (url.searchParams.get("origem") || "").toLowerCase()
  const source = (url.searchParams.get("utm_source") || "").toLowerCase()
  const medium = (url.searchParams.get("utm_medium") || "").toLowerCase()
  const campaign = (url.searchParams.get("utm_campaign") || "").toLowerCase()

  if (origin.includes("pesquisa") || campaign.includes("pesquisa") || campaign.includes("search")) {
    return { reference: "ADS-PESQUISA", analyticsValue: "google_ads_search", campaignId }
  }

  if (origin.includes("pmax") || campaign.includes("pmax") || campaign.includes("performance")) {
    return { reference: "ADS-PMAX", analyticsValue: "google_ads_pmax", campaignId }
  }

  const isInstagram = /^(ig|instagram)$/.test(source) || origin.includes("instagram")
  const isFacebook = /^(fb|facebook)$/.test(source) || origin.includes("facebook") || url.searchParams.has("fbclid")
  const isSocialSource = isInstagram || isFacebook || source === "meta"
    || origin.includes("instagram")
    || origin.includes("facebook")
    || origin.includes("meta")
  const isPaidSocial = url.searchParams.has("fbclid")
    || medium.includes("paid")
    || medium === "cpc"
    || campaign.includes("ads")

  if (isSocialSource && isPaidSocial) {
    if (isInstagram) return { reference: "ADS-INSTAGRAM", analyticsValue: "instagram_ads", campaignId }
    if (isFacebook) return { reference: "ADS-FACEBOOK", analyticsValue: "facebook_ads", campaignId }
    return { reference: "ADS-REDES-SOCIAIS", analyticsValue: "paid_social", campaignId }
  }

  if (isSocialSource) {
    if (isInstagram) return { reference: "INSTAGRAM", analyticsValue: "instagram_social", campaignId }
    if (isFacebook) return { reference: "FACEBOOK", analyticsValue: "facebook_social", campaignId }
    return { reference: "REDES-SOCIAIS", analyticsValue: "social_media", campaignId }
  }

  if (url.searchParams.has("gclid") || origin === "google_ads" || source === "google" || medium === "cpc") {
    return { reference: "GOOGLE-ADS", analyticsValue: "google_ads", campaignId }
  }

  return undefined
}

export const readTrafficAttribution = (): TrafficAttribution => {
  if (typeof window === "undefined") return DEFAULT_ATTRIBUTION

  const fromUrl = attributionFromUrl(new URL(window.location.href))
  if (fromUrl) {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(fromUrl))
    return fromUrl
  }

  const stored = window.sessionStorage.getItem(STORAGE_KEY)
  if (stored) {
    try {
      return JSON.parse(stored) as TrafficAttribution
    } catch {
      window.sessionStorage.removeItem(STORAGE_KEY)
    }
  }

  if (/\.google\./i.test(document.referrer)) {
    const organic = { reference: "GOOGLE-ORGÂNICO", analyticsValue: "google_organic" }
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(organic))
    return organic
  }

  if (/(instagram\.com|facebook\.com|l\.facebook\.com)/i.test(document.referrer)) {
    const social = { reference: "REDES-SOCIAIS", analyticsValue: "social_media" }
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(social))
    return social
  }

  return DEFAULT_ATTRIBUTION
}

export const whatsAppSourceMessage = (attribution: TrafficAttribution): string => {
  if (attribution.analyticsValue.startsWith("google_ads")) {
    return "Olá, vi seu anúncio de guincho no Google Ads e gostaria de mais informações.\n\n[Envie essa mensagem para iniciar o orçamento]"
  }

  if (attribution.analyticsValue === "instagram_ads") {
    return "Olá, vi seu anúncio de guincho no Instagram e gostaria de mais informações.\n\n[Envie essa mensagem para iniciar o orçamento]"
  }

  if (attribution.analyticsValue === "facebook_ads") {
    return "Olá, vi seu anúncio de guincho no Facebook e gostaria de mais informações.\n\n[Envie essa mensagem para iniciar o orçamento]"
  }

  if (attribution.analyticsValue === "paid_social") {
    return "Olá, vi seu anúncio de guincho nas redes sociais e gostaria de mais informações.\n\n[Envie essa mensagem para iniciar o orçamento]"
  }

  if (attribution.analyticsValue === "instagram_social") {
    return "Olá, vi seu serviço de guincho no Instagram e gostaria de mais informações.\n\n[Envie essa mensagem para iniciar o orçamento]"
  }

  if (attribution.analyticsValue === "facebook_social") {
    return "Olá, vi seu serviço de guincho no Facebook e gostaria de mais informações.\n\n[Envie essa mensagem para iniciar o orçamento]"
  }

  if (attribution.analyticsValue === "social_media") {
    return "Olá, vi seu serviço de guincho nas redes sociais e gostaria de mais informações.\n\n[Envie essa mensagem para iniciar o orçamento]"
  }

  if (attribution.analyticsValue === "google_organic") {
    return "Olá, vi seu anúncio de guincho no Google e gostaria de mais informações.\n\n[Envie essa mensagem para iniciar o orçamento]"
  }

  return "Olá, vi seu site de guincho e gostaria de mais informações.\n\n[Envie essa mensagem para iniciar o orçamento]"
}
