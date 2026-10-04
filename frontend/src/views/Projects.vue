<script setup lang="ts">
import DestinationSign from '@/components/transit/DestinationSign.vue'
import { projects } from '@/data/projects'
import { profile } from '@/data/profile'
</script>

<template>
  <div class="wrap page">
    <header class="head">
      <h1 class="h-page">Projects</h1>
      <p class="lede">
        I publish most of what I build. The blue signs lead to a full write-up: why the project exists, how it's put together, and
        code you can copy.
      </p>
    </header>
    <div class="list">
      <DestinationSign v-for="p in projects" :key="p.name" :project="p" :heading-level="2" full />
    </div>
    <p class="more muted">
      Smaller tools, Minecraft plugins and experiments are on
      <a :href="profile.links.github.href" target="_blank" rel="noopener" class="link">github.com/sieadev</a>.
    </p>
  </div>
</template>

<style scoped>
.page {
  padding-top: clamp(2rem, 5vw, 3.5rem);
}
.head {
  display: grid;
  gap: 1rem;
  margin-bottom: 2.5rem;
}
.list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 30rem), 1fr));
  gap: 1.5rem;
}
.more {
  margin-top: 2.5rem;
}
</style>
