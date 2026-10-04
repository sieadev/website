<script setup lang="ts">
import { skillCategories, formatExperience } from '@/data/skills'

/* The yellow departures poster from every German platform, listing tools by the year I started using them. */
const columns = skillCategories.map((c) => ({
  ...c,
  rows: [...c.skills].sort((a, b) => a.startYear - b.startYear || a.name.localeCompare(b.name))
}))
</script>

<template>
  <div class="poster">
    <div class="poster-head">
      <p class="title cond">Since</p>
      <p class="sub">Every tool I use, by the year I started. Oldest first.</p>
    </div>
    <div class="cols">
      <section v-for="c in columns" :key="c.key" class="col" :aria-labelledby="`tt-${c.key}`">
        <h3 :id="`tt-${c.key}`" class="col-title cond">{{ c.label }}</h3>
        <table>
          <thead class="sr-only">
            <tr><th scope="col">Year</th><th scope="col">Tool</th><th scope="col">Experience</th></tr>
          </thead>
          <tbody>
            <tr v-for="s in c.rows" :key="s.name">
              <td class="yr">{{ s.startYear }}</td>
              <td class="tool">{{ s.name }}</td>
              <td class="exp">{{ formatExperience(s.startYear) }}</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  </div>
</template>

<style scoped>
.poster {
  background: var(--yellow);
  color: #1a1a1a;
  border-radius: var(--r);
  padding: clamp(1rem, 3vw, 1.75rem);
  box-shadow: 0 1px 0 rgb(0 0 0 / 0.08);
}
.poster-head {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0.25rem 1.25rem;
  padding-bottom: 0.9rem;
  border-bottom: 3px solid #1a1a1a;
}
.title {
  font-weight: 700;
  font-size: clamp(2rem, 4vw, 2.75rem);
  line-height: 1;
}
.sub {
  font-weight: 500;
}
.cols {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
}
.col {
  padding: 0.9rem 1rem 0.25rem;
}
.col + .col {
  border-left: 1.5px solid rgb(26 26 26 / 0.45);
}
.col:first-child {
  padding-left: 0;
}
.col-title {
  font-weight: 700;
  font-size: 1.3rem;
  margin-bottom: 0.4rem;
}
table {
  width: 100%;
  border-collapse: collapse;
}
td {
  padding: 0.28rem 0;
  border-bottom: 1px solid rgb(26 26 26 / 0.18);
  vertical-align: baseline;
}
.yr {
  width: 3.2rem;
  font-family: var(--cond);
  font-weight: 700;
  font-size: 1.1rem;
  font-variant-numeric: tabular-nums;
}
.tool {
  font-weight: 600;
}
.exp {
  text-align: right;
  font-size: 0.85rem;
  color: rgb(26 26 26 / 0.75);
  white-space: nowrap;
}
@media (max-width: 1000px) {
  .cols {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  .col:nth-child(3) {
    border-left: none;
    padding-left: 0;
  }
}
@media (max-width: 560px) {
  .cols {
    grid-template-columns: 1fr;
  }
  .col,
  .col + .col {
    border-left: none;
    padding-left: 0;
    padding-right: 0;
  }
}
</style>
