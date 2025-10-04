<script setup lang="ts">
import AffixDisplay from '@/components/AffixDisplay.vue'
import GroupComposer from '@/components/GroupComposer.vue'
</script>

<template>
  <div class="container">
    <AffixDisplay />
    <h1>Mythic+ Group Composer</h1>
    <GroupComposer />
  </div>
</template>

<style scoped>
.container {
  max-width: 1600px;
  margin: 0 auto;
  padding: 2rem;
}

h1 {
  text-align: center;
  margin-bottom: 2rem;
  font-size: var(--font-title);
}
</style>
