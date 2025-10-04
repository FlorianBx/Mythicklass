import { describe, it, expect, beforeEach, vi } from 'vitest'
import { fetchWowClassData, WOW_CLASS_SLUGS } from '../composables/useWowClass'

global.fetch = vi.fn()

describe('fetchWowClassData', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('fetches warrior class data successfully', async () => {
    const mockFetch = vi.mocked(fetch)
    mockFetch.mockResolvedValueOnce(new Response(null, { status: 200 }))

    const data = await fetchWowClassData('warrior')

    expect(data).toEqual({
      slug: 'warrior',
      name: 'Warrior',
      iconUrl: '/api/wow-icons/classicon_warrior.jpg',
      color: '#C79C6E',
      buffs: ['Battle Shout', 'Commanding Shout'],
      counterSpells: ['Pummel', 'Storm Bolt'],
    })
  })

  it('fetches mage class data successfully', async () => {
    const mockFetch = vi.mocked(fetch)
    mockFetch.mockResolvedValueOnce(new Response(null, { status: 200 }))

    const data = await fetchWowClassData('mage')

    expect(data).toEqual({
      slug: 'mage',
      name: 'Mage',
      iconUrl: '/api/wow-icons/classicon_mage.jpg',
      color: '#69CCF0',
      buffs: ['Arcane Intellect', 'Time Warp'],
      counterSpells: ['Counterspell', 'Polymorph'],
    })
  })

  it('handles fetch errors correctly', async () => {
    const mockFetch = vi.mocked(fetch)
    mockFetch.mockResolvedValueOnce(new Response(null, { status: 404 }))

    await expect(fetchWowClassData('hunter')).rejects.toThrow('Failed to fetch icon for hunter')
  })

  it('handles network errors correctly', async () => {
    const mockFetch = vi.mocked(fetch)
    mockFetch.mockRejectedValueOnce(new Error('Network error'))

    await expect(fetchWowClassData('rogue')).rejects.toThrow('Network error')
  })

  it('constructs correct icon URL for deathknight', async () => {
    const mockFetch = vi.mocked(fetch)
    mockFetch.mockResolvedValueOnce(new Response(null, { status: 200 }))

    const data = await fetchWowClassData('deathknight')

    expect(mockFetch).toHaveBeenCalledWith('/api/wow-icons/classicon_deathknight.jpg', {
      method: 'HEAD',
    })
    expect(data.iconUrl).toBe('/api/wow-icons/classicon_deathknight.jpg')
  })

  it('exports all class slugs', () => {
    expect(WOW_CLASS_SLUGS).toEqual([
      'warrior',
      'paladin',
      'hunter',
      'rogue',
      'priest',
      'deathknight',
      'shaman',
      'mage',
      'warlock',
      'monk',
      'druid',
      'demonhunter',
      'evoker',
    ])
  })
})
