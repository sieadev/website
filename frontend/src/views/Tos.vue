<script setup lang="ts">
import { tosSections } from '@/data/tos'
</script>

<template>
  <div class="page">
    <header class="head">
      <h1 class="section-title">Terms of service</h1>
      <p class="lede">The rules for using siea.dev and what happens to anything you send me.</p>
    </header>

    <div class="sheet terms" data-depth="1">
      <section v-for="(s, i) in tosSections" :key="s.title" class="clause" :aria-labelledby="`tos-${i}`">
        <h2 :id="`tos-${i}`" class="clause-title">
          <span class="num">{{ i + 1 }}.</span>
          {{ s.title }}
        </h2>
        <p v-for="p in s.paragraphs" :key="p">{{ p }}</p>
        <ul v-if="s.list">
          <li v-for="item in s.list" :key="item">{{ item }}</li>
        </ul>
      </section>
    </div>
  </div>
</template>

<style scoped>
.head {
  display: grid;
  gap: 1rem;
  padding: clamp(1rem, 4vw, 3rem) 0 clamp(2rem, 5vw, 3rem);
}
.head .section-title {
  font-size: clamp(2.5rem, 6vw, 4.5rem);
}
.terms {
  max-width: 46rem;
  padding: clamp(1.25rem, 4vw, 2.5rem);
  display: grid;
  gap: 2rem;
}
.clause {
  display: grid;
  gap: 0.7rem;
  color: var(--ink-2);
}
.clause-title {
  display: flex;
  gap: 0.6rem;
  color: var(--ink);
  font-size: 1.25rem;
  font-variation-settings: 'wdth' 112;
  font-weight: 750;
}
.num {
  font-variant-numeric: tabular-nums;
  color: var(--ink-2);
  min-width: 1.4rem;
}
ul {
  display: grid;
  gap: 0.35rem;
  padding-left: 1.2rem;
  list-style: square;
}
</style>
