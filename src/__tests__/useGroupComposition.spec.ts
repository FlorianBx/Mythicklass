import { describe, it, expect, beforeEach } from 'vitest'
import { useGroupComposition } from '@/composables/useGroupComposition'
import type { WowClassData } from '@/composables/useWowClass'

const createMockClass = (
  overrides: Partial<WowClassData> = {},
): WowClassData => ({
  slug: 'warrior',
  name: 'Warrior',
  iconUrl: '/icon.jpg',
  color: '#C79C6E',
  buffs: [],
  interrupts: [],
  crowdControl: [],
  hasHeroism: false,
  ...overrides,
})

describe('useGroupComposition', () => {
  let composition: ReturnType<typeof useGroupComposition>

  beforeEach(() => {
    composition = useGroupComposition()
    composition.clearGroup()
  })

  describe('addClass', () => {
    it('adds a class to the specified slot', () => {
      const warrior = createMockClass()
      composition.addClass(warrior, 0)

      expect(composition.groupSlots.value[0]).toEqual([warrior])
    })

    it('replaces existing class in slot', () => {
      const warrior = createMockClass()
      const mage = createMockClass({ slug: 'mage', name: 'Mage' })

      composition.addClass(warrior, 0)
      composition.addClass(mage, 0)

      expect(composition.groupSlots.value[0]).toEqual([mage])
    })

    it('does not add class to invalid slot index', () => {
      const warrior = createMockClass()
      composition.addClass(warrior, 10)

      expect(composition.groupSlots.value.every((slot) => slot.length === 0)).toBe(true)
    })
  })

  describe('removeClass', () => {
    it('removes a class from the specified slot', () => {
      const warrior = createMockClass()
      composition.addClass(warrior, 0)
      composition.removeClass(0)

      expect(composition.groupSlots.value[0]).toEqual([])
    })

    it('does not error on removing from empty slot', () => {
      expect(() => composition.removeClass(0)).not.toThrow()
      expect(composition.groupSlots.value[0]).toEqual([])
    })

    it('does not remove from invalid slot index', () => {
      const warrior = createMockClass()
      composition.addClass(warrior, 0)
      composition.removeClass(10)

      expect(composition.groupSlots.value[0]).toEqual([warrior])
    })
  })

  describe('clearGroup', () => {
    it('clears all slots', () => {
      const warrior = createMockClass()
      const mage = createMockClass({ slug: 'mage', name: 'Mage' })

      composition.addClass(warrior, 0)
      composition.addClass(mage, 1)
      composition.clearGroup()

      expect(composition.groupSlots.value.every((slot) => slot.length === 0)).toBe(true)
    })
  })

  describe('stats', () => {
    it('calculates zero stats for empty group', () => {
      expect(composition.stats.value).toEqual({
        totalInterrupts: 0,
        totalCrowdControl: 0,
        hasHeroism: false,
        buffs: [],
        interruptsList: [],
        crowdControlList: [],
      })
    })

    it('calculates total interrupts correctly', () => {
      const warrior = createMockClass({ interrupts: ['Pummel'] })
      const mage = createMockClass({
        slug: 'mage',
        name: 'Mage',
        interrupts: ['Counterspell'],
      })

      composition.addClass(warrior, 0)
      composition.addClass(mage, 1)

      expect(composition.stats.value.totalInterrupts).toBe(2)
      expect(composition.stats.value.interruptsList).toEqual(['Pummel', 'Counterspell'])
    })

    it('calculates total crowd control correctly', () => {
      const warrior = createMockClass({
        crowdControl: ['Storm Bolt', 'Intimidating Shout'],
      })
      const mage = createMockClass({
        slug: 'mage',
        name: 'Mage',
        crowdControl: ['Polymorph'],
      })

      composition.addClass(warrior, 0)
      composition.addClass(mage, 1)

      expect(composition.stats.value.totalCrowdControl).toBe(3)
      expect(composition.stats.value.crowdControlList).toEqual([
        'Storm Bolt',
        'Intimidating Shout',
        'Polymorph',
      ])
    })

    it('detects heroism presence', () => {
      const warrior = createMockClass()
      const mage = createMockClass({
        slug: 'mage',
        name: 'Mage',
        hasHeroism: true,
      })

      composition.addClass(warrior, 0)
      expect(composition.stats.value.hasHeroism).toBe(false)

      composition.addClass(mage, 1)
      expect(composition.stats.value.hasHeroism).toBe(true)
    })

    it('deduplicates buffs', () => {
      const warrior1 = createMockClass({ buffs: ['Battle Shout', 'Commanding Shout'] })
      const warrior2 = createMockClass({
        slug: 'warrior',
        name: 'Warrior',
        buffs: ['Battle Shout'],
      })

      composition.addClass(warrior1, 0)
      composition.addClass(warrior2, 1)

      expect(composition.stats.value.buffs).toEqual(['Battle Shout', 'Commanding Shout'])
    })

    it('handles classes with no abilities', () => {
      const emptyClass = createMockClass({
        buffs: undefined,
        interrupts: undefined,
        crowdControl: undefined,
      })

      composition.addClass(emptyClass, 0)

      expect(composition.stats.value.totalInterrupts).toBe(0)
      expect(composition.stats.value.totalCrowdControl).toBe(0)
      expect(composition.stats.value.buffs).toEqual([])
    })

    it('calculates complex group composition correctly', () => {
      const warrior = createMockClass({
        buffs: ['Battle Shout'],
        interrupts: ['Pummel'],
        crowdControl: ['Storm Bolt'],
      })

      const mage = createMockClass({
        slug: 'mage',
        name: 'Mage',
        buffs: ['Arcane Intellect'],
        interrupts: ['Counterspell'],
        crowdControl: ['Polymorph'],
        hasHeroism: true,
      })

      const shaman = createMockClass({
        slug: 'shaman',
        name: 'Shaman',
        buffs: ['Bloodlust'],
        interrupts: ['Wind Shear'],
        crowdControl: ['Hex'],
        hasHeroism: true,
      })

      composition.addClass(warrior, 0)
      composition.addClass(mage, 1)
      composition.addClass(shaman, 2)

      expect(composition.stats.value).toEqual({
        totalInterrupts: 3,
        totalCrowdControl: 3,
        hasHeroism: true,
        buffs: ['Battle Shout', 'Arcane Intellect', 'Bloodlust'],
        interruptsList: ['Pummel', 'Counterspell', 'Wind Shear'],
        crowdControlList: ['Storm Bolt', 'Polymorph', 'Hex'],
      })
    })
  })
})
