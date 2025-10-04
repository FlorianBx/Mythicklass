import { describe, it, expect, beforeEach, vi } from 'vitest'
import { fetchWowAffixes } from '../composables/useWowAffixes'

global.fetch = vi.fn()

describe('fetchWowAffixes', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('fetches affix data successfully', async () => {
    const mockResponse = {
      region: 'eu',
      title: "Fortified + Tyrannical + Xal'atath's Bargain: Devour + Xal'atath's Guile",
      leaderboard_url: 'https://raider.io/mythic-plus-rankings/season-tww-1/all/world/leaderboards',
      affix_details: [
        {
          id: 159,
          name: "Xal'atath's Bargain: Devour",
          description: "While in combat, Xal'atath tears open rifts...",
          icon: 'spell_priest_mindspike',
          icon_url: 'https://mythicpl.us/static/affix_icons/spell_priest_mindspike.jpg',
          wowhead_url: 'https://www.wowhead.com/affix=159',
        },
      ],
    }

    const mockFetch = vi.mocked(fetch)
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    } as Response)

    const data = await fetchWowAffixes()

    expect(mockFetch).toHaveBeenCalledWith('https://mythicpl.us/affix-eu')
    expect(data).toEqual(mockResponse)
  })

  it('handles fetch errors correctly', async () => {
    const mockFetch = vi.mocked(fetch)
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
    } as Response)

    await expect(fetchWowAffixes()).rejects.toThrow('Failed to fetch affixes: 500')
  })

  it('handles network errors correctly', async () => {
    const mockFetch = vi.mocked(fetch)
    mockFetch.mockRejectedValueOnce(new Error('Network error'))

    await expect(fetchWowAffixes()).rejects.toThrow('Network error')
  })

  it('returns correct data structure with multiple affixes', async () => {
    const mockResponse = {
      region: 'eu',
      title: 'Test Affixes',
      leaderboard_url: 'https://example.com',
      affix_details: [
        {
          id: 1,
          name: 'Fortified',
          description: 'Non-boss enemies have more health',
          icon: 'ability_toughness',
          icon_url: 'https://example.com/fortified.jpg',
          wowhead_url: 'https://www.wowhead.com/affix=1',
        },
        {
          id: 2,
          name: 'Tyrannical',
          description: 'Bosses have more health',
          icon: 'ability_warrior_battleshout',
          icon_url: 'https://example.com/tyrannical.jpg',
          wowhead_url: 'https://www.wowhead.com/affix=2',
        },
      ],
    }

    const mockFetch = vi.mocked(fetch)
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    } as Response)

    const data = await fetchWowAffixes()

    expect(data.affix_details).toHaveLength(2)
    expect(data.affix_details[0].name).toBe('Fortified')
    expect(data.affix_details[1].name).toBe('Tyrannical')
  })
})
