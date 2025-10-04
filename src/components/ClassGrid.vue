<script setup lang="ts">
import type { WowClassData } from '../composables/useWowClass'

defineProps<{
  classes: WowClassData[]
  loading?: boolean
}>()
</script>

<template>
  <div v-if="loading" class="loading">Loading classes...</div>

  <div v-else class="class-grid">
    <div v-for="wowClass in classes" :key="wowClass.slug" class="class-card">
      <img :src="wowClass.iconUrl" :alt="wowClass.name" class="class-icon" />
      <h3 :style="{ color: wowClass.color }">{{ wowClass.name }}</h3>
    </div>
  </div>
</template>

<style scoped>
.loading {
  text-align: center;
  padding: 2rem;
  font-size: 1.2rem;
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
