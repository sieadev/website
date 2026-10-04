<script setup lang="ts">
import { journeyChronological, startYear } from '@/data/journey'

/** Finley's path as a transit line: one stop per journey entry, ending at a dashed "next stop". */
const stops = journeyChronological()
const n = stops.length + 1
</script>

<template>
  <div class="map" :style="{ '--n': n }">
    <ol class="route" aria-label="My path so far, oldest first">
      <li v-for="(s, i) in stops" :key="s.id" class="stop" :class="[s.type, { here: !s.endDate }]" :style="{ '--i': i }">
        <span class="year">{{ startYear(s) }}</span>
        <span class="node" aria-hidden="true" />
        <span v-if="!s.endDate" class="here-tag">You are here</span>
        <span class="name">{{ s.organization }}</span>
        <span class="role">{{ s.title }}</span>
      </li>
      <li class="stop next" :style="{ '--i': stops.length }">
        <span class="year">Next</span>
        <span class="node" aria-hidden="true" />
        <RouterLink to="/contact" class="name next-link">Your project</RouterLink>
        <span class="role">Tell me where you want to go</span>
      </li>
    </ol>
    <span class="track solid" aria-hidden="true" />
    <span class="track dashed" aria-hidden="true" />
    <p class="legend" aria-hidden="true">
      <span><i class="key school" /> School</span>
      <span><i class="key job" /> Work</span>
    </p>
  </div>
</template>

<style scoped>
.map {
  --node: 2rem;
  --stroke: 0.8rem;
  --top: 3.6rem; /* distance from top of a stop to the centre of its node */
  --draw: 1400ms;
  position: relative;
  padding: 1.75rem 0 0;
}
.route {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: repeat(var(--n), minmax(0, 1fr));
}
.stop {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 0 0.5rem;
}
.year {
  height: 2.6rem;
  font-family: var(--cond);
  font-weight: 700;
  font-size: 2rem;
  line-height: 2.6rem;
  font-variant-numeric: tabular-nums;
}
.node {
  width: var(--node);
  height: var(--node);
  margin: calc(var(--top) - 2.6rem - var(--node) / 2) 0 1rem;
  border-radius: 50%;
  background: var(--surface);
  border: 5px solid var(--ink);
  animation: pop 300ms cubic-bezier(0.3, 1.6, 0.5, 1) backwards;
  animation-delay: calc(var(--draw) * var(--i) / (var(--n) - 2));
}
.job .node {
  border-radius: 5px;
}
.here .node {
  background: var(--yellow);
  border-color: var(--ink);
  box-shadow: 0 0 0 0 color-mix(in srgb, var(--yellow) 70%, transparent);
  animation:
    pop 300ms cubic-bezier(0.3, 1.6, 0.5, 1) backwards calc(var(--draw) * var(--i) / (var(--n) - 2)),
    ping 1.6s ease-out 3 calc(var(--draw) + 300ms);
}
.next .node {
  border-style: dashed;
  background: transparent;
  border-color: var(--ink-2);
}
.here-tag {
  position: absolute;
  top: -1.75rem;
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
  padding: 0.05rem 0.5rem;
  background: var(--yellow);
  color: var(--on-yellow);
  font-family: var(--cond);
  font-weight: 700;
  font-size: 0.95rem;
  border-radius: 3px;
}
.name {
  font-family: var(--cond);
  font-weight: 700;
  font-size: 1.4rem;
  line-height: 1.15;
}
.role {
  margin-top: 0.2rem;
  font-size: 0.92rem;
  color: var(--ink-2);
  line-height: 1.3;
}
.next-link {
  text-decoration: underline;
  text-decoration-color: var(--yellow);
  text-decoration-thickness: 3px;
  text-underline-offset: 0.18em;
}
.track {
  position: absolute;
  top: calc(1.75rem + var(--top) - var(--stroke) / 2);
  height: var(--stroke);
  transform-origin: left center;
}
.solid {
  left: calc(50% / var(--n));
  width: calc((var(--n) - 2) * 100% / var(--n));
  background: var(--line);
  border-radius: var(--stroke);
  animation: draw var(--draw) cubic-bezier(0.5, 0, 0.3, 1) backwards;
}
.dashed {
  left: calc((var(--n) - 1.5) * 100% / var(--n));
  width: calc(100% / var(--n));
  background: repeating-linear-gradient(90deg, var(--ink-2) 0 10px, transparent 10px 18px);
  height: calc(var(--stroke) / 2);
  margin-top: calc(var(--stroke) / 4);
  animation: fade 400ms ease backwards var(--draw);
}
.legend {
  display: flex;
  gap: 1.25rem;
  justify-content: flex-end;
  margin-top: 1.5rem;
  font-size: 0.85rem;
  color: var(--ink-2);
}
.legend span {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
}
.key {
  width: 0.85rem;
  height: 0.85rem;
  border: 3px solid var(--ink);
  border-radius: 50%;
  background: var(--surface);
}
.key.job {
  border-radius: 3px;
}

@keyframes draw {
  from { transform: scaleX(0); }
}
@keyframes pop {
  from { transform: scale(0); }
}
@keyframes fade {
  from { opacity: 0; }
}
@keyframes ping {
  to { box-shadow: 0 0 0 14px color-mix(in srgb, var(--yellow) 0%, transparent); }
}

/* Vertical line diagram on narrow screens */
@media (max-width: 760px) {
  .map {
    --node: 1.5rem;
    --stroke: 0.6rem;
    padding-top: 0.5rem;
  }
  .node {
    border-width: 4px;
  }
  .name {
    font-size: 1.2rem;
  }
  .route {
    grid-template-columns: 1fr;
    gap: 1.6rem;
  }
  .stop {
    display: grid;
    grid-template-columns: 3.25rem 2rem 1fr;
    grid-template-areas: 'year node name' 'year node role' 'year node tag';
    align-items: start;
    text-align: left;
    padding: 0;
  }
  .year {
    grid-area: year;
    height: auto;
    line-height: 1.2;
    font-size: 1.25rem;
  }
  .node {
    grid-area: node;
    margin: 0.1rem 0 0;
    justify-self: center;
  }
  .name {
    grid-area: name;
  }
  .role {
    grid-area: role;
  }
  .here-tag {
    grid-area: tag;
    position: static;
    transform: none;
    justify-self: start;
    margin: 0.4rem 0 0;
  }
  /* each stop draws the segment down to the next one */
  .stop:not(.next)::after {
    content: '';
    position: absolute;
    z-index: -1;
    left: calc(3.25rem + 1rem - var(--stroke) / 2);
    top: calc(0.1rem + var(--node) / 2);
    bottom: calc(-1.6rem - 0.1rem - var(--node) / 2);
    width: var(--stroke);
    background: var(--line);
    transform-origin: center top;
    animation: draw-v 400ms ease-out backwards;
    animation-delay: calc(var(--i) * 300ms);
  }
  .here::after {
    width: calc(var(--stroke) / 2) !important;
    margin-left: calc(var(--stroke) / 4);
    background: repeating-linear-gradient(180deg, var(--ink-2) 0 10px, transparent 10px 18px) !important;
  }
  .track {
    display: none;
  }
  .legend {
    justify-content: flex-start;
  }
}
@keyframes draw-v {
  from { transform: scaleY(0); }
}
</style>
