<script setup lang="ts">
import { computed, ref } from 'vue'
import Device from './Device.vue'
import Led from './Led.vue'
import { skillCategories, yearsSince, formatExperience, type Skill } from '@/data/skills'

/* Like link-speed LEDs on a switch: colour tells you how long I've used a tool. */
function speed(s: Skill): 'amber' | 'green' | 'blue' {
  const y = yearsSince(s.startYear)
  if (y < 2) return 'amber'
  if (y < 5) return 'green'
  return 'blue'
}

let port = 0
const groups = skillCategories.map((c) => ({ ...c, ports: c.skills.map((s) => ({ ...s, n: ++port })) }))
const total = port

const selected = ref<(Skill & { n: number }) | null>(null)
const readout = computed(() => {
  const s = selected.value
  if (!s) return [`${total} PORTS UP`, 'hover a port for details']
  return [`P${String(s.n).padStart(2, '0')}  ${s.name.toUpperCase()}`, `since ${s.startYear} · ${formatExperience(s.startYear)}`]
})
</script>

<template>
  <Device as="div" class="switch" flush>
    <div class="layout">
      <div class="head">
        <p class="silk model">SW-SKILLS · {{ total }} ports</p>
        <div class="lcd readout" aria-live="polite">
          <p v-for="l in readout" :key="l">{{ l }}</p>
        </div>
        <ul class="legend" aria-label="Port LED colour means">
          <li><Led color="amber" :size="6" /><span class="silk">Under 2 yrs</span></li>
          <li><Led color="green" :size="6" /><span class="silk">2–4 yrs</span></li>
          <li><Led color="blue" :size="6" /><span class="silk">5+ yrs</span></li>
        </ul>
      </div>

      <div class="groups">
        <section v-for="g in groups" :key="g.key" class="group" :aria-labelledby="`grp-${g.key}`">
          <h3 :id="`grp-${g.key}`" class="silk group-name">{{ g.label }}</h3>
          <ul class="ports inset">
            <li v-for="s in g.ports" :key="s.name">
              <button
                type="button"
                class="port"
                @mouseenter="selected = s"
                @focus="selected = s"
                @mouseleave="selected = null"
                @blur="selected = null"
              >
                <span class="leds" aria-hidden="true">
                  <Led :color="speed(s)" :size="5" />
                  <span class="pnum">{{ s.n }}</span>
                </span>
                <span class="jack" aria-hidden="true" />
                <span class="pname">{{ s.name }}</span>
                <span class="sr-only">, since {{ s.startYear }}, {{ formatExperience(s.startYear) }}</span>
              </button>
            </li>
          </ul>
        </section>
      </div>
    </div>
  </Device>
</template>

<style scoped>
.layout {
  display: grid;
  grid-template-columns: 15rem minmax(0, 1fr);
}
.head {
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
  padding: 1.2rem;
  border-right: 1px solid rgb(0 0 0 / 0.15);
}
.model {
  font-size: 0.62rem;
}
.readout {
  padding: 0.6rem 0.75rem;
  min-height: 3.6rem;
  font-size: 0.74rem;
  line-height: 1.5;
}
.readout p {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.legend {
  display: grid;
  gap: 0.35rem;
}
.legend li {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.legend .silk {
  font-size: 0.62rem;
}
.groups {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem 1.25rem;
  padding: 1.2rem;
}
.group-name {
  margin-bottom: 0.35rem;
  font-size: 0.64rem;
}
.ports {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(4.4rem, 1fr));
  gap: 4px;
  padding: 6px;
}
.port {
  display: grid;
  justify-items: center;
  gap: 3px;
  width: 100%;
  padding: 4px 2px 5px;
  border-radius: 2px;
  background: none;
  border: none;
  color: var(--silk);
  cursor: default;
}
.port:hover,
.port:focus-visible {
  background: color-mix(in srgb, var(--silk) 9%, transparent);
}
.leds {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 2.4rem;
}
.pnum {
  font: 600 8px/1 var(--mono);
  color: var(--silk-dim);
}
.jack {
  width: 2.4rem;
  height: 1.45rem;
  background: #16181b;
  clip-path: polygon(0 0, 100% 0, 100% 78%, 72% 78%, 72% 100%, 28% 100%, 28% 78%, 0 78%);
  box-shadow: inset 0 2px 4px rgb(0 0 0 / 0.8);
}
.pname {
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-family: var(--cond);
  font-size: 0.72rem;
  font-weight: 600;
}
@media (max-width: 900px) {
  .layout {
    grid-template-columns: 1fr;
  }
  .head {
    border-right: none;
    border-bottom: 1px solid rgb(0 0 0 / 0.15);
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: center;
  }
  .model {
    grid-column: 1 / -1;
  }
}
@media (max-width: 640px) {
  .groups {
    grid-template-columns: 1fr;
  }
  .head {
    grid-template-columns: 1fr;
  }
}
</style>
