<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { VueDraggable } from 'vue-draggable-plus'
import Card from 'primevue/card'
import Skeleton from 'primevue/skeleton'
import Button from 'primevue/button'
import { WOW_SPEC_SLUGS, fetchWowSpecData, type WowSpecData } from '@/composables/useWowSpec'
import { useSpecComposition } from '@/composables/useSpecComposition'

const availableSpecs = ref<WowSpecData[]>([])
const loading = ref(true)

const { groupSlots, stats, clearGroup } = useSpecComposition()

const CACHE_KEY = 'wow-specs-cache'
const ONE_WEEK_MS = 7 * 24 * 60 * 60 * 1000

const cloneSpec = (original: WowSpecData) => {
  return { ...original }
}

const checkSlotMove = (evt: any) => {
  return evt.to && evt.relatedContext.list.length < 1
}

onMounted(async () => {
  try {
    const cached = localStorage.getItem(CACHE_KEY)

    if (cached) {
      const { data, timestamp } = JSON.parse(cached)

      if (Date.now() - timestamp < ONE_WEEK_MS) {
        availableSpecs.value = data
        loading.value = false
        return
      }
    }

    const results = await Promise.all(WOW_SPEC_SLUGS.map((slug) => fetchWowSpecData(slug)))
    availableSpecs.value = results

    localStorage.setItem(
      CACHE_KEY,
      JSON.stringify({
        data: results,
        timestamp: Date.now(),
      }),
    )
  } catch {
    availableSpecs.value = []
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="composer-container">
    <div v-if="loading" class="composer-content">
      <Skeleton width="16rem" height="2.5rem" class="skeleton-title" />

      <div class="composer-layout">
        <div class="left-section">
          <div class="drop-zone">
            <Card v-for="i in 5" :key="i" class="slot-card skeleton-card">
              <template #content>
                <div class="skeleton-slot-content">
                  <Skeleton shape="circle" size="4rem" />
                  <Skeleton width="6rem" height="1rem" />
                </div>
              </template>
            </Card>
          </div>

          <Card class="stats-card skeleton-card">
            <template #content>
              <Skeleton width="10rem" height="1.5rem" class="mb-4" />
              <Skeleton width="100%" height="1rem" class="mb-2" />
              <Skeleton width="100%" height="1rem" class="mb-2" />
              <Skeleton width="100%" height="1rem" />
            </template>
          </Card>
        </div>

        <div class="right-section">
          <Skeleton width="12rem" height="2rem" class="mb-4" />
          <div class="specs-list">
            <Card v-for="i in 36" :key="i" class="spec-card skeleton-card">
              <template #content>
                <div class="skeleton-spec-content">
                  <Skeleton shape="circle" size="3.5rem" />
                  <Skeleton width="5rem" height="0.9rem" />
                </div>
              </template>
            </Card>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="composer-content">
      <div class="composer-layout">
        <div class="left-section">
          <div class="group-header">
            <h2 class="section-title">Your Group</h2>
            <Button label="Clear" severity="danger" @click="clearGroup" size="small" />
          </div>

          <div class="drop-zone">
            <VueDraggable
              v-for="(slot, index) in groupSlots"
              :key="index"
              v-model="groupSlots[index]"
              :animation="200"
              :group="{ name: 'specs' }"
              @move="checkSlotMove"
              class="slot-draggable"
            >
              <Card class="slot-card" :class="{ filled: slot.length > 0 }">
                <template #content>
                  <div class="slot-content">
                    <template v-if="slot.length > 0">
                      <img :src="slot[0]?.iconUrl" :alt="slot[0]?.name" class="slot-icon" />
                      <span :style="{ color: slot[0]?.color }" class="slot-name">
                        {{ slot[0]?.name }} {{ slot[0]?.className }}
                      </span>
                    </template>
                    <span v-else class="slot-placeholder">Drop spec here</span>
                  </div>
                </template>
              </Card>
            </VueDraggable>
          </div>

          <Card class="stats-card">
            <template #content>
              <h3 class="stats-title">Group Stats</h3>

              <div class="stat-row">
                <span class="stat-label">Composition</span>
                <span class="stat-value composition">
                  {{ stats.tanks }}T / {{ stats.healers }}H / {{ stats.dps }}D
                </span>
              </div>

              <div class="stat-row">
                <span class="stat-label">Interrupts</span>
                <span class="stat-value">{{ stats.totalInterrupts }}</span>
              </div>

              <div class="stat-row">
                <span class="stat-label">Crowd Control</span>
                <span class="stat-value">{{ stats.totalCrowdControl }}</span>
              </div>

              <div class="stat-row">
                <span class="stat-label">Heroism/Bloodlust</span>
                <span class="stat-value" :class="{ success: stats.hasHeroism, error: !stats.hasHeroism }">
                  {{ stats.hasHeroism ? 'Yes' : 'No' }}
                </span>
              </div>

              <div v-if="stats.buffs.length > 0" class="buffs-section">
                <span class="stat-label">Buffs</span>
                <div class="buffs-list">
                  <span v-for="buff in stats.buffs" :key="buff" class="buff-tag">{{ buff }}</span>
                </div>
              </div>
            </template>
          </Card>
        </div>

        <div class="right-section">
          <h2 class="section-title">Available Specializations</h2>
          <VueDraggable
            v-model="availableSpecs"
            :animation="200"
            :clone="cloneSpec"
            :sort="false"
            :group="{ name: 'specs', pull: 'clone', put: false }"
            class="specs-list"
          >
            <Card
              v-for="spec in availableSpecs"
              :key="spec.slug"
              class="spec-card"
            >
              <template #content>
                <div class="spec-content">
                  <img :src="spec.iconUrl" :alt="spec.name" class="spec-icon" />
                  <div class="spec-info">
                    <span :style="{ color: spec.color }" class="spec-name">{{ spec.name }}</span>
                    <span class="spec-class">{{ spec.className }}</span>
                  </div>
                </div>
              </template>
            </Card>
          </VueDraggable>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.composer-container {
  padding: 2rem 1rem;
  max-width: 1400px;
  margin: 0 auto;
}

.composer-content {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}

.skeleton-title {
  margin: 0 auto 0.5rem;
}

.composer-layout {
  display: flex;
  gap: 2.5rem;
}

.left-section {
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.right-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-height: calc(100vh - 200px);
  overflow-y: auto;
}

.group-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.section-title {
  margin: 0;
  font-size: var(--font-subtitle);
  font-weight: 700;
  color: var(--p-text-color);
  letter-spacing: 0.02em;
  text-transform: uppercase;
  opacity: 0.9;
}

.drop-zone {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1.5rem;
}

.slot-draggable {
  cursor: grab;
}

.slot-draggable:active {
  cursor: grabbing;
}

.slot-card {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  border: 2px dashed transparent;
}

.slot-card.filled {
  border-color: var(--p-primary-color);
  border-style: solid;
}

.slot-content,
.skeleton-slot-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  text-align: center;
  padding: 1rem 0.5rem;
  min-height: 120px;
  justify-content: center;
}

.slot-icon {
  width: 64px;
  height: 64px;
  border-radius: 12px;
  flex-shrink: 0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.slot-name {
  font-size: var(--font-body-large);
  font-weight: 600;
  letter-spacing: 0.01em;
  text-align: center;
}

.slot-placeholder {
  color: var(--p-text-secondary-color);
  font-size: var(--font-body-small);
  text-align: center;
  font-weight: 400;
  opacity: 0.7;
}

.stats-card {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.stats-title {
  margin: 0 0 1.5rem 0;
  font-size: var(--font-body-large);
  font-weight: 600;
  color: var(--p-text-color);
  letter-spacing: 0.01em;
}

.stat-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
  border-bottom: 1px solid var(--p-surface-border);
}

.stat-row:last-child {
  border-bottom: none;
}

.stat-label {
  font-weight: 500;
  color: var(--p-text-secondary-color);
  font-size: var(--font-body-small);
  letter-spacing: 0.01em;
}

.stat-value {
  font-weight: 600;
  font-size: 1.1rem;
  color: var(--p-text-color);
}

.stat-value.composition {
  font-family: monospace;
}

.stat-value.success {
  color: var(--p-green-500);
}

.stat-value.error {
  color: var(--p-red-500);
}

.buffs-section {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--p-surface-border);
}

.buffs-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.75rem;
}

.buff-tag {
  padding: 0.35rem 0.85rem;
  background: var(--p-primary-color);
  color: var(--p-primary-contrast-color);
  border-radius: 12px;
  font-size: var(--font-body-small);
  font-weight: 500;
  letter-spacing: 0.01em;
}

.specs-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.spec-card {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  cursor: grab;
}

.spec-card:active {
  cursor: grabbing;
}

.spec-content,
.skeleton-spec-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  text-align: center;
  padding: 0.75rem 0.5rem;
}

.spec-icon {
  width: 56px;
  height: 56px;
  border-radius: 12px;
  flex-shrink: 0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.spec-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.spec-name {
  font-size: var(--font-body-large);
  font-weight: 600;
  text-align: center;
  letter-spacing: 0.01em;
}

.spec-class {
  font-size: var(--font-body-small);
  color: var(--p-text-secondary-color);
  text-align: center;
}

.skeleton-card {
  pointer-events: none;
}
</style>
