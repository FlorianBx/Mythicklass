<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import AffixDisplay from '@/components/AffixDisplay.vue'
import { WOW_CLASS_SLUGS, fetchWowClassData, type WowClassData } from '@/composables/useWowClass'

const router = useRouter()
const classes = ref<WowClassData[]>([])
const loading = ref(true)
const error = ref(false)

const CACHE_KEY = 'wow-classes-cache'
const ONE_WEEK_MS = 7 * 24 * 60 * 60 * 1000

onMounted(async () => {
  try {
    const cached = localStorage.getItem(CACHE_KEY)

    if (cached) {
      const { data, timestamp } = JSON.parse(cached)

      if (Date.now() - timestamp < ONE_WEEK_MS) {
        classes.value = data
        loading.value = false
        return
      }
    }

    const results = await Promise.all(WOW_CLASS_SLUGS.map((slug) => fetchWowClassData(slug)))
    classes.value = results

    localStorage.setItem(
      CACHE_KEY,
      JSON.stringify({
        data: results,
        timestamp: Date.now(),
      }),
    )
  } catch {
    error.value = true
  } finally {
    loading.value = false
  }
})

const navigateToClass = (slug: string) => {
  router.push({ name: 'class-detail', params: { classSlug: slug } })
}
</script>

<template>
  <div class="container">
    <AffixDisplay />
    <h1>World of Warcraft Classes</h1>

    <div v-if="loading" class="loading">Loading classes...</div>

    <div v-else-if="error" class="error">Failed to load classes</div>

    <div v-else class="class-grid">
      <div
        v-for="wowClass in classes"
        :key="wowClass.slug"
        class="class-card"
        @click="navigateToClass(wowClass.slug)"
      >
        <img :src="wowClass.iconUrl" :alt="wowClass.name" class="class-icon" />
        <h3 :style="{ color: wowClass.color }">{{ wowClass.name }}</h3>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

h1 {
  text-align: center;
  margin-bottom: 2rem;
  font-size: var(--font-title);
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

.class-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 2rem;
  padding: 1rem;
}

.class-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border-radius: 8px;
  background: var(--p-surface-100);
  transition: transform 0.2s;
  cursor: pointer;
}

.class-card:hover {
  transform: translateY(-4px);
  background: var(--p-surface-200);
}

.class-icon {
  width: 56px;
  height: 56px;
  border-radius: 8px;
}

.class-card h3 {
  margin: 0;
  font-size: var(--font-body);
  font-weight: 600;
  text-align: center;
}
</style>
