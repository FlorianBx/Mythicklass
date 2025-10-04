<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { fetchWowAffixes, type AffixResponse } from '../composables/useWowAffixes'
import Card from 'primevue/card'
import Skeleton from 'primevue/skeleton'

const affixes = ref<AffixResponse | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)

onMounted(async () => {
  try {
    affixes.value = await fetchWowAffixes()
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Failed to load affixes'
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="affix-container">
    <div v-if="loading" class="affix-content">
      <Skeleton width="16rem" height="2.5rem" class="skeleton-title" />

      <div class="affix-list">
        <Card v-for="i in 3" :key="i" class="affix-card skeleton-card">
          <template #content>
            <div class="skeleton-content">
              <Skeleton shape="circle" size="4.5rem" class="skeleton-icon" />
              <div class="skeleton-text">
                <Skeleton width="10rem" height="1.25rem" class="skeleton-name" />
                <Skeleton width="100%" height="4rem" class="skeleton-description" />
              </div>
            </div>
          </template>
        </Card>
      </div>
    </div>

    <div v-else-if="error" class="error">{{ error }}</div>

    <div v-else-if="affixes" class="affix-content">
      <h2 class="affix-title">{{ affixes.title }}</h2>

      <div class="affix-list">
        <Card v-for="affix in affixes.affix_details" :key="affix.id" class="affix-card">
          <template #content>
            <div class="card-content">
              <img :src="affix.icon_url" :alt="affix.name" class="affix-icon" />
              <div class="affix-info">
                <h3 class="affix-name">{{ affix.name }}</h3>
                <p class="affix-description">{{ affix.description }}</p>
              </div>
            </div>
          </template>
        </Card>
      </div>
    </div>
  </div>
</template>

<style scoped>
.affix-container {
  padding: 2rem 1rem;
  max-width: 1200px;
  margin: 0 auto;
}

.affix-content {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}

.error {
  text-align: center;
  padding: 3rem;
  font-size: var(--font-body-large);
  color: var(--p-error-color);
  font-weight: 500;
}

.skeleton-title {
  margin: 0 auto 0.5rem;
}

.affix-title {
  text-align: center;
  font-size: var(--font-subtitle);
  font-weight: 700;
  margin: 0;
  color: var(--p-text-color);
  letter-spacing: 0.02em;
  text-transform: uppercase;
  opacity: 0.9;
}

.affix-list {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
}

.affix-card {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}

.card-content,
.skeleton-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  text-align: center;
  padding: 1rem 0.25rem;
}

.affix-icon,
.skeleton-icon {
  width: 72px;
  height: 72px;
  border-radius: 12px;
  flex-shrink: 0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.affix-info,
.skeleton-text {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: 100%;
}

.affix-name {
  margin: 0;
  font-size: var(--font-body-large);
  font-weight: 600;
  color: var(--p-primary-color);
  letter-spacing: 0.01em;
}

.affix-description {
  margin: 0;
  font-size: var(--font-body-small);
  color: var(--p-text-secondary-color);
  line-height: 1.6;
  font-weight: 400;
}

.skeleton-card {
  pointer-events: none;
}

.skeleton-name {
  margin: 0 auto;
}

.skeleton-description {
  margin-top: 0.25rem;
}
</style>
