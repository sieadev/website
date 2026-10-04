<script setup lang="ts">
import { profile } from '@/data/profile'
const year = new Date().getFullYear()
</script>

<template>
  <footer class="footer">
    <p>© {{ year }} {{ profile.name }}. Built in {{ profile.location.split(',')[0] }}.</p>
    <p class="links">
      <RouterLink to="/tos" class="link">Terms of service</RouterLink>
      <a :href="profile.links.discord.href" target="_blank" rel="noopener" class="link">Discord</a>
      <span class="hint" title="Try the arrow keys">↑↑↓↓←→←→</span>
    </p>
  </footer>
</template>

<style scoped>
.footer {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 0.75rem 2rem;
  max-width: 72rem;
  margin: 0 clamp(1.25rem, 4vw, 3.5rem);
  padding: 1.5rem 0 2rem;
  border-top: 1.5px solid var(--line);
  font-size: 0.88rem;
  color: var(--ink-2);
}
.links {
  display: flex;
  gap: 1.25rem;
  align-items: center;
}
.hint {
  letter-spacing: 0.1em;
  color: var(--slate);
  user-select: none;
}
</style>
