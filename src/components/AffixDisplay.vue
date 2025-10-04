<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { fetchWowAffixes, type AffixResponse } from '../composables/useWowAffixes'

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
    <div v-if="loading" class="loading">Loading affixes...</div>

    <div v-else-if="error" class="error">{{ error }}</div>

    <div v-else-if="affixes" class="affix-content">
      <h2 class="affix-title">{{ affixes.title }}</h2>

      <div class="affix-list">
        <div v-for="affix in affixes.affix_details" :key="affix.id" class="affix-card">
          <img :src="affix.icon_url" :alt="affix.name" class="affix-icon" />
          <div class="affix-info">
            <h3 class="affix-name">{{ affix.name }}</h3>
            <p class="affix-description">{{ affix.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.affix-container {
  padding: 1rem;
}

.loading,
.error {
  text-align: center;
  padding: 2rem;
  font-size: var(--font-body-large);
}

.error {
  color: var(--p-error-color);
}

.affix-title {
  text-align: center;
  font-size: var(--font-subtitle);
  font-weight: 700;
  margin-bottom: 2rem;
  color: var(--p-text-color);
}

.affix-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 800px;
  margin: 0 auto;
}

.affix-card {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  border-radius: 8px;
  background: var(--p-surface-100);
  transition: background 0.2s;
}

.affix-card:hover {
  background: var(--p-surface-200);
}

.affix-icon {
  width: 48px;
  height: 48px;
  border-radius: 6px;
  flex-shrink: 0;
}

.affix-info {
  flex: 1;
}

.affix-name {
  margin: 0 0 0.5rem 0;
  font-size: var(--font-body);
  font-weight: 600;
  color: var(--p-accent-color);
}

.affix-description {
  margin: 0;
  font-size: var(--font-body-small);
  color: var(--p-text-secondary-color);
  line-height: 1.5;
}
</style>
