<script setup lang="ts">
import { useRoute } from 'vue-router'
import Led from './Led.vue'
import { useTheme } from '@/composables/useTheme'
import { profile } from '@/data/profile'

const route = useRoute()
const theme = useTheme()

const ports = [
  { to: '/', label: 'Home', match: (p: string) => p === '/' },
  { to: '/projects', label: 'Projects', match: (p: string) => p.startsWith('/projects') },
  { to: '/journey', label: 'Journey', match: (p: string) => p === '/journey' },
  { to: '/contact', label: 'Contact', match: (p: string) => p === '/contact' }
]
</script>

<template>
  <header class="patch">
    <span class="rack-ear single" aria-hidden="true"><i class="screw" /></span>
    <div class="plate face">
      <RouterLink to="/" class="brand" aria-label="siea.dev home">
        <img src="/logo.svg" alt="" width="26" height="26" />
        <span class="brand-name">siea.dev</span>
      </RouterLink>

      <nav aria-label="Site" class="ports">
        <RouterLink v-for="(p, i) in ports" :key="p.to" :to="p.to" class="port" :class="{ live: p.match(route.path) }" :aria-current="p.match(route.path) ? 'page' : undefined">
          <span class="num" aria-hidden="true">{{ i + 1 }}</span>
          <span class="jack" aria-hidden="true"><span class="plug" /></span>
          <Led :on="p.match(route.path)" color="green" :size="6" class="port-led" />
          <span class="silk port-label">{{ p.label }}</span>
        </RouterLink>
        <a :href="profile.links.docs.href" target="_blank" rel="noopener" class="port uplink">
          <span class="num" aria-hidden="true">5</span>
          <span class="jack" aria-hidden="true"><span class="plug" /></span>
          <Led on color="blue" :size="6" class="port-led" />
          <span class="silk port-label">Docs<span class="sr-only"> (opens docs.siea.dev)</span></span>
        </a>
      </nav>

      <fieldset class="rocker">
        <legend class="silk">Theme</legend>
        <div class="rocker-body inset">
          <label v-for="o in theme.options" :key="o.value" :class="{ on: theme.choice.value === o.value }">
            <input type="radio" name="theme" class="sr-only" :value="o.value" :checked="theme.choice.value === o.value" @change="theme.set(o.value)" />
            <span class="silk">{{ o.label }}</span>
          </label>
        </div>
      </fieldset>
    </div>
    <span class="rack-ear single" aria-hidden="true"><i class="screw" /></span>
  </header>
</template>

<style scoped>
.patch {
  position: sticky;
  top: 0;
  z-index: 30;
  display: grid;
  grid-template-columns: var(--rail-w) minmax(0, 1fr) var(--rail-w);
  margin-bottom: 6px;
  box-shadow: 0 6px 12px -6px rgb(0 0 0 / 0.45);
}
.face {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 0.55rem 1.1rem;
  border-radius: 0;
}
.brand {
  display: flex;
  align-items: center;
  gap: 0.55rem;
  text-decoration: none;
  color: var(--silk);
}
.brand img {
  border-radius: 4px;
}
.brand-name {
  font-family: var(--mono);
  font-weight: 700;
  font-size: 0.95rem;
}
.ports {
  display: flex;
  gap: 0.35rem;
  margin: 0 auto;
}
.port {
  position: relative;
  display: grid;
  grid-template-areas: 'num led' 'jack jack' 'label label';
  grid-template-columns: 1fr auto;
  justify-items: start;
  gap: 2px 0;
  padding: 3px 6px 2px;
  border-radius: 3px;
  text-decoration: none;
}
.port:hover {
  background: color-mix(in srgb, var(--silk) 7%, transparent);
}
.num {
  grid-area: num;
  font: 600 9px/1 var(--mono);
  color: var(--silk-dim);
}
.port-led {
  grid-area: led;
}
.jack {
  grid-area: jack;
  position: relative;
  width: 3.4rem;
  height: 1.55rem;
  background: #16181b;
  border-radius: 2px;
  clip-path: polygon(0 0, 100% 0, 100% 78%, 72% 78%, 72% 100%, 28% 100%, 28% 78%, 0 78%);
  box-shadow: inset 0 2px 4px rgb(0 0 0 / 0.8);
}
.plug {
  position: absolute;
  inset: 2px 3px;
  border-radius: 1px;
  background: linear-gradient(180deg, color-mix(in srgb, var(--tape) 75%, white), var(--tape));
  clip-path: inherit;
  transform: scale(0.2);
  opacity: 0;
  transition: transform 160ms ease, opacity 160ms;
}
.port.live .plug {
  transform: none;
  opacity: 1;
}
.uplink .plug {
  background: linear-gradient(180deg, #d9dde3, #a9b0ba);
  opacity: 1;
  transform: none;
}
.port-label {
  grid-area: label;
  justify-self: center;
  font-size: 0.66rem;
  color: var(--silk-dim);
}
.port.live .port-label {
  color: var(--silk);
}
.rocker {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.rocker legend {
  float: left;
  margin-right: 0.5rem;
  font-size: 0.62rem;
}
.rocker-body {
  display: flex;
  padding: 2px;
  gap: 2px;
}
.rocker label {
  padding: 3px 7px;
  border-radius: 2px;
  cursor: pointer;
}
.rocker label .silk {
  font-size: 0.62rem;
}
.rocker label.on {
  background: linear-gradient(180deg, var(--plate-hi), var(--plate-lo));
  box-shadow: 0 1px 2px rgb(0 0 0 / 0.35);
}
.rocker label.on .silk {
  color: var(--silk);
}
.rocker label:has(input:focus-visible) {
  outline: 2px solid var(--focus);
}

@media (max-width: 900px) {
  .face {
    flex-wrap: wrap;
    gap: 0.5rem 1rem;
    justify-content: space-between;
  }
  .ports {
    order: 3;
    width: 100%;
    justify-content: space-between;
    margin: 0;
  }
  .rocker legend {
    display: none;
  }
}
@media (max-width: 480px) {
  .jack {
    width: 2.6rem;
    height: 1.25rem;
  }
  .port {
    padding: 2px 3px;
  }
  .port-label {
    font-size: 0.58rem;
  }
}
</style>
