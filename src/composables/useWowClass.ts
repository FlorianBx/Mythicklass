export type WowClassSlug =
  | 'warrior'
  | 'paladin'
  | 'hunter'
  | 'rogue'
  | 'priest'
  | 'deathknight'
  | 'shaman'
  | 'mage'
  | 'warlock'
  | 'monk'
  | 'druid'
  | 'demonhunter'
  | 'evoker'

export interface WowClassData {
  slug: WowClassSlug
  name: string
  iconUrl: string
  buffs?: string[]
  counterSpells?: string[]
  color?: string
}

export const WOW_CLASS_SLUGS: WowClassSlug[] = [
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
]

export const classDataMap: Record<WowClassSlug, Omit<WowClassData, 'iconUrl' | 'slug'>> = {
  warrior: {
    name: 'Warrior',
    color: '#C79C6E',
    buffs: ['Battle Shout', 'Commanding Shout'],
    counterSpells: ['Pummel', 'Storm Bolt'],
  },
  paladin: {
    name: 'Paladin',
    color: '#F58CBA',
    buffs: ['Blessing of Kings', 'Devotion Aura'],
    counterSpells: ['Hammer of Justice', 'Rebuke'],
  },
  hunter: {
    name: 'Hunter',
    color: '#ABD473',
    buffs: ['Aspect of the Wild'],
    counterSpells: ['Counter Shot', 'Freezing Trap'],
  },
  rogue: {
    name: 'Rogue',
    color: '#FFF569',
    buffs: ['Tricks of the Trade'],
    counterSpells: ['Kick', 'Blind', 'Gouge'],
  },
  priest: {
    name: 'Priest',
    color: '#FFFFFF',
    buffs: ['Power Word: Fortitude', 'Power Infusion'],
    counterSpells: ['Silence', 'Psychic Scream'],
  },
  deathknight: {
    name: 'Death Knight',
    color: '#C41F3B',
    buffs: ['Anti-Magic Zone'],
    counterSpells: ['Mind Freeze', 'Asphyxiate'],
  },
  shaman: {
    name: 'Shaman',
    color: '#0070DE',
    buffs: ['Bloodlust', 'Wind Rush Totem'],
    counterSpells: ['Wind Shear', 'Hex'],
  },
  mage: {
    name: 'Mage',
    color: '#69CCF0',
    buffs: ['Arcane Intellect', 'Time Warp'],
    counterSpells: ['Counterspell', 'Polymorph'],
  },
  warlock: {
    name: 'Warlock',
    color: '#9482C9',
    buffs: ['Soulstone', 'Gateway'],
    counterSpells: ['Spell Lock', 'Fear'],
  },
  monk: {
    name: 'Monk',
    color: '#00FF96',
    buffs: ['Mystic Touch'],
    counterSpells: ['Spear Hand Strike', 'Leg Sweep'],
  },
  druid: {
    name: 'Druid',
    color: '#FF7D0A',
    buffs: ['Mark of the Wild', 'Innervate'],
    counterSpells: ['Solar Beam', 'Bash'],
  },
  demonhunter: {
    name: 'Demon Hunter',
    color: '#A330C9',
    buffs: ['Chaos Brand'],
    counterSpells: ['Disrupt', 'Chaos Nova'],
  },
  evoker: {
    name: 'Evoker',
    color: '#33937F',
    buffs: ['Blessing of the Bronze'],
    counterSpells: ['Quell', 'Wing Buffet'],
  },
}

export async function fetchWowClassData(slug: WowClassSlug): Promise<WowClassData> {
  const iconUrl = `/api/wow-icons/classicon_${slug}.jpg`

  const response = await fetch(iconUrl, { method: 'HEAD' })
  if (!response.ok) {
    throw new Error(`Failed to fetch icon for ${slug}`)
  }

  const classInfo = classDataMap[slug]
  return {
    slug,
    iconUrl,
    ...classInfo,
  }
}
