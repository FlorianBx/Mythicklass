<script setup lang="ts">
import ThemeSwitcher from '@/components/ThemeSwitcher.vue'
</script>

<template>
  <div class="theme-switcher-container">
    <ThemeSwitcher />
  </div>
  <router-view />
</template>

<style>
.theme-switcher-container {
  position: fixed;
  top: 1rem;
  right: 1rem;
  z-index: 1000;
}
</style>
