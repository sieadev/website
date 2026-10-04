<script setup lang="ts">
import Device from './Device.vue'
import DymoLabel from './DymoLabel.vue'

/** 1U blank with a label-maker heading. Used as a section header. */
defineProps<{ id?: string; title: string; note?: string; level?: 1 | 2 }>()
</script>

<template>
  <Device as="div" class="unit-label">
    <div class="row">
      <component :is="level === 1 ? 'h1' : 'h2'" :id="id" class="heading">
        <DymoLabel size="lg" :tilt="-0.6">{{ title }}</DymoLabel>
      </component>
      <p v-if="note" class="note dim">{{ note }}</p>
      <slot />
      <div class="vent slot" aria-hidden="true" />
    </div>
  </Device>
</template>

<style scoped>
.unit-label :deep(.face) {
  padding: 0.65rem 1.1rem;
}
.row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem 1.25rem;
}
.heading {
  line-height: 1;
}
.note {
  font-size: 0.92rem;
  max-width: 40rem;
}
.slot {
  flex: 1;
  min-width: 4rem;
  height: 1.2rem;
  margin-left: auto;
}
@media (max-width: 560px) {
  .slot {
    display: none;
  }
}
</style>
