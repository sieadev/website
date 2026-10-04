<script setup lang="ts">
import SignArrow from './SignArrow.vue'
import type { ProjectItem } from '@/data/projects'

/** A project as a platform direction sign: blue panel pointing to the write-up, details underneath. */
defineProps<{ project: ProjectItem; headingLevel?: 2 | 3; full?: boolean }>()
</script>

<template>
  <article class="dest" :class="{ full }">
    <RouterLink
      v-if="project.slug"
      :to="{ name: 'ProjectDetail', params: { slug: project.slug } }"
      class="sign panel"
    >
      <component :is="headingLevel === 2 ? 'h2' : 'h3'" class="name">{{ project.name }}</component>
      <SignArrow class="panel-arrow" />
    </RouterLink>
    <div v-else class="panel closed">
      <component :is="headingLevel === 2 ? 'h2' : 'h3'" class="name">{{ project.name }}</component>
      <span class="closed-note">No write-up yet</span>
    </div>

    <div class="body">
      <ul class="tags" aria-label="Tags">
        <li v-for="t in project.tags" :key="t" class="badge">{{ t }}</li>
      </ul>
      <p class="desc">{{ project.description }}</p>
      <p class="links">
        <a v-if="project.docs" :href="project.docs" target="_blank" rel="noopener" class="link">Docs</a>
        <a v-if="project.github" :href="project.github" target="_blank" rel="noopener" class="link">Source on GitHub</a>
      </p>
    </div>
  </article>
</template>

<style scoped>
.dest {
  display: flex;
  flex-direction: column;
  background: var(--surface);
  border-radius: var(--r);
  box-shadow: 0 0 0 1px var(--rule);
}
.panel {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.9rem 1.2rem 1rem;
  border-radius: var(--r) var(--r) 0 0;
  text-decoration: none;
}
.sign.panel {
  box-shadow: inset 0 0 0 3px var(--sign), inset 0 0 0 5px var(--sign-ink);
}
.name {
  font-family: var(--cond);
  font-weight: 700;
  font-size: clamp(1.7rem, 3vw, 2.2rem);
  line-height: 1;
}
.full .name {
  font-size: clamp(2rem, 4vw, 2.8rem);
}
.panel-arrow {
  width: 2rem;
  height: 2rem;
  transition: transform 160ms ease;
}
.sign.panel:hover .panel-arrow {
  transform: translateX(4px);
}
.closed {
  background: var(--surface-2);
  color: var(--ink);
  box-shadow: inset 0 0 0 3px var(--surface-2), inset 0 0 0 5px var(--ink-2);
}
.closed-note {
  font-family: var(--cond);
  font-weight: 600;
  color: var(--ink-2);
}
.body {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1.1rem 1.2rem 1.2rem;
  flex: 1;
}
.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}
.desc {
  color: var(--ink-2);
  max-width: 42rem;
}
.links {
  display: flex;
  gap: 1.25rem;
  margin-top: auto;
  font-weight: 500;
}
</style>
