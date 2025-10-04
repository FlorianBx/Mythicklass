<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import Button from 'primevue/button';

const route = useRoute()
const router = useRouter()
const classSlug = route.params.classSlug as string

function goBack() {
  router.push({ name: 'home' })
}
</script>
<template>
  <p>ClassDetailPage {{ classSlug }}</p>
  <Button @click="goBack" label="Back to Classes" icon="pi pi-arrow-left" class="p-button-text" />
</template>

<style scoped>
Button {
  font-family: 'Roboto', sans-serif;
}
</style>
