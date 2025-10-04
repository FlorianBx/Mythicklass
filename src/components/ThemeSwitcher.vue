<script setup lang="ts">
import { ref, computed } from 'vue'
import { useTheme, type ThemeMode } from '@/composables/useTheme'
import Button from 'primevue/button'
import Menu from 'primevue/menu'

const { themeMode } = useTheme()
const menu = ref()

const themeIcons: Record<ThemeMode, string> = {
  light: 'pi pi-sun',
  dark: 'pi pi-moon',
  system: 'pi pi-microchip',
}

const themeLabels: Record<ThemeMode, string> = {
  light: 'Light',
  dark: 'Dark',
  system: 'System',
}

const currentIcon = computed(() => themeIcons[themeMode.value])

const menuItems = computed(() => {
  const allModes: ThemeMode[] = ['light', 'dark', 'system']
  return allModes
    .map((mode) => ({
      label: themeLabels[mode],
      icon: themeIcons[mode],
      command: () => {
        themeMode.value = mode
      },
    }))
})

const toggle = (event: Event) => {
  menu.value.toggle(event)
}
</script>

<template>
  <div>
    <Button
      type="button"
      :icon="currentIcon"
      @click="toggle"
      aria-haspopup="true"
      aria-controls="theme_menu"
      text
      rounded
    />
    <Menu ref="menu" id="theme_menu" :model="menuItems" :popup="true" />
  </div>
</template>

<style scoped>
:deep(.p-button) {
  width: 2.5rem;
  height: 2.5rem;
}

:deep(.p-button .pi) {
  color: var(--p-info-color);
}
</style>
