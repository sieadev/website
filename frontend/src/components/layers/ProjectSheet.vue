<script setup lang="ts">
import type { ProjectItem } from '@/data/projects'

defineProps<{ project: ProjectItem; depth?: 0 | 1 | 2; large?: boolean }>()
</script>

<template>
  <article class="sheet project" :data-depth="depth ?? 1" :class="{ large }">
    <h3 class="name">
      <RouterLink v-if="project.slug" :to="{ name: 'ProjectDetail', params: { slug: project.slug } }" class="stretched">
        {{ project.name }}
      </RouterLink>
      <template v-else>{{ project.name }}</template>
    </h3>
    <p class="desc">{{ project.description }}</p>
    <ul class="tags" aria-label="Tags">
      <li v-for="t in project.tags" :key="t" class="chip">{{ t }}</li>
    </ul>
    <p class="links">
      <a v-if="project.docs" :href="project.docs" target="_blank" rel="noopener" class="link">Docs</a>
      <a v-if="project.github" :href="project.github" target="_blank" rel="noopener" class="link">Source</a>
      <span v-if="project.slug" class="read" aria-hidden="true">Read the write-up</span>
    </p>
  </article>
</template>

<style scoped>
.project {
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
  padding: 1.4rem 1.5rem 1.3rem;
  transition: transform 160ms ease;
}
.project:has(.stretched):hover {
  transform: translate(-2px, -2px);
}
.name {
  font-size: 1.6rem;
  font-variation-settings: 'wdth' 120;
  font-weight: 780;
  letter-spacing: -0.01em;
  line-height: 1.05;
}
.large .name {
  font-size: clamp(2rem, 4vw, 2.8rem);
}
.stretched {
  text-decoration: none;
}
.stretched::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: var(--radius);
}
.stretched:focus-visible {
  outline: none;
}
.stretched:focus-visible::after {
  outline: 2px solid var(--focus);
  outline-offset: 4px;
}
.desc {
  color: var(--ink-2);
  max-width: 40rem;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.large .desc {
  font-size: 1.05rem;
  -webkit-line-clamp: unset;
}
.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}
.links {
  margin-top: auto;
  display: flex;
  gap: 1.1rem;
  align-items: center;
  font-size: 0.92rem;
  font-weight: 550;
}
.links a {
  position: relative;
  z-index: 1;
}
.read {
  margin-left: auto;
  font-weight: 650;
  border-bottom: 2px solid var(--marigold);
}
</style>
