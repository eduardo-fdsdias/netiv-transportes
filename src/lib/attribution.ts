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
  const campaign = (url.searchParams.get("utm_campaign") || "").toLowerCase()

  if (origin.includes("pesquisa") || campaign.includes("pesquisa") || campaign.includes("search")) {
    return { reference: "ADS-PESQUISA", analyticsValue: "google_ads_search", campaignId }
  }

  if (origin.includes("pmax") || campaign.includes("pmax") || campaign.includes("performance")) {
    return { reference: "ADS-PMAX", analyticsValue: "google_ads_pmax", campaignId }
  }

  if (url.searchParams.has("gclid") || origin === "google_ads" || url.searchParams.get("utm_medium") === "cpc") {
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

  return DEFAULT_ATTRIBUTION
}
