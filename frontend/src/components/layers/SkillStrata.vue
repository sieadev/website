<script setup lang="ts">
import { computed } from 'vue'
import { skillCategories, formatExperience } from '@/data/skills'

const now = new Date().getFullYear()
const first = Math.min(...skillCategories.flatMap((c) => c.skills.map((s) => s.startYear)))
const years = Array.from({ length: now - first + 1 }, (_, i) => first + i)
const span = years.length

// Newest layers on top, like sediment
const groups = computed(() =>
  skillCategories.map((c) => ({
    ...c,
    skills: [...c.skills].sort((a, b) => b.startYear - a.startYear || a.name.localeCompare(b.name))
  }))
)

// Two balanced columns on wide screens: languages + frameworks, software + databases
const columns = computed(() => [groups.value.slice(0, 2), groups.value.slice(2)])

function barStyle(start: number) {
  const offset = start - first
  return { '--from': offset / span, '--len': (span - offset) / span }
}
</script>

<template>
  <div class="strata" :style="{ '--cols': span }">
    <div v-for="(col, ci) in columns" :key="ci" class="column">
    <div class="axis" aria-hidden="true">
      <span class="axis-pad" />
      <div class="ticks">
        <span v-for="y in years" :key="y" class="tick"><span class="full">{{ y }}</span><span class="short">’{{ String(y).slice(2) }}</span></span>
      </div>
    </div>

    <section v-for="g in col" :key="g.key" class="group" :aria-labelledby="`strata-${g.key}`">
      <h3 :id="`strata-${g.key}`" class="group-name">{{ g.label }}</h3>
      <ul>
        <li v-for="s in g.skills" :key="s.name" class="row">
          <span class="label">{{ s.name }}</span>
          <span class="track">
            <span class="bar" :style="barStyle(s.startYear)">
              <span class="since">since {{ s.startYear }}</span>
            </span>
          </span>
          <span class="sr-only">, {{ formatExperience(s.startYear) }}</span>
        </li>
      </ul>
    </section>
    </div>
  </div>
</template>

<style scoped>
.strata {
  --label: 7rem;
  display: grid;
  gap: 1rem 3rem;
}
@media (min-width: 1200px) {
  .strata {
    grid-template-columns: 1fr 1fr;
  }
  .full {
    display: none;
  }
  .short {
    display: inline !important;
  }
  .since {
    display: none;
  }
}
.axis,
.row {
  display: grid;
  grid-template-columns: var(--label) 1fr;
  align-items: center;
}
.axis {
  padding: 0.4rem 0;
  background: var(--paper);
  border-bottom: 1.5px solid var(--line);
  font-size: 0.75rem;
  font-variant-numeric: tabular-nums;
  color: var(--ink-2);
}
.ticks {
  display: grid;
  grid-template-columns: repeat(var(--cols), 1fr);
}
.tick {
  padding-left: 0.3rem;
  border-left: 1px solid var(--slate);
}
.short {
  display: none;
}
.group {
  padding-top: 1.2rem;
}
.group-name {
  margin-bottom: 0.35rem;
  font-weight: 700;
  font-variation-settings: 'wdth' 110;
}
.row {
  min-height: 2rem;
}
.label {
  font-size: 0.92rem;
  font-weight: 500;
}
.track {
  position: relative;
  height: 1.55rem;
  background-image: repeating-linear-gradient(
    to right,
    var(--slate-soft) 0 1px,
    transparent 1px calc(100% / var(--cols))
  );
}
.bar {
  position: absolute;
  top: 0.15rem;
  bottom: 0.15rem;
  left: calc(var(--from) * 100%);
  width: calc(var(--len) * 100%);
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0 0.5rem;
  background: var(--sheet);
  border: 1.5px solid var(--line);
  border-right: none;
  border-radius: 4px 0 0 4px;
  box-shadow: 3px 3px 0 0 var(--slate);
}
.row:hover .bar {
  background: var(--marigold);
  color: var(--on-marigold);
  border-color: var(--ink);
}
.since {
  font-size: 0.72rem;
  font-weight: 550;
  white-space: nowrap;
  color: inherit;
  opacity: 0.8;
}
@media (max-width: 640px) {
  .strata {
    --label: 5.6rem;
  }
  .since,
  .full {
    display: none;
  }
  .short {
    display: inline;
  }
}
</style>
