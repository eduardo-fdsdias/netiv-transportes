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

  const isSocialSource = /^(ig|instagram|fb|facebook|meta)$/.test(source)
    || origin.includes("instagram")
    || origin.includes("facebook")
    || origin.includes("meta")
  const isPaidSocial = url.searchParams.has("fbclid")
    || medium.includes("paid")
    || medium === "cpc"
    || campaign.includes("ads")

  if (isSocialSource && isPaidSocial) {
    return { reference: "ADS-REDES-SOCIAIS", analyticsValue: "paid_social", campaignId }
  }

  if (isSocialSource) {
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
    return "Olá, vi seu anúncio da Netiv no Google e gostaria de solicitar um orçamento de guincho."
  }

  if (attribution.analyticsValue === "paid_social") {
    return "Olá, vi seu anúncio da Netiv nas redes sociais e gostaria de solicitar um orçamento de guincho."
  }

  if (attribution.analyticsValue === "social_media") {
    return "Olá, encontrei a Netiv nas redes sociais e gostaria de solicitar um orçamento de guincho."
  }

  if (attribution.analyticsValue === "google_organic") {
    return "Olá, encontrei a Netiv na pesquisa do Google e gostaria de solicitar um orçamento de guincho."
  }

  return "Olá, acessei o site da Netiv e gostaria de solicitar um orçamento de guincho."
}
