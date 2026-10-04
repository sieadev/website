<script setup lang="ts">
import LayeredText from '@/components/layers/LayeredText.vue'
import ProjectSheet from '@/components/layers/ProjectSheet.vue'
import SkillStrata from '@/components/layers/SkillStrata.vue'
import { profile } from '@/data/profile'
import { projects } from '@/data/projects'
import { journeyChronological, formatJourneyRange } from '@/data/journey'

const [lead, ...rest] = projects.filter((p) => p.slug)
const unfinished = projects.filter((p) => !p.slug)
const path = journeyChronological(true)
</script>

<template>
  <div class="page">
    <section id="intro" class="intro">
      <h1 class="display name" :aria-label="profile.name">
        <LayeredText :text="profile.firstName" interactive :spread="14" />
        <LayeredText text="Voßwinkel" interactive :spread="14" />
      </h1>

      <div class="intro-grid">
        <div>
          <p class="role">
            Fullstack developer in Essen, founder of
            <a :href="profile.company.href" target="_blank" rel="noopener" class="link">Pixel Services</a>.
          </p>
          <p class="bio">
            Most people online know me as Sieadev. I'm {{ profile.age }}, I started coding at {{ profile.startedCodingAt }},
            and I've spent most of the time since on the backend: Java frameworks that load their features as plugins,
            Discord bots, and the servers they run on.
          </p>
          <div class="actions">
            <RouterLink to="/projects" class="btn btn-primary">See my projects</RouterLink>
            <RouterLink to="/contact" class="btn">Get in touch</RouterLink>
          </div>
        </div>

        <aside class="sheet now" data-depth="1" aria-label="Right now">
          <p class="now-title">Right now</p>
          <p class="now-role wide">{{ profile.company.role }}, {{ profile.company.name }}</p>
          <p class="muted">{{ profile.company.summary }}</p>
          <p class="now-links">
            <a :href="profile.links.github.href" target="_blank" rel="noopener" class="link">GitHub</a>
            <a :href="profile.links.docs.href" target="_blank" rel="noopener" class="link">Docs</a>
            <a :href="profile.links.linkedin.href" target="_blank" rel="noopener" class="link">LinkedIn</a>
          </p>
        </aside>
      </div>
    </section>

    <section id="work" class="section" aria-labelledby="work-title">
      <div class="section-head">
        <h2 id="work-title" class="section-title">Work</h2>
        <p class="lede">Open-source frameworks and libraries, mostly Java. Each one has a write-up with code.</p>
      </div>

      <div class="work-grid">
        <ProjectSheet :project="lead" :depth="2" large class="lead" />
        <ProjectSheet v-for="p in rest" :key="p.name" :project="p" />
        <article v-for="p in unfinished" :key="p.name" class="empty-layer">
          <h3 class="wide">{{ p.name }}</h3>
          <p class="muted">{{ p.description }}</p>
          <p>
            No write-up yet.
            <a v-if="p.github" :href="p.github" target="_blank" rel="noopener" class="link">Read the source on GitHub</a>
          </p>
        </article>
        <article class="empty-layer more">
          <h3 class="wide">Everything else</h3>
          <p class="muted">Minecraft plugins, small tools and experiments that never got a write-up.</p>
          <p>
            <a :href="profile.links.github.href" target="_blank" rel="noopener" class="link">Browse github.com/sieadev</a>
          </p>
        </article>
      </div>
    </section>

    <section id="strata" class="section" aria-labelledby="strata-title">
      <div class="section-head">
        <h2 id="strata-title" class="section-title">Skills</h2>
        <p class="lede">Each bar starts in the year I picked the tool up. Newer layers sit on top.</p>
      </div>
      <SkillStrata />
    </section>

    <section id="path" class="section" aria-labelledby="path-title">
      <div class="section-head">
        <h2 id="path-title" class="section-title">Path</h2>
        <RouterLink to="/journey" class="link">Open the full journey</RouterLink>
      </div>
      <ol class="path">
        <li v-for="(e, i) in path" :key="e.id" class="sheet path-row" :style="{ '--i': i }">
          <span class="when">{{ formatJourneyRange(e) }}</span>
          <span class="what wide">{{ e.title }}</span>
          <span class="where muted">{{ e.organization }}</span>
        </li>
      </ol>
    </section>

    <section class="section closing" aria-labelledby="closing-title">
      <h2 id="closing-title" class="section-title">Have something to build?</h2>
      <p class="lede">Backend services, plugins, bots or hosting. Tell me what you need and I'll get back to you.</p>
      <RouterLink to="/contact" class="btn btn-primary">Write to me</RouterLink>
    </section>
  </div>
</template>

<style scoped>
.intro {
  padding-top: clamp(1rem, 5vw, 4rem);
  scroll-margin-top: 4rem;
}
.name {
  display: flex;
  flex-direction: column;
  font-size: clamp(3rem, 10.5vw, 8.75rem);
  margin-bottom: clamp(1.75rem, 4vw, 3rem);
}
@media (min-width: 960px) {
  .name {
    font-size: clamp(3rem, 7.6vw, 8.75rem);
  }
}
.intro-grid {
  display: grid;
  gap: 2.5rem;
}
@media (min-width: 1100px) {
  .intro-grid {
    grid-template-columns: minmax(0, 1fr) 19rem;
    align-items: start;
  }
}
.role {
  font-size: clamp(1.3rem, 2.4vw, 1.75rem);
  font-variation-settings: 'wdth' 105;
  font-weight: 600;
  line-height: 1.25;
  max-width: 34ch;
}
.bio {
  margin-top: 1rem;
  max-width: 36rem;
  font-size: 1.05rem;
  color: var(--ink-2);
}
.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1.75rem;
}
.now {
  padding: 1.2rem 1.3rem;
  display: grid;
  gap: 0.35rem;
}
.now-title {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--ink-2);
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.now-title::before {
  content: '';
  width: 0.55rem;
  height: 0.55rem;
  border-radius: 50%;
  background: var(--marigold);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--marigold) 30%, transparent);
}
.now-role {
  font-weight: 700;
  font-size: 1.15rem;
}
.now-links {
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;
  font-size: 0.92rem;
}

.work-grid {
  display: grid;
  gap: 2rem 1.75rem;
}
@media (min-width: 760px) {
  .work-grid {
    grid-template-columns: 1fr 1fr;
  }
  .lead {
    grid-column: 1 / -1;
  }
}
.empty-layer {
  display: grid;
  gap: 0.6rem;
  align-content: start;
  padding: 1.4rem 1.5rem;
  border: 1.5px dashed var(--line);
  border-radius: var(--radius);
}
.empty-layer h3 {
  font-size: 1.6rem;
  font-weight: 780;
}
.empty-layer .muted {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.path {
  display: grid;
}
.path-row {
  display: grid;
  grid-template-columns: 11rem 1fr auto;
  gap: 0.25rem 1.5rem;
  align-items: baseline;
  padding: 0.95rem 1.25rem;
  margin-left: calc(var(--i) * 0.9rem);
  margin-top: -1.5px;
  border-radius: 0;
}
.path-row:first-child {
  border-radius: var(--radius) var(--radius) 0 0;
  background: color-mix(in srgb, var(--marigold) 22%, var(--sheet));
}
.dark .path-row:first-child {
  background: var(--sheet);
  box-shadow: inset 5px 0 0 var(--marigold);
}
.path-row:last-child {
  border-radius: 0 0 var(--radius) var(--radius);
}
.when {
  font-size: 0.85rem;
  font-variant-numeric: tabular-nums;
  color: var(--ink-2);
}
.what {
  font-weight: 700;
}
@media (max-width: 700px) {
  .path-row {
    grid-template-columns: 1fr;
    margin-left: calc(var(--i) * 0.4rem);
  }
}

.closing {
  display: grid;
  gap: 1.1rem;
  justify-items: start;
  padding-bottom: 2rem;
}
</style>
