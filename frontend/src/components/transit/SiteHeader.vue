<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import SignArrow from './SignArrow.vue'
import { useTheme } from '@/composables/useTheme'
import { profile } from '@/data/profile'

const route = useRoute()
const theme = useTheme()
const open = ref(false)
watch(() => route.fullPath, () => (open.value = false))

const items = [
  { to: '/', label: 'Home', match: (p: string) => p === '/' },
  { to: '/projects', label: 'Projects', match: (p: string) => p.startsWith('/projects') },
  { to: '/journey', label: 'Journey', match: (p: string) => p === '/journey' },
  { to: '/contact', label: 'Contact', match: (p: string) => p === '/contact' }
]
</script>

<template>
  <header class="bar">
    <div class="wrap row">
      <RouterLink to="/" class="brand">
        <img src="/logo.svg" alt="" width="30" height="30" />
        <span>siea.dev</span>
      </RouterLink>

      <button type="button" class="menu" :aria-expanded="open" aria-controls="site-nav" @click="open = !open">
        <span>{{ open ? 'Close' : 'Menu' }}</span>
      </button>

      <nav id="site-nav" class="nav" :class="{ open }" aria-label="Site">
        <ul>
          <li v-for="i in items" :key="i.to">
            <RouterLink :to="i.to" class="item" :class="{ here: i.match(route.path) }" :aria-current="i.match(route.path) ? 'page' : undefined">
              <span class="dot" aria-hidden="true" />
              {{ i.label }}
            </RouterLink>
          </li>
          <li>
            <a :href="profile.links.docs.href" target="_blank" rel="noopener" class="item ext">
              Docs
              <SignArrow :dir="-45" />
              <span class="sr-only">(opens docs.siea.dev)</span>
            </a>
          </li>
        </ul>
        <button type="button" class="theme" @click="theme.cycle()">
          <span class="sr-only">Colour theme:</span>
          {{ theme.label.value }}
        </button>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.bar {
  position: sticky;
  top: 0;
  z-index: 40;
  background: var(--sign);
  color: var(--sign-ink);
  border-bottom: 4px solid var(--yellow);
}
.row {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  min-height: 3.75rem;
}
.brand {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-family: var(--cond);
  font-weight: 700;
  font-size: 1.35rem;
  text-decoration: none;
}
.brand img {
  border-radius: 5px;
  box-shadow: 0 0 0 2px var(--sign-ink);
}
.nav {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-left: auto;
}
.nav ul {
  display: flex;
  gap: 0.25rem;
}
.item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem 0.75rem;
  border-radius: 4px;
  font-family: var(--cond);
  font-weight: 600;
  font-size: 1.15rem;
  text-decoration: none;
}
.item:hover {
  background: rgb(255 255 255 / 0.12);
}
.dot {
  width: 0.7rem;
  height: 0.7rem;
  border-radius: 50%;
  border: 2.5px solid var(--sign-ink);
}
.item.here .dot {
  background: var(--yellow);
  border-color: var(--yellow);
}
.item.here {
  background: rgb(0 0 0 / 0.18);
}
.ext .arrow {
  width: 0.9em;
  height: 0.9em;
}
.theme,
.menu {
  padding: 0.3rem 0.7rem;
  border-radius: 4px;
  box-shadow: inset 0 0 0 2px rgb(255 255 255 / 0.7);
  font-family: var(--cond);
  font-weight: 600;
  font-size: 1rem;
  color: inherit;
}
.theme:hover,
.menu:hover {
  background: rgb(255 255 255 / 0.12);
}
.menu {
  display: none;
  margin-left: auto;
}

@media (max-width: 820px) {
  .menu {
    display: inline-block;
  }
  .nav {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    display: none;
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
    padding: 1rem var(--gutter) 1.25rem;
    background: var(--sign);
    border-bottom: 4px solid var(--yellow);
  }
  .nav.open {
    display: flex;
  }
  .nav ul {
    flex-direction: column;
  }
  .item {
    font-size: 1.4rem;
    padding: 0.55rem 0.5rem;
  }
  .theme {
    align-self: flex-start;
  }
}
</style>
