<script setup lang="ts">
import { tosSections } from '@/data/tos'
</script>

<template>
  <div class="wrap page">
    <header class="head">
      <h1 class="h-page">Terms of service</h1>
      <p class="lede">The rules for using siea.dev and what happens to anything you send me.</p>
    </header>
    <div class="terms">
      <section v-for="(s, i) in tosSections" :key="s.title" class="clause" :aria-labelledby="`tos-${i}`">
        <h2 :id="`tos-${i}`" class="clause-title cond"><span class="num">{{ i + 1 }}</span>{{ s.title }}</h2>
        <p v-for="p in s.paragraphs" :key="p">{{ p }}</p>
        <ul v-if="s.list">
          <li v-for="item in s.list" :key="item">{{ item }}</li>
        </ul>
      </section>
    </div>
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
.terms {
  display: grid;
  gap: 2rem;
  max-width: 44rem;
}
.clause {
  display: grid;
  gap: 0.6rem;
  color: var(--ink-2);
}
.clause-title {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: var(--ink);
  font-weight: 700;
  font-size: 1.5rem;
}
.num {
  display: grid;
  place-items: center;
  width: 2rem;
  height: 2rem;
  border-radius: 4px;
  background: var(--sign);
  color: var(--sign-ink);
  font-size: 1.1rem;
}
ul {
  display: grid;
  gap: 0.3rem;
  padding-left: 1.2rem;
  list-style: square;
}
</style>
