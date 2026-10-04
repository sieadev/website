<script setup lang="ts">
import { journeyChronological, formatJourneyRange } from '@/data/journey'

const entries = journeyChronological(true)
</script>

<template>
  <div class="page">
    <header class="head">
      <h1 class="section-title">Journey</h1>
      <p class="lede">School, work and the company, newest on top. Each layer rests on the ones below it.</p>
    </header>

    <ol class="strata">
      <li
        v-for="(e, i) in entries"
        :key="e.id"
        class="sheet layer"
        :class="{ current: !e.endDate }"
        :style="{ '--i': i, zIndex: entries.length - i }"
      >
        <div class="meta">
          <span class="kind" :class="e.type">{{ e.type === 'job' ? 'Work' : 'Education' }}</span>
          <span class="range">{{ formatJourneyRange(e, 'long') }}</span>
        </div>
        <div class="main">
          <h2 class="title">{{ e.title }}</h2>
          <p class="org">
            {{ e.organization }}<template v-if="e.location">, {{ e.location }}</template>
          </p>
          <p v-if="e.description" class="desc">{{ e.description }}</p>
          <ul v-if="e.skills?.length" class="skills" aria-label="Skills">
            <li v-for="s in e.skills" :key="s" class="chip">{{ s }}</li>
          </ul>
        </div>
      </li>
    </ol>
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
.strata {
  display: grid;
  max-width: 54rem;
}
.layer {
  display: grid;
  gap: 0.75rem 2rem;
  padding: 1.5rem 1.5rem 2.25rem;
  margin-top: -0.9rem;
  margin-left: calc(var(--i) * 1.1rem);
  box-shadow: var(--step) var(--step) 0 0 var(--slate);
}
.layer:first-child {
  margin-top: 0;
}
.layer:last-child {
  padding-bottom: 1.5rem;
}
@media (min-width: 760px) {
  .layer {
    grid-template-columns: 11rem 1fr;
  }
}
.current {
  border-width: 2px;
  box-shadow: var(--step) var(--step) 0 0 var(--marigold);
}
.meta {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  font-size: 0.88rem;
  color: var(--ink-2);
}
@media (max-width: 759px) {
  .meta {
    flex-direction: row;
    flex-wrap: wrap;
    gap: 0.75rem;
    align-items: center;
  }
}
.kind {
  align-self: flex-start;
  padding: 0.05rem 0.55rem 0.1rem;
  border: 1.5px solid var(--line);
  border-radius: 3px;
  font-weight: 600;
  color: var(--ink);
}
.kind.job {
  background: var(--marigold);
  color: var(--on-marigold);
  border-color: var(--ink);
}
.range {
  font-variant-numeric: tabular-nums;
}
.main {
  display: grid;
  gap: 0.5rem;
}
.title {
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-variation-settings: 'wdth' 120;
  font-weight: 800;
  line-height: 1.05;
}
.org {
  font-weight: 550;
}
.desc {
  color: var(--ink-2);
  max-width: 36rem;
}
.skills {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-top: 0.3rem;
}
@media (max-width: 640px) {
  .layer {
    margin-left: calc(var(--i) * 0.45rem);
  }
}
</style>
