<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import LayeredText from '@/components/layers/LayeredText.vue'
import { projects } from '@/data/projects'
import { useProjectMarkdown } from '@/composables/useProjectMarkdown'
import '@/assets/markdown.css'

const route = useRoute()
const slug = computed(() => route.params.slug as string | undefined)
const project = computed(() => projects.find((p) => p.slug && p.slug === slug.value))
const body = ref<HTMLElement | null>(null)
const { html, state, reload } = useProjectMarkdown(slug, body)

const others = computed(() => projects.filter((p) => p.slug && p.slug !== slug.value))

watchEffect(() => {
  document.title = project.value ? `${project.value.name} · Sieadev` : 'Project not found · Sieadev'
})
</script>

<template>
  <div class="page">
    <RouterLink to="/projects" class="back link">All projects</RouterLink>

    <template v-if="project">
      <header class="head">
        <h1 class="display title" :aria-label="project.name">
          <LayeredText :text="project.name" />
        </h1>
        <p class="desc">{{ project.description }}</p>
        <ul class="tags" aria-label="Tags">
          <li v-for="t in project.tags" :key="t" class="chip">{{ t }}</li>
        </ul>
        <p class="actions">
          <a v-if="project.docs" :href="project.docs" target="_blank" rel="noopener" class="btn">Read the docs</a>
          <a v-if="project.github" :href="project.github" target="_blank" rel="noopener" class="btn">View source on GitHub</a>
        </p>
      </header>

      <figure class="sheet banner" data-depth="1">
        <img :src="project.image" :alt="`${project.name} logo`" />
      </figure>

      <p v-if="state === 'loading'" class="status muted" role="status">Loading the write-up…</p>
      <div v-else-if="state === 'error'" class="status sheet failed" role="alert">
        <p>The write-up didn't load. Check your connection and try again.</p>
        <button type="button" class="btn" @click="reload">Try again</button>
      </div>
      <article v-show="state === 'ready'" ref="body" class="md" v-html="html" />

      <nav v-if="others.length" class="next" aria-label="More projects">
        <p class="muted">More write-ups</p>
        <ul>
          <li v-for="p in others" :key="p.name">
            <RouterLink :to="{ name: 'ProjectDetail', params: { slug: p.slug } }" class="sheet other" data-depth="1">
              <span class="wide other-name">{{ p.name }}</span>
              <span class="muted other-tags">{{ p.tags.slice(0, 2).join(', ') }}</span>
            </RouterLink>
          </li>
        </ul>
      </nav>
    </template>

    <section v-else class="missing">
      <h1 class="section-title">No project called “{{ slug }}”.</h1>
      <p class="lede">It may have been renamed. The full list is on the projects page.</p>
      <RouterLink to="/projects" class="btn btn-primary">Browse projects</RouterLink>
    </section>
  </div>
</template>

<style scoped>
.back {
  display: inline-block;
  margin-top: 0.5rem;
  font-size: 0.92rem;
  color: var(--ink-2);
}
.back::before {
  content: '← ';
}
.head {
  display: grid;
  gap: 1rem;
  padding: clamp(1.5rem, 4vw, 3rem) 0 2rem;
  max-width: 50rem;
}
.title {
  font-size: clamp(3rem, 9vw, 6.5rem);
}
.desc {
  font-size: 1.12rem;
  color: var(--ink-2);
}
.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}
.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 0.5rem;
}
.banner {
  overflow: hidden;
  aspect-ratio: 21 / 9;
  max-width: 50rem;
  margin-bottom: clamp(2.5rem, 6vw, 4rem);
  background: #000;
}
.banner img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: calc(var(--radius) - 1px);
}
.status {
  padding: 1.25rem;
}
.failed {
  display: grid;
  gap: 1rem;
  justify-items: start;
  max-width: 36rem;
}
.next {
  margin-top: 5rem;
  padding-top: 2rem;
  border-top: 1.5px solid var(--line);
  max-width: 50rem;
}
.next ul {
  display: grid;
  gap: 1.5rem;
  margin-top: 0.8rem;
}
@media (min-width: 640px) {
  .next ul {
    grid-template-columns: 1fr 1fr;
  }
}
.other {
  display: grid;
  gap: 0.2rem;
  padding: 1rem 1.2rem;
  text-decoration: none;
  transition: transform 150ms ease;
}
.other:hover {
  transform: translate(-2px, -2px);
}
.other-name {
  font-size: 1.35rem;
  font-weight: 780;
}
.other-tags {
  font-size: 0.88rem;
}
.missing {
  display: grid;
  gap: 1rem;
  justify-items: start;
  padding-top: 3rem;
}
</style>
