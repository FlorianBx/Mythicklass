import { ref, computed } from 'vue'
import type { WowSpecData } from './useWowSpec'

export interface SpecGroupStats {
  totalInterrupts: number
  totalCrowdControl: number
  hasHeroism: boolean
  buffs: string[]
  interruptsList: string[]
  crowdControlList: string[]
  tanks: number
  healers: number
  dps: number
}

const MAX_GROUP_SIZE = 5

const groupSlots = ref<Array<WowSpecData[]>>(
  Array.from({ length: MAX_GROUP_SIZE }, () => [])
)

export function useSpecComposition() {
  const addSpec = (spec: WowSpecData, slotIndex: number) => {
    if (slotIndex >= 0 && slotIndex < MAX_GROUP_SIZE) {
      groupSlots.value[slotIndex] = [spec]
    }
  }

  const removeSpec = (slotIndex: number) => {
    if (slotIndex >= 0 && slotIndex < MAX_GROUP_SIZE) {
      groupSlots.value[slotIndex] = []
    }
  }

  const clearGroup = () => {
    groupSlots.value = Array.from({ length: MAX_GROUP_SIZE }, () => [])
  }

  const stats = computed<SpecGroupStats>(() => {
    const specs = groupSlots.value.flat()

    const interruptsList = specs.flatMap((s) => s.interrupts || [])
    const crowdControlList = specs.flatMap((s) => s.crowdControl || [])
    const buffs = [...new Set(specs.flatMap((s) => s.buffs || []))]

    const tanks = specs.filter((s) => s.role === 'tank').length
    const healers = specs.filter((s) => s.role === 'healer').length
    const dps = specs.filter((s) => s.role === 'dps').length

    return {
      totalInterrupts: interruptsList.length,
      totalCrowdControl: crowdControlList.length,
      hasHeroism: specs.some((s) => s.hasHeroism),
      buffs,
      interruptsList,
      crowdControlList,
      tanks,
      healers,
      dps,
    }
  })

  return {
    groupSlots,
    stats,
    addSpec,
    removeSpec,
    clearGroup,
  }
}
