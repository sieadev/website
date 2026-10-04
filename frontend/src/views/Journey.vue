<script setup lang="ts">
import { journeyChronological, formatJourneyRange } from '@/data/journey'

const stops = journeyChronological()
</script>

<template>
  <div class="wrap page">
    <header class="head">
      <h1 class="h-page">Journey</h1>
      <p class="lede">Every stop so far, in order. Transfers show what I picked up along the way.</p>
    </header>

    <ol class="line" aria-label="Journey, oldest first">
      <li v-for="(s, i) in stops" :key="s.id" class="stop" :class="[s.type, { here: !s.endDate }]">
        <div class="rail" aria-hidden="true">
          <span class="node">{{ i + 1 }}</span>
        </div>
        <div class="card">
          <p class="when cond">
            {{ formatJourneyRange(s, 'long') }}
            <span v-if="!s.endDate" class="here-tag">You are here</span>
          </p>
          <h2 class="title cond">{{ s.organization }}</h2>
          <p class="role">
            {{ s.title }}<span class="muted"> · {{ s.type === 'job' ? 'Work' : 'School' }}<template v-if="s.location">, {{ s.location }}</template></span>
          </p>
          <p v-if="s.description" class="desc">{{ s.description }}</p>
          <div v-if="s.skills?.length" class="transfers">
            <span class="transfer-label">Transfers</span>
            <ul aria-label="Skills">
              <li v-for="k in s.skills" :key="k" class="badge transfer">{{ k }}</li>
            </ul>
          </div>
        </div>
      </li>
      <li class="stop next">
        <div class="rail" aria-hidden="true"><span class="node" /></div>
        <div class="card">
          <p class="when cond">Next</p>
          <h2 class="title cond">
            <RouterLink to="/contact" class="link">Your project</RouterLink>
          </h2>
          <p class="muted">Have something that needs building or hosting? Tell me about it.</p>
        </div>
      </li>
    </ol>
  </div>
</template>

<style scoped>
.page {
  padding-top: clamp(2rem, 5vw, 3.5rem);
}
.head {
  display: grid;
  gap: 1rem;
  margin-bottom: 2.5rem;
}
.line {
  max-width: 52rem;
}
.stop {
  display: grid;
  grid-template-columns: 3.5rem minmax(0, 1fr);
  gap: 0 1.25rem;
}
.rail {
  position: relative;
  display: flex;
  justify-content: center;
}
.rail::before {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  width: 0.6rem;
  background: var(--line);
}
.stop:first-child .rail::before {
  top: 1.6rem;
}
.here .rail::before {
  bottom: auto;
  height: 1.6rem;
}
/* past the current stop the line is only planned */
.here .rail::after {
  content: '';
  position: absolute;
  top: 1.6rem;
  bottom: 0;
  width: 0.35rem;
  background: repeating-linear-gradient(180deg, var(--ink-2) 0 10px, transparent 10px 18px);
}
.next .rail::before {
  display: none;
}
.node {
  position: relative;
  display: grid;
  place-items: center;
  width: 3.2rem;
  height: 3.2rem;
  margin-top: 0;
  border-radius: 50%;
  background: var(--surface);
  border: 5px solid var(--ink);
  font-family: var(--cond);
  font-weight: 700;
  font-size: 1.3rem;
}
.job .node {
  border-radius: 8px;
}
.here .node {
  background: var(--yellow);
  color: var(--on-yellow);
}
.next .node {
  border-style: dashed;
  border-color: var(--ink-2);
  background: var(--bg);
}
.card {
  display: grid;
  gap: 0.4rem;
  padding: 0.2rem 0 2.75rem;
}
.when {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-weight: 600;
  font-size: 1.15rem;
  color: var(--ink-2);
}
.here-tag {
  padding: 0.02rem 0.5rem;
  border-radius: 3px;
  background: var(--yellow);
  color: var(--on-yellow);
  font-weight: 700;
  font-size: 0.9rem;
}
.title {
  font-weight: 700;
  font-size: clamp(1.8rem, 4vw, 2.5rem);
  line-height: 1;
}
.role {
  font-weight: 600;
}
.desc {
  max-width: 38rem;
  color: var(--ink-2);
}
.transfers {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem 0.75rem;
  margin-top: 0.4rem;
}
.transfer-label {
  font-family: var(--cond);
  font-weight: 600;
  color: var(--ink-2);
}
.transfers ul {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}
.transfer {
  background: var(--sign);
  color: var(--sign-ink);
}
@media (max-width: 560px) {
  .stop {
    grid-template-columns: 2.5rem minmax(0, 1fr);
    gap: 0 0.9rem;
  }
  .node {
    width: 2.4rem;
    height: 2.4rem;
    border-width: 4px;
    font-size: 1.05rem;
  }
  .stop:first-child .rail::before {
    top: 1.2rem;
  }
}
</style>
