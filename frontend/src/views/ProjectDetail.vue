<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import SignArrow from '@/components/transit/SignArrow.vue'
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
  <div class="wrap page">
    <RouterLink to="/projects" class="back">
      <SignArrow :dir="180" />
      All projects
    </RouterLink>

    <template v-if="project">
      <header class="head">
        <div class="sign title-sign">
          <h1 class="title cond">{{ project.name }}</h1>
        </div>
        <div class="meta">
          <p class="desc">{{ project.description }}</p>
          <ul class="tags" aria-label="Tags">
            <li v-for="t in project.tags" :key="t" class="badge">{{ t }}</li>
          </ul>
          <p class="actions">
            <a v-if="project.docs" :href="project.docs" target="_blank" rel="noopener" class="btn">Read the docs</a>
            <a v-if="project.github" :href="project.github" target="_blank" rel="noopener" class="btn">View source on GitHub</a>
          </p>
        </div>
        <figure class="banner">
          <img :src="project.image" :alt="`${project.name} logo`" />
        </figure>
      </header>

      <p v-if="state === 'loading'" class="muted" role="status">Loading the write-up…</p>
      <div v-else-if="state === 'error'" class="failed" role="alert">
        <p>The write-up didn't load. Check your connection and try again.</p>
        <button type="button" class="btn" @click="reload">Try again</button>
      </div>
      <article v-show="state === 'ready'" ref="body" class="md" v-html="html" />

      <nav v-if="others.length" class="others" aria-label="More write-ups">
        <h2 class="others-title cond">Change here for</h2>
        <ul>
          <li v-for="p in others" :key="p.name">
            <RouterLink :to="{ name: 'ProjectDetail', params: { slug: p.slug } }" class="sign other">
              <span class="cond">{{ p.name }}</span>
              <SignArrow />
            </RouterLink>
          </li>
        </ul>
      </nav>
    </template>

    <section v-else class="missing">
      <h1 class="h-page">No project called “{{ slug }}”.</h1>
      <p class="lede">It may have been renamed. Every write-up is listed on the projects page.</p>
      <RouterLink to="/projects" class="btn btn-sign">Browse projects <SignArrow /></RouterLink>
    </section>
  </div>
</template>

<style scoped>
.page {
  padding-top: 1.5rem;
}
.back {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--cond);
  font-weight: 600;
  font-size: 1.1rem;
  text-decoration: none;
  color: var(--ink-2);
}
.back:hover {
  color: var(--ink);
}
.head {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 20rem;
  grid-template-areas: 'sign banner' 'meta banner';
  gap: 1.25rem 2.5rem;
  margin: 1.25rem 0 clamp(2.5rem, 6vw, 4rem);
}
.title-sign {
  grid-area: sign;
  justify-self: start;
  padding: 0.9rem 1.6rem 1rem;
}
.title {
  font-weight: 700;
  font-size: clamp(2.6rem, 7vw, 5rem);
  line-height: 0.95;
}
.meta {
  grid-area: meta;
  display: grid;
  gap: 0.9rem;
  align-content: start;
}
.desc {
  font-size: 1.12rem;
  max-width: 42rem;
}
.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}
.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}
.banner {
  grid-area: banner;
  align-self: start;
  border-radius: var(--r);
  overflow: hidden;
  background: #000;
}
.banner img {
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
}
.failed {
  display: grid;
  gap: 0.8rem;
  justify-items: start;
}
.others {
  margin-top: 4.5rem;
  padding-top: 1.5rem;
  border-top: 6px solid var(--rule);
  max-width: 44rem;
}
.others-title {
  font-weight: 700;
  font-size: 1.6rem;
  margin-bottom: 0.9rem;
}
.others ul {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}
.other {
  display: inline-flex;
  align-items: center;
  gap: 1.5rem;
  padding: 0.7rem 1.1rem;
  font-weight: 700;
  font-size: 1.5rem;
  text-decoration: none;
}
.missing {
  display: grid;
  gap: 1rem;
  justify-items: start;
  padding-top: 2rem;
}
@media (max-width: 860px) {
  .head {
    grid-template-columns: 1fr;
    grid-template-areas: 'sign' 'meta' 'banner';
  }
  .banner {
    max-width: 22rem;
  }
}
</style>
