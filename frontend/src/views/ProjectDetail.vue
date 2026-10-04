<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import Device from '@/components/rack/Device.vue'
import DymoLabel from '@/components/rack/DymoLabel.vue'
import Led from '@/components/rack/Led.vue'
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
  <template v-if="project">
    <Device as="header" class="head" flush>
      <div class="head-row">
        <div class="ident">
          <RouterLink to="/projects" class="text-link back">All projects</RouterLink>
          <h1 class="title"><DymoLabel size="lg" :tilt="-0.8">{{ project.name }}</DymoLabel></h1>
          <p class="desc">{{ project.description }}</p>
          <ul class="tags" aria-label="Tags">
            <li v-for="t in project.tags" :key="t" class="silk">{{ t }}</li>
          </ul>
          <div class="actions">
            <a v-if="project.docs" :href="project.docs" target="_blank" rel="noopener" class="hw-btn">Read the docs</a>
            <a v-if="project.github" :href="project.github" target="_blank" rel="noopener" class="hw-btn">View source on GitHub</a>
          </div>
        </div>
        <figure class="bezel">
          <img :src="project.image" :alt="`${project.name} logo`" />
        </figure>
      </div>
    </Device>

    <Device as="div" class="chassis">
      <div class="state-row" aria-hidden="true">
        <Led :color="state === 'error' ? 'amber' : 'green'" :blink="state === 'loading'" :size="6" />
        <span class="silk">{{ state === 'loading' ? 'Reading' : state === 'error' ? 'Fault' : 'Write-up' }}</span>
      </div>
      <p v-if="state === 'loading'" class="dim" role="status">Loading the write-up…</p>
      <div v-else-if="state === 'error'" class="failed" role="alert">
        <p>The write-up didn't load. Check your connection and try again.</p>
        <button type="button" class="hw-btn" @click="reload">Try again</button>
      </div>
      <article v-show="state === 'ready'" ref="body" class="md" v-html="html" />
    </Device>

    <Device v-if="others.length" as="nav" aria-label="More write-ups">
      <div class="others">
        <span class="silk">More write-ups</span>
        <RouterLink v-for="p in others" :key="p.name" :to="{ name: 'ProjectDetail', params: { slug: p.slug } }" class="hw-btn">
          {{ p.name }}
        </RouterLink>
      </div>
    </Device>
  </template>

  <Device v-else as="section" aria-labelledby="missing-title">
    <div class="missing">
      <DymoLabel size="sm" :tilt="-1">Not installed</DymoLabel>
      <h1 id="missing-title" class="title-plain">No project called “{{ slug }}”.</h1>
      <p class="dim">It may have been renamed. Every write-up is listed on the projects page.</p>
      <RouterLink to="/projects" class="hw-btn hw-btn-primary">Browse projects</RouterLink>
    </div>
  </Device>
</template>

<style scoped>
.head-row {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 20rem;
  gap: 2rem;
  padding: clamp(1.25rem, 3vw, 2rem);
}
.ident {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.9rem;
}
.back {
  font-size: 0.88rem;
  color: var(--silk-dim);
}
.back::before {
  content: '← ';
}
.title :deep(.dymo) {
  font-size: clamp(1.6rem, 4vw, 2.6rem);
}
.desc {
  font-size: 1.08rem;
  max-width: 40rem;
}
.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem 1rem;
}
.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
}
.bezel {
  align-self: center;
  padding: 8px;
  background: #16181b;
  border-radius: 4px;
  box-shadow: inset 0 2px 6px rgb(0 0 0 / 0.8);
}
.bezel img {
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  border-radius: 2px;
}
.chassis :deep(.face) {
  padding: clamp(1.25rem, 4vw, 3rem);
}
.state-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}
.failed {
  display: grid;
  gap: 0.8rem;
  justify-items: start;
}
.others {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.75rem;
}
.missing {
  display: grid;
  gap: 0.9rem;
  justify-items: start;
  padding: 2rem 0;
}
.title-plain {
  font-family: var(--cond);
  font-size: clamp(1.8rem, 4vw, 2.6rem);
  font-weight: 700;
  line-height: 1.1;
}
@media (max-width: 860px) {
  .head-row {
    grid-template-columns: 1fr;
  }
  .bezel {
    max-width: 20rem;
  }
}
</style>
