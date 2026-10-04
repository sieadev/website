<script setup lang="ts">
import { profile } from '@/data/profile'
const year = new Date().getFullYear()
</script>

<template>
  <footer class="foot">
    <div class="wrap row">
      <p>© {{ year }} {{ profile.name }} · {{ profile.location }}</p>
      <p class="links">
        <RouterLink to="/tos" class="link">Terms of service</RouterLink>
        <a :href="profile.links.github.href" target="_blank" rel="noopener" class="link">GitHub</a>
        <a :href="profile.links.discord.href" target="_blank" rel="noopener" class="link">Discord</a>
        <span class="secret" title="Unscheduled stop: try the arrow keys">↑↑↓↓←→←→</span>
      </p>
    </div>
  </footer>
</template>

<style scoped>
.foot {
  margin-top: 5rem;
  background: #1a1a1a;
  color: #f2f4f3;
  font-size: 0.92rem;
}
.dark .foot {
  background: #061523;
}
.row {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 0.75rem 2rem;
  padding-top: 1.4rem;
  padding-bottom: 1.6rem;
}
.links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 1.4rem;
}
.secret {
  letter-spacing: 0.1em;
  color: #8a9096;
  user-select: none;
}
</style>
