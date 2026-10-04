<script setup lang="ts">
import { useRoute } from 'vue-router'
import SignArrow from '@/components/transit/SignArrow.vue'
const route = useRoute()
</script>

<template>
  <div class="wrap page">
    <div class="broken" aria-hidden="true">
      <span class="seg" />
      <span class="gap-node" />
      <span class="seg dashed" />
    </div>
    <h1 class="h-page">This stop doesn't exist.</h1>
    <p class="lede">
      There's no page at <code>{{ route.fullPath }}</code>. It may have moved, or the link has a typo.
    </p>
    <h2 class="change cond">Change here for</h2>
    <ul class="routes">
      <li><RouterLink to="/" class="sign route">Home <SignArrow /></RouterLink></li>
      <li><RouterLink to="/projects" class="sign route">Projects <SignArrow /></RouterLink></li>
      <li><RouterLink to="/contact" class="sign route">Contact <SignArrow /></RouterLink></li>
    </ul>
  </div>
</template>

<style scoped>
.page {
  display: grid;
  gap: 1rem;
  justify-items: start;
  padding-top: clamp(3rem, 8vw, 6rem);
}
.broken {
  display: flex;
  align-items: center;
  width: min(100%, 26rem);
  margin-bottom: 1rem;
}
.seg {
  flex: 1;
  height: 0.6rem;
  background: var(--line);
  border-radius: 0.6rem;
}
.seg.dashed {
  height: 0.3rem;
  background: repeating-linear-gradient(90deg, var(--ink-2) 0 10px, transparent 10px 18px);
}
.gap-node {
  width: 2rem;
  height: 2rem;
  margin: 0 0.5rem;
  border-radius: 50%;
  border: 4px dashed var(--ink-2);
}
code {
  padding: 0.1em 0.35em;
  border-radius: 4px;
  background: var(--surface-2);
  color: var(--ink);
  word-break: break-all;
}
.change {
  margin-top: 1.5rem;
  font-weight: 700;
  font-size: 1.5rem;
}
.routes {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}
.route {
  display: inline-flex;
  align-items: center;
  gap: 1.25rem;
  padding: 0.65rem 1.1rem;
  font-family: var(--cond);
  font-weight: 700;
  font-size: 1.4rem;
  text-decoration: none;
}
</style>
