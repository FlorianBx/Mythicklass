export interface Affix {
  id: number
  name: string
  description: string
  icon: string
  icon_url: string
  wowhead_url: string
}

export interface AffixResponse {
  region: string
  title: string
  leaderboard_url: string
  affix_details: Affix[]
}

export async function fetchWowAffixes(): Promise<AffixResponse> {
  const response = await fetch('/api/affix-eu')
  if (!response.ok) {
    throw new Error(`Failed to fetch affixes: ${response.status}`)
  }
  return response.json()
}
