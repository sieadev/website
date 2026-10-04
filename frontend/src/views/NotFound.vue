<script setup lang="ts">
import { useRoute } from 'vue-router'
import DymoLabel from '@/components/rack/DymoLabel.vue'
const route = useRoute()
</script>

<template>
  <section class="empty-slot" aria-labelledby="nf-title">
    <div class="slot">
      <DymoLabel size="md" :tilt="-1.5">Empty slot</DymoLabel>
      <h1 id="nf-title" class="title">Nothing is installed here.</h1>
      <p class="dim">
        There's no page at <code>{{ route.fullPath }}</code>. It may have moved, or the link has a typo.
      </p>
      <div class="actions">
        <RouterLink to="/" class="hw-btn hw-btn-primary">Go to the homepage</RouterLink>
        <RouterLink to="/projects" class="hw-btn">Browse projects</RouterLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
.empty-slot {
  padding: 0 var(--rail-w);
}
.slot {
  display: grid;
  gap: 1rem;
  justify-items: start;
  margin: calc(var(--u) * 2) 0;
  padding: clamp(1.5rem, 5vw, 3rem);
  border: 2px dashed var(--rail-edge);
  border-radius: 3px;
  background: repeating-linear-gradient(-45deg, transparent 0 14px, rgb(0 0 0 / 0.06) 14px 16px);
}
.title {
  font-family: var(--cond);
  font-weight: 700;
  font-size: clamp(2rem, 5vw, 3.2rem);
  line-height: 1.05;
}
code {
  padding: 0.1em 0.35em;
  border-radius: 3px;
  background: var(--inset);
  color: var(--silk);
  word-break: break-all;
}
.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
}
</style>
