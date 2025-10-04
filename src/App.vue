<script setup lang="ts">
import ThemeSwitcher from '@/components/ThemeSwitcher.vue'
</script>

<template>
  <header class="app-header">
      <h1 class="title"><span class="title-action">Mythic</span>Klass</h1>
      <ThemeSwitcher class="theme-switcher-container" />
  </header>
  <router-view />
</template>

<style scoped>
.app-header {
  position: relative;
  width: 100%;
  height: 3.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 500;
}

.title {
  font-size: var(--font-title);
  font-weight: 700;
  letter-spacing: .1em !important;
  text-transform: uppercase;
  margin: 0;
  padding: 0;
}

.title-action {
  color: var(--p-info-color);
}
</style>
