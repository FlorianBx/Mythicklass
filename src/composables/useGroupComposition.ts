import { ref, computed } from 'vue'
import type { WowClassData } from './useWowClass'

export interface GroupStats {
  totalInterrupts: number
  totalCrowdControl: number
  hasHeroism: boolean
  buffs: string[]
  interruptsList: string[]
  crowdControlList: string[]
}

const MAX_GROUP_SIZE = 5

const groupSlots = ref<Array<WowClassData[]>>(
  Array.from({ length: MAX_GROUP_SIZE }, () => [])
)

export function useGroupComposition() {
  const addClass = (wowClass: WowClassData, slotIndex: number) => {
    if (slotIndex >= 0 && slotIndex < MAX_GROUP_SIZE) {
      groupSlots.value[slotIndex] = [wowClass]
    }
  }

  const removeClass = (slotIndex: number) => {
    if (slotIndex >= 0 && slotIndex < MAX_GROUP_SIZE) {
      groupSlots.value[slotIndex] = []
    }
  }

  const clearGroup = () => {
    groupSlots.value = Array.from({ length: MAX_GROUP_SIZE }, () => [])
  }

  const stats = computed<GroupStats>(() => {
    const classes = groupSlots.value.flat()

    const interruptsList = classes.flatMap((c) => c.interrupts || [])
    const crowdControlList = classes.flatMap((c) => c.crowdControl || [])
    const buffs = [...new Set(classes.flatMap((c) => c.buffs || []))]

    return {
      totalInterrupts: interruptsList.length,
      totalCrowdControl: crowdControlList.length,
      hasHeroism: classes.some((c) => c.hasHeroism),
      buffs,
      interruptsList,
      crowdControlList,
    }
  })

  return {
    groupSlots,
    stats,
    addClass,
    removeClass,
    clearGroup,
  }
}
