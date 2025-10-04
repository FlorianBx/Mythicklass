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
  interrupts?: string[]
  crowdControl?: string[]
  hasHeroism?: boolean
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
    interrupts: ['Pummel'],
    crowdControl: ['Storm Bolt', 'Intimidating Shout'],
  },
  paladin: {
    name: 'Paladin',
    color: '#F58CBA',
    buffs: ['Blessing of Kings', 'Devotion Aura'],
    interrupts: ['Rebuke'],
    crowdControl: ['Hammer of Justice', 'Blinding Light'],
  },
  hunter: {
    name: 'Hunter',
    color: '#ABD473',
    buffs: ['Aspect of the Wild'],
    interrupts: ['Counter Shot'],
    crowdControl: ['Freezing Trap', 'Intimidation'],
  },
  rogue: {
    name: 'Rogue',
    color: '#FFF569',
    buffs: ['Tricks of the Trade'],
    interrupts: ['Kick'],
    crowdControl: ['Blind', 'Gouge', 'Kidney Shot'],
  },
  priest: {
    name: 'Priest',
    color: '#FFFFFF',
    buffs: ['Power Word: Fortitude', 'Power Infusion'],
    interrupts: ['Silence'],
    crowdControl: ['Psychic Scream', 'Mind Control'],
  },
  deathknight: {
    name: 'Death Knight',
    color: '#C41F3B',
    buffs: ['Anti-Magic Zone'],
    interrupts: ['Mind Freeze'],
    crowdControl: ['Asphyxiate', 'Gorefiend\'s Grasp'],
  },
  shaman: {
    name: 'Shaman',
    color: '#0070DE',
    buffs: ['Bloodlust', 'Wind Rush Totem'],
    interrupts: ['Wind Shear'],
    crowdControl: ['Hex', 'Capacitor Totem'],
    hasHeroism: true,
  },
  mage: {
    name: 'Mage',
    color: '#69CCF0',
    buffs: ['Arcane Intellect', 'Time Warp'],
    interrupts: ['Counterspell'],
    crowdControl: ['Polymorph', 'Ring of Frost'],
    hasHeroism: true,
  },
  warlock: {
    name: 'Warlock',
    color: '#9482C9',
    buffs: ['Soulstone', 'Gateway'],
    interrupts: ['Spell Lock'],
    crowdControl: ['Fear', 'Banish'],
  },
  monk: {
    name: 'Monk',
    color: '#00FF96',
    buffs: ['Mystic Touch'],
    interrupts: ['Spear Hand Strike'],
    crowdControl: ['Leg Sweep', 'Paralysis'],
  },
  druid: {
    name: 'Druid',
    color: '#FF7D0A',
    buffs: ['Mark of the Wild', 'Innervate'],
    interrupts: ['Solar Beam'],
    crowdControl: ['Bash', 'Mighty Bash', 'Typhoon'],
  },
  demonhunter: {
    name: 'Demon Hunter',
    color: '#A330C9',
    buffs: ['Chaos Brand'],
    interrupts: ['Disrupt'],
    crowdControl: ['Chaos Nova', 'Imprison'],
  },
  evoker: {
    name: 'Evoker',
    color: '#33937F',
    buffs: ['Blessing of the Bronze'],
    interrupts: ['Quell'],
    crowdControl: ['Wing Buffet', 'Deep Breath'],
    hasHeroism: true,
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
