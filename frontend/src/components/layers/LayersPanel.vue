<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useTheme } from '@/composables/useTheme'
import { useScrollSpy } from '@/composables/useScrollSpy'
import { profile } from '@/data/profile'

const route = useRoute()
const theme = useTheme()
const open = ref(false)

const homeSections = [
  { id: 'intro', label: 'Intro' },
  { id: 'work', label: 'Work' },
  { id: 'strata', label: 'Skills' },
  { id: 'path', label: 'Path' }
]
const pages = [
  { to: '/projects', label: 'Projects', match: (p: string) => p.startsWith('/projects') },
  { to: '/journey', label: 'Journey', match: (p: string) => p === '/journey' },
  { to: '/contact', label: 'Contact', match: (p: string) => p === '/contact' }
]

const onHome = computed(() => route.path === '/')
const sectionIds = computed(() => (onHome.value ? homeSections.map((s) => s.id) : []))
const spy = useScrollSpy(sectionIds)

watch(
  () => route.fullPath,
  async () => {
    open.value = false
    await nextTick()
    requestAnimationFrame(spy.refresh)
  }
)

const current = computed(() => {
  if (onHome.value) return homeSections.find((s) => s.id === spy.active.value)?.label ?? 'Intro'
  return pages.find((p) => p.match(route.path))?.label ?? (route.name as string) ?? ''
})
</script>

<template>
  <header class="topbar">
    <RouterLink to="/" class="brand">
      <img src="/logo.svg" alt="" width="28" height="28" />
      <span class="wide">siea.dev</span>
    </RouterLink>
    <button class="layers-toggle" type="button" :aria-expanded="open" aria-controls="layers-panel" @click="open = !open">
      <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
        <path d="M12 3 2 8l10 5 10-5-10-5Zm-10 9 10 5 10-5M2 16l10 5 10-5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" />
      </svg>
      <span>{{ current }}</span>
    </button>
  </header>

  <div v-if="open" class="scrim" @click="open = false" />

  <nav id="layers-panel" class="panel" :class="{ open }" aria-label="Site">
    <div class="panel-head">
      <RouterLink to="/" class="brand">
        <img src="/logo.svg" alt="" width="30" height="30" />
        <span class="wide">siea.dev</span>
      </RouterLink>
    </div>

    <p class="panel-title">Layers</p>
    <ol class="tree">
      <li>
        <RouterLink to="/" class="row" :class="{ active: onHome }">
          <span class="swatch" />
          <span>{{ profile.handle }}</span>
        </RouterLink>
        <ol v-if="onHome" class="children">
          <li v-for="s in homeSections" :key="s.id">
            <a :href="`#${s.id}`" class="row child" :class="{ current: spy.active.value === s.id }">
              <span class="twig" aria-hidden="true" />
              {{ s.label }}
            </a>
          </li>
        </ol>
      </li>
      <li v-for="p in pages" :key="p.to">
        <RouterLink :to="p.to" class="row" :class="{ active: p.match(route.path) }">
          <span class="swatch" />
          <span>{{ p.label }}</span>
        </RouterLink>
      </li>
    </ol>

    <p class="panel-title">Elsewhere</p>
    <ul class="tree">
      <li v-for="l in [profile.links.github, profile.links.docs, profile.links.linkedin]" :key="l.href">
        <a :href="l.href" target="_blank" rel="noopener" class="row ext">
          <span>{{ l.label }}</span>
          <svg viewBox="0 0 12 12" width="10" height="10" aria-hidden="true"><path d="M3 9 9 3M4 3h5v5" fill="none" stroke="currentColor" stroke-width="1.4" /></svg>
        </a>
      </li>
    </ul>

    <div class="panel-foot">
      <fieldset class="theme">
        <legend class="sr-only">Colour theme</legend>
        <label v-for="o in theme.options" :key="o.value" :class="{ on: theme.choice.value === o.value }">
          <input type="radio" name="theme" class="sr-only" :value="o.value" :checked="theme.choice.value === o.value" @change="theme.set(o.value)" />
          {{ o.label }}
        </label>
      </fieldset>
    </div>
  </nav>
</template>

<style scoped>
.brand {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  font-weight: 750;
  font-size: 1.05rem;
  text-decoration: none;
}
.brand img {
  border-radius: 6px;
}

.topbar {
  position: sticky;
  top: 0;
  z-index: 40;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1.25rem;
  background: color-mix(in srgb, var(--paper) 92%, transparent);
  backdrop-filter: blur(8px);
  border-bottom: 1.5px solid var(--line);
}
.layers-toggle {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.35rem 0.8rem;
  border: 1.5px solid var(--line);
  border-radius: var(--radius);
  background: var(--sheet);
  font-weight: 600;
  font-size: 0.9rem;
}

.scrim {
  position: fixed;
  inset: 0;
  z-index: 45;
  background: color-mix(in srgb, var(--ink) 30%, transparent);
}

.panel {
  position: fixed;
  z-index: 50;
  inset: auto 0.75rem 0.75rem 0.75rem;
  max-height: calc(100vh - 5rem);
  overflow-y: auto;
  padding: 1.1rem 1rem 1rem;
  background: var(--sheet);
  border: 1.5px solid var(--line);
  border-radius: var(--radius);
  box-shadow: var(--step) var(--step) 0 0 var(--line);
  transform: translateY(calc(100% + 2rem));
  visibility: hidden;
  transition: transform 260ms cubic-bezier(0.2, 0.7, 0.2, 1), visibility 0s 260ms;
}
.panel.open {
  transform: none;
  visibility: visible;
  transition: transform 260ms cubic-bezier(0.2, 0.7, 0.2, 1);
}
.panel-head {
  display: none;
}

.panel-title {
  margin: 0.25rem 0 0.4rem;
  padding: 0 0.5rem;
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--ink-2);
}
.tree {
  margin-bottom: 1.1rem;
}
.row {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  padding: 0.45rem 0.5rem;
  border-radius: 4px;
  font-weight: 550;
  text-decoration: none;
}
.row:hover {
  background: var(--slate-soft);
}
.swatch {
  width: 0.85rem;
  height: 0.85rem;
  border: 1.5px solid var(--line);
  border-radius: 2px;
  background: var(--sheet);
  box-shadow: 2px 2px 0 0 var(--slate);
}
.row.active {
  background: var(--slate-soft);
}
.row.active .swatch {
  background: var(--marigold);
  border-color: var(--ink);
}
.children {
  margin: 0.1rem 0 0.25rem 0.9rem;
  border-left: 1.5px solid var(--slate);
}
.row.child {
  padding-left: 0.9rem;
  font-weight: 450;
  color: var(--ink-2);
}
.row.child.current {
  color: var(--ink);
  font-weight: 650;
}
.row.child.current .twig {
  background: var(--marigold);
}
.twig {
  width: 0.45rem;
  height: 0.45rem;
  margin-left: -1.2rem;
  margin-right: 0.3rem;
  border-radius: 50%;
  background: var(--slate);
}
.row.ext {
  justify-content: space-between;
  color: var(--ink-2);
  font-weight: 450;
}
.row.ext:hover {
  color: var(--ink);
}

.theme {
  display: flex;
  border: 1.5px solid var(--line);
  border-radius: var(--radius);
  overflow: hidden;
}
.theme label {
  flex: 1;
  padding: 0.35rem 0;
  text-align: center;
  font-size: 0.82rem;
  font-weight: 550;
  cursor: pointer;
}
.theme label + label {
  border-left: 1.5px solid var(--line);
}
.theme label.on {
  background: var(--ink);
  color: var(--paper);
}
.theme label:has(input:focus-visible) {
  outline: 2px solid var(--focus);
  outline-offset: -4px;
}

@media (min-width: 960px) {
  .topbar,
  .scrim {
    display: none;
  }
  .panel {
    inset: 1.25rem auto 1.25rem 1.25rem;
    width: var(--panel-w);
    max-height: none;
    display: flex;
    flex-direction: column;
    transform: none;
    visibility: visible;
    transition: none;
  }
  .panel-head {
    display: block;
    margin-bottom: 1.5rem;
    padding: 0 0.5rem;
  }
  .panel-foot {
    margin-top: auto;
  }
}
</style>
