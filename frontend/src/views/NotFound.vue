<script setup lang="ts">
import { useRoute } from 'vue-router'
const route = useRoute()
</script>

<template>
  <div class="page">
    <section class="missing">
      <div class="empty" aria-hidden="true">
        <span class="display code">404</span>
      </div>
      <div class="copy">
        <h1 class="section-title">Nothing on this layer.</h1>
        <p class="lede">
          There's no page at <code>{{ route.fullPath }}</code>. It may have moved, or the link has a typo.
        </p>
        <div class="actions">
          <RouterLink to="/" class="btn btn-primary">Go to the homepage</RouterLink>
          <RouterLink to="/projects" class="btn">Browse projects</RouterLink>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.missing {
  display: grid;
  gap: 2.5rem;
  align-items: center;
  min-height: 70vh;
}
@media (min-width: 900px) {
  .missing {
    grid-template-columns: 22rem 1fr;
  }
}
.empty {
  aspect-ratio: 4 / 3;
  display: grid;
  place-items: center;
  border: 2px dashed var(--line);
  border-radius: var(--radius);
  box-shadow: var(--step) var(--step) 0 0 var(--slate-soft);
}
.code {
  font-size: 6rem;
  color: transparent;
  -webkit-text-stroke: 2px var(--slate);
}
.copy {
  display: grid;
  gap: 1rem;
}
code {
  padding: 0.1em 0.35em;
  background: var(--slate-soft);
  border-radius: 4px;
  font-size: 0.9em;
  word-break: break-all;
}
.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 0.5rem;
}
</style>
