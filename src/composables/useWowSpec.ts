export type WowSpecSlug =
  | 'blood'
  | 'frost-dk'
  | 'unholy'
  | 'havoc'
  | 'vengeance'
  | 'balance'
  | 'feral'
  | 'guardian'
  | 'restoration-druid'
  | 'augmentation'
  | 'devastation'
  | 'preservation'
  | 'beast-mastery'
  | 'marksmanship'
  | 'survival'
  | 'arcane'
  | 'fire'
  | 'frost-mage'
  | 'brewmaster'
  | 'mistweaver'
  | 'windwalker'
  | 'holy-paladin'
  | 'protection-paladin'
  | 'retribution'
  | 'discipline'
  | 'holy-priest'
  | 'shadow'
  | 'assassination'
  | 'outlaw'
  | 'subtlety'
  | 'elemental'
  | 'enhancement'
  | 'restoration-shaman'
  | 'affliction'
  | 'demonology'
  | 'destruction'
  | 'arms'
  | 'fury'
  | 'protection-warrior'

export type WowRole = 'tank' | 'healer' | 'dps'

export interface WowSpecData {
  slug: WowSpecSlug
  name: string
  className: string
  iconUrl: string
  role: WowRole
  buffs?: string[]
  interrupts?: string[]
  crowdControl?: string[]
  hasHeroism?: boolean
  color: string
}

export const WOW_SPEC_SLUGS: WowSpecSlug[] = [
  'blood',
  'frost-dk',
  'unholy',
  'havoc',
  'vengeance',
  'balance',
  'feral',
  'guardian',
  'restoration-druid',
  'augmentation',
  'devastation',
  'preservation',
  'beast-mastery',
  'marksmanship',
  'survival',
  'arcane',
  'fire',
  'frost-mage',
  'brewmaster',
  'mistweaver',
  'windwalker',
  'holy-paladin',
  'protection-paladin',
  'retribution',
  'discipline',
  'holy-priest',
  'shadow',
  'assassination',
  'outlaw',
  'subtlety',
  'elemental',
  'enhancement',
  'restoration-shaman',
  'affliction',
  'demonology',
  'destruction',
  'arms',
  'fury',
  'protection-warrior',
]

const specIconMap: Record<WowSpecSlug, string> = {
  blood: 'spell_deathknight_bloodpresence',
  'frost-dk': 'spell_deathknight_frostpresence',
  unholy: 'spell_deathknight_unholypresence',
  havoc: 'ability_demonhunter_specdps',
  vengeance: 'ability_demonhunter_spectank',
  balance: 'spell_nature_starfall',
  feral: 'ability_druid_catform',
  guardian: 'ability_racial_bearform',
  'restoration-druid': 'spell_nature_healingtouch',
  augmentation: 'classicon_evoker_augmentation',
  devastation: 'classicon_evoker_devastation',
  preservation: 'classicon_evoker_preservation',
  'beast-mastery': 'ability_hunter_bestialdiscipline',
  marksmanship: 'ability_hunter_focusedaim',
  survival: 'ability_hunter_camouflage',
  arcane: 'spell_holy_magicalsentry',
  fire: 'spell_fire_firebolt02',
  'frost-mage': 'spell_frost_frostbolt02',
  brewmaster: 'spell_monk_brewmaster_spec',
  mistweaver: 'spell_monk_mistweaver_spec',
  windwalker: 'spell_monk_windwalker_spec',
  'holy-paladin': 'spell_holy_holybolt',
  'protection-paladin': 'ability_paladin_shieldofthetemplar',
  retribution: 'spell_holy_auraoflight',
  discipline: 'spell_holy_powerwordshield',
  'holy-priest': 'spell_holy_guardianspirit',
  shadow: 'spell_shadow_shadowwordpain',
  assassination: 'ability_rogue_deadlybrew',
  outlaw: 'ability_rogue_waylay',
  subtlety: 'ability_stealth',
  elemental: 'spell_nature_lightning',
  enhancement: 'spell_shaman_improvedstormstrike',
  'restoration-shaman': 'spell_nature_magicimmunity',
  affliction: 'spell_shadow_deathcoil',
  demonology: 'spell_shadow_metamorphosis',
  destruction: 'spell_shadow_rainoffire',
  arms: 'ability_warrior_savageblow',
  fury: 'ability_warrior_innerrage',
  'protection-warrior': 'ability_warrior_defensivestance',
}

export const specDataMap: Record<WowSpecSlug, Omit<WowSpecData, 'iconUrl' | 'slug'>> = {
  blood: {
    name: 'Blood',
    className: 'Death Knight',
    role: 'tank',
    color: '#C41F3B',
    buffs: ['Anti-Magic Zone'],
    interrupts: ['Mind Freeze'],
    crowdControl: ['Asphyxiate', "Gorefiend's Grasp"],
  },
  'frost-dk': {
    name: 'Frost',
    className: 'Death Knight',
    role: 'dps',
    color: '#C41F3B',
    buffs: ['Anti-Magic Zone'],
    interrupts: ['Mind Freeze'],
    crowdControl: ['Asphyxiate', "Gorefiend's Grasp"],
  },
  unholy: {
    name: 'Unholy',
    className: 'Death Knight',
    role: 'dps',
    color: '#C41F3B',
    buffs: ['Anti-Magic Zone'],
    interrupts: ['Mind Freeze'],
    crowdControl: ['Asphyxiate', "Gorefiend's Grasp"],
  },
  havoc: {
    name: 'Havoc',
    className: 'Demon Hunter',
    role: 'dps',
    color: '#A330C9',
    buffs: ['Chaos Brand'],
    interrupts: ['Disrupt'],
    crowdControl: ['Chaos Nova', 'Imprison'],
  },
  vengeance: {
    name: 'Vengeance',
    className: 'Demon Hunter',
    role: 'tank',
    color: '#A330C9',
    buffs: ['Chaos Brand'],
    interrupts: ['Disrupt'],
    crowdControl: ['Chaos Nova', 'Imprison', 'Sigil of Chains'],
  },
  balance: {
    name: 'Balance',
    className: 'Druid',
    role: 'dps',
    color: '#FF7D0A',
    buffs: ['Mark of the Wild', 'Innervate'],
    interrupts: ['Solar Beam'],
    crowdControl: ['Typhoon', 'Ursol\'s Vortex'],
  },
  feral: {
    name: 'Feral',
    className: 'Druid',
    role: 'dps',
    color: '#FF7D0A',
    buffs: ['Mark of the Wild', 'Innervate'],
    interrupts: ['Skull Bash'],
    crowdControl: ['Bash', 'Mighty Bash', 'Maim'],
  },
  guardian: {
    name: 'Guardian',
    className: 'Druid',
    role: 'tank',
    color: '#FF7D0A',
    buffs: ['Mark of the Wild', 'Innervate'],
    interrupts: ['Skull Bash'],
    crowdControl: ['Bash', 'Mighty Bash', 'Incapacitating Roar'],
  },
  'restoration-druid': {
    name: 'Restoration',
    className: 'Druid',
    role: 'healer',
    color: '#FF7D0A',
    buffs: ['Mark of the Wild', 'Innervate'],
    interrupts: [],
    crowdControl: ['Bash', 'Mighty Bash', 'Typhoon'],
  },
  augmentation: {
    name: 'Augmentation',
    className: 'Evoker',
    role: 'dps',
    color: '#33937F',
    buffs: ['Blessing of the Bronze', 'Ebon Might'],
    interrupts: ['Quell'],
    crowdControl: ['Wing Buffet', 'Deep Breath'],
    hasHeroism: true,
  },
  devastation: {
    name: 'Devastation',
    className: 'Evoker',
    role: 'dps',
    color: '#33937F',
    buffs: ['Blessing of the Bronze'],
    interrupts: ['Quell'],
    crowdControl: ['Wing Buffet', 'Deep Breath'],
    hasHeroism: true,
  },
  preservation: {
    name: 'Preservation',
    className: 'Evoker',
    role: 'healer',
    color: '#33937F',
    buffs: ['Blessing of the Bronze'],
    interrupts: ['Quell'],
    crowdControl: ['Wing Buffet', 'Deep Breath'],
    hasHeroism: true,
  },
  'beast-mastery': {
    name: 'Beast Mastery',
    className: 'Hunter',
    role: 'dps',
    color: '#ABD473',
    buffs: ['Aspect of the Wild'],
    interrupts: ['Counter Shot'],
    crowdControl: ['Freezing Trap', 'Intimidation'],
  },
  marksmanship: {
    name: 'Marksmanship',
    className: 'Hunter',
    role: 'dps',
    color: '#ABD473',
    buffs: ['Aspect of the Wild'],
    interrupts: ['Counter Shot'],
    crowdControl: ['Freezing Trap', 'Scatter Shot'],
  },
  survival: {
    name: 'Survival',
    className: 'Hunter',
    role: 'dps',
    color: '#ABD473',
    buffs: ['Aspect of the Wild'],
    interrupts: ['Muzzle'],
    crowdControl: ['Freezing Trap', 'Intimidation'],
  },
  arcane: {
    name: 'Arcane',
    className: 'Mage',
    role: 'dps',
    color: '#69CCF0',
    buffs: ['Arcane Intellect', 'Time Warp'],
    interrupts: ['Counterspell'],
    crowdControl: ['Polymorph', 'Ring of Frost'],
    hasHeroism: true,
  },
  fire: {
    name: 'Fire',
    className: 'Mage',
    role: 'dps',
    color: '#69CCF0',
    buffs: ['Arcane Intellect', 'Time Warp'],
    interrupts: ['Counterspell'],
    crowdControl: ['Polymorph', 'Dragon\'s Breath'],
    hasHeroism: true,
  },
  'frost-mage': {
    name: 'Frost',
    className: 'Mage',
    role: 'dps',
    color: '#69CCF0',
    buffs: ['Arcane Intellect', 'Time Warp'],
    interrupts: ['Counterspell'],
    crowdControl: ['Polymorph', 'Ring of Frost'],
    hasHeroism: true,
  },
  brewmaster: {
    name: 'Brewmaster',
    className: 'Monk',
    role: 'tank',
    color: '#00FF96',
    buffs: ['Mystic Touch'],
    interrupts: ['Spear Hand Strike'],
    crowdControl: ['Leg Sweep', 'Paralysis'],
  },
  mistweaver: {
    name: 'Mistweaver',
    className: 'Monk',
    role: 'healer',
    color: '#00FF96',
    buffs: ['Mystic Touch'],
    interrupts: ['Spear Hand Strike'],
    crowdControl: ['Leg Sweep', 'Paralysis'],
  },
  windwalker: {
    name: 'Windwalker',
    className: 'Monk',
    role: 'dps',
    color: '#00FF96',
    buffs: ['Mystic Touch'],
    interrupts: ['Spear Hand Strike'],
    crowdControl: ['Leg Sweep', 'Paralysis'],
  },
  'holy-paladin': {
    name: 'Holy',
    className: 'Paladin',
    role: 'healer',
    color: '#F58CBA',
    buffs: ['Blessing of Kings', 'Devotion Aura'],
    interrupts: [],
    crowdControl: ['Hammer of Justice', 'Blinding Light'],
  },
  'protection-paladin': {
    name: 'Protection',
    className: 'Paladin',
    role: 'tank',
    color: '#F58CBA',
    buffs: ['Blessing of Kings', 'Devotion Aura'],
    interrupts: ['Rebuke'],
    crowdControl: ['Hammer of Justice', 'Blinding Light'],
  },
  retribution: {
    name: 'Retribution',
    className: 'Paladin',
    role: 'dps',
    color: '#F58CBA',
    buffs: ['Blessing of Kings', 'Devotion Aura'],
    interrupts: ['Rebuke'],
    crowdControl: ['Hammer of Justice', 'Blinding Light'],
  },
  discipline: {
    name: 'Discipline',
    className: 'Priest',
    role: 'healer',
    color: '#FFFFFF',
    buffs: ['Power Word: Fortitude', 'Power Infusion'],
    interrupts: [],
    crowdControl: ['Psychic Scream', 'Mind Control'],
  },
  'holy-priest': {
    name: 'Holy',
    className: 'Priest',
    role: 'healer',
    color: '#FFFFFF',
    buffs: ['Power Word: Fortitude'],
    interrupts: [],
    crowdControl: ['Psychic Scream', 'Mind Control'],
  },
  shadow: {
    name: 'Shadow',
    className: 'Priest',
    role: 'dps',
    color: '#FFFFFF',
    buffs: ['Power Word: Fortitude', 'Power Infusion'],
    interrupts: ['Silence'],
    crowdControl: ['Psychic Scream', 'Mind Control'],
  },
  assassination: {
    name: 'Assassination',
    className: 'Rogue',
    role: 'dps',
    color: '#FFF569',
    buffs: ['Tricks of the Trade'],
    interrupts: ['Kick'],
    crowdControl: ['Blind', 'Gouge', 'Kidney Shot'],
  },
  outlaw: {
    name: 'Outlaw',
    className: 'Rogue',
    role: 'dps',
    color: '#FFF569',
    buffs: ['Tricks of the Trade'],
    interrupts: ['Kick'],
    crowdControl: ['Blind', 'Gouge', 'Between the Eyes'],
  },
  subtlety: {
    name: 'Subtlety',
    className: 'Rogue',
    role: 'dps',
    color: '#FFF569',
    buffs: ['Tricks of the Trade'],
    interrupts: ['Kick'],
    crowdControl: ['Blind', 'Gouge', 'Kidney Shot'],
  },
  elemental: {
    name: 'Elemental',
    className: 'Shaman',
    role: 'dps',
    color: '#0070DE',
    buffs: ['Bloodlust', 'Wind Rush Totem'],
    interrupts: ['Wind Shear'],
    crowdControl: ['Hex', 'Capacitor Totem'],
    hasHeroism: true,
  },
  enhancement: {
    name: 'Enhancement',
    className: 'Shaman',
    role: 'dps',
    color: '#0070DE',
    buffs: ['Bloodlust', 'Wind Rush Totem'],
    interrupts: ['Wind Shear'],
    crowdControl: ['Hex', 'Capacitor Totem'],
    hasHeroism: true,
  },
  'restoration-shaman': {
    name: 'Restoration',
    className: 'Shaman',
    role: 'healer',
    color: '#0070DE',
    buffs: ['Bloodlust', 'Wind Rush Totem'],
    interrupts: ['Wind Shear'],
    crowdControl: ['Hex', 'Capacitor Totem'],
    hasHeroism: true,
  },
  affliction: {
    name: 'Affliction',
    className: 'Warlock',
    role: 'dps',
    color: '#9482C9',
    buffs: ['Soulstone', 'Gateway'],
    interrupts: ['Spell Lock'],
    crowdControl: ['Fear', 'Banish'],
  },
  demonology: {
    name: 'Demonology',
    className: 'Warlock',
    role: 'dps',
    color: '#9482C9',
    buffs: ['Soulstone', 'Gateway'],
    interrupts: ['Axe Toss', 'Spell Lock'],
    crowdControl: ['Fear', 'Banish'],
  },
  destruction: {
    name: 'Destruction',
    className: 'Warlock',
    role: 'dps',
    color: '#9482C9',
    buffs: ['Soulstone', 'Gateway'],
    interrupts: ['Spell Lock'],
    crowdControl: ['Fear', 'Banish', 'Shadowfury'],
  },
  arms: {
    name: 'Arms',
    className: 'Warrior',
    role: 'dps',
    color: '#C79C6E',
    buffs: ['Battle Shout', 'Rallying Cry'],
    interrupts: ['Pummel'],
    crowdControl: ['Storm Bolt', 'Intimidating Shout'],
  },
  fury: {
    name: 'Fury',
    className: 'Warrior',
    role: 'dps',
    color: '#C79C6E',
    buffs: ['Battle Shout', 'Rallying Cry'],
    interrupts: ['Pummel'],
    crowdControl: ['Storm Bolt', 'Intimidating Shout'],
  },
  'protection-warrior': {
    name: 'Protection',
    className: 'Warrior',
    role: 'tank',
    color: '#C79C6E',
    buffs: ['Battle Shout', 'Rallying Cry'],
    interrupts: ['Pummel'],
    crowdControl: ['Storm Bolt', 'Intimidating Shout'],
  },
}

export async function fetchWowSpecData(slug: WowSpecSlug): Promise<WowSpecData> {
  const iconName = specIconMap[slug]
  const iconUrl = `/api/wow-icons/${iconName}.jpg`

  const response = await fetch(iconUrl, { method: 'HEAD' })
  if (!response.ok) {
    throw new Error(`Failed to fetch icon for ${slug}`)
  }

  const specInfo = specDataMap[slug]
  return {
    slug,
    iconUrl,
    ...specInfo,
  }
}
