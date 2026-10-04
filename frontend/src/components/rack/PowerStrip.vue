<script setup lang="ts">
import Led from './Led.vue'
import { profile } from '@/data/profile'
const year = new Date().getFullYear()
</script>

<template>
  <footer class="pdu">
    <span class="rack-ear single" aria-hidden="true"><i class="screw" /></span>
    <div class="plate face">
      <div class="power">
        <Led color="amber" :size="6" />
        <span class="silk">PDU</span>
      </div>
      <div class="sockets" aria-hidden="true">
        <span v-for="n in 6" :key="n" class="socket"><i /><i /></span>
      </div>
      <p class="meta">
        <span>© {{ year }} {{ profile.name }}</span>
        <RouterLink to="/tos" class="text-link">Terms of service</RouterLink>
        <a :href="profile.links.discord.href" target="_blank" rel="noopener" class="text-link">Discord</a>
        <span class="secret silk" title="Hidden device: try the arrow keys">↑↑↓↓←→←→</span>
      </p>
    </div>
    <span class="rack-ear single" aria-hidden="true"><i class="screw" /></span>
  </footer>
</template>

<style scoped>
.pdu {
  display: grid;
  grid-template-columns: var(--rail-w) minmax(0, 1fr) var(--rail-w);
  margin-top: 6px;
}
.face {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.75rem 1.5rem;
  padding: 0.8rem 1.1rem;
  border-radius: 0;
}
.power {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}
.sockets {
  display: flex;
  gap: 0.45rem;
}
.socket {
  display: flex;
  gap: 5px;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 1.4rem;
  background: #16181b;
  border-radius: 3px 3px 7px 7px;
  box-shadow: inset 0 1px 3px rgb(0 0 0 / 0.8);
}
.socket i {
  width: 3px;
  height: 7px;
  background: #3a3f46;
  border-radius: 1px;
}
.meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem 1.25rem;
  margin-left: auto;
  font-size: 0.82rem;
  color: var(--silk-dim);
}
.secret {
  letter-spacing: 0.12em;
  opacity: 0.7;
  user-select: none;
}
@media (max-width: 719px) {
  .sockets {
    display: none;
  }
  .meta {
    margin-left: 0;
  }
}
</style>
