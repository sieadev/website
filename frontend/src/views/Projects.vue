<script setup lang="ts">
import { projects } from '@/data/projects'
import { profile } from '@/data/profile'

const written = projects.filter((p) => p.slug)
const unfinished = projects.filter((p) => !p.slug)
</script>

<template>
  <div class="page">
    <header class="head">
      <h1 class="section-title">Projects</h1>
      <p class="lede">
        I publish most of what I build. These are the projects with a full write-up: why I built them, how they're put together,
        and code you can copy.
      </p>
    </header>

    <ol class="stack">
      <li v-for="p in written" :key="p.name" class="sheet item" data-depth="1">
        <RouterLink :to="{ name: 'ProjectDetail', params: { slug: p.slug } }" class="plate" tabindex="-1" aria-hidden="true">
          <img :src="p.image" alt="" loading="lazy" />
        </RouterLink>
        <div class="body">
          <h2 class="title">
            <RouterLink :to="{ name: 'ProjectDetail', params: { slug: p.slug } }">{{ p.name }}</RouterLink>
          </h2>
          <p class="muted">{{ p.description }}</p>
          <ul class="tags" aria-label="Tags">
            <li v-for="t in p.tags" :key="t" class="chip">{{ t }}</li>
          </ul>
          <p class="links">
            <RouterLink :to="{ name: 'ProjectDetail', params: { slug: p.slug } }" class="link strong">Read the write-up</RouterLink>
            <a v-if="p.docs" :href="p.docs" target="_blank" rel="noopener" class="link">Docs</a>
            <a v-if="p.github" :href="p.github" target="_blank" rel="noopener" class="link">Source</a>
          </p>
        </div>
      </li>

      <li v-for="p in unfinished" :key="p.name" class="item empty">
        <div class="plate ghost" aria-hidden="true" />
        <div class="body">
          <h2 class="title">{{ p.name }}</h2>
          <p class="muted">{{ p.description }}</p>
          <p>
            The write-up for this one isn't done yet.
            <a v-if="p.github" :href="p.github" target="_blank" rel="noopener" class="link">Read the source on GitHub</a>
          </p>
        </div>
      </li>
    </ol>

    <p class="more">
      Smaller tools, plugins and experiments live on
      <a :href="profile.links.github.href" target="_blank" rel="noopener" class="link">github.com/sieadev</a>.
    </p>
  </div>
</template>

<style scoped>
.head {
  display: grid;
  gap: 1rem;
  padding: clamp(1rem, 4vw, 3rem) 0 clamp(2rem, 5vw, 3.5rem);
}
.head .section-title {
  font-size: clamp(2.75rem, 7vw, 5.5rem);
}
.stack {
  display: grid;
  gap: 2.25rem;
}
.item {
  display: grid;
  gap: 1.5rem;
  padding: 1.25rem;
}
@media (min-width: 760px) {
  .item {
    grid-template-columns: 15rem 1fr;
    padding: 1.5rem;
  }
}
.plate {
  display: block;
  aspect-ratio: 4 / 3;
  border: 1.5px solid var(--line);
  border-radius: 4px;
  overflow: hidden;
  background: #000;
}
.plate img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.ghost {
  background: repeating-linear-gradient(-45deg, transparent 0 8px, var(--slate-soft) 8px 9px);
  border-style: dashed;
}
.body {
  display: grid;
  gap: 0.8rem;
  align-content: start;
}
.title {
  font-size: clamp(1.75rem, 3.5vw, 2.4rem);
  font-variation-settings: 'wdth' 122;
  font-weight: 800;
  letter-spacing: -0.015em;
  line-height: 1;
}
.title a {
  text-decoration: none;
}
.title a:hover {
  text-decoration: underline;
  text-decoration-color: var(--marigold);
  text-decoration-thickness: 3px;
  text-underline-offset: 0.12em;
}
.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}
.links {
  display: flex;
  flex-wrap: wrap;
  gap: 1.2rem;
  font-size: 0.95rem;
}
.strong {
  font-weight: 650;
  text-decoration-color: var(--marigold);
}
.empty {
  border: 1.5px dashed var(--line);
  border-radius: var(--radius);
}
.more {
  margin-top: 3rem;
  color: var(--ink-2);
}
</style>
