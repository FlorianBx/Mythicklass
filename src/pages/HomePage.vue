<script setup lang="ts">
import { useQuery } from '@pinia/colada'
import { WOW_CLASS_SLUGS, fetchWowClassData } from '@/composables/useWowClass'

const { state } = useQuery({
  key: ['wow-classes'],
  query: async () => {
    const results = await Promise.all(WOW_CLASS_SLUGS.map((slug) => fetchWowClassData(slug)))
    return results
  },
  staleTime: 1000 * 60 * 60,
})
</script>

<template>
  <div class="container">
    <h1>World of Warcraft Classes</h1>

    <div v-if="state.status === 'pending'" class="loading">Loading classes...</div>

    <div v-else-if="state.status === 'error'" class="error">Failed to load classes</div>

    <div v-else class="class-grid">
      <div v-for="wowClass in state.data" :key="wowClass.slug" class="class-card" @click="$router.push({ name: 'class-detail', params: { classSlug: wowClass.slug } })">
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
  font-size: 2.5rem;
}

.loading,
.error {
  text-align: center;
  padding: 2rem;
  font-size: 1.2rem;
}

.error {
  color: #ef4444;
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
  background: rgba(255, 255, 255, 0.05);
  transition: transform 0.2s;
}

.class-card:hover {
  transform: translateY(-4px);
  background: rgba(255, 255, 255, 0.1);
}

.class-icon {
  width: 56px;
  height: 56px;
  border-radius: 8px;
}

.class-card h3 {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
  text-align: center;
}
</style>
