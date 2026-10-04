<script setup lang="ts">
import Device from './Device.vue'
import Led from './Led.vue'
import DymoLabel from './DymoLabel.vue'
import { useBoot } from '@/composables/useBoot'
import { profile } from '@/data/profile'

const lines = ['SIEADEV-01        ONLINE', 'ROLE  fullstack dev', 'LOC   Essen, DE', 'CO    Pixel Services']
const { step, typed, done } = useBoot(lines, 4)
</script>

<template>
  <Device as="section" id="intro" aria-labelledby="hero-name" class="hero" flush>
    <div class="layout">
      <div class="status" aria-hidden="true">
        <span class="power" :class="{ on: step >= 1 }"><span class="power-glyph" /></span>
        <ul class="leds">
          <li><Led color="green" :on="step >= 1" /><span class="silk">PWR</span></li>
          <li><Led color="green" :on="step >= 2" /><span class="silk">NET</span></li>
          <li><Led color="amber" :on="step >= 3" :blink="step >= 3" /><span class="silk">HDD</span></li>
          <li><Led color="blue" :on="step >= 4" /><span class="silk">ID</span></li>
        </ul>
      </div>

      <div class="main">
        <DymoLabel :tilt="-1.2" size="sm" class="tag">{{ profile.handle }}</DymoLabel>
        <h1 id="hero-name" class="name">{{ profile.name }}</h1>
        <p class="role">
          Fullstack developer in Essen and founder of
          <a :href="profile.company.href" target="_blank" rel="noopener" class="text-link">Pixel Services</a>,
          a server hosting and development company.
        </p>
        <p class="bio dim">
          I'm {{ profile.age }} and started coding at {{ profile.startedCodingAt }}. Most of what I write runs on a server:
          plugin frameworks in Java, Discord bots, and the infrastructure underneath them.
        </p>
        <div class="actions">
          <RouterLink to="/projects" class="hw-btn hw-btn-primary">See projects</RouterLink>
          <RouterLink to="/contact" class="hw-btn">Get in touch</RouterLink>
        </div>
      </div>

      <div class="side">
        <div class="lcd screen" role="img" :aria-label="lines.join('. ')">
          <p v-for="(l, i) in typed" :key="i" class="lcd-line">
            {{ l }}<span v-if="!done && l.length && l.length < lines[i].length" class="caret" />
          </p>
        </div>
        <div class="vent grille" aria-hidden="true" />
        <p class="silk model" aria-hidden="true">PX-4U · Essen</p>
      </div>
    </div>
  </Device>
</template>

<style scoped>
.layout {
  display: grid;
  grid-template-columns: 4.5rem minmax(0, 1fr) 17rem;
  min-height: calc(var(--u) * 8);
}
.status {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  padding: 1.5rem 0;
  border-right: 1px solid rgb(0 0 0 / 0.15);
}
.power {
  display: grid;
  place-items: center;
  width: 2.3rem;
  height: 2.3rem;
  border-radius: 50%;
  background: linear-gradient(180deg, var(--plate-lo), var(--plate-hi));
  box-shadow: inset 0 1px 3px rgb(0 0 0 / 0.4), 0 0 0 3px var(--inset);
}
.power-glyph {
  width: 0.95rem;
  height: 0.95rem;
  border: 2px solid var(--silk-dim);
  border-top-color: transparent;
  border-radius: 50%;
  position: relative;
  transition: border-color 200ms, filter 200ms;
}
.power-glyph::after {
  content: '';
  position: absolute;
  left: 50%;
  top: -0.3rem;
  width: 2px;
  height: 0.55rem;
  margin-left: -1px;
  background: var(--silk-dim);
}
.power.on .power-glyph {
  border-color: var(--led-blue);
  border-top-color: transparent;
  filter: drop-shadow(0 0 4px var(--led-blue));
}
.power.on .power-glyph::after {
  background: var(--led-blue);
}
.leds {
  display: grid;
  gap: 0.75rem;
}
.leds li {
  display: grid;
  justify-items: center;
  gap: 3px;
}
.leds .silk {
  font-size: 0.58rem;
}
.main {
  padding: clamp(1.5rem, 4vw, 2.75rem);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
}
.name {
  font-family: var(--cond);
  font-weight: 700;
  font-size: clamp(2.6rem, 6.4vw, 5.25rem);
  line-height: 0.95;
  letter-spacing: -0.01em;
  color: var(--silk);
}
.role {
  font-size: clamp(1.1rem, 1.8vw, 1.3rem);
  font-weight: 500;
  max-width: 34rem;
}
.bio {
  max-width: 34rem;
}
.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 0.5rem;
}
.side {
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
  padding: 1.5rem 1.5rem 1.2rem;
  border-left: 1px solid rgb(0 0 0 / 0.15);
}
.screen {
  padding: 0.8rem 0.9rem;
  min-height: 7.4rem;
  font-size: 0.8rem;
  line-height: 1.55;
}
.lcd-line {
  white-space: pre;
  min-height: 1.55em;
}
.caret {
  display: inline-block;
  width: 0.55em;
  height: 1em;
  margin-left: 1px;
  vertical-align: -0.12em;
  background: currentColor;
}
.grille {
  flex: 1;
  min-height: 5rem;
}
.model {
  text-align: right;
  font-size: 0.6rem;
}

@media (max-width: 1000px) {
  .layout {
    grid-template-columns: 3.5rem minmax(0, 1fr);
  }
  .side {
    grid-column: 1 / -1;
    flex-direction: row;
    border-left: none;
    border-top: 1px solid rgb(0 0 0 / 0.15);
    padding: 1rem;
  }
  .screen {
    flex: 1;
  }
  .grille {
    flex: 0 0 5rem;
  }
  .model {
    display: none;
  }
}
@media (max-width: 560px) {
  .layout {
    grid-template-columns: 1fr;
  }
  .status {
    flex-direction: row;
    justify-content: flex-start;
    gap: 1rem;
    padding: 0.75rem 1rem;
    border-right: none;
    border-bottom: 1px solid rgb(0 0 0 / 0.15);
  }
  .power {
    width: 1.8rem;
    height: 1.8rem;
  }
  .leds {
    grid-auto-flow: column;
    gap: 0.9rem;
  }
  .grille {
    display: none;
  }
  .main {
    padding: 1.25rem 1rem;
  }
}
</style>
