<script setup lang="ts">
import Device from './Device.vue'
import type { ProjectItem } from '@/data/projects'

defineProps<{ project: ProjectItem }>()
</script>

<template>
  <Device as="article" class="blank" :aria-label="`${project.name}, write-up not installed yet`">
    <div class="row">
      <div class="vent grille" aria-hidden="true" />
      <div class="copy">
        <p class="silk">Reserved for {{ project.name }}</p>
        <p class="dim">{{ project.name }}: {{ project.description }}</p>
        <p>
          The write-up isn't installed yet.
          <a v-if="project.github" :href="project.github" target="_blank" rel="noopener" class="text-link">Read the source on GitHub</a>
        </p>
      </div>
      <div class="vent grille" aria-hidden="true" />
    </div>
  </Device>
</template>

<style scoped>
.row {
  display: grid;
  grid-template-columns: 1fr minmax(0, 34rem) 1fr;
  gap: 1.5rem;
  align-items: stretch;
}
.grille {
  min-height: 4rem;
  opacity: 0.8;
}
.copy {
  display: grid;
  gap: 0.35rem;
  font-size: 0.92rem;
}
@media (max-width: 760px) {
  .row {
    grid-template-columns: 1fr;
  }
  .grille {
    display: none;
  }
}
</style>
