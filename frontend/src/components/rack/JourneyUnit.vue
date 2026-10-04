<script setup lang="ts">
import Device from './Device.vue'
import Led from './Led.vue'
import DymoLabel from './DymoLabel.vue'
import { formatJourneyRange, type JourneyEntry } from '@/data/journey'

/** One journey entry as a device: lit while it's still running, dark once it ended. */
defineProps<{ entry: JourneyEntry; detailed?: boolean; headingLevel?: 2 | 3 }>()
</script>

<template>
  <Device as="article" class="unit" :class="{ running: !entry.endDate, detailed }">
    <div class="row">
      <div class="state">
        <Led color="green" :on="!entry.endDate" />
        <span class="silk">{{ entry.endDate ? 'Ended' : 'Running' }}</span>
      </div>
      <DymoLabel size="sm" :tilt="entry.type === 'job' ? -0.8 : 0.7" class="when">{{ formatJourneyRange(entry) }}</DymoLabel>
      <div class="what">
        <component :is="headingLevel === 2 ? 'h2' : 'h3'" class="title">{{ entry.title }}</component>
        <p class="dim org">
          {{ entry.organization }}<template v-if="entry.location">, {{ entry.location }}</template>
        </p>
      </div>
      <span class="silk kind">{{ entry.type === 'job' ? 'Work' : 'School' }}</span>
    </div>
    <div v-if="detailed && (entry.description || entry.skills?.length)" class="detail">
      <p v-if="entry.description">{{ entry.description }}</p>
      <ul v-if="entry.skills?.length" class="skills" aria-label="Skills">
        <li v-for="s in entry.skills" :key="s" class="silk chip">{{ s }}</li>
      </ul>
    </div>
  </Device>
</template>

<style scoped>
.unit :deep(.face) {
  padding: 0.75rem 1.1rem;
}
.row {
  display: grid;
  grid-template-columns: 4.5rem 13rem minmax(0, 1fr) auto;
  align-items: center;
  gap: 1rem;
}
.state {
  display: flex;
  align-items: center;
  gap: 0.45rem;
}
.state .silk {
  font-size: 0.6rem;
}
.when {
  justify-self: start;
}
.title {
  font-family: var(--cond);
  font-weight: 700;
  font-size: 1.2rem;
  line-height: 1.15;
}
.org {
  font-size: 0.9rem;
}
.kind {
  font-size: 0.62rem;
}
.unit:not(.running) .title {
  color: color-mix(in srgb, var(--silk) 85%, var(--plate));
}
.detail {
  display: grid;
  gap: 0.6rem;
  margin: 0.9rem 0 0.2rem calc(4.5rem + 1rem);
  padding-top: 0.8rem;
  border-top: 1px dashed var(--plate-edge);
  max-width: 44rem;
}
.skills {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}
.chip {
  padding: 0.1rem 0.5rem;
  border: 1px solid var(--plate-edge);
  border-radius: 2px;
  font-size: 0.62rem;
  color: var(--silk);
}
@media (max-width: 860px) {
  .row {
    grid-template-columns: auto minmax(0, 1fr);
    gap: 0.5rem 1rem;
  }
  .state {
    grid-row: 1;
  }
  .when {
    grid-row: 1;
    justify-self: end;
  }
  .what {
    grid-column: 1 / -1;
  }
  .kind {
    display: none;
  }
  .detail {
    margin-left: 0;
  }
}
</style>
